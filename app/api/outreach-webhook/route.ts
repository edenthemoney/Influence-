import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Make.com calls this endpoint with a prospect + AI-generated pitch
// It logs the outreach, emails you a summary, and returns success
// Secured by a shared secret in the Authorization header

const GOLD = '#c9a96e';

export async function POST(req: Request) {
  try {
    const auth = req.headers.get('authorization');
    if (auth !== `Bearer ${process.env.OUTREACH_WEBHOOK_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const {
      pipeline,       // 'music_reactions' | 'business_content' | 'events' | 'bottle_girls'
      prospect_name,
      prospect_instagram,
      prospect_email,
      prospect_phone,
      song_title,     // music pipeline only
      song_genre,     // music pipeline
      business_type,  // business pipeline
      business_location,
      event_name,     // events pipeline
      event_date,
      generated_pitch,
      channel,        // 'email' | 'instagram_dm' | 'sms' | 'linkedin'
    } = body;

    if (!prospect_name || !pipeline) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
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
        <td style="padding:8px 0;color:#888;font-size:11px;letter-spacing:2px;text-transform:uppercase;width:160px;vertical-align:top;">${label}</td>
        <td style="padding:8px 0;color:#fff;font-size:13px;">${value || '—'}</td>
      </tr>`;

    const pipelineLabels: Record<string, string> = {
      music_reactions: '🎵 Music Reactions',
      business_content: '🏢 Business Content',
      events: '✨ Events & Hosting',
      bottle_girls: '🍾 Bottle Girls / VIP',
    };

    const htmlEmail = `
    <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#fff;border:1px solid #222;">
      <div style="padding:28px 32px 20px;border-bottom:1px solid #222;">
        <p style="font-size:10px;letter-spacing:4px;text-transform:uppercase;color:${GOLD};margin:0 0 6px;">Outreach Fired — ${pipelineLabels[pipeline] || pipeline}</p>
        <h1 style="font-size:26px;font-weight:300;font-style:italic;margin:0;color:#fff;">${prospect_name}</h1>
        <p style="color:#555;font-size:12px;margin:6px 0 0;">via ${channel || 'unknown channel'}</p>
      </div>
      <div style="padding:20px 32px;border-bottom:1px solid #222;">
        <table style="width:100%;border-collapse:collapse;">
          ${prospect_instagram ? row('Instagram', `<a href="https://instagram.com/${prospect_instagram.replace('@','')}" style="color:${GOLD};text-decoration:none;">${prospect_instagram}</a>`) : ''}
          ${prospect_email ? row('Email', `<a href="mailto:${prospect_email}" style="color:${GOLD};text-decoration:none;">${prospect_email}</a>`) : ''}
          ${prospect_phone ? row('Phone', prospect_phone) : ''}
          ${song_title ? row('Track', `${song_title} · ${song_genre || ''}`) : ''}
          ${business_type ? row('Business', `${business_type} · ${business_location || ''}`) : ''}
          ${event_name ? row('Event', `${event_name} · ${event_date || ''}`) : ''}
        </table>
      </div>
      <div style="padding:20px 32px;border-bottom:1px solid #222;background:#0d0d0d;">
        <p style="color:#888;font-size:10px;letter-spacing:3px;text-transform:uppercase;margin:0 0 10px;">Generated Pitch Sent</p>
        <p style="color:#ccc;font-size:13px;line-height:1.7;margin:0;white-space:pre-wrap;">${generated_pitch || '—'}</p>
      </div>
      <div style="padding:16px 32px;">
        <p style="color:#444;font-size:11px;margin:0;">Sent at ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} ET</p>
      </div>
    </div>`;

    await transporter.sendMail({
      from: `"Influence Outreach" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER!,
      subject: `📤 Outreach Sent — ${prospect_name} (${pipelineLabels[pipeline] || pipeline})`,
      html: htmlEmail,
    });

    return NextResponse.json({ success: true, prospect: prospect_name, pipeline, channel });
  } catch (error: any) {
    console.error('Outreach webhook error:', error);
    return NextResponse.json({ error: 'Failed', details: error.message }, { status: 500 });
  }
}
