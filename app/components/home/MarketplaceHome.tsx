'use client';

import Link from 'next/link';
import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import { CLIPS, ROOMS, STEPS, VENUES } from './clips';
import { BookForm, JoinForm } from './InquiryForms';
import { useMotion } from './motion';
import Reveal from './Reveal';
import StagePhone, { type StagePhoneHandle } from './StagePhone';

const NAV = [
  { href: '#proof', label: 'Proof' },
  { href: '#rooms', label: 'Rooms' },
  { href: '#method', label: 'Method' },
  { href: '#book', label: 'Book' },
];

function Words({ text, className, start = 0 }: { text: string; className?: string; start?: number }) {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="ix-word" style={{ animationDelay: `${start + index * 90}ms` }}>
          {word}
          {index < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </span>
  );
}

function Magnet({
  href,
  children,
  variant = 'solid',
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  variant?: 'solid' | 'ghost';
  onClick?: () => void;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const move = (event: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * 0.18;
    const y = (event.clientY - rect.top - rect.height / 2) * 0.28;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  return (
    <a
      ref={ref}
      href={href}
      className={variant === 'solid' ? 'ix-btn ix-btn-solid' : 'ix-btn ix-btn-ghost'}
      onMouseMove={move}
      onMouseLeave={() => {
        if (ref.current) ref.current.style.transform = '';
      }}
      onClick={onClick}
    >
      {children}
    </a>
  );
}

export default function MarketplaceHome() {
  const phoneRef = useRef<StagePhoneHandle>(null);
  const heroRef = useRef<HTMLElement>(null);
  const storyRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const motion = useMotion();
  const cinematic = motion === 'full';
  const reduced = motion !== 'full';
  const [open, setOpen] = useState(false);
  const [heroLive, setHeroLive] = useState(true);
  const [owner, setOwner] = useState<'hero' | 'story' | 'none'>('hero');
  const [beat, setBeat] = useState(0);
  const [concept, setConcept] = useState(0);
  const [picked, setPicked] = useState(0);
  const [reel, setReel] = useState(0);
  const onIndexChange = useCallback((next: number) => setReel(next), []);

  useEffect(() => {
    try {
      const dismissed = sessionStorage.getItem('lead_popup_dismissed');
      const submitted = sessionStorage.getItem('lead_popup_submitted');
      sessionStorage.setItem('lead_popup_dismissed', '1');
      sessionStorage.setItem('lead_popup_submitted', '1');
      return () => {
        if (dismissed) sessionStorage.setItem('lead_popup_dismissed', dismissed);
        else sessionStorage.removeItem('lead_popup_dismissed');
        if (submitted) sessionStorage.setItem('lead_popup_submitted', submitted);
        else sessionStorage.removeItem('lead_popup_submitted');
      };
    } catch {
      return undefined;
    }
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    const story = storyRef.current;
    if (!hero) return;
    const ratios = { hero: 1, story: 0 };
    const commit = () => {
      const next = ratios.story > 0.42 ? 'story' : ratios.hero > 0.28 ? 'hero' : 'none';
      setOwner((current) => (current === next ? current : next));
      setHeroLive(ratios.hero > 0.05);
    };
    const storyOnScreen = (rect: DOMRectReadOnly) => rect.top < window.innerHeight * 0.72 && rect.bottom > window.innerHeight * 0.22;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === hero) ratios.hero = entry.intersectionRatio;
          if (entry.target === story) ratios.story = storyOnScreen(entry.boundingClientRect) ? 1 : 0;
        });
        commit();
      },
      { threshold: [0, 0.05, 0.2, 0.45, 0.75] },
    );
    io.observe(hero);
    if (story) io.observe(story);
    return () => io.disconnect();
  }, [cinematic]);

  useEffect(() => {
    if (!cinematic) return;
    const node = storyRef.current;
    if (!node) return;
    let frame = 0;
    const beatNow = { beat: 0, concept: 0 };
    const measure = () => {
      const rect = node.getBoundingClientRect();
      const total = node.offsetHeight - window.innerHeight;
      const progress = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
      const storyVisible = rect.top < window.innerHeight * 0.72 && rect.bottom > window.innerHeight * 0.22;
      const heroRect = heroRef.current?.getBoundingClientRect();
      const heroVisible = !!heroRect && heroRect.bottom > 80 && heroRect.top < window.innerHeight * 0.75;
      const nextOwner = storyVisible ? 'story' : heroVisible ? 'hero' : 'none';
      setOwner((current) => (current === nextOwner ? current : nextOwner));
      setHeroLive(heroVisible);
      const scaled = Math.min(progress * ROOMS.length, ROOMS.length - 0.0001);
      const nextBeat = Math.floor(scaled);
      const nextConcept = Math.min(2, Math.floor((scaled - nextBeat) * 3));
      if (nextBeat !== beatNow.beat || nextConcept !== beatNow.concept) {
        beatNow.beat = nextBeat;
        beatNow.concept = nextConcept;
        setBeat(nextBeat);
        setConcept(nextConcept);
      }
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [cinematic]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const watch = (index: number) => {
    phoneRef.current?.goTo(index);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById('reel')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  };

  const room = ROOMS[cinematic ? beat : picked];
  const activeConcept = room.concepts[cinematic ? concept : 0];
  const reelClip = CLIPS[reel];

  const phone = (which: 'hero' | 'story') => (
    <StagePhone
      ref={which === 'hero' ? phoneRef : undefined}
      mode={which === 'hero' ? 'reel' : 'single'}
      size={which === 'hero' ? 'hero' : 'story'}
      clipIndex={which === 'story' ? room.clip : undefined}
      slate={{
        kicker: room.name,
        title: 'A skit we can write.',
        line: 'No footage of this room yet.',
      }}
      active={owner === which}
      reduced={reduced}
      onIndexChange={which === 'hero' ? onIndexChange : undefined}
    />
  );

  return (
    <div className="ix-page min-h-screen" data-motion={motion === 'reduce' ? 'reduce' : 'full'}>
      <a href="#proof" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[80] focus:bg-[#c6a15a] focus:px-4 focus:py-2 focus:text-[#1a1408]">
        Skip to the proof
      </a>

      <header className="ix-header">
        <Link href="/tickets" prefetch={false} className="ix-banner">
          <span>Nov 18</span>
          <span className="ix-banner-dot" aria-hidden />
          <span>Black &amp; Gold Soirée</span>
          <span className="hidden sm:inline ix-banner-dot" aria-hidden />
          <span className="hidden sm:inline">Serena Pastificio</span>
          <span className="ix-banner-go">Tickets</span>
        </Link>
        <nav className="ix-nav" aria-label="Primary">
          <button type="button" className="ix-nav-toggle md:hidden" aria-expanded={open} aria-controls="ix-menu" onClick={() => setOpen((value) => !value)}>
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            <span aria-hidden />
            <span aria-hidden />
          </button>
          <Link href="/" className="ix-logo">Influence</Link>
          <div className="hidden items-center gap-8 md:flex">
            {NAV.map((item) => (
              <a key={item.href} href={item.href} className="ix-nav-link">
                {item.label}
              </a>
            ))}
          </div>
          <Magnet href="#book">Book</Magnet>
        </nav>
      </header>

      {open && (
        <div id="ix-menu" className="ix-menu md:hidden">
          <div className="flex items-center justify-between">
            <p className="ix-logo">Influence</p>
            <button type="button" className="h-11 px-2 text-[11px] uppercase tracking-[0.2em]" onClick={() => setOpen(false)}>
              Close
            </button>
          </div>
          <div className="mt-8 flex flex-col">
            {NAV.map((item) => (
              <a key={item.href} href={item.href} className="ix-menu-link" onClick={() => setOpen(false)}>
                {item.label}
              </a>
            ))}
            <a href="#network" className="ix-menu-link" onClick={() => setOpen(false)}>Join</a>
            <Link href="/tickets" prefetch={false} className="ix-menu-quiet" onClick={() => setOpen(false)}>
              Nov 18 · Black &amp; Gold Soirée
            </Link>
          </div>
        </div>
      )}

      <main>
        <section id="reel" ref={heroRef} className="ix-hero" data-live={heroLive ? '1' : '0'}>
          <div className="ix-grain" aria-hidden />
          <div className="ix-motes" aria-hidden>
            <span /><span /><span /><span /><span />
          </div>
          <div className="ix-hero-grid">
            <div className="ix-hero-copy">
              <p className="ix-kicker">Influence for venues</p>
              <h1 className="ix-hero-title">
                <Words text="The right influencer," />
                <Words className="ix-hero-gold" text="for the room." start={280} />
              </h1>
              <p className="ix-hero-deck">
                A network matched to the niche. They film the skit in the room. You keep the content and the reach.
              </p>
            </div>
            <div className="ix-hero-stage">
              {phone('hero')}
              <p className="ix-hero-caption" aria-live="polite">
                <span>{reelClip.venue}</span>
                {reelClip.caption}
              </p>
            </div>
            <div className="ix-hero-actions">
              <Magnet href="#book">Book influencers</Magnet>
              <Magnet href="#network" variant="ghost">Join the network</Magnet>
            </div>
          </div>
        </section>

        <section id="proof" className="ix-chapter">
          <div className="ix-wrap">
            <Reveal>
              <p className="ix-kicker">Proof</p>
              <h2 className="ix-display">Three rooms. The skits are the record.</h2>
              <p className="ix-lede">
                Filmed by Deseray Marie. Prime Time. The DessertZ Food Truck. Oia, a Greek restaurant in Fort Lauderdale. Nothing else is claimed.
              </p>
            </Reveal>
            <div className="ix-proof">
              {VENUES.map((venue, venueIndex) => (
                <Reveal key={venue.id} delay={venueIndex * 70}>
                  <article className="ix-proof-card">
                    <div className="ix-proof-frame">
                      <img src={venue.poster} alt="" width={720} height={900} />
                    </div>
                    <div className="ix-proof-copy">
                      <p className="ix-kicker">0{venueIndex + 1} — {venue.detail}</p>
                      <h3>{venue.name}</h3>
                      <p>{venue.summary}</p>
                      <div className="ix-proof-actions">
                        {venue.clips.map((clipIndex, clipNumber) => (
                          <button key={clipIndex} type="button" onClick={() => watch(clipIndex)}>
                            {venue.clips.length > 1 ? `Play skit ${clipNumber + 1}` : 'Play the skit'}
                          </button>
                        ))}
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="ix-standard">
          <div className="ix-wrap">
            <Reveal>
              <p className="ix-kicker">The standard</p>
              <h2 className="ix-display ix-display-sm">Rooms with a dress code already.</h2>
              <p className="ix-lede">
                Serena Pastificio in Mizner Park. A night at iPic. That is the standard we book toward. They are not clients on this page, and they are not footage.
              </p>
            </Reveal>
          </div>
        </section>

        <section id="rooms" ref={storyRef} className={cinematic ? 'ix-story' : 'ix-story-stack'}>
          {cinematic ? (
            <div className="ix-story-pin">
              <span ref={barRef} className="ix-story-bar" aria-hidden />
              <div className="ix-story-grid">
                <div className="ix-story-copy">
                  <p className="ix-kicker">0{beat + 1} / 05 — scroll the room</p>
                  <h2 key={room.id} className="ix-story-title ix-swap">{room.name}</h2>
                  <p className="ix-story-lede">{room.lede}</p>
                  <ul className="ix-concepts">
                    {room.concepts.map((item, itemIndex) => (
                      <li key={item.title} className="ix-concept" data-on={itemIndex === concept ? '1' : '0'}>
                        <p className="ix-concept-title">{item.title}</p>
                        <p className="ix-concept-body">{item.text}</p>
                      </li>
                    ))}
                  </ul>
                  <p className="ix-screen-note">{room.screen}</p>
                </div>
                <div className="ix-story-stage">
                  {phone('story')}
                  <p className="ix-story-concept" aria-live="polite">{activeConcept.title}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="ix-wrap ix-stack-inner">
              <p className="ix-kicker">Rooms</p>
              <h2 className="ix-display">Five kinds of night.</h2>
              <p className="ix-lede">Tap a room. Where a skit exists, it waits for a tap before it plays.</p>
              <div className="ix-stack-phone">{phone('story')}</div>
              <p className="ix-screen-note">{room.screen}</p>
              <div className="ix-room-list">
                {ROOMS.map((item, itemIndex) => (
                  <article key={item.id} className={itemIndex === picked ? 'is-on' : ''}>
                    <button type="button" onClick={() => setPicked(itemIndex)}>
                      <span>0{itemIndex + 1}</span>
                      {item.name}
                    </button>
                    <p>{item.lede}</p>
                    <ul>
                      {item.concepts.map((entry) => (
                        <li key={entry.title}>
                          <strong>{entry.title}</strong>
                          {entry.text}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          )}
        </section>

        <section id="method" className="ix-chapter">
          <div className="ix-wrap">
            <Reveal>
              <p className="ix-kicker">How it works</p>
              <h2 className="ix-display">Four steps. Then the room is on camera.</h2>
            </Reveal>
            <ol className="ix-steps">
              {STEPS.map((step, stepIndex) => (
                <Reveal as="li" key={step.n} delay={stepIndex * 60}>
                  <p>{step.n}</p>
                  <h3>{step.title}</h3>
                  <span>{step.text}</span>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <section className="ix-close">
          <div className="ix-wrap ix-close-grid">
            <div id="book">
              <Reveal>
                <p className="ix-kicker">Book influencers</p>
                <h2 className="ix-display ix-display-sm">Tell us the venue.</h2>
                <p className="ix-lede">The niche decides the match. Send the room.</p>
                <div className="mt-8">
                  <BookForm />
                </div>
              </Reveal>
            </div>
            <div id="network">
              <Reveal>
                <p className="ix-kicker">Join the network</p>
                <h2 className="ix-display ix-display-sm">If you can hold a room.</h2>
                <p className="ix-lede">Creators who make skits for venues. Apply with the work.</p>
                <div className="mt-8">
                  <JoinForm />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="ix-soiree">
          <div className="ix-wrap">
            <p className="ix-kicker">Wednesday, November 18, 2026 · 4–7 PM ET</p>
            <h2 className="ix-display ix-display-sm">Black &amp; Gold Soirée</h2>
            <p className="ix-lede">
              Influence Connect. Serena Pastificio, 301 Plaza Real, Mizner Park, Boca Raton. Hosted by Deseray Marie. Ladies free RSVP. Gentlemen $25.
            </p>
            <Link href="/tickets" prefetch={false} className="ix-btn ix-btn-solid mt-8">
              Tickets
            </Link>
          </div>
        </section>
      </main>

      <footer className="ix-foot">
        <div className="ix-wrap ix-foot-grid">
          <div>
            <p className="ix-logo">Influence</p>
            <p>A network of influencers for restaurants, nightclubs, hotels, resorts, and lounges.</p>
          </div>
          <div className="ix-foot-links">
            <a href="tel:+15615520392">(561) 552-0392</a>
            <a href="mailto:influencemodelsagency@gmail.com">influencemodelsagency@gmail.com</a>
            <a href="https://www.instagram.com/itsdezmarie" target="_blank" rel="noopener noreferrer">Deseray Marie</a>
            <Link href="/tickets" prefetch={false}>Nov 18 · Black &amp; Gold Soirée</Link>
            <Link href="/talent">Talent roster</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
        <p className="ix-wrap ix-foot-note">© {new Date().getFullYear()} Influence · South Florida</p>
      </footer>
    </div>
  );
}
