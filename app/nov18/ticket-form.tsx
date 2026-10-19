'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  normalizeInstagram,
  normalizeName,
  normalizePhone,
} from '@/lib/nov18/influence-connect';

const inputClass =
  'mt-2 w-full min-h-14 rounded-none border border-[#c9a96e]/60 bg-[#0a0908] px-4 text-[17px] font-medium normal-case tracking-normal text-[#f4efe6] outline-none appearance-none shadow-none placeholder:text-[#f4efe6]/45 focus:border-[#c9a96e] focus:ring-1 focus:ring-[#c9a96e]';

const labelClass = 'block text-[13px] font-bold uppercase tracking-[0.16em] text-[#c9a96e]';

export default function TicketForm() {
  const router = useRouter();
  const lock = useRef(false);
  const [showIg, setShowIg] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [instagram, setInstagram] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (lock.current) return;
    setError('');
    const cleanName = normalizeName(name);
    const cleanPhone = normalizePhone(phone);
    const cleanInstagram = instagram.trim() ? normalizeInstagram(instagram) : '';
    if (!cleanName || !cleanPhone || cleanInstagram === null) {
      setError(cleanInstagram === null ? 'Check your Instagram handle.' : 'Enter your name and a phone number.');
      return;
    }
    lock.current = true;
    setSubmitting(true);
    try {
      const res = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ 'form-name': 'ladies-rsvp', name: cleanName, phone: cleanPhone, instagram: cleanInstagram || '' }).toString(),
      });
      if (!res.ok) throw new Error('save');
      router.push('/nov18/success?rsvp=ladies');
    } catch {
      setError('We could not save your RSVP. Try again in a moment.');
      lock.current = false;
      setSubmitting(false);
    }
  }


  return (
    <form id="rsvp" onSubmit={onSubmit} className="scroll-mt-4 px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-10" noValidate>
      <div className="ic-rule mb-6" />
      <h2 className="text-[13px] font-bold uppercase tracking-[0.16em] text-[#c9a96e]">Ladies · free RSVP</h2>
      <p className="mt-1 text-[15px] text-[#f4efe6]/75">First drink free. Add your name to the door list.</p>
          <div className="mt-4 grid gap-3">
            <label className={labelClass}>
              Name
              <input className={inputClass} name="name" autoComplete="name" autoCapitalize="words" enterKeyHint="next" value={name} onChange={(e) => setName(e.target.value)} required />
            </label>
            <label className={labelClass}>
              Phone
              <input className={inputClass} name="phone" type="tel" inputMode="tel" autoComplete="tel" enterKeyHint={showIg ? 'next' : 'done'} value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </label>
            {showIg ? (
              <label className={labelClass}>
                Instagram (optional)
                <input className={inputClass} name="instagram" autoComplete="username" autoCapitalize="none" autoCorrect="off" spellCheck={false} enterKeyHint="done" placeholder="@yourhandle" value={instagram} onChange={(e) => setInstagram(e.target.value)} />
              </label>
            ) : (
              <button type="button" onClick={() => setShowIg(true)} className="justify-self-start text-[14px] font-bold uppercase tracking-[0.14em] text-[#c9a96e] underline underline-offset-4">
                + Add Instagram
              </button>
            )}
          </div>
          {error && (
            <p role="alert" className="mt-4 text-[16px] font-medium leading-snug text-[#f4efe6]">{error}</p>
          )}
          <button type="submit" disabled={submitting} className="mt-6 flex min-h-14 w-full touch-manipulation items-center justify-center border border-[#c9a96e]/80 px-4 text-[15px] font-bold uppercase tracking-[0.14em] text-[#c9a96e] disabled:opacity-60">
            {submitting ? 'Saving RSVP…' : 'RSVP free'}
          </button>
          <p className="mt-3 text-center text-[14px] leading-relaxed text-[#f4efe6]/75">Ladies RSVP is free. Your name and phone go on the door list.</p>
    </form>
  );
}
