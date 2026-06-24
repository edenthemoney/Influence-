import { NextRequest, NextResponse } from 'next/server';
import { getLeads, saveLead, deleteLead, getStats, Lead } from '@/lib/store';
import { requireAuth } from '@/lib/auth';

export async function GET() {
  const leads = getLeads();
  const stats = getStats();
  return NextResponse.json({ leads, stats });
}

export async function POST(req: NextRequest) {
  const auth = requireAuth(req);
  if (auth) return auth;
  const body = await req.json();
  const lead: Lead = {
    id: body.id || crypto.randomUUID(),
    name: body.name,
    type: body.type || 'artist',
    email: body.email,
    phone: body.phone || '',
    instagram: body.instagram || '',
    spotify: body.spotify || '',
    website: body.website || '',
    followers: body.followers || 0,
    genre: body.genre || '',
    source: body.source || 'manual',
    status: 'new',
    notes: body.notes || '',
    emailsSent: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  saveLead(lead);
  return NextResponse.json({ success: true, lead });
}

export async function PUT(req: NextRequest) {
  const auth = requireAuth(req);
  if (auth) return auth;
  const body = await req.json();
  const leads = getLeads();
  const existing = leads.find(l => l.id === body.id);
  if (!existing) return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
  const updated = { ...existing, ...body, updatedAt: new Date().toISOString() };
  saveLead(updated);
  return NextResponse.json({ success: true, lead: updated });
}

export async function DELETE(req: NextRequest) {
  const auth = requireAuth(req);
  if (auth) return auth;
  const { id } = await req.json();
  deleteLead(id);
  return NextResponse.json({ success: true });
}
