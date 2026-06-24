import nodemailer from 'nodemailer';
import { templates, TemplateName, TemplateVars } from './email-templates';

const GMAIL_USER = process.env.GMAIL_USER || '';
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD || '';

if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
  console.warn('[mailer] Missing GMAIL_USER or GMAIL_APP_PASSWORD. Emails will fail until both are set in .env.local.');
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_APP_PASSWORD,
  },
});

// Required for CAN-SPAM compliance
const AGENCY_NAME = process.env.AGENCY_NAME || 'Influence';
const AGENCY_ADDRESS = process.env.AGENCY_ADDRESS || 'Miami, FL';

function unsubscribeFooter(): string {
  return `\n\n---\n${AGENCY_NAME} · ${AGENCY_ADDRESS}\nTo stop receiving emails from us, reply with "UNSUBSCRIBE" or email ${GMAIL_USER}.`;
}

// Rate limiting state
let sentThisHour = 0;
let sentToday = 0;
let hourReset = Date.now() + 3600000;
let dayReset = Date.now() + 86400000;

const MAX_PER_HOUR = parseInt(process.env.MAX_EMAILS_PER_HOUR || '20');
const MAX_PER_DAY = parseInt(process.env.MAX_EMAILS_PER_DAY || '100');

function checkLimits() {
  const now = Date.now();
  if (now > hourReset) { sentThisHour = 0; hourReset = now + 3600000; }
  if (now > dayReset) { sentToday = 0; dayReset = now + 86400000; }

  if (sentThisHour >= MAX_PER_HOUR) throw new Error(`Rate limit: ${MAX_PER_HOUR}/hour reached. Wait before sending more.`);
  if (sentToday >= MAX_PER_DAY) throw new Error(`Rate limit: ${MAX_PER_DAY}/day reached. Try again tomorrow.`);
}

export async function sendOutreachEmail(
  to: string,
  templateName: TemplateName,
  vars: TemplateVars,
): Promise<{ success: boolean; error?: string }> {
  try {
    checkLimits();

    const template = templates[templateName];
    if (!template) throw new Error(`Template "${templateName}" not found`);

    const subject = template.subject(vars);
    const body = template.body(vars);
    const text = `${body}${unsubscribeFooter()}`;

    if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
      throw new Error('Missing GMAIL_USER or GMAIL_APP_PASSWORD in environment');
    }

    await transporter.sendMail({
      from: `"${AGENCY_NAME} Agency" <${GMAIL_USER}>`,
      to,
      subject,
      text,
    });

    sentThisHour++;
    sentToday++;

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export function getRateLimitStatus() {
  const now = Date.now();
  if (now > hourReset) { sentThisHour = 0; hourReset = now + 3600000; }
  if (now > dayReset) { sentToday = 0; dayReset = now + 86400000; }
  return {
    sentThisHour,
    maxPerHour: MAX_PER_HOUR,
    sentToday,
    maxPerDay: MAX_PER_DAY,
    hourResetsIn: Math.max(0, Math.round((hourReset - now) / 60000)),
    dayResetsIn: Math.max(0, Math.round((dayReset - now) / 60000)),
  };
}
