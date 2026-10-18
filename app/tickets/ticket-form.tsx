'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  INFLUENCE_CONNECT,
  normalizeEmail,
  normalizeInstagram,
  normalizeName,
  normalizePhone,
  type TicketTier,
} from '@/lib/influence-connect';

const inputClass =
  'mt-2 w-full min-h-14 rounded-none border border-[#c9a96e]/60 bg-[#0a0908] px-4 text-[17px] font-medium normal-case tracking-normal text-[#f4efe6] outline-none appearance-none shadow-none placeholder:text-[#f4efe6]/45 focus:border-[#c9a96e] focus:ring-1 focus:ring-[#c9a96e]';

const labelClass = 'block text-[13px] font-bold uppercase tracking-[0.16em] text-[#c9a96e]';

export default function TicketForm() {
  const router = useRouter();
  const lock = useRef(false);
  const [tier, setTier] = useState<TicketTier | ''>('');
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [instagram, setInstagram] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const total = quantity * (INFLUENCE_CONNECT.gentlemenUnitAmount / 100);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (lock.current) return;
    setError('');

    if (tier !== 'ladies' && tier !== 'gentlemen') {
      setError('Choose ladies RSVP or gentlemen entry.');
      return;
    }

    const cleanName = normalizeName(name);
    const cleanEmail = normalizeEmail(email);
    const cleanPhone = normalizePhone(phone);
    const cleanInstagram = normalizeInstagram(instagram);
    if (!cleanName || !cleanEmail || !cleanPhone || !cleanInstagram) {
      setError('Enter your name, a valid email, a phone number, and your Instagram handle.');
      return;
    }

    lock.current = true;
    setSubmitting(true);

    try {
      if (tier === 'ladies') {
        const res = await fetch('/api/save-lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: cleanName,
            email: cleanEmail,
            phone: cleanPhone,
            instagram: cleanInstagram,
            source: 'influence-connect-nov18-ladies-rsvp',
            serviceType: 'Influence Connect',
            packageName: 'Ladies RSVP — Nov 18',
            packagePrice: 'Free',
            notes: `Instagram: @${cleanInstagram}. Ladies RSVP for Influence Connect, ${INFLUENCE_CONNECT.dateLong}, ${INFLUENCE_CONNECT.time}, ${INFLUENCE_CONNECT.venue}, ${INFLUENCE_CONNECT.fullAddress}. First drink free.`,
          }),
        });
        const data = await res.json().catch(() => null);
        if (!res.ok || !data?.success) {
          setError(res.status === 400 && data?.error ? data.error : 'We could not save your RSVP. Try again in a moment.');
          lock.current = false;
          setSubmitting(false);
          return;
        }
        router.push('/tickets/success?rsvp=ladies');
        return;
      }

      const res = await fetch('/api/create-ticket-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticketType: 'gentlemen',
          name: cleanName,
          email: cleanEmail,
          phone: cleanPhone,
          instagram: cleanInstagram,
          quantity,
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || typeof data?.url !== 'string') {
        setError(data?.error || 'Checkout could not be started. Try again in a moment.');
        lock.current = false;
        setSubmitting(false);
        return;
      }

      let target: URL;
      try {
        target = new URL(data.url);
      } catch {
        setError('Checkout could not be started. Try again in a moment.');
        lock.current = false;
        setSubmitting(false);
        return;
      }
      if (target.protocol !== 'https:' || target.hostname !== 'checkout.stripe.com') {
        setError('Checkout could not be started. Try again in a moment.');
        lock.current = false;
        setSubmitting(false);
        return;
      }

      window.location.assign(data.url);
    } catch {
      setError('Something went wrong. Check your connection and try again.');
      lock.current = false;
      setSubmitting(false);
    }
  }

  return (
    <form id="rsvp" onSubmit={onSubmit} className="scroll-mt-4 px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-8" noValidate>
      <fieldset>
        <legend className="font-display text-[30px] font-bold leading-tight text-[#f4efe6]">Get Tickets</legend>
        <div className="mt-3 grid gap-3">
          <TicketChoice
            value="ladies"
            checked={tier === 'ladies'}
            onChange={() => setTier('ladies')}
            kicker="Ladies"
            title={INFLUENCE_CONNECT.ladiesLabel}
            detail={INFLUENCE_CONNECT.ladiesPerk}
          />
          <TicketChoice
            value="gentlemen"
            checked={tier === 'gentlemen'}
            onChange={() => setTier('gentlemen')}
            kicker="Gentlemen"
            title={INFLUENCE_CONNECT.gentlemenLabel}
            detail={INFLUENCE_CONNECT.gentlemenPerk}
          />
        </div>
      </fieldset>

      {tier === 'gentlemen' && (
        <div className="mt-5">
          <p className={labelClass} id="entry-count-label">
            Number of entries
          </p>
          <div className="mt-2 flex items-stretch border border-[#c9a96e]/60" role="group" aria-labelledby="entry-count-label">
            <button
              type="button"
              className="min-h-14 min-w-14 touch-manipulation text-2xl text-[#c9a96e] disabled:opacity-40"
              onClick={() => setQuantity((current) => Math.max(1, current - 1))}
              disabled={quantity <= 1 || submitting}
              aria-label="Fewer entries"
            >
              −
            </button>
            <div className="flex min-h-14 flex-1 items-center justify-center text-[17px] font-medium text-[#f4efe6]">
              {quantity} × $25
            </div>
            <button
              type="button"
              className="min-h-14 min-w-14 touch-manipulation text-2xl text-[#c9a96e] disabled:opacity-40"
              onClick={() => setQuantity((current) => Math.min(INFLUENCE_CONNECT.maxGentlemenQuantity, current + 1))}
              disabled={quantity >= INFLUENCE_CONNECT.maxGentlemenQuantity || submitting}
              aria-label="More entries"
            >
              +
            </button>
          </div>
        </div>
      )}

      <div className="mt-5 grid gap-4">
        <label className={labelClass}>
          Name
          <input
            className={inputClass}
            name="name"
            autoComplete="name"
            autoCapitalize="words"
            enterKeyHint="next"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </label>
        <label className={labelClass}>
          Email
          <input
            className={inputClass}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            autoCorrect="off"
            enterKeyHint="next"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <label className={labelClass}>
          Phone
          <input
            className={inputClass}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            enterKeyHint="next"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            required
          />
        </label>
        <label className={labelClass}>
          Instagram
          <input
            className={inputClass}
            name="instagram"
            autoComplete="username"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            enterKeyHint="done"
            placeholder="@yourhandle"
            value={instagram}
            onChange={(event) => setInstagram(event.target.value)}
            required
          />
        </label>
      </div>

      {error && (
        <p role="alert" className="mt-4 text-[16px] font-medium leading-snug text-[#f4efe6]">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 flex min-h-14 w-full touch-manipulation items-center justify-center bg-[#c9a96e] px-4 text-[16px] font-black uppercase tracking-[0.14em] text-[#0b0a08] disabled:opacity-60"
      >
        {submitting
          ? tier === 'gentlemen'
            ? 'Opening checkout…'
            : 'Saving RSVP…'
          : tier === 'gentlemen'
            ? `Pay $${total}`
            : tier === 'ladies'
              ? 'RSVP free'
              : 'Continue'}
      </button>

      <p className="mt-3 text-center text-[14px] leading-relaxed text-[#f4efe6]/75">
        {tier === 'gentlemen'
          ? 'Payment opens in this window on Stripe’s secure page.'
          : 'Ladies RSVP is free. Your name, email, phone, and Instagram are saved for the door list.'}
      </p>
    </form>
  );
}

function TicketChoice({
  value,
  checked,
  onChange,
  kicker,
  title,
  detail,
}: {
  value: TicketTier;
  checked: boolean;
  onChange: () => void;
  kicker: string;
  title: string;
  detail: string;
}) {
  return (
    <label
      className={`ic-choice flex min-h-[88px] cursor-pointer touch-manipulation items-center justify-between gap-3 px-4 py-3 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[#f4efe6] ${
        checked ? 'is-selected' : 'text-[#f4efe6]'
      }`}
    >
      <input
        type="radio"
        name="ticketType"
        value={value}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span>
        <span className="block text-[14px] font-black uppercase tracking-[0.16em]">{kicker}</span>
        <span className={`mt-1 block text-[16px] font-medium ${checked ? 'text-[#0b0a08]' : 'text-[#f4efe6]/85'}`}>{detail}</span>
      </span>
      <span className="text-right font-display text-[26px] font-bold leading-none">{title}</span>
    </label>
  );
}
