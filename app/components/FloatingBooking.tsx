'use client';
import { useState, useEffect } from 'react';
import { X, Sparkles, Phone } from 'lucide-react';
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
              {/* Call + WhatsApp below widget */}
              <div className="mt-3 flex gap-2">
                <a
                  href={`tel:+1${PHONE}`}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 transition-all hover:opacity-90"
                  style={{ backgroundColor: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <Phone className="h-3.5 w-3.5" style={{ color: G }} />
                  <span className="text-white/60 text-[12px]">Call</span>
                </a>
                <a
                  href={`https://wa.me/1${PHONE}?text=Hi%2C%20I%27m%20interested%20in%20booking%20a%20model`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 transition-all hover:opacity-90"
                  style={{ backgroundColor: 'rgba(37,211,102,0.12)', border: '1px solid rgba(37,211,102,0.25)' }}
                >
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  <span className="text-[12px] font-semibold" style={{ color: '#25D366' }}>WhatsApp</span>
                </a>
              </div>
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
              href={`https://wa.me/1${PHONE}?text=Hi%2C%20I%27m%20interested%20in%20booking%20a%20model`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-5 bg-[#111] border-l border-white/10"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              <span className="text-white/70 text-[11px] font-bold">Chat</span>
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
