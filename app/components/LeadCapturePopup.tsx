'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Phone, ChevronRight } from 'lucide-react';

const gold = '#c9a96e';
const SEEN_KEY = 'lead_popup_seen';

export default function LeadCapturePopup() {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const shown = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem(SEEN_KEY) || sessionStorage.getItem('lead_popup_submitted') || sessionStorage.getItem('lead_popup_dismissed')) {
      return;
    }

    const show = () => {
      if (shown.current) return;
      if (sessionStorage.getItem(SEEN_KEY)) return;
      shown.current = true;
      sessionStorage.setItem(SEEN_KEY, '1');
      setVisible(true);
    };

    const onScroll = () => {
      if (window.scrollY < 48) return;
      const root = document.documentElement;
      const depth = (window.scrollY + window.innerHeight) / root.scrollHeight;
      if (depth >= 0.5) show();
    };

    const onMouseOut = (event: MouseEvent) => {
      if (event.clientY > 8) return;
      if (event.relatedTarget) return;
      show();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    document.documentElement.addEventListener('mouseout', onMouseOut);
    return () => {
      window.removeEventListener('scroll', onScroll);
      document.documentElement.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem('lead_popup_dismissed', '1');
    sessionStorage.setItem(SEEN_KEY, '1');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone && !email) return;
    setLoading(true);
    try {
      await fetch('/api/save-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, source: 'marketplace_popup' }),
      });
      sessionStorage.setItem('lead_name', name);
      sessionStorage.setItem('lead_phone', phone);
      sessionStorage.setItem('lead_email', email);
      sessionStorage.setItem('lead_popup_submitted', '1');
      sessionStorage.setItem('lead_popup_dismissed', '1');
      sessionStorage.setItem(SEEN_KEY, '1');
    } catch {
      // Keep the form open if the network call fails.
      setLoading(false);
      return;
    }
    setSubmitted(true);
    setLoading(false);
    setTimeout(() => {
      setVisible(false);
    }, 2500);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.72)' }}>
      <div className="w-full max-w-md bg-[#0e0e0e] border border-white/10 p-6 sm:p-8 relative" role="dialog" aria-labelledby="lead-popup-title">
        <button onClick={dismiss} className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors" aria-label="Close">
          <X className="h-5 w-5" />
        </button>

        {!submitted ? (
          <>
            <p className="text-[13px] font-semibold tracking-[0.18em] uppercase mb-3" style={{ color: gold }}>Influence</p>
            <h2 id="lead-popup-title" className="font-display font-semibold text-white text-[28px] leading-[1.1] mb-3">
              Planning a night or a campaign?
            </h2>
            <p className="text-[#f6f1e7] text-[16px] mb-6 leading-relaxed">
              Leave a number. We&apos;ll follow up with availability.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/15 px-4 py-3 text-white text-[16px] placeholder-white/40 focus:outline-none focus:border-[#c9a96e] transition-colors"
              />
              <input
                type="tel"
                placeholder="Phone number"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                required
                aria-label="Phone number"
                className="w-full bg-white/[0.04] border border-white/15 px-4 py-3 text-white text-[16px] placeholder-white/40 focus:outline-none focus:border-[#c9a96e] transition-colors"
              />
              <input
                type="email"
                placeholder="Email, if you prefer"
                value={email}
                onChange={e => setEmail(e.target.value)}
                aria-label="Email"
                className="w-full bg-white/[0.04] border border-white/15 px-4 py-3 text-white text-[16px] placeholder-white/40 focus:outline-none focus:border-[#c9a96e] transition-colors"
              />
              <button
                type="submit"
                disabled={loading || !phone}
                className="w-full min-h-12 py-3 text-[16px] font-semibold tracking-[0.08em] uppercase flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-50"
                style={{ backgroundColor: gold, color: '#0c0c0c' }}
              >
                {loading ? 'Sending...' : (<>Request a call <ChevronRight className="h-4 w-4" /></>)}
              </button>
            </form>

            <p className="text-[#f6f1e7]/70 text-[13px] mt-4 leading-relaxed">We only write about bookings and availability.</p>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="w-12 h-12 border border-[#c9a96e]/40 flex items-center justify-center mx-auto mb-4">
              <Phone className="h-5 w-5" style={{ color: gold }} />
            </div>
            <p className="font-display font-semibold text-white text-[24px] mb-2">You&apos;re on the list.</p>
            <p className="text-[#f6f1e7] text-[16px]">We&apos;ll be in touch.</p>
          </div>
        )}
      </div>
    </div>
  );
}
