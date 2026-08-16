import { NextRequest, NextResponse } from 'next/server';

// Influencer matching API
const influencers = [
  {
    id: 'des-001',
    name: 'Deseray Marie',
    followers: 66000,
    instagram: '@itsdezmarie',
    location: 'Miami, FL',
    categories: ['Music Video', 'Commercial', 'Fashion', 'Film', 'TV'],
    verified: true,
    celebrityCredits: true,
    credits: ['Kai Cenat', 'Sean Paul', 'Akon', 'Bryson Tiller', 'Forbes'],
    pricing: { ugc: 500, event: 800, musicVideo: 1000 },
    availability: 'immediate'
  },
  {
    id: 'maria-002',
    name: 'Maria',
    followers: 45000,
    instagram: '@maria',
    location: 'Miami, FL',
    categories: ['Fashion', 'Lifestyle', 'UGC'],
    verified: false,
    celebrityCredits: false,
    credits: ['Local fashion brands', 'Restaurant campaigns'],
    pricing: { ugc: 300, event: 500, musicVideo: 700 },
    availability: 'immediate'
  },
  {
    id: 'genesis-003',
    name: 'Genesis Bravo',
    followers: 38000,
    instagram: '@genesisbravo',
    location: 'Fort Lauderdale, FL',
    categories: ['Fashion', 'Commercial', 'Events'],
    verified: false,
    celebrityCredits: false,
    credits: ['Brand campaigns', 'Event hosting'],
    pricing: { ugc: 350, event: 550, musicVideo: 750 },
    availability: '1-week'
  },
  {
    id: 'ferrari-004',
    name: 'Ferrari',
    followers: 52000,
    instagram: '@ferrari',
    location: 'Miami, FL',
    categories: ['Lifestyle', 'Events', 'VIP Hosting'],
    verified: false,
    celebrityCredits: false,
    credits: ['Club events', 'VIP hosting', 'Lifestyle content'],
    pricing: { ugc: 400, event: 600, musicVideo: 800 },
    availability: 'immediate'
  }
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get('category');
  const location = searchParams.get('location');
  const minFollowers = searchParams.get('minFollowers');
  const maxFollowers = searchParams.get('maxFollowers');
  const availability = searchParams.get('availability');

  let filteredInfluencers = influencers;

  if (category) {
    filteredInfluencers = filteredInfluencers.filter(inf => 
      inf.categories.includes(category)
    );
  }

  if (location) {
    filteredInfluencers = filteredInfluencers.filter(inf => 
      inf.location.toLowerCase().includes(location.toLowerCase())
    );
  }

  if (minFollowers) {
    filteredInfluencers = filteredInfluencers.filter(inf => 
      inf.followers >= parseInt(minFollowers)
    );
  }

  if (maxFollowers) {
    filteredInfluencers = filteredInfluencers.filter(inf => 
      inf.followers <= parseInt(maxFollowers)
    );
  }

  if (availability) {
    filteredInfluencers = filteredInfluencers.filter(inf => 
      inf.availability === availability || inf.availability === 'immediate'
    );
  }

  return NextResponse.json({
    success: true,
    count: filteredInfluencers.length,
    influencers: filteredInfluencers
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { brandNiche, brandLocation, budget, contentType } = body;

  // Match influencers based on brand needs
  const matchedInfluencers = influencers.filter(inf => {
    // Match by category/niche
    const categoryMatch = inf.categories.some(cat => 
      brandNiche.toLowerCase().includes(cat.toLowerCase()) ||
      cat.toLowerCase().includes(brandNiche.toLowerCase())
    );

    // Match by location if specified
    const locationMatch = !brandLocation || 
      inf.location.toLowerCase().includes(brandLocation.toLowerCase());

    // Match by budget
    const budgetMatch = !budget || 
      inf.pricing[contentType as keyof typeof inf.pricing] <= parseInt(budget);

    return categoryMatch && locationMatch && budgetMatch;
  });

  // Sort by relevance (followers, credits, etc.)
  const sortedInfluencers = matchedInfluencers.sort((a, b) => {
    // Prioritize verified influencers with celebrity credits
    if (a.verified && !b.verified) return -1;
    if (!a.verified && b.verified) return 1;
    
    // Then by follower count
    return b.followers - a.followers;
  });

  return NextResponse.json({
    success: true,
    brandRequirements: { brandNiche, brandLocation, budget, contentType },
    matchedCount: sortedInfluencers.length,
    recommendations: sortedInfluencers.slice(0, 5) // Top 5 recommendations
  });
}
