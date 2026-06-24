import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

const PLAN_NAMES: Record<string, string> = {
  ESSENTIAL:    'Essential Retainer — 1 Influencer · 8 Reels/mo · 80K+ Views',
  GROWTH_SUB:   'Growth Retainer — 2 Influencers · 16 Reels/mo · 200K+ Views',
  PRO_SUB:      'Pro Retainer — 3 Influencers · 24 Reels/mo · 400K+ Views',
  AGENCY_SUB:   'Agency Retainer — 10+ Influencers · 50+ Reels/mo · 1M+ Views',
};

export async function POST(req: NextRequest) {
  try {
    const { planId, price } = await req.json();
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const planName = PLAN_NAMES[planId] ?? `${planId} Monthly Plan`;

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: planName,
              images: [`${BASE_URL}/logo.png`],
            },
            unit_amount: price * 100,
            recurring: { interval: 'month' },
          },
          quantity: 1,
        },
      ],
      subscription_data: {
        metadata: { planId, type: 'subscription' },
      },
      success_url: `${BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}&type=subscription`,
      cancel_url: `${BASE_URL}/pricing?billing=subscription`,
      metadata: { planId, price: price.toString(), type: 'subscription' },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('[subscription-checkout]', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
