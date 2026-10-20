/**
 * iOS Safari video helpers. React does not write the `muted` attribute, and iOS decides whether a
 * video may autoplay from the attribute at load time, so set it (and playsinline) before any src.
 * If autoplay is still refused (Low Power Mode), retry on the visitor's first tap.
 */
export function prime(v: HTMLVideoElement | null) {
  if (!v) return;
  v.muted = true;
  v.defaultMuted = true;
  v.playsInline = true;
  v.setAttribute('muted', '');
  v.setAttribute('playsinline', '');
  v.setAttribute('webkit-playsinline', '');
}

const waiting = new Set<HTMLVideoElement>();
let armed = false;
function arm() {
  if (armed || typeof window === 'undefined') return;
  armed = true;
  const go = () => {
    waiting.forEach((v) => { if (v.isConnected && v.dataset.want === 'play') v.play().catch(() => {}); });
    waiting.clear();
    armed = false;
    removeEventListener('touchend', go); removeEventListener('click', go);
  };
  addEventListener('touchend', go, { passive: true }); addEventListener('click', go);
}

export function kick(v: HTMLVideoElement | null) {
  if (!v) return;
  prime(v);
  v.dataset.want = 'play';
  const p = v.play();
  if (p) p.catch(() => { waiting.add(v); arm(); });
}

export function halt(v: HTMLVideoElement | null, unload = false) {
  if (!v) return;
  v.dataset.want = 'pause';
  v.pause();
  if (unload && v.getAttribute('src')) { v.removeAttribute('src'); v.load(); }
}

/**
 * Stall watchdog: while a video is wanted playing and on screen, if currentTime has not moved for
 * ~1.2s, call load()+play() once; if it is still stuck ~1.5s later, crossfade to a Ken Burns
 * (slow CSS transform) of its sharp poster so nothing ever looks frozen. Recovers if playback resumes.
 */
let kbStyle = false;
function ensureKbStyle() {
  if (kbStyle || typeof document === 'undefined') return;
  kbStyle = true;
  const st = document.createElement('style');
  st.textContent = `@keyframes luxKB{from{scale:1.02}to{scale:1.1}}
.lux-kb{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;pointer-events:none;opacity:0;transition:opacity .6s ease}
.lux-kb[data-on="true"]{opacity:1;animation:luxKB 9s ease-in-out infinite alternate}
@media (prefers-reduced-motion: reduce){.lux-kb[data-on="true"]{animation:none}}`;
  document.head.appendChild(st);
}

export function watch(v: HTMLVideoElement): () => void {
  if (typeof window === 'undefined') return () => {};
  ensureKbStyle();
  let last = v.currentTime, still = 0, retried = false, kb: HTMLImageElement | null = null;
  const showKb = (on: boolean) => {
    if (on && !kb && v.poster && v.parentElement) {
      kb = document.createElement('img');
      kb.className = `lux-kb ${v.className}`.trim();
      kb.alt = ''; kb.setAttribute('aria-hidden', 'true'); kb.decoding = 'async';
      kb.src = v.poster;
      v.insertAdjacentElement('afterend', kb);
      requestAnimationFrame(() => { if (kb) kb.dataset.on = 'true'; });
    } else if (!on && kb) { kb.dataset.on = 'false'; }
  };
  const t = window.setInterval(() => {
    const want = v.dataset.want === 'play' && !document.hidden && v.isConnected;
    if (!want) { still = 0; last = v.currentTime; return; }
    const r = v.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight || r.width === 0) { still = 0; return; }
    if (Math.abs(v.currentTime - last) > 0.01) { last = v.currentTime; still = 0; retried = false; showKb(false); return; }
    still += 300;
    if (still >= 1200 && !retried) { retried = true; try { v.load(); } catch { /* ignore */ } v.play().catch(() => {}); }
    else if (still >= 2700) showKb(true);
  }, 300);
  return () => { clearInterval(t); kb?.remove(); kb = null; };
}
