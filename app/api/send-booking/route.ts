import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const GOLD = '#c9a96e';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { serviceType, bookingType, packageName, packageTagline, packagePrice, date, name, email, phone, notes } = body;

    if (!name || !email || !packageName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const isMonthly = bookingType === 'monthly';
    const serviceLabel = serviceType === 'shoot' ? 'Video / Photo Shoot' : 'Event Hosting & Promo';
    const bookingLabel = isMonthly ? 'Monthly Subscription' : 'One-Time Booking';
    const formattedDate = date
      ? isMonthly
        ? new Date(date + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        : new Date(date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
      : 'Not specified';
    const formattedPrice = `$${Number(packagePrice).toLocaleString()}${isMonthly ? '/mo' : ''}`;

    const row = (label: string, value: string) => `
      <tr>
        <td style="padding:10px 0;color:#888;font-size:11px;letter-spacing:2px;text-transform:uppercase;width:140px;vertical-align:top;">${label}</td>
        <td style="padding:10px 0;color:#fff;font-size:14px;font-weight:500;">${value}</td>
      </tr>`;

    const htmlEmail = `
    <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#fff;border:1px solid #222;">
      <div style="padding:32px 32px 24px;border-bottom:1px solid #222;">
        <p style="font-size:10px;letter-spacing:4px;text-transform:uppercase;color:${GOLD};margin:0 0 8px;">New Booking Request</p>
        <h1 style="font-size:28px;font-weight:300;font-style:italic;margin:0;color:#fff;">${packageName} — ${serviceLabel}</h1>
      </div>
      <div style="padding:24px 32px;border-bottom:1px solid #222;">
        <table style="width:100%;border-collapse:collapse;">
          ${row('Client', name)}
          ${row('Email', `<a href="mailto:${email}" style="color:${GOLD};text-decoration:none;">${email}</a>`)}
          ${row('Phone', phone || 'Not provided')}
          ${row('Service', serviceLabel)}
          ${row('Booking Type', bookingLabel)}
          ${row('Package', `${packageName} — ${packageTagline}`)}
          ${row('Price', `<span style="color:${GOLD};font-size:18px;font-weight:700;">${formattedPrice}</span>`)}
          ${row(isMonthly ? 'Start Month' : 'Date', formattedDate)}
        </table>
      </div>
      ${notes ? `
      <div style="padding:24px 32px;border-bottom:1px solid #222;">
        <p style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#888;margin:0 0 8px;">Project Details</p>
        <p style="color:#ccc;font-size:14px;line-height:1.6;margin:0;">${notes.replace(/\n/g, '<br>')}</p>
      </div>` : ''}
      <div style="padding:24px 32px;">
        <p style="color:#555;font-size:12px;margin:0;">Reply directly to this email to reach the client at ${email}</p>
      </div>
    </div>`;

    const textEmail = `
NEW BOOKING REQUEST
===================
Package: ${packageName} — ${packageTagline}
Price: ${formattedPrice}
Service: ${serviceLabel}
Type: ${bookingLabel}
${isMonthly ? 'Start Month' : 'Date'}: ${formattedDate}

CLIENT INFO
-----------
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}

${notes ? `NOTES\n-----\n${notes}` : ''}
    `.trim();

    await transporter.sendMail({
      from: `"Influence Bookings" <${process.env.GMAIL_USER}>`,
      to: `${process.env.GMAIL_USER}, alphatrustsolutions@gmail.com`,
      replyTo: email,
      subject: `🔔 New ${bookingLabel}: ${packageName} — ${name}`,
      text: textEmail,
      html: htmlEmail,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Email send error:', error);
    return NextResponse.json({ error: 'Failed to send email', details: error.message }, { status: 500 });
  }
}
