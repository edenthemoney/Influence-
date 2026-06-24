import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { name, email, instagram, location, experience, services, portfolio, message } = await req.json();

    if (!name || !email || !instagram || !location) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: 'influencemodelsagency@gmail.com',
      subject: `🌟 New Model Application: ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #fff; padding: 32px; border-radius: 4px;">
          <h2 style="color: #c9a96e; margin-bottom: 4px;">New Model Application</h2>
          <p style="color: #888; font-size: 13px; margin-bottom: 28px;">Submitted via influencemodels.agency/join</p>

          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a; color: #888; font-size: 12px; width: 140px;">Name</td><td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a; color: #fff;">${name}</td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a; color: #888; font-size: 12px;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a; color: #fff;"><a href="mailto:${email}" style="color: #c9a96e;">${email}</a></td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a; color: #888; font-size: 12px;">Instagram</td><td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a; color: #fff;"><a href="https://instagram.com/${instagram.replace('@','')}" style="color: #c9a96e;" target="_blank">${instagram}</a></td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a; color: #888; font-size: 12px;">Location</td><td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a; color: #fff;">${location}</td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a; color: #888; font-size: 12px;">Experience</td><td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a; color: #fff;">${experience || '—'}</td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a; color: #888; font-size: 12px;">Services</td><td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a; color: #fff;">${services?.length ? services.join(', ') : '—'}</td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a; color: #888; font-size: 12px;">Portfolio</td><td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a; color: #fff;">${portfolio ? `<a href="${portfolio}" style="color: #c9a96e;" target="_blank">${portfolio}</a>` : '—'}</td></tr>
          </table>

          ${message ? `<div style="margin-top: 20px; padding: 16px; background: #111; border-left: 3px solid #c9a96e;"><p style="color: #888; font-size: 11px; margin-bottom: 6px;">NOTES</p><p style="color: #ccc; font-size: 14px; line-height: 1.6;">${message}</p></div>` : ''}

          <p style="margin-top: 28px; color: #555; font-size: 11px;">Influence · influencemodels.agency</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
