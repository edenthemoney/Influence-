'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import s from './Reveal.module.css';

/**
 * Wraps content that should rise into view once. Visible by default (no JS, reduced motion,
 * or already on screen at load); only content still below the fold is armed for the entrance.
 */
export function Reveal({ children, kind = 'rise', className = '' }: { children: ReactNode; kind?: 'rise' | 'fade'; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.9) return; // already on screen: never hide it
    setArmed(true);
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${kind === 'rise' ? s.rise : s.fade} ${className}`} data-armed={armed} data-in={shown}>
      {children}
    </div>
  );
}

export function ScrollCue({ href = '#reveal', label = 'Scroll', still = false }: { href?: string; label?: string; still?: boolean }) {
  return (
    <a href={href} className="inline-flex min-h-11 flex-col items-center justify-center gap-1 px-3 text-[12px] font-semibold uppercase tracking-[0.24em] text-white/85" aria-label="Scroll to see the feed">
      <span>{label}</span>
      <svg className={still ? undefined : s.cue} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c9a96e" strokeWidth="2" aria-hidden><path d="m6 9 6 6 6-6" /></svg>
    </a>
  );
}
