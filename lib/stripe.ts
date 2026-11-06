import Stripe from 'stripe';

let stripeClient: Stripe | null = null;

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
  }
  if (!stripeClient) {
    stripeClient = new Stripe(key, {
      apiVersion: '2024-04-10',
      typescript: true,
    });
  }
  return stripeClient;
}

export const stripe = new Proxy({} as Stripe, {
  get(_target, prop, receiver) {
    const client = getStripe();
    const value = Reflect.get(client, prop, receiver);
    return typeof value === 'function' ? value.bind(client) : value;
  },
});

export const COMMISSION_RATE = 0.40;

export function calculateCommissionSplit(amount: number) {
  const agencyCommission = Math.round(amount * COMMISSION_RATE);
  const influencerPayout = amount - agencyCommission;
  
  return {
    total: amount,
    agencyCommission,
    influencerPayout,
    agencyPercentage: COMMISSION_RATE * 100,
    influencerPercentage: (1 - COMMISSION_RATE) * 100,
  };
}
