import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { randomUUID } from 'crypto';
import { buildLeadEmail, type LeadPayload } from '../../../lib/leadEmail';
import { vendorFlags, scoreLead, recommend } from '../../../lib/leads';

/**
 * POST  = save contact immediately (email + Make webhook), returns { leadId }.
 * PATCH = same lead, adds qualifier answers; sends a follow-up email threaded to the first one.
 * Recipients/env are unchanged from the original route.
 */
function flagsFor(body: any): string[] {
  const f = vendorFlags({ email: body.email, name: body.name, notes: body.notes, business: body.answers?.business, ig: body.answers?.ig });
  if (body.hp) f.push('honeypot');
  if (typeof body.elapsedMs === 'number' && body.elapsedMs < 1500) f.push('too-fast');
  return f;
}

async function deliver(p: LeadPayload, req: Request) {
  const { subject, html, score } = buildLeadEmail(p);
  const domain = 'influencecreators.marketing';
  const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD } });
  const root = `<lead-${p.leadId}@${domain}>`;
  await transporter.sendMail({
    from: `"Influence Leads" <${process.env.GMAIL_USER}>`,
    to: `${process.env.GMAIL_USER}, alphatrustsolutions@gmail.com`,
    subject, html,
    ...(p.stage === 'contact' ? { messageId: root } : { inReplyTo: root, references: [root] }),
  });
  if (process.env.MAKE_LEADS_WEBHOOK_URL) {
    try {
      await fetch(process.env.MAKE_LEADS_WEBHOOK_URL, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...p, score: p.answers ? score : undefined, recommendation: p.answers ? recommend(p.answers) : undefined, timestamp: new Date().toISOString() }),
      });
    } catch { /* non-fatal */ }
  }
}

function metaFrom(body: any, req: Request) {
  const m = body.meta && typeof body.meta === 'object' ? body.meta : {};
  return { ...m, ua: req.headers.get('user-agent') || '', referrer: m.referrer || req.headers.get('referer') || '' };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, source, serviceType, packageName, packagePrice, step, modelPreference, notes } = body;
    if (!phone && !email) return NextResponse.json({ error: 'Missing contact info' }, { status: 400 });
    const leadId = typeof body.leadId === 'string' && /^[\w-]{8,64}$/.test(body.leadId) ? body.leadId : randomUUID();
    await deliver({ leadId, name, email, phone, source, serviceType, packageName, packagePrice, step, modelPreference, notes, meta: metaFrom(body, req), flags: flagsFor(body), stage: 'contact' }, req);
    return NextResponse.json({ success: true, leadId });
  } catch (error: any) {
    console.error('Lead save error:', error);
    return NextResponse.json({ error: 'Failed to save lead', details: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { leadId, name, email, phone, source, answers, partial } = body;
    if (!leadId || typeof leadId !== 'string' || !/^[\w-]{8,64}$/.test(leadId)) return NextResponse.json({ error: 'Missing leadId' }, { status: 400 });
    const clean = (s: unknown, n = 80) => (typeof s === 'string' ? s.slice(0, n).trim() : undefined);
    const a = answers || {};
    const ans = { type: clean(a.type, 12) as any, services: Array.isArray(a.services) ? a.services.slice(0, 8).map((x: unknown) => clean(x, 24)).filter(Boolean) : undefined, budget: clean(a.budget, 20), timing: clean(a.timing, 20), business: clean(a.business), ig: clean(a.ig, 40), city: clean(a.city, 40) };
    await deliver({ leadId, name, email, phone, source, answers: ans, meta: metaFrom(body, req), flags: flagsFor({ ...body, answers: ans }), stage: partial ? 'partial' : 'qualified' }, req);
    return NextResponse.json({ success: true, leadId, ...scoreLead(ans) });
  } catch (error: any) {
    console.error('Lead update error:', error);
    return NextResponse.json({ error: 'Failed to update lead', details: error.message }, { status: 500 });
  }
}
