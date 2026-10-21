import Link from 'next/link';
import type { Metadata } from 'next';
import HeroBooking from './components/HeroBooking';
import HomeFAQ from './components/HomeFAQ';
import HeroLite from './_home/HeroLite';
import { BOOK_HREF, GOLD, PreviewNav } from './_home/Chrome';
import { Ticker } from './_home/Sections';
import { ScrollCue } from './_home/Reveal';
import BusinessStage from './_home/BusinessStage';
import { CurtainNav, Hair, LiveTiles, LuxCursor, LuxeBoot, LuxeFooter, ReelBand, RosterMag, ScrubScene, SectionHead, SplitBrandsCreators } from './_home/Luxe';
import L from './_home/Luxe.module.css';

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
      <PreviewNav variant="E" />

      <section data-hero className="relative h-[100svh] min-h-[600px] overflow-hidden">
        <HeroLite />
        {/* One plain overlay (two gradients, no blend modes or filters) so only one layer sits on the video. */}
        <div className={`absolute inset-0 ${L.heroShade}`} />
        <div className={`absolute inset-0 ${L.heroVignette}`} />
        <div className="relative flex h-full flex-col px-5 pb-4 pt-20 md:px-16 md:pb-10 md:pt-28">
          <div className="flex items-center gap-4">
            <span className="h-px w-8 shrink-0" style={{ backgroundColor: GOLD }} />
            <p className="text-[13px] font-semibold uppercase tracking-[0.18em]">For venues, brands, and creators</p>
          </div>
          <div className={`mt-[calc(14svh-18px)] max-w-3xl md:mt-auto ${L.heroIn}`}>
            <h1 className="sr-only">Go Viral. Make an Influence. We match venues and brands with Brand Ambassadors and influencers.</h1>
            <p aria-hidden className={`font-display font-bold italic leading-[0.85] ${L.headTight}`} style={{ fontSize: 'clamp(50px, 9vw, 128px)' }}>
              Go Viral.<br />Make an<br /><span className={L.goldSheen} style={{ color: GOLD }}>Influence.</span>
            </p>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-white md:text-[19px]">
              We match venues and brands with Brand Ambassadors and influencers for events, campaigns, and content.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href={BOOK_HREF} data-magnet className={`${L.btn} ${L.btnGold} inline-flex min-h-14 items-center justify-center px-7 text-[15px] font-bold uppercase tracking-[0.08em]`} style={{ backgroundColor: GOLD, color: '#000' }}>
                Book Talent
              </Link>
              <Link href="/join" className={`${L.btnGhost} inline-flex min-h-14 items-center justify-center border border-white px-7 text-[15px] font-bold uppercase tracking-[0.08em] text-white`}>
                I&apos;m a Creator
              </Link>
            </div>
            <div className="mt-2 flex justify-center md:justify-start"><ScrollCue href="#stage" label="See it on the feed" still /></div>
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
        <div className="px-5 md:px-16"><SectionHead n="01" eyebrow="What we book" lines={['Five ways to work', 'with Influence.']} gold="with Influence." /></div>
        <LiveTiles />
      </section>

      <Hair />

      <section id="roster" className={`${L.tex} py-16 md:py-24`}>
        <div className="flex flex-col gap-5 px-5 md:flex-row md:items-end md:justify-between md:px-16">
          <div className="md:w-2/3"><SectionHead n="02" eyebrow="Brand Ambassadors & creators" lines={['The roster.']} gold="The roster." /></div>
          <Link href="/marketplace" className="self-start text-[14px] font-semibold uppercase tracking-[0.16em] text-white underline decoration-[#c9a96e] underline-offset-[6px] md:self-auto">See everyone</Link>
        </div>
        <div className="mt-10"><RosterMag /></div>
      </section>

      <Hair />

      <section className={`${L.tex} px-5 pt-16 md:px-16 md:pt-24`}>
        <SectionHead n="03" eyebrow="Two sides of Influence" lines={['Brands book.', 'Creators get booked.']} />
      </section>
      <div className="mt-10"><SplitBrandsCreators /></div>

      <section className={`${L.tex} overflow-hidden px-5 py-16 md:px-16 md:py-28`}>
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
