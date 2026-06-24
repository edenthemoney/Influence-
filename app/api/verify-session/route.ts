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

    return NextResponse.json({
      valid: paid,
      customerEmail: session.customer_email || meta.clientEmail || '',
      customerName: meta.clientName || '',
      customerPhone: meta.clientPhone || '',
      amountTotal: session.amount_total ? session.amount_total / 100 : 0,
    });
  } catch (e: any) {
    return NextResponse.json({ valid: false, error: e.message }, { status: 400 });
  }
}
