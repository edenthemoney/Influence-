import type { Metadata } from 'next';
import ShareTools from './share-tools';
import { INFLUENCE_CONNECT } from '@/lib/dec16/influence-connect';

export const metadata: Metadata = {
  title: { absolute: 'Share the Dec 16 flyer | Influence' },
  robots: { index: false, follow: false },
};

const steps = [
  ['Tap the gold button', 'Your ticket link gets copied for you.'],
  ['Pick Instagram, then Story', 'The flyer is already in it.'],
  ['Sticker button, Link, Paste', 'Tap Done and share. That\u2019s it.'],
];

export default function SharePage() {
  return (
    <main className="mx-auto w-full max-w-[440px] px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[max(1.25rem,env(safe-area-inset-top))]">
      <p className="font-display text-[22px] font-semibold tracking-[0.28em] text-[#c9a96e]">INFLUENCE</p>
      <p className="ic-eyebrow mt-4">Influence Connect</p>
      <h1 className="mt-3 font-display text-[42px] font-semibold leading-[1.02] text-[#f4efe6]">
        Share the private
        <br />
        <span className="text-[#c9a96e]">invitation</span>
      </h1>
      <p className="mt-4 text-[16px] leading-relaxed text-[#f4efe6]/80">
        {INFLUENCE_CONNECT.dateLong} · {INFLUENCE_CONNECT.time}
        <br />
        {INFLUENCE_CONNECT.venue}, Boca Raton
      </p>

      <ShareTools />

      <ol className="mt-8 grid gap-4">
        {steps.map(([t, d], i) => (
          <li key={t} className="flex gap-3 border-t border-[#c9a96e]/25 pt-4">
            <span className="font-display text-[28px] font-medium leading-none text-[#c9a96e]">{i + 1}</span>
            <span>
              <span className="block text-[17px] font-bold text-[#f4efe6]">{t}</span>
              <span className="mt-1 block text-[15px] leading-snug text-[#f4efe6]/75">{d}</span>
            </span>
          </li>
        ))}
      </ol>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/dec16-assets/dec16-story-flyer.png"
        width={1080}
        height={1920}
        alt="Dec 16 Influence Connect story flyer. Press and hold, then Save."
        className="mt-10 w-full border border-[#c9a96e]/45"
        style={{ WebkitTouchCallout: 'default' }}
      />
    </main>
  );
}
