/**
 * Brands and venues Influence may have worked with.
 * The site renders an entry only when `verified` is true.
 * Until then, `proofUrl` stays empty and `logo` stays empty
 * (the UI falls back to a gold wordmark when a logo file is added later).
 */
export type Partner = {
  name: string;
  /** Public path such as `/logos/netflix.svg`. Empty when no file exists. */
  logo: string;
  /** Link to a post, recap, press hit, or other receipt. Empty until one exists. */
  proofUrl: string;
  verified: boolean;
};

export type SiteClaim = {
  /** Short internal name. */
  name: string;
  text: string;
  proofUrl: string;
  verified: boolean;
};

const unverified = (name: string): Partner => ({
  name,
  logo: '',
  proofUrl: '',
  verified: false,
});

/**
 * Every brand, venue, artist, and credit name the live site presents as
 * social proof, plus the restaurants named by the studio.
 * All start unverified — nothing in this list is rendered.
 */
const NAMES = [
  // Venues
  'DessertZ',
  'Oia',
  'Prime Time',
  'Serena Pastificio',
  // Brands, media, and credits named on the live site
  'Akon',
  'AMP',
  'Audible',
  'Bossman Dlow',
  'Bryson Tiller',
  'Buju Banton',
  'Celsius',
  'Couple to Trouple',
  'DaBaby',
  'Dez Beauty',
  'DJ Khaled',
  'Elite 6 Makeup',
  'Fashion Nova',
  'Fenty Beauty',
  'Forbes',
  'French Montana',
  'Future',
  'Got2Be',
  'Hurricane Wisdom',
  'Iridium Clothing',
  'Kai Cenat',
  'Kali Uchis',
  'Kava',
  'Keke Palmer',
  'Kisssmoothes',
  'Kodak Black',
  'Lil Baby',
  'Lil Pump',
  'Love & Hip Hop',
  'Lucci',
  'Meta Ray-Ban',
  'Miami Swim Week',
  'Mike Tyson',
  'Moneybagg Yo',
  'Netflix',
  'NLE Choppa',
  'Peacock',
  'Plaqueboymax',
  'PrettyLittleThing',
  'Red Stripe',
  'Sacrifice',
  'Savage X Fenty',
  'Sean Paul',
  'Shaggy',
  'SHEIN',
  'Spanish Fly',
  'Target',
  'Tekashi 6ix9ine',
  'Trippie Redd',
  'Tyra Banks',
  'VH1',
  'Vybz Kartel',
  'Young Thug',
];

export const partners: Partner[] = NAMES.map(unverified);

/**
 * Unsourced claims. A claim renders only when `verified` is true.
 * Visible badges, ratings, delivery promises, view counts, press lines,
 * and fake testimonials stay in this list so they can be turned on with proof.
 */
export const claims: SiteClaim[] = [
  { name: 'South Florida #1', text: "Rated South Florida's #1 Influencer Marketplace", proofUrl: '', verified: false },
  { name: 'Stars rated #1', text: '★★★★★ Rated #1 in South Florida', proofUrl: '', verified: false },
  { name: 'Five stars', text: '★★★★★', proofUrl: '', verified: false },
  { name: '5 stars label', text: '5 Stars', proofUrl: '', verified: false },
  { name: 'Average rating', text: '★ 5.0 Average Rating', proofUrl: '', verified: false },
  { name: 'Client rating', text: '4.9★ Client Rating', proofUrl: '', verified: false },
  { name: 'Content 48hrs', text: 'Content Delivered in 48hrs', proofUrl: '', verified: false },
  { name: 'Content in 48hrs', text: 'Content in 48hrs', proofUrl: '', verified: false },
  { name: '48hrs delivery', text: '48hrs Delivery Time', proofUrl: '', verified: false },
  { name: '48hr response', text: '48hr Avg. Response', proofUrl: '', verified: false },
  { name: '48hr turnaround', text: '48hr Avg. Turnaround', proofUrl: '', verified: false },
  { name: '48-Hr Turnaround', text: '48-Hr Turnaround', proofUrl: '', verified: false },
  { name: 'Ready in 48 hours', text: 'ready to post in 48 hours', proofUrl: '', verified: false },
  { name: 'Fast turnaround sentence', text: 'Most content delivered within 48 hours. Full campaigns complete in 7–14 days.', proofUrl: '', verified: false },
  { name: 'Celebrity-connected badge', text: 'Celebrity-Connected Creators', proofUrl: '', verified: false },
  { name: 'Verified network badge', text: 'Verified Network', proofUrl: '', verified: false },
  { name: 'Celebrity collaborator', text: 'Celebrity Collaborator', proofUrl: '', verified: false },
  { name: '40M views', text: '40M+ Music Video Views', proofUrl: '', verified: false },
  { name: 'Forbes featured', text: 'Forbes Featured', proofUrl: '', verified: false },
  { name: 'Forbes bullet', text: 'Featured in Forbes, Fenty Beauty, SavageXFenty & Meta Ray-Ban', proofUrl: '', verified: false },
  { name: '500 clients', text: '500+ Clients Booked', proofUrl: '', verified: false },
  { name: '500 brands', text: '500+ Brands Served', proofUrl: '', verified: false },
  { name: '10K reels', text: '10K+ Reels Delivered', proofUrl: '', verified: false },
  { name: '300 brands', text: '300+ Brand Clients', proofUrl: '', verified: false },
  { name: '3x roas', text: '3x Avg. ROAS Lift', proofUrl: '', verified: false },
  { name: '3-5x engagement', text: '3–5x More Engagement', proofUrl: '', verified: false },
  { name: '10x reach', text: '10x More Reach', proofUrl: '', verified: false },
  { name: '4.5x engagement', text: '4.5x Higher Engagement', proofUrl: '', verified: false },
  { name: '60% cost', text: '60% Lower Cost', proofUrl: '', verified: false },
  { name: '3x conversion', text: '3x Better Conversion', proofUrl: '', verified: false },
  { name: '2000 shoots', text: '2,000+ Shoots Booked', proofUrl: '', verified: false },
  { name: '1000 events', text: '1,000+ Events Staffed', proofUrl: '', verified: false },
  { name: '50 venues', text: '50+ Venue Partners', proofUrl: '', verified: false },
  { name: '1M reach', text: '1M+ Combined Reach', proofUrl: '', verified: false },
  { name: '500 campaigns', text: '500+ Campaigns Run', proofUrl: '', verified: false },
  { name: '3.5x lift', text: '3.5x Avg. Engagement Lift', proofUrl: '', verified: false },
  { name: '100M reach', text: '100M+ Campaign Reach', proofUrl: '', verified: false },
  { name: '50 labels', text: '50+ Label Clients', proofUrl: '', verified: false },
  { name: '100 videos', text: '100+ Large-Scale Videos', proofUrl: '', verified: false },
  { name: '500 videos', text: '500+ Videos Cast', proofUrl: '', verified: false },
  { name: '50 artists', text: '50+ Major Artists', proofUrl: '', verified: false },
  { name: '24hr booking', text: '24hr Average Booking', proofUrl: '', verified: false },
  { name: 'Magazine features', text: '20+ Magazine Features', proofUrl: '', verified: false },
  { name: 'Fashion walks', text: '10+ Fashion Show Walks', proofUrl: '', verified: false },
  { name: 'Combined reach', text: '50K+ Combined Reach', proofUrl: '', verified: false },
  { name: '10K views guarantee', text: '10K+ Views / Reel', proofUrl: '', verified: false },
  { name: 'Fashion testimonial', text: 'We sent over 3 pieces and got back 6 reels within 48 hours. Our TikTok views went from 200 to 40,000 on the first post. This is exactly what our brand needed.', proofUrl: '', verified: false },
  { name: 'LP testimonial', text: 'We saw a 4x increase in engagement within the first week. The content was exactly on-brand.', proofUrl: '', verified: false },
  { name: 'Celebrity roster sentence', text: 'Our creators have worked alongside Sean Paul, Moneybagg Yo, Lil Pump, 6ix9ine, Bossman Dlow, Kai Cenat, Bryson Tiller, Akon & more.', proofUrl: '', verified: false },
  { name: '100 brand clients', text: '100+ Brand Clients', proofUrl: '', verified: false },
  { name: '7-day setup', text: '7-day Avg. Campaign Setup', proofUrl: '', verified: false },
  { name: '7-day avg setup', text: '7-day Avg. Setup', proofUrl: '', verified: false },
  { name: '10M reach badge', text: '10M+ Reach', proofUrl: '', verified: false },
  { name: '5M feature', text: '5M+ combined reach', proofUrl: '', verified: false },
  { name: 'Countries stat', text: '4 Countries', proofUrl: '', verified: false },
  { name: 'Music video bullet', text: 'Music videos with Sean Paul, Bryson Tiller, DaBaby, Akon, Moneybagg Yo, Lil Pump, 6ix9ine, Bossman Dlow & Young Thug', proofUrl: '', verified: false },
  { name: 'Celebrity work bullet', text: 'Celebrity work with Kai Cenat, AMP, Mike Tyson, Tyra Banks & Keke Palmer', proofUrl: '', verified: false },
  { name: 'TV film bullet', text: 'TV: Love & Hip Hop · Films: Sacrifice, Spanish Fly', proofUrl: '', verified: false },
  { name: 'Magazine bullet', text: '20+ magazine features · 10+ fashion show walks across 4 countries', proofUrl: '', verified: false },
  { name: '20 magazines', text: '20+ Magazines', proofUrl: '', verified: false },
  { name: '10 fashion shows', text: '10+ Fashion Shows', proofUrl: '', verified: false },
  { name: 'Top creator network', text: "South Florida's top creator network", proofUrl: '', verified: false },
  { name: 'LP venue badge', text: 'Top South FL Venues', proofUrl: '', verified: false },
  { name: 'Book in 24 hrs', text: 'Book in 24 Hrs', proofUrl: '', verified: false },
  { name: '100 music videos cast', text: '100+ Music Videos Cast', proofUrl: '', verified: false },
  { name: '24-hr booking badge', text: '24-Hr Booking', proofUrl: '', verified: false },
  { name: 'VIP testimonial', text: "Best agency I've worked with. Showed up early, looked amazing, and kept the VIP section popping all night.", proofUrl: '', verified: false },
  { name: 'Music video testimonial', text: 'Booked a full cast for my music video in less than 24 hours. Professional, on time, and the content was 🔥', proofUrl: '', verified: false },
  { name: 'Followers', text: 'Followers', proofUrl: '', verified: false },
  { name: 'Years modeling', text: '7 Years Modeling', proofUrl: '', verified: false },
  { name: 'Years modeling label', text: 'Years Modeling', proofUrl: '', verified: false },
  { name: 'Available this week', text: 'Available This Week', proofUrl: '', verified: false },
  { name: 'Same-week pill', text: 'Same-week availability · Book in 2 min', proofUrl: '', verified: false },
  { name: 'Same-week availability', text: 'Same-week availability', proofUrl: '', verified: false },
  { name: 'Same-week booking', text: 'Same-week booking', proofUrl: '', verified: false },
  { name: 'Testimonial label', text: 'Testimonial', proofUrl: '', verified: false },
  { name: 'Delivered in 48hrs line', text: 'Content delivered in 48hrs', proofUrl: '', verified: false },
  { name: 'Remote 48hrs', text: 'Remote content delivered in 48hrs', proofUrl: '', verified: false },
  { name: 'Delivered in 48hrs check', text: 'Delivered in 48hrs', proofUrl: '', verified: false },
  { name: 'Celebrity-connected phrase', text: 'Celebrity-connected', proofUrl: '', verified: false },
  { name: 'Verified creators badge', text: 'Verified Creators', proofUrl: '', verified: false },
  { name: 'Verified influencers badge', text: 'Verified Influencers', proofUrl: '', verified: false },
  { name: 'Worked with caption', text: 'Our creators has worked with', proofUrl: '', verified: false },
  { name: 'Worked alongside caption', text: 'Our creators have worked alongside', proofUrl: '', verified: false },
  { name: 'Same-week shoots', text: 'Same-week shoots are available', proofUrl: '', verified: false },
  { name: 'Within 24-48 hyphen', text: 'within 24-48 hours', proofUrl: '', verified: false },
  { name: 'Within 24-48 dash', text: 'within 24–48 hours', proofUrl: '', verified: false },
  { name: 'Within 48 hours', text: 'within 48 hours', proofUrl: '', verified: false },
  { name: 'Booked within 48', text: 'booked within 48 hours', proofUrl: '', verified: false },
  { name: 'Millions reach', text: 'in front of millions', proofUrl: '', verified: false },
];

export const verifiedPartners = partners.filter((partner) => partner.verified);
export const verifiedClaims = claims.filter((claim) => claim.verified);

function norm(value: string) {
  return value.trim().toLowerCase();
}

/** True when this badge (stat, label, or "stat label") is allowed on screen. */
export function showBadge(stat: string, label = ''): boolean {
  const candidates = [stat, label, `${stat} ${label}`.trim()].map(norm).filter(Boolean);
  return !claims.some((claim) => !claim.verified && candidates.includes(norm(claim.text)));
}

/** True when this exact line, or a long unverified phrase inside it, must stay off screen. */
export function hideCopy(text: string): boolean {
  const value = norm(text);
  return claims.some((claim) => {
    if (claim.verified) return false;
    const phrase = norm(claim.text);
    if (value === phrase) return true;
    return phrase.length >= 12 && value.includes(phrase);
  });
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Remove unverified claims and unproven credit names from a visible line. */
export function scrubCopy(text: string): string {
  let next = text;
  const phrases = claims
    .filter((claim) => !claim.verified && claim.text.trim().length >= 12)
    .map((claim) => claim.text)
    .sort((a, b) => b.length - a.length);
  for (const phrase of phrases) {
    next = next.replace(new RegExp(escapeRegExp(phrase), 'ig'), '');
  }
  const names = partners
    .filter((partner) => !partner.verified)
    .map((partner) => partner.name)
    .sort((a, b) => b.length - a.length);
  next = next
    .split(/(?<=[.!?])\s+/)
    .filter((sentence) => {
      const hits = names.filter((name) => new RegExp(`\\b${escapeRegExp(name)}\\b`, 'i').test(sentence)).length;
      return hits < 2;
    })
    .join(' ');
  next = next
    .replace(/\b\d[\d.,]*\s*[kKmM]\+?\s*followers?\b/gi, '')
    .replace(/\s*[·|]\s*/g, ' · ')
    .split(' · ')
    .map((part) => part.trim())
    .filter((part) => part && !names.some((name) => name.toLowerCase() === part.toLowerCase()))
    .filter((part) => !hideCopy(part))
    .join(' · ');
  return next
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/([,.;:]){2,}/g, '$1')
    .replace(/\(\s*\)/g, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/^[\s·,.;:–\-]+|[\s·,.;:–\-]+$/g, '')
    .trim();
}

/** Visible bio copy with unverified press and view-count clauses removed. */
export function publicBio(text: string): string {
  return text
    .replace(/With \d+ years of professional modeling experience,\s*/gi, '')
    .replace(/she has been published in 20\+ magazines and walked 10\+ fashion shows across four countries \([^)]*\)\.\s*/gi, '')
    .replace(/published in 20\+ magazines[^.]*\.\s*/gi, '')
    .replace(/\b[\d.,]+\s*[kKmM]\+?\s*followers?\b/gi, '')
    .replace(/\bwith\s+[\d.,]+\s*[kKmM]?\s*following\b/gi, '')
    .replace(/She has been featured in Forbes Magazine[^.]*\.\s*/gi, '')
    .replace(/\s*with over 40 million combined views\.?/gi, '.')
    .replace(/Featured in Forbes Magazine\.\s*/gi, '')
    .replace(/40M\+\s*music video views\.?\s*/gi, '')
    .replace(/Forbes Featured\s*·?\s*/gi, '')
    .replace(/Same-week availability\.?\s*/gi, '')
    .replace(/Same-week booking available\.?\s*/gi, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/\s+\./g, '.')
    .replace(/^\s*,\s*/, '')
    .trim();
}
