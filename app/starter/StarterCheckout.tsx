'use client';
import { useState } from 'react';

type P = { id: string; name: string; price: number };
const gold = '#c9a96e';
const field = 'w-full min-h-[48px] border border-white/15 bg-black/40 px-4 text-[16px] text-white placeholder:text-white/35 focus:border-[#c9a96e]/60 focus:outline-none';

export default function StarterCheckout({ pkg, inPerson }: { pkg: P; inPerson: boolean }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [link, setLink] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const go = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setErr('');
    try {
      const res = await fetch('/api/create-booking-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serviceType: 'starter', bookingType: 'one-time', packageId: pkg.id, name, email, phone, date, location, songLink: link, notes: '' }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || 'Checkout failed');
      window.location.href = data.url;
    } catch (x: any) {
      setErr(x?.message || 'Something went wrong. Please try again.');
      setBusy(false);
    }
  };

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="mt-6 min-h-[48px] w-full border border-[#c9a96e]/60 text-[12px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#c9a96e] hover:text-black">
        Book · ${pkg.price}
      </button>
    );
  }
  return (
    <form onSubmit={go} className="mt-6 space-y-3">
      <input className={field} required placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
      <input className={field} required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
      <input className={field} type="tel" placeholder="Phone (optional)" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
      {inPerson && <input className={field} required type="date" aria-label="Shoot date" value={date} onChange={(e) => setDate(e.target.value)} />}
      {inPerson && <input className={field} required placeholder="Shoot location (South Florida)" value={location} onChange={(e) => setLocation(e.target.value)} />}
      <input className={field} placeholder={inPerson ? 'Song or treatment link (optional)' : 'Link to your song / product / content'} value={link} onChange={(e) => setLink(e.target.value)} />
      {err && <p className="text-sm text-red-400">{err}</p>}
      <button disabled={busy} className="min-h-[52px] w-full text-[12px] font-bold uppercase tracking-[0.2em] disabled:opacity-50" style={{ background: gold, color: '#000' }}>
        {busy ? 'Opening secure checkout…' : `Continue to checkout · $${pkg.price}`}
      </button>
      <p className="text-center text-[11px] text-white/40">Secure payment by Stripe. We confirm your creator within 24 hours.</p>
    </form>
  );
}
