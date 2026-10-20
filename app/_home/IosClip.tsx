'use client';

import { useLayoutEffect, useRef } from 'react';
import { fallback, halt, hold, kick, watch } from './iosVideo';

const V = 'v=5'; // cache-bust: short-GOP H.264 + HEVC re-encodes

/**
 * Phone-screen clip built imperatively so iOS sees muted/autoplay/playsinline BEFORE any source is
 * attached (React would attach src first). HEVC (hvc1) then H.264 <source>s; poster from the same crop.
 * Mounted only when its slide is active, then play() is called explicitly, and again on
 * loadeddata / canplay / tab return / first touch.
 */
export default function IosClip({ src, poster, className, onEl, active = true }: { src: string; poster: string; className?: string; onEl?: (v: HTMLVideoElement | null) => void; active?: boolean }) {
  const host = useRef<HTMLSpanElement>(null);
  const vid = useRef<HTMLVideoElement | null>(null);
  const act = useRef(active);
  act.current = active;
  useLayoutEffect(() => {
    const h = host.current;
    if (!h) return;
    const v = document.createElement('video');
    v.muted = true; v.defaultMuted = true; v.playsInline = true; v.loop = true; v.autoplay = true;
    for (const a of ['muted', 'playsinline', 'webkit-playsinline', 'autoplay', 'loop', 'disablepictureinpicture']) v.setAttribute(a, '');
    v.setAttribute('preload', 'auto');
    v.setAttribute('aria-hidden', 'true');
    v.poster = poster;
    if (className) v.className = className;
    const hevc = document.createElement('source');
    hevc.src = `${src.replace(/\.mp4$/, '-hevc.mp4')}?${V}`; hevc.type = 'video/mp4; codecs="hvc1"';
    const avc = document.createElement('source');
    avc.src = `${src}?${V}`; avc.type = 'video/mp4';
    v.append(hevc, avc);
    v.style.opacity = active ? '1' : '0';
    h.appendChild(v);
    vid.current = v;
    if (active) onEl?.(v);
    // Start covered by the sharp poster (Ken Burns); the video fades in only once frames advance,
    // so a refused (Low Power Mode) or stalled first clip never shows a frozen frame or play glyph.
    if (active) hold(v);
    const unwatch = watch(v);
    const go = () => { if (!document.hidden && act.current) kick(v); };
    v.addEventListener('loadeddata', go);
    v.addEventListener('canplay', go);
    document.addEventListener('visibilitychange', go);
    window.addEventListener('pageshow', go);
    window.addEventListener('touchstart', go, { passive: true });
    if (active) kick(v); else { v.dataset.want = 'pause'; v.load(); } // next slide: buffered, not playing
    return () => {
      unwatch();
      v.removeEventListener('loadeddata', go); v.removeEventListener('canplay', go);
      document.removeEventListener('visibilitychange', go); window.removeEventListener('pageshow', go);
      window.removeEventListener('touchstart', go);
      if (act.current) onEl?.(null);
      vid.current = null;
      halt(v);
      v.removeAttribute('src'); v.innerHTML = ''; v.load(); v.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, poster]);
  // Becoming the active slide: show it and call play() explicitly (iOS won't autoplay a clip that was hidden).
  useLayoutEffect(() => {
    const v = vid.current;
    if (!v) return;
    v.style.opacity = active ? '1' : '0';
    if (active) { onEl?.(v); hold(v); kick(v); } else { halt(v); delete v.dataset.refused; fallback(v, false); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);
  return <span ref={host} className="contents" />;
}
