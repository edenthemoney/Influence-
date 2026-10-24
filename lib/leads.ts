// Shared lead qualifier config + scoring + pitch + spam heuristics (client & server safe).
export type LeadType = 'venue' | 'brand' | 'artist' | 'event' | 'other';
export const LEAD_TYPES: { id: LeadType; label: string }[] = [
  { id: 'venue', label: 'Venue / Restaurant / Hotel' },
  { id: 'brand', label: 'Brand / Product' },
  { id: 'artist', label: 'Artist / Label' },
  { id: 'event', label: 'Event host' },
  { id: 'other', label: 'Other' },
];

export type Svc = { id: string; label: string; from: string; pkg: string; href: string };
const S: Record<string, Svc> = {
  ambassador: { id: 'ambassador', label: 'Brand ambassador visit', from: '$600', pkg: 'Brand Ambassador Half-Day visit ($600)', href: '/brand-ambassadors-miami' },
  hosts: { id: 'hosts', label: 'Event hosts / models', from: '$760', pkg: 'Event models, $95/hr each, 2-model 4-hr minimum ($760); 3 models = $1,140', href: '/event-creators' },
  bottle: { id: 'bottle', label: 'Bottle girls / VIP hostesses', from: '$760', pkg: 'VIP hostesses, $95/hr each, 2-hostess 4-hr minimum ($760); 3 = $1,140', href: '/bottle-girls-miami' },
  venueMonthly: { id: 'venueMonthly', label: 'Monthly venue program', from: '$2,130/mo', pkg: 'Venue Starter, 2 models × 4 events/mo ($2,130/mo)', href: '/pricing' },
  ugc: { id: 'ugc', label: 'UGC content', from: '$750', pkg: 'UGC 3-pack ($750)', href: '/ugc-content' },
  campaign: { id: 'campaign', label: 'Influencer campaign', from: '$2,500/mo', pkg: 'Influencer campaign (from $2,500/mo)', href: '/influencer-campaigns' },
  shoot: { id: 'shoot', label: 'Models for a photo/video shoot', from: '$600', pkg: 'Shoot model, half day ($600) / full day ($1,200)', href: '/creators-for-shoots' },
  mv: { id: 'mv', label: 'Music video models', from: '$450', pkg: 'Music video models: Featured $450 · Lead $950 · Ensemble (3) $1,950', href: '/music-video-booking' },
  reaction: { id: 'reaction', label: 'Song reaction videos', from: '$500', pkg: 'High-Reach Reaction $500 · Launch Bundle $750', href: '/music-promotion' },
  label: { id: 'label', label: 'Label / release campaign', from: '$2,500/mo', pkg: 'Label rollout campaign (from $2,500/mo)', href: '/label-campaigns' },
  notsure: { id: 'notsure', label: 'Not sure yet, advise me', from: '', pkg: 'Discovery call: recommend a starter package', href: '/pricing' },
};
export const SERVICES = S;
export const SERVICES_BY_TYPE: Record<LeadType, Svc[]> = {
  venue: [S.ambassador, S.hosts, S.bottle, S.venueMonthly, S.ugc, S.campaign, S.notsure],
  brand: [S.ugc, S.ambassador, S.campaign, S.shoot, S.hosts, S.notsure],
  artist: [S.mv, S.reaction, S.label, S.ugc, S.notsure],
  event: [S.hosts, S.bottle, S.ambassador, S.ugc, S.notsure],
  other: [S.ambassador, S.ugc, S.mv, S.hosts, S.campaign, S.shoot, S.notsure],
};
export const STARTER_BUDGET = 'Under $450 (Starter)';
export const BUDGETS = [STARTER_BUDGET, '$450–1.5K', '$1.5K–5K', '$5K+'] as const;

// Starter (/starter): single-unit, one creator one deliverable. Only recommended for the lowest budget.
const STARTER_PICK: Record<string, string> = {
  mv: 'Starter: Solo Model for Your Music Video, 1 hr ($249) or 2 hrs ($399)',
  reaction: 'Starter: Single Reaction Video ($350)',
  ugc: 'Starter: Single UGC Video ($350)',
};
export const STARTER_HREF = '/starter';
export const TIMINGS = ['This week', 'This month', 'Later'] as const;
export const CITIES = ['Miami', 'Miami Beach', 'Brickell / Downtown', 'Wynwood', 'Fort Lauderdale', 'Hollywood', 'Boca Raton', 'Delray Beach', 'West Palm Beach', 'Palm Beach', 'Coral Gables', 'Doral', 'Other / outside S. Florida'];

export type LeadAnswers = { type?: LeadType; services?: string[]; budget?: string; timing?: string; business?: string; ig?: string; city?: string };

export function scoreLead(a: LeadAnswers): { score: 'hot' | 'warm' | 'cold'; points: number } {
  let p = 0;
  const bi = BUDGETS.indexOf((a.budget || '') as (typeof BUDGETS)[number]);
  p += bi < 0 ? 0 : [1, 2, 3, 4][bi];
  p += a.timing === 'This week' ? 3 : a.timing === 'This month' ? 2 : a.timing === 'Later' ? 0 : 0;
  if (a.services?.length && !(a.services.length === 1 && a.services[0] === 'notsure')) p += 1;
  if (a.business || a.ig) p += 1;
  if (a.city && !a.city.startsWith('Other')) p += 1;
  return { score: p >= 7 ? 'hot' : p >= 4 ? 'warm' : 'cold', points: p };
}

export function recommend(a: LeadAnswers): { pkg: string; pitch: string } {
  const svcs = (a.services || []).map((id) => S[id]).filter(Boolean);
  const main = svcs.find((s) => s.id !== 'notsure') || (a.type ? SERVICES_BY_TYPE[a.type][0] : S.ambassador);
  const big = a.budget === '$1.5K–5K' || a.budget === '$5K+';
  if (a.budget === STARTER_BUDGET) {
    const pkg = STARTER_PICK[main.id] || 'Starter: Single Story Post ($200) or another single-deliverable option';
    const who = a.business || a.ig || 'your project';
    return { pkg: `${pkg} (see ${STARTER_HREF})`, pitch: `Hi! For ${who}, our Starter options are built for solo artists and small creatives: one creator, one deliverable, from $200. Here they are: https://influencecreators.marketing${STARTER_HREF}. Happy to help you pick.` };
  }
  let pkg = main.pkg;
  if (a.type === 'venue' && big) pkg = `${S.venueMonthly.pkg}, or one-off ${main.label.toLowerCase()}`;
  if (a.type === 'artist' && main.id === 'mv' && big) pkg = 'Music video Ensemble: 3 models, full day ($1,950); add Reaction Launch Bundle ($750)';
  if (a.type === 'brand' && a.budget === '$5K+') pkg = `${S.campaign.pkg} + UGC add-on`;
  const who = a.business || a.ig || 'your brand';
  const when = a.timing === 'This week' ? 'this week' : a.timing === 'This month' ? 'this month' : 'when you’re ready';
  const where = a.city && !a.city.startsWith('Other') ? ` in ${a.city}` : '';
  const pitch = {
    venue: `Hi! Saw you're looking for ${main.label.toLowerCase()} for ${who}${where}. We can have vetted, camera-ready talent at your venue ${when}. Want me to send 3 options and a quote?`,
    brand: `Hi! For ${who}, we'd start with ${main.label.toLowerCase()} (from ${main.from || 'a custom quote'}). I can send creator picks that fit your product ${when}.`,
    artist: `Hey! For ${who}, we can lock in ${main.label.toLowerCase()} (from ${main.from || 'custom'})${where} ${when}. Send me the song/treatment and I'll match talent.`,
    event: `Hi! For your event${where}, we can staff ${main.label.toLowerCase()} (${main.from || 'custom quote'}) ${when}. What's the date and headcount?`,
    other: `Hi! Thanks for reaching out to Influence. Based on what you picked, I'd suggest ${main.label.toLowerCase()}. Quick 5-min call to scope it?`,
  }[a.type || 'other'];
  return { pkg, pitch };
}

const VENDOR_WORDS = /\b(seo|backlink|clipping|video edit(ing|or)|editing services?|web ?design|lead gen(eration)?|outsourc|virtual assistant|white[- ]label|agency (partnership|outreach)|grow your (business|followers)|guest post|marketing services|dev(elopment)? services|app development|crypto|loan|we (can|will) help you)\b/i;
const VENDOR_DOMAINS = /@(.*\.(ru|cn|xyz|top|click|biz)|.*(seo|clip|edit|leads|growth|outreach|agency|marketing)[a-z0-9-]*\.[a-z]+)$/i;
export function vendorFlags(t: { email?: string; name?: string; notes?: string; business?: string; ig?: string }): string[] {
  const f: string[] = [];
  if (t.email && VENDOR_DOMAINS.test(t.email)) f.push('vendor-domain');
  const txt = [t.name, t.notes, t.business, t.ig].filter(Boolean).join(' ');
  if (VENDOR_WORDS.test(txt)) f.push('solicitation-words');
  return f;
}
