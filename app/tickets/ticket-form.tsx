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
  'mt-2 w-full min-h-14 border border-[#c8a95a]/55 bg-black px-4 text-base text-[#f7f1e4] outline-none appearance-none shadow-none focus:border-[#f3e5ab]';

const labelClass = 'block text-[12px] font-semibold uppercase tracking-[0.18em] text-[#e6d3a1]';

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
    <form onSubmit={onSubmit} className="px-5 pb-[max(1.75rem,env(safe-area-inset-bottom))] pt-6" noValidate>
      <fieldset>
        <legend className={labelClass}>Your ticket</legend>
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
          <div className="mt-2 flex items-stretch border border-[#c8a95a]/55" role="group" aria-labelledby="entry-count-label">
            <button
              type="button"
              className="min-h-14 min-w-14 touch-manipulation text-2xl text-[#f3e5ab] disabled:opacity-40"
              onClick={() => setQuantity((current) => Math.max(1, current - 1))}
              disabled={quantity <= 1 || submitting}
              aria-label="Fewer entries"
            >
              −
            </button>
            <div className="flex min-h-14 flex-1 items-center justify-center text-base text-[#f7f1e4]">
              {quantity} × $25
            </div>
            <button
              type="button"
              className="min-h-14 min-w-14 touch-manipulation text-2xl text-[#f3e5ab] disabled:opacity-40"
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
        <p role="alert" className="mt-4 text-[15px] leading-snug text-[#f3e5ab]">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 flex min-h-14 w-full touch-manipulation items-center justify-center bg-[#c8a95a] px-4 text-[15px] font-bold uppercase tracking-[0.16em] text-[#16140f] disabled:opacity-60"
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

      <p className="mt-3 text-center text-[13px] leading-relaxed text-[#f7f1e4]/60">
        {tier === 'gentlemen'
          ? 'Payment opens in this window on Stripe’s secure page.'
          : 'Ladies RSVP is free. Your name, email, phone, and Instagram are saved for the door list.'}
      </p>

      <a
        href={INFLUENCE_CONNECT.mapsUrl}
        className="mt-6 flex min-h-14 w-full touch-manipulation items-center justify-center border border-[#c8a95a]/70 px-4 text-center text-[13px] font-semibold uppercase tracking-[0.14em] text-[#e6d3a1]"
      >
        Directions to Serena Pastificio
      </a>
      <p className="mt-3 text-center text-[13px] leading-relaxed text-[#f7f1e4]/55">
        {INFLUENCE_CONNECT.fullAddress}
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
      className={`flex min-h-[76px] cursor-pointer touch-manipulation items-center justify-between gap-3 border px-4 py-3 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[#f3e5ab] ${
        checked
          ? 'border-[#c8a95a] bg-[#c8a95a] text-[#16140f]'
          : 'border-[#c8a95a]/80 bg-transparent text-[#f7f1e4]'
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
        <span className="block text-[12px] font-bold uppercase tracking-[0.2em]">{kicker}</span>
        <span className={`mt-1 block text-[14px] ${checked ? 'text-[#16140f]/80' : 'text-[#f7f1e4]/70'}`}>{detail}</span>
      </span>
      <span className="text-right font-display text-[26px] leading-none">{title}</span>
    </label>
  );
}
