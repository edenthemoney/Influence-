import { NextRequest, NextResponse } from 'next/server';
import {
  INFLUENCE_CONNECT,
  STRIPE_TICKET_ACCOUNT_ID,
  normalizeEmail,
  normalizeInstagram,
  normalizeName,
  normalizePhone,
  parseGentlemenQuantity,
  ticketBaseUrl,
} from '@/lib/influence-connect';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

let cachedAccountId: string | null = null;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Send your name, email, phone, and Instagram.' }, { status: 400 });
    }

    const ticketType = (body as { ticketType?: unknown }).ticketType;
    if (ticketType !== 'gentlemen') {
      return NextResponse.json(
        { error: 'Ladies RSVP is free and does not go through checkout.' },
        { status: 400 }
      );
    }

    const name = normalizeName((body as { name?: unknown }).name);
    const email = normalizeEmail((body as { email?: unknown }).email);
    const phone = normalizePhone((body as { phone?: unknown }).phone);
    const instagram = normalizeInstagram((body as { instagram?: unknown }).instagram);
    const quantity = parseGentlemenQuantity((body as { quantity?: unknown }).quantity);

    if (!name || !email || !phone || !instagram) {
      return NextResponse.json(
        { error: 'Enter your name, email, phone, and Instagram handle.' },
        { status: 400 }
      );
    }
    if (!quantity) {
      return NextResponse.json({ error: 'Choose between 1 and 8 entries.' }, { status: 400 });
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: 'Ticket checkout is unavailable right now.' }, { status: 500 });
    }

    const { stripe } = await import('@/lib/stripe');

    if (!cachedAccountId) {
      const account = await stripe.accounts.retrieve();
      cachedAccountId = account.id;
    }
    if (cachedAccountId !== STRIPE_TICKET_ACCOUNT_ID) {
      console.error('Refusing ticket checkout for Stripe account', cachedAccountId);
      return NextResponse.json({ error: 'Ticket checkout is unavailable right now.' }, { status: 403 });
    }

    const base = ticketBaseUrl(req.headers, req.nextUrl.origin);
    const images = base.startsWith('https://') ? [`${base}/logo_stripe.png`] : undefined;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: INFLUENCE_CONNECT.gentlemenUnitAmount,
            product_data: {
              name: 'Influence Connect — Gentlemen Entry',
              description: 'Nov 18, 2026, 4–7 PM ET at Serena Pastificio, Boca Raton. Apps on us.',
              ...(images ? { images } : {}),
            },
          },
          quantity,
        },
      ],
      success_url: `${base}/tickets/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/tickets/cancel?session_id={CHECKOUT_SESSION_ID}`,
      metadata: {
        eventSlug: INFLUENCE_CONNECT.slug,
        ticketType: 'gentlemen',
        clientName: name,
        clientEmail: email,
        clientPhone: phone,
        instagram,
        quantity: String(quantity),
      },
      payment_intent_data: {
        description: 'Influence Connect — Nov 18, 2026 — Gentlemen entry',
        metadata: {
          eventSlug: INFLUENCE_CONNECT.slug,
          ticketType: 'gentlemen',
          clientName: name,
          instagram,
          quantity: String(quantity),
        },
      },
    });

    if (!session.url) {
      return NextResponse.json({ error: 'Checkout could not be started.' }, { status: 500 });
    }

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to create checkout session';
    console.error('Ticket checkout error:', message);
    return NextResponse.json({ error: 'Checkout could not be started. Try again in a moment.' }, { status: 500 });
  }
}
