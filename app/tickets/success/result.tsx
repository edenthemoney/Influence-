'use client';

import Link from 'next/link';
import { INFLUENCE_CONNECT } from '@/lib/influence-connect';
import { useVerifiedTicket } from '../use-verified-ticket';

export default function TicketResult({ mode }: { mode: 'success' | 'cancel' }) {
  const { status, ticket, sessionId } = useVerifiedTicket();

  return (
    <main className="min-h-dvh bg-[#050505] px-[max(10px,env(safe-area-inset-left))] pr-[max(10px,env(safe-area-inset-right))] pt-[max(10px,env(safe-area-inset-top))] text-[#f7f1e4]">
      <div className="mx-auto flex min-h-[calc(100dvh-20px)] w-full max-w-[440px] flex-col border border-[#c8a95a] bg-[#050505] px-5 pb-[max(1.75rem,env(safe-area-inset-bottom))] pt-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.42em] text-[#c8a95a]">Influence</p>
        <p className="mt-3 font-display text-[40px] leading-[0.9] text-[#f7f1e4]">Influence Connect</p>
        <p className="mt-3 text-[14px] text-[#f7f1e4]/70">
          {INFLUENCE_CONNECT.dateLong}
          <br />
          {INFLUENCE_CONNECT.time}
          <br />
          {INFLUENCE_CONNECT.venue}, {INFLUENCE_CONNECT.cityLine}
        </p>

        <div className="mt-8 flex-1">
          {status === 'loading' && <p className="text-[17px] text-[#e6d3a1]">Checking your ticket…</p>}

          {mode === 'success' && status === 'rsvp' && (
            <>
              <h1 className="font-display text-[46px] leading-none">You&apos;re on the list.</h1>
              <p className="mt-4 text-[16px] leading-relaxed text-[#f7f1e4]/80">
                Your ladies RSVP is saved. First drink is free. Show your name at the door.
              </p>
            </>
          )}

          {mode === 'success' && status === 'paid' && (
            <>
              <h1 className="font-display text-[46px] leading-none">You&apos;re in.</h1>
              <p className="mt-4 text-[16px] leading-relaxed text-[#f7f1e4]/80">
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
              <h1 className="font-display text-[46px] leading-none">Payment not confirmed.</h1>
              <p className="mt-4 text-[16px] leading-relaxed text-[#f7f1e4]/80">
                We could not verify a paid ticket for this link. If money left your account, keep your receipt and contact us.
              </p>
            </>
          )}

          {mode === 'cancel' && status === 'paid' && (
            <>
              <h1 className="font-display text-[46px] leading-none">Payment already went through.</h1>
              <p className="mt-4 text-[16px] leading-relaxed text-[#f7f1e4]/80">
                This checkout was paid
                {typeof ticket?.amountTotal === 'number' ? ` ($${ticket.amountTotal.toFixed(2)})` : ''}.
              </p>
              {sessionId && (
                <Link
                  href={`/tickets/success?session_id=${encodeURIComponent(sessionId)}`}
                  className="mt-6 flex min-h-14 w-full touch-manipulation items-center justify-center bg-[#c8a95a] px-4 text-center text-[14px] font-bold uppercase tracking-[0.14em] text-[#16140f]"
                >
                  View your ticket
                </Link>
              )}
            </>
          )}

          {mode === 'cancel' && status !== 'loading' && status !== 'paid' && (
            <>
              <h1 className="font-display text-[46px] leading-none">Checkout canceled.</h1>
              <p className="mt-4 text-[16px] leading-relaxed text-[#f7f1e4]/80">
                No completed payment was found. If you left before paying, you were not charged.
              </p>
            </>
          )}
        </div>

        <div className="mt-8 grid gap-3">
          {(status === 'paid' || status === 'rsvp') && mode === 'success' && (
            <>
              <a
                href={INFLUENCE_CONNECT.calendarUrl}
                className="flex min-h-14 w-full touch-manipulation items-center justify-center bg-[#c8a95a] px-4 text-center text-[14px] font-bold uppercase tracking-[0.14em] text-[#16140f]"
              >
                Add to calendar
              </a>
              <a
                href={INFLUENCE_CONNECT.mapsUrl}
                className="flex min-h-14 w-full touch-manipulation items-center justify-center border border-[#c8a95a]/70 px-4 text-center text-[14px] font-semibold uppercase tracking-[0.14em] text-[#e6d3a1]"
              >
                Directions
              </a>
            </>
          )}
          <Link
            href="/tickets"
            className="flex min-h-14 w-full touch-manipulation items-center justify-center border border-[#c8a95a]/70 px-4 text-center text-[14px] font-semibold uppercase tracking-[0.14em] text-[#e6d3a1]"
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
    <div className="flex justify-between gap-4 border-b border-[#c8a95a]/25 py-2">
      <dt className="text-[#e6d3a1]">{label}</dt>
      <dd className="text-right">{value}</dd>
    </div>
  );
}
