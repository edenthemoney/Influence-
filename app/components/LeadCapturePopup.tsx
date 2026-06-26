'use client';

import { useState, useEffect } from 'react';
import { X, Phone, ChevronRight, Lock, MessageCircle } from 'lucide-react';

const gold = '#c9a96e';

export default function LeadCapturePopup() {
  const [visible, setVisible] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('lead_popup_dismissed');
    if (dismissed) {
      // Even if dismissed, show sticky bar after 3s unless they already submitted
      const alreadySubmitted = sessionStorage.getItem('lead_popup_submitted');
      if (!alreadySubmitted) {
        const stickyTimer = setTimeout(() => setStickyVisible(true), 3000);
        return () => clearTimeout(stickyTimer);
      }
      return;
    }
    // Show popup after 4 seconds on the page
    const timer = setTimeout(() => setVisible(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem('lead_popup_dismissed', '1');
    // Show sticky bar after 2s as fallback
    setTimeout(() => setStickyVisible(true), 2000);
  };

  const dismissSticky = () => {
    setStickyVisible(false);
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
      // Save to session so booking form is pre-filled
      sessionStorage.setItem('lead_name', name);
      sessionStorage.setItem('lead_phone', phone);
      sessionStorage.setItem('lead_email', email);
      sessionStorage.setItem('lead_popup_submitted', '1');
      sessionStorage.setItem('lead_popup_dismissed', '1');
    } catch {}
    setSubmitted(true);
    setStickyVisible(false);
    setLoading(false);
    setTimeout(() => {
      setVisible(false);
    }, 2500);
  };

  return (
    <>
      {/* Main popup */}
      {visible && (
        <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}>
          <div className="w-full max-w-md bg-[#0e0e0e] border border-white/10 p-8 relative">
            <button onClick={dismiss} className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors">
              <X className="h-4 w-4" />
            </button>

            {!submitted ? (
              <>
                <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-3" style={{ color: gold }}>Exclusive Access</p>
                <h2 className="font-display font-bold italic text-white text-2xl leading-tight mb-2">
                  Book Miami's Top Models
                </h2>
                <p className="text-white/40 text-sm mb-6 leading-relaxed">
                  Drop your number and we'll reach out with availability, pricing, and first access to new talent.
                </p>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/10 px-4 py-3 text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#c9a96e]/50 transition-colors"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    required
                    className="w-full bg-white/[0.04] border border-white/10 px-4 py-3 text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#c9a96e]/50 transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Email (optional)"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/10 px-4 py-3 text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#c9a96e]/50 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={loading || !phone}
                    className="w-full py-4 text-[12px] font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-50"
                    style={{ backgroundColor: gold, color: '#000' }}
                  >
                    {loading ? 'Sending...' : (<>Get Access <ChevronRight className="h-4 w-4" /></>)}
                  </button>
                </form>

                <div className="flex items-center gap-2 mt-4">
                  <Lock className="h-3 w-3 text-white/20" />
                  <p className="text-white/20 text-[10px]">No spam. We only reach out about bookings & availability.</p>
                </div>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="w-12 h-12 border border-[#c9a96e]/40 flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-5 w-5" style={{ color: gold }} />
                </div>
                <p className="font-display font-bold italic text-white text-xl mb-2">You're on the list!</p>
                <p className="text-white/40 text-sm">We'll be in touch shortly.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sticky bottom bar — shows after popup is dismissed */}
      {stickyVisible && !visible && (
        <div className="fixed bottom-0 left-0 right-0 z-[9998] border-t border-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <MessageCircle className="h-4 w-4 flex-shrink-0" style={{ color: gold }} />
            <p className="text-white/70 text-xs truncate">Get pricing & availability — drop your number</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                type="tel"
                placeholder="Your phone"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                required
                className="w-32 sm:w-40 bg-white/[0.06] border border-white/15 px-3 py-2 text-white text-xs placeholder-white/25 focus:outline-none focus:border-[#c9a96e]/50 transition-colors"
              />
              <button
                type="submit"
                disabled={loading || !phone}
                className="px-4 py-2 text-[10px] font-bold tracking-widest uppercase transition-all hover:opacity-90 disabled:opacity-40 flex-shrink-0"
                style={{ backgroundColor: gold, color: '#000' }}
              >
                {loading ? '...' : 'Go'}
              </button>
            </form>
            <button onClick={dismissSticky} className="text-white/20 hover:text-white/60 transition-colors ml-1">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
