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

/** Unsourced claims. Rendered only when verified, same gate as partners. */
export const claims: SiteClaim[] = [
  {
    name: 'South Florida #1',
    text: "Rated South Florida's #1 Influencer Marketplace",
    proofUrl: '',
    verified: false,
  },
];

export const verifiedPartners = partners.filter((partner) => partner.verified);
export const verifiedClaims = claims.filter((claim) => claim.verified);
