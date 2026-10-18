'use client';

import { useEffect } from 'react';

/** Warm the remaining roster files after the hero has painted. */
export default function RosterPreload({ srcs }: { srcs: string[] }) {
  useEffect(() => {
    const run = () => {
      srcs.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    };
    const idle = window.requestIdleCallback?.(run);
    const timer = idle == null ? window.setTimeout(run, 400) : undefined;
    return () => {
      if (idle != null) window.cancelIdleCallback?.(idle);
      if (timer != null) window.clearTimeout(timer);
    };
  }, [srcs]);

  return null;
}
