import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { sessionId, name, email, phone, date, location, time, notes, link } = await req.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER || 'influencemodelsagency@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD || 'kjmk tpup pyma ubak',
      },
    });

    const gmailUser = process.env.GMAIL_USER || 'influencemodelsagency@gmail.com';

    const details = [
      `--- CLIENT INFO ---`,
      `Name: ${name || 'N/A'}`,
      `Email: ${email || 'N/A'}`,
      `Phone: ${phone || 'N/A'}`,
      ``,
      `--- PROJECT DETAILS ---`,
      `Session ID: ${sessionId || 'N/A'}`,
      `Preferred Date: ${date || 'Not specified'}`,
      `Preferred Time: ${time || 'Not specified'}`,
      `Location: ${location || 'Not specified'}`,
      `Link/Reference: ${link || 'Not specified'}`,
      `Notes: ${notes || 'None'}`,
    ].join('\n');

    await transporter.sendMail({
      from: `"Influence Booking" <${gmailUser}>`,
      to: gmailUser,
      replyTo: email || undefined,
      subject: `New Booking — ${name || 'Unknown'} · ${phone || 'No phone'}`,
      text: `New booking details submitted after payment.\n\n${details}`,
    });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
