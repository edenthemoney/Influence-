import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10',
  typescript: true,
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
