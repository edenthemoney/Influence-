import type { Metadata } from 'next';
import ShareTools from './share-tools';
export const metadata: Metadata = {
  title: { absolute: 'Share the Nov 18 flyer | Influence' },
  robots: { index: false, follow: false },
};
const steps = [
  ['Save the flyer', 'Press and hold the flyer below, then tap Save to Photos.'],
  ['Open your IG story', 'Tap Open Instagram, then pick the flyer from your photos.'],
  ['Add a Link sticker', 'Tap Copy ticket link, then the sticker icon, choose Link and paste.'],
];
export default function SharePage() {
  return (
    <>
      <main className="mx-auto w-full max-w-[440px] px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[max(1.25rem,env(safe-area-inset-top))]">
        <h1 className="font-display text-[40px] font-bold leading-[1.02] text-[#f4efe6]">Share to your<br /><span className="text-[#c9a96e]">IG story</span></h1>
        <ol className="mt-5 grid gap-3">
          {steps.map(([t, d], i) => (
            <li key={t} className="flex gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#c9a96e] text-[17px] font-black text-[#0b0a08]">{i + 1}</span>
              <span><span className="block text-[17px] font-bold text-[#f4efe6]">{t}</span><span className="block text-[15px] leading-snug text-[#f4efe6]/75">{d}</span></span>
            </li>
          ))}
        </ol>
        <ShareTools />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/nov18-assets/nov18-story-flyer.png" width={1080} height={1920} alt="Nov 18 Influence Connect story flyer. Press and hold to save." className="mt-8 w-full border border-[#c9a96e]/50" style={{ WebkitTouchCallout: 'default' }} />
      </main>
    </>
  );
}
