'use client';
import { useState, useEffect } from 'react';
import { X, Phone } from 'lucide-react';
import HeroBooking from './HeroBooking';

const G = '#c9a96e';
const PHONE = '5615520392';
const PHONE_DISPLAY = '(561) 552-0392';

export default function FloatingBooking() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 300);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      {/* ═══ MOBILE: Fixed bottom buttons ═══ */}
      {scrolled && !open && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-[60] safe-area-bottom">
          <div className="flex gap-0">
            <a
              href="/start"
              className="flex-1 flex items-center justify-center gap-3 px-5 py-5 shadow-lg shadow-black/50"
              style={{ backgroundColor: G, color: '#000' }}
            >
              <span className="font-bold text-[14px] tracking-wide uppercase">Book Now</span>
            </a>
            <a
              href={`tel:+1${PHONE}`}
              className="flex items-center justify-center gap-2 px-4 py-5 bg-[#111] border-l border-white/10"
            >
              <Phone className="h-5 w-5" style={{ color: G }} />
              <span className="text-white/80 text-[11px] font-bold">Call</span>
            </a>
          </div>
        </div>
      )}

      {/* ═══ MOBILE: Full panel overlay ═══ */}
      {open && (
        <div className="md:hidden fixed inset-0 z-[70] flex flex-col">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative flex-1 flex flex-col justify-end p-4 pb-6">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-white/10 text-white"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="max-h-[80vh] overflow-y-auto">
              <HeroBooking />
            </div>
            <a
              href={`tel:+1${PHONE}`}
              className="mt-3 w-full flex items-center justify-center gap-3 px-5 py-4"
              style={{ backgroundColor: 'rgba(0,0,0,0.85)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <Phone className="h-4 w-4" style={{ color: G }} />
              <span className="text-white/70 text-[13px]">Have questions? <span className="font-bold text-white">{PHONE_DISPLAY}</span></span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
