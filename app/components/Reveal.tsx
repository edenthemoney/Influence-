'use client';
import { useEffect } from 'react';

// Lightweight scroll-reveal: only for sections that start below the fold,
// so above-the-fold content (and LCP) is never hidden. No layout shift: opacity/transform only.
export default function Reveal() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>('main section, body > div section, article section, footer'))
      .filter((el) => el.getBoundingClientRect().top > window.innerHeight);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('rv-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    els.forEach((el) => { el.classList.add('rv'); io.observe(el); });
    return () => io.disconnect();
  }, []);
  return null;
}
