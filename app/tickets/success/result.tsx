'use client';

import Link from 'next/link';
import { INFLUENCE_CONNECT } from '@/lib/influence-connect';
import { useVerifiedTicket } from '../use-verified-ticket';
import GoldConfetti from '../gold-confetti';

export default function TicketResult({ mode }: { mode: 'success' | 'cancel' }) {
  const { status, ticket, sessionId } = useVerifiedTicket();
  const celebrate = mode === 'success' && (status === 'rsvp' || status === 'paid');

  return (
    <main className="relative min-h-dvh overflow-hidden bg-[#000000] px-[max(10px,env(safe-area-inset-left))] pr-[max(10px,env(safe-area-inset-right))] pt-[max(10px,env(safe-area-inset-top))] text-[#f4efe6]">
      <GoldConfetti active={celebrate} />
      <div className="mx-auto flex min-h-[calc(100dvh-20px)] w-full max-w-[440px] flex-col bg-[#000000] px-5 pb-[max(1.75rem,env(safe-area-inset-bottom))] pt-8">
        <p className="font-display text-[52px] font-bold leading-none tracking-[0.04em] text-[#c9a96e]">INFLUENCE</p>
        <p className="mt-2 text-[14px] font-black uppercase tracking-[0.13em] text-[#c9a96e]">Influencer Networking Event</p>
        <p className="mt-3 text-[16px] text-[#f4efe6]/85">
          {INFLUENCE_CONNECT.dateLong}
          <br />
          {INFLUENCE_CONNECT.time}
          <br />
          {INFLUENCE_CONNECT.venue}, {INFLUENCE_CONNECT.cityLine}
        </p>

        <div className="mt-8 flex-1">
          {status === 'loading' && <p className="text-[17px] text-[#c9a96e]">Checking your ticket…</p>}

          {mode === 'success' && status === 'rsvp' && (
            <>
              <h1 className="font-display text-[44px] font-bold leading-none">You&apos;re on the list.</h1>
              <p className="mt-4 text-[16px] leading-relaxed text-[#f4efe6]/80">
                Your ladies RSVP is saved. First drink is free. Show your name at the door.
              </p>
            </>
          )}

          {mode === 'success' && status === 'paid' && (
            <>
              <h1 className="font-display text-[44px] font-bold leading-none">You&apos;re in.</h1>
              <p className="mt-4 text-[16px] leading-relaxed text-[#f4efe6]/80">
                Payment confirmed
                {typeof ticket?.amountTotal === 'number' ? ` for $${ticket.amountTotal.toFixed(2)}` : ''}.
                {ticket?.quantity ? ` ${ticket.quantity} ${ticket.quantity === 1 ? 'entry' : 'entries'}.` : ''}
              </p>
              <dl className="mt-5 space-y-2 text-[15px]">
                {ticket?.customerName && <Detail label="Name" value={ticket.customerName} />}
                {ticket?.customerEmail && <Detail label="Email" value={ticket.customerEmail} />}
                {ticket?.instagram && <Detail label="Instagram" value={`@${ticket.instagram.replace(/^@/, '')}`} />}
              </dl>
            </>
          )}

          {mode === 'success' && status === 'unpaid' && (
            <>
              <h1 className="font-display text-[44px] font-bold leading-none">Payment not confirmed.</h1>
              <p className="mt-4 text-[16px] leading-relaxed text-[#f4efe6]/80">
                We could not verify a paid ticket for this link. If money left your account, keep your receipt and contact us.
              </p>
            </>
          )}

          {mode === 'cancel' && status === 'paid' && (
            <>
              <h1 className="font-display text-[44px] font-bold leading-none">Payment already went through.</h1>
              <p className="mt-4 text-[16px] leading-relaxed text-[#f4efe6]/80">
                This checkout was paid
                {typeof ticket?.amountTotal === 'number' ? ` ($${ticket.amountTotal.toFixed(2)})` : ''}.
              </p>
              {sessionId && (
                <Link
                  href={`/tickets/success?session_id=${encodeURIComponent(sessionId)}`}
                  className="mt-6 flex min-h-14 w-full touch-manipulation items-center justify-center bg-[#c9a96e] px-4 text-center text-[14px] font-bold uppercase tracking-[0.14em] text-[#0b0a08]"
                >
                  View your ticket
                </Link>
              )}
            </>
          )}

          {mode === 'cancel' && status !== 'loading' && status !== 'paid' && (
            <>
              <h1 className="font-display text-[44px] font-bold leading-none">Checkout canceled.</h1>
              <p className="mt-4 text-[16px] leading-relaxed text-[#f4efe6]/80">
                No completed payment was found. If you left before paying, you were not charged.
              </p>
            </>
          )}
        </div>

        <div className="mt-8 grid gap-3">
          {(status === 'paid' || status === 'rsvp') && mode === 'success' && (
            <>
              <a
                href={INFLUENCE_CONNECT.calendarFile}
                download="influence-connect-nov18.ics"
                className="flex min-h-14 w-full touch-manipulation items-center justify-center bg-[#c9a96e] px-4 text-center text-[14px] font-bold uppercase tracking-[0.14em] text-[#0b0a08]"
              >
                Add to calendar
              </a>
              <a
                href={INFLUENCE_CONNECT.mapsUrl}
                className="flex min-h-14 w-full touch-manipulation items-center justify-center border border-[#c9a96e]/70 px-4 text-center text-[14px] font-semibold uppercase tracking-[0.14em] text-[#c9a96e]"
              >
                Directions
              </a>
            </>
          )}
          <Link
            href="/tickets"
            className="flex min-h-14 w-full touch-manipulation items-center justify-center border border-[#c9a96e]/70 px-4 text-center text-[14px] font-semibold uppercase tracking-[0.14em] text-[#c9a96e]"
          >
            Back to tickets
          </Link>
        </div>
      </div>
    </main>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-[#c9a96e]/25 py-2">
      <dt className="text-[#c9a96e]">{label}</dt>
      <dd className="text-right">{value}</dd>
    </div>
  );
}
