import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function GET(req: NextRequest) {
  try {
    const sessionId = req.nextUrl.searchParams.get('session_id');
    if (!sessionId) {
      return NextResponse.json({ valid: false, error: 'No session ID' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const paid = session.payment_status === 'paid';
    const meta = session.metadata || {};

    const quantity = Number(meta.quantity);
    return NextResponse.json({
      valid: paid,
      customerEmail: session.customer_email || meta.clientEmail || '',
      customerName: meta.clientName || session.customer_details?.name || '',
      customerPhone: meta.clientPhone || session.customer_details?.phone || '',
      amountTotal: session.amount_total ? session.amount_total / 100 : 0,
      paymentStatus: session.payment_status,
      eventSlug: meta.eventSlug || '',
      ticketType: meta.ticketType || '',
      instagram: meta.instagram || '',
      ...(Number.isInteger(quantity) && quantity > 0 ? { quantity } : {}),
    });
  } catch (e: any) {
    return NextResponse.json({ valid: false, error: e.message }, { status: 400 });
  }
}
