'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import posthog from 'posthog-js';

declare global {
  interface Window { gtag?: (...args: any[]) => void; }
}

export function BookingSuccessTracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    const type = searchParams.get('type');
    if (!sessionId) return;

    // Verify payment before firing conversion events
    fetch(`/api/verify-session?session_id=${sessionId}`)
      .then(r => r.json())
      .then(d => {
        if (!d.valid) return;

        posthog.capture('booking_completed', {
          session_id: sessionId,
          booking_type: type,
          amount: d.amountTotal,
        });

        // Google Ads conversion tracking
        if (window.gtag) {
          window.gtag('event', 'conversion', {
            send_to: 'AW-18175755451/MRFACLW0prIcELuJ8NpD',
            value: d.amountTotal || 1.0,
            currency: 'USD',
            transaction_id: sessionId,
          });
        }
      })
      .catch(() => {});
  }, [searchParams]);

  return null;
}
