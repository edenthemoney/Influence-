import { NextRequest, NextResponse } from 'next/server';
import { sendOutreachEmail, getRateLimitStatus } from '@/lib/mailer';
import { getLeads, saveLead } from '@/lib/store';
import { TemplateName } from '@/lib/email-templates';
import { requireAuth } from '@/lib/auth';
import { getRemainingDailyEmails, recordEmailsSent } from '@/lib/scheduler';

export async function POST(req: NextRequest) {
  const auth = requireAuth(req);
  if (auth) return auth;

  const { leadId, template } = await req.json();

  const leads = getLeads();
  const lead = leads.find(l => l.id === leadId);
  if (!lead) return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
  if (!lead.email) return NextResponse.json({ error: 'Lead has no email' }, { status: 400 });

  const remaining = getRemainingDailyEmails();
  if (remaining <= 0) {
    return NextResponse.json({ error: 'Daily warm-up cap reached. Try again tomorrow.' }, { status: 429 });
  }

  // Extract track name from notes if this is a new-drop lead
  let trackName: string | undefined;
  const trackMatch = lead.notes?.match(/New release: "(.+?)"/);
  if (trackMatch) trackName = trackMatch[1];

  const result = await sendOutreachEmail(lead.email, template as TemplateName, {
    artistName: lead.name,
    name: lead.name,
    trackName,
    genre: lead.genre,
  });

  if (result.success) {
    lead.status = lead.emailsSent.length === 0 ? 'emailed' : lead.status;
    lead.emailsSent.push({
      date: new Date().toISOString(),
      template,
      subject: `Email sent via ${template}`,
    });
    lead.updatedAt = new Date().toISOString();
    saveLead(lead);
    recordEmailsSent(1);
  }

  return NextResponse.json(result);
}

export async function GET() {
  return NextResponse.json(getRateLimitStatus());
}
