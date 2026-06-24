// Auto-pilot pipeline: discovers prospects, scrapes contacts, sends cold
// emails (respecting rate limits), and queues follow-ups — in one run.
// Designed to be triggered manually from the dashboard OR on a daily cron.

import { discoverSmallArtists, findNewDrops } from './spotify';
import { findContactInfo } from './scraper';
import { findBusinessProspects, BUSINESS_NICHES, TARGET_CITIES } from './places';
import { getLeads, saveLeads, saveLead, Lead } from './store';
import { sendOutreachEmail, getRateLimitStatus } from './mailer';
import { getRemainingDailyEmails, recordEmailsSent } from './scheduler';
import { TemplateName } from './email-templates';

export interface AutopilotConfig {
  discoverArtists: boolean;
  discoverBusinesses: boolean;
  autoEmail: boolean;        // send cold emails to brand-new leads
  autoFollowUp: boolean;     // send follow-ups to leads emailed 3+ days ago
  maxNewLeads: number;       // cap discovery per run
  businessNiche?: string;    // optional single niche; otherwise rotates
  businessCity?: string;     // optional single city; otherwise rotates
  artistGenre?: string;
  respectRamp?: boolean;     // enforce warm-up daily cap (default true)
  delayBetweenEmailsMs?: number; // human-like pause between sends (worker only)
}

export const DEFAULT_CONFIG: AutopilotConfig = {
  discoverArtists: true,
  discoverBusinesses: true,
  autoEmail: true,
  autoFollowUp: true,
  maxNewLeads: 20,
  artistGenre: '',
  respectRamp: true,
  delayBetweenEmailsMs: 0,
};

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

// Randomized human-like jitter around a base delay (±40%)
function jitter(baseMs: number): number {
  if (baseMs <= 0) return 0;
  const spread = baseMs * 0.4;
  return Math.round(baseMs - spread + Math.random() * spread * 2);
}

export interface AutopilotResult {
  startedAt: string;
  finishedAt: string;
  artistsFound: number;
  businessesFound: number;
  leadsAdded: number;
  emailsSent: number;
  followUpsSent: number;
  errors: string[];
  rateLimit: ReturnType<typeof getRateLimitStatus>;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function newLead(partial: Partial<Lead>): Lead {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    name: partial.name || 'Unknown',
    type: partial.type || 'artist',
    email: partial.email || '',
    phone: partial.phone,
    instagram: partial.instagram,
    spotify: partial.spotify,
    website: partial.website,
    followers: partial.followers || 0,
    genre: partial.genre,
    niche: partial.niche,
    city: partial.city,
    address: partial.address,
    rating: partial.rating,
    placeId: partial.placeId,
    source: partial.source || 'autopilot',
    status: 'new',
    notes: partial.notes || '',
    emailsSent: [],
    dmsSent: [],
    createdAt: now,
    updatedAt: now,
  };
}

// Map a lead type to the right cold email template
function templateForLead(lead: Lead): TemplateName {
  if (lead.type === 'business') return 'business-cold';
  if (lead.type === 'manager' || lead.type === 'label') return 'manager-cold';
  // Artist: use new-drop if we detect a release in notes, else artist-cold
  if (lead.notes?.includes('New release:')) return 'new-drop';
  return 'artist-cold';
}

export async function runAutopilot(config: Partial<AutopilotConfig> = {}): Promise<AutopilotResult> {
  const cfg: AutopilotConfig = { ...DEFAULT_CONFIG, ...config };
  const result: AutopilotResult = {
    startedAt: new Date().toISOString(),
    finishedAt: '',
    artistsFound: 0,
    businessesFound: 0,
    leadsAdded: 0,
    emailsSent: 0,
    followUpsSent: 0,
    errors: [],
    rateLimit: getRateLimitStatus(),
  };

  const discovered: Lead[] = [];

  // ── 1. Discover artists (Spotify) + scrape their contact info ──
  if (cfg.discoverArtists) {
    try {
      const artists = await discoverSmallArtists(cfg.artistGenre || undefined);
      result.artistsFound = artists.length;
      for (const a of artists.slice(0, Math.ceil(cfg.maxNewLeads / 2))) {
        try {
          const contact = await findContactInfo(a.name, a.spotifyUrl);
          if (contact.emails.length > 0 || contact.instagram) {
            discovered.push(
              newLead({
                name: a.name,
                type: 'artist',
                email: contact.emails[0] || '',
                instagram: contact.instagram,
                website: contact.website,
                spotify: a.spotifyUrl,
                followers: a.followers,
                genre: a.genres[0] || '',
                source: 'autopilot-artist',
              })
            );
          }
        } catch (e: any) {
          result.errors.push(`artist scrape ${a.name}: ${e.message}`);
        }
      }
    } catch (e: any) {
      result.errors.push(`artist discovery: ${e.message}`);
    }
  }

  // ── 2. Discover businesses (Google Places) ──
  if (cfg.discoverBusinesses) {
    try {
      const niche = cfg.businessNiche || pick(BUSINESS_NICHES);
      const city = cfg.businessCity || pick(TARGET_CITIES);
      const businesses = await findBusinessProspects(niche, city, Math.ceil(cfg.maxNewLeads / 2));
      result.businessesFound = businesses.length;
      for (const b of businesses) {
        discovered.push(
          newLead({
            name: b.name,
            type: 'business',
            website: b.website,
            phone: b.phone,
            niche,
            city,
            address: b.address,
            rating: b.rating,
            placeId: b.placeId,
            source: 'autopilot-business',
            notes: `${niche} in ${city}${b.rating ? ` · ${b.rating}★` : ''}`,
          })
        );
      }
    } catch (e: any) {
      result.errors.push(`business discovery: ${e.message}`);
    }
  }

  // ── 3. Persist discovered leads (dedup handled in store) ──
  if (discovered.length > 0) {
    result.leadsAdded = saveLeads(discovered);
  }

  // Shared daily ramp budget (warm-up cap). Both cold emails and follow-ups
  // draw from the same budget so we never exceed the safe daily volume.
  let budget = cfg.respectRamp !== false ? getRemainingDailyEmails() : Number.MAX_SAFE_INTEGER;
  const startBudget = budget;

  // ── 4. Auto-email brand-new leads that have an email ──
  if (cfg.autoEmail) {
    const leads = getLeads().filter(l => l.status === 'new' && l.email && l.emailsSent.length === 0);
    for (const lead of leads) {
      if (budget <= 0) break;
      const rl = getRateLimitStatus();
      if (rl.sentThisHour >= rl.maxPerHour || rl.sentToday >= rl.maxPerDay) break;
      try {
        const trackMatch = lead.notes?.match(/New release: "(.+?)"/);
        const res = await sendOutreachEmail(lead.email, templateForLead(lead), {
          artistName: lead.name,
          name: lead.name,
          trackName: trackMatch ? trackMatch[1] : undefined,
          genre: lead.genre,
        });
        if (res.success) {
          lead.status = 'emailed';
          lead.emailsSent.push({
            date: new Date().toISOString(),
            template: templateForLead(lead),
            subject: 'Auto-pilot cold email',
          });
          lead.updatedAt = new Date().toISOString();
          saveLead(lead);
          result.emailsSent++;
          budget--;
          if (cfg.delayBetweenEmailsMs && budget > 0) await sleep(jitter(cfg.delayBetweenEmailsMs));
        } else if (res.error) {
          result.errors.push(`email ${lead.name}: ${res.error}`);
        }
      } catch (e: any) {
        result.errors.push(`email ${lead.name}: ${e.message}`);
      }
    }
  }

  // ── 5. Auto follow-up: leads emailed 3+ days ago, no reply ──
  if (cfg.autoFollowUp) {
    const threeDaysAgo = Date.now() - 3 * 86400000;
    const leads = getLeads().filter(l => {
      if (l.status !== 'emailed' || !l.email) return false;
      if (l.emailsSent.length >= 3) return false; // cap at 3 touches
      const last = l.emailsSent[l.emailsSent.length - 1];
      return last && new Date(last.date).getTime() < threeDaysAgo;
    });
    for (const lead of leads) {
      if (budget <= 0) break;
      const rl = getRateLimitStatus();
      if (rl.sentThisHour >= rl.maxPerHour || rl.sentToday >= rl.maxPerDay) break;
      try {
        const res = await sendOutreachEmail(lead.email, 'follow-up', { artistName: lead.name });
        if (res.success) {
          lead.status = 'follow-up';
          lead.emailsSent.push({
            date: new Date().toISOString(),
            template: 'follow-up',
            subject: 'Auto-pilot follow-up',
          });
          lead.updatedAt = new Date().toISOString();
          saveLead(lead);
          result.followUpsSent++;
          budget--;
          if (cfg.delayBetweenEmailsMs && budget > 0) await sleep(jitter(cfg.delayBetweenEmailsMs));
        }
      } catch (e: any) {
        result.errors.push(`follow-up ${lead.name}: ${e.message}`);
      }
    }
  }

  // Record consumed ramp budget so the daily cap persists across runs
  if (cfg.respectRamp !== false) {
    const used = startBudget - budget;
    if (used > 0) recordEmailsSent(used);
  }

  result.finishedAt = new Date().toISOString();
  result.rateLimit = getRateLimitStatus();
  return result;
}
