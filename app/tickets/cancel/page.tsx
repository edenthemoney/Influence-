import type { Metadata } from 'next';
import { Suspense } from 'react';
import TicketResult from '../success/result';

export const metadata: Metadata = {
  title: 'Checkout canceled',
  robots: { index: false, follow: false },
};

export default function TicketCancelPage() {
  return (
    <Suspense fallback={<div className="min-h-dvh bg-[#050505]" />}>
      <TicketResult mode="cancel" />
    </Suspense>
  );
}
