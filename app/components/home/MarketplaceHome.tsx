'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CLIPS, ROOMS, STEPS, VENUES } from './clips';
import { BookForm, JoinForm } from './InquiryForms';
import Reveal from './Reveal';
import SkitPhone, { type SkitPhoneHandle } from './SkitPhone';

const NAV = [
  { href: '#work', label: 'The skits' },
  { href: '#venues', label: 'Venues' },
  { href: '#rooms', label: 'Who we serve' },
  { href: '#method', label: 'How it works' },
  { href: '#network', label: 'Join' },
];

export default function MarketplaceHome() {
  const phoneRef = useRef<SkitPhoneHandle>(null);
  const phoneWrap = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const onIndexChange = useCallback((next: number) => setActive(next), []);

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
    const node = phoneWrap.current;
    if (!node) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(min-width: 768px)').matches) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, 640);
        node.style.transform = `translate3d(0, ${y * 0.06}px, 0)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

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
    document.getElementById('work')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
  };

  const activeVenue = CLIPS[active]?.venueId;

  return (
    <div className="ix-page min-h-screen">
      <a href="#work" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[80] focus:bg-[#c6a15a] focus:px-4 focus:py-2 focus:text-[#1a1408]">
        Skip to the skits
      </a>

      <div className="sticky top-0 z-40 bg-[#070705]/95 pt-[env(safe-area-inset-top)] supports-[backdrop-filter]:backdrop-blur-md">
        <Link href="/tickets" prefetch={false} className="ix-banner flex min-h-11 items-center justify-center gap-3 px-4 py-2.5 text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] sm:tracking-[0.22em]">Nov 18 · Black & Gold Soirée</span>
          <span className="hidden text-[11px] font-medium uppercase tracking-[0.16em] md:inline">Serena Pastificio · Mizner Park</span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em]">Tickets</span>
        </Link>
        <nav className="flex h-14 items-center justify-between border-b border-[#c6a15a]/20 px-4 md:h-16 md:px-8" aria-label="Primary">
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center md:hidden"
            aria-expanded={open}
            aria-controls="ix-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            <span aria-hidden className="flex w-5 flex-col gap-1.5">
              <span className="block h-px w-full bg-[#f3e6c4]" />
              <span className="block h-px w-full bg-[#f3e6c4]" />
            </span>
          </button>
          <Link href="/" className="font-display text-[15px] uppercase tracking-[0.42em] text-[#f3e6c4] md:text-[16px]">
            Influence
          </Link>
          <div className="hidden items-center gap-7 md:flex">
            {NAV.map((item) => (
              <a key={item.href} href={item.href} className="ix-link text-[11px] uppercase tracking-[0.2em] text-[#f6f1e7]/70">
                {item.label}
              </a>
            ))}
          </div>
          <a href="#book" className="bg-[#c6a15a] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1a1408] md:px-4 md:text-[11px] md:tracking-[0.2em]">
            Book
          </a>
        </nav>
      </div>

      {open && (
        <div id="ix-menu" className="fixed inset-0 z-50 bg-[#070705] px-6 pt-[max(1.5rem,env(safe-area-inset-top))] md:hidden">
          <div className="flex items-center justify-between">
            <p className="font-display text-[15px] uppercase tracking-[0.42em] text-[#f3e6c4]">Influence</p>
            <button type="button" className="h-11 px-2 text-sm uppercase tracking-[0.18em] text-[#f6f1e7]" onClick={() => setOpen(false)}>
              Close
            </button>
          </div>
          <div className="mt-10 flex flex-col">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="border-t border-[#c6a15a]/20 py-4 font-display text-4xl italic text-[#f6f1e7]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a href="#book" className="border-t border-[#c6a15a]/20 py-4 font-display text-4xl italic text-[#f3e6c4]" onClick={() => setOpen(false)}>
              Book influencers
            </a>
            <Link href="/tickets" prefetch={false} className="border-y border-[#c6a15a]/20 py-4 text-[12px] uppercase tracking-[0.22em] text-[#c6a15a]" onClick={() => setOpen(false)}>
              Nov 18 · Black & Gold Soirée
            </Link>
          </div>
        </div>
      )}

      <main>
        <section id="work" className="relative overflow-hidden px-4 pb-14 pt-5 md:px-8 md:pb-28 md:pt-14">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 70% 55% at 78% 42%, rgba(198,161,90,0.16), transparent 62%), radial-gradient(ellipse 40% 30% at 8% 90%, rgba(198,161,90,0.08), transparent 70%)',
            }}
          />
          <p aria-hidden className="pointer-events-none absolute -right-6 top-24 hidden font-display text-[18vw] italic leading-none text-[#c6a15a]/[0.06] md:block">
            Influence
          </p>
          <div className="relative mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1.05fr_0.95fr] md:gap-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c6a15a]">The right influencer</p>
              <h1 className="mt-3 font-display font-medium leading-[0.88] tracking-[-0.02em]">
                <span className="md:hidden">
                  <span className="sr-only">The right influencer, </span>
                  <span className="ix-gold-text italic text-[clamp(52px,14vw,68px)]">For the room.</span>
                </span>
                <span className="hidden text-[clamp(40px,9.2vw,92px)] text-[#f6f1e7] md:block">
                  The right
                  <br />
                  influencer,
                  <br />
                  <span className="ix-gold-text italic">for the room.</span>
                </span>
              </h1>
              <p className="mt-5 hidden max-w-md text-[17px] leading-relaxed text-[#f6f1e7]/72 md:block">
                Influence is a network of influencers. We match restaurants, nightclubs, hotels, resorts, and lounges with creators who fit the niche. They shoot the skit. You get the content and the reach.
              </p>
              <p className="mt-4 hidden text-[13px] text-[#f6f1e7]/55 md:block">
                Proof, on camera. Skits by{' '}
                <a className="ix-link underline decoration-[#c6a15a]/50 underline-offset-4" href="https://www.instagram.com/itsdezmarie" target="_blank" rel="noopener noreferrer">
                  Deseray Marie
                </a>
                .
              </p>
              <div className="mt-7 hidden flex-wrap gap-3 md:flex">
                <a href="#book" className="inline-flex h-12 items-center bg-[#c6a15a] px-5 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#1a1408]">
                  Book influencers
                </a>
                <a href="#network" className="inline-flex h-12 items-center border border-[#c6a15a]/70 px-5 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#f3e6c4]">
                  Join the network
                </a>
              </div>
            </div>
            <div ref={phoneWrap} className="relative">
              <SkitPhone ref={phoneRef} onIndexChange={onIndexChange} />
            </div>
            <div className="md:hidden">
              <p className="text-[15px] leading-relaxed text-[#f6f1e7]/72">
                Influence is a network of influencers. We match restaurants, nightclubs, hotels, resorts, and lounges with creators who fit the niche. They shoot the skit. You get the content and the reach.
              </p>
              <p className="mt-3 text-[13px] text-[#f6f1e7]/55">
                Proof, on camera. Skits by{' '}
                <a className="ix-link underline decoration-[#c6a15a]/50 underline-offset-4" href="https://www.instagram.com/itsdezmarie" target="_blank" rel="noopener noreferrer">
                  Deseray Marie
                </a>
                .
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a href="#book" className="inline-flex h-12 items-center bg-[#c6a15a] px-5 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#1a1408]">
                  Book influencers
                </a>
                <a href="#network" className="inline-flex h-12 items-center border border-[#c6a15a]/70 px-5 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#f3e6c4]">
                  Join the network
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="venues" className="border-t border-[#c6a15a]/20 px-4 py-16 md:px-8 md:py-28">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c6a15a]">Venues we&apos;ve worked with</p>
              <h2 className="mt-3 max-w-3xl font-display text-[clamp(36px,6vw,72px)] font-medium leading-[0.92] text-[#f6f1e7]">
                Three rooms. The skits are the record.
              </h2>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#f6f1e7]/65">
                Prime Time. The DessertZ Food Truck. Oia, a Greek restaurant in Fort Lauderdale. Filmed by Deseray Marie.
              </p>
            </Reveal>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {VENUES.map((venue, venueIndex) => {
                const selected = activeVenue === venue.id;
                return (
                  <Reveal key={venue.id} delay={venueIndex * 80}>
                    <article className={`flex h-full flex-col border ${selected ? 'border-[#c6a15a]' : 'border-[#c6a15a]/25'} bg-[#0c0c09]`}>
                      <img src={venue.poster} alt="" width={720} height={900} className="h-64 w-full object-cover md:h-72" />
                      <div className="flex flex-1 flex-col p-5">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#c6a15a]">{venue.detail}</p>
                        <h3 className="mt-2 font-display text-4xl italic text-[#f6f1e7]">{venue.name}</h3>
                        <p className="mt-3 flex-1 text-sm leading-relaxed text-[#f6f1e7]/68">{venue.summary}</p>
                        <div className="mt-5 flex flex-wrap gap-2">
                          {venue.clips.map((clipIndex, clipNumber) => (
                            <button
                              key={clipIndex}
                              type="button"
                              onClick={() => watch(clipIndex)}
                              className="h-11 border border-[#c6a15a]/40 px-3 text-[11px] uppercase tracking-[0.16em] text-[#f3e6c4]"
                            >
                              {venue.clips.length > 1 ? `Skit ${clipNumber + 1}` : 'Watch the skit'}
                            </button>
                          ))}
                        </div>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section id="rooms" className="border-t border-[#c6a15a]/20 px-4 py-16 md:px-8 md:py-28">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c6a15a]">Who we serve</p>
              <h2 className="mt-3 max-w-3xl font-display text-[clamp(36px,6vw,72px)] font-medium leading-[0.92] text-[#f6f1e7]">
                Rooms that already have a standard.
              </h2>
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[#f6f1e7]/68">
                A dining room on the order of Serena Pastificio in Mizner Park. A night at iPic. A hotel lobby, a resort path, a lounge with a dress code. These are skit concepts we can shoot for a room like yours.
              </p>
            </Reveal>
            <div className="mt-12">
              {ROOMS.map((room, roomIndex) => (
                <Reveal key={room.id}>
                  <article className="border-t border-[#c6a15a]/25 py-10 md:grid md:grid-cols-[0.7fr_1.3fr] md:gap-10 md:py-14">
                    <div>
                      <p className="font-display text-sm tracking-[0.28em] text-[#c6a15a]">0{roomIndex + 1}</p>
                      <h3 className="mt-2 font-display text-[clamp(40px,6vw,68px)] italic leading-none text-[#f6f1e7]">{room.name}</h3>
                      <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#f6f1e7]/65">{room.lede}</p>
                    </div>
                    <ul className="mt-8 space-y-6 md:mt-2">
                      {room.concepts.map((concept) => (
                        <li key={concept.title} className="border-l border-[#c6a15a]/40 pl-4">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f3e6c4]">{concept.title}</p>
                          <p className="mt-2 text-[15px] leading-relaxed text-[#f6f1e7]/75">{concept.text}</p>
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="method" className="border-t border-[#c6a15a]/20 px-4 py-16 md:px-8 md:py-28">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c6a15a]">How it works</p>
              <h2 className="mt-3 font-display text-[clamp(36px,6vw,72px)] font-medium leading-[0.92] text-[#f6f1e7]">
                Four steps. Then the room is on camera.
              </h2>
            </Reveal>
            <ol className="mt-12 grid gap-8 md:grid-cols-4 md:gap-6">
              {STEPS.map((step, stepIndex) => (
                <Reveal as="li" key={step.n} delay={stepIndex * 70} className="relative h-full border-t border-[#c6a15a] pt-5">
                  <p className="font-display text-3xl italic text-[#c6a15a]">{step.n}</p>
                  <h3 className="mt-3 font-display text-[28px] italic leading-tight text-[#f6f1e7]">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#f6f1e7]/68">{step.text}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-t border-[#c6a15a]/20 px-4 py-16 md:px-8 md:py-28">
          <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2 lg:gap-20">
            <div id="book">
              <Reveal>
                <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c6a15a]">Book influencers</p>
                <h2 className="mt-3 font-display text-[clamp(36px,5vw,60px)] italic leading-[0.92] text-[#f6f1e7]">Tell us the venue.</h2>
                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#f6f1e7]/68">
                  The niche decides the match. Send the room. We reply with the influencers who fit it.
                </p>
                <div className="relative mt-8">
                  <BookForm />
                </div>
              </Reveal>
            </div>
            <div id="network">
              <Reveal>
                <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c6a15a]">Join the network</p>
                <h2 className="mt-3 font-display text-[clamp(36px,5vw,60px)] italic leading-[0.92] text-[#f6f1e7]">If you can hold a room.</h2>
                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#f6f1e7]/68">
                  Creators who make skits for venues, not slideshows. Apply with the work. We book from this network.
                </p>
                <div className="relative mt-8">
                  <JoinForm />
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#c6a15a]/20 px-4 pb-28 pt-12 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-[15px] uppercase tracking-[0.42em] text-[#f3e6c4]">Influence</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#f6f1e7]/55">
              A network of influencers for restaurants, nightclubs, hotels, resorts, and lounges.
            </p>
          </div>
          <div className="flex flex-col gap-3 text-[12px] uppercase tracking-[0.16em] text-[#f6f1e7]/60">
            <a className="ix-link" href="tel:+15615520392">(561) 552-0392</a>
            <a className="ix-link" href="mailto:influencemodelsagency@gmail.com">influencemodelsagency@gmail.com</a>
            <a className="ix-link" href="https://www.instagram.com/influencecreators.marketing" target="_blank" rel="noopener noreferrer">Instagram</a>
            <Link className="ix-link" href="/tickets" prefetch={false}>Nov 18 · Black & Gold Soirée</Link>
            <Link className="ix-link" href="/terms">Terms</Link>
          </div>
        </div>
        <p className="mx-auto mt-10 max-w-6xl text-[11px] uppercase tracking-[0.18em] text-[#f6f1e7]/35">© {new Date().getFullYear()} Influence · South Florida</p>
      </footer>
    </div>
  );
}
