'use client';

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { CLIPS } from './clips';

const SLIDE_MS = 8500;
const HOLD_MS = 20000;

export type StagePhoneHandle = { goTo: (index: number) => void };

type Slate = { kicker: string; title: string; line: string };

type Props = {
  mode: 'reel' | 'single';
  size?: 'hero' | 'story';
  clipIndex?: number | null;
  slate?: Slate;
  active?: boolean;
  reduced?: boolean;
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

const StagePhone = forwardRef<StagePhoneHandle, Props>(function StagePhone(
  { mode, size = 'hero', clipIndex = 0, slate, active = false, reduced = false, onIndexChange },
  ref,
) {
  const screenRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reelIndex, setReelIndex] = useState(0);
  const [held, setHeld] = useState(false);
  const [armed, setArmed] = useState(false);
  const [needsTap, setNeedsTap] = useState(false);
  const indexRef = useRef(0);

  const showSlate = mode === 'single' && (clipIndex == null || clipIndex < 0);
  const index = showSlate ? 0 : mode === 'reel' ? reelIndex : Math.max(0, Math.min(CLIPS.length - 1, clipIndex ?? 0));
  const clip = CLIPS[index];

  useEffect(() => {
    indexRef.current = index;
    if (mode === 'reel') onIndexChange?.(index);
  }, [index, mode, onIndexChange]);

  useImperativeHandle(ref, () => ({
    goTo(next: number) {
      if (mode !== 'reel') return;
      setHeld(true);
      setReelIndex(Math.max(0, Math.min(CLIPS.length - 1, next)));
    },
  }));

  useEffect(() => {
    if (mode !== 'reel' || reduced || !active) return;
    const timer = window.setTimeout(() => {
      setHeld(false);
      setReelIndex((current) => (current + 1) % CLIPS.length);
    }, held ? HOLD_MS : SLIDE_MS);
    return () => window.clearTimeout(timer);
  }, [mode, reduced, active, held, reelIndex]);

  useEffect(() => {
    if (mode !== 'reel') return;
    const el = screenRef.current;
    const tilt = tiltRef.current;
    if (!el || !tilt) return;
    let startX = 0;
    let startY = 0;
    let lock: 'x' | 'y' | null = null;
    let activePointer: number | null = null;
    let drag = 0;

    const yaw = (dx: number) => {
      if (reduced) return;
      const amount = Math.max(-10, Math.min(10, dx / 14));
      tilt.style.setProperty('--ix-yaw', `${amount}deg`);
    };

    const down = (event: PointerEvent) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      activePointer = event.pointerId;
      startX = event.clientX;
      startY = event.clientY;
      lock = null;
      drag = 0;
    };

    const move = (event: PointerEvent) => {
      if (activePointer !== event.pointerId) return;
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;
      if (!lock && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) {
        lock = Math.abs(dx) > Math.abs(dy) * 1.15 ? 'x' : 'y';
      }
      if (lock !== 'x') return;
      event.preventDefault();
      const atStart = indexRef.current === 0 && dx > 0;
      const atEnd = indexRef.current === CLIPS.length - 1 && dx < 0;
      drag = atStart || atEnd ? dx * 0.35 : dx;
      yaw(drag);
    };

    const up = (event: PointerEvent) => {
      if (activePointer !== event.pointerId) return;
      activePointer = null;
      if (lock === 'x') {
        setHeld(true);
        if (drag <= -48) setReelIndex((current) => Math.min(CLIPS.length - 1, current + 1));
        else if (drag >= 48) setReelIndex((current) => Math.max(0, current - 1));
      }
      lock = null;
      drag = 0;
      tilt.style.setProperty('--ix-yaw', '0deg');
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
  }, [mode, reduced]);

  const shouldPlay = active && !showSlate && (!reduced || armed);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    silence(video);
    if (!shouldPlay) {
      video.pause();
      return;
    }
    const play = () => {
      silence(video);
      const pending = video.play();
      if (pending) pending.then(() => setNeedsTap(false)).catch(() => setNeedsTap(true));
    };
    if (video.readyState >= 2) play();
    else video.addEventListener('canplay', play, { once: true });
    return () => {
      video.removeEventListener('canplay', play);
      video.pause();
    };
  }, [shouldPlay, clip.id]);

  const showPlay = !showSlate && (needsTap || (reduced && !armed));
  const poster = showSlate ? null : clip.poster;

  return (
    <div className={`ix-stage ix-stage-${size}`}>
      <div ref={tiltRef} className="ix-tilt">
        <div className="ix-glow" aria-hidden />
        <div className="ix-device">
          <span className="ix-key" style={{ left: -2, top: '18%', height: 22 }} aria-hidden />
          <span className="ix-key" style={{ left: -2, top: '26%', height: 40 }} aria-hidden />
          <span className="ix-key" style={{ left: -2, top: '34%', height: 40 }} aria-hidden />
          <span className="ix-key" style={{ right: -2, top: '27%', height: 64 }} aria-hidden />
          <div className="ix-device-frame">
            <div className="ix-device-bezel">
              <div
                ref={screenRef}
                className="ix-device-screen"
                role="region"
                aria-roledescription={mode === 'reel' ? 'carousel' : undefined}
                aria-label={showSlate ? `${slate?.title ?? 'Title card'}. ${slate?.line ?? ''}` : clip.caption}
                tabIndex={mode === 'reel' ? 0 : undefined}
                onKeyDown={(event) => {
                  if (mode !== 'reel') return;
                  if (event.key === 'ArrowRight') {
                    event.preventDefault();
                    setHeld(true);
                    setReelIndex((current) => Math.min(CLIPS.length - 1, current + 1));
                  } else if (event.key === 'ArrowLeft') {
                    event.preventDefault();
                    setHeld(true);
                    setReelIndex((current) => Math.max(0, current - 1));
                  }
                }}
              >
                {showSlate ? (
                  <div className="ix-slate">
                    <p className="ix-slate-kicker">{slate?.kicker}</p>
                    <p className="ix-slate-title">{slate?.title}</p>
                    <p className="ix-slate-line">{slate?.line}</p>
                  </div>
                ) : (
                  <>
                    <img
                      src={clip.poster}
                      alt=""
                      width={720}
                      height={1280}
                      draggable={false}
                      className="absolute inset-0 h-full w-full object-cover"
                      fetchPriority={size === 'hero' && index === 0 ? 'high' : 'low'}
                      decoding="async"
                    />
                    {shouldPlay && (
                      <video
                        key={clip.id}
                        ref={videoRef}
                        src={clip.src}
                        poster={clip.poster}
                        muted
                        playsInline
                        loop
                        preload="auto"
                        controls={false}
                        disablePictureInPicture
                        disableRemotePlayback
                        aria-label={clip.caption}
                        className="absolute inset-0 h-full w-full object-cover opacity-0"
                        onLoadedData={(event) => silence(event.currentTarget)}
                        onPlaying={(event) => {
                          event.currentTarget.style.opacity = '1';
                          setNeedsTap(false);
                          if (mode !== 'reel') return;
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
                  </>
                )}
                <div className="ix-island" aria-hidden />
                <div className="ix-glare" aria-hidden />
                <div className="ix-homebar" aria-hidden />
                {showPlay && (
                  <button
                    type="button"
                    className="ix-play"
                    onPointerDown={(event) => event.stopPropagation()}
                    onClick={() => {
                      setArmed(true);
                      setNeedsTap(false);
                    }}
                  >
                    <span className="sr-only">Play {clip.venue} skit</span>
                    <span aria-hidden className="ix-play-icon" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ix-reflect" aria-hidden>
        {poster ? (
          <img src={poster} alt="" width={720} height={400} draggable={false} />
        ) : (
          <div className="ix-reflect-slate" />
        )}
      </div>
      {mode === 'reel' && (
        <div className="ix-ticks" role="tablist" aria-label="Skits">
          {CLIPS.map((item, itemIndex) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={itemIndex === index}
              aria-label={`${item.venue}. ${item.caption}`}
              onClick={() => {
                setHeld(true);
                setReelIndex(itemIndex);
              }}
            >
              <span className={itemIndex === index ? 'is-on' : ''} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
});

export default StagePhone;
