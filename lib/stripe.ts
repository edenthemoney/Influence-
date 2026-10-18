import Stripe from 'stripe';

const globalForStripe = globalThis as unknown as { stripe?: Stripe };

function createStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
  }
  return new Stripe(key, {
    apiVersion: '2024-04-10',
    typescript: true,
  });
}

function getStripe(): Stripe {
  if (!globalForStripe.stripe) {
    globalForStripe.stripe = createStripe();
  }
  return globalForStripe.stripe;
}

// Defer client setup until a checkout or webhook handler actually uses it,
// so `next build` can collect route modules without STRIPE_SECRET_KEY.
export const stripe: Stripe = new Proxy({} as Stripe, {
  get(_target, prop, receiver) {
    const client = getStripe();
    const value = Reflect.get(client, prop, receiver);
    return typeof value === 'function' ? (value as (...args: unknown[]) => unknown).bind(client) : value;
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
