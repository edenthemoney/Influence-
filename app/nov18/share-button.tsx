'use client';
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import { SHARE_URL } from '@/lib/nov18/payment-link';

// Story flyer handed to the iPhone share sheet (JPEG keeps it small enough to preload).
const FLYER = '/nov18-assets/nov18-story-flyer.jpg';
const FLYER_PNG = '/nov18-assets/nov18-story-flyer.png';
const LINK_TEXT = SHARE_URL.replace('https://', '');
let flyerFile: File | null = null;

// Fetch the flyer ahead of the tap: iOS only opens the share sheet if share() runs inside the tap itself.
export function preloadFlyer() {
  if (flyerFile || typeof window === 'undefined') return;
  fetch(FLYER).then((r) => r.blob()).then((b) => { flyerFile = new File([b], 'influence-nov18-story.jpg', { type: 'image/jpeg' }); }).catch(() => {});
}

function legacyCopy(text: string) {
  const t = document.createElement('textarea'); t.value = text; t.setAttribute('readonly', ''); t.style.position = 'fixed'; t.style.opacity = '0';
  document.body.appendChild(t); t.select(); t.setSelectionRange(0, text.length); let ok = false;
  try { ok = document.execCommand('copy'); } catch { ok = false; }
  t.remove(); return ok;
}

// Must be called straight from a tap. Starts the clipboard write synchronously so the gesture still counts.
export function copyLink(): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(SHARE_URL).then(() => true, () => legacyCopy(SHARE_URL));
  } catch { /* fall through */ }
  return Promise.resolve(legacyCopy(SHARE_URL));
}
// Kept for older imports.
export const copyText = (t: string) => (t === SHARE_URL ? copyLink() : Promise.resolve(legacyCopy(t)));

export function isInAppBrowser() {
  if (typeof navigator === 'undefined') return false;
  return /Instagram|FBAN|FBAV|FB_IAB|TikTok|musical_ly|BytedanceWebview|Snapchat|Line\//i.test(navigator.userAgent);
}

export function canShareFlyer() {
  return !!flyerFile && typeof navigator !== 'undefined' && !!navigator.canShare && navigator.canShare({ files: [flyerFile] });
}

export function openInstagram() {
  const t = Date.now();
  window.location.href = 'instagram://story-camera';
  window.setTimeout(() => { if (document.visibilityState === 'visible' && Date.now() - t < 2600) window.location.href = 'https://www.instagram.com/'; }, 1600);
}

type Mode = 'closed' | 'steps' | 'fallback';

/** The whole flow: tap → copy link + open share sheet with the flyer → show the 3 steps. */
export function useStoryShare() {
  const [mode, setMode] = useState<Mode>('closed');
  const [copied, setCopied] = useState<boolean | null>(null);
  useEffect(() => preloadFlyer(), []);

  function start() {
    const copying = copyLink();
    const shareable = canShareFlyer() && !isInAppBrowser();
    if (shareable) {
      // iOS Safari: files only. Adding url/text alongside files makes iOS drop or reject the share.
      navigator.share({ files: [flyerFile as File] }).catch(() => { /* closed the sheet; steps stay up */ });
      setMode('steps');
    } else {
      setMode('fallback');
    }
    copying.then((ok) => setCopied(ok));
  }
  function again() { copyLink().then((ok) => setCopied(ok)); }
  function reshare() {
    if (canShareFlyer()) navigator.share({ files: [flyerFile as File] }).catch(() => {});
  }
  const overlay = mode === 'closed' ? null : (
    <ShareOverlay mode={mode} copied={copied} onClose={() => setMode('closed')} onCopy={again} onReshare={reshare} />
  );
  return { start, overlay };
}

function StickerIcon({ className = 'h-12 w-12' }: { className?: string }) {
  // Instagram's sticker button: a square face with a peeled corner.
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <rect x="2" y="2" width="44" height="44" rx="12" fill="#111" stroke="#f4efe6" strokeWidth="2" />
      <path d="M14 12h14l8 8v14a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2V14a2 2 0 0 1 2-2Z" fill="none" stroke="#f4efe6" strokeWidth="2.6" strokeLinejoin="round" />
      <path d="M28 12v6a2 2 0 0 0 2 2h6" fill="none" stroke="#f4efe6" strokeWidth="2.6" strokeLinejoin="round" />
      <circle cx="19.5" cy="23" r="1.8" fill="#f4efe6" /><circle cx="27" cy="23" r="1.8" fill="#f4efe6" />
      <path d="M18.5 28.5c2.6 2.6 7 2.6 9.6 0" fill="none" stroke="#f4efe6" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

function LinkChip() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[16px] font-bold text-[#0b0a08]">
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#3b82f6" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" /><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" /></svg>
      LINK
    </span>
  );
}

function InstagramGlyph({ className = 'h-12 w-12' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <defs><linearGradient id="igg" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stopColor="#feda75" /><stop offset=".35" stopColor="#fa7e1e" /><stop offset=".6" stopColor="#d62976" /><stop offset="1" stopColor="#4f5bd5" /></linearGradient></defs>
      <rect x="2" y="2" width="44" height="44" rx="12" fill="url(#igg)" />
      <rect x="12" y="12" width="24" height="24" rx="7" fill="none" stroke="#fff" strokeWidth="3" />
      <circle cx="24" cy="24" r="5.5" fill="none" stroke="#fff" strokeWidth="3" /><circle cx="31.5" cy="16.5" r="1.8" fill="#fff" />
    </svg>
  );
}

const bigGold = 'flex min-h-[64px] w-full touch-manipulation items-center justify-center bg-[#c9a96e] px-4 text-center text-[18px] font-black uppercase tracking-[0.1em] text-[#0b0a08] active:opacity-80';
const bigLine = 'flex min-h-[60px] w-full touch-manipulation items-center justify-center border-2 border-[#c9a96e] px-4 text-center text-[17px] font-black uppercase tracking-[0.1em] text-[#c9a96e] active:opacity-80';

function ShareOverlay({ mode, copied, onClose, onCopy, onReshare }: { mode: Mode; copied: boolean | null; onClose: () => void; onCopy: () => void; onReshare: () => void }) {
  const inApp = isInAppBrowser();
  useEffect(() => {
    const prev = document.body.style.overflow; document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);
  const copiedLine = copied === false
    ? <>Copy didn&apos;t work. Your link: <b className="text-[#c9a96e]">{LINK_TEXT}</b></>
    : <>Link copied ✓ <b className="text-[#c9a96e]">{LINK_TEXT}</b></>;
  return (
    <div role="dialog" aria-modal="true" aria-label="Share to your story" data-testid="share-overlay" data-mode={mode}
      className="fixed inset-0 z-[70] overflow-y-auto bg-black px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))] text-[#f4efe6]">
      <div className="mx-auto w-full max-w-[440px]">
        <div className="flex items-center justify-between">
          <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-[#c9a96e]">Share to my story</p>
          <button type="button" onClick={onClose} aria-label="Close" className="flex h-12 w-12 items-center justify-center text-[30px] leading-none text-[#f4efe6]/80">×</button>
        </div>
        <p className="mt-1 rounded border border-[#c9a96e]/60 px-3 py-3 text-center text-[16px]" data-testid="copied-line">{copiedLine}</p>

        {mode === 'steps' ? (
          <ol className="mt-5 grid gap-4">
            <Step n={1} icon={<InstagramGlyph />} title="Tap Instagram, then Story" body="Pick Instagram in the list that popped up. Then tap Story." />
            <Step n={2} icon={<StickerIcon />} title="Tap the sticker button" body={<>It&apos;s at the top of the screen. Then tap <LinkChip /></>} />
            <Step n={3} icon={<span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#c9a96e] text-[15px] font-black text-[#0b0a08]">PASTE</span>} title="Tap the box and Paste" body="The link is already copied. Tap Done, then share your story." />
          </ol>
        ) : (
          <div className="mt-5">
            {inApp && (
              <p className="mb-4 rounded bg-[#c9a96e] px-4 py-3 text-[16px] font-bold leading-snug text-[#0b0a08]" data-testid="inapp-hint">
                Easiest in Safari: tap ••• at the top, then &ldquo;Open in browser&rdquo;. Or follow the steps below.
              </p>
            )}
            <ol className="grid gap-4">
              <Step n={1} icon={<span className="text-[34px]">👆</span>} title="Press and hold the flyer" body="Then tap Save to Photos (or Add to Photos)." />
            </ol>
            <img src={FLYER_PNG} width={1080} height={1920} alt="Nov 18 story flyer. Press and hold, then Save." className="mx-auto mt-3 w-[70%] border border-[#c9a96e]/60" style={{ WebkitTouchCallout: 'default' }} />
            <ol start={2} className="mt-4 grid gap-4">
              <Step n={2} icon={<InstagramGlyph />} title="Open Instagram, swipe to Story" body="Pick the flyer from your photos." />
              <Step n={3} icon={<StickerIcon />} title={<>Sticker button → <LinkChip /> → Paste</>} body="The link is already copied. Tap Done, then share." />
            </ol>
            <button type="button" onClick={openInstagram} className={`${bigGold} mt-5`}>Open Instagram</button>
          </div>
        )}

        <div className="mt-5 grid gap-3">
          <button type="button" onClick={onCopy} data-testid="copy-again" className={bigLine}>Copy link again</button>
          {mode === 'steps' && <button type="button" onClick={onReshare} className={bigLine}>Show share list again</button>}
          <button type="button" onClick={onClose} className="min-h-[52px] text-[16px] font-bold text-[#f4efe6]/70 underline underline-offset-4">I&apos;m done</button>
        </div>
      </div>
    </div>
  );
}

function Step({ n, icon, title, body }: { n: number; icon: React.ReactNode; title: React.ReactNode; body: React.ReactNode }) {
  return (
    <li className="flex items-start gap-4 border border-[#c9a96e]/30 bg-[#0d0c0a] p-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#c9a96e] text-[20px] font-black text-[#0b0a08]">{n}</span>
      <div className="flex-1">
        <p className="text-[19px] font-black leading-tight">{title}</p>
        <p className="mt-1 text-[16px] leading-snug text-[#f4efe6]/80">{body}</p>
      </div>
      <span className="shrink-0">{icon}</span>
    </li>
  );
}

function ShareGlyph({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 3v12" /><path d="m7 8 5-5 5 5" /><path d="M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" />
    </svg>
  );
}

export default function ShareButton({ variant = 'button', className = '' }: { variant?: 'button' | 'icon' | 'giant'; className?: string }) {
  const { start, overlay } = useStoryShare();
  if (variant === 'icon') {
    return (
      <>
        <button type="button" data-testid="share-icon" onClick={start} aria-label="Share to my story"
          className={`flex h-12 w-12 touch-manipulation items-center justify-center rounded-full border border-[#c9a96e]/80 bg-black/70 text-[#c9a96e] backdrop-blur-sm ${className}`}>
          <ShareGlyph className="h-5 w-5" />
        </button>
        {overlay}
      </>
    );
  }
  if (variant === 'giant') {
    return (
      <>
        <button type="button" data-testid="share-giant" onClick={start} className={`flex min-h-[88px] w-full touch-manipulation items-center justify-center gap-3 bg-[#c9a96e] px-4 text-[22px] font-black uppercase tracking-[0.08em] text-[#0b0a08] shadow-[0_0_40px_rgba(201,169,110,0.35)] active:opacity-80 ${className}`}>
          <ShareGlyph className="h-7 w-7" /> Share to my story
        </button>
        {overlay}
      </>
    );
  }
  return (
    <>
      <button type="button" data-testid="share-btn" onClick={start}
        className={`flex min-h-[60px] w-full touch-manipulation items-center justify-center gap-2 border-2 border-[#c9a96e] px-4 text-[16px] font-black uppercase tracking-[0.1em] text-[#c9a96e] active:opacity-80 ${className}`}>
        <ShareGlyph /> Share to my story
      </button>
      {overlay}
    </>
  );
}
