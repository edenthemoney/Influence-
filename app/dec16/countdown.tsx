'use client';

import { useEffect, useState } from 'react';
import { INFLUENCE_CONNECT } from '@/lib/dec16/influence-connect';

const START = new Date(INFLUENCE_CONNECT.startsAt).getTime();

function parts(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

export default function Countdown() {
  const [remaining, setRemaining] = useState<ReturnType<typeof parts> | null>(null);

  useEffect(() => {
    const tick = () => setRemaining(parts(START - Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const units: [string, number | null][] = [
    ['Days', remaining ? remaining.days : null],
    ['Hours', remaining ? remaining.hours : null],
    ['Min', remaining ? remaining.minutes : null],
    ['Sec', remaining ? remaining.seconds : null],
  ];

  return (
    <div>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {remaining
          ? `Starts in ${remaining.days} days, ${remaining.hours} hours, ${remaining.minutes} minutes.`
          : 'Countdown to Wednesday, December 16, 2026 at 4:00 PM Eastern.'}
      </p>
      <div className="grid grid-cols-4 divide-x divide-[#c9a96e]/30" aria-hidden="true">
        {units.map(([label, value]) => (
          <div key={label} className="px-1 py-1 text-center">
            <p className="font-display text-[34px] font-semibold leading-none tabular-nums text-[#f4efe6]">
              {typeof value === 'number' ? String(value).padStart(2, '0') : '—'}
            </p>
            <p className="mt-2 text-[12px] font-bold uppercase tracking-[0.2em] text-[#c9a96e]">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
