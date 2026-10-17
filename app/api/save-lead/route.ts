import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { normalizeEmail, normalizeInstagram, normalizeName, normalizePhone } from '@/lib/influence-connect';

const GOLD = '#c9a96e';

function esc(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, instagram, source, serviceType, packageName, packagePrice, step, modelPreference, notes } = body;

    if (source === 'influence-connect-nov18-ladies-rsvp') {
      if (!normalizeName(name) || !normalizeEmail(email) || !normalizePhone(phone) || !normalizeInstagram(instagram)) {
        return NextResponse.json(
          { error: 'Enter your name, a valid email, a phone number, and your Instagram handle.' },
          { status: 400 }
        );
      }
    }

    if (!phone && !email) {
      return NextResponse.json({ error: 'Missing contact info' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const row = (label: string, value: string) => `
      <tr>
        <td style="padding:10px 0;color:#888;font-size:11px;letter-spacing:2px;text-transform:uppercase;width:140px;vertical-align:top;">${label}</td>
        <td style="padding:10px 0;color:#fff;font-size:14px;font-weight:500;">${value || '—'}</td>
      </tr>`;

    const isAbandoned = source === 'abandoned_checkout';
    const subjectName = String(name || phone || email || 'Unknown').replace(/[\r\n]/g, ' ').slice(0, 120);
    const subject = isAbandoned
      ? `🚨 Abandoned Checkout — ${subjectName}`
      : `📱 New Lead Captured — ${subjectName}`;

    const htmlEmail = `
    <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#fff;border:1px solid #222;">
      <div style="padding:32px 32px 24px;border-bottom:1px solid #222;">
        <p style="font-size:10px;letter-spacing:4px;text-transform:uppercase;color:${isAbandoned ? '#ef4444' : GOLD};margin:0 0 8px;">${isAbandoned ? '⚠ Abandoned Checkout — Follow Up Now' : '📱 New Lead'}</p>
        <h1 style="font-size:28px;font-weight:300;font-style:italic;margin:0;color:#fff;">${esc(name) || 'Unknown'}</h1>
      </div>
      <div style="padding:24px 32px;border-bottom:1px solid #222;">
        <table style="width:100%;border-collapse:collapse;">
          ${row('Name', esc(name) || '—')}
          ${row('Phone', phone ? `<a href="tel:${String(phone).replace(/[^\d+]/g, '')}" style="color:${GOLD};text-decoration:none;">${esc(phone)}</a>` : '—')}
          ${row('Email', email ? `<a href="mailto:${esc(email)}" style="color:${GOLD};text-decoration:none;">${esc(email)}</a>` : '—')}
          ${instagram ? row('Instagram', `@${esc(String(instagram).replace(/^@/, ''))}`) : ''}
          ${row('Source', esc(source) || 'marketplace_popup')}
          ${serviceType ? row('Service Interest', esc(serviceType)) : ''}
          ${packageName ? row('Package', esc(packageName)) : ''}
          ${packagePrice ? row('Price', esc(packagePrice === 'Free' ? 'Free' : `$${Number(packagePrice).toLocaleString()}`)) : ''}
          ${modelPreference ? row('Model Preference', esc(modelPreference)) : ''}
          ${notes ? row('Notes', esc(notes)) : ''}
          ${step !== undefined ? row('Dropped at Step', `Step ${esc(step)} of 4`) : ''}
        </table>
      </div>
      ${isAbandoned ? `
      <div style="padding:24px 32px;background:#1a0a0a;border-bottom:1px solid #333;">
        <p style="color:#ef4444;font-size:13px;font-weight:600;margin:0 0 6px;">📞 Follow up ASAP</p>
        <p style="color:#aaa;font-size:12px;margin:0;">This person selected a package (${esc(packageName) || 'unknown'}) but didn't complete checkout. Call or text them at <strong style="color:#fff;">${esc(phone || email)}</strong> to close the booking.</p>
      </div>` : ''}
      <div style="padding:24px 32px;">
        <p style="color:#555;font-size:12px;margin:0;">Captured at ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} ET</p>
      </div>
    </div>`;

    await transporter.sendMail({
      from: `"Influence Leads" <${process.env.GMAIL_USER}>`,
      to: `${process.env.GMAIL_USER}, alphatrustsolutions@gmail.com`,
      subject,
      html: htmlEmail,
    });

    // Ping Make.com webhook for real-time follow-up automation
    if (process.env.MAKE_LEADS_WEBHOOK_URL) {
      try {
        await fetch(process.env.MAKE_LEADS_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, phone, instagram, source, serviceType, packageName, packagePrice, step, modelPreference, notes, timestamp: new Date().toISOString() }),
        });
      } catch {
        // Non-fatal — don't block the response if Make.com is down
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Lead save error:', error);
    return NextResponse.json({ error: 'Failed to save lead', details: error.message }, { status: 500 });
  }
}
