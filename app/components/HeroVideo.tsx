'use client';

import { useEffect, useRef } from 'react';

// Same markup as production deploy 6ab42989 (object-center + scale/translate).
// The effect only nudges play() if iOS left a muted inline video paused; it never swaps sources.
export default function HeroVideo() {
  const desk = useRef<HTMLVideoElement>(null);
  const mob = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    for (const v of [desk.current, mob.current]) {
      if (!v) continue;
      v.muted = true;
      v.defaultMuted = true;
      if (v.paused) v.play().catch(() => {});
    }
  }, []);
  return (
    <>
      {/* Desktop: original hero reel */}
      <video
        ref={desk}
        autoPlay
        muted
        loop
        playsInline
        poster="/images/Des/des-21.jpg"
        className="absolute inset-0 w-full h-full object-cover object-center hidden md:block"
        style={{ transform: 'scale(1.1) translateY(6%)' }}
      >
        <source src="/videos/drone-clip-mid.mp4" type="video/mp4" />
      </video>

      {/* Mobile: drone clip mid */}
      <video
        ref={mob}
        autoPlay
        muted
        loop
        playsInline
        poster="/images/Des/des-21.jpg"
        className="absolute inset-0 w-full h-full object-cover object-center md:hidden"
        style={{ transform: 'scale(1.1) translateY(6%)' }}
      >
        <source src="/videos/drone-clip-mid.mp4" type="video/mp4" />
      </video>
    </>
  );
}
