import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';
import { sendOrderNotification, sendCustomerConfirmation } from '@/lib/email';

// Simple in-memory storage for orders (replace with database in production)
declare global {
  var orders: any[];
}

if (!global.orders) {
  global.orders = [];
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = headers().get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature provided' },
      { status: 400 }
    );
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      
      const order = {
        id: session.id,
        amount: session.amount_total ? session.amount_total / 100 : 0,
        customerEmail: session.customer_email || session.metadata?.clientEmail || 'no-email@provided.com',
        customerName: session.customer_details?.name || 'N/A',
        status: 'paid',
        createdAt: new Date().toISOString(),
        metadata: session.metadata,
        promotionType: session.metadata?.promotionType || 'business',
        instructions: session.metadata?.instructions || '',
        songTitle: session.metadata?.songTitle || '',
        songLink: session.metadata?.songLink || '',
        packageTier: session.metadata?.packageTier || '',
        influencerId: session.metadata?.influencerId || '',
      };

      // Store order
      global.orders.unshift(order);
      
      // Log to console (you can see this in Netlify function logs)
      console.log('✅ NEW ORDER:', JSON.stringify(order, null, 2));

      // Send email notifications
      try {
        await sendOrderNotification(order);
        await sendCustomerConfirmation(order);
      } catch (emailError) {
        console.error('Email notification failed:', emailError);
        // Don't break the flow if email fails
      }

      break;
    }

    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object;
      console.log('PaymentIntent succeeded:', paymentIntent.id);
      break;
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object;
      console.log('PaymentIntent failed:', paymentIntent.id);
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
