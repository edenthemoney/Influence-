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
      if (v.currentTime > t0 + 0.15 && !v.paused) { delete v.dataset.refused; fallback(v, false); }
    });
  }
}

const EV = ['touchstart', 'touchend', 'click', 'scroll', 'keydown'];
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
    hold(v);
    waiting.add(v); arm();
  });
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
  if (on && v.poster && v.parentElement) {
    if (!kb || !kb.isConnected) {
      kb = document.createElement('img');
      kb.className = `lux-kb ${v.className}`.trim();
      kb.alt = ''; kb.setAttribute('aria-hidden', 'true'); kb.decoding = 'async';
      kb.src = v.poster;
      v.insertAdjacentElement('afterend', kb);
      KB.set(v, kb);
    }
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
    if (still >= 900 && v.dataset.refused !== 'true') hold(v); // stalled: cover the frozen frame right away
    if (still >= 1200 && !retried) { retried = true; try { v.load(); } catch { /* ignore */ } v.play().catch(() => {}); }
  }, 300);
  return () => { clearInterval(t); KB.get(v)?.remove(); KB.delete(v); };
}
