'use client';
import ShareButton from '@/app/nov18/share-button';

function download(href: string, name: string) {
  const a = document.createElement('a'); a.href = href; a.download = name; document.body.appendChild(a); a.click(); a.remove();
}
const small = 'flex min-h-14 w-full touch-manipulation items-center justify-center px-4 text-center text-[14px] font-bold uppercase tracking-[0.12em] border border-[#c9a96e]/70 text-[#c9a96e]';

export default function ShareTools() {
  return (
    <>
      <ShareButton variant="giant" className="mt-6" />
      <div className="mt-8 grid gap-3">
        <button type="button" onClick={() => download('/nov18-assets/nov18-story-flyer.png', 'influence-nov18-story.png')} className={small}>Download story flyer</button>
        <button type="button" onClick={() => download('/nov18-assets/nov18-feed-flyer.png', 'influence-nov18-feed.png')} className={small}>Download feed flyer</button>
      </div>
    </>
  );
}
