'use client';
import { SHARE_URL } from '@/lib/nov18/payment-link';
import { copyText, shareToStory, useToast } from '@/app/nov18/share-button';

const big = 'flex min-h-[64px] w-full touch-manipulation items-center justify-center px-4 text-center text-[17px] font-black uppercase tracking-[0.12em]';
const small = 'flex min-h-14 w-full touch-manipulation items-center justify-center px-4 text-center text-[14px] font-bold uppercase tracking-[0.12em] border border-[#c9a96e]/70 text-[#c9a96e]';

function download(href: string, name: string) {
  const a = document.createElement('a'); a.href = href; a.download = name; document.body.appendChild(a); a.click(); a.remove();
}

function openInstagram() {
  const t = Date.now();
  window.location.href = 'instagram://story-camera';
  window.setTimeout(() => { if (document.visibilityState === 'visible' && Date.now() - t < 2500) window.location.href = 'https://www.instagram.com/'; }, 1500);
}

export default function ShareTools() {
  const { show, node } = useToast();
  return (
    <>
      <div className="mt-5 grid gap-3">
        <button type="button" data-testid="copy-link" onClick={async () => { const ok = await copyText(SHARE_URL); show(ok ? 'Link copied. Paste it in a Link sticker.' : SHARE_URL); }} className={`${big} bg-[#c9a96e] text-[#0b0a08]`}>Copy ticket link</button>
        <p className="text-center text-[16px] font-medium text-[#c9a96e]">{SHARE_URL.replace('https://', '')}</p>
        <button type="button" onClick={openInstagram} className={`${big} border-2 border-[#c9a96e] text-[#c9a96e]`}>Open Instagram</button>
      </div>
      <div className="mt-8 grid gap-3">
        <button type="button" onClick={() => shareToStory(show)} className={small}>Share flyer (iPhone share sheet)</button>
        <button type="button" onClick={() => download('/nov18-assets/nov18-story-flyer.png', 'influence-nov18-story.png')} className={small}>Download story flyer</button>
        <button type="button" onClick={() => download('/nov18-assets/nov18-feed-flyer.png', 'influence-nov18-feed.png')} className={small}>Download feed flyer</button>
      </div>
      {node}
    </>
  );
}
