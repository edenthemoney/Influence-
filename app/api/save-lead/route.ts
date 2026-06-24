import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const GOLD = '#c9a96e';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, source, serviceType, packageName, packagePrice, step } = body;

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
    const subject = isAbandoned
      ? `🚨 Abandoned Checkout — ${name || phone || email}`
      : `📱 New Lead Captured — ${name || phone || email}`;

    const htmlEmail = `
    <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#fff;border:1px solid #222;">
      <div style="padding:32px 32px 24px;border-bottom:1px solid #222;">
        <p style="font-size:10px;letter-spacing:4px;text-transform:uppercase;color:${isAbandoned ? '#ef4444' : GOLD};margin:0 0 8px;">${isAbandoned ? '⚠ Abandoned Checkout — Follow Up Now' : '📱 New Lead'}</p>
        <h1 style="font-size:28px;font-weight:300;font-style:italic;margin:0;color:#fff;">${name || 'Unknown'}</h1>
      </div>
      <div style="padding:24px 32px;border-bottom:1px solid #222;">
        <table style="width:100%;border-collapse:collapse;">
          ${row('Name', name || '—')}
          ${row('Phone', phone ? `<a href="tel:${phone}" style="color:${GOLD};text-decoration:none;">${phone}</a>` : '—')}
          ${row('Email', email ? `<a href="mailto:${email}" style="color:${GOLD};text-decoration:none;">${email}</a>` : '—')}
          ${row('Source', source || 'marketplace_popup')}
          ${serviceType ? row('Service Interest', serviceType) : ''}
          ${packageName ? row('Package', packageName) : ''}
          ${packagePrice ? row('Price', `$${Number(packagePrice).toLocaleString()}`) : ''}
          ${step !== undefined ? row('Dropped at Step', `Step ${step} of 4`) : ''}
        </table>
      </div>
      ${isAbandoned ? `
      <div style="padding:24px 32px;background:#1a0a0a;border-bottom:1px solid #333;">
        <p style="color:#ef4444;font-size:13px;font-weight:600;margin:0 0 6px;">📞 Follow up ASAP</p>
        <p style="color:#aaa;font-size:12px;margin:0;">This person selected a package (${packageName || 'unknown'}) but didn't complete checkout. Call or text them at <strong style="color:#fff;">${phone || email}</strong> to close the booking.</p>
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
          body: JSON.stringify({ name, email, phone, source, serviceType, packageName, packagePrice, step, timestamp: new Date().toISOString() }),
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
