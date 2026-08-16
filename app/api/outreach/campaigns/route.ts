import { NextRequest, NextResponse } from 'next/server';

// In-memory campaign storage (use database in production)
let campaigns = [
  {
    id: 'campaign-001',
    name: 'Miami Fashion Brands Q3 2024',
    niche: 'fashion',
    status: 'active',
    targetBrands: 50,
    emailsSent: 25,
    opens: 18,
    responses: 4,
    meetingsBooked: 2,
    dealsClosed: 0,
    startDate: '2024-08-01',
    endDate: '2024-08-31',
    budget: '$5,000',
    roi: 0
  },
  {
    id: 'campaign-002', 
    name: 'Restaurant Outreach Miami-Dade',
    niche: 'food',
    status: 'active',
    targetBrands: 30,
    emailsSent: 15,
    opens: 12,
    responses: 3,
    meetingsBooked: 1,
    dealsClosed: 1,
    startDate: '2024-08-05',
    endDate: '2024-08-25',
    budget: '$3,000',
    roi: 150 // 150% return
  }
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get('status');
  const niche = searchParams.get('niche');

  let filteredCampaigns = campaigns;
  
  if (status) {
    filteredCampaigns = filteredCampaigns.filter(c => c.status === status);
  }
  
  if (niche) {
    filteredCampaigns = filteredCampaigns.filter(c => c.niche === niche);
  }

  return NextResponse.json({
    success: true,
    count: filteredCampaigns.length,
    campaigns: filteredCampaigns
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  const newCampaign = {
    id: `campaign-${Date.now()}`,
    name: body.name,
    niche: body.niche,
    status: 'draft',
    targetBrands: body.targetBrands || 0,
    emailsSent: 0,
    opens: 0,
    responses: 0,
    meetingsBooked: 0,
    dealsClosed: 0,
    startDate: body.startDate,
    endDate: body.endDate,
    budget: body.budget || '$0',
    roi: 0,
    createdAt: new Date().toISOString()
  };

  campaigns.push(newCampaign);
  
  console.log('Campaign created:', newCampaign);

  return NextResponse.json({
    success: true,
    campaign: newCampaign
  });
}

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const { id, ...updates } = body;

  const campaignIndex = campaigns.findIndex(c => c.id === id);
  
  if (campaignIndex === -1) {
    return NextResponse.json(
      { success: false, error: 'Campaign not found' },
      { status: 404 }
    );
  }

  campaigns[campaignIndex] = {
    ...campaigns[campaignIndex],
    ...updates,
    updatedAt: new Date().toISOString()
  };

  return NextResponse.json({
    success: true,
    campaign: campaigns[campaignIndex]
  });
}
