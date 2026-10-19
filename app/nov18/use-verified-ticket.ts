'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
export type VerifiedTicket = { amountTotal?: number; quantity?: number; customerName?: string; customerEmail?: string; instagram?: string };
// Static build: no server verification. Stripe only redirects to /nov18/success after a completed payment.
export function useVerifiedTicket() {
  const params = useSearchParams();
  const rsvp = params.get('rsvp');
  const sessionId = params.get('session_id');
  const [status, setStatus] = useState<'loading' | 'rsvp' | 'paid' | 'unpaid'>('loading');
  const [ticket] = useState<VerifiedTicket | null>(null);
  useEffect(() => {
    const cancel = window.location.pathname.includes('/cancel');
    setStatus(rsvp === 'ladies' ? 'rsvp' : cancel ? 'unpaid' : 'paid');
  }, [rsvp]);
  return { status, ticket, sessionId, rsvp };
}
