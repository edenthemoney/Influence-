'use client';

import Link from 'next/link';
import { INFLUENCE_CONNECT } from '@/lib/dec16/influence-connect';
import { useVerifiedTicket } from '../use-verified-ticket';
import GoldConfetti from '../gold-confetti';

export default function TicketResult({ mode }: { mode: 'success' | 'cancel' }) {
  const { status, ticket, sessionId } = useVerifiedTicket();
  const celebrate = mode === 'success' && (status === 'rsvp' || status === 'paid');

  return (
    <main className="relative min-h-dvh overflow-hidden bg-black px-[max(10px,env(safe-area-inset-left))] pr-[max(10px,env(safe-area-inset-right))] pt-[max(10px,env(safe-area-inset-top))] text-[#f4efe6]">
      <GoldConfetti active={celebrate} />
      <div className="mx-auto flex min-h-[calc(100dvh-20px)] w-full max-w-[440px] flex-col bg-black px-5 pb-[max(1.75rem,env(safe-area-inset-bottom))] pt-8">
        <p className="font-display text-[22px] font-semibold tracking-[0.28em] text-[#c9a96e]">INFLUENCE</p>
        <p className="ic-eyebrow mt-4">Influence Connect</p>
        <p className="mt-3 text-[16px] leading-relaxed text-[#f4efe6]/85">
          {INFLUENCE_CONNECT.dateLong}
          <br />
          {INFLUENCE_CONNECT.time}
          <br />
          {INFLUENCE_CONNECT.venue}, {INFLUENCE_CONNECT.cityLine}
        </p>
        <p className="mt-2 text-[15px] text-[#f4efe6]/70">Hosted by {INFLUENCE_CONNECT.host}</p>

        <div className="mt-10 flex-1 border-t border-[#c9a96e]/30 pt-8">
          {status === 'loading' && <p className="text-[17px] text-[#c9a96e]">Loading…</p>}

          {mode === 'success' && status === 'rsvp' && (
            <>
              <h1 className="font-display text-[44px] font-semibold leading-none">You&apos;re on the list.</h1>
              <p className="mt-4 text-[16px] leading-relaxed text-[#f4efe6]/80">
                Your ladies &amp; ambassadors RSVP is saved. Show your name at the door.
              </p>
            </>
          )}

          {mode === 'success' && status === 'paid' && (
            <>
              <h1 className="font-display text-[44px] font-semibold leading-none">You&apos;re in.</h1>
              <p className="mt-4 text-[16px] leading-relaxed text-[#f4efe6]/80">
                Business Owner Entry confirmed. Your Stripe receipt is on its way to your email. Show it with your name at the door.
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
              <h1 className="font-display text-[44px] font-semibold leading-none">Payment not confirmed.</h1>
              <p className="mt-4 text-[16px] leading-relaxed text-[#f4efe6]/80">
                We could not verify a paid ticket for this link. If money left your account, keep your receipt and contact us.
              </p>
            </>
          )}

          {mode === 'cancel' && status === 'paid' && (
            <>
              <h1 className="font-display text-[44px] font-semibold leading-none">Payment already went through.</h1>
              <p className="mt-4 text-[16px] leading-relaxed text-[#f4efe6]/80">
                This checkout was paid
                {typeof ticket?.amountTotal === 'number' ? ` ($${ticket.amountTotal.toFixed(2)})` : ''}.
              </p>
              {sessionId && (
                <Link
                  href={`/dec16/success?session_id=${encodeURIComponent(sessionId)}`}
                  className="ic-btn-gold mt-6 w-full"
                >
                  View your ticket
                </Link>
              )}
            </>
          )}

          {mode === 'cancel' && status !== 'loading' && status !== 'paid' && (
            <>
              <h1 className="font-display text-[44px] font-semibold leading-none">Checkout canceled.</h1>
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
                download="influence-connect-dec16.ics"
                className="ic-btn-gold w-full"
              >
                Add to calendar
              </a>
              <a href={INFLUENCE_CONNECT.mapsUrl} className="ic-btn-ghost w-full">
                Directions
              </a>
            </>
          )}
          <Link href="/dec16" className="ic-btn-ghost w-full">
            Back to invitation
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
