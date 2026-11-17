'use client';
// Client-side lead capture helper: attaches attribution/device meta + anti-spam signals,
// saves the lead immediately, then opens the one-tap qualifier (LeadQualifier) for the same lead.
export type LeadContact = { name?: string; phone?: string; email?: string };

const UTM = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'];
export function trackLanding() {
  try {
    if (!sessionStorage.getItem('lead_landing')) {
      sessionStorage.setItem('lead_landing', location.href);
      sessionStorage.setItem('lead_referrer', document.referrer || '');
    }
    const q = new URLSearchParams(location.search);
    const u: Record<string, string> = JSON.parse(sessionStorage.getItem('lead_utm') || '{}');
    UTM.forEach((k) => { const v = q.get(k); if (v) u[k] = v; });
    sessionStorage.setItem('lead_utm', JSON.stringify(u));
  } catch {}
}
export function leadMeta() {
  let utm = {}; try { utm = JSON.parse(sessionStorage.getItem('lead_utm') || '{}'); } catch {}
  const ua = navigator.userAgent;
  const device = /iPhone/.test(ua) ? 'iPhone' : /iPad/.test(ua) ? 'iPad' : /Android/.test(ua) ? 'Android' : /Mac/.test(ua) ? 'Mac' : /Windows/.test(ua) ? 'Windows' : 'Other';
  return {
    pageUrl: location.href,
    landingUrl: (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('lead_landing')) || location.href,
    referrer: (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('lead_referrer')) || document.referrer || '',
    utm, device, viewport: `${innerWidth}x${innerHeight}`,
  };
}
/** Call when a form first becomes visible; pass the returned value as `startedAt`. */
export const formStart = () => Date.now();

export async function saveLead(contact: LeadContact, source: string, extra: Record<string, unknown> = {}, opts: { startedAt?: number; hp?: string; qualify?: boolean; defer?: boolean } = {}) {
  let leadId = '';
  try {
    const r = await fetch('/api/save-lead', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...contact, source, ...extra, meta: leadMeta(), hp: opts.hp || '', elapsedMs: opts.startedAt ? Date.now() - opts.startedAt : undefined }),
    });
    const j = await r.json().catch(() => ({}));
    leadId = j.leadId || '';
  } catch {}
  try {
    if (contact.name) sessionStorage.setItem('lead_name', contact.name);
    if (contact.phone) sessionStorage.setItem('lead_phone', contact.phone);
    if (contact.email) sessionStorage.setItem('lead_email', contact.email);
  } catch {}
  if (opts.qualify !== false && leadId) {
    try { sessionStorage.setItem('lead_pending_qualify', JSON.stringify({ leadId, contact, source })); } catch {}
    if (!opts.defer) window.dispatchEvent(new CustomEvent('lead:qualify', { detail: { leadId, contact, source } }));
  }
  return leadId;
}
