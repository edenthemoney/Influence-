import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import {
  INFLUENCE_CONNECT as E,
  STRIPE_TICKET_ACCOUNT_ID,
  parseGentlemenQuantity,
  ticketBaseUrl,
} from '@/lib/dec16/influence-connect';

export const dynamic = 'force-dynamic';

const EVENT_ID = E.slug; // 'influence-connect-dec16'
const PRODUCT_NAME = `${E.name} · Gentlemen Entry · Wed Dec 16, 2026`;
const PRODUCT_DESCRIPTION = `${E.dateLong}, ${E.time} at ${E.venue}, ${E.fullAddress}. Hosted by ${E.host}. ${E.gentlemenPerk}. Dress: ${E.dressCode.toLowerCase()}.`;

function ticketMetadata(quantity?: number) {
  return {
    event: EVENT_ID,
    eventName: E.name,
    eventDate: '2026-12-16',
    eventTime: E.time,
    venue: E.venue,
    tier: 'gentlemen',
    bookingSource: 'event-ticket',
    packageTier: `${E.name} Dec 16 · Gentlemen`,
    ...(quantity ? { quantityRequested: String(quantity) } : {}),
  };
}

// Account guard: tickets are only ever sold on the Influence Stripe account.
let verifiedAccount: string | null = null;
async function guardAccount(): Promise<boolean> {
  if (verifiedAccount === STRIPE_TICKET_ACCOUNT_ID) return true;
  const acct = await stripe.accounts.retrieve();
  verifiedAccount = acct.id;
  return acct.id === STRIPE_TICKET_ACCOUNT_ID;
}

function backToPage(base: string, reason: string) {
  return NextResponse.redirect(`${base}/dec16?tickets=${reason}#hero-cta`, 303);
}

// GET ?check=1 is a read-only health check: confirms the key belongs to the
// Influence account and shows what a session would contain. It creates nothing.
export async function GET(req: NextRequest) {
  const base = ticketBaseUrl(req.headers, req.nextUrl.origin);
  if (req.nextUrl.searchParams.get('check') !== '1') return NextResponse.redirect(`${base}/dec16`, 303);
  let accountOk = false;
  let error: string | undefined;
  try {
    accountOk = await guardAccount();
  } catch (e) {
    error = e instanceof Error && /STRIPE_SECRET_KEY/.test(e.message) ? 'stripe key not configured' : 'stripe account lookup failed';
  }
  return NextResponse.json(
    {
      ok: accountOk,
      account: accountOk ? 'influence' : error ? 'unknown' : 'other (blocked)',
      error,
      wouldCreate: {
        product: PRODUCT_NAME,
        description: PRODUCT_DESCRIPTION,
        unitAmount: E.gentlemenUnitAmount,
        currency: 'usd',
        quantity: { min: 1, max: E.maxGentlemenQuantity },
        successUrl: `${base}/dec16/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${base}/dec16/cancel`,
        metadata: ticketMetadata(),
      },
    },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}

export async function POST(req: NextRequest) {
  const base = ticketBaseUrl(req.headers, req.nextUrl.origin);
  let quantity = 1;
  try {
    const form = await req.formData();
    const q = parseGentlemenQuantity(form.get('quantity'));
    if (q) quantity = q;
  } catch {
    // no body: default to one ticket, adjustable on the Stripe page
  }

  try {
    if (!(await guardAccount())) {
      console.error('Ticket checkout blocked: Stripe key is not the Influence account');
      return backToPage(base, 'unavailable');
    }
    const meta = ticketMetadata(quantity);
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: E.gentlemenUnitAmount,
            product_data: {
              name: PRODUCT_NAME,
              description: PRODUCT_DESCRIPTION,
              metadata: { event: EVENT_ID, tier: 'gentlemen' },
            },
          },
          quantity,
          adjustable_quantity: { enabled: true, minimum: 1, maximum: E.maxGentlemenQuantity },
        },
      ],
      phone_number_collection: { enabled: true },
      custom_fields: [
        {
          key: 'instagram',
          label: { type: 'custom', custom: 'Instagram (optional)' },
          type: 'text',
          optional: true,
        },
      ],
      submit_type: 'pay',
      metadata: meta,
      payment_intent_data: {
        description: PRODUCT_NAME,
        metadata: meta,
      },
      success_url: `${base}/dec16/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/dec16/cancel`,
    });
    if (!session.url) return backToPage(base, 'error');
    return NextResponse.redirect(session.url, 303);
  } catch (e) {
    console.error('Ticket checkout failed:', e instanceof Error ? e.message : e);
    return backToPage(base, 'error');
  }
}
