// Example campaigns for the "See your business on the feed" phone on /preview/home-e.
// Real Influence talent footage and roster photos only. Business accounts are placeholders.
// No likes, follower, or view counts anywhere. Recap items come only from real package data
// (app/model-booking/page.tsx, the "popular" one-time package for that service) or the event
// facts in lib/influence-connect.ts; where a service has no packages, generic items without counts.

const S = '/images/stage';

export type BizType = 'restaurant' | 'nightclub' | 'hotel' | 'brand' | 'artist' | 'shoot' | 'event';
type N = (name: string) => string;

export type Screen =
  | { kind: 'story'; beat: number; bg: string; video?: string; anim?: string; title: N; sub: N; notif: N; ticket?: boolean }
  | { kind: 'reel'; beat: number; video: string; poster: string; caption: N; notif: N; audio?: N; label?: string }
  | { kind: 'post'; beat: number; image: string; caption: N; notif: N }
  | { kind: 'carousel'; beat: number; images: string[]; caption: N; notif: N }
  | { kind: 'repost'; beat: number; talent: string; avatar: string; image: string; line: N; notif: N; song?: boolean };

export type Campaign = {
  id: BizType;
  chip: string;
  defaultName: string;
  category: string;
  bio: string;
  /** ?service= key for /preview/booking (see data/booking-services.ts). */
  service: string;
  serviceLabel: string;
  /** Event only: the CTA goes to this page instead of the booking flow. */
  external?: { href: string; label: string };
  backdrop: string;
  grid: { src: string; reel?: boolean }[];
  beats: [string, string, string, string];
  screens: Screen[];
  recap: { source: string | null; items: string[] };
};

const AV = {
  des: '/images/feed/des-skyline-avatar.webp',
  kat: '/images/feed/kat-avatar.webp',
  seahra: '/images/feed/seahra-gold-avatar.webp',
  genesis: '/images/feed/genesis-avatar.webp',
  maria: '/images/feed/maria-avatar.webp',
};

const v = (id: string) => ({ video: `${S}/${id}.mp4`, poster: `${S}/${id}-poster.webp` });
// Venue B-roll (stories and profile tiles only, never the talent reels). Some venue footage via Pexels
// (free Pexels License); sources and creators in /workspace/pexels/credits.md. Stock venues are atmosphere,
// not Influence clients: no stock place is named, tagged or captioned as a client.
const px = (id: string) => ({ bg: `${S}/px-${id}-poster.webp`, video: `${S}/px-${id}.mp4`, anim: `${S}/px-${id}-anim.webp` });
const pxSq = (id: string) => ({ src: `${S}/px-${id}-sq.webp` });
const STD: [string, string, string, string] = ['Announcement story', 'Night-of reels', 'Collab post', 'Story reposts'];

export const campaigns: Campaign[] = [
  {
    id: 'restaurant',
    chip: 'Restaurant',
    defaultName: 'Your Restaurant',
    category: 'Restaurant',
    bio: 'Dinner, drinks, and weekend brunch.',
    service: 'business',
    serviceLabel: 'Brand Ambassadors',
    backdrop: `${S}/bg-restaurant.webp`,
    grid: [
      { src: `${S}/martini-sq-a.webp`, reel: true }, { src: `${S}/dinner-sq-a.webp`, reel: true }, { src: `${S}/genesis-sq.webp` },
      pxSq('dine-candle'), { src: `${S}/martini-sq-b.webp` }, { src: `${S}/alisha-sq.webp` },
      pxSq('champagne'), { src: `${S}/kat-sq.webp` }, { src: `${S}/des-pink-sq.webp` },
    ],
    beats: STD,
    screens: [
      { kind: 'story', beat: 0, ...px('dine-room'), title: (n) => `This Friday at ${n}`, sub: () => 'Brand Ambassador night · 8 PM', notif: (n) => `Your story for ${n} is live` },
      { kind: 'story', beat: 0, ...px('dine-candle'), title: () => 'Tables set for Friday', sub: () => 'Dinner with our Brand Ambassadors', notif: (n) => `${n} added to your story` },
      { kind: 'reel', beat: 1, ...v('martini'), caption: (n) => `Friday night at ${n}. Espresso martinis first.`, notif: () => 'A Brand Ambassador posted a reel' },
      { kind: 'reel', beat: 1, ...v('dinner'), caption: () => 'Dinner with our Brand Ambassadors.', notif: (n) => `New reel tagged ${n}` },
      { kind: 'post', beat: 2, image: `${S}/martini-45.webp`, caption: (n) => `${n} × Influence. Dinner with our Brand Ambassadors.`, notif: (n) => `${n} × Influence collab is live` },
      { kind: 'repost', beat: 3, talent: 'Genesis', avatar: AV.genesis, image: `${S}/martini-45.webp`, line: (n) => `Go see ${n}`, notif: () => 'Genesis shared your collab post' },
    ],
    recap: { source: 'Brand Ambassadors · Premium package', items: ['1 creator · full half-day', '4-hour session · multiple setups', '8–12 reels, posts & stories', 'Wardrobe changes included'] },
  },
  {
    id: 'nightclub',
    chip: 'Nightclub',
    defaultName: 'Your Lounge',
    category: 'Nightclub',
    bio: 'Bottle service and VIP tables. Fridays and Saturdays.',
    service: 'bottle',
    serviceLabel: 'VIP hosts and bottle service',
    backdrop: `${S}/bg-nightclub.webp`,
    grid: [
      { src: `${S}/lounge-sq-a.webp`, reel: true }, { src: `${S}/lounge2-sq-a.webp`, reel: true }, { src: `${S}/kat-sq.webp` },
      pxSq('club-dj'), { src: `${S}/lounge-sq-b.webp` }, { src: `${S}/des-lounge-sq.webp` },
      { src: `${S}/alisha-sq.webp` }, { src: `${S}/genesis-sq.webp` }, pxSq('bar-pour'),
    ],
    beats: STD,
    screens: [
      { kind: 'story', beat: 0, ...px('club-lasers'), title: (n) => `This Friday at ${n}`, sub: () => 'VIP hosts all night · Doors at 10', notif: (n) => `Kat tagged ${n} in a story` },
      { kind: 'story', beat: 0, ...px('club-dj'), title: (n) => `${n} after dark`, sub: () => 'Book a table with our VIP hosts', notif: (n) => `${n} added to your story` },
      { kind: 'reel', beat: 1, ...v('lounge'), caption: (n) => `Friday at ${n}. VIP tables with our hosts.`, notif: () => 'A VIP host posted a reel' },
      { kind: 'reel', beat: 1, ...v('lounge2'), caption: () => 'Late night in the VIP section.', notif: (n) => `New reel tagged ${n}` },
      { kind: 'post', beat: 2, image: `${S}/kat-45.webp`, caption: (n) => `${n} × Influence. Thank you Kat for hosting the VIP section.`, notif: (n) => `${n} × Influence collab is live` },
      { kind: 'repost', beat: 3, talent: 'Kat', avatar: AV.kat, image: `${S}/kat-45.webp`, line: (n) => `Tonight at ${n}`, notif: () => 'Kat shared your collab post' },
    ],
    recap: { source: 'VIP hosts and bottle service · 3 Bottle Girls package', items: ['3 VIP bottle girls / hostesses', '4-hour shift', 'Full VIP section coverage', 'South Florida'] },
  },
  {
    id: 'hotel',
    chip: 'Hotel',
    defaultName: 'Your Hotel',
    category: 'Hotel',
    bio: 'Rooftop, pool, and dining.',
    service: 'activation',
    serviceLabel: 'Venue activation',
    backdrop: `${S}/bg-hotel.webp`,
    grid: [
      { src: `${S}/pool-shoot-sq-a.webp`, reel: true }, pxSq('hotel-suite'), { src: `${S}/yacht-sq-a.webp`, reel: true },
      pxSq('dine-candle'), { src: `${S}/maria-sq.webp` }, pxSq('dine-room'),
      { src: `${S}/des-beach-sq.webp` }, pxSq('champagne'), { src: `${S}/kat-pool-sq.webp` },
    ],
    beats: ['Announcement story', 'Weekend reels', 'Collab post', 'Story reposts'],
    screens: [
      { kind: 'story', beat: 0, ...px('hotel-suite'), title: (n) => `This weekend at ${n}`, sub: () => 'Pool day with our creators · 1 PM', notif: (n) => `Deseray tagged ${n} in a story` },
      { kind: 'reel', beat: 1, ...v('pool-shoot'), caption: (n) => `Pool day at ${n}.`, notif: () => 'A creator posted a reel' },
      { kind: 'reel', beat: 1, ...v('yacht'), caption: (n) => `A weekend at ${n}, on the water.`, notif: (n) => `New reel tagged ${n}` },
      { kind: 'post', beat: 2, image: `${S}/des-skyline-45.webp`, caption: (n) => `${n} × Influence. Deseray's weekend, start to finish.`, notif: (n) => `${n} × Influence collab is live` },
      { kind: 'repost', beat: 3, talent: 'Deseray', avatar: AV.des, image: `${S}/des-skyline-45.webp`, line: (n) => `Weekend at ${n}`, notif: () => 'Deseray shared your collab post' },
    ],
    recap: { source: null, items: ['Creators at your property', 'Stories and reels from the day', 'A collab post on your feed and theirs', 'Story reposts from the talent'] },
  },
  {
    id: 'brand',
    chip: 'Brand',
    defaultName: 'Your Brand',
    category: 'Fashion and beauty',
    bio: 'New collection out now.',
    service: 'collabreposts',
    serviceLabel: 'Collab posts',
    backdrop: `${S}/bg-brand.webp`,
    grid: [
      { src: `${S}/dance-sq-a.webp`, reel: true }, { src: `${S}/beach-sq-a.webp`, reel: true }, { src: `${S}/seahra-gold-sq.webp` },
      { src: `${S}/des-pink2-sq.webp` }, { src: `${S}/celeste-sq.webp` }, { src: `${S}/dance-sq-b.webp` },
      { src: `${S}/seahra-sunset-sq.webp` }, { src: `${S}/genesis-tiki-sq.webp` }, { src: `${S}/kat-sea-sq.webp` },
    ],
    beats: ['Launch story', 'Creator reels', 'Collab post', 'Story reposts'],
    screens: [
      { kind: 'story', beat: 0, bg: `${S}/story-brand.webp`, title: (n) => `This Friday: the ${n} drop`, sub: () => 'New pieces, worn by our creators', notif: (n) => `Seahra tagged ${n} in a story` },
      { kind: 'reel', beat: 1, ...v('dance'), caption: (n) => `Swim season with ${n}.`, notif: () => 'A creator posted a reel' },
      { kind: 'reel', beat: 1, ...v('beach'), caption: (n) => `${n}, on the sand.`, notif: (n) => `New reel tagged ${n}` },
      { kind: 'post', beat: 2, image: `${S}/seahra-gold-45.webp`, caption: (n) => `${n} × Influence. Seahra in the new gold pieces.`, notif: (n) => `${n} × Influence collab is live` },
      { kind: 'repost', beat: 3, talent: 'Seahra', avatar: AV.seahra, image: `${S}/seahra-gold-45.webp`, line: (n) => `Wearing ${n}`, notif: () => 'Seahra shared your collab post' },
    ],
    recap: { source: 'Collab posts · Professional package', items: ['1 creator co-authors Reel with your brand', 'Appears on both feeds', 'Dual audience reach'] },
  },
  {
    id: 'artist',
    chip: 'Artist',
    defaultName: 'Your Name',
    category: 'Artist',
    bio: "New single 'Your Song' out Friday.",
    service: 'reaction',
    serviceLabel: 'Song promotion',
    backdrop: `${S}/bg-artist.webp`,
    grid: [
      { src: `${S}/dance-sq-a.webp`, reel: true }, { src: `${S}/party-sq-a.webp`, reel: true }, { src: `${S}/des-studio-sq.webp` },
      { src: `${S}/bathtub-sq-a.webp`, reel: true }, { src: `${S}/des-lounge-sq.webp` }, { src: `${S}/party-sq-b.webp` },
      { src: `${S}/bianca-sq.webp` }, { src: `${S}/kat-pool-sq.webp` }, { src: `${S}/ferrari-sq.webp` },
    ],
    beats: ['Release story', 'Audio reel', 'Creator reactions', 'Story reposts'],
    screens: [
      { kind: 'story', beat: 0, bg: `${S}/story-artist.webp`, title: () => "'Your Song'", sub: (n) => `New from ${n} · Out Friday`, notif: () => "Your release story for 'Your Song' is live" },
      { kind: 'reel', beat: 1, ...v('dance'), label: 'Reels', caption: () => "Use this sound: 'Your Song'.", audio: (n) => `${n} · Your Song`, notif: () => "A creator used 'Your Song'" },
      { kind: 'reel', beat: 2, ...v('bathtub'), label: 'Reaction', caption: () => "First listen: 'Your Song'.", audio: (n) => `${n} · Your Song`, notif: () => 'A creator posted a reaction' },
      { kind: 'reel', beat: 2, ...v('party'), label: 'Reaction', caption: () => "The group chat heard 'Your Song'.", audio: (n) => `${n} · Your Song`, notif: (n) => `New reaction tagged ${n}` },
      { kind: 'repost', beat: 3, talent: 'Deseray', avatar: AV.des, image: `${S}/des-beach-45.webp`, line: () => 'Go stream Your Song', notif: () => "Deseray shared 'Your Song'", song: true },
    ],
    recap: { source: 'Song promotion · Premium package', items: ['3 song reactions', 'HD vertical videos', 'Ready for all platforms'] },
  },
  {
    id: 'shoot',
    chip: 'Shoot / Commercial',
    defaultName: 'Your Brand',
    category: 'Brand',
    bio: 'The new campaign, shot with Influence.',
    service: 'shoot',
    serviceLabel: 'Photo and brand shoot',
    backdrop: `${S}/bg-shoot.webp`,
    grid: [
      { src: `${S}/bathtub-sq-a.webp`, reel: true }, { src: `${S}/des-pink-sq.webp` }, { src: `${S}/editorial-sq-a.webp`, reel: true },
      { src: `${S}/des-pink2-sq.webp` }, { src: `${S}/seahra-gold-sq.webp` }, { src: `${S}/des-pink3-sq.webp` },
      { src: `${S}/editorial-sq-b.webp` }, { src: `${S}/des-pink4-sq.webp` }, { src: `${S}/seahra-pyramid-sq.webp` },
    ],
    beats: ['Behind the scenes', 'On-set reel', 'Final photos', 'Brand post'],
    screens: [
      { kind: 'story', beat: 0, bg: `${S}/story-shoot.webp`, title: (n) => `On set for ${n}`, sub: () => 'Behind the scenes', notif: (n) => `Deseray tagged ${n} in a story` },
      { kind: 'reel', beat: 1, ...v('editorial'), label: 'Reels', caption: (n) => `Behind the scenes of the ${n} shoot.`, notif: () => 'Behind-the-scenes reel is up' },
      { kind: 'carousel', beat: 2, images: [1, 2, 3, 4].map((i) => `${S}/shoot-final-${i}.webp`), caption: (n) => `${n}. The final selects.`, notif: () => 'Your final photos are ready' },
      { kind: 'post', beat: 3, image: `${S}/shoot-final-2.webp`, caption: (n) => `${n} × Influence. The new campaign, shot with Deseray.`, notif: (n) => `${n} × Influence post is live` },
    ],
    recap: { source: 'Photo and brand shoot · Trio package', items: ['3 professional creators', '4 hours on set', 'Styled ensemble look', 'South Florida location'] },
  },
  {
    id: 'event',
    chip: 'Event',
    defaultName: 'Your Business',
    category: 'Business',
    bio: 'See you at Influence Connect.',
    service: 'event',
    serviceLabel: 'Creator networking night',
    external: { href: '/tickets', label: 'Get networking night tickets' },
    backdrop: `${S}/bg-event.webp`,
    grid: [
      { src: `${S}/serena-patio-sq.webp` }, { src: `${S}/pool-shoot-sq-a.webp`, reel: true }, { src: `${S}/serena-martini-sq.webp` },
      { src: `${S}/host-des-sq.webp` }, { src: `${S}/serena-dining-sq.webp` }, { src: `${S}/genesis-sq.webp` },
      { src: `${S}/serena-oldfashioned-sq.webp` }, { src: `${S}/kat-sq.webp` }, { src: `${S}/maria-sq.webp` },
    ],
    beats: ['Invite story', 'Meet the roster', 'Collab post', 'Ticket story'],
    screens: [
      { kind: 'story', beat: 0, bg: `${S}/story-event.webp`, title: () => 'Influence Connect', sub: () => 'Wed Nov 18 · 4 – 7 PM · Boca Raton', notif: (n) => `${n} is on the guest list` },
      { kind: 'story', beat: 0, ...px('champagne'), title: () => 'See you there', sub: () => 'Creators, brands and venues · one night', notif: () => 'Influence Connect added to your story' },
      { kind: 'reel', beat: 1, ...v('pool-shoot'), label: 'Reels', caption: () => 'The roster you meet at Influence Connect.', notif: () => 'Deseray posted the roster reel' },
      { kind: 'post', beat: 2, image: `${S}/event-45.webp`, caption: (n) => `${n} × Influence Connect. See you at Serena Pastificio.`, notif: (n) => `${n} × Influence collab is live` },
      { kind: 'repost', beat: 3, talent: 'Deseray', avatar: AV.des, image: `${S}/event-45.webp`, line: () => 'Get tickets', notif: () => 'Deseray shared the ticket link', song: false },
    ],
    recap: {
      source: 'Influence Connect · ticket page',
      items: ['Creator networking night', 'Wednesday, November 18, 2026 · 4 – 7 PM ET', 'Serena Pastificio, Mizner Park, Boca Raton', 'Hosted by Deseray Marie'],
    },
  },
];

export const findCampaign = (id: string) => campaigns.find((c) => c.id === id) ?? campaigns[0];

/** Talent behind the floating bubbles. Story frames are real roster photos. */
export const talentStories = [
  { id: 'des', name: 'Deseray', avatar: AV.des, frames: [1, 2, 3].map((i) => `${S}/st-des-${i}.webp`) },
  { id: 'seahra', name: 'Seahra', avatar: AV.seahra, frames: [1, 2, 3].map((i) => `${S}/st-seahra-${i}.webp`) },
  { id: 'kat', name: 'Kat', avatar: AV.kat, frames: [1, 2, 3].map((i) => `${S}/st-kat-${i}.webp`) },
  { id: 'genesis', name: 'Genesis', avatar: AV.genesis, frames: [1, 2].map((i) => `${S}/st-genesis-${i}.webp`) },
];

/** Turns a typed business name into a safe, Instagram-style handle. */
export function toHandle(name: string, fallback: string) {
  const h = name
    .toLowerCase()
    .replace(/&/g, ' and ')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9._ ]+/g, '')
    .trim()
    .replace(/\s+/g, '.')
    .replace(/\.{2,}/g, '.')
    .replace(/^\.+|\.+$/g, '')
    .slice(0, 28);
  return h || fallback.toLowerCase().replace(/\s+/g, '.');
}

/** Display name: trimmed, single-spaced, no markup characters. */
export function cleanName(name: string) {
  return name.replace(/[<>{}\[\]\\]/g, '').replace(/\s+/g, ' ').trim().slice(0, 32);
}
