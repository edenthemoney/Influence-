'use client';
import { useEffect, useState } from 'react';
import { SHARE_URL } from '@/lib/nov18/payment-link';

const FLYER = '/nov18-assets/nov18-story-flyer.png';
let flyerFile: File | null = null;
// Load the flyer ahead of the tap so iOS still treats navigator.share as part of the tap.
export function preloadFlyer() {
  if (flyerFile || typeof window === 'undefined') return;
  fetch(FLYER).then((r) => r.blob()).then((b) => { flyerFile = new File([b], 'influence-nov18-story.png', { type: 'image/png' }); }).catch(() => {});
}

export async function copyText(text: string) {
  try { await navigator.clipboard.writeText(text); return true; } catch {
    const t = document.createElement('textarea'); t.value = text; t.setAttribute('readonly', ''); t.style.position = 'fixed'; t.style.opacity = '0';
    document.body.appendChild(t); t.select(); const ok = document.execCommand('copy'); t.remove(); return ok;
  }
}

export function useToast() {
  const [toast, setToast] = useState('');
  const show = (m: string) => { setToast(m); window.setTimeout(() => setToast(''), 6000); };
  const node = toast ? (
    <div role="status" className="fixed inset-x-4 top-[max(1rem,env(safe-area-inset-top))] z-[60] mx-auto max-w-[420px] border border-[#c9a96e] bg-black px-4 py-3 text-center text-[16px] font-medium leading-snug text-[#f4efe6] shadow-lg">{toast}</div>
  ) : null;
  return { show, node };
}

// Copy the link, then share the flyer file. If file sharing isn't supported (e.g. the Instagram in-app browser), go to /share.
export async function shareToStory(show: (m: string) => void) {
  const file = flyerFile;
  const canFile = !!file && !!navigator.canShare?.({ files: [file] });
  const sharing = canFile ? navigator.share({ files: [file as File], url: SHARE_URL }) : null;
  const copied = await copyText(SHARE_URL);
  show(copied ? 'Link copied. Paste it in a Link sticker.' : `Your link: ${SHARE_URL.replace('https://', '')}`);
  if (!sharing) { window.setTimeout(() => { window.location.href = '/share'; }, 900); return; }
  try { await sharing; } catch { /* closed share sheet; link is still copied */ }
}

function Icon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 3v12" /><path d="m7 8 5-5 5 5" /><path d="M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" />
    </svg>
  );
}

export default function ShareButton({ variant = 'button', className = '' }: { variant?: 'button' | 'icon'; className?: string }) {
  const { show, node } = useToast();
  useEffect(() => preloadFlyer(), []);
  if (variant === 'icon') {
    return (
      <>
        <button type="button" data-testid="share-icon" onClick={() => shareToStory(show)} aria-label="Share to your IG story"
          className={`flex h-11 w-11 touch-manipulation items-center justify-center rounded-full border border-[#c9a96e]/80 bg-black/70 text-[#c9a96e] backdrop-blur-sm ${className}`}>
          <Icon />
        </button>
        {node}
      </>
    );
  }
  return (
    <>
      <button type="button" data-testid="share-btn" onClick={() => shareToStory(show)}
        className={`flex min-h-14 w-full touch-manipulation items-center justify-center gap-2 border border-[#c9a96e]/80 px-4 text-[15px] font-bold uppercase tracking-[0.12em] text-[#c9a96e] ${className}`}>
        <Icon /> Share to your IG story
      </button>
      {node}
    </>
  );
}
