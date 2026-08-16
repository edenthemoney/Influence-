import { NextRequest, NextResponse } from 'next/server';

// Brand discovery API
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const niche = searchParams.get('niche');
  const followerRange = searchParams.get('followerRange');
  const location = searchParams.get('location');

  // Mock data - in production, this would connect to real data sources
  const brands = [
    {
      id: 'brand-001',
      name: 'Luxe Swimwear',
      niche: 'fashion',
      followers: 45000,
      location: 'Miami, FL',
      website: 'luxeswimwear.com',
      instagram: '@luxeswimwear',
      decisionMakers: {
        ceo: 'sarah@luxeswimwear.com',
        marketing: 'marketing@luxeswimwear.com'
      },
      lastCampaign: 'Summer 2024 collection launch',
      estimatedBudget: '$5,000-$15,000',
      outreachStatus: 'not_contacted'
    },
    {
      id: 'brand-002',
      name: 'Miami Fitness Club',
      niche: 'fitness',
      followers: 32000,
      location: 'Fort Lauderdale, FL',
      website: 'miamifitnessclub.com',
      instagram: '@miamifitnessclub',
      decisionMakers: {
        ceo: 'john@miamifitnessclub.com',
        marketing: 'social@miamifitnessclub.com'
      },
      lastCampaign: 'New year promotion',
      estimatedBudget: '$3,000-$10,000',
      outreachStatus: 'not_contacted'
    },
    {
      id: 'brand-003',
      name: 'Ocean Drive Restaurant',
      niche: 'food',
      followers: 28000,
      location: 'Miami Beach, FL',
      website: 'oceandriverestaurant.com',
      instagram: '@oceandriverestaurant',
      decisionMakers: {
        ceo: 'chef@oceandriverestaurant.com',
        marketing: 'events@oceandriverestaurant.com'
      },
      lastCampaign: 'Summer menu launch',
      estimatedBudget: '$2,000-$8,000',
      outreachStatus: 'not_contacted'
    }
  ];

  // Filter based on parameters
  let filteredBrands = brands;
  if (niche) {
    filteredBrands = filteredBrands.filter(brand => brand.niche === niche);
  }
  if (followerRange) {
    const [min, max] = followerRange.split('-').map(Number);
    filteredBrands = filteredBrands.filter(brand => 
      brand.followers >= min && brand.followers <= max
    );
  }
  if (location) {
    filteredBrands = filteredBrands.filter(brand => 
      brand.location.toLowerCase().includes(location.toLowerCase())
    );
  }

  return NextResponse.json({
    success: true,
    count: filteredBrands.length,
    brands: filteredBrands
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  // Add new brand to database
  const newBrand = {
    id: `brand-${Date.now()}`,
    ...body,
    outreachStatus: 'not_contacted',
    createdAt: new Date().toISOString()
  };

  // In production, save to database
  console.log('Adding new brand:', newBrand);

  return NextResponse.json({
    success: true,
    brand: newBrand
  });
}
