import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { packageTier, influencerId, clientEmail, promotionType, instructions, songTitle, songLink } = body;

    const packages: Record<string, { name: string; price: number; description: string }> = {
      SAMPLE: {
        name: 'Sample Package',
        price: 8000,
        description: '1x 15-second Instagram Reel - Test our service risk-free',
      },
      STARTER: {
        name: 'Starter Package',
        price: 25000,
        description: '2x 30-second reels (TikTok + IG) - Perfect for first-time campaigns',
      },
      GROWTH: {
        name: 'Growth Package',
        price: 50000,
        description: '4x 30-second reels - Scale your brand presence',
      },
      PRO: {
        name: 'Pro Package',
        price: 85000,
        description: '6x 30-second premium reels - Most popular for serious brands',
      },
      TRIO: {
        name: 'Trio Campaign',
        price: 150000,
        description: '3 verified creators - 3x 30-second reels each - 300K+ reach',
      },
      SQUAD: {
        name: 'Squad Campaign',
        price: 275000,
        description: '5 verified creators - 4x 30-second reels each - 500K+ reach',
      },
      VIRAL_NETWORK: {
        name: 'Viral Network',
        price: 599900,
        description: '10 verified creators - 5x 30-second reels each - 1M+ reach',
      },
      MEGA: {
        name: 'Mega Campaign',
        price: 1299900,
        description: '20 verified creators - 6x 30-second reels each - 2M+ reach',
      },
      DOMINATION: {
        name: 'Domination',
        price: 3500000,
        description: '50 verified creators - 8x 30-second reels each - 5M+ reach',
      },
      ENTERPRISE: {
        name: 'Enterprise',
        price: 10000000,
        description: '100+ verified creators - 10x 30-second reels each - 10M+ reach',
      },
    };

    const selectedPackage = packages[packageTier];
    
    if (!selectedPackage) {
      return NextResponse.json(
        { error: 'Invalid package tier' },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: selectedPackage.name,
              description: selectedPackage.description,
              images: ['https://your-domain.com/logo.png'],
            },
            unit_amount: selectedPackage.price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/pricing`,
      customer_email: clientEmail,
      metadata: {
        packageTier,
        influencerId,
        promotionType: promotionType || 'business',
        instructions: instructions?.substring(0, 490) || '',
        songTitle: songTitle || '',
        songLink: songLink || '',
        agencyCommission: Math.round(selectedPackage.price * 0.40).toString(),
        influencerPayout: Math.round(selectedPackage.price * 0.60).toString(),
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
