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
// Each requested service maps to the closest Starter item for THAT service, or none (then we say so and
// suggest the smallest main package for that same service).
const STARTER_PICK: Record<string, { pkg: string; what: string } | undefined> = {
  mv: { pkg: 'Starter: Solo Model for Your Music Video, 1 hr ($249) or 2 hrs ($399)', what: 'one model for your music video, 1 hr ($249) or 2 hrs ($399)' },
  reaction: { pkg: 'Starter: Single Reaction Video ($350)', what: 'a single reaction video ($350)' },
  label: { pkg: 'Starter: Single Reaction Video ($350)', what: 'a single reaction video for the release ($350)' },
  ugc: { pkg: 'Starter: Single UGC Video ($350)', what: 'a single UGC video ($350)' },
  campaign: { pkg: 'Starter: Single Story Post ($200)', what: 'a single creator story post ($200)' },
};
// Smallest main package per service (used when there is no Starter equivalent or budget is below it).
const SMALLEST: Record<string, string> = {
  ambassador: 'Brand Ambassador Half-Day visit ($600)',
  hosts: 'Event models, 2-model 4-hr minimum ($760)',
  bottle: 'VIP hostesses, 2-hostess 4-hr minimum ($760)',
  venueMonthly: 'Brand Ambassador Half-Day visit ($600) as a one-off before a monthly program ($2,130/mo)',
  ugc: 'UGC 3-pack ($750)',
  campaign: 'Influencer campaign (from $2,500/mo)',
  shoot: 'Shoot model, half day ($600)',
  mv: 'Music video Featured model ($450)',
  reaction: 'High-Reach Reaction ($500)',
  label: 'Label rollout campaign (from $2,500/mo)',
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

const BUDGET_MAX: Record<string, number> = { [STARTER_BUDGET]: 449, '$450–1.5K': 1500, '$1.5K–5K': 5000, '$5K+': Infinity };
const MIN_PRICE: Record<string, number> = { ambassador: 600, hosts: 760, bottle: 760, venueMonthly: 2130, ugc: 750, campaign: 2500, shoot: 600, mv: 450, reaction: 500, label: 2500 };
const TYPE_DEFAULT: Record<LeadType, string> = { venue: 'ambassador', brand: 'ugc', artist: 'mv', event: 'hosts', other: 'notsure' };
export const lc = (x: string) => (/^[A-Z]{2}/.test(x) ? x : x.charAt(0).toLowerCase() + x.slice(1));
function joinList(xs: string[]) { return xs.length <= 1 ? xs.join('') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`; }

/** Requested services (in the order they were picked), ignoring "not sure". */
export function requestedServices(a: LeadAnswers): Svc[] {
  return (a.services || []).map((id) => S[id]).filter((s): s is Svc => !!s && s.id !== 'notsure');
}

export function recommend(a: LeadAnswers): { pkg: string; pitch: string } {
  const type: LeadType = a.type || 'other';
  const asked = requestedServices(a);
  const who = a.business || a.ig || ({ venue: 'your venue', brand: 'your brand', artist: 'your release', event: 'your event', other: 'your project' } as const)[type];
  const when = a.timing === 'This week' ? 'this week' : a.timing === 'This month' ? 'this month' : 'whenever you’re ready';
  const where = a.city && !a.city.startsWith('Other') ? ` in ${a.city}` : '';
  const close = { venue: 'Want 3 talent options and a quote?', brand: 'Want me to send creator picks that fit your product?', artist: 'Send me the song or treatment and I’ll match talent.', event: 'What’s the date, location and headcount?', other: 'Quick 5-min call to scope it?' }[type];

  const contentOnly = asked.length > 0 && asked.every((s) => ['ugc', 'campaign', 'reaction', 'label'].includes(s.id));
  const closeQ = contentOnly ? 'Want me to send creator picks and a quick brief so we can get started?' : close;
  // Nothing specific requested: say so and offer a call; suggest the type's usual starting point.
  if (!asked.length) {
    const d = S[TYPE_DEFAULT[type]];
    const pkg = d.id === 'notsure' ? S.notsure.pkg : `Discovery call; typical starting point: ${SMALLEST[d.id]}`;
    return { pkg, pitch: `Hi! Thanks for reaching out about ${who}${where}. You weren’t sure yet which service fits, so a quick 5-min call is the fastest way to scope it${d.id === 'notsure' ? '' : `; most ${LEAD_TYPES.find((t) => t.id === type)!.label.toLowerCase()} clients start with ${lc(d.label)}`}. What’s a good time ${when}?` };
  }

  const max = BUDGET_MAX[a.budget || ''] ?? Infinity;
  const names = joinList(asked.map((s) => lc(s.label)));

  if (a.budget === STARTER_BUDGET) {
    const parts = asked.map((s) => {
      const st = STARTER_PICK[s.id];
      return st ? { pkg: st.pkg, line: `for ${lc(s.label)}, our Starter option is ${st.what}` } : { pkg: `No Starter option for ${lc(s.label)}; smallest package: ${SMALLEST[s.id]}`, line: `${lc(s.label)} doesn’t have a Starter option; the smallest package is ${SMALLEST[s.id]}` };
    });
    const anyStarter = asked.some((s) => STARTER_PICK[s.id]);
    const pkg = parts.map((p) => p.pkg).join(' | ') + (anyStarter ? ` (see ${STARTER_HREF})` : '');
    const link = anyStarter ? ` You can book it here: https://influencecreators.marketing${STARTER_HREF}.` : '';
    return { pkg, pitch: `Hi! Thanks for reaching out about ${names} for ${who}${where}. On your budget, ${parts.map((p) => p.line).join('; ')}.${link} We can make ${when} work. ${closeQ}` };
  }

  // Main packages: one line per requested service, never swapping in a service they didn't ask for.
  const big = max > 1500;
  const pkgs = asked.map((s) => {
    if (s.id === 'mv' && big) return 'Music video Ensemble: 3 models, full day ($1,950)';
    if (s.id === 'ugc' && max === Infinity) return 'UGC 10-pack ($2,250)';
    return s.pkg;
  });
  const over = asked.filter((s) => MIN_PRICE[s.id] > max);
  let pkg = pkgs.join(' | ');
  if (type === 'venue' && big && asked.some((s) => ['ambassador', 'hosts', 'bottle'].includes(s.id)) && !asked.some((s) => s.id === 'venueMonthly')) pkg += ` | Optional upsell: ${S.venueMonthly.pkg}`;
  if (over.length) pkg += ` | Note: ${joinList(over.map((s) => `${lc(s.label)} starts at ${s.from}`))}, above the stated budget`;
  const fromTxt = joinList(asked.map((s) => `${lc(s.label)} (from ${s.from})`));
  const budgetNote = over.length ? ` Heads up: ${joinList(over.map((s) => `${lc(s.label)} starts at ${s.from}`))}, so I can suggest how to fit it to your budget.` : '';
  const verb = { venue: `we can have vetted, camera-ready talent for ${fromTxt} at ${who}${where}`, brand: `we can start ${who} with ${fromTxt}`, artist: `we can lock in ${fromTxt} for ${who}${where}`, event: `we can set up ${fromTxt} for ${who}${where}`, other: `we can do ${fromTxt} for ${who}${where}` }[type];
  return { pkg, pitch: `Hi! Thanks for reaching out about ${names}. ${verb.charAt(0).toUpperCase() + verb.slice(1)} ${when}.${budgetNote} ${closeQ}` };
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
