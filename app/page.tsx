import Link from 'next/link';
import type { Metadata } from 'next';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import HeroBooking from './components/HeroBooking';
import FloatingBooking from './components/FloatingBooking';
import MobileNav from './components/MobileNav';
import HeroVideo from './components/HeroVideo';
import { verifiedPartners } from '@/data/partners';
import { serviceLineup } from '@/data/service-lineup';
import portraitBlur from '@/data/portrait-blur.json';

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

const tickerFallback = ['Restaurants', 'Nightclubs', 'Hotels & Resorts', 'Brands', 'Events', 'Brand Ambassadors'];

const ambassadors = [
  { name: 'Deseray Marie', image: '/images/Des/IMG_3412.JPG', position: 'center 15%', meta: 'HOST', host: true },
  { name: 'Genesis Bravo', image: '/images/GenesisBravo/genesis-1.jpg', position: 'center 18%', meta: 'Brand Ambassador' },
  { name: 'Seahra Raquel', image: '/images/Seahra/seahra-2.jpg', position: 'center 42%', meta: 'Brand Ambassador' },
  { name: 'Kat', image: '/images/Kat/kat-6.jpg', position: 'center 35%', meta: 'Brand Ambassador' },
  { name: 'Ferrari', image: '/images/Ferrari/ferrari-2.jpg', position: 'center 10%', meta: 'Brand Ambassador' },
  { name: 'Alisha', image: '/images/Alisha/alisha-5.jpg', position: 'center 16%', meta: 'Brand Ambassador' },
];

type BlurEntry = { blur: string; color: string };
const blurs = portraitBlur as Record<string, BlurEntry>;

export default function HomePage() {
  const tickerNames = verifiedPartners.map((partner) => partner.name);
  const tickerItems = tickerNames.length > 0 ? tickerNames : tickerFallback;
  return (
    <div className="min-h-screen bg-[#080808]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <FloatingBooking />
      <nav className="border-b border-white/[0.06] bg-[#080808]/95 backdrop-blur-xl fixed w-full z-50">
        <div className="flex items-center justify-between gap-2 h-16 md:h-20 px-3 md:px-14">
          <div className="flex items-center gap-3 min-w-0">
            <MobileNav />
            <div className="hidden md:flex items-center gap-8">
              <Link href="/marketplace" className="text-white/90 hover:text-white transition-colors duration-300 text-[13px] tracking-[0.14em] uppercase">Creators</Link>
              <Link href="/services" className="text-white/90 hover:text-white transition-colors duration-300 text-[13px] tracking-[0.14em] uppercase">Services</Link>
              <Link href="/pricing" className="text-white/90 hover:text-white transition-colors duration-300 text-[13px] tracking-[0.14em] uppercase">Pricing</Link>
            </div>
          </div>
          <Link href="/" className="shrink-0 whitespace-nowrap font-display font-semibold tracking-[0.4em] uppercase text-[#c9a96e]" style={{ fontSize: '18px' }}>Influence</Link>
          <div className="flex items-center justify-end gap-2 md:gap-8 shrink-0">
            <Link href="/about" className="text-white/90 hover:text-white transition-colors duration-300 text-[13px] tracking-[0.14em] uppercase hidden md:block">About</Link>
            <Link href="/start" className="text-[13px] tracking-[0.12em] uppercase px-2.5 py-2.5 md:px-8 md:py-4 transition-all duration-300 hover:opacity-80 font-bold whitespace-nowrap" style={{ backgroundColor: '#c9a96e', color: '#000' }}>
              <span className="md:hidden">Start</span>
              <span className="hidden md:inline">Start a Campaign</span>
            </Link>
          </div>
        </div>
      </nav>

      <section data-hero className="h-[78vh] md:h-screen relative overflow-hidden">
        <HeroVideo />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-black/40" />

        <div className="absolute top-16 md:top-20 left-0 right-0 z-20 overflow-hidden border-y border-white/10 bg-black/55">
          <div className="flex whitespace-nowrap py-2" style={{ animation: 'ticker-left 50s linear infinite' }}>
            {[...Array(6)].map((_, i) => (
              <span key={i} className="shrink-0 text-white font-heading tracking-[0.12em] pr-10 text-[18px]">
                {tickerItems.join('  ·  ')}&nbsp;&nbsp;·&nbsp;&nbsp;
              </span>
            ))}
          </div>
        </div>

        <div className="absolute top-32 md:top-44 left-5 md:left-16 flex items-center gap-4 max-w-[90%]">
          <div className="w-8 h-px shrink-0" style={{ backgroundColor: '#c9a96e' }} />
          <p className="text-white text-[13px] tracking-[0.18em] uppercase font-semibold">For venues, brands, and creators</p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 px-5 md:px-16 pb-8 md:pb-14 flex items-end justify-between gap-8">
          <div className="min-w-0 max-w-3xl">
            <h1 className="sr-only">
              Go Viral. Make an Influence. We match venues and brands with Brand Ambassadors and influencers.
            </h1>
            <p className="font-display font-bold italic text-white leading-[0.85]" style={{ fontSize: 'clamp(44px, 9vw, 120px)' }}>
              Go Viral.<br />
              Make an<br />
              <span style={{ color: '#c9a96e' }}>Influence.</span>
            </p>
            <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-white md:text-[18px]">
              We match venues and brands with Brand Ambassadors and influencers for events, campaigns, and content.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/start" className="inline-flex min-h-12 items-center justify-center px-5 text-[15px] font-bold tracking-[0.08em] uppercase" style={{ backgroundColor: '#c9a96e', color: '#000' }}>
                I&apos;m a Brand / Venue
              </Link>
              <Link href="/join" className="inline-flex min-h-12 items-center justify-center border border-white px-5 text-[15px] font-bold tracking-[0.08em] uppercase text-white">
                I&apos;m a Creator
              </Link>
            </div>
          </div>

          <div className="w-full md:w-[420px] shrink-0 hidden lg:block">
            <HeroBooking />
          </div>
        </div>
      </section>

      <section id="ambassadors" className="bg-[#080808] border-t border-white/10 px-5 py-12 md:px-16 md:py-16" aria-label="Brand Ambassadors">
        <div className="mb-8 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.18em]" style={{ color: '#c9a96e' }}>The roster</p>
            <h2 className="mt-2 font-display font-bold italic text-white leading-none" style={{ fontSize: 'clamp(36px, 6vw, 72px)' }}>Brand Ambassadors</h2>
          </div>
          <Link href="/marketplace" className="text-[16px] font-semibold text-white underline decoration-[#c9a96e] underline-offset-4">
            View the roster
          </Link>
        </div>
        <div
          className="flex snap-x snap-mandatory items-end gap-4 overflow-x-auto px-5 pb-2 -mx-5 scroll-px-5 md:mx-0 md:grid md:w-full md:grid-cols-7 md:items-end md:gap-4 md:overflow-visible md:px-0"
          style={{ scrollPaddingInline: '20px' }}
        >
          {ambassadors.map((person) => {
            const blur = blurs[person.image];
            return (
              <Link
                key={person.name}
                href="/marketplace"
                className={`snap-start shrink-0 ${person.host ? 'w-[78vw] max-w-[420px] md:col-span-2 md:w-auto md:max-w-none' : 'w-[64vw] max-w-[280px] md:col-span-1 md:w-auto md:max-w-none'}`}
              >
                <div className="relative aspect-[4/5] overflow-hidden border border-white/10" style={{ backgroundColor: blur?.color || '#1a1a1a', borderColor: person.host ? '#c9a96e' : undefined }}>
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    placeholder={blur ? 'blur' : 'empty'}
                    blurDataURL={blur?.blur}
                    className="object-cover"
                    style={{ objectPosition: person.position }}
                    sizes={person.host ? '(min-width: 768px) 34vw, 78vw' : '(min-width: 768px) 16vw, 64vw'}
                  />
                </div>
                <p className="mt-3 text-[13px] font-semibold uppercase tracking-[0.16em]" style={{ color: '#c9a96e' }}>{person.meta}</p>
                <p className="mt-1 font-display text-[22px] font-semibold leading-none text-white md:text-[26px]">{person.name}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section id="services" className="bg-[#080808] border-t border-white/10 px-5 py-14 md:px-16 md:py-20">
        <p className="text-[13px] font-semibold uppercase tracking-[0.18em]" style={{ color: '#c9a96e' }}>Services</p>
        <h2 className="mt-3 max-w-3xl font-display font-bold italic text-white leading-[0.95]" style={{ fontSize: 'clamp(36px, 6vw, 72px)' }}>
          Everything we book.
        </h2>
        <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-white/85">
          The full lineup: talent, content, music, venues, and events.
        </p>
        <div className="mt-12 space-y-12">
          {serviceLineup.map((group) => (
            <div key={group.id}>
              <h3 className="font-display text-[22px] font-semibold italic text-[#c9a96e] md:text-[28px]">{group.label}</h3>
              <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {group.items.map((service) => (
                  <Link key={service.title} href={service.href} className="flex flex-col border border-white/10 p-6 hover:border-[#c9a96e]/50">
                    <h4 className="font-display text-[24px] font-semibold leading-tight text-white">{service.title}</h4>
                    <p className="mt-3 text-[16px] leading-relaxed text-white/85">{service.line}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.14em]" style={{ color: '#c9a96e' }}>
                      Book <ChevronRight className="h-4 w-4" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="who" className="bg-[#080808] border-t border-white/10 px-5 py-14 md:px-16 md:py-20">
        <p className="text-[13px] font-semibold uppercase tracking-[0.18em]" style={{ color: '#c9a96e' }}>Who it&apos;s for</p>
        <h2 className="mt-3 font-display font-bold italic text-white leading-[0.95]" style={{ fontSize: 'clamp(36px, 6vw, 72px)' }}>
          Venues, brands, artists, and events.
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            { kicker: 'Venues', title: 'Restaurants, clubs, and hotels', line: 'Ambassadors and hosts for the room, the night, or the activation.', href: '/services/events' },
            { kicker: 'Brands', title: 'Products and fashion', line: 'Campaigns, shoots, and content you can publish.', href: '/influencer-campaigns' },
            { kicker: 'Artists', title: 'Music and video', line: 'Casts for videos, plus posts and reactions for a release.', href: '/music-video-creators' },
            { kicker: 'Events', title: 'Parties and networking', line: 'Staff for the night, or a ticketed creator meetup.', href: '/event-creators' },
          ].map((item) => (
            <Link key={item.title} href={item.href} className="flex flex-col border border-white/10 p-6 hover:border-[#c9a96e]/50">
              <p className="text-[13px] font-semibold uppercase tracking-[0.16em]" style={{ color: '#c9a96e' }}>{item.kicker}</p>
              <h3 className="mt-3 font-display text-[26px] font-semibold leading-tight text-white">{item.title}</h3>
              <p className="mt-3 text-[16px] leading-relaxed text-white/85">{item.line}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.14em]" style={{ color: '#c9a96e' }}>
                Get started <ChevronRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-[#080808] border-t border-white/10 px-5 py-14 md:px-16" aria-label="Miami drone footage">
        <div className="mx-auto max-w-6xl">
          <p className="text-[13px] font-semibold uppercase tracking-[0.18em]" style={{ color: '#c9a96e' }}>South Florida</p>
          <h2 className="mt-3 font-display font-bold italic text-white leading-[0.95]" style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}>
            Drone footage from Miami.
          </h2>
          <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-white/85">
            4K footage shot over South Florida. This is the kind of coverage we film for venues and brands.
          </p>
          <div className="relative mt-8 aspect-video w-full overflow-hidden bg-black">
            <video autoPlay muted loop playsInline poster="/videos/drone/drone-miami-01.jpg" className="absolute inset-0 h-full w-full object-cover">
              <source src="/videos/drone/drone-miami-01.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      <section id="book" className="border-t border-white/10 bg-[#060606] px-5 py-16 md:px-16 md:py-24">
        <p className="text-[13px] font-semibold uppercase tracking-[0.18em]" style={{ color: '#c9a96e' }}>How to book</p>
        <h2 className="mt-4 font-display font-semibold italic text-white leading-[1.05]" style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}>
          Tell us the date<br />and what you need.
        </h2>
        <div className="mt-8 max-w-xl">
          <Link href="/start" className="inline-flex items-center gap-3 px-8 py-4 text-[15px] font-bold uppercase tracking-[0.08em]" style={{ backgroundColor: '#c9a96e', color: '#000' }}>
            Start a booking <ChevronRight className="h-4 w-4" />
          </Link>
          <p className="mt-4 text-[16px] leading-relaxed text-white/85">Packages for venues, brands, and creators.</p>
        </div>
        <div className="mt-10 max-w-xl lg:hidden">
          <HeroBooking />
        </div>
      </section>

      <section id="join" className="border-t border-white/10 bg-[#080808] px-5 py-16 md:px-16 md:py-24">
        <p className="text-[13px] font-semibold uppercase tracking-[0.18em]" style={{ color: '#c9a96e' }}>Creators</p>
        <h2 className="mt-4 font-display font-bold italic text-white leading-[0.95]" style={{ fontSize: 'clamp(36px, 6vw, 72px)' }}>
          Join the roster.
        </h2>
        <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-white/85">
          Brand Ambassadors and influencers: send your info and the kinds of jobs you want.
        </p>
        <Link href="/join" className="mt-8 inline-flex items-center gap-3 border border-white px-8 py-4 text-[15px] font-bold uppercase tracking-[0.08em] text-white">
          Apply to join <ChevronRight className="h-4 w-4" />
        </Link>
      </section>

      <section className="border-t border-black/10 bg-white px-5 py-16 md:px-16 md:py-28">
        <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-black/80">Ready to book?</p>
        <h2 className="mt-6 font-display font-bold italic leading-[0.9] text-black" style={{ fontSize: 'clamp(44px, 8vw, 88px)' }}>
          Start with the service you need.
        </h2>
        <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-black/80">Pick a service and tell us the date. Call if you want a person on the line.</p>
        <Link href="/start" className="mt-8 inline-flex items-center gap-3 px-8 py-4 text-[16px] font-bold uppercase tracking-[0.08em]" style={{ backgroundColor: '#c9a96e', color: '#000' }}>
          Start a booking <ChevronRight className="h-4 w-4" />
        </Link>
        <p className="mt-4 text-[16px] text-black/80">Stripe checkout. South Florida.</p>
      </section>


      <footer className="bg-[#080808] border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 md:px-16 pt-16 pb-10">
          <div className="flex flex-col md:flex-row justify-between gap-16 mb-16">
            <Link href="/" className="font-display font-semibold tracking-[0.4em] uppercase self-start shrink-0" style={{ fontSize: '17px', color: '#c9a96e' }}>Influence</Link>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-20">
              <div>
                <p className="text-white/40 text-[9px] tracking-widest uppercase mb-6">Work With Us</p>
                <ul className="space-y-3">
                  <li><Link href="/marketplace" className="text-white/60 hover:text-white transition-colors text-sm">Browse Creators</Link></li>
                  <li><Link href="/services" className="text-white/60 hover:text-white transition-colors text-sm">All Services</Link></li>
                  <li><Link href="/pricing" className="text-white/60 hover:text-white transition-colors text-sm">Packages</Link></li>
                  <li><Link href="/start" className="text-white/60 hover:text-white transition-colors text-sm">Book Now</Link></li>
                </ul>
              </div>
              <div>
                <p className="text-white/20 text-[9px] tracking-widest uppercase mb-6">Services</p>
                <ul className="space-y-3">
                  <li><Link href="/services/content" className="text-white/40 hover:text-white transition-colors text-sm">Social Media Content</Link></li>
                  <li><Link href="/services/business" className="text-white/40 hover:text-white transition-colors text-sm">Brand Ambassadors</Link></li>
                  <li><Link href="/services/shoots" className="text-white/40 hover:text-white transition-colors text-sm">Shoots & Videos</Link></li>
                  <li><Link href="/services/commercials" className="text-white/40 hover:text-white transition-colors text-sm">Commercials</Link></li>
                  <li><Link href="/services/events" className="text-white/40 hover:text-white transition-colors text-sm">Event Creators</Link></li>
                  <li><Link href="/start?service=bottle" className="text-white/40 hover:text-white transition-colors text-sm">VIP Hosts</Link></li>
                </ul>
              </div>
              <div>
                <p className="text-white/20 text-[9px] tracking-widest uppercase mb-6">Info</p>
                <ul className="space-y-3">
                  <li><Link href="/about" className="text-white/40 hover:text-white transition-colors text-sm">About</Link></li>
                  <li><Link href="/contact" className="text-white/40 hover:text-white transition-colors text-sm">Contact</Link></li>
                  <li><Link href="/faq" className="text-white/40 hover:text-white transition-colors text-sm">FAQ</Link></li>
                  <li><Link href="/join" className="text-white/40 hover:text-white transition-colors text-sm">Join Our Network</Link></li>
                  <li><Link href="/terms" className="text-white/40 hover:text-white transition-colors text-sm">Terms</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/20 text-xs">&copy; 2026 Influence</p>
            <Link href="https://www.instagram.com/influencecreators.marketing" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white/70 transition-colors text-[11px] tracking-widest uppercase">Instagram</Link>
            <p className="text-white/10 text-[9px] tracking-widest uppercase">Miami &middot; Boca Raton, FL</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
