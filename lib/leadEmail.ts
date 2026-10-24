// Server-side: builds the Influence Leads notification email.
import { LEAD_TYPES, SERVICES, scoreLead, recommend, type LeadAnswers } from './leads';

const GOLD = '#c9a96e';
const esc = (s: unknown) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));

export type LeadPayload = {
  leadId: string; name?: string; email?: string; phone?: string; source?: string;
  serviceType?: string; packageName?: string; packagePrice?: number | string; step?: number; modelPreference?: string; notes?: string;
  answers?: LeadAnswers; meta?: { pageUrl?: string; landingUrl?: string; referrer?: string; utm?: Record<string, string>; device?: string; viewport?: string; ua?: string; ip?: string };
  flags?: string[]; stage: 'contact' | 'qualified' | 'partial';
};

export function buildLeadEmail(p: LeadPayload) {
  const a = p.answers || {};
  const hasAnswers = !!(a.type || a.services?.length || a.budget || a.timing);
  const { score } = scoreLead(a);
  const rec = recommend(a);
  const who = p.name || p.phone || p.email || 'Unknown';
  const isAbandoned = p.source === 'abandoned_checkout';
  const flags = p.flags || [];
  const flagTxt = flags.length ? `[${flags.includes('vendor-domain') || flags.includes('solicitation-words') ? 'VENDOR/SOLICITATION?' : 'POSSIBLE SPAM'}] ` : '';
  const scoreEmoji = { hot: '🔥 HOT', warm: '🟠 WARM', cold: '🔵 COLD' }[score];
  const typeLabel = LEAD_TYPES.find((t) => t.id === a.type)?.label;
  const svcLabels = (a.services || []).map((id) => SERVICES[id] ? `${SERVICES[id].label}${SERVICES[id].from ? ` (from ${SERVICES[id].from})` : ''}` : id);
  const subject = isAbandoned
    ? `${flagTxt}🚨 Abandoned Checkout — ${who}`
    : hasAnswers
      ? `${flagTxt}${scoreEmoji} Lead — ${who}${typeLabel ? ` · ${typeLabel}` : ''}${a.budget ? ` · ${a.budget}` : ''}${a.timing ? ` · ${a.timing}` : ''}`
      : `${flagTxt}📱 New Lead — ${who} (qualifier pending)`;

  const row = (label: string, value?: string, raw = false) => value ? `
      <tr><td style="padding:9px 0;color:#888;font-size:11px;letter-spacing:2px;text-transform:uppercase;width:150px;vertical-align:top;">${label}</td>
      <td style="padding:9px 0;color:#fff;font-size:14px;font-weight:500;">${raw ? value : esc(value)}</td></tr>` : '';
  const m = p.meta || {};
  const utm = m.utm && Object.keys(m.utm).length ? Object.entries(m.utm).map(([k, v]) => `${k}=${v}`).join(' · ') : '';
  const ig = a.ig ? a.ig.replace(/^@/, '') : '';
  const scoreColor = { hot: '#ef4444', warm: '#f59e0b', cold: '#60a5fa' }[score];

  const html = `
  <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#fff;border:1px solid #222;">
    ${flags.length ? `<div style="padding:12px 32px;background:#2a1a00;color:#fbbf24;font-size:12px;border-bottom:1px solid #3a2a00;">⚠ Flagged: ${esc(flags.join(', '))}. Possibly a vendor, solicitation, or bot. Not dropped; review before pitching.</div>` : ''}
    <div style="padding:30px 32px 22px;border-bottom:1px solid #222;">
      <p style="font-size:10px;letter-spacing:4px;text-transform:uppercase;color:${isAbandoned ? '#ef4444' : GOLD};margin:0 0 8px;">${isAbandoned ? '⚠ Abandoned Checkout, Follow Up Now' : hasAnswers ? 'Qualified Lead' : 'New Lead · qualifier in progress'}</p>
      <h1 style="font-size:28px;font-weight:300;font-style:italic;margin:0;color:#fff;">${esc(p.name || 'Unknown')}</h1>
      ${hasAnswers ? `<p style="margin:12px 0 0;"><span style="display:inline-block;padding:5px 12px;border:1px solid ${scoreColor};color:${scoreColor};font-size:11px;font-weight:700;letter-spacing:2px;">${scoreEmoji}</span>
        ${typeLabel ? `<span style="display:inline-block;margin-left:6px;padding:5px 12px;border:1px solid #333;color:#ccc;font-size:11px;letter-spacing:1px;">${esc(typeLabel)}</span>` : ''}</p>` : ''}
    </div>
    ${hasAnswers ? `
    <div style="padding:22px 32px;border-bottom:1px solid #222;background:#111;">
      <p style="font-size:10px;letter-spacing:3px;text-transform:uppercase;color:${GOLD};margin:0 0 8px;">Recommended package</p>
      <p style="font-size:15px;color:#fff;margin:0 0 16px;font-weight:600;">${esc(rec.pkg)}</p>
      <p style="font-size:10px;letter-spacing:3px;text-transform:uppercase;color:${GOLD};margin:0 0 8px;">Suggested pitch (text them)</p>
      <p style="font-size:14px;color:#ddd;margin:0;line-height:1.5;font-style:italic;">“${esc(rec.pitch)}”</p>
    </div>` : `
    <div style="padding:16px 32px;border-bottom:1px solid #222;background:#111;color:#aaa;font-size:12px;">Contact saved instantly. A follow-up email in this thread will add what they need, budget and timing if they finish the 3 quick questions.</div>`}
    <div style="padding:20px 32px;border-bottom:1px solid #222;">
      <table style="width:100%;border-collapse:collapse;">
        ${row('Name', p.name)}
        ${row('Phone', p.phone ? `<a href="tel:${esc(p.phone)}" style="color:${GOLD};text-decoration:none;">${esc(p.phone)}</a> · <a href="sms:${esc(p.phone)}" style="color:${GOLD};text-decoration:none;">text</a>` : '', true)}
        ${row('Email', p.email ? `<a href="mailto:${esc(p.email)}" style="color:${GOLD};text-decoration:none;">${esc(p.email)}</a>` : '', true)}
        ${row('I am a', typeLabel)}
        ${row('Wants', svcLabels.join('<br>') ? svcLabels.map(esc).join('<br>') : '', true)}
        ${row('Budget', a.budget)}
        ${row('Timing', a.timing)}
        ${row('Business', a.business)}
        ${row('Instagram', ig ? `<a href="https://instagram.com/${esc(ig)}" style="color:${GOLD};text-decoration:none;">@${esc(ig)}</a>` : '', true)}
        ${row('City', a.city)}
        ${row('Service Interest', p.serviceType)}
        ${row('Package', p.packageName)}
        ${p.packagePrice ? row('Price', `$${Number(p.packagePrice).toLocaleString()}`) : ''}
        ${row('Model Preference', p.modelPreference)}
        ${row('Notes', p.notes)}
        ${p.step !== undefined ? row('Dropped at Step', `Step ${p.step} of 4`) : ''}
      </table>
    </div>
    <div style="padding:20px 32px;border-bottom:1px solid #222;">
      <p style="font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#666;margin:0 0 6px;">Where they came from</p>
      <table style="width:100%;border-collapse:collapse;font-size:12px;">
        ${[['Form', p.source || 'marketplace_popup'], ['Submitted on', m.pageUrl], ['Landing page', m.landingUrl], ['Referrer', m.referrer || 'direct'], ['UTM', utm], ['Device', [m.device, m.viewport].filter(Boolean).join(' · ')]]
          .filter(([, v]) => v).map(([k, v]) => `<tr><td style="padding:4px 0;color:#666;width:150px;vertical-align:top;">${k}</td><td style="padding:4px 0;color:#aaa;word-break:break-all;">${esc(v)}</td></tr>`).join('')}
      </table>
    </div>
    ${isAbandoned ? `<div style="padding:22px 32px;background:#1a0a0a;border-bottom:1px solid #333;"><p style="color:#ef4444;font-size:13px;font-weight:600;margin:0 0 6px;">📞 Follow up ASAP</p><p style="color:#aaa;font-size:12px;margin:0;">They selected ${esc(p.packageName || 'a package')} but didn't complete checkout.</p></div>` : ''}
    <div style="padding:18px 32px;"><p style="color:#555;font-size:11px;margin:0;">Lead ${esc(p.leadId)} · ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} ET</p></div>
  </div>`;
  return { subject, html, score };
}
