import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const token = authHeader?.replace('Bearer ', '');

  if (token !== ADMIN_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Pull last 100 completed checkout sessions directly from Stripe
    const sessions = await stripe.checkout.sessions.list({
      limit: 100,
      expand: ['data.customer_details'],
    });

    const orders = sessions.data
      .filter((s) => s.payment_status === 'paid' || s.status === 'complete')
      .map((s) => ({
        id: s.id,
        amount: s.amount_total ? s.amount_total / 100 : 0,
        customerEmail: s.customer_email || s.customer_details?.email || s.metadata?.clientEmail || 'no-email',
        customerName: s.customer_details?.name || 'N/A',
        status: s.payment_status,
        createdAt: new Date(s.created * 1000).toISOString(),
        packageTier: s.metadata?.packageTier || '',
        influencerId: s.metadata?.influencerId || '',
        promotionType: s.metadata?.promotionType || '',
        instructions: s.metadata?.instructions || '',
        songTitle: s.metadata?.songTitle || '',
        songLink: s.metadata?.songLink || '',
        metadata: s.metadata,
      }));

    return NextResponse.json({
      orders,
      count: orders.length,
      totalRevenue: orders.reduce((sum, o) => sum + o.amount, 0),
    });
  } catch (error: any) {
    console.error('Admin orders fetch error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch orders from Stripe' },
      { status: 500 }
    );
  }
}
