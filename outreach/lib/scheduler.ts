// Ramp-up scheduler / inbox warming.
// Cold email from a fresh sender MUST start slow and increase gradually,
// or the provider flags you as spam and your deliverability tanks (or you get
// suspended). This tracks how many days you've been warming and computes a
// safe daily send cap that grows over time.

import fs from 'fs';
import path from 'path';

const STATE_PATH = path.join(process.cwd(), 'data', 'scheduler.json');

// Warm-up curve (override via env)
const WARMUP_START = parseInt(process.env.WARMUP_START || '15');       // day 1 cap
const WARMUP_INCREMENT = parseInt(process.env.WARMUP_INCREMENT || '10'); // +per day
const WARMUP_MAX = parseInt(process.env.WARMUP_MAX || '120');          // ceiling

interface SchedulerState {
  startDate: string;       // ISO date warming began
  day: string;             // YYYY-MM-DD of current counting window
  emailsSentToday: number; // emails sent in current window
  lastRunAt?: string;
  totalEmailsSent: number;
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function ensureDir() {
  const dir = path.dirname(STATE_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

export function loadState(): SchedulerState {
  ensureDir();
  if (!fs.existsSync(STATE_PATH)) {
    const fresh: SchedulerState = {
      startDate: new Date().toISOString(),
      day: today(),
      emailsSentToday: 0,
      totalEmailsSent: 0,
    };
    fs.writeFileSync(STATE_PATH, JSON.stringify(fresh, null, 2));
    return fresh;
  }
  const state: SchedulerState = JSON.parse(fs.readFileSync(STATE_PATH, 'utf-8'));
  // Roll the daily counter over to a new day
  if (state.day !== today()) {
    state.day = today();
    state.emailsSentToday = 0;
    fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2));
  }
  return state;
}

function saveState(state: SchedulerState) {
  ensureDir();
  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2));
}

// How many days into warming we are (0-indexed → day 1 = 0)
export function warmupDay(): number {
  const state = loadState();
  const start = new Date(state.startDate).getTime();
  return Math.max(0, Math.floor((Date.now() - start) / 86400000));
}

// Today's safe send cap based on the ramp curve
export function dailyEmailCap(): number {
  const cap = WARMUP_START + WARMUP_INCREMENT * warmupDay();
  return Math.min(WARMUP_MAX, cap);
}

// How many emails we can still send today within the ramp
export function getRemainingDailyEmails(): number {
  const state = loadState();
  return Math.max(0, dailyEmailCap() - state.emailsSentToday);
}

// Record emails actually sent (call after a run)
export function recordEmailsSent(count: number) {
  const state = loadState();
  state.emailsSentToday += count;
  state.totalEmailsSent += count;
  state.lastRunAt = new Date().toISOString();
  saveState(state);
}

export function getSchedulerStatus() {
  const state = loadState();
  return {
    startDate: state.startDate,
    warmupDay: warmupDay() + 1, // 1-indexed for display
    dailyCap: dailyEmailCap(),
    emailsSentToday: state.emailsSentToday,
    remainingToday: getRemainingDailyEmails(),
    totalEmailsSent: state.totalEmailsSent,
    lastRunAt: state.lastRunAt,
    fullVolumeReached: dailyEmailCap() >= WARMUP_MAX,
    ceiling: WARMUP_MAX,
  };
}
