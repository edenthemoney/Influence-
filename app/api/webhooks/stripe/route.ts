import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { sendOrderNotification, sendCustomerConfirmation } from '@/lib/email';
import nodemailer from 'nodemailer';

// Simple in-memory storage for orders (replace with database in production)
declare global {
  var orders: any[];
}

if (!global.orders) {
  global.orders = [];
}

export async function POST(req: NextRequest) {
  let body: string;
  try {
    body = await req.text();
  } catch (e) {
    console.error('Failed to read webhook body:', e);
    return NextResponse.json({ error: 'Failed to read body' }, { status: 400 });
  }

  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    console.error('No stripe-signature header found. Headers:', Object.fromEntries(req.headers.entries()));
    return NextResponse.json(
      { error: 'No signature provided' },
      { status: 400 }
    );
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error('STRIPE_WEBHOOK_SECRET env var is not set');
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    console.error('Body length:', body.length, 'Signature:', signature.substring(0, 20) + '...');
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  const eventType = event.type as string;

  switch (eventType) {
    case 'checkout.session.completed': {
      const session = event.data.object as any;
      
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
      }

      // If this is a model booking payment, send the detailed booking email
      if (session.metadata?.bookingSource === 'model-booking') {
        try {
          const t = nodemailer.createTransport({
            service: 'gmail',
            auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
          });
          const m = session.metadata;
          const clientEmail = session.customer_email || m.clientEmail || 'N/A';
          const clientName = session.customer_details?.name || m.clientName || 'N/A';
          const paidAt = new Date(session.created * 1000).toLocaleString('en-US', { timeZone: 'America/New_York' });
          await t.sendMail({
            from: `"Influence Bookings" <${process.env.GMAIL_USER}>`,
            to: `${process.env.GMAIL_USER}, alphatrustsolutions@gmail.com`,
            replyTo: clientEmail !== 'N/A' ? clientEmail : undefined,
            subject: `✅ PAID — ${m.packageName} Booking — ${clientName}`,
            text: `PAID BOOKING\n\n📅 Paid: ${paidAt} ET\nSession: ${session.id}\n\nPackage: ${m.packageName} — ${m.packageTagline}\nPrice: $${m.packagePrice}${m.bookingType === 'monthly' ? '/mo' : ''}\nService: ${m.serviceType === 'shoot' ? 'Shoot' : m.serviceType === 'reaction' ? 'Music Reaction' : m.serviceType === 'ugc' ? 'UGC & Reels' : m.serviceType === 'business' ? 'Business Content' : m.serviceType === 'commercial' ? 'Commercial' : 'Event'}\nType: ${m.bookingType}${m.bookingDate ? `\nDate: ${m.bookingDate}` : ''}${m.startTime ? `\nTime: ${m.startTime}` : ''}${m.location ? `\nLocation: ${m.location}` : ''}${m.songLink ? `\n${m.serviceType === 'ugc' ? 'Brief/Reference' : 'Song/Album Link'}: ${m.songLink}` : ''}\nModel: ${m.requestedModel || 'any'}\nCrew Add-on: ${m.crewAddon || 'none'}\n\nClient: ${clientName}\nEmail: ${clientEmail}\nPhone: ${m.clientPhone || 'N/A'}\nNotes: ${m.notes || 'None'}\n\n⚠️ Full contact details (name, phone, project info) will arrive in a separate email once the client fills in the post-payment form.`,
          });
        } catch (e) {
          console.error('Model booking email failed:', e);
        }
      }

      break;
    }

    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object as any;
      console.log('PaymentIntent succeeded:', paymentIntent.id);
      break;
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as any;
      console.log('PaymentIntent failed:', paymentIntent.id);
      break;
    }

    case 'invoice.paid': {
      const invoice = event.data.object as any;
      // Notify on recurring subscription payments (not the first one — that's handled by checkout.session.completed)
      if (invoice.billing_reason === 'subscription_cycle') {
        try {
          const t = nodemailer.createTransport({
            service: 'gmail',
            auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
          });
          const amount = (invoice.amount_paid / 100).toFixed(2);
          await t.sendMail({
            from: `"Influence Bookings" <${process.env.GMAIL_USER}>`,
            to: `${process.env.GMAIL_USER}, alphatrustsolutions@gmail.com`,
            subject: `💰 Monthly Auto-Charge: $${amount} — ${invoice.customer_email}`,
            text: `Recurring subscription payment received.\n\nAmount: $${amount}\nCustomer: ${invoice.customer_email}\nInvoice: ${invoice.hosted_invoice_url || 'N/A'}`,
          });
        } catch (e) {
          console.error('Recurring payment email failed:', e);
        }
      }
      break;
    }

    case 'checkout.session.expired': {
      const session = event.data.object as any;
      const abandonedEmail = session.customer_email || session.customer_details?.email || 'unknown';
      const abandonedAmount = session.amount_total ? session.amount_total / 100 : 0;
      console.log('🚫 ABANDONED CHECKOUT:', JSON.stringify({
        email: abandonedEmail,
        amount: abandonedAmount,
        metadata: session.metadata,
        created: new Date(session.created * 1000).toISOString(),
        expired: new Date().toISOString(),
      }));
      // Email alert for abandoned checkout
      try {
        const t = nodemailer.createTransport({
          service: 'gmail',
          auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
        });
        const startedAt = new Date(session.created * 1000).toLocaleString('en-US', { timeZone: 'America/New_York' });
        const expiredAt = session.expires_at ? new Date(session.expires_at * 1000).toLocaleString('en-US', { timeZone: 'America/New_York' }) : new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
        await t.sendMail({
          from: `"Influence Alerts" <${process.env.GMAIL_USER}>`,
          to: `${process.env.GMAIL_USER}`,
          subject: `🚫 Abandoned Checkout — $${abandonedAmount} — ${abandonedEmail}`,
          text: `Someone started checkout but didn't finish.\n\n📅 Started: ${startedAt} ET\n⏰ Expired: ${expiredAt} ET\n\nEmail: ${abandonedEmail}\nAmount: $${abandonedAmount}\nPackage: ${session.metadata?.packageName || 'N/A'}\nService: ${session.metadata?.serviceType || 'N/A'}\nClient Name: ${session.metadata?.clientName || 'N/A'}\nPhone: ${session.metadata?.clientPhone || 'N/A'}\nModel: ${session.metadata?.requestedModel || 'N/A'}\n\nSession ID: ${session.id}\n\nConsider following up with them.`,
        });
      } catch (e) {
        console.error('Abandoned checkout email failed:', e);
      }
      break;
    }

    case 'invoice.sent': {
      const invoice = event.data.object as any;
      console.log('📧 INVOICE SENT:', JSON.stringify({
        email: invoice.customer_email,
        amount: (invoice.amount_due / 100).toFixed(2),
        invoiceId: invoice.id,
        hostedUrl: invoice.hosted_invoice_url,
      }));
      break;
    }

    case 'invoice.viewed': {
      const invoice = event.data.object as any;
      console.log('👁️ INVOICE VIEWED:', JSON.stringify({
        email: invoice.customer_email,
        amount: (invoice.amount_due / 100).toFixed(2),
        invoiceId: invoice.id,
        viewedAt: new Date().toISOString(),
      }));
      break;
    }

    case 'charge.failed': {
      const charge = event.data.object as any;
      const failedEmail = charge.billing_details?.email || 'unknown';
      const failedAmount = (charge.amount / 100).toFixed(2);
      const failureReason = charge.failure_message || charge.failure_code || 'unknown';
      console.log('❌ CHARGE FAILED:', JSON.stringify({
        email: failedEmail,
        amount: failedAmount,
        failureReason,
        chargeId: charge.id,
      }));
      // Email alert for failed charge
      try {
        const t = nodemailer.createTransport({
          service: 'gmail',
          auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
        });
        await t.sendMail({
          from: `"Influence Alerts" <${process.env.GMAIL_USER}>`,
          to: `${process.env.GMAIL_USER}`,
          subject: `❌ PAYMENT FAILED — $${failedAmount} — ${failedEmail}`,
          text: `A payment attempt FAILED.\n\nEmail: ${failedEmail}\nAmount: $${failedAmount}\nReason: ${failureReason}\nCharge ID: ${charge.id}\n\nThis person tried to pay but their card was declined. Follow up ASAP.`,
        });
      } catch (e) {
        console.error('Failed charge email failed:', e);
      }
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
