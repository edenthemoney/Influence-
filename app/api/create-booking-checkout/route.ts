import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { serviceType, bookingType, packageName, packageTagline, packagePrice, crewAddon, date, name, email, phone, notes, location, time, songLink, selectedModel } = body;

    if (!packageName || !packagePrice) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const isMonthly = bookingType === 'monthly';
    const serviceLabel = serviceType === 'shoot' ? 'Video / Photo Shoot' : serviceType === 'reaction' ? 'Music Reaction' : serviceType === 'ugc' ? 'UGC & Branded Content' : serviceType === 'business' ? 'Business Content' : serviceType === 'commercial' ? 'Commercial Production' : serviceType === 'bottle' ? 'Bottle Girls / VIP Hostesses' : 'Event Hosting & Promo';
    const description = `${packageTagline} — ${serviceLabel}${isMonthly ? ' (Monthly)' : ''}`;

    const lineItem: any = {
      price_data: {
        currency: 'usd',
        product_data: {
          name: `${packageName} — ${serviceLabel}`,
          description,
          images: [`${process.env.NEXT_PUBLIC_BASE_URL || 'https://influencemodels.agency'}/logo_stripe.png`],
        },
        unit_amount: Math.round(packagePrice * 100),
        ...(isMonthly ? { recurring: { interval: 'month' } } : {}),
      },
      quantity: 1,
    };

    const lineItems: any[] = [lineItem];

    // Add crew addon as separate line item if selected
    if (crewAddon && crewAddon.price && !isMonthly) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Add-on: ${crewAddon.name}`,
            description: crewAddon.tagline,
          },
          unit_amount: Math.round(crewAddon.price * 100),
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: isMonthly ? 'subscription' : 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/booking/success?session_id={CHECKOUT_SESSION_ID}&type=model-booking`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/model-booking`,
      ...(email ? { customer_email: email } : {}),
      metadata: {
        bookingSource: 'model-booking',
        serviceType,
        bookingType,
        packageName,
        packageTagline,
        packagePrice: packagePrice.toString(),
        clientName: name,
        clientEmail: email,
        clientPhone: phone || '',
        bookingDate: date || '',
        location: (location || '').substring(0, 490),
        startTime: time || '',
        songLink: (songLink || '').substring(0, 490),
        crewAddon: crewAddon ? `${crewAddon.name} ($${crewAddon.price})` : 'none',
        requestedModel: selectedModel || 'any',
        notes: (notes || '').substring(0, 490),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Booking checkout error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
