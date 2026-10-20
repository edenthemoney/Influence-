'use client';

import { halt, kick, prime } from './iosVideo';
import IosClip from './IosClip';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type PointerEvent as RPointerEvent } from 'react';
import s from './Stage.module.css';
import { campaigns, cleanName, findCampaign, talentStories, toHandle, type BizType, type Campaign, type Screen } from '@/data/stage-campaigns';

const GOLD = '#c9a96e';
const LOCK_MS = 2500;
const PROFILE_MS = 3400;
const RECAP_MS = 7000;
const IDLE_MS = 6000; // autoplay resumes this long after a swipe or tap
const TALENT_FRAME_MS = 2800;
const durOf = (x: Screen) => (x.kind === 'reel' ? 4600 : x.kind === 'carousel' ? 5600 : x.kind === 'story' ? 4000 : 4200);

const I = {
  heart: <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" /></svg>,
  comment: <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden><path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4.1A8 8 0 1 1 20 12z" /></svg>,
  send: <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden><path d="M21 4 10 14M21 4l-7 17-4-7-7-4z" /></svg>,
  save: <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden><path d="M6 3h12v18l-6-4-6 4z" /></svg>,
  more: <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden><circle cx="5" cy="12" r="1.8" /><circle cx="12" cy="12" r="1.8" /><circle cx="19" cy="12" r="1.8" /></svg>,
  reel: <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5" /><path d="m10 9 5 3-5 3z" fill="currentColor" /></svg>,
  grid: <svg viewBox="0 0 24 24" width="1.1em" height="1.1em" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M4 9.3h16M4 14.7h16M9.3 4v16M14.7 4v16" /></svg>,
  people: <svg viewBox="0 0 24 24" width="1.1em" height="1.1em" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden><circle cx="9" cy="8" r="3.2" /><path d="M3 19a6 6 0 0 1 12 0" /><circle cx="17" cy="9" r="2.6" /><path d="M16 13.6A5 5 0 0 1 21 18" /></svg>,
  personPlus: <svg viewBox="0 0 24 24" width="1.1em" height="1.1em" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden><circle cx="10" cy="8" r="3.4" /><path d="M4 19a6 6 0 0 1 12 0M19 8v6M16 11h6" /></svg>,
  back: <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden><path d="m15 5-7 7 7 7" /></svg>,
  check: <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2.6" aria-hidden><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>,
  lock: <svg viewBox="0 0 24 24" width="1.1em" height="1.1em" fill="currentColor" aria-hidden><path d="M7 10V8a5 5 0 0 1 10 0v2h1a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1zm2 0h6V8a3 3 0 0 0-6 0z" /></svg>,
  cam: <svg viewBox="0 0 24 24" width="1.25em" height="1.25em" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17" cy="7" r="1" fill="currentColor" /></svg>,
  torch: <svg viewBox="0 0 24 24" width="1.1em" height="1.1em" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden><path d="M8 3h8l-1 6H9zM9 9h6v11a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1z" /></svg>,
  camera: <svg viewBox="0 0 24 24" width="1.1em" height="1.1em" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden><path d="M4 8h3l2-2.5h6L17 8h3v11H4z" /><circle cx="12" cy="13" r="3.5" /></svg>,
  link: <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" /></svg>,
  close: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden><path d="M6 6l12 12M18 6 6 18" /></svg>,
  play: <svg viewBox="0 0 24 24" width="9" height="9" fill="currentColor" aria-hidden><path d="M7 4v16l13-8z" /></svg>,
};

const initial = (name: string) => (name.trim()[0] || 'Y').toUpperCase();

function useClock() {
  const [t, setT] = useState<{ time: string; date: string } | null>(null);
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setT({
        time: d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).replace(/\s?[AP]M$/i, ''),
        date: d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
      });
    };
    tick();
    const id = window.setInterval(tick, 30000);
    return () => window.clearInterval(id);
  }, []);
  return t;
}

function Profile({ c, name, handle }: { c: Campaign; name: string; handle: string }) {
  return (
    <div className={s.profile}>
      <div className={s.pTop}>{I.back}<span>{handle}</span><span style={{ marginLeft: 'auto' }}>{I.more}</span></div>
      <div className={s.pRow}>
        <div className={s.avatar}><b>{initial(name)}</b></div>
        <div className={s.stats}>
          <div><b>—</b><span aria-label="posts">{I.grid}</span></div>
          <div><b>—</b><span aria-label="audience">{I.people}</span></div>
          <div><b>—</b><span aria-label="following">{I.personPlus}</span></div>
        </div>
      </div>
      <p className={s.pName}>{name}</p>
      <p className={s.pCat}>{c.category}</p>
      <p className={s.pBio}>{c.bio}</p>
      <div className={s.pBtns}><span>Follow</span><span>Message</span></div>
      <div className={s.grid}>
        {c.grid.map((t, i) => (
          <div key={t.src + i} className={s.tile}>
            <img src={t.src} alt="" width={240} height={240} loading="lazy" decoding="async" />
            {t.reel && <span className={s.tileReel}>{I.reel}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

function Bars({ count, index, run, ms }: { count: number; index: number; run: boolean; ms: number }) {
  return (
    <div className={s.storyBars} style={{ ['--t' as string]: `${ms}ms` } as CSSProperties}>
      {Array.from({ length: count }).map((_, i) => (
        <i key={i} data-done={i < index} data-run={run && i === index}><b /></i>
      ))}
    </div>
  );
}

function Notif({ app, text, when, icon }: { app: string; text: string; when: string; icon: 'i' | 'cam' }) {
  return (
    <div className={s.notif}>
      <span className={`${s.nIcon} ${icon === 'i' ? s.nIconI : s.nIconC}`}>{icon === 'i' ? 'i' : I.cam}</span>
      <div className={s.nBody}>
        <header><span>{app}</span><span>{when}</span></header>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default function BusinessStage() {
  const [type, setType] = useState<BizType>('restaurant');
  const [raw, setRaw] = useState('');
  // -1 lock screen · 0 profile · 1..n campaign screens · n+1 recap
  const [phase, setPhase] = useState(0);
  const [awake, setAwake] = useState(false);
  const [lockGone, setLockGone] = useState<'no' | 'true' | 'hide'>('no');
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [cycle, setCycle] = useState(0);
  const [hold, setHold] = useState(0);
  const [carIdx, setCarIdx] = useState(0);
  const [talent, setTalent] = useState<{ id: string; i: number } | null>(null);
  const clock = useClock();

  const c = findCampaign(type);
  const typed = cleanName(raw);
  const name = typed || c.defaultName;
  const handle = toHandle(typed, c.defaultName);
  const n = c.screens.length;
  const RECAP = n + 1;

  const stageRef = useRef<HTMLDivElement>(null);
  const deviceRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const groundRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  // iOS: muted/playsinline attributes must exist before the video loads, or autoplay is refused.
  const setVideo = (el: HTMLVideoElement | null) => { prime(el); videoRef.current = el; };
  const awakeRef = useRef(false);
  const swipe = useRef<{ x: number; y: number; id: number } | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener?.('change', on);
    return () => mq.removeEventListener?.('change', on);
  }, []);

  useEffect(() => {
    const el = stageRef.current;
    if (!el || !('IntersectionObserver' in window)) { setInView(true); return; }
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Wake to the lock screen the first time the phone settles facing the viewer.
  const wake = useCallback((withLock: boolean) => {
    if (awakeRef.current) return;
    awakeRef.current = true;
    setAwake(true);
    if (withLock) { setPhase(-1); setLockGone('no'); } else { setLockGone('hide'); }
  }, []);
  useEffect(() => { if (reduced) wake(false); }, [reduced, wake]);

  // Lock screen → unlock into the profile (about 2.5 s in total).
  useEffect(() => {
    if (phase !== -1 || !awake) return;
    // The profile mounts under the lock as it slides up, so there is no empty frame mid-unlock.
    const a = window.setTimeout(() => { setLockGone('true'); setPhase(0); setCycle((x) => x + 1); }, LOCK_MS - 500);
    return () => window.clearTimeout(a);
  }, [phase, awake]);
  useEffect(() => {
    if (lockGone !== 'true') return;
    const d = window.setTimeout(() => setLockGone('hide'), 900);
    return () => window.clearTimeout(d);
  }, [lockGone]);

  // Campaign sequence. Pauses for the user (button, story tap, swipe idle) and when off screen.
  const now = () => (typeof performance !== 'undefined' ? performance.now() : 0);
  useEffect(() => {
    if (!awake || phase < 0 || !playing || !inView || reduced || talent) return;
    const left = hold - now();
    if (left > 0) {
      const t = window.setTimeout(() => setHold(0), left);
      return () => window.clearTimeout(t);
    }
    const ms = phase === 0 ? PROFILE_MS : phase === RECAP ? RECAP_MS : durOf(c.screens[phase - 1]);
    const t = window.setTimeout(() => setPhase((p) => (p >= RECAP ? 0 : p + 1)), ms);
    return () => window.clearTimeout(t);
  }, [phase, playing, inView, reduced, talent, cycle, hold, awake, RECAP, c]);

  // Carousel: step through the final photos while that screen is up.
  const cur = phase >= 1 && phase <= n ? c.screens[phase - 1] : null;
  useEffect(() => {
    setCarIdx(0);
    if (!cur || cur.kind !== 'carousel' || reduced) return;
    const id = window.setInterval(() => setCarIdx((i) => (i + 1) % cur.images.length), 1300);
    return () => window.clearInterval(id);
  }, [cur, reduced, cycle]);

  // At most one video: the active reel, only on screen, never with reduced motion.
  const videoOn = !!cur && (cur.kind === 'reel' || (cur.kind === 'story' && !!cur.video)) && inView && !reduced && !talent;
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (videoOn && playing) kick(v); else halt(v);
  }, [videoOn, playing, phase, type]);

  // Decode the next posters early so screens never flash.
  useEffect(() => {
    if (!inView) return;
    const next = [c.screens[phase] , c.screens[phase + 1]].filter(Boolean) as Screen[];
    const urls = next.flatMap((x) => (x.kind === 'reel' ? [x.poster] : x.kind === 'story' ? [x.bg] : x.kind === 'carousel' ? x.images.slice(0, 2) : [x.image]));
    const run = () => urls.forEach((u) => { const im = new Image(); im.src = u; im.decode?.().catch(() => {}); });
    const ric = (window as unknown as { requestIdleCallback?: (f: () => void) => number }).requestIdleCallback;
    if (ric) ric(run); else window.setTimeout(run, 200);
  }, [phase, c, inView]);

  // Talent story opened from a bubble.
  const story = talent ? talentStories.find((t) => t.id === talent.id) ?? null : null;
  useEffect(() => {
    if (!talent || !story || reduced) return;
    const t = window.setTimeout(() => {
      setTalent((cur2) => (!cur2 ? cur2 : cur2.i + 1 >= story.frames.length ? null : { id: cur2.id, i: cur2.i + 1 }));
    }, TALENT_FRAME_MS);
    return () => window.clearTimeout(t);
  }, [talent, story, reduced]);
  useEffect(() => { if (!talent) setCycle((x) => x + 1); }, [talent]);

  // 3D turn on scroll with a spring, then settle facing the viewer (GPU transform only).
  useEffect(() => {
    const device = deviceRef.current;
    const stage = stageRef.current;
    if (!device || !stage) return;
    let flat = false;
    const apply = (x: number) => {
      const k = 1 - x;
      const settled = k < 0.002;
      if (settled !== flat) { flat = settled; device.dataset.flat = String(settled); }
      device.style.transform = settled ? 'none' : `translate3d(0, ${(k * 16).toFixed(2)}%, 0) rotateX(${(k * 16).toFixed(2)}deg) rotateY(${(k * -36).toFixed(2)}deg) rotateZ(${(k * -5).toFixed(2)}deg) scale(${(0.86 + 0.14 * x).toFixed(4)})`;
      glareRef.current?.style.setProperty('transform', `translate3d(${(k * 70 - 10).toFixed(1)}%, 0, 0)`);
      if (groundRef.current) groundRef.current.style.transform = `translateX(-50%) scale(${(0.7 + 0.3 * x).toFixed(3)})`;
      const bs = bubblesRef.current?.children;
      if (bs) for (let i = 0; i < bs.length; i++) {
        const el = bs[i] as HTMLElement;
        const depth = Number(el.dataset.depth || 1);
        el.style.transform = `translate3d(${(k * depth * (i % 2 ? 18 : -18)).toFixed(1)}px, ${(k * depth * 90 + depth * parallax).toFixed(1)}px, 0)`;
      }
      if (x > 0.985 && !awakeRef.current) wake(true);
    };
    let parallax = 0;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { apply(1); return; }
    let x = 0, v = 0, target = 0, raf = 0;
    const measure = () => {
      const r = stage.getBoundingClientRect();
      const vh = window.innerHeight;
      target = Math.min(1, Math.max(0, (vh - r.top) / Math.max(1, Math.min(r.height + 12, vh * 0.9))));
      parallax = Math.max(-30, Math.min(30, (r.top - vh * 0.2) * -0.04));
    };
    const tick = () => {
      v += (target - x) * 0.07;
      v *= 0.76;
      x += v;
      apply(x);
      if (Math.abs(v) > 0.0004 || Math.abs(target - x) > 0.0004) raf = requestAnimationFrame(tick);
      else { x = target; apply(x); raf = 0; }
    };
    const onScroll = () => { measure(); if (!raf) raf = requestAnimationFrame(tick); };
    measure();
    x = target;
    apply(x);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [wake]);

  const manual = () => setHold(now() + IDLE_MS);
  const goTo = (p: number) => {
    if (!awakeRef.current) wake(false);
    setLockGone('hide');
    setTalent(null);
    setPhase(Math.max(0, Math.min(RECAP, p)));
    setCycle((x) => x + 1);
  };
  const step = (dir: 1 | -1) => { manual(); goTo(phase < 0 ? 0 : (phase + dir + RECAP + 1) % (RECAP + 1)); };
  const restart = () => { if (!awakeRef.current) wake(false); setLockGone('hide'); setPhase(0); setCycle((x) => x + 1); };
  const chooseType = (t: BizType) => { setType(t); restart(); };
  const jumpBeat = (b: number) => { manual(); goTo(1 + c.screens.findIndex((x) => x.beat === b)); };
  const openTalent = (id: string) => { setTalent({ id, i: 0 }); };
  const showPhone = () => {
    const el = stageRef.current;
    if (!el || window.innerWidth >= 768) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 76;
    window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' });
  };

  const onDown = (e: RPointerEvent) => { if (talent) return; swipe.current = { x: e.clientX, y: e.clientY, id: e.pointerId }; };
  const onUp = (e: RPointerEvent) => {
    const st = swipe.current;
    swipe.current = null;
    if (!st || talent) return;
    const dx = e.clientX - st.x, dy = e.clientY - st.y;
    if (Math.abs(dx) > 36 && Math.abs(dx) > Math.abs(dy) * 1.2) step(dx < 0 ? 1 : -1);
  };

  const beat = cur ? cur.beat : -1;
  const encoded = typed ? `&business=${encodeURIComponent(typed)}` : '';
  // The live booking flow is /start; map each example campaign to its closest /start service.
  const START: Record<string, string> = { reaction: 'reaction', event: 'event', bottle: 'event', activation: 'event', shoot: 'shoot', business: 'ugc', collabreposts: 'ugc' };
  const bookHref = START[c.service] ? `/start?service=${START[c.service]}` : '/start';
  void encoded;
  const primary = c.external ? { href: c.external.href, label: c.external.label } : { href: bookHref, label: 'Book this campaign' };

  const bubbles = useMemo(() => [
    { id: 'des', side: s.bL, top: '9%', s: 42, d: 1.4 },
    { id: 'seahra', side: s.bR, top: '30%', s: 40, d: 0.8 },
    { id: 'kat', side: s.bL, top: '57%', s: 40, d: 1.1 },
    { id: 'genesis', side: s.bR, top: '76%', s: 40, d: 1.7 },
  ], []);

  const label = !awake || phase === -1 ? <>Lock screen <span className="text-white/70">· new notifications</span></>
    : talent && story ? <>{story.name}&apos;s story <span className="text-white/70">· tap to skip</span></>
    : phase === 0 ? <>Your profile <span className="text-white/70">· with example posts</span></>
    : phase === RECAP ? <>Recap · <span style={{ color: GOLD }}>What&apos;s included</span></>
    : <>Step {beat + 1} of 4 · <span style={{ color: GOLD }}>{c.beats[beat]}</span></>;

  const dotCount = RECAP + 1;
  const dotName = (i: number) => (i === 0 ? 'Profile' : i === RECAP ? 'Recap' : `${c.beats[c.screens[i - 1].beat]} (${i} of ${n})`);

  const storyCount = (b: number) => Math.max(1, c.screens.filter((y) => y.kind === 'story' && y.beat === b).length);
  const storyIndex = (i: number) => c.screens.slice(0, i).filter((y) => y.kind === 'story' && y.beat === c.screens[i].beat).length;
  const renderScreen = (x: Screen, i: number) => {
    const on = phase === i + 1 && !talent;
    // Next slide's clip is mounted early (buffered, hidden, paused) so it can start the moment its slide shows.
    const pre = phase === i && inView && !reduced && !talent;
    const ms = durOf(x);
    if (x.kind === 'story') return (
      <>
        <img className={s.fill} src={x.bg} alt="" loading="lazy" decoding="async" />
        {x.video && ((on && videoOn) || pre) ? <IosClip key={`${type}-${i}`} onEl={setVideo} className={s.fill} src={x.video} poster={x.bg} active={on && videoOn} /> : null}
        <div className={s.shade} />
        <Bars count={storyCount(x.beat)} index={storyIndex(i)} run={on && playing && inView} ms={ms} />
        <div className={s.storyHead}><span className={s.miniAv}>{initial(name)}</span><span>{handle}</span></div>
        <div className={s.announce}>
          <h4>{x.title(name)}</h4>
          <p>{x.sub(name)}</p>
        </div>
        <div className={s.reply}>Send message</div>
      </>
    );
    if (x.kind === 'reel') return (
      <>
        <img className={s.fill} src={x.poster} alt="" loading="lazy" decoding="async" />
        {(on && videoOn) || pre ? <IosClip key={`${type}-${i}`} onEl={setVideo} className={s.fill} src={x.video} poster={x.poster} active={on && videoOn} /> : null}
        <div className={s.shade} />
        <span className={s.reelTag}>{x.label ?? 'Reels'}</span>
        {x.audio && (
          <div className={s.audioSticker} aria-hidden>
            <span className={s.disc}>♪</span>
            <span style={{ minWidth: 0 }}><b>Your Song</b><small>{name}</small></span>
            <span className={s.eq}><i /><i /><i /><i /></span>
          </div>
        )}
        <div className={s.rail} aria-hidden>{I.heart}{I.comment}{I.send}{I.more}</div>
        <div className={s.reelInfo}>
          <div className={s.who}><span className={s.miniAv}>{initial(name)}</span><span>{handle}</span><span className={s.tag}>with Influence</span></div>
          <p className={s.cap}>{x.caption(name)}</p>
          <p className={s.audio}>♪ {x.audio ? x.audio(name) : 'Original audio'}</p>
        </div>
      </>
    );
    if (x.kind === 'post' || x.kind === 'carousel') return (
      <div className={s.post}>
        <div className={s.postHead}>
          <div className={s.pair}><span className={s.miniAv}>{initial(name)}</span><span className={s.imark}>i</span></div>
          <div className={s.postWho}><b>{handle} and influence</b><span>Paid partnership with Influence</span></div>
        </div>
        {x.kind === 'post' ? <img className={s.postImg} src={x.image} alt="" loading="lazy" decoding="async" /> : (
          <div className={s.car}>
            <div className={s.carTrack} style={{ transform: `translate3d(${-(on ? carIdx : 0) * 100}%, 0, 0)` }}>
              {x.images.map((src) => <img key={src} src={src} alt="" loading="lazy" decoding="async" />)}
            </div>
            <span className={s.carCount}>{(on ? carIdx : 0) + 1}/{x.images.length}</span>
          </div>
        )}
        {x.kind === 'carousel' && <div className={s.carDots} aria-hidden>{x.images.map((src, k) => <i key={src} data-on={(on ? carIdx : 0) === k} />)}</div>}
        <div className={s.acts} aria-hidden>{I.heart}{I.comment}{I.send}<span style={{ marginLeft: 'auto' }}>{I.save}</span></div>
        <p className={s.postCap}><b>{handle}</b> {x.caption(name)}</p>
      </div>
    );
    return (
      <>
        {/* Portrait, pre-blurred copy of the reposted image (9:16-ish), not the landscape page backdrop. */}
        <img className={s.fill} src={x.image.replace(/\.webp$/, '-rbg.webp')} alt="" loading="lazy" decoding="async" />
        <div className={s.shade} />
        <Bars count={2} index={0} run={on && playing && inView} ms={ms} />
        <div className={s.storyHead}><img src={x.avatar} alt="" /><span>{x.talent} · Influence roster</span></div>
        <div className={s.repostCard}>
          <header><span className={s.miniAv} style={{ width: '1.7em', height: '1.7em' }}>{initial(name)}</span><span>{handle}</span></header>
          <img src={x.image} alt="" loading="lazy" decoding="async" />
        </div>
        {c.id === 'event' ? <div className={s.linkSticker}>{I.link}<span>{x.line(name)}</span></div>
          : x.song ? <div className={s.songSticker}><span className={s.disc} style={{ width: '1.7em', height: '1.7em' }}>♪</span><span>Your Song · {name}</span></div>
          : <div className={s.sticker}>{x.line(name)}</div>}
      </>
    );
  };

  const notifText = cur && awake && !talent ? cur.notif(name) : null;

  const PhoneShell = (
    <div
      ref={stageRef}
      className={`${s.stage} relative [--w:min(70vw,300px,calc((100svh_-_330px)_/_2.0923))] md:[--w:min(330px,calc((100svh_-_190px)_/_2.0923))]`}
      style={{ ['--gap' as string]: 'clamp(12px, 3.4vw, 20px)', ['--sw' as string]: 'min(calc(100% + 40px), calc(var(--w) * 1.66))', width: 'var(--sw)', marginLeft: 'calc((100% - var(--sw)) / 2)' } as CSSProperties}
    >
      <div ref={bubblesRef} className="absolute inset-0 hidden min-[340px]:block" style={{ pointerEvents: 'none' }}>
        {bubbles.map((b) => {
          const t = talentStories.find((x) => x.id === b.id)!;
          return (
            <button
              key={b.id}
              type="button"
              className={`${s.bubble} ${b.side}`}
              data-depth={b.d}
              data-on={talent?.id === b.id}
              style={{ top: b.top, ['--s' as string]: `${b.s}px` } as CSSProperties}
              onClick={() => openTalent(b.id)}
              aria-label={`Play ${t.name}'s story in the phone`}
            >
              <i><img src={t.avatar} alt="" width={96} height={96} loading="lazy" decoding="async" /></i>
              <em aria-hidden>{I.play}</em>
              <span>{t.name}</span>
            </button>
          );
        })}
      </div>
      <div ref={groundRef} className={s.ground} aria-hidden />
      <div ref={deviceRef} className={s.device} data-flat="false">
        <div className={s.glowBack} aria-hidden />
        <div className={s.back} aria-hidden />
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} aria-hidden className={`${s.slab} ${i > 4 ? s.slabDark : ''}`} style={{ transform: `translateZ(calc(var(--d) * ${(-(i + 1) / 7).toFixed(3)}))` }} />
        ))}
        <span className={`${s.btn} ${s.bAction}`} /><span className={`${s.btn} ${s.bUp}`} /><span className={`${s.btn} ${s.bDown}`} /><span className={`${s.btn} ${s.bPower}`} /><span className={`${s.btn} ${s.bCam}`} />
        <div className={s.face}>
          <div className={s.bezel}>
            <div
              className={s.screen}
              role="group"
              aria-roledescription="phone"
              aria-label={`Example campaign for ${name}. Swipe or use the steps to move through it.`}
              onPointerDown={onDown}
              onPointerUp={onUp}
              onPointerCancel={() => { swipe.current = null; }}
              onDragStart={(e) => e.preventDefault()}
            >
              <div className={s.island} />
              <div className={s.status} aria-hidden>
                <span style={{ opacity: phase === -1 && lockGone === 'no' ? 0 : 1 }}>{clock?.time ?? ''}</span>
                <span style={{ display: 'flex', gap: 4, alignItems: 'center' }}><svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor"><rect x="0" y="7" width="3" height="4" rx="1" /><rect x="4.5" y="5" width="3" height="6" rx="1" /><rect x="9" y="2.5" width="3" height="8.5" rx="1" /><rect x="13.5" y="0" width="3" height="11" rx="1" /></svg><svg width="24" height="11" viewBox="0 0 24 11" fill="none"><rect x="0.5" y="0.5" width="20" height="10" rx="3" stroke="currentColor" opacity="0.5" /><rect x="2" y="2" width="15" height="7" rx="1.6" fill="currentColor" /></svg></span>
              </div>
              {phase !== -1 && <div className={s.example} aria-hidden>Example campaign</div>}

              <div className={s.layer} data-on={phase === 0 && !talent}><Profile c={c} name={name} handle={handle} /></div>

              {c.screens.map((x, i) => (
                <div key={`${c.id}-${i}`} className={s.layer} data-on={phase === i + 1 && !talent} aria-hidden={phase !== i + 1}>
                  {renderScreen(x, i)}
                </div>
              ))}

              <div className={s.layer} data-on={phase === RECAP && !talent} aria-hidden={phase !== RECAP}>
                <div className={s.recap}>
                  <h4>What&apos;s included <em>in this example</em></h4>
                  <p className={s.rFor}>For {name} · {c.serviceLabel}</p>
                  <ul>
                    {c.recap.items.map((it) => <li key={it}>{I.check}<span>{it}</span></li>)}
                  </ul>
                  <p className={s.rSrc}>{c.recap.source ? `From the ${c.recap.source}.` : 'General example. Exact deliverables are set when you book.'}</p>
                  <Link href={primary.href} className={s.rCta} tabIndex={phase === RECAP ? 0 : -1}>{c.external ? 'Get tickets' : 'Book this campaign'}</Link>
                </div>
              </div>

              {story && talent && (
                <div className={s.tStory} data-run={!reduced}>
                  <img key={`${story.id}-${talent.i}`} className={s.tImg} src={story.frames[talent.i]} alt={`${story.name}, Influence roster`} decoding="async" />
                  <div className={s.shade} />
                  <Bars count={story.frames.length} index={talent.i} run={!reduced} ms={TALENT_FRAME_MS} />
                  <div className={s.storyHead}><img src={story.avatar} alt="" /><span>{story.name} · Influence roster</span></div>
                  <button type="button" className={s.tZone} style={{ left: 0, width: '32%' }} aria-label="Previous" onClick={() => setTalent((t) => (t ? { id: t.id, i: Math.max(0, t.i - 1) } : t))} />
                  <button type="button" className={s.tZone} style={{ right: 0, width: '68%' }} aria-label="Next" onClick={() => setTalent((t) => (!t ? t : t.i + 1 >= story.frames.length ? null : { id: t.id, i: t.i + 1 }))} />
                  <button type="button" className={s.tClose} aria-label="Close story" onClick={() => setTalent(null)}>{I.close}</button>
                </div>
              )}

              {notifText && !reduced && (
                <div key={`${type}-${phase}-${cycle}`} className={s.banner} data-run="true" aria-hidden>
                  <Notif app="Instagram" icon="cam" text={notifText} when="now" />
                </div>
              )}

              {lockGone !== 'hide' && (
                <div className={s.lock} data-gone={lockGone} data-run={awake && (phase === -1 || lockGone === 'true')} aria-hidden>
                  <img className={s.fill} src="/images/stage/lock-wall.webp" alt="" decoding="async" />
                  <div className={s.lockShade} />
                  <div className={s.lockTop}>
                    {I.lock}
                    <p className={s.lockDate}>{clock?.date ?? ''}</p>
                    <p className={s.lockTime}>{clock?.time ?? ''}</p>
                  </div>
                  <div className={s.notifs}>
                    <Notif app="Influence" icon="i" when="now" text={`New booking request: ${name}`} />
                    <Notif app="Instagram" icon="cam" when="now" text={`Kat tagged ${name} in a story`} />
                    <Notif app="Instagram" icon="cam" when="now" text={`Genesis shared your collab post`} />
                  </div>
                  <div className={s.lockBottom}><i>{I.torch}</i><i>{I.camera}</i></div>
                </div>
              )}
              <div className={s.off} data-on={!awake} />
              <div className={s.homeBar} />
              <div className={s.vignette} />
              <div ref={glareRef} className={s.glare} />
              <div className={s.sweepClip}><div className={s.sweep} /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div key={type} className={s.backdrop}><img src={c.backdrop} alt="" decoding="async" /></div>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(60% 50% at 50% 45%, rgba(8,8,8,0.2), #080808 85%)' }} />
      </div>

      <div className="relative grid gap-4 md:grid-cols-2 md:items-center md:gap-16">
        <div className="text-center md:col-start-2 md:row-start-1 md:text-left">
          <p className="text-[13px] font-semibold uppercase tracking-[0.18em]" style={{ color: GOLD }}>Example campaign</p>
          <h2 className="mt-2 font-display text-[36px] font-bold italic leading-[1.02] md:text-[58px]">See your business <span style={{ color: GOLD }}>on the feed</span></h2>
          <p className="mx-auto mt-2 max-w-md text-[16px] leading-snug text-white/90 md:mx-0 md:text-[18px]">Type your business name. Swipe the phone or tap a face to see more.</p>
        </div>

        <div className="md:col-start-1 md:row-span-2 md:row-start-1">
          {PhoneShell}
          <p className="mt-7 text-center text-[15px] font-semibold text-white md:mt-12" aria-live="polite">{label}</p>
          <div className="mt-1 flex justify-center" role="group" aria-label="Campaign screens">
            {Array.from({ length: dotCount }).map((_, i) => (
              <button key={i} type="button" onClick={() => { manual(); goTo(i); }} aria-label={`Show ${dotName(i)}`} aria-current={phase === i ? 'true' : undefined} className="grid h-7 w-6 place-items-center">
                <span className="block h-[7px] rounded-full transition-[width,background-color] duration-300" style={{ width: phase === i ? 18 : 7, backgroundColor: phase === i ? GOLD : 'rgba(255,255,255,0.4)' }} />
              </button>
            ))}
          </div>
        </div>

        <div className="md:col-start-2 md:row-start-2">
          <label htmlFor="biz-name" className="block text-[13px] font-bold uppercase tracking-[0.14em]">Your business name</label>
          <input
            id="biz-name"
            value={raw}
            onChange={(e) => { setRaw(e.target.value); restart(); }}
            onKeyDown={(e) => { if (e.key === 'Enter') { (e.target as HTMLInputElement).blur(); showPhone(); } }}
            onBlur={showPhone}
            maxLength={40}
            autoComplete="organization"
            enterKeyHint="done"
            placeholder={c.defaultName}
            className="mt-2 block min-h-14 w-full rounded-xl border border-white/25 bg-black/50 px-4 text-[17px] text-white placeholder:text-white/50 focus:border-[#c9a96e] focus:outline-none"
          />
          <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Business type">
            {campaigns.map((x) => (
              <button key={x.id} type="button" aria-pressed={x.id === type} onClick={() => chooseType(x.id)} className="min-h-12 rounded-full border px-4 text-[15px] font-semibold" style={x.id === type ? { backgroundColor: GOLD, borderColor: GOLD, color: '#000' } : { borderColor: 'rgba(255,255,255,0.35)', color: '#fff', backgroundColor: 'rgba(0,0,0,0.35)' }}>
                {x.chip}
              </button>
            ))}
          </div>

          <ol className="mt-6 grid grid-cols-2 gap-2 md:grid-cols-1">
            {c.beats.map((b, i) => (
              <li key={b}>
                <button type="button" onClick={() => jumpBeat(i)} aria-current={beat === i ? 'step' : undefined} className="flex min-h-12 w-full items-center gap-3 rounded-xl border px-3 text-left text-[15px] font-semibold transition-colors" style={beat === i ? { borderColor: GOLD, backgroundColor: 'rgba(201,169,110,0.14)', color: '#fff' } : { borderColor: 'rgba(255,255,255,0.14)', backgroundColor: 'rgba(0,0,0,0.35)', color: 'rgba(255,255,255,0.88)' }}>
                  <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full text-[13px] font-bold" style={beat === i ? { backgroundColor: GOLD, color: '#000' } : { border: '1px solid rgba(255,255,255,0.4)' }}>{i + 1}</span>
                  <span>{b}{c.screens.find((x) => x.beat === i)?.kind === 'post' && c.id !== 'shoot' ? <span className="block text-[13px] font-medium text-white/70">{name} × Influence</span> : null}</span>
                </button>
              </li>
            ))}
          </ol>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href={primary.href} className="inline-flex min-h-14 items-center justify-center px-7 text-[15px] font-bold uppercase tracking-[0.08em]" style={{ backgroundColor: GOLD, color: '#000' }}>
              {primary.label}
            </Link>
            <button type="button" onClick={() => setPlaying((p) => !p)} className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/40 px-5 text-[15px] font-semibold text-white" aria-pressed={!playing}>
              {playing ? 'Pause the example' : 'Play the example'}
            </button>
          </div>
          {c.external && (
            <p className="mt-3 text-[15px] text-white/85">
              Need creators at your own event? <Link href={bookHref} className="font-semibold underline underline-offset-4" style={{ color: GOLD }}>Book event staffing</Link>
            </p>
          )}
          <p className="mt-4 text-[14px] leading-relaxed text-white/75">
            Example only: a placeholder account with real Influence talent. Some venue footage via Pexels; stock venues are not Influence clients. Service: {c.serviceLabel}.
          </p>
        </div>
      </div>
    </div>
  );
}
