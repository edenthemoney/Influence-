import { NextRequest, NextResponse } from 'next/server';
import { searchArtists, discoverSmallArtists, getRelatedArtists, findNewDrops } from '@/lib/spotify';
import { findContactInfo } from '@/lib/scraper';
import { saveLeads, Lead } from '@/lib/store';
import { requireAuth } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const { action, query, artistId } = await req.json();

  try {
    if (action === 'drops') {
      const drops = await findNewDrops(query);
      return NextResponse.json({ drops });
    }

    let artists;
    if (action === 'search') {
      artists = await searchArtists(query, 10);
    } else if (action === 'discover') {
      artists = await discoverSmallArtists(query);
    } else if (action === 'related' && artistId) {
      artists = await getRelatedArtists(artistId);
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    return NextResponse.json({ artists });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Scrape contact info for a specific artist and save as lead
export async function PUT(req: NextRequest) {
  const auth = requireAuth(req);
  if (auth) return auth;
  const { name, spotify, followers, genre } = await req.json();

  try {
    const contact = await findContactInfo(name, spotify);

    if (contact.emails.length === 0) {
      return NextResponse.json({ found: false, message: `No email found for ${name}` });
    }

    const leads: Lead[] = contact.emails.map((email: string) => ({
      id: crypto.randomUUID(),
      name,
      type: 'artist' as const,
      email,
      instagram: contact.instagram || '',
      spotify: spotify || '',
      website: contact.website || '',
      followers: followers || 0,
      genre: genre || '',
      source: 'spotify-scrape',
      status: 'new' as const,
      notes: '',
      emailsSent: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));

    const added = saveLeads(leads);

    return NextResponse.json({
      found: true,
      emails: contact.emails,
      added,
      instagram: contact.instagram,
      website: contact.website,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
