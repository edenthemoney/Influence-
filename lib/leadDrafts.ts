// Template follow-up drafts (text + email) built from qualifier answers. Eden sends them himself.
import { LEAD_TYPES, SERVICES, STARTER_BUDGET, type LeadAnswers } from './leads';

export type DraftLead = { name?: string; email?: string; phone?: string; answers?: LeadAnswers; recommendation?: string; serviceType?: string; packageName?: string; source?: string };

export function templateDrafts(l: DraftLead) {
  const a = l.answers || {};
  const first = (l.name || '').trim().split(/\s+/)[0] || 'there';
  const who = a.business || a.ig || '';
  const svc = (a.services || []).map((id) => SERVICES[id]?.label).filter(Boolean).filter((x) => x !== 'Not sure yet, advise me') as string[];
  const need = svc.length ? svc.join(' + ').toLowerCase() : (l.packageName || l.serviceType || 'creators').toString().toLowerCase();
  const when = a.timing === 'This week' ? 'this week' : a.timing === 'This month' ? 'this month' : '';
  const where = a.city && !a.city.startsWith('Other') ? ` in ${a.city}` : '';
  const starter = a.budget === STARTER_BUDGET;
  const rec = l.recommendation ? l.recommendation.replace(/ \(see \/starter\)$/, '') : '';
  const recLine = starter
    ? `Our Starter options (one creator, one deliverable) are a great fit: influencecreators.marketing/starter`
    : rec ? `Based on what you shared, I'd suggest: ${rec}.` : '';
  const text = [
    `Hi ${first}, it's Eden from Influence.`,
    `Thanks for reaching out about ${need}${who ? ` for ${who}` : ''}${where}.`,
    recLine,
    when ? `We can make ${when} work.` : '',
    starter ? 'Want me to hold a spot for you?' : 'Want me to send 2–3 creator options and a quote?',
  ].filter(Boolean).join(' ');
  const typeLabel = LEAD_TYPES.find((t) => t.id === a.type)?.label;
  const subject = `Influence: ${svc[0] || 'your request'}${who ? ` for ${who}` : ''}`;
  const body = [
    `Hi ${first},`,
    '',
    `Thanks for reaching out to Influence${typeLabel ? ` (${typeLabel.toLowerCase()})` : ''}. You mentioned ${need}${who ? ` for ${who}` : ''}${where}${a.budget ? `, budget ${a.budget}` : ''}${when ? `, timing ${when}` : ''}.`,
    '',
    recLine,
    '',
    starter ? 'If that works, you can book directly on that page, or reply here and I will help you pick.' : 'If you reply with your date, location and any references, I will send 2–3 creator options with a quote the same day.',
    '',
    'Best,',
    'Eden',
    'Influence · (561) 287-7194',
    'influencecreators.marketing',
  ].join('\n').replace(/\n{3,}/g, '\n\n');
  return { text, subject, body };
}
