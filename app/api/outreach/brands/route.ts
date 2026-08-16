import { NextRequest, NextResponse } from 'next/server';

// Brand discovery API - ready for real data
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const niche = searchParams.get('niche');
  const followerRange = searchParams.get('followerRange');
  const location = searchParams.get('location');

  // In production, this would query a database
  // For now, return empty array - system ready for real data input
  const brands: any[] = [];

  // Filter based on parameters when real data is added
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
