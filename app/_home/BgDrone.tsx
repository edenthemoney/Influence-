'use client';
/**
 * Subtle Pexels drone background (night Miami, black/gold grade baked in).
 * Lazy: no video bytes until within 300px of view; plays only while visible;
 * prefers-reduced-motion / Save-Data => static poster only. Credits: docs/pexels-drone-credits.md
 */
import { useEffect, useRef, useState } from 'react';

const V = 'v=12';
type Props = { d: string; m?: string; opacity?: number };

export default function BgDrone({ d, m, opacity = 0.32 }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const [name, setName] = useState<string | null>(null);
  const [load, setLoad] = useState(false);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 767px)').matches;
    setName(mobile ? `${m ?? d}-m` : `${d}-d`);
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || nav.connection?.saveData) { setStill(true); return; }
    const el = wrap.current;
    if (!el || !('IntersectionObserver' in window)) { setLoad(true); return; }
    const near = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setLoad(true); near.disconnect(); } }, { rootMargin: '300px 0px' });
    near.observe(el);
    const vis = new IntersectionObserver(([e]) => {
      const v = vid.current; if (!v) return;
      if (e.isIntersecting) v.play().catch(() => {}); else v.pause();
    }, { threshold: 0.05 });
    vis.observe(el);
    return () => { near.disconnect(); vis.disconnect(); };
  }, [d, m]);

  const base = name ? `/videos/bg/${name}` : null;
  return (
    <div ref={wrap} aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {base && (
        <div className="absolute inset-0" style={{ opacity }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${base}.jpg?${V}`} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
          {load && !still && (
            <video ref={vid} className="absolute inset-0 h-full w-full object-cover" muted loop playsInline preload="none" autoPlay
              poster={`${base}.jpg?${V}`} onCanPlay={(e) => { const r = wrap.current?.getBoundingClientRect(); if (r && r.bottom > 0 && r.top < innerHeight) e.currentTarget.play().catch(() => {}); }}>
              <source src={`${base}.hevc.mp4?${V}`} type='video/mp4; codecs="hvc1"' />
              <source src={`${base}.mp4?${V}`} type="video/mp4" />
            </video>
          )}
        </div>
      )}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,#000 0%,rgba(0,0,0,.55) 22%,rgba(0,0,0,.6) 78%,#000 100%)' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(120% 80% at 50% 50%,rgba(201,169,110,.07),transparent 70%)', mixBlendMode: 'screen' }} />
    </div>
  );
}
