'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export type VerifiedTicket = {
  valid?: boolean;
  customerEmail?: string;
  customerName?: string;
  customerPhone?: string;
  amountTotal?: number;
  paymentStatus?: string;
  eventSlug?: string;
  ticketType?: string;
  instagram?: string;
  quantity?: number;
  error?: string;
};

export function useVerifiedTicket() {
  const params = useSearchParams();
  const sessionId = params.get('session_id');
  const rsvp = params.get('rsvp');
  const [status, setStatus] = useState<'loading' | 'rsvp' | 'paid' | 'unpaid'>('loading');
  const [ticket, setTicket] = useState<VerifiedTicket | null>(null);

  useEffect(() => {
    if (rsvp === 'ladies' && !sessionId) {
      setStatus('rsvp');
      return;
    }

    const query = sessionId ? `?session_id=${encodeURIComponent(sessionId)}` : '';
    let cancelled = false;

    fetch(`/api/verify-session${query}`)
      .then(async (response) => {
        const body = (await response.json().catch(() => ({ valid: false }))) as VerifiedTicket;
        return body;
      })
      .then((body) => {
        if (cancelled) return;
        setTicket(body);
        setStatus(body?.valid ? 'paid' : 'unpaid');
      })
      .catch(() => {
        if (!cancelled) setStatus('unpaid');
      });

    return () => {
      cancelled = true;
    };
  }, [rsvp, sessionId]);

  return { status, ticket, sessionId, rsvp };
}
