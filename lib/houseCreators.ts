export type HouseCity = {
  slug: string;
  name: string;
  region: string;
  state: 'FL';
  lat: number;
  lng: number;
  neighborhoods: string[];
  venues: string;
  hook: string;
  why: string;
};

export const HOUSE_MONTHLY = [
  { id: 'house-1', influencers: 1, name: '1 Influencer', tagline: '2 visits / month · 2 collab posts · story support', visits: 2, posts: 2, price: 3200, popular: false },
  { id: 'house-2', influencers: 2, name: '2 Influencers', tagline: '4 visits / month · two audiences', visits: 4, posts: 4, price: 5800, popular: true },
  { id: 'house-3', influencers: 3, name: '3 Influencers', tagline: '6 visits / month · weekday + weekend coverage', visits: 6, posts: 6, price: 8200, popular: false },
  { id: 'house-4', influencers: 4, name: '4 Influencers', tagline: '8 visits / month · restaurant + nightlife pace', visits: 8, posts: 8, price: 10400, popular: false },
  { id: 'house-5', influencers: 5, name: '5 Influencers', tagline: '10 visits / month · full content bench', visits: 10, posts: 10, price: 12500, popular: false },
  { id: 'house-8', influencers: 8, name: '8 Influencers', tagline: '16 visits / month · multi-location / group venues', visits: 16, posts: 16, price: 18500, popular: false },
];

export const HOUSE_TRIAL = [
  { id: 'trial-1', influencers: 1, name: 'Trial · 1 Influencer', tagline: '1 night · prove it before a retainer', visits: 1, posts: 1, price: 850, popular: true },
  { id: 'trial-2', influencers: 2, name: 'Trial · 2 Influencers', tagline: '1 night · two feeds, same room', visits: 1, posts: 2, price: 1500, popular: false },
  { id: 'trial-3', influencers: 3, name: 'Trial · 3 Influencers', tagline: '1 night · three audiences', visits: 1, posts: 3, price: 2100, popular: false },
  { id: 'trial-4', influencers: 4, name: 'Trial · 4 Influencers', tagline: '1 night · event-scale drop', visits: 1, posts: 4, price: 2700, popular: false },
  { id: 'trial-5', influencers: 5, name: 'Trial · 5 Influencers', tagline: '1 night · full takeover test', visits: 1, posts: 5, price: 3250, popular: false },
];

export const HOUSE_CITIES: HouseCity[] = [
  { slug: 'miami', name: 'Miami', region: 'Miami-Dade', lat: 25.7617, lng: -80.1918, neighborhoods: ['Brickell', 'Wynwood', 'Downtown', 'Coconut Grove', 'Design District', 'Little Havana', 'Coral Gables', 'Miami Beach'], venues: 'restaurants, bars, rooftops, and clubs from Brickell to Wynwood', hook: 'Miami rooms live and die on Instagram. Tourists and locals both pick dinner from Reels.', why: 'Our roster is already in Miami. They know the neighborhoods, the dress codes, and what actually gets saved vs skipped.' },
  { slug: 'miami-beach', name: 'Miami Beach', region: 'Miami-Dade', lat: 25.7907, lng: -80.13, neighborhoods: ['South Beach', 'Mid-Beach', 'North Beach', 'Sunset Harbour', 'Lincoln Road'], venues: 'South Beach restaurants, hotel bars, and Ocean Drive nightlife', hook: 'Miami Beach is a content city. If your room is not on stories, a tourist three blocks away books somewhere that is.', why: 'Hotel restaurants and beach clubs need recurring faces, not one promo night that disappears when the influencer flies home.' },
  { slug: 'brickell', name: 'Brickell', region: 'Miami-Dade', lat: 25.766, lng: -80.1916, neighborhoods: ['Brickell City Centre', 'Mary Brickell Village', 'Brickell Key'], venues: 'after-work dining, rooftop bars, and weekday-to-weekend Brickell spots', hook: 'Brickell books off after-work Reels. A creator eating at your bar on Thursday puts you in Friday plans.', why: 'We send influencers who already live and post in Brickell.' },
  { slug: 'wynwood', name: 'Wynwood', region: 'Miami-Dade', lat: 25.801, lng: -80.1994, neighborhoods: ['Wynwood Walls', 'Wynwood Arts District', 'Midtown'], venues: 'Wynwood restaurants, cafes, and weekend brunch rooms', hook: 'Wynwood traffic is visual. People come to be in the photo. Your room should be the photo.', why: 'Creators who already shoot in Wynwood bring an audience looking for a spot in the neighborhood.' },
  { slug: 'fort-lauderdale', name: 'Fort Lauderdale', region: 'Broward', lat: 26.1224, lng: -80.1373, neighborhoods: ['Las Olas', 'Fort Lauderdale Beach', 'Downtown', 'Victoria Park'], venues: 'Las Olas restaurants, beach bars, and downtown nightlife', hook: 'Las Olas and the beach strip are crowded. The rooms that stay booked are the ones people saw on a local feed that week.', why: 'We book local Broward talent into local rooms — Fort Lauderdale is not an afterthought.' },
  { slug: 'hollywood', name: 'Hollywood', region: 'Broward', lat: 26.0112, lng: -80.1495, neighborhoods: ['Hollywood Beach Broadwalk', 'Downtown Hollywood', 'Young Circle'], venues: 'Broadwalk restaurants, beach bars, and downtown Hollywood rooms', hook: 'The Broadwalk is a walk-up market. Stories with a location tag turn walkers into tables the same night.', why: 'Local influencers tagging your pin beat a national creator who will never come back.' },
  { slug: 'boca-raton', name: 'Boca Raton', region: 'Palm Beach', lat: 26.3683, lng: -80.1289, neighborhoods: ['Mizner Park', 'Downtown Boca', 'Royal Palm', 'East Boca'], venues: 'Mizner Park restaurants, Boca bars, and upscale dining', hook: 'Boca books on trust and look. One polished visit is an ad. A creator coming back every other week is a recommendation.', why: 'We match talent to Boca rooms — not club energy in a fine-dining room.' },
  { slug: 'delray-beach', name: 'Delray Beach', region: 'Palm Beach', lat: 26.4615, lng: -80.0728, neighborhoods: ['Atlantic Avenue', 'Pineapple Grove', 'Delray Beach'], venues: 'Atlantic Avenue restaurants, wine bars, and weekend nightlife', hook: 'Atlantic Avenue is a street people scroll before they walk. If you are not in the feed that afternoon, they sit somewhere that is.', why: 'Delray weekends fill from local stories.' },
  { slug: 'west-palm-beach', name: 'West Palm Beach', region: 'Palm Beach', lat: 26.7153, lng: -80.0534, neighborhoods: ['Clematis Street', 'Downtown WPB', 'The Square', 'Northwood'], venues: 'Clematis restaurants, downtown bars, and West Palm nightlife', hook: 'Downtown West Palm is rebuilding its night. The rooms that own the feed own the sidewalk.', why: 'Palm Beach County talent plus a calendar.' },
  { slug: 'palm-beach', name: 'Palm Beach', region: 'Palm Beach', lat: 26.7056, lng: -80.0364, neighborhoods: ['Worth Avenue', 'Royal Poinciana', 'Midtown Palm Beach'], venues: 'Worth Avenue dining and hotel restaurants', hook: 'Palm Beach does not want loud. It wants the right face, in the room, on a schedule.', why: 'Polished creators who can sit a Worth Avenue dinner and still convert on Instagram.' },
  { slug: 'aventura', name: 'Aventura', region: 'Miami-Dade', lat: 25.9565, lng: -80.1392, neighborhoods: ['Aventura Mall', 'Williams Island', 'North Miami Beach'], venues: 'Aventura restaurants and mall-adjacent dining', hook: 'Aventura traffic is mall + condo. People decide dinner in the elevator.', why: 'North Dade is a primary market, not a drive-by.' },
  { slug: 'coral-gables', name: 'Coral Gables', region: 'Miami-Dade', lat: 25.721, lng: -80.2684, neighborhoods: ['Miracle Mile', 'Downtown Coral Gables', 'South Gables'], venues: 'Miracle Mile restaurants and Gables dining rooms', hook: 'Gables diners plan. A creator they follow eating on Miracle Mile is how you get into that plan.', why: 'The look has to match the city.' },
  { slug: 'pompano-beach', name: 'Pompano Beach', region: 'Broward', lat: 26.2379, lng: -80.1248, neighborhoods: ['Pompano Beach', 'Atlantic Blvd', 'Old Pompano'], venues: 'Pompano restaurants and beach bars', hook: 'Pompano is growing fast and most agencies still skip it.', why: 'Local Broward creators plus a monthly calendar.' },
  { slug: 'hallandale-beach', name: 'Hallandale Beach', region: 'Broward', lat: 25.9812, lng: -80.1484, neighborhoods: ['Hallandale Beach', 'Gulfstream', 'Three Islands'], venues: 'Hallandale restaurants and beach bars', hook: 'Hallandale sits between Hollywood and Aventura. The feed that wins here pulls from both.', why: 'Talent who already post across South Broward / North Dade.' },
  { slug: 'sunny-isles', name: 'Sunny Isles Beach', region: 'Miami-Dade', lat: 25.929, lng: -80.122, neighborhoods: ['Sunny Isles Beach', 'Collins Ave'], venues: 'Sunny Isles hotel restaurants and oceanfront dining', hook: 'Guests and residents pick a room from Instagram before they come downstairs.', why: 'Recurring creators in the hotel-and-tower circuit beat a one-time activation.' },
];

export const SOUTH_FLORIDA_CITIES = HOUSE_CITIES.map((c) => c.name);

export function cityPath(slug: string) {
  return `/restaurant-influencers-${slug}`;
}

export function pillarPath() {
  return '/hire-influencers-for-restaurant';
}
