'use client';
import ShareButton from '@/app/dec16/share-button';

function download(href: string, name: string) {
  const a = document.createElement('a'); a.href = href; a.download = name; document.body.appendChild(a); a.click(); a.remove();
}
const small = 'flex min-h-14 w-full touch-manipulation items-center justify-center px-4 text-center text-[14px] font-bold uppercase tracking-[0.12em] border border-[#c9a96e]/70 text-[#c9a96e]';

export default function ShareTools() {
  return (
    <>
      <ShareButton variant="giant" className="mt-6" />
      <div className="mt-8 grid gap-3">
        <button type="button" onClick={() => download('/dec16-assets/dec16-story-flyer.png', 'influence-dec16-story.png')} className={small}>Download story flyer</button>
        <button type="button" onClick={() => download('/dec16-assets/dec16-feed-flyer.png', 'influence-dec16-feed.png')} className={small}>Download feed flyer</button>
      </div>
    </>
  );
}
