import { NextRequest, NextResponse } from 'next/server';
import { templateDrafts } from '@/lib/leadDrafts';

// Returns an AI-drafted follow-up (Anthropic, if ANTHROPIC_API_KEY is set) or a template draft.
// Drafts only: nothing is ever sent from here.
export async function POST(req: NextRequest) {
  const token = (req.headers.get('authorization') || '').replace(/^Bearer /, '');
  if (!process.env.ADMIN_TOKEN || token !== process.env.ADMIN_TOKEN) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { lead } = await req.json().catch(() => ({ lead: null }));
  if (!lead) return NextResponse.json({ error: 'Missing lead' }, { status: 400 });
  const tpl = templateDrafts(lead);
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return NextResponse.json({ ...tpl, ai: false });
  try {
    const facts = JSON.stringify({ name: lead.name, answers: lead.answers, recommendation: lead.recommendation, serviceType: lead.serviceType, packageName: lead.packageName, source: lead.source, notes: lead.notes });
    const prompt = `You write follow-ups for Eden, owner of Influence (influencecreators.marketing), a Miami creator/talent booking agency. Main packages start at $450; a Starter page (influencecreators.marketing/starter, one creator one deliverable, from $200) exists only for budgets under $450. Never invent prices, stats, testimonials or availability beyond the facts. Never mention creator pay. Lead facts: ${facts}\nReturn ONLY JSON: {"text": "<friendly SMS under 320 chars, signed Eden from Influence>", "subject": "<email subject>", "body": "<short plain-text email, signed Eden, Influence · (561) 287-7194>"}. Reference their needs and the recommended package; end with one clear question.`;
    const ctrl = new AbortController(); const t = setTimeout(() => ctrl.abort(), 15000);
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST', signal: ctrl.signal,
      headers: { 'content-type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: 'claude-haiku-4-5', max_tokens: 700, messages: [{ role: 'user', content: prompt }] }),
    });
    clearTimeout(t);
    const d = await r.json();
    const raw = d?.content?.[0]?.text || '';
    const j = JSON.parse(raw.slice(raw.indexOf('{'), raw.lastIndexOf('}') + 1));
    if (!j.text || !j.body) throw new Error('bad');
    return NextResponse.json({ text: String(j.text), subject: String(j.subject || tpl.subject), body: String(j.body), ai: true });
  } catch {
    return NextResponse.json({ ...tpl, ai: false });
  }
}
