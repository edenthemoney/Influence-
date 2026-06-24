// Business prospect finder using Google Places API (Text Search + Place Details)
// Get a key: https://console.cloud.google.com/ → enable "Places API"

export interface BusinessProspect {
  placeId: string;
  name: string;
  address: string;
  phone?: string;
  website?: string;
  rating?: number;
  reviewCount?: number;
  types: string[];
  mapsUrl: string;
}

const PLACES_KEY = () => process.env.GOOGLE_PLACES_API_KEY || '';

// High-value local business categories for an influencer/model agency
export const BUSINESS_NICHES = [
  'med spa',
  'medical spa',
  'restaurant',
  'nightclub',
  'lounge',
  'hookah lounge',
  'bar',
  'clothing boutique',
  'hair salon',
  'beauty salon',
  'nail salon',
  'gym fitness',
  'car dealership',
  'jewelry store',
  'real estate agency',
  'event venue',
  'cigar lounge',
  'barbershop',
  'tattoo studio',
  'dispensary',
];

// Primary South Florida target markets
export const TARGET_CITIES = [
  'Miami FL',
  'Fort Lauderdale FL',
  'Hollywood FL',
  'Hialeah FL',
  'Boca Raton FL',
  'West Palm Beach FL',
  'Doral FL',
  'Aventura FL',
  'Brickell Miami FL',
  'Wynwood Miami FL',
];

async function placesFetch(endpoint: string): Promise<any> {
  const key = PLACES_KEY();
  if (!key) throw new Error('Missing GOOGLE_PLACES_API_KEY in environment');
  const sep = endpoint.includes('?') ? '&' : '?';
  const url = `https://maps.googleapis.com/maps/api/place${endpoint}${sep}key=${key}`;
  const res = await fetch(url, { signal: AbortSignal.timeout(12000) });
  if (!res.ok) throw new Error(`Google Places error: ${res.status}`);
  const data = await res.json();
  if (data.status && data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
    throw new Error(`Google Places: ${data.status}${data.error_message ? ` — ${data.error_message}` : ''}`);
  }
  return data;
}

// Search businesses by niche + city, e.g. "med spa in Miami FL"
export async function searchBusinesses(niche: string, city: string, limit = 20): Promise<BusinessProspect[]> {
  const query = `${niche} in ${city}`;
  const data = await placesFetch(`/textsearch/json?query=${encodeURIComponent(query)}`);
  const results = (data.results || []).slice(0, limit);

  return results.map((r: any) => ({
    placeId: r.place_id,
    name: r.name,
    address: r.formatted_address || '',
    rating: r.rating,
    reviewCount: r.user_ratings_total,
    types: r.types || [],
    mapsUrl: `https://www.google.com/maps/place/?q=place_id:${r.place_id}`,
  }));
}

// Get phone + website for a specific place
export async function getBusinessDetails(placeId: string): Promise<{ phone?: string; website?: string }> {
  const data = await placesFetch(
    `/details/json?place_id=${placeId}&fields=formatted_phone_number,website,international_phone_number`
  );
  const r = data.result || {};
  return {
    phone: r.formatted_phone_number || r.international_phone_number,
    website: r.website,
  };
}

// Full enrichment: search + pull details (phone/website) for each result
export async function findBusinessProspects(
  niche: string,
  city: string,
  limit = 15
): Promise<BusinessProspect[]> {
  const businesses = await searchBusinesses(niche, city, limit);

  // Enrich with phone/website (sequential to respect API quotas)
  const enriched: BusinessProspect[] = [];
  for (const biz of businesses) {
    try {
      const details = await getBusinessDetails(biz.placeId);
      enriched.push({ ...biz, ...details });
    } catch {
      enriched.push(biz);
    }
  }
  return enriched;
}
