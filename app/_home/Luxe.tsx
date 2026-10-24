'use client';

/**
 * home-e aesthetic layer. Every effect is transform/opacity-only or a static texture, pauses off
 * screen, and switches off under prefers-reduced-motion. At most one Luxe video decodes at a time.
 * Perf A/B: append ?off=foil,scene,gold,tilt,cursor,split,word,tiles,band to the URL to drop a feature.
 */
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { serviceLineup } from '@/data/service-lineup';
import { BOOK_HREF } from './Chrome';
import { dimensionMeta } from './Sections';
import L from './Luxe.module.css';
import { halt, hold, kick, prime, watch } from './iosVideo';
import { posOf } from '@/data/clip-pos';

const S = '/images/stage';
const M = '/images/mag';

const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const desktop = () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1024px)').matches;
const isOff = (k: string) => typeof window !== 'undefined' && (new URLSearchParams(location.search).get('off') || '').split(',').includes(k);

// One Luxe video at a time.
let current: HTMLVideoElement | null = null;
function playOnly(v: HTMLVideoElement) {
  if (current && current !== v) halt(current, true);
  current = v;
  prime(v);
  if (!v.getAttribute('src') && v.dataset.src) v.src = v.dataset.src.includes("?") ? v.dataset.src : `${v.dataset.src}?v=11`;
  if (!v.dataset.watched) { v.dataset.watched = '1'; watch(v); }
  kick(v);
}

/** Sets data-in="true" once the element is in view (or always, under reduced motion). */
function useInView<T extends HTMLElement>(threshold = 0.25, once = true) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced() || !('IntersectionObserver' in window)) { el.dataset.in = 'true'; return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.dataset.in = 'true'; if (once) io.disconnect(); } else if (!once) el.dataset.in = 'false';
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, once]);
  return ref;
}

/** Page boot: fade-in class on the wrapper (CSS), smooth anchors, perf flags on <html>. */
export function LuxeBoot() {
  useEffect(() => {
    const h = document.documentElement;
    h.dataset.off = (new URLSearchParams(location.search).get('off') || '').split(',').join(' ');
    if (reduced()) return;
    const prev = h.style.scrollBehavior;
    h.style.scrollBehavior = 'smooth';
    return () => { h.style.scrollBehavior = prev; };
  }, []);
  return null;
}

/** Gold italic word with a slow specular sweep (two counter-moving transforms; no paint animation). */
export function Foil({ children }: { children: string }) {
  return (
    <span className={L.foil} data-t={children}>
      {children}
      <span aria-hidden className={L.foilWin}><span className={L.foilTxt}>{children}</span></span>
    </span>
  );
}

/** Section head: gold number, hairline, eyebrow, headline revealed line by line (mask-up). */
export function SectionHead({ n, eyebrow, lines, gold, shader = false }: { n: string; eyebrow: string; lines: string[]; gold?: string; shader?: boolean }) {
  const ref = useInView<HTMLDivElement>(0.4);
  return (
    <div ref={ref} className="relative">
      {shader && <GoldShader />}
      <div className="relative flex items-center gap-4">
        <span className={L.num}>{n}</span>
        <span className={L.rule} />
        <span className="text-[12px] font-semibold uppercase tracking-[0.22em] text-white/80">{eyebrow}</span>
      </div>
      <h2 className={`relative mt-5 ${L.head}`}>
        {lines.map((t, i) => (
          <span key={i} className={L.line}>
            <span style={{ transitionDelay: `${i * 110}ms` }}>
              {gold && i === lines.length - 1 ? <Foil>{t}</Foil> : t}
            </span>
          </span>
        ))}
      </h2>
    </div>
  );
}

/** Liquid gold: tiny WebGL fragment shader at half resolution, 30fps cap, desktop only, paused off screen. Mobile: static gold wash. */
function GoldShader() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [live, setLive] = useState(false);
  useEffect(() => {
    if (!desktop() || reduced() || isOff('gold')) return;
    const c = ref.current;
    const gl = c?.getContext('webgl', { antialias: false, alpha: true, powerPreference: 'low-power' });
    if (!c || !gl) return;
    const vs = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
    const fs = `precision mediump float;uniform vec2 r;uniform float t;
      float n(vec2 p){return sin(p.x*1.7+t*.35)*cos(p.y*1.3-t*.27)+sin((p.x+p.y)*.9+t*.21);}
      void main(){vec2 uv=gl_FragCoord.xy/r;vec2 p=uv*vec2(r.x/r.y,1.)*3.;
        float v=n(p+n(p*1.6)*.6);float s=smoothstep(.2,1.4,v);
        vec3 g=mix(vec3(.12,.08,.03),vec3(.79,.66,.43),s)+pow(s,6.)*vec3(.5,.42,.25);
        float a=(.22+.3*s)*smoothstep(0.,.35,uv.x)*smoothstep(1.,.55,uv.x)*smoothstep(0.,.3,uv.y)*smoothstep(1.,.6,uv.y);
        gl_FragColor=vec4(g*a,a);}`;
    const sh = (type: number, src: string) => { const s = gl.createShader(type)!; gl.shaderSource(s, src); gl.compileShader(s); return s; };
    const pr = gl.createProgram()!;
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, vs)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, fs)); gl.linkProgram(pr); gl.useProgram(pr);
    const b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const ur = gl.getUniformLocation(pr, 'r'), ut = gl.getUniformLocation(pr, 't');
    const size = () => { c.width = Math.max(1, c.clientWidth >> 1); c.height = Math.max(1, c.clientHeight >> 1); gl.viewport(0, 0, c.width, c.height); };
    size(); setLive(true);
    let raf = 0, last = 0, vis = false;
    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (now - last < 33) return; last = now;
      gl.uniform2f(ur, c.width, c.height); gl.uniform1f(ut, now / 1000); gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    const io = new IntersectionObserver(([e]) => { vis = e.isIntersecting; cancelAnimationFrame(raf); if (vis) raf = requestAnimationFrame(draw); });
    io.observe(c);
    window.addEventListener('resize', size);
    return () => { io.disconnect(); cancelAnimationFrame(raf); window.removeEventListener('resize', size); };
  }, []);
  return (
    <>
      <span aria-hidden className={L.goldStatic} data-live={live} />
      <canvas ref={ref} aria-hidden className={L.goldCanvas} data-live={live} />
    </>
  );
}

/** Scroll-scrubbed venue push: pinned scene, the venue pushes in (one image layer; a masked foreground layer was cut for fps), the phone glides up into the stage. */
export function ScrubScene() {
  const wrap = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = wrap.current;
    if (!el || reduced() || isOff('scene')) { el?.style.setProperty('--k', '0.65'); return; }
    if (!window.matchMedia('(min-width: 768px)').matches) {
      // Phones: no scroll scrubbing. A static venue frame; the phone crossfades in once (CSS).
      const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.dataset.in = 'true'; io.disconnect(); } }, { threshold: 0.35 });
      io.observe(el);
      return () => io.disconnect();
    }
    let raf = 0, on = false;
    const tick = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const k = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - innerHeight)));
      el.style.setProperty('--k', k.toFixed(3));
    };
    const onScroll = () => { if (on && !raf) raf = requestAnimationFrame(tick); };
    const io = new IntersectionObserver(([e]) => { on = e.isIntersecting; if (on) tick(); }, { rootMargin: '200px 0px' });
    io.observe(el);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { io.disconnect(); window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);
  return (
    <section ref={wrap} className={L.scene} aria-label="An example venue, then your phone">
      <div className={L.pin}>
        <picture>
          <source media="(min-width: 768px)" srcSet="/images/luxe/scene-d.webp" />
          <img src="/images/luxe/scene-m.webp" alt="" className={L.sceneBg} decoding="async" loading="lazy" />
        </picture>
        <div className={L.sceneShade} />
        <p className={L.sceneCopy}>
          <span className="block text-[12px] font-semibold uppercase tracking-[0.24em] text-[#c9a96e]">Tonight, at a venue like yours</span>
          <span className="mt-3 block font-display text-[clamp(34px,6vw,72px)] font-bold italic leading-[0.95]">The room is set.<br />Now the feed.</span>
        </p>
        <div className={L.scenePhone} aria-hidden>
          <img className={L.kenBurns} src={`${S}/venue-lounge-phone.webp?v=1`} width={1000} height={2179} alt="" decoding="async" loading="lazy" />
        </div>
      </div>
    </section>
  );
}

const TILE_HREF: Record<string, string> = { venues: '/start', talent: '/start?service=shoot', content: '/start?service=ugc', music: '/start?service=musicvideo', events: '/start?service=event' };
const TILE_CLIP: Record<string, string> = { venues: 'og-des-arrive', talent: 'og-des-arrive', content: 'og-dessertz-line', music: 'og-dessertz-line', events: 'og-des-arrive' };

/** Five live service tiles: poster by default; the most-visible tile plays on mobile, hover plays on desktop. */
export function LiveTiles() {
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = box.current;
    if (!root || reduced() || isOff('tiles')) return;
    const vids = Array.from(root.querySelectorAll('video'));
    vids.forEach((v) => hold(v)); // every device: animated WebP until the tile's video really plays
    if (desktop()) {
      const offs = vids.map((v) => {
        const card = v.closest('article')!;
        const on = () => playOnly(v); const out = () => halt(v);
        card.addEventListener('mouseenter', on); card.addEventListener('mouseleave', out);
        return () => { card.removeEventListener('mouseenter', on); card.removeEventListener('mouseleave', out); };
      });
      return () => offs.forEach((f) => f());
    }
    const ratio = new Map<HTMLVideoElement, number>();
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => ratio.set(e.target as HTMLVideoElement, e.isIntersecting ? e.intersectionRatio : 0));
      let best: HTMLVideoElement | null = null, br = 0.6;
      ratio.forEach((r, v) => { if (r > br) { best = v; br = r; } });
      vids.forEach((v) => { if (v !== best) halt(v, true); });
      if (best) playOnly(best);
    }, { threshold: [0, 0.3, 0.6, 0.8, 1] });
    vids.forEach((v) => io.observe(v));
    return () => io.disconnect();
  }, []);
  return (
    <div ref={box} className="mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-5 px-5 pb-3 md:grid md:grid-cols-5 md:gap-4 md:overflow-visible md:px-16">
      {serviceLineup.map((g) => {
        const meta = dimensionMeta[g.id];
        const clip = TILE_CLIP[g.id];
        return (
          <article key={g.id} className="w-[58vw] max-w-[260px] shrink-0 snap-start md:w-auto md:max-w-none" data-cursor="Play">
            <Link href={TILE_HREF[g.id] || BOOK_HREF} className="group block" data-curtain>
              <div className={L.tile}>
                <video muted loop playsInline preload="none" poster={`${S}/${clip}-poster.webp`} data-src={`${S}/${clip}.mp4`} style={{ objectPosition: posOf(clip ? `${S}/${clip}.mp4` : '') }} aria-hidden />
                <div className={L.tileShade} />
                <h3 className="absolute bottom-3 left-3 right-3 font-display text-[24px] font-bold italic leading-[0.95] text-white md:text-[26px]">{meta.short}</h3>
              </div>
              <p className="mt-3 text-[14px] leading-relaxed text-white/80">{meta.examples}</p>
              <span className="mt-2 inline-block text-[12px] font-semibold uppercase tracking-[0.2em] text-[#c9a96e]">Book {meta.short.split(' ')[0]} →</span>
            </Link>
          </article>
        );
      })}
    </div>
  );
}

// Original Influence footage posters + roster shoot stills (no stock).
const BAND: { id: string; cap: string }[] = [
  { id: 'og-des-arrive-poster', cap: 'Des \u00b7 Arrival' },
  { id: 'hero-m2-poster', cap: 'Des \u00b7 Poolside' },
  { id: 'venue-lounge-phone', cap: 'Mika \u00b7 Lounge' },
];

/* Highlight band: three sharp stills, still frames with a slow Ken Burns drift and one soft fade-in. No marquee, no swaps. */
export function ReelBand() {
  const ref = useInView<HTMLDivElement>(0.2, true);
  return (
    <div ref={ref} className={`${L.band} border-y border-[#c9a96e]/20 bg-black px-5 py-10 md:px-16 md:py-14`}>
      <div className={L.track}>
        {BAND.map((b, i) => (
          <figure key={b.id} className={L.still} style={{ transitionDelay: `${i * 180}ms` }}>
            <div className={L.stillFrame}>
              <img src={`${S}/${b.id}.webp`} alt="" loading="eager" decoding="async" style={{ animationDelay: `${i * -6}s` }} />
            </div>
            <figcaption className="mt-3 text-[11px] uppercase tracking-[0.28em] text-[#c9a96e]/80">{b.cap}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export type MagPerson = { id: string; name: string; role: string; img: string; upscale?: boolean };
export const MAG: MagPerson[] = [
  { id: 'des-001', name: 'Deseray', role: 'Host', img: `${M}/des.webp` },
  { id: 'seahra-026', name: 'Seahra', role: 'Fashion', img: `${M}/seahra.webp` },
  { id: 'genesis-003', name: 'Genesis', role: 'Brand Ambassador', img: `${M}/genesis.webp` },
  { id: 'kat-051', name: 'Kat', role: 'Brand Ambassador', img: `${M}/kat.webp` },
  { id: 'ferrari-004', name: 'Ferrari', role: 'Lifestyle', img: `${M}/ferrari.webp` },
  { id: 'alisha-023', name: 'Alisha', role: 'Brand Ambassador', img: `${M}/alisha.webp` },
  { id: 'gabriela-025', name: 'Gabriela', role: 'Model', img: `${M}/gabriela.webp` },
  { id: 'ayana-053', name: 'Ayana', role: 'Creator', img: `${M}/ayana.webp` },
  { id: 'nya-042', name: 'Nya', role: 'Model', img: `${M}/nya.webp` },
  { id: 'maria-002', name: 'Maria', role: 'Lifestyle', img: `${M}/maria.webp` },
  { id: 'leila-009', name: 'Leila', role: 'Lifestyle', img: `${M}/leila.webp` },
  { id: 'bianca-055', name: 'Bianca', role: 'TV & on-camera', img: `${M}/bianca.webp` },
  { id: 'celeste-024', name: 'Celeste', role: 'Creator', img: `${M}/celeste.webp` },
  { id: 'serena', name: 'Serena', role: 'Upscale dining & events', img: `${M}/serena.webp`, upscale: true },
];

/** Roster: swipeable 3:4 magazine cards; desktop tilt + glare on hover, mobile a slow sway on the card in view. */
export function RosterMag() {
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = box.current;
    if (!root || reduced() || isOff('tilt')) return;
    if (!desktop()) {
      // Sway only while the roster is on screen.
      const io = new IntersectionObserver(([e]) => { root.dataset.sway = e.isIntersecting ? 'true' : 'false'; });
      io.observe(root);
      return () => io.disconnect();
    }
    const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-tilt]'));
    const offs = cards.map((c) => {
      let raf = 0;
      const move = (e: PointerEvent) => {
        const r = c.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => { c.style.setProperty('--rx', `${(-y * 8).toFixed(2)}deg`); c.style.setProperty('--ry', `${(x * 10).toFixed(2)}deg`); c.style.setProperty('--gx', `${(x * 120).toFixed(0)}%`); c.dataset.hot = 'true'; });
      };
      const leave = () => { cancelAnimationFrame(raf); c.style.setProperty('--rx', '0deg'); c.style.setProperty('--ry', '0deg'); c.dataset.hot = 'false'; };
      c.addEventListener('pointermove', move); c.addEventListener('pointerleave', leave);
      return () => { c.removeEventListener('pointermove', move); c.removeEventListener('pointerleave', leave); };
    });
    return () => offs.forEach((f) => f());
  }, []);
  return (
    <div ref={box} className={`${L.magRow} flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-4 md:gap-6 md:px-16`}>
      {MAG.map((p, i) => (
        <Link key={p.id} href={p.upscale ? '/start?service=event' : `/influencer/${p.id}`} className={`${L.card} ${p.upscale ? L.upscale : ''} w-[64vw] max-w-[300px] shrink-0 snap-start md:w-[280px]`}>
          <div className={L.tiltBox} data-tilt style={{ '--d': `${(i % 4) * -1.6}s` } as CSSProperties}>
            <div className={L.mag}>
              <img src={p.img} alt={p.name} loading="lazy" decoding="async" />
              <span aria-hidden className={L.glare} />
            </div>
          </div>
          <span className="mt-4 block h-px w-10 bg-[#c9a96e]" />
          <p className="mt-3 font-display text-[28px] italic leading-none text-white">{p.upscale ? <Foil>{p.name}</Foil> : p.name}</p>
          <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">{p.role}</p>
        </Link>
      ))}
    </div>
  );
}

/** Brands vs creators: two panels that slide together as you scroll in. Copy from the service lineup and the join page. */
export function SplitBrandsCreators() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced() || isOff('split')) { el?.style.setProperty('--s', '1'); return; }
    let raf = 0, on = false;
    const tick = () => { raf = 0; const r = el.getBoundingClientRect(); const k = Math.min(1, Math.max(0, (innerHeight - r.top) / (innerHeight * 0.8))); el.style.setProperty('--s', k.toFixed(3)); };
    const onScroll = () => { if (on && !raf) raf = requestAnimationFrame(tick); };
    const io = new IntersectionObserver(([e]) => { on = e.isIntersecting; if (on) tick(); });
    io.observe(el); window.addEventListener('scroll', onScroll, { passive: true });
    return () => { io.disconnect(); window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);
  const brands = serviceLineup.map((g) => dimensionMeta[g.id]?.short).filter(Boolean) as string[];
  return (
    <section ref={ref} className={`${L.split} ${L.tex}`} aria-label="For brands and for creators">
      <div className={L.splitL}>
        <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[#c9a96e]">For brands &amp; labels</p>
        <h3 className="mt-3 font-display text-[clamp(32px,4.4vw,56px)] font-bold italic leading-[0.95]">Book the people<br />your audience follows.</h3>
        <ul className="mt-6 space-y-2 text-[15px] text-white/85">{brands.map((b) => <li key={b}>· {b}</li>)}</ul>
        <Link href={BOOK_HREF} data-curtain data-cursor="Book" data-magnet className={`${L.btn} mt-8 inline-flex min-h-12 items-center px-6 text-[14px] font-bold uppercase tracking-[0.1em]`} style={{ backgroundColor: '#c9a96e', color: '#000' }}>Start a booking</Link>
      </div>
      <div className={L.splitR}>
        <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[#c9a96e]">For creators</p>
        <h3 className="mt-3 font-display text-[clamp(32px,4.4vw,56px)] font-bold italic leading-[0.95]">Get booked by<br />venues and brands.</h3>
        <ul className="mt-6 space-y-2 text-[15px] text-white/85">
          <li>· Apply once with your Instagram</li>
          <li>· Paid bookings with venues and brands</li>
          <li>· A profile page brands can browse</li>
          <li>· Networking nights to meet the team</li>
        </ul>
        <Link href="/join" data-cursor="Join" data-magnet className={`${L.btn} mt-8 inline-flex min-h-12 items-center border border-white px-6 text-[14px] font-bold uppercase tracking-[0.1em] text-white`}>Apply to join</Link>
      </div>
    </section>
  );
}

/** INFLUENCE with real footage inside the letters (CSS mask on the video). Poster inside the letters on low-power phones or reduced motion. */
export function VideoWordmark() {
  const ref = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<'poster' | 'video'>('poster');
  const [d, setD] = useState(false);
  useEffect(() => {
    const isD = window.matchMedia('(min-width: 768px)').matches;
    setD(isD);
    const nav = navigator as Navigator & { connection?: { saveData?: boolean }; hardwareConcurrency?: number };
    const low = !isD && (!!nav.connection?.saveData || (nav.hardwareConcurrency || 8) <= 4);
    if (reduced() || low || isOff('word')) return;
    setMode('video');
  }, []);
  useEffect(() => {
    if (mode !== 'video') return;
    const el = ref.current; const v = el?.querySelector('video');
    if (!el || !v) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) playOnly(v); else halt(v, true); }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [mode]);
  const clip = d ? `${S}/hero-d` : `${S}/hero-m2`;
  return (
    <div ref={ref} className={L.wordWrap} role="img" aria-label="Influence">
      {mode === 'video'
        ? <video className={L.wordMedia} muted loop playsInline preload="none" poster={`${clip}-poster.webp?v=10`} data-src={`${clip}.mp4?v=10`} data-anim={`${clip}-anim.webp?v=10`} aria-hidden />
        : <img className={L.wordMedia} src={`${clip}-anim.webp?v=10`} alt="" loading="lazy" decoding="async" />}
    </div>
  );
}

/** Gold curtain on the way to booking: View Transitions where supported, transform-only curtain otherwise. */
export function CurtainNav() {
  const router = useRouter();
  const [down, setDown] = useState(false);
  useEffect(() => {
    if (reduced()) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a') as HTMLAnchorElement | null;
      if (!a || e.metaKey || e.ctrlKey || e.shiftKey || a.target) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname !== '/start') return;
      e.preventDefault();
      const go = () => router.push(url.pathname + url.search);
      setDown(true);
      setTimeout(() => {
        const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
        if (doc.startViewTransition) doc.startViewTransition(go); else go();
      }, 420);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [router]);
  return <div aria-hidden className={L.curtain} data-down={down} />;
}

/** Arriving on booking: the gold curtain lifts away. */
export function CurtainLift() {
  const [up, setUp] = useState(false);
  useEffect(() => { const t = requestAnimationFrame(() => setUp(true)); return () => cancelAnimationFrame(t); }, []);
  return <div aria-hidden className={L.curtainLift} data-up={up} />;
}

/** Desktop only: a small gold cursor that reads 'Play' over video and 'Book' over CTAs; CTAs lean toward it. */
export function LuxCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState('');
  useEffect(() => {
    if (!desktop() || reduced() || isOff('cursor')) return;
    const d = dot.current!;
    document.documentElement.dataset.luxCursor = 'true';
    let x = innerWidth / 2, y = innerHeight / 2, raf = 0;
    let mag: HTMLElement | null = null;
    const move = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY;
      const t = e.target as HTMLElement;
      const hit = t.closest<HTMLElement>('[data-cursor]');
      const cta = t.closest<HTMLElement>('a,button');
      setLabel(hit?.dataset.cursor || (cta && /book|booking/i.test(cta.textContent || '') ? 'Book' : ''));
      const m = t.closest<HTMLElement>('[data-magnet]');
      if (mag && mag !== m) mag.style.transform = '';
      mag = m;
      if (m) { m.style.transition = 'transform 0.25s ease-out'; const r = m.getBoundingClientRect(); m.style.transform = `translate(${((x - r.left - r.width / 2) * 0.18).toFixed(1)}px, ${((y - r.top - r.height / 2) * 0.25).toFixed(1)}px)`; }
      if (!raf) raf = requestAnimationFrame(() => { raf = 0; d.style.transform = `translate3d(${x}px, ${y}px, 0)`; });
    };
    addEventListener('pointermove', move, { passive: true });
    return () => { removeEventListener('pointermove', move); delete document.documentElement.dataset.luxCursor; };
  }, []);
  return <div ref={dot} aria-hidden className={L.cursor} data-label={label ? 'true' : 'false'}><span>{label}</span></div>;
}

export function Hair() { return <div className={L.hair} />; }
export function Tex({ children, className = '' }: { children: ReactNode; className?: string }) { return <div className={`${L.tex} ${className}`}>{children}</div>; }

/** Footer: clean link columns, the existing contact/social links, and the INFLUENCE wordmark with footage inside the letters. */
export function LuxeFooter() {
  const col = (title: string, links: [string, string, boolean?][]) => (
    <div>
      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c9a96e]">{title}</p>
      <ul className="space-y-3 text-[15px] text-white/85">
        {links.map(([t, h, ext]) => <li key={t}>{ext ? <a href={h} target={h.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="hover:text-white">{t}</a> : <Link href={h} className="hover:text-white">{t}</Link>}</li>)}
      </ul>
    </div>
  );
  return (
    <footer className={`${L.tex} border-t border-[#c9a96e]/25`}>
      <div className="mx-auto max-w-7xl px-6 pt-16 md:px-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <p className="font-display text-[22px] italic leading-snug text-white">Brand Ambassadors, creators, and talent for South Florida venues and brands.</p>
          </div>
          {col('Book', [['Start a booking', BOOK_HREF], ['All services', '/services'], ['Browse the roster', '/marketplace'], ['Networking night', '/tickets']])}
          {col('Services', [['Music video models', '/music-video-creators'], ['Brand ambassadors', '/brand-ambassadors-miami'], ['Music promotion', '/music-promotion'], ['Bottle girls / VIP', '/bottle-girls-miami'], ['Restaurants', '/restaurant-influencer-marketing-miami'], ['Nightlife', '/nightclub-influencer-marketing-miami'], ['Hotels', '/hotel-influencer-marketing-miami'], ['Influencer cost guide', '/influencer-cost-guide']])}
          {col('Creators', [['Join the roster', '/join'], ['FAQ', '/faq'], ['Starter for independent creatives', '/starter']])}
          {col('Contact', [['(561) 287-7194', 'tel:+15612877194', true], ['Email us', 'mailto:influencemodelsagency@gmail.com', true], ['Instagram', 'https://instagram.com/influencecreators.marketing', true]])}
        </div>
        <div className="mt-14 h-px bg-gradient-to-r from-transparent via-[#c9a96e]/60 to-transparent" />
      </div>
      <div className="px-3 pb-4 pt-8 md:px-8" data-cursor="Play"><VideoWordmark /></div>
      <p className="px-6 pb-8 text-center text-[12px] tracking-[0.12em] text-white/55 md:px-16">© {new Date().getFullYear()} Influence · Miami &amp; Boca Raton, FL</p>
      <p className="px-6 pb-8 -mt-4 text-center text-[11px] uppercase tracking-[0.2em] md:px-16"><a href="https://alphatrust.solutions" target="_blank" rel="noopener" className="text-white/40 hover:text-white/70">Marketing by Alpha Trust Solutions</a></p>
    </footer>
  );
}
