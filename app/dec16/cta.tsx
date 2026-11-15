'use client';
import { useEffect, useState } from 'react';
import { PAYMENT_LINK_URL } from '@/lib/dec16/payment-link';
import ShareButton from './share-button';

const gold = 'flex min-h-14 touch-manipulation items-center justify-center bg-[#c9a96e] px-3 text-center text-[15px] font-black uppercase tracking-[0.12em] text-[#0b0a08]';

export function HeroButtons() {
  return (
    <div id="hero-cta" className="px-5 pb-4">
      <a href={PAYMENT_LINK_URL} className={`${gold} w-full min-h-[60px] text-[17px]`}>Get tickets · $25&nbsp;&nbsp;→</a>
      <ShareButton className="mt-3" />
    </div>
  );
}

export function StickyBar() {
  const [pastHero, setPastHero] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('hero-cta');
    const form = document.getElementById('rsvp');
    const io1 = new IntersectionObserver(([e]) => setPastHero(!e.isIntersecting && e.boundingClientRect.top < 0));
    const io2 = new IntersectionObserver(([e]) => setFormVisible(e.isIntersecting), { rootMargin: '0px 0px -10% 0px' });
    if (hero) io1.observe(hero);
    if (form) io2.observe(form);
    const fin = (e: FocusEvent) => setFocused(!!(e.target as HTMLElement)?.closest?.('input,textarea,select'));
    const fout = () => setFocused(false);
    document.addEventListener('focusin', fin);
    document.addEventListener('focusout', fout);
    return () => { io1.disconnect(); io2.disconnect(); document.removeEventListener('focusin', fin); document.removeEventListener('focusout', fout); };
  }, []);

  const show = pastHero && !formVisible && !focused;
  return (
    <div
      data-testid="sticky-bar"
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-[#c9a96e]/40 bg-black/95 px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-300 md:hidden ${show ? 'translate-y-0' : 'pointer-events-none translate-y-full'}`}
    >
      <div className="mx-auto max-w-[440px]">
        <a href={PAYMENT_LINK_URL} tabIndex={show ? 0 : -1} className={`${gold} w-full`}>Get tickets · $25&nbsp;&nbsp;→</a>
      </div>
    </div>
  );
}
