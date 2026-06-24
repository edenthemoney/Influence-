// Cold DM script generator for Instagram / TikTok.
// NOTE: These are COPY-PASTE scripts. We do NOT auto-send DMs — automated
// unsolicited DMs violate Instagram/TikTok ToS and risk account bans.
// This generates personalized scripts + deep links so you (or a VA) can send
// them manually in seconds, ban-free.

export interface DMVars {
  name: string;
  type: 'artist' | 'business' | 'manager' | 'label';
  trackName?: string;
  niche?: string; // for businesses, e.g. "med spa"
  city?: string;
  instagram?: string;
}

const SITE = 'influencemodels.agency';

function igHandle(instagram?: string): string {
  if (!instagram) return '';
  // Normalize an IG url or @handle to a clean handle
  const m = instagram.match(/instagram\.com\/([^/?#]+)/i);
  if (m) return m[1].replace(/^@/, '');
  return instagram.replace(/^@/, '').trim();
}

// Multiple variants per type so you can rotate and avoid spam-pattern detection
export const dmScripts = {
  artist: [
    (v: DMVars) =>
      `Yo ${v.name} 🔥 just came across your music — the sound is real. We're a South FL influencer agency (worked w/ Sean Paul, Kai Cenat, Bryson Tiller). We get tracks in front of real audiences w/ reaction vids + UGC reels. Mind if I send a couple examples?`,
    (v: DMVars) =>
      `Hey ${v.name}! Been listening${v.trackName ? ` to "${v.trackName}"` : ''} and had to reach out. We run influencer promo campaigns for artists (reaction videos, reels, music video models). Roster's worked w/ major names. Want me to drop our rate card? 🎵`,
    (v: DMVars) =>
      `${v.name} 👀 your stuff deserves a bigger audience. We're an influencer marketing agency in Miami — we push music through verified creators + content campaigns. 48hr delivery, packages from $200. Down to hear more?`,
  ],
  business: [
    (v: DMVars) =>
      `Hey ${v.name}! Love what you're doing${v.city ? ` in ${v.city}` : ''} 🙌 We're a Miami influencer agency — we send models/creators to ${v.niche || 'businesses'} like yours to shoot reels, stories & promo content on-site. Tons of brands have blown up doing this. Want to see examples?`,
    (v: DMVars) =>
      `Hi ${v.name} 👋 quick one — we help ${v.niche || 'local businesses'} go viral with influencer content (on-site reels, UGC, brand ambassadors). South FL based, content in 48hrs. Could be a perfect fit for your spot. Mind if I share a quick proposal?`,
    (v: DMVars) =>
      `${v.name} — your brand would crush it with influencer content 🔥 We're a Miami model/creator agency. We handle everything: model selection, on-site shoot, edited reels ready to post. Packages from $300. Want details?`,
  ],
  manager: [
    (v: DMVars) =>
      `Hi! Reaching out about ${v.name} — we're a South FL influencer agency running music promo (reaction campaigns, UGC, release rollouts). Roster's worked w/ Forbes, Fenty, Sean Paul. Open to a partnership convo?`,
  ],
  label: [
    (v: DMVars) =>
      `Hey! We run influencer-driven music promo out of South Florida — reaction videos, reels, full release rollouts + event model staffing. Would love to explore ongoing campaigns for your roster. Can I send our deck?`,
  ],
};

export function generateDM(vars: DMVars, variant?: number): string {
  const pool = dmScripts[vars.type] || dmScripts.artist;
  const idx = variant != null ? variant % pool.length : Math.floor(Math.random() * pool.length);
  return pool[idx](vars);
}

// Build a deep link to open the DM thread (opens the real app — compliant)
export function dmDeepLink(instagram?: string): string {
  const handle = igHandle(instagram);
  if (!handle) return '';
  return `https://instagram.com/${handle}`;
}

// Generate all variants for a prospect (for the DM queue UI)
export function generateAllDMs(vars: DMVars): { variant: number; text: string }[] {
  const pool = dmScripts[vars.type] || dmScripts.artist;
  return pool.map((fn, i) => ({ variant: i, text: fn(vars) }));
}
