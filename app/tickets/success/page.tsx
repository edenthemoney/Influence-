import type { Metadata } from 'next';
import { Suspense } from 'react';
import TicketResult from './result';

export const metadata: Metadata = {
  title: 'Ticket confirmed',
  robots: { index: false, follow: false },
};

export default function TicketSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-dvh bg-[#000000]" />}>
      <TicketResult mode="success" />
    </Suspense>
  );
}
