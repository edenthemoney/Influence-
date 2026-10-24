'use client';
/**
 * Site-wide premium polish (below-the-fold only; header/hero are never touched).
 * - tags sections that start below the first viewport with .lx (styling hooks in globals.css)
 * - scroll reveals (opacity/transform only => no layout shift)
 * - parallax on drone backgrounds [data-parallax]
 * - magnetic + glow CTAs, desktop cursor-follow gold light
 * All motion is off under prefers-reduced-motion; touch devices get no cursor/magnet.
 */
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function PolishFX() {
  const path = usePathname();
  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1024px)').matches;
    const vh = innerHeight;
    const offs: (() => void)[] = [];

    // 1. tag below-fold sections
    const secs = Array.from(document.querySelectorAll<HTMLElement>('main section, body > div section, footer'))
      .filter((s) => !s.closest('nav,header') && s.getBoundingClientRect().top + scrollY > vh * 0.95);
    secs.forEach((s) => s.classList.add('lx'));

    // 2. reveals: headings, cards, CTAs inside .lx that are currently off-screen
    if (!reduced && 'IntersectionObserver' in window) {
      const els = secs.flatMap((s) => Array.from(s.querySelectorAll<HTMLElement>('h2, h3, .lx-card, [data-rv]')))
        .filter((e) => e.getBoundingClientRect().top > vh && !e.closest('[data-norv]'));
      els.forEach((e) => e.classList.add('lx-rv'));
      const io = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('lx-in'); io.unobserve(en.target); } }), { rootMargin: '0px 0px -8% 0px' });
      els.forEach((e) => io.observe(e));
      offs.push(() => io.disconnect());
    }

    // 3. parallax for drone backgrounds (transform only, rAF-throttled, visible ones only)
    if (!reduced) {
      const px = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
      let raf = 0;
      const tick = () => { raf = 0; const h = innerHeight; for (const el of px) { const r = el.parentElement!.getBoundingClientRect(); if (r.bottom < 0 || r.top > h) continue; const k = (r.top + r.height / 2 - h / 2) / h; el.style.transform = `translate3d(0,${(k * -6).toFixed(2)}%,0) scale(1.14)`; } };
      const on = () => { if (!raf) raf = requestAnimationFrame(tick); };
      if (px.length) { tick(); addEventListener('scroll', on, { passive: true }); offs.push(() => removeEventListener('scroll', on)); }
    }

    // 4. magnetic CTAs + cursor light (desktop only)
    if (fine && !reduced) {
      const ctas = secs.flatMap((s) => Array.from(s.querySelectorAll<HTMLElement>('[data-magnet], a[style*="201, 169, 110"], a[style*="#c9a96e"], button[style*="#c9a96e"], .lx-cta')));
      ctas.forEach((b) => {
        b.classList.add('lx-mag');
        const mv = (e: PointerEvent) => { const r = b.getBoundingClientRect(); b.style.setProperty('--mx', `${((e.clientX - r.left - r.width / 2) * 0.18).toFixed(1)}px`); b.style.setProperty('--my', `${((e.clientY - r.top - r.height / 2) * 0.28).toFixed(1)}px`); };
        const lv = () => { b.style.setProperty('--mx', '0px'); b.style.setProperty('--my', '0px'); };
        b.addEventListener('pointermove', mv); b.addEventListener('pointerleave', lv);
        offs.push(() => { b.removeEventListener('pointermove', mv); b.removeEventListener('pointerleave', lv); });
      });
      const glow = document.createElement('div'); glow.className = 'lx-light'; document.body.appendChild(glow);
      let x = 0, y = 0, raf = 0;
      const mv = (e: PointerEvent) => { x = e.clientX; y = e.clientY; glow.style.opacity = '1'; if (!raf) raf = requestAnimationFrame(() => { raf = 0; glow.style.transform = `translate3d(${x - 300}px,${y - 300}px,0)`; }); };
      addEventListener('pointermove', mv, { passive: true });
      offs.push(() => { removeEventListener('pointermove', mv); glow.remove(); });
    }
    return () => offs.forEach((f) => f());
  }, [path]);
  return null;
}
