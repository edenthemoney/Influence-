// Server-side: mirror a lead into the free Netlify Blobs leads table (netlify/functions/leads.mts).
// Best-effort and non-blocking for the visitor; never sends messages.
import { scoreLead, recommend, type LeadAnswers } from './leads';

export async function storeLead(req: Request, l: { id: string; name?: string; email?: string; phone?: string; source?: string; serviceType?: string; packageName?: string; notes?: string; answers?: LeadAnswers; meta?: any; flags?: string[]; stage: string }) {
  const token = process.env.ADMIN_TOKEN;
  if (!token) return;
  const a = l.answers || {};
  const has = !!(a.type || a.services?.length || a.budget || a.timing);
  const m = l.meta || {};
  const lead = {
    ...l,
    meta: { pageUrl: m.pageUrl, landingUrl: m.landingUrl, referrer: m.referrer, utm: m.utm, device: m.device },
    score: has ? scoreLead(a).score : undefined,
    points: has ? scoreLead(a).points : undefined,
    recommendation: has ? recommend(a).pkg : undefined,
    spam: (l.flags || []).length > 0,
  };
  try {
    let base = new URL(req.url).origin;
    if (/localhost|127\.0\.0\.1/.test(base) && process.env.DEPLOY_URL) base = process.env.DEPLOY_URL;
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 4000);
    await fetch(`${base}/.netlify/functions/leads`, { method: 'POST', headers: { 'content-type': 'application/json', 'x-admin-token': token }, body: JSON.stringify({ id: l.id, lead }), signal: ctrl.signal });
    clearTimeout(t);
  } catch { /* non-fatal */ }
}
