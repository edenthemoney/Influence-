/**
 * iOS Safari video helpers. React does not write the `muted` attribute, and iOS decides whether a
 * video may autoplay from the attribute at load time, so set it (and playsinline) before any src.
 * If autoplay is still refused (Low Power Mode), retry on the visitor's first tap.
 */
/** Touch devices (iPhone): phone-mockup and tile videos show an animated WebP by default (it animates in Low Power Mode). */
// Autoplay is never assumed on any device: every clip shows its animated WebP until frames are proven to advance.
export const touch = () => typeof window !== 'undefined';
/** Animated WebP for a stage clip: /images/stage/<id>(-hevc).mp4 -> /images/stage/<id>-anim.webp?v=6 */
export function animFor(v: HTMLVideoElement): string | null {
  if (v.dataset.anim) return v.dataset.anim;
  const src = v.dataset.src || v.querySelector('source:last-of-type')?.getAttribute('src') || v.currentSrc || '';
  const m = src.match(/(\/images\/stage\/(?!hero)[\w-]+?)(-hevc)?\.mp4/);
  return m ? `${m[1]}-anim.webp?v=11` : null;
}

export function prime(v: HTMLVideoElement | null) {
  if (!v) return;
  v.muted = true;
  v.defaultMuted = true;
  v.playsInline = true;
  v.setAttribute('muted', '');
  v.setAttribute('playsinline', '');
  v.setAttribute('webkit-playsinline', '');
  v.removeAttribute('controls');
  v.controls = false;
  v.setAttribute('disablepictureinpicture', '');
  v.setAttribute('disableremoteplayback', '');
  ensureKbStyle();
  if (!v.dataset.luxPlaying) {
    v.dataset.luxPlaying = '1';
    // Reveal only once frames really advance ('playing' can fire on a stalled iOS video).
    v.addEventListener('timeupdate', () => {
      if (v.dataset.refused !== 'true') return;
      const t0 = Number(v.dataset.t0 || 0);
      if (v.currentTime > t0 + 0.3 && !v.paused) { delete v.dataset.refused; fallback(v, false); }
    });
  }
}

// iOS only unlocks play() inside touchend / click (touchstart and scroll are not activation gestures).
const EV = ['touchend', 'click', 'keydown'];
const waiting = new Set<HTMLVideoElement>();
let armed = false;
function arm() {
  if (armed || typeof window === 'undefined') return;
  armed = true;
  const go = () => {
    waiting.forEach((v) => { if (v.isConnected && v.dataset.want === 'play') v.play().catch(() => {}); });
    waiting.clear();
    armed = false;
    EV.forEach((e) => removeEventListener(e, go));
  };
  EV.forEach((e) => addEventListener(e, go, { passive: true }));
}

export function kick(v: HTMLVideoElement | null) {
  if (!v) return;
  prime(v);
  v.dataset.want = 'play';
  const p = v.play();
  if (p) p.catch((err) => {
    // Autoplay refused (Low Power Mode etc.): keep the video invisible so no native play glyph can
    // show, put the sharp poster up with a slow Ken Burns, and retry on the first gesture.
    if (err && err.name === 'AbortError') return;
    v.dataset.hard = '1';
    hold(v);
    waiting.add(v); arm();
  });
}

export function halt(v: HTMLVideoElement | null, unload = false) {
  if (!v) return;
  v.dataset.want = 'pause';
  v.pause();
  if (touch() && animFor(v)) hold(v); // never leave a static poster/frame on a touch device
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
  st.textContent = `@keyframes luxKB{from{scale:1;translate:0 0}to{scale:1.12;translate:-2.5% -1.5%}}
.lux-kb{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;pointer-events:none;opacity:0;transition:opacity .6s ease}
.lux-kb[data-on="true"]{opacity:1;animation:luxKB 6s ease-in-out infinite alternate}
@media (prefers-reduced-motion: reduce){.lux-kb[data-on="true"]{animation:none}}
video{transition:opacity .5s ease}
video[data-refused="true"]{opacity:0!important}
video::-webkit-media-controls-start-playback-button,video::-webkit-media-controls,video::-webkit-media-controls-panel,video::-webkit-media-controls-overlay-play-button{display:none!important;-webkit-appearance:none!important;opacity:0!important}`;
  document.head.appendChild(st);
}

/** Hide the video (no frozen frame, no native glyph) and show its poster with Ken Burns until frames advance. */
export function hold(v: HTMLVideoElement) {
  v.dataset.t0 = String(v.currentTime || 0);
  v.dataset.refused = 'true';
  fallback(v, true);
}

const KB = new WeakMap<HTMLVideoElement, HTMLImageElement>();
/** Show/hide the Ken Burns poster layer that sits right after a video. */
export function fallback(v: HTMLVideoElement, on: boolean) {
  if (typeof document === 'undefined') return;
  ensureKbStyle();
  let kb = KB.get(v);
  if (on && (v.poster || animFor(v)) && v.parentElement) {
    if (!kb || !kb.isConnected) {
      kb = document.createElement('img');
      kb.className = `lux-kb ${v.className}`.trim();
      kb.alt = ''; kb.setAttribute('aria-hidden', 'true'); kb.decoding = 'async';
      kb.style.objectPosition = v.style.objectPosition || getComputedStyle(v).objectPosition;
      const a = touch() ? animFor(v) : null;
      kb.src = a || v.poster;
      if (a) { kb.dataset.anim = '1'; kb.style.transition = 'none'; kb.dataset.on = 'true'; }
      kb.onerror = () => { if (kb && v.poster && kb.src !== v.poster) kb.src = v.poster; };
      v.insertAdjacentElement('afterend', kb);
      KB.set(v, kb);
    }
    // Refused or stalled for real: swap in the animated WebP (image animation still runs in Low Power Mode).
    const a = v.dataset.hard === '1' || touch() ? animFor(v) : null;
    if (a && !kb.dataset.anim) { kb.dataset.anim = '1'; kb.src = a; }
    const k = kb;
    requestAnimationFrame(() => { k.dataset.on = 'true'; });
  } else if (!on && kb) { kb.dataset.on = 'false'; }
}

export function watch(v: HTMLVideoElement): () => void {
  if (typeof window === 'undefined') return () => {};
  ensureKbStyle();
  let last = v.currentTime, still = 0, retried = false;
  const showKb = (on: boolean) => fallback(v, on);
  void showKb;
  const t = window.setInterval(() => {
    const want = v.dataset.want === 'play' && !document.hidden && v.isConnected;
    if (!want) { still = 0; last = v.currentTime; return; }
    const r = v.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight || r.width === 0) { still = 0; return; }
    if (Math.abs(v.currentTime - last) > 0.01) { last = v.currentTime; still = 0; retried = false; if (v.dataset.refused !== 'true') showKb(false); return; }
    still += 300;
    if (still >= 900 && v.dataset.hard !== '1') { v.dataset.hard = '1'; hold(v); } // stalled: cover the frozen frame right away
    if (still >= 1200 && !retried) { retried = true; try { v.load(); } catch { /* ignore */ } v.play().catch(() => {}); }
  }, 300);
  return () => { clearInterval(t); KB.get(v)?.remove(); KB.delete(v); };
}
