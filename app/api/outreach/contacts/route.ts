import { NextRequest, NextResponse } from 'next/server';

// Contact finding API - ready for real data
// In production, this would integrate with Apollo.io, Hunter.io, or similar services

const contactDatabase: any = {};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const website = searchParams.get('website');
  const role = searchParams.get('role'); // ceo, marketing, ecommerce, etc.

  if (!website) {
    return NextResponse.json(
      { success: false, error: 'Website parameter required' },
      { status: 400 }
    );
  }

  // Extract domain from website
  const domain = website.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];

  // Find contacts for domain
  const contacts = contactDatabase[domain];

  if (!contacts) {
    return NextResponse.json({
      success: false,
      message: 'No contacts found for this domain',
      suggestion: 'Add contacts via POST endpoint or integrate with Apollo.io/Hunter.io'
    }, { status: 404 });
  }

  // Filter by role if specified
  if (role && contacts[role]) {
    return NextResponse.json({
      success: true,
      contact: contacts[role]
    });
  }

  return NextResponse.json({
    success: true,
    contacts: contacts
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { website, contact } = body;

  // Add new contact to database
  const domain = website.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];

  if (!contactDatabase[domain]) {
    contactDatabase[domain] = {};
  }

  contactDatabase[domain][contact.role] = {
    name: contact.name,
    email: contact.email,
    linkedin: contact.linkedin,
    addedAt: new Date().toISOString()
  };

  console.log('Contact added:', { domain, contact });

  return NextResponse.json({
    success: true,
    message: 'Contact added successfully',
    contact: contactDatabase[domain][contact.role]
  });
}
