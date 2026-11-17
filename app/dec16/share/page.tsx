import type { Metadata } from 'next';
import ShareTools from './share-tools';
import { INFLUENCE_CONNECT } from '@/lib/dec16/influence-connect';
import { SHORT_LINK } from '@/lib/dec16/payment-link';

export const metadata: Metadata = {
  title: { absolute: 'Share the Dec 16 flyer | Influence' },
  robots: { index: false, follow: false },
};

const steps = [
  ['Tap Share to my story', 'The event link is copied for your Instagram Link sticker.'],
  ['Pick Instagram, then Story', 'The flyer is already in the share sheet (or save it below).'],
  ['Sticker → Link → Paste', `Paste ${SHORT_LINK}. Tap Done and share.`],
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
      <p className="mt-4 border border-[#c9a96e]/40 px-4 py-3 text-[15px] leading-snug text-[#f4efe6]/90">
        <span className="font-bold text-[#c9a96e]">Business owners $75</span>
        {' — gift bag + raffle · '}
        Ladies &amp; brand ambassadors RSVP free.
      </p>
      <p className="mt-5 break-all font-display text-[20px] font-medium text-[#c9a96e]">{SHORT_LINK}</p>

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
        src="/dec16-assets/dec16-story-flyer.jpg"
        width={1080}
        height={1920}
        alt="Dec 16 Influence Connect Instagram story flyer — December 16, Serena Pastificio, Business Owners $75, Ladies RSVP free."
        className="mt-10 w-full border border-[#c9a96e]/45"
        style={{ WebkitTouchCallout: 'default' }}
      />
      <p className="mt-3 text-center text-[14px] text-[#f4efe6]/65">
        Built for Instagram Stories · press &amp; hold to save · $75 on the art
      </p>
    </main>
  );
}
