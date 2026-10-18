import Link from 'next/link';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Calendar, Camera, Clapperboard, Compass, Megaphone, Users } from 'lucide-react';
import MobileNav from './components/MobileNav';
import VerifiedPartners from './components/VerifiedPartners';

const gold = '#c9a96e';
const ink = '#0c0c0c';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Influence',
  url: 'https://influencecreators.marketing',
  logo: 'https://influencecreators.marketing/favicon.svg',
  description: 'South Florida studio for brand ambassadors, influencer campaigns, UGC, and event talent. For venues, brands, and creators.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '4756 NW 2nd Ave',
    addressLocality: 'Boca Raton',
    addressRegion: 'FL',
    postalCode: '33431',
    addressCountry: 'US',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-561-287-7194',
    email: 'influencemodelsagency@gmail.com',
    contactType: 'sales',
  },
  sameAs: ['https://www.instagram.com/influencecreators.marketing'],
};

export const metadata: Metadata = {
  title: { absolute: "Brand Ambassadors & Influencers for South Florida Venues & Brands | Influence" },
  description: "Influence is the South Florida studio for brand ambassadors, influencer campaigns, UGC, and event talent. Built for venues, brands, and creators.",
  openGraph: {
    title: "Brand Ambassadors & Influencers for South Florida Venues & Brands",
    description: "One studio for the night, the campaign, and the content. For venues, brands, and creators.",
    url: "https://influencecreators.marketing",
  },
};

const roster = [
  {
    id: 'genesis-003',
    name: 'Genesis Bravo',
    image: '/images/Genesis/genesis-1.jpg',
    position: 'center 20%',
    meta: 'Featured · @genesis.bravoo',
  },
  {
    id: 'seahra-026',
    name: 'Seahra Raquel',
    image: '/images/Seahra/seahra-1.jpg',
    position: 'center 15%',
    meta: 'Featured · @seahraraquel',
  },
  {
    id: 'kat-051',
    name: 'Kat',
    image: '/images/Kat/kat-3.jpg',
    position: 'center 20%',
    meta: 'Roster · @whois.kat',
  },
  {
    id: 'ferrari-004',
    name: 'Ferrari',
    image: '/images/Ferrari/ferrari-2.jpg',
    position: 'center 15%',
    meta: 'Roster · @ferrarii_red',
  },
  {
    id: 'alisha-023',
    name: 'Alisha',
    image: '/images/Alisha/alisha-2.jpg',
    position: 'center 18%',
    meta: 'Roster · @sunnyydaze_',
  },
];

const services: {
  title: string;
  line: string;
  href: string;
  icon: typeof Users;
  extra?: { href: string; label: string };
}[] = [
  {
    title: 'Brand Ambassadors & Bottle/Event Talent',
    line: 'Hosts and bottle talent for the room.',
    href: '/services/business',
    extra: { href: '/services/events', label: 'Bottle & event talent' },
    icon: Users,
  },
  {
    title: 'Influencer Campaigns',
    line: 'A roster booked around your launch.',
    href: '/influencer-campaigns',
    icon: Megaphone,
  },
  {
    title: 'UGC & Content Production',
    line: 'Reels and photos, shot and delivered.',
    href: '/services/content',
    icon: Camera,
  },
  {
    title: 'Events & Activations',
    line: 'Nov 18 networking night and live activations.',
    href: '/tickets',
    extra: { href: '/nov18', label: 'Nov 18 event' },
    icon: Calendar,
  },
  {
    title: 'Music Video & Commercial Talent',
    line: 'On-camera talent for videos and spots.',
    href: '/music-video-creators',
    icon: Clapperboard,
  },
  {
    title: 'Social Strategy',
    line: 'The plan behind the posts.',
    href: '/services',
    icon: Compass,
  },
];

const industries = [
  { name: 'Restaurants', href: '/services/business' },
  { name: 'Nightclubs', href: '/services/events' },
  { name: 'Hotels & Resorts', href: '/event-creators' },
  { name: 'Brands', href: '/for-fashion-brands' },
  { name: 'Events', href: '/tickets' },
];

const steps = [
  { n: '01', title: 'Tell us the brief', body: 'Venue or brand, the date, and what the night needs.' },
  { n: '02', title: 'Meet the roster', body: 'We match Brand Ambassadors to the job.' },
  { n: '03', title: 'Go live', body: 'They arrive, create, and the campaign runs.' },
];

function Portrait({
  href,
  name,
  image,
  position,
  meta,
  host = false,
  className = '',
}: {
  href: string;
  name: string;
  image: string;
  position: string;
  meta: string;
  host?: boolean;
  className?: string;
}) {
  return (
    <Link href={href} className={`group block ${className}`}>
      <div className={`relative overflow-hidden bg-[#e7e0d4] ${host ? 'border-2' : 'border border-black/10'}`} style={host ? { borderColor: gold } : undefined}>
        <div className={host ? 'relative h-[460px] md:h-full md:min-h-[640px]' : 'relative h-[420px] md:h-[300px]'}>
          <Image
            src={image}
            alt={name}
            fill
            sizes={host ? '(min-width: 768px) 40vw, 82vw' : '(min-width: 768px) 18vw, 70vw'}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            style={{ objectPosition: position }}
          />
        </div>
      </div>
      <p className="mt-3 text-[13px] font-semibold uppercase tracking-[0.16em] text-[#0c0c0c]">{meta}</p>
      <p className="mt-1 font-display text-[26px] font-semibold leading-none text-[#0c0c0c] md:text-[28px]">{name}</p>
    </Link>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-[#0c0c0c] text-[#f6f1e7]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <header className="relative z-20 bg-[#0c0c0c]">
        <div className="flex items-center justify-between gap-3 h-16 px-4 md:h-[4.5rem] md:px-10">
          <div className="flex items-center gap-3">
            <MobileNav />
            <Link
              href="/"
              className="shrink-0 whitespace-nowrap font-display font-semibold uppercase text-[#c9a96e] text-[16px] tracking-[0.14em] md:text-[20px] md:tracking-[0.28em]"
            >
              INFLUENCE
            </Link>
          </div>
          <nav className="hidden xl:flex items-center gap-8 text-[13px] font-semibold uppercase tracking-[0.16em] text-[#f6f1e7]">
            <Link href="/marketplace" className="hover:text-[#c9a96e]">Creators</Link>
            <Link href="/services" className="hover:text-[#c9a96e]">Services</Link>
            <Link href="/tickets" className="hover:text-[#c9a96e]">Events</Link>
            <Link href="/about" className="hover:text-[#c9a96e]">About</Link>
          </nav>
          <div className="flex shrink-0 items-center gap-2">
            <Link href="/join" className="hidden md:inline-flex items-center min-h-11 px-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#f6f1e7] hover:text-[#c9a96e]">
              Join
            </Link>
            <Link
              href="/start"
              className="inline-flex items-center justify-center min-h-11 px-3 md:px-5 text-[13px] font-semibold uppercase tracking-[0.12em]"
              style={{ backgroundColor: gold, color: ink }}
            >
              <span className="md:hidden">Start</span>
              <span className="hidden md:inline">Start a Campaign</span>
            </Link>
          </div>
        </div>
        <div className="h-px w-full" style={{ backgroundColor: gold }} />
      </header>

      <main>
        <section className="bg-[#f6f1e7] text-[#0c0c0c] md:grid md:grid-cols-2 md:min-h-[calc(100vh-4.5rem)]">
          <div className="relative h-[360px] sm:h-[460px] md:h-auto md:min-h-[720px]">
            <Image
              src="/images/Des/des-2.jpg"
              alt="Deseray Marie, host of Influence"
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover object-[center_18%]"
            />
          </div>
          <div className="flex flex-col justify-center px-5 py-10 md:px-14 md:py-16 lg:px-16">
            <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#0c0c0c]">
              South Florida
            </p>
            <h1 className="mt-4 font-display font-semibold leading-[1.02] text-[44px] md:text-[64px] lg:text-[72px] md:leading-[0.98]">
              Brand Ambassadors &amp; Influencers for South Florida&apos;s Best Venues &amp; Brands.
            </h1>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-[#0c0c0c]/80 md:text-[18px]">
              One studio for the night, the campaign, and the content.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/start"
                className="inline-flex min-h-14 items-center justify-center px-6 text-[16px] font-semibold"
                style={{ backgroundColor: gold, color: ink }}
              >
                I&apos;m a Brand / Venue
              </Link>
              <Link
                href="/join"
                className="inline-flex min-h-14 items-center justify-center border border-[#0c0c0c] px-6 text-[16px] font-semibold text-[#0c0c0c]"
              >
                I&apos;m a Creator
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-[#f6f1e7] text-[#0c0c0c] px-5 pb-16 pt-4 md:px-14 md:pb-24" aria-label="Brand Ambassadors">
          <div className="mb-8 flex items-end justify-between gap-6 border-t border-black/10 pt-8">
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#0c0c0c]">The roster</p>
              <h2 className="mt-2 font-display text-[40px] font-semibold leading-none md:text-[64px]">Brand Ambassadors</h2>
            </div>
            <Link href="/marketplace" className="shrink-0 text-[16px] font-semibold underline decoration-[#c9a96e] underline-offset-4">
              View the roster
            </Link>
          </div>

          <div className="md:hidden -mx-5 overflow-x-auto pb-2">
            <div className="flex w-max gap-4 px-5">
              <Portrait
                href="/influencer/des-001"
                name="Deseray Marie"
                image="/images/Des/des-5.jpg"
                position="center top"
                meta="Host"
                host
                className="w-[82vw] max-w-[340px] shrink-0 snap-start"
              />
              {roster.map((person) => (
                <Portrait
                  key={person.id}
                  href={`/influencer/${person.id}`}
                  {...person}
                  className="w-[70vw] max-w-[280px] shrink-0 snap-start"
                />
              ))}
            </div>
          </div>

          <div className="hidden md:grid md:grid-cols-[minmax(280px,0.9fr)_1.4fr] md:items-stretch md:gap-4">
            <Portrait
              href="/influencer/des-001"
              name="Deseray Marie"
              image="/images/Des/des-5.jpg"
              position="center top"
              meta="Host · Miami"
              host
              className="h-full"
            />
            <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
              {roster.map((person) => (
                <Portrait key={person.id} href={`/influencer/${person.id}`} {...person} />
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 px-5 py-16 md:px-14 md:py-24" aria-label="Services">
          <p className="text-[13px] font-semibold uppercase tracking-[0.18em]" style={{ color: gold }}>One studio</p>
          <h2 className="mt-3 max-w-3xl font-display text-[40px] font-semibold leading-[1.02] md:text-[64px]">
            Everything a venue or brand needs.
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article key={service.title} className="flex flex-col border border-white/10 p-6 md:p-8">
                  <Icon className="h-7 w-7" style={{ color: gold }} aria-hidden />
                  <h3 className="mt-5 font-display text-[28px] font-semibold leading-[1.1] text-[#f6f1e7]">
                    <Link href={service.href} className="hover:text-[#c9a96e]">{service.title}</Link>
                  </h3>
                  <p className="mt-3 text-[16px] leading-relaxed text-[#f6f1e7]/80">{service.line}</p>
                  {service.extra && (
                    <Link href={service.extra.href} className="mt-4 text-[16px] font-semibold" style={{ color: gold }}>
                      {service.extra.label}
                    </Link>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        <section className="border-t border-white/10 px-5 py-12 md:px-14 md:py-16" aria-label="Industries">
          <p className="text-[13px] font-semibold uppercase tracking-[0.18em]" style={{ color: gold }}>Who it&apos;s for</p>
          <ul className="mt-6 flex flex-col gap-4 md:flex-row md:flex-wrap md:gap-x-10 md:gap-y-4">
            {industries.map((industry) => (
              <li key={industry.name}>
                <Link href={industry.href} className="font-display text-[32px] font-semibold leading-none text-[#f6f1e7] hover:text-[#c9a96e] md:text-[40px]">
                  {industry.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-[#f6f1e7] text-[#0c0c0c] px-5 py-16 md:px-14 md:py-24" aria-label="How it works">
          <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#0c0c0c]">How it works</p>
          <h2 className="mt-3 font-display text-[40px] font-semibold leading-none md:text-[64px]">Three steps.</h2>
          <ol className="mt-10 grid gap-10 md:grid-cols-3">
            {steps.map((step) => (
              <li key={step.n}>
                <p className="font-display text-[42px] font-semibold leading-none text-[#0c0c0c]">{step.n}</p>
                <h3 className="mt-4 font-display text-[28px] font-semibold leading-tight">{step.title}</h3>
                <p className="mt-3 text-[16px] leading-relaxed text-[#0c0c0c]/80">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <VerifiedPartners />

        <section className="border-t border-white/10 px-5 py-16 md:px-14 md:py-24" aria-label="Creators">
          <p className="text-[13px] font-semibold uppercase tracking-[0.18em]" style={{ color: gold }}>Creators</p>
          <h2 className="mt-3 max-w-3xl font-display text-[40px] font-semibold leading-[1.02] md:text-[64px]">
            Join the roster.
          </h2>
          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-[#f6f1e7]/85 md:text-[18px]">
            Work with venues and brands that book through Influence.
          </p>
          <ul className="mt-8 max-w-xl space-y-3 text-[16px] leading-relaxed">
            <li>Bookings for campaigns, events, and on-site content.</li>
            <li>A profile brands can find.</li>
            <li>A team that runs the night.</li>
          </ul>
          <Link
            href="/join"
            className="mt-8 inline-flex min-h-14 items-center justify-center px-8 text-[16px] font-semibold"
            style={{ backgroundColor: gold, color: ink }}
          >
            Join
          </Link>
        </section>
      </main>

      <footer className="border-t border-white/10 px-5 py-12 md:px-14 md:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div>
            <Link href="/" className="font-display text-[18px] font-semibold uppercase tracking-[0.22em]" style={{ color: gold }}>
              INFLUENCE
            </Link>
            <p className="mt-4 max-w-xs text-[16px] leading-relaxed text-[#f6f1e7]/80">
              Brand ambassadors and influencer marketing for South Florida.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 md:gap-16">
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-[0.16em]" style={{ color: gold }}>Contact</p>
              <ul className="mt-4 space-y-2 text-[16px]">
                <li><a href="tel:+15612877194" className="hover:text-[#c9a96e]">(561) 287-7194</a></li>
                <li><a href="mailto:influencemodelsagency@gmail.com" className="hover:text-[#c9a96e]">influencemodelsagency@gmail.com</a></li>
                <li>4756 NW 2nd Ave<br />Boca Raton, FL 33431</li>
                <li>
                  <a href="https://www.instagram.com/influencecreators.marketing" target="_blank" rel="noopener noreferrer" className="hover:text-[#c9a96e]">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-[0.16em]" style={{ color: gold }}>Work</p>
              <ul className="mt-4 space-y-2 text-[16px]">
                <li><Link href="/marketplace" className="hover:text-[#c9a96e]">Creators</Link></li>
                <li><Link href="/services" className="hover:text-[#c9a96e]">Services</Link></li>
                <li><Link href="/tickets" className="hover:text-[#c9a96e]">Events</Link></li>
                <li><Link href="/start" className="hover:text-[#c9a96e]">Start a campaign</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-[0.16em]" style={{ color: gold }}>Studio</p>
              <ul className="mt-4 space-y-2 text-[16px]">
                <li><Link href="/about" className="hover:text-[#c9a96e]">About</Link></li>
                <li><Link href="/join" className="hover:text-[#c9a96e]">Join</Link></li>
                <li><Link href="/contact" className="hover:text-[#c9a96e]">Contact</Link></li>
                <li><Link href="/faq" className="hover:text-[#c9a96e]">FAQ</Link></li>
                <li><Link href="/terms" className="hover:text-[#c9a96e]">Terms</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <p className="mt-12 text-[13px] text-[#f6f1e7]/70">© 2026 Influence · Miami &amp; Boca Raton, FL</p>
      </footer>
    </div>
  );
}
