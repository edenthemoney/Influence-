'use client';

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { CLIPS } from './clips';

const SLIDE_MS = 8500;
const HOLD_MS = 20000;
const SLIDE_FRACTION = 100 / CLIPS.length;

export type SkitPhoneHandle = { goTo: (index: number) => void };

type Props = {
  onIndexChange?: (index: number) => void;
};

function silence(video: HTMLVideoElement) {
  video.muted = true;
  video.defaultMuted = true;
  video.volume = 0;
  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', 'true');
}

const SkitPhone = forwardRef<SkitPhoneHandle, Props>(function SkitPhone({ onIndexChange }, ref) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const dragRef = useRef(0);
  const [index, setIndex] = useState(0);
  const [drag, setDrag] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [held, setHeld] = useState(false);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [armed, setArmed] = useState(false);
  const [needsTap, setNeedsTap] = useState(false);
  const [instant, setInstant] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    indexRef.current = index;
    onIndexChange?.(index);
  }, [index, onIndexChange]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.45 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useImperativeHandle(ref, () => ({
    goTo(next: number) {
      const clamped = Math.max(0, Math.min(CLIPS.length - 1, next));
      setHeld(true);
      setDrag(0);
      dragRef.current = 0;
      setIndex(clamped);
    },
  }));

  useEffect(() => {
    if (reduced || !inView || dragging) return;
    const delay = held ? HOLD_MS : SLIDE_MS;
    const timer = window.setTimeout(() => {
      setHeld(false);
      setDrag(0);
      dragRef.current = 0;
      if (indexRef.current === CLIPS.length - 1) setInstant(true);
      setIndex((current) => (current + 1) % CLIPS.length);
    }, delay);
    return () => window.clearTimeout(timer);
  }, [index, held, reduced, inView, dragging]);

  useEffect(() => {
    if (!instant) return;
    const frame = requestAnimationFrame(() => setInstant(false));
    return () => cancelAnimationFrame(frame);
  }, [instant, index]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    silence(video);
    if (!inView || (reduced && !armed)) {
      video.pause();
      return;
    }
    const play = () => {
      silence(video);
      const pending = video.play();
      if (pending) {
        pending.then(() => setNeedsTap(false)).catch(() => setNeedsTap(true));
      }
    };
    if (video.readyState >= 2) play();
    else video.addEventListener('canplay', play, { once: true });
    return () => video.removeEventListener('canplay', play);
  }, [index, inView, reduced, armed]);

  useEffect(() => {
    const onHide = () => {
      const video = videoRef.current;
      if (!video) return;
      if (document.hidden) video.pause();
    };
    document.addEventListener('visibilitychange', onHide);
    return () => document.removeEventListener('visibilitychange', onHide);
  }, []);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    let startX = 0;
    let startY = 0;
    let lock: 'x' | 'y' | null = null;
    let activePointer: number | null = null;

    const down = (event: PointerEvent) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      activePointer = event.pointerId;
      startX = event.clientX;
      startY = event.clientY;
      lock = null;
      dragRef.current = 0;
    };

    const move = (event: PointerEvent) => {
      if (activePointer !== event.pointerId) return;
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;
      if (!lock && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) {
        lock = Math.abs(dx) > Math.abs(dy) * 1.15 ? 'x' : 'y';
        if (lock === 'x') setDragging(true);
      }
      if (lock !== 'x') return;
      event.preventDefault();
      const atStart = indexRef.current === 0 && dx > 0;
      const atEnd = indexRef.current === CLIPS.length - 1 && dx < 0;
      const next = atStart || atEnd ? dx * 0.28 : dx;
      dragRef.current = next;
      setDrag(next);
    };

    const up = (event: PointerEvent) => {
      if (activePointer !== event.pointerId) return;
      activePointer = null;
      if (lock === 'x') {
        const dx = dragRef.current;
        const threshold = 48;
        setHeld(true);
        if (dx <= -threshold) setIndex((current) => Math.min(CLIPS.length - 1, current + 1));
        else if (dx >= threshold) setIndex((current) => Math.max(0, current - 1));
      }
      lock = null;
      dragRef.current = 0;
      setDrag(0);
      setDragging(false);
    };

    el.addEventListener('pointerdown', down);
    el.addEventListener('pointermove', move, { passive: false });
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
    return () => {
      el.removeEventListener('pointerdown', down);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerup', up);
      el.removeEventListener('pointercancel', up);
    };
  }, []);

  const step = (direction: number) => {
    setHeld(true);
    setDrag(0);
    dragRef.current = 0;
    setIndex((current) => Math.max(0, Math.min(CLIPS.length - 1, current + direction)));
  };

  const clip = CLIPS[index];
  const showPlay = needsTap || (reduced && !armed);
  const transform = `translate3d(calc(${-index * SLIDE_FRACTION}% + ${drag}px), 0, 0)`;

  return (
    <div className="mx-auto w-full max-w-[360px]">
      <div className="ix-device relative mx-auto">
        <span className="ix-key" style={{ left: -2, top: '18%', height: 26 }} aria-hidden />
        <span className="ix-key" style={{ left: -2, top: '26%', height: 46 }} aria-hidden />
        <span className="ix-key" style={{ left: -2, top: '34%', height: 46 }} aria-hidden />
        <span className="ix-key" style={{ right: -2, top: '28%', height: 70, borderRadius: 2 }} aria-hidden />
        <div className="ix-device-frame">
          <div className="ix-device-bezel">
            <div
              ref={viewportRef}
              className="ix-device-screen"
              role="region"
              aria-roledescription="carousel"
              aria-label="Venue skits by Deseray Marie. Silent. Swipe sideways to change clips."
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === 'ArrowRight') {
                  event.preventDefault();
                  step(1);
                } else if (event.key === 'ArrowLeft') {
                  event.preventDefault();
                  step(-1);
                }
              }}
            >
              <div
                className="ix-device-track"
                style={{
                  width: `${CLIPS.length * 100}%`,
                  transform,
                  transition: dragging || reduced || instant ? 'none' : 'transform 0.62s cubic-bezier(0.22, 0.8, 0.24, 1)',
                }}
              >
                {CLIPS.map((item, itemIndex) => (
                  <div
                    key={item.id}
                    className="relative h-full shrink-0"
                    style={{ width: `${SLIDE_FRACTION}%` }}
                    aria-hidden={itemIndex !== index}
                  >
                    <img
                      src={item.poster}
                      alt=""
                      draggable={false}
                      width={720}
                      height={1280}
                      className="absolute inset-0 h-full w-full object-cover"
                      fetchPriority={itemIndex === 0 ? 'high' : 'low'}
                      decoding="async"
                    />
                    {itemIndex === index && inView && (!reduced || armed) && (
                      <video
                        ref={videoRef}
                        src={item.src}
                        poster={item.poster}
                        muted
                        playsInline
                        loop
                        preload="auto"
                        controls={false}
                        disablePictureInPicture
                        disableRemotePlayback
                        aria-label={item.caption}
                        className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500"
                        onLoadedData={(event) => silence(event.currentTarget)}
                        onPlaying={(event) => {
                          event.currentTarget.style.opacity = '1';
                          setNeedsTap(false);
                          const next = CLIPS[(index + 1) % CLIPS.length];
                          const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
                          const slow = connection?.saveData || connection?.effectiveType === '2g' || connection?.effectiveType === 'slow-2g';
                          if (slow || document.head.querySelector(`link[data-skit="${next.id}"]`)) return;
                          const link = document.createElement('link');
                          link.rel = 'prefetch';
                          link.as = 'video';
                          link.href = next.src;
                          link.dataset.skit = next.id;
                          document.head.appendChild(link);
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="ix-island" aria-hidden />
              <div className="ix-glare" aria-hidden />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-t from-black/75 to-transparent" />
              <p className="pointer-events-none absolute inset-x-4 bottom-5 z-10 text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-[#f3e6c4]">
                {clip.place}
              </p>
              <div className="ix-homebar" aria-hidden />
              {showPlay && (
                <button
                  type="button"
                  className="absolute left-1/2 top-1/2 z-30 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#f3e6c4]/80 bg-black/45 text-[#f3e6c4]"
                  onPointerDown={(event) => event.stopPropagation()}
                  onClick={() => {
                    setArmed(true);
                    setNeedsTap(false);
                  }}
                >
                  <span className="sr-only">Play {clip.venue} skit</span>
                  <span aria-hidden className="ml-1 h-0 w-0 border-y-[7px] border-l-[11px] border-y-transparent border-l-[#f3e6c4]" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <p className="mt-3 text-center font-display text-[26px] italic leading-none text-[#f6f1e7]">{clip.venue}</p>
      <p className="mx-auto mt-1 max-w-[280px] text-center text-[13px] leading-relaxed text-[#f6f1e7]/70" aria-live="polite">
        {clip.caption}
      </p>
      <p className="mt-1 text-center text-[10px] uppercase tracking-[0.28em] text-[#f6f1e7]/45">Silent</p>

      <div className="mt-2 flex items-center justify-center gap-2">
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center text-[#f3e6c4] disabled:opacity-30"
          aria-label="Previous skit"
          disabled={index === 0}
          onClick={() => step(-1)}
        >
          <span aria-hidden className="text-lg">‹</span>
        </button>
        <div className="flex items-center gap-1" role="tablist" aria-label="Skits">
          {CLIPS.map((item, itemIndex) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={itemIndex === index}
              aria-label={`${item.venue}. ${item.caption}`}
              className="flex h-11 w-9 items-center justify-center"
              onClick={() => {
                setHeld(true);
                setIndex(itemIndex);
              }}
            >
              <span className="relative block h-px w-7 bg-white/25">
                {itemIndex === index && !reduced && !held && inView ? (
                  <span key={`${item.id}-${index}-${held}`} className="ix-progress" />
                ) : (
                  <span
                    className="block h-px bg-[#f3e6c4]"
                    style={{ width: itemIndex === index || itemIndex < index ? '100%' : '0%' }}
                  />
                )}
              </span>
            </button>
          ))}
        </div>
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center text-[#f3e6c4] disabled:opacity-30"
          aria-label="Next skit"
          disabled={index === CLIPS.length - 1}
          onClick={() => step(1)}
        >
          <span aria-hidden className="text-lg">›</span>
        </button>
      </div>
    </div>
  );
});

export default SkitPhone;
