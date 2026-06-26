'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Check, ChevronRight } from 'lucide-react';

const gold = '#c9a96e';

const SERVICES = [
  { value: 'ugc',        label: 'UGC & Branded Reels' },
  { value: 'reaction',   label: 'Music Reactions' },
  { value: 'musicvideo', label: 'Music Video Models' },
  { value: 'shoot',      label: 'Photo / Video Shoot' },
  { value: 'business',   label: 'Models at My Business' },
  { value: 'commercial', label: 'Commercials & Speaking Roles' },
  { value: 'event',      label: 'Event Models / Hosting' },
  { value: 'bottle',     label: 'Bottle Girls / VIP Hostesses' },
  { value: 'other',      label: 'Not sure yet' },
];

const BUDGETS = [
  { value: 'under500',    label: 'Under $500' },
  { value: '500_1500',    label: '$500 – $1,500' },
  { value: '1500_3000',   label: '$1,500 – $3,000' },
  { value: '3000_plus',   label: '$3,000+' },
];

export default function ContactForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('');
  const [budget, setBudget] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const n = sessionStorage.getItem('lead_name');
    const p = sessionStorage.getItem('lead_phone');
    const e = sessionStorage.getItem('lead_email');
    if (n) setName(n);
    if (p) setPhone(p);
    if (e) setEmail(e);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setSubmitting(true);
    setError('');
    try {
      sessionStorage.setItem('lead_name', name);
      sessionStorage.setItem('lead_phone', phone);
      sessionStorage.setItem('lead_email', email);
    } catch {}
    try {
      const res = await fetch('/api/save-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, phone, email,
          source: 'contact_page',
          serviceType: service || undefined,
          notes: [service ? `Service: ${service}` : '', budget ? `Budget: ${budget}` : '', message].filter(Boolean).join(' | '),
        }),
      });
      if (!res.ok) throw new Error('failed');
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please call or text us at (561) 552-0392.');
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="border border-[#c9a96e]/30 bg-[#c9a96e]/[0.04] p-10 text-center">
        <div className="w-14 h-14 border-2 flex items-center justify-center mx-auto mb-6" style={{ borderColor: gold }}>
          <Check className="h-6 w-6" style={{ color: gold }} />
        </div>
        <h3 className="font-display font-bold italic text-white text-2xl mb-3">Got it, {name.split(' ')[0]}.</h3>
        <p className="text-white/45 text-sm mb-6 max-w-md mx-auto">
          Our team will reach out shortly. Want to keep moving? Start your booking now and we&apos;ll have everything ready.
        </p>
        <Link href="/model-booking" className="inline-flex items-center gap-2 px-8 py-4 text-[12px] font-bold tracking-widest uppercase hover:opacity-85 transition-all" style={{ backgroundColor: gold, color: '#000' }}>
          Book Now <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="border border-white/[0.08] bg-[#0a0a0a] p-8 md:p-10">
      <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-3" style={{ color: gold }}>Send a Message</p>
      <h2 className="font-display font-bold italic text-white text-2xl md:text-3xl mb-2">Tell us what you need</h2>
      <p className="text-white/40 text-sm mb-7">Drop your info and we&apos;ll get back to you fast — usually within a few hours.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name *"
            className="h-12 bg-white/[0.03] border border-white/10 px-4 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#c9a96e]/50 transition-colors"
          />
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number *"
            className="h-12 bg-white/[0.03] border border-white/10 px-4 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#c9a96e]/50 transition-colors"
          />
        </div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address (optional)"
          className="w-full h-12 bg-white/[0.03] border border-white/10 px-4 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#c9a96e]/50 transition-colors"
        />
        <div className="grid sm:grid-cols-2 gap-4">
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="h-12 bg-white/[0.03] border border-white/10 px-4 text-sm focus:outline-none focus:border-[#c9a96e]/50 transition-colors appearance-none"
            style={{ color: service ? '#fff' : 'rgba(255,255,255,0.25)' }}
          >
            <option value="" disabled style={{ backgroundColor: '#0d0d0d' }}>What service? *</option>
            {SERVICES.map(s => (
              <option key={s.value} value={s.value} style={{ backgroundColor: '#0d0d0d', color: '#fff' }}>{s.label}</option>
            ))}
          </select>
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="h-12 bg-white/[0.03] border border-white/10 px-4 text-sm focus:outline-none focus:border-[#c9a96e]/50 transition-colors appearance-none"
            style={{ color: budget ? '#fff' : 'rgba(255,255,255,0.25)' }}
          >
            <option value="" disabled style={{ backgroundColor: '#0d0d0d' }}>Rough budget?</option>
            {BUDGETS.map(b => (
              <option key={b.value} value={b.value} style={{ backgroundColor: '#0d0d0d', color: '#fff' }}>{b.label}</option>
            ))}
          </select>
        </div>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us more about your project (optional)"
          rows={3}
          className="w-full bg-white/[0.03] border border-white/10 px-4 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#c9a96e]/50 transition-colors resize-none"
        />
        {error && <p className="text-red-400/80 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={submitting || !name.trim() || !phone.trim()}
          className="w-full py-4 text-[12px] font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-50"
          style={{ backgroundColor: gold, color: '#000' }}
        >
          {submitting ? 'Sending...' : (<>Send Message <ChevronRight className="h-4 w-4" /></>)}
        </button>
        <p className="text-white/20 text-[11px] text-center">No spam. We only reach out about your inquiry.</p>
      </form>
    </div>
  );
}
