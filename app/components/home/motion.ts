'use client';

import { useEffect, useState } from 'react';

export type MotionMode = 'pending' | 'reduce' | 'full';

export function useMotion(): MotionMode {
  const [mode, setMode] = useState<MotionMode>('pending');

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setMode(mq.matches ? 'reduce' : 'full');
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  return mode;
}
