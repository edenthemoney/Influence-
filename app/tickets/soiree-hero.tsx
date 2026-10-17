'use client';

import { useEffect, useState } from 'react';
import { INFLUENCE_CONNECT } from '@/lib/influence-connect';

const START = new Date(INFLUENCE_CONNECT.startsAt).getTime();

const PARTICLES = [
  { left: '12%', top: '16%', size: 3, delay: '0s', duration: '7.5s' },
  { left: '78%', top: '12%', size: 2, delay: '1.2s', duration: '9s' },
  { left: '86%', top: '38%', size: 4, delay: '0.4s', duration: '8s' },
  { left: '8%', top: '46%', size: 2, delay: '2s', duration: '10s' },
  { left: '64%', top: '22%', size: 3, delay: '1.6s', duration: '7s' },
  { left: '28%', top: '30%', size: 2, delay: '0.8s', duration: '11s' },
  { left: '48%', top: '8%', size: 2, delay: '2.4s', duration: '8.5s' },
  { left: '92%', top: '62%', size: 3, delay: '1s', duration: '9.5s' },
  { left: '18%', top: '68%', size: 2, delay: '1.8s', duration: '8s' },
  { left: '56%', top: '58%', size: 3, delay: '0.2s', duration: '10.5s' },
  { left: '36%', top: '78%', size: 2, delay: '2.8s', duration: '7.8s' },
  { left: '72%', top: '74%', size: 2, delay: '1.4s', duration: '9.2s' },
];

function parts(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

export default function SoireeHero() {
  const [remaining, setRemaining] = useState<ReturnType<typeof parts> | null>(null);

  useEffect(() => {
    const tick = () => setRemaining(parts(START - Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const units = remaining
    ? [
        ['Days', remaining.days],
        ['Hours', remaining.hours],
        ['Min', remaining.minutes],
        ['Sec', remaining.seconds],
      ]
    : [
        ['Days', null],
        ['Hours', null],
        ['Min', null],
        ['Sec', null],
      ];

  return (
    <header className="soiree-hero px-5 pb-8 pt-7">
      {PARTICLES.map((particle) => (
        <span
          key={`${particle.left}-${particle.top}`}
          className="gold-particle"
          aria-hidden="true"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
          }}
        />
      ))}
      <p className="relative text-[11px] font-bold uppercase tracking-[0.42em] text-[#c8a95a]">Influence</p>
      <p className="relative mt-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#f7f1e4]/70">Presents</p>
      <h1 className="gold-shimmer relative mt-2 font-display text-[52px] font-medium leading-[0.88] sm:text-[60px]">
        Influence
        <br />
        Connect
      </h1>
      <p className="relative mt-4 max-w-[18rem] font-display text-[26px] italic leading-tight text-[#e6d3a1]">
        {INFLUENCE_CONNECT.tagline}
      </p>
      <p className="relative mt-3 text-[12px] font-semibold uppercase tracking-[0.22em] text-[#c8a95a]">Hosted by</p>
      <p className="relative font-display text-[28px] leading-none text-[#f7f1e4]">{INFLUENCE_CONNECT.host}</p>
      <p className="relative mt-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-[#f3e5ab]">
        {INFLUENCE_CONNECT.theme}
      </p>
      <p className="relative mt-1 text-[15px] text-[#f7f1e4]">{INFLUENCE_CONNECT.dressCode}</p>

      <div className="relative mt-6 grid grid-cols-4 gap-2" aria-live="polite" aria-atomic="true">
        <p className="sr-only">
          {remaining
            ? `Starts in ${remaining.days} days, ${remaining.hours} hours, ${remaining.minutes} minutes, and ${remaining.seconds} seconds.`
            : 'Countdown to Wednesday, November 18, 2026 at 4:00 PM Eastern.'}
        </p>
        {units.map(([label, value]) => (
          <div key={String(label)} className="border border-[#c8a95a]/50 bg-black/40 px-1 py-3 text-center">
            <p className="font-display text-[28px] leading-none text-[#f7f1e4]">
              {typeof value === 'number' ? String(value).padStart(2, '0') : '—'}
            </p>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#e6d3a1]">{label}</p>
          </div>
        ))}
      </div>
      <p className="relative mt-2 text-center text-[12px] text-[#f7f1e4]/60">Wednesday, Nov 18, 2026 · 4:00 PM ET</p>

      <a
        href="#rsvp"
        className="relative mt-6 flex min-h-14 w-full touch-manipulation items-center justify-center bg-[#c8a95a] px-4 text-[14px] font-bold uppercase tracking-[0.16em] text-[#16140f]"
      >
        Get your tickets
      </a>
    </header>
  );
}
