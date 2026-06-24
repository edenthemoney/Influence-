// Continuous auto-pilot worker.
// Runs the outreach pipeline on a loop, by itself, during active hours —
// scraping leads, sending cold emails on the warm-up ramp, and following up.
//
// Start it with:  npm run autopilot
// Stop it with:   Ctrl+C
//
// Keep this terminal open (or run it on an always-on server) and it will keep
// finding leads + emailing on its own, ramping volume up safely each day.

import 'dotenv/config';
import { config as loadEnv } from 'dotenv';
import path from 'path';

// Load .env.local (Next.js convention) in addition to .env
loadEnv({ path: path.join(process.cwd(), '.env.local') });

import { runAutopilot } from '../lib/autopilot';
import { getSchedulerStatus, getRemainingDailyEmails } from '../lib/scheduler';

// ── Tunables (override via env) ──
const RUN_EVERY_MIN = parseInt(process.env.WORKER_INTERVAL_MIN || '45');   // base minutes between runs
const ACTIVE_START_HOUR = parseInt(process.env.WORKER_START_HOUR || '9');  // local hour (24h)
const ACTIVE_END_HOUR = parseInt(process.env.WORKER_END_HOUR || '19');     // local hour (24h)
const EMAILS_PER_RUN = parseInt(process.env.WORKER_EMAILS_PER_RUN || '5'); // emails per cycle (spread out)
const DELAY_BETWEEN_EMAILS_MS = parseInt(process.env.WORKER_EMAIL_DELAY_MS || '45000'); // ~45s, human-like

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
const ts = () => new Date().toLocaleString();

function withinActiveHours(): boolean {
  const h = new Date().getHours();
  return h >= ACTIVE_START_HOUR && h < ACTIVE_END_HOUR;
}

// Next interval with ±30% jitter so the cadence looks organic
function nextDelayMs(): number {
  const base = RUN_EVERY_MIN * 60000;
  const spread = base * 0.3;
  return Math.round(base - spread + Math.random() * spread * 2);
}

function minutesUntilActive(): number {
  const now = new Date();
  const h = now.getHours();
  if (h < ACTIVE_START_HOUR) return (ACTIVE_START_HOUR - h) * 60 - now.getMinutes();
  // after end hour → wait until tomorrow's start
  return ((24 - h + ACTIVE_START_HOUR) * 60) - now.getMinutes();
}

async function cycle() {
  if (!withinActiveHours()) {
    const wait = minutesUntilActive();
    console.log(`[${ts()}] 💤 Outside active hours (${ACTIVE_START_HOUR}:00–${ACTIVE_END_HOUR}:00). Sleeping ~${wait} min.`);
    await sleep(Math.max(5, wait) * 60000);
    return;
  }

  const status = getSchedulerStatus();
  const remaining = getRemainingDailyEmails();
  console.log(`[${ts()}] 🚀 Cycle start — warm-up day ${status.warmupDay}, daily cap ${status.dailyCap}, sent today ${status.emailsSentToday}, remaining ${remaining}`);

  if (remaining <= 0) {
    console.log(`[${ts()}] ✅ Daily ramp cap reached. Will keep discovering leads but pause sending until tomorrow.`);
  }

  try {
    const result = await runAutopilot({
      discoverArtists: true,
      discoverBusinesses: true,
      autoEmail: remaining > 0,
      autoFollowUp: remaining > 0,
      // Only attempt a small chunk per cycle; ramp budget is the hard ceiling
      maxNewLeads: Math.max(EMAILS_PER_RUN * 2, 10),
      respectRamp: true,
      delayBetweenEmailsMs: DELAY_BETWEEN_EMAILS_MS,
    });
    console.log(`[${ts()}] 📊 Found ${result.artistsFound} artists, ${result.businessesFound} businesses · +${result.leadsAdded} leads · ${result.emailsSent} emails · ${result.followUpsSent} follow-ups`);
    if (result.errors.length) {
      console.log(`[${ts()}] ⚠️  ${result.errors.length} warnings (first: ${result.errors[0]})`);
    }
  } catch (e: any) {
    console.error(`[${ts()}] ❌ Cycle error:`, e.message);
  }
}

async function main() {
  console.log('════════════════════════════════════════════');
  console.log('  INFLUENCE AUTO-PILOT — CONTINUOUS WORKER');
  console.log('════════════════════════════════════════════');
  console.log(`Active hours : ${ACTIVE_START_HOUR}:00 – ${ACTIVE_END_HOUR}:00 (local)`);
  console.log(`Run cadence  : ~${RUN_EVERY_MIN} min (jittered)`);
  console.log(`Email pacing : ~${Math.round(DELAY_BETWEEN_EMAILS_MS / 1000)}s between sends`);
  const s = getSchedulerStatus();
  console.log(`Warm-up      : day ${s.warmupDay}, cap ${s.dailyCap}/day (ceiling ${s.ceiling})`);
  console.log('Press Ctrl+C to stop.\n');

  // Graceful shutdown
  process.on('SIGINT', () => { console.log(`\n[${ts()}] 👋 Worker stopped.`); process.exit(0); });

  // Run forever
  // eslint-disable-next-line no-constant-condition
  while (true) {
    await cycle();
    const delay = nextDelayMs();
    console.log(`[${ts()}] ⏳ Next cycle in ~${Math.round(delay / 60000)} min.\n`);
    await sleep(delay);
  }
}

main().catch(e => { console.error('Fatal:', e); process.exit(1); });
