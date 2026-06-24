'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Check, Send, ShieldX } from 'lucide-react';
import Link from 'next/link';

const gold = '#c9a96e';
const input = 'w-full h-12 bg-white/[0.03] border border-white/10 px-4 text-white text-sm placeholder:text-white/20 focus:outline-none transition-colors';

export function PostBookingForm() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id') || '';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [link, setLink] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [verified, setVerified] = useState<boolean | null>(null);

  useEffect(() => {
    if (!sessionId) { setVerified(false); return; }
    fetch(`/api/verify-session?session_id=${sessionId}`)
      .then(r => r.json())
      .then(d => {
          setVerified(d.valid === true);
          if (d.customerEmail) setEmail(d.customerEmail);
          if (d.customerName) setName(d.customerName);
          if (d.customerPhone) setPhone(d.customerPhone);
        })
      .catch(() => setVerified(false));
  }, [sessionId]);

  const handleSubmit = async () => {
    setSending(true);
    try {
      await fetch('/api/post-booking-details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, name, email, phone, date, location, time, notes, link }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    }
    setSending(false);
  };

  // Loading state
  if (verified === null) {
    return (
      <div className="border border-white/[0.06] bg-[#0a0a0a] p-12 text-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-white/40 text-sm">Verifying payment...</p>
      </div>
    );
  }

  // No valid payment — block access
  if (!verified) {
    return (
      <div className="border border-red-500/20 bg-red-500/[0.03] p-8 text-center">
        <ShieldX className="h-8 w-8 mx-auto mb-4 text-red-400/70" />
        <p className="text-red-300/80 font-bold text-sm mb-2">No valid payment found</p>
        <p className="text-white/40 text-xs mb-6">This page is only accessible after completing a booking payment.</p>
        <Link href="/model-booking" className="inline-flex items-center justify-center px-8 py-4 text-[12px] font-bold tracking-widest uppercase transition-all hover:opacity-80" style={{ backgroundColor: gold, color: '#000' }}>
          Book Now
        </Link>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="border border-green-500/20 bg-green-500/[0.03] p-8 text-center">
        <Check className="h-8 w-8 mx-auto mb-4 text-green-400" />
        <p className="text-green-300 font-bold text-sm mb-2">Details received!</p>
        <p className="text-white/40 text-xs">We&apos;ll confirm everything within 24 hours via email or text.</p>
      </div>
    );
  }

  return (
    <div className="border border-white/[0.06] bg-[#0a0a0a] p-8 md:p-10 text-left">
      <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-2" style={{ color: gold }}>Complete Your Booking</p>
      <p className="text-white/40 text-sm mb-8">Fill in your contact info and project details so we can get started.</p>

      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-[10px] font-bold tracking-[0.3em] uppercase mb-2 text-white/35">Full Name *</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" className={input} />
          </div>
          <div>
            <label className="block text-[10px] font-bold tracking-[0.3em] uppercase mb-2 text-white/35">Phone *</label>
            <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1 (000) 000-0000" className={input} />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold tracking-[0.3em] uppercase mb-2 text-white/35">Email *</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" className={input} />
        </div>

        <div className="border-t border-white/[0.06] pt-5">
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase mb-4 text-white/25">Project Details (optional)</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-[10px] font-bold tracking-[0.3em] uppercase mb-2 text-white/35">Preferred Date</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} min={new Date().toISOString().split('T')[0]} className={input} style={{ colorScheme: 'dark' }} />
          </div>
          <div>
            <label className="block text-[10px] font-bold tracking-[0.3em] uppercase mb-2 text-white/35">Preferred Time</label>
            <input type="time" value={time} onChange={e => setTime(e.target.value)} className={input} style={{ colorScheme: 'dark' }} />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold tracking-[0.3em] uppercase mb-2 text-white/35">Location / Address</label>
          <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="Studio, venue, business address, etc." className={input} />
        </div>

        <div>
          <label className="block text-[10px] font-bold tracking-[0.3em] uppercase mb-2 text-white/35">Song Link / Brand Link / Reference</label>
          <input type="text" value={link} onChange={e => setLink(e.target.value)} placeholder="Spotify, Instagram, website, reference video, etc." className={input} />
        </div>

        <div>
          <label className="block text-[10px] font-bold tracking-[0.3em] uppercase mb-2 text-white/35">Notes / Special Requests</label>
          <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Any specific models you want, creative direction, wardrobe preferences, etc." className={`${input} h-28 py-3 resize-none`} />
        </div>

        <button
          onClick={handleSubmit}
          disabled={sending || !name || !email || !phone}
          className="w-full h-14 flex items-center justify-center gap-3 text-[12px] font-bold tracking-widest uppercase transition-all hover:opacity-80 disabled:opacity-50"
          style={{ backgroundColor: gold, color: '#000' }}
        >
          {sending ? 'Sending...' : <><Send className="h-4 w-4" /> Submit Details</>}
        </button>

        <p className="text-white/20 text-[10px] text-center">Name, phone & email are required. Project details are optional — we&apos;ll coordinate the rest.</p>
      </div>
    </div>
  );
}
