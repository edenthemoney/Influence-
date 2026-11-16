'use client';
import { useEffect, useState } from 'react';
import { PAYMENT_LINK_URL } from '@/lib/dec16/payment-link';

// Sticky bottom CTA. Progressive enhancement only: every ticket link also exists
// in the page itself, so nothing depends on this script running.
export function StickyBar() {
  const [pastHero, setPastHero] = useState(false);
  const [ticketsVisible, setTicketsVisible] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('hero-cta');
    const tickets = document.getElementById('tickets');
    const io1 = new IntersectionObserver(([e]) => setPastHero(!e.isIntersecting && e.boundingClientRect.top < 0));
    const io2 = new IntersectionObserver(([e]) => setTicketsVisible(e.isIntersecting), { rootMargin: '0px 0px -20% 0px' });
    if (hero) io1.observe(hero);
    if (tickets) io2.observe(tickets);
    const fin = (e: FocusEvent) => setFocused(!!(e.target as HTMLElement)?.closest?.('input,textarea,select'));
    const fout = () => setFocused(false);
    document.addEventListener('focusin', fin);
    document.addEventListener('focusout', fout);
    return () => { io1.disconnect(); io2.disconnect(); document.removeEventListener('focusin', fin); document.removeEventListener('focusout', fout); };
  }, []);

  const show = pastHero && !ticketsVisible && !focused;
  return (
    <div
      data-testid="sticky-bar"
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-[#c9a96e]/35 bg-black/90 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md transition-transform duration-300 motion-reduce:transition-none ${show ? 'translate-y-0' : 'pointer-events-none translate-y-full'}`}
    >
      <div className="mx-auto flex max-w-[560px] items-center gap-4">
        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate text-[15px] font-bold text-[#f4efe6]">Wed Dec 16 · 4–7 PM</p>
          <p className="truncate text-[13px] text-[#f4efe6]/75">Serena · Boca Raton</p>
        </div>
        <a href={PAYMENT_LINK_URL} tabIndex={show ? 0 : -1} className="ic-btn-gold shrink-0 !min-h-[52px] !px-5 !text-[14px]">Entry · $75 →</a>
      </div>
    </div>
  );
}
