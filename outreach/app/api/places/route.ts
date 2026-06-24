import { NextRequest, NextResponse } from 'next/server';
import { findBusinessProspects, BUSINESS_NICHES, TARGET_CITIES } from '@/lib/places';
import { saveLeads, Lead } from '@/lib/store';
import { requireAuth } from '@/lib/auth';

// GET — return available niches & cities for the UI dropdowns
export async function GET() {
  return NextResponse.json({ niches: BUSINESS_NICHES, cities: TARGET_CITIES });
}

// POST — search businesses by niche + city
export async function POST(req: NextRequest) {
  const { niche, city, limit } = await req.json();
  if (!niche || !city) {
    return NextResponse.json({ error: 'niche and city are required' }, { status: 400 });
  }
  try {
    const businesses = await findBusinessProspects(niche, city, limit || 15);
    return NextResponse.json({ businesses });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PUT — save selected businesses as leads
export async function PUT(req: NextRequest) {
  const auth = requireAuth(req);
  if (auth) return auth;
  const { businesses, niche, city } = await req.json();
  if (!Array.isArray(businesses)) {
    return NextResponse.json({ error: 'businesses array required' }, { status: 400 });
  }
  const now = new Date().toISOString();
  const leads: Lead[] = businesses.map((b: any) => ({
    id: crypto.randomUUID(),
    name: b.name,
    type: 'business' as const,
    email: b.email || '',
    phone: b.phone || '',
    instagram: b.instagram || '',
    website: b.website || '',
    niche: niche || '',
    city: city || '',
    address: b.address || '',
    rating: b.rating,
    placeId: b.placeId,
    followers: 0,
    source: 'google-places',
    status: 'new' as const,
    notes: `${niche || 'business'}${city ? ` in ${city}` : ''}${b.rating ? ` · ${b.rating}★` : ''}`,
    emailsSent: [],
    dmsSent: [],
    createdAt: now,
    updatedAt: now,
  }));
  const added = saveLeads(leads);
  return NextResponse.json({ added });
}
