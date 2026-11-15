import type { Metadata } from 'next';
import ShareTools from './share-tools';
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
    <>
      <main className="mx-auto w-full max-w-[440px] px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[max(1.25rem,env(safe-area-inset-top))]">
        <h1 className="font-display text-[40px] font-bold leading-[1.02] text-[#f4efe6]">Share to your<br /><span className="text-[#c9a96e]">IG story</span></h1>
        <ShareTools />
        <ol className="mt-5 grid gap-3">
          {steps.map(([t, d], i) => (
            <li key={t} className="flex gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#c9a96e] text-[17px] font-black text-[#0b0a08]">{i + 1}</span>
              <span><span className="block text-[17px] font-bold text-[#f4efe6]">{t}</span><span className="block text-[15px] leading-snug text-[#f4efe6]/75">{d}</span></span>
            </li>
          ))}
        </ol>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/dec16-assets/dec16-story-flyer.png" width={1080} height={1920} alt="Dec 16 Influence Connect story flyer. Press and hold, then Save." className="mt-8 w-full border border-[#c9a96e]/50" style={{ WebkitTouchCallout: 'default' }} />
      </main>
    </>
  );
}
