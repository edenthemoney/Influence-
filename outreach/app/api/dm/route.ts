import { NextRequest, NextResponse } from 'next/server';
import { generateAllDMs, dmDeepLink, DMVars } from '@/lib/dm-templates';
import { getLeads, saveLead } from '@/lib/store';
import { requireAuth } from '@/lib/auth';

// POST — generate DM script variants for a lead
export async function POST(req: NextRequest) {
  const auth = requireAuth(req);
  if (auth) return auth;
  const { leadId } = await req.json();
  const lead = getLeads().find(l => l.id === leadId);
  if (!lead) return NextResponse.json({ error: 'Lead not found' }, { status: 404 });

  const vars: DMVars = {
    name: lead.name,
    type: (lead.type as DMVars['type']) || 'artist',
    niche: lead.niche,
    city: lead.city,
    instagram: lead.instagram,
    trackName: lead.notes?.match(/New release: "(.+?)"/)?.[1],
  };

  return NextResponse.json({
    scripts: generateAllDMs(vars),
    deepLink: dmDeepLink(lead.instagram),
    hasInstagram: !!lead.instagram,
  });
}

// PUT — mark a DM as sent (logs it, advances status)
export async function PUT(req: NextRequest) {
  const auth = requireAuth(req);
  if (auth) return auth;
  const { leadId, text, platform } = await req.json();
  const lead = getLeads().find(l => l.id === leadId);
  if (!lead) return NextResponse.json({ error: 'Lead not found' }, { status: 404 });

  lead.dmsSent = lead.dmsSent || [];
  lead.dmsSent.push({
    date: new Date().toISOString(),
    platform: platform || 'instagram',
    text: text || '',
  });
  // Only bump to 'emailed' equivalent if still new (we treat DM as a contact touch)
  if (lead.status === 'new') lead.status = 'emailed';
  lead.updatedAt = new Date().toISOString();
  saveLead(lead);

  return NextResponse.json({ success: true, lead });
}
