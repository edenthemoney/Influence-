import Link from 'next/link';
import type { Metadata } from 'next';
import HeroBooking from './components/HeroBooking';
import HomeFAQ from './components/HomeFAQ';
import { BOOK_HREF, GOLD } from './_home/Chrome';
import { ChevronRight } from 'lucide-react';
import MobileNav from './components/MobileNav';
import HeroVideo from './components/HeroVideo';
import { Ticker } from './_home/Sections';
import BusinessStage from './_home/BusinessStage';
import { CurtainNav, Hair, LiveTiles, LuxCursor, LuxeBoot, LuxeFooter, ReelBand, RosterMag, ScrubScene, SectionHead, SplitBrandsCreators } from './_home/Luxe';
import L from './_home/Luxe.module.css';
import BgDrone from './_home/BgDrone';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Influence',
  alternateName: 'Influence',
  url: 'https://influencecreators.marketing',
  logo: 'https://influencecreators.marketing/favicon.svg',
  description: 'South Florida creator marketplace and creator marketing platform. Connect with independent creators and influencers for UGC, music promotion, brand campaigns, event activations, and creator-led social media campaigns.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Miami',
    addressRegion: 'FL',
    addressCountry: 'US',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-561-287-7194',
    contactType: 'sales',
  },
  sameAs: [
    'https://www.instagram.com/influencecreators.marketing',
  ],
  serviceType: ['Creator Marketplace', 'Creator Marketing', 'UGC Content Creation', 'Music Promotion', 'Brand Campaigns', 'Event Marketing', 'Social Media Campaigns'],
};

export const metadata: Metadata = {
  title: { absolute: "Miami Creator Marketplace & Creator Marketing Platform | Influence" },
  description: "South Florida creator marketplace and creator marketing platform. Connect with independent creators and influencers for UGC, music videos, brand campaigns, events, and social media campaigns in Miami, Fort Lauderdale, Boca Raton, Palm Beach.",
  openGraph: {
    title: "Miami Creator Marketplace & Creator Marketing Platform",
    description: "South Florida creator marketplace and creator marketing platform. Connect with creators for UGC, music videos, brand campaigns, events, and social media campaigns.",
    url: "https://influencecreators.marketing",
  },
};

// Homepage (was preview option E): the live cinematic hero, then a phone that shows the visitor's own
// business running an example Influence campaign.
export default function HomePage() {
  return (
    <div className={`min-h-screen bg-[#080808] text-white ${L.page}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <LuxeBoot />
      <CurtainNav />
      <LuxCursor />
      {/* Header + hero: identical to the live site (bb2d0d6). */}
      <nav className="border-b border-white/[0.06] bg-[#080808]/95 backdrop-blur-xl fixed w-full z-50">
        <div className="grid grid-cols-3 items-center h-16 md:h-24 px-6 md:px-14">
          <div className="flex items-center gap-4">
            <MobileNav />
            <div className="hidden md:flex items-center gap-10">
              <Link href="/marketplace" className="text-white/55 hover:text-white transition-colors duration-300 text-[11px] tracking-widest uppercase">Creators</Link>
              <Link href="/services" className="text-white/55 hover:text-white transition-colors duration-300 text-[11px] tracking-widest uppercase">Services</Link>
              <Link href="/pricing" className="text-white/55 hover:text-white transition-colors duration-300 text-[11px] tracking-widest uppercase">Pricing</Link>
            </div>
          </div>
          <div className="flex justify-center">
            <Link href="/" className="font-display font-semibold tracking-[0.4em] uppercase" style={{ fontSize: '18px', color: '#c9a96e' }}>Influence</Link>
          </div>
          <div className="flex items-center justify-end gap-3 md:gap-10">
            <Link href="/about" className="text-white/55 hover:text-white transition-colors duration-300 text-[11px] tracking-widest uppercase hidden md:block">About</Link>
            <Link href="/start" className="text-[11px] md:text-[12px] tracking-widest uppercase px-5 py-3 md:px-8 md:py-4 transition-all duration-300 hover:opacity-80 font-bold" style={{ backgroundColor: '#c9a96e', color: '#000' }}>Start a Campaign</Link>
          </div>
        </div>
        <div className="overflow-hidden border-t border-white/[0.05]">
          <div className="flex whitespace-nowrap py-2 md:py-4" style={{ animation: 'ticker-left 50s linear infinite' }}>
            {[...Array(6)].map((_, i) => (
              <span key={i} className="shrink-0 text-white font-heading tracking-[0.15em] pr-10 md:pr-20" style={{ fontSize: 'clamp(20px, 5.5vw, 52px)' }}>
                Sean Paul &nbsp;&middot;&nbsp; Kai Cenat &nbsp;&middot;&nbsp; Bryson Tiller &nbsp;&middot;&nbsp; Akon &nbsp;&middot;&nbsp; Moneybagg Yo &nbsp;&middot;&nbsp; Lil Pump &nbsp;&middot;&nbsp; 6ix9ine &nbsp;&middot;&nbsp; Bossman Dlow &nbsp;&middot;&nbsp; Vybz Kartel &nbsp;&middot;&nbsp; DaBaby &nbsp;&middot;&nbsp; Mike Tyson &nbsp;&middot;&nbsp; Forbes &nbsp;&middot;&nbsp; Fenty Beauty &nbsp;&middot;&nbsp; Tyra Banks &nbsp;&middot;&nbsp; Keke Palmer &nbsp;&middot;&nbsp; Netflix &nbsp;&middot;&nbsp; Audible &nbsp;&middot;&nbsp; Peacock &nbsp;&middot;&nbsp; Target &nbsp;&middot;&nbsp; Celsius &nbsp;&middot;&nbsp; Red Stripe &nbsp;&middot;&nbsp; Miami Swim Week &nbsp;
              </span>
            ))}
          </div>
        </div>
      </nav>

      <section className="h-[70vh] md:h-screen relative overflow-hidden">
        <HeroVideo />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/10 to-black/50" />

        {/* Top-left eyebrow */}
        <div className="absolute top-28 md:top-48 left-8 md:left-16 flex items-center gap-4">
          <div className="w-8 h-px" style={{ backgroundColor: '#c9a96e' }} />
          <p className="text-white/60 text-[11px] tracking-[0.4em] uppercase font-medium">Creator Marketplace & Creator Marketing</p>
        </div>

        {/* Bottom — two column */}
        <div className="absolute bottom-0 left-0 right-0 px-8 md:px-16 pb-10 md:pb-14 flex items-end justify-between gap-10">
          {/* Left: Headline */}
          <div className="shrink-0">
            <h1 className="sr-only">
              Miami Creator Marketplace & Creator Marketing Platform — Connect with Creators, Influencers & On-Camera Creators in South Florida
            </h1>
            <p className="font-display font-bold italic text-white leading-[0.85]" style={{ fontSize: 'clamp(44px, 10vw, 140px)' }}>
              Go Viral.<br />
              Make an<br />
              <span style={{ color: '#c9a96e' }}>Influence.</span>
            </p>
            <div className="mt-6 flex items-center gap-4 md:hidden">
              <Link href="/start" className="inline-flex items-center gap-3 px-8 py-4 text-[13px] font-bold tracking-widest uppercase" style={{ backgroundColor: '#c9a96e', color: '#000' }}>
                Start a Campaign <ChevronRight className="h-4 w-4" />
              </Link>
              <span className="text-white/30 text-xs">Same-week availability</span>
            </div>
          </div>

          {/* Right: Interactive booking widget */}
          <div className="w-full md:w-[520px] shrink-0 hidden md:block">
            <HeroBooking />
          </div>
        </div>
      </section>

      <Ticker />

      <ScrubScene />

      <section id="stage" className="relative overflow-clip bg-[#080808] px-5 pb-16 pt-4 md:px-16 md:py-24" style={{ contain: 'paint' }}>
        <BusinessStage />
      </section>

      <ReelBand />

      <section id="what-we-book" className={`${L.tex} py-16 md:py-24`}>
        <BgDrone d="brickell" />
        <div className="px-5 md:px-16"><SectionHead n="01" eyebrow="What we book" lines={['Five ways to work', 'with Influence.']} gold="with Influence." /></div>
        <LiveTiles />
      </section>

      <Hair />

      <section id="roster" className={`${L.tex} py-16 md:py-24`}>
        <BgDrone d="pools" m="aptpool" opacity={0.26} />
        <div className="flex flex-col gap-5 px-5 md:flex-row md:items-end md:justify-between md:px-16">
          <div className="md:w-2/3"><SectionHead n="02" eyebrow="Brand Ambassadors & creators" lines={['The roster.']} gold="The roster." /></div>
          <Link href="/marketplace" className="self-start text-[14px] font-semibold uppercase tracking-[0.16em] text-white underline decoration-[#c9a96e] underline-offset-[6px] md:self-auto">See everyone</Link>
        </div>
        <div className="mt-10"><RosterMag /></div>
      </section>

      <Hair />

      <section className={`${L.tex} px-5 pt-16 md:px-16 md:pt-24`}>
        <BgDrone d="skyline" />
        <SectionHead n="03" eyebrow="Two sides of Influence" lines={['Brands book.', 'Creators get booked.']} />
      </section>
      <div className="mt-10"><SplitBrandsCreators /></div>

      <section className={`${L.tex} overflow-hidden px-5 py-16 md:px-16 md:py-28`}>
        <BgDrone d="waterfront" opacity={0.36} />
        <SectionHead n="04" eyebrow="Book talent" lines={['Tell us the date', 'and what you need.']} gold="and what you need." shader />
        <p className="relative mt-6 max-w-xl text-[17px] leading-relaxed text-white/85">Tell us the date, the city, and the kind of night or shoot. We reply by text or call.</p>
        <div className="relative mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href={BOOK_HREF} data-magnet className={`${L.btn} ${L.btnGold} inline-flex min-h-14 items-center justify-center px-8 text-[15px] font-bold uppercase tracking-[0.1em]`} style={{ backgroundColor: GOLD, color: '#000' }}>Start a booking</Link>
          <a href="tel:+15612877194" className={`${L.btn} ${L.btnGold} inline-flex min-h-14 items-center justify-center border border-white/40 px-8 text-[15px] font-bold uppercase tracking-[0.1em] text-white`}>Call (561) 287-7194</a>
        </div>
        <div className="relative mt-12 max-w-xl"><HeroBooking /></div>
      </section>

      <HomeFAQ />
      <LuxeFooter />
    </div>
  );
}
