// Public event copy and ticket rules for Influence Connect.
// The Stripe account id is an allowlist, not a credential. Secret keys stay in env.

export const STRIPE_TICKET_ACCOUNT_ID = 'acct_1TKqbVGhgSxrSipt';

export const INFLUENCE_CONNECT = {
  slug: 'influence-connect-nov18',
  name: 'Influence Connect',
  tagline: 'Where Businesses Meet the Right Influencers',
  eyebrow: 'Meet & Greet · Influencer Network',
  host: 'Deseray Marie',
  weekday: 'Wednesday',
  dateShort: 'Nov 18',
  dateLong: 'Wednesday, November 18, 2026',
  time: '4 – 7 PM ET',
  venue: 'Serena Pastificio',
  street: '301 Plaza Real',
  area: 'Mizner Park',
  cityLine: 'Boca Raton, FL 33432',
  fullAddress: '301 Plaza Real, Mizner Park, Boca Raton, FL 33432',
  gentlemenUnitAmount: 2500,
  maxGentlemenQuantity: 8,
  ladiesLabel: 'Free RSVP',
  ladiesPerk: 'First drink free',
  gentlemenLabel: '$25 entry',
  gentlemenPerk: 'Apps on us',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Serena%20Pastificio%20301%20Plaza%20Real%20Boca%20Raton%20FL%2033432',
  calendarUrl:
    'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Influence%20Connect&dates=20261118T160000/20261118T190000&ctz=America/New_York&location=Serena%20Pastificio%2C%20301%20Plaza%20Real%2C%20Boca%20Raton%2C%20FL%2033432&details=Where%20Businesses%20Meet%20the%20Right%20Influencers.%20Hosted%20by%20Deseray%20Marie.',
} as const;

export type TicketTier = 'ladies' | 'gentlemen';

export function normalizeName(raw: unknown): string | null {
  if (typeof raw !== 'string') return null;
  const name = raw.trim().replace(/\s+/g, ' ');
  if (name.length < 2 || name.length > 80) return null;
  if (/[\u0000-\u001f\u007f]/.test(name)) return null;
  if (/[0-9@<>]/.test(name)) return null;
  return name;
}

export function normalizeEmail(raw: unknown): string | null {
  if (typeof raw !== 'string') return null;
  const email = raw.trim().toLowerCase();
  if (email.length < 5 || email.length > 120) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  return email;
}

export function normalizePhone(raw: unknown): string | null {
  if (typeof raw !== 'string') return null;
  const phone = raw.trim().replace(/\s+/g, ' ');
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 10 || digits.length > 15) return null;
  if (!/^[+()\d.\- ]+$/.test(phone)) return null;
  return phone;
}

export function normalizeInstagram(raw: unknown): string | null {
  if (typeof raw !== 'string') return null;
  let handle = raw.trim();
  if (!handle) return null;
  handle = handle.replace(/^https?:\/\/(www\.)?instagram\.com\//i, '');
  handle = handle.replace(/^@+/, '');
  const slash = handle.indexOf('/');
  if (slash !== -1) handle = handle.slice(0, slash);
  handle = handle.trim();
  if (!handle || /\s/.test(handle)) return null;
  if (!/^[A-Za-z0-9._]{1,30}$/.test(handle)) return null;
  return handle;
}

export function parseGentlemenQuantity(value: unknown): number | null {
  if (value === undefined || value === null || value === '') return 1;
  const n = typeof value === 'number' ? value : Number(String(value).trim());
  if (!Number.isInteger(n)) return null;
  if (n < 1 || n > INFLUENCE_CONNECT.maxGentlemenQuantity) return null;
  return n;
}

export function ticketBaseUrl(headers: Headers, fallbackOrigin: string): string {
  const forwardedHost = headers.get('x-forwarded-host')?.split(',')[0]?.trim();
  const host = forwardedHost || headers.get('host')?.split(',')[0]?.trim() || '';
  const proto = headers.get('x-forwarded-proto')?.split(',')[0]?.trim() || 'https';
  if (host && !/^localhost|127\.0\.0\.1/.test(host)) {
    return `${proto}://${host}`;
  }
  const configured = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, '');
  if (configured) return configured;
  return fallbackOrigin.replace(/\/$/, '') || 'http://localhost:3000';
}
