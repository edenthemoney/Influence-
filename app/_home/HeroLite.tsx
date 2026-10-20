'use client';

import { useEffect, useRef } from 'react';
import { halt, hold, kick, prime, watch } from './iosVideo';

const V = 'v=6'; // cache-bust: new mobile hero files (hero-m2*)
// The <video> is written as raw HTML so the server-rendered markup already carries
// muted / playsinline / webkit-playsinline / autoplay / loop (React drops `muted` from SSR HTML),
// and the sources are chosen by the browser at parse time (no src swap after hydration).
const CLS = 'absolute inset-0 h-full w-full translate-y-32 object-cover object-top md:translate-y-20';
// Motion layer under the video: animated WebP (runs in Low Power Mode). The video starts hidden
// (data-refused) and is revealed only after currentTime is seen advancing.
const HTML = `<picture><source media="(min-width: 768px)" srcset="/images/stage/hero-d-anim.webp?${V}"><img src="/images/stage/hero-m2-anim.webp?${V}" alt="" aria-hidden="true" decoding="async" fetchpriority="high" class="${CLS}"></picture><video data-refused="true" muted autoplay loop playsinline webkit-playsinline preload="auto" disablepictureinpicture disableremoteplayback aria-hidden="true"
  poster="/images/stage/hero-m2-poster.webp?${V}"
  class="${CLS}">
  <source media="(min-width: 768px)" src="/images/stage/hero-d.mp4?${V}" type="video/mp4">
  <source src="/images/stage/hero-m2-hevc.mp4?${V}" type='video/mp4; codecs="hvc1"'>
  <source src="/images/stage/hero-m2.mp4?${V}" type="video/mp4">
</video>`;

/** Hero loop for /preview/home-e: portrait HQ encode on phones, 720p on desktop; paused off screen; iOS-safe autoplay. */
export default function HeroLite() {
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const v = box.current?.querySelector('video');
    if (!v) return;
    prime(v);
    const desk = window.matchMedia('(min-width: 768px)').matches;
    if (desk) v.poster = '/images/stage/hero-d-poster.webp';
    v.dataset.anim = `/images/stage/${desk ? 'hero-d' : 'hero-m2'}-anim.webp?${V}`; // motion fallback (animates in Low Power Mode)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { halt(v); return; }
    hold(v); // poster + Ken Burns until frames advance
    const unwatch = watch(v);
    let visible = true;
    const sync = () => { if (visible && !document.hidden) kick(v); else halt(v); };
    const io = 'IntersectionObserver' in window ? new IntersectionObserver(([e]) => { visible = e.isIntersecting && e.intersectionRatio > 0.15; sync(); }, { threshold: [0, 0.15, 0.5] }) : null;
    io?.observe(v);
    const touch = () => { if (visible && v.paused) kick(v); };
    v.addEventListener('loadedmetadata', sync);
    v.addEventListener('canplay', sync, { once: true });
    document.addEventListener('visibilitychange', sync);
    window.addEventListener('pageshow', sync);
    window.addEventListener('touchend', touch, { passive: true });
    sync();
    return () => {
      unwatch();
      io?.disconnect();
      v.removeEventListener('loadedmetadata', sync);
      document.removeEventListener('visibilitychange', sync);
      window.removeEventListener('pageshow', sync);
      window.removeEventListener('touchend', touch);
    };
  }, []);
  return <div ref={box} className="contents" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: HTML }} />;
}
