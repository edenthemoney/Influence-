'use client';
import { useState, useEffect } from 'react';
import { X, Sparkles, Phone, MessageCircle } from 'lucide-react';
import HeroBooking from './HeroBooking';

const G = '#c9a96e';
const PHONE = '5615520392';
const PHONE_DISPLAY = '(561) 552-0392';

export default function FloatingBooking() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [minimized, setMinimized] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 300);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      {/* ═══ DESKTOP: Fixed right-side sticky widget ═══ */}
      {scrolled && (
        <div className="hidden md:block fixed top-20 right-6 z-[55] transition-all duration-300" style={{ width: minimized ? 'auto' : '480px' }}>
          {!minimized ? (
            <div className="relative">
              <button
                onClick={() => setMinimized(true)}
                className="absolute top-3 right-3 z-10 w-7 h-7 flex items-center justify-center text-white/30 hover:text-white/60 transition-colors"
                title="Minimize"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="max-h-[calc(100vh-96px)] overflow-y-auto shadow-2xl shadow-black/60">
                <HeroBooking />
              </div>
              {/* Call button below widget */}
              <a
                href={`tel:+1${PHONE}`}
                className="mt-3 w-full flex items-center justify-center gap-3 px-5 py-4 transition-all hover:opacity-90"
                style={{ backgroundColor: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <Phone className="h-4 w-4" style={{ color: G }} />
                <span className="text-white/70 text-[13px] font-medium">Questions? Call us — <span className="font-bold text-white">{PHONE_DISPLAY}</span></span>
              </a>
            </div>
          ) : (
            /* Minimized: just the expand button */
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setMinimized(false)}
                className="flex items-center gap-3 px-5 py-4 shadow-xl shadow-black/40 transition-all duration-200 hover:scale-[1.02] group"
                style={{ backgroundColor: G, color: '#000' }}
              >
                <Sparkles className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                <span className="font-bold text-[13px] tracking-wide uppercase">Find Your Package</span>
              </button>
              <a
                href={`tel:+1${PHONE}`}
                className="flex items-center gap-3 px-5 py-3 transition-all hover:opacity-90"
                style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <Phone className="h-3.5 w-3.5" style={{ color: G }} />
                <span className="text-white/60 text-[12px]">Call <span className="text-white font-semibold">{PHONE_DISPLAY}</span></span>
              </a>
            </div>
          )}
        </div>
      )}

      {/* ═══ MOBILE: Fixed bottom buttons ═══ */}
      {scrolled && !open && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-[60] safe-area-bottom">
          <div className="flex gap-0">
            <a
              href="/model-booking"
              className="flex-1 flex items-center justify-center gap-3 px-5 py-5 shadow-lg shadow-black/50"
              style={{ backgroundColor: G, color: '#000' }}
            >
              <span className="font-bold text-[14px] tracking-wide uppercase">Book Now</span>
            </a>
            <a
              href={`tel:+1${PHONE}`}
              className="flex items-center justify-center gap-2 px-5 py-5 bg-[#111] border-l border-white/10"
            >
              <Phone className="h-5 w-5" style={{ color: G }} />
              <span className="text-white/80 text-[12px] font-bold">Call</span>
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
