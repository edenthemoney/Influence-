import Link from 'next/link';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Calendar, Camera, Clapperboard, Compass, Megaphone, Users } from 'lucide-react';
import VerifiedPartners from './components/VerifiedPartners';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import RosterPreload from './components/RosterPreload';
import portraitBlur from '@/data/portrait-blur.json';

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
    image: '/images/GenesisBravo/genesis-1.jpg',
    position: 'center 18%',
    meta: 'Brand Ambassador',
  },
  {
    id: 'seahra-026',
    name: 'Seahra Raquel',
    image: '/images/Seahra/seahra-2.jpg',
    position: 'center 42%',
    meta: 'Brand Ambassador',
  },
  {
    id: 'kat-051',
    name: 'Kat',
    image: '/images/Kat/kat-6.jpg',
    position: 'center 35%',
    meta: 'Brand Ambassador',
  },
  {
    id: 'ferrari-004',
    name: 'Ferrari',
    image: '/images/Ferrari/ferrari-2.jpg',
    position: 'center 10%',
    meta: 'Brand Ambassador',
  },
  {
    id: 'alisha-023',
    name: 'Alisha',
    image: '/images/Alisha/alisha-5.jpg',
    position: 'center 16%',
    meta: 'Brand Ambassador',
  },
];

const venueStills = [
  { src: '/tickets/drink-espresso-martini.webp', alt: 'Espresso martini at Serena Pastificio' },
  { src: '/tickets/drink-smoked-old-fashioned.webp', alt: 'Smoked old fashioned at Serena Pastificio' },
  { src: '/tickets/serena-dining-room.webp', alt: 'Serena Pastificio dining room in Boca Raton' },
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
  priority = false,
  frame = 'ratio',
  className = '',
}: {
  href: string;
  name: string;
  image: string;
  position: string;
  meta: string;
  host?: boolean;
  priority?: boolean;
  frame?: 'ratio' | 'fill';
  className?: string;
}) {
  const blur = portraitBlur[image as keyof typeof portraitBlur];
  return (
    <Link href={href} className={`group flex h-full min-h-0 flex-col ${className}`}>
      <div
        className={`relative overflow-hidden ${frame === 'fill' ? 'min-h-[140px] flex-1' : 'aspect-[4/5]'} ${host ? 'border-2' : 'border border-black/10'}`}
        style={{ backgroundColor: blur?.color || '#ece7dc', ...(host ? { borderColor: gold } : {}) }}
      >
        <Image
          src={image}
          alt={name}
          fill
          priority={priority}
          placeholder={blur ? 'blur' : 'empty'}
          blurDataURL={blur?.blur}
          sizes={host ? '(min-width: 768px) 60vw, 78vw' : '(min-width: 768px) 30vw, 64vw'}
          className="object-cover"
          style={{ objectPosition: position }}
        />
      </div>
      <p className="mt-3 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#0c0c0c]">{meta}</p>
      <p className="mt-1 font-display text-[26px] font-semibold leading-none text-[#0c0c0c] md:text-[30px]">{name}</p>
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

      <SiteHeader />

      <main className="pb-[calc(5.5rem+env(safe-area-inset-bottom))]">
        <RosterPreload srcs={roster.slice(2).map((person) => person.image)} />
        <section data-hero className="bg-[#f6f1e7] text-[#0c0c0c] md:grid md:grid-cols-2 md:min-h-[calc(100vh-4.5rem)]">
          <div className="relative order-1 h-[340px] sm:h-[420px] md:order-2 md:h-auto md:min-h-[640px]">
            <Image
              src="/tickets/patio-hero.webp"
              alt="Serena Pastificio patio under string lights, Boca Raton"
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover object-center"
            />
          </div>
          <div className="order-2 flex flex-col justify-center px-5 py-10 md:order-1 md:px-14 md:py-16 lg:px-16">
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

        <section className="bg-[#f6f1e7] px-5 pb-12 text-[#0c0c0c] md:px-14 md:pb-16" aria-label="Credibility">
          <div className="grid gap-8 border-t border-black/10 pt-8 md:grid-cols-[1.15fr_0.85fr] md:items-end">
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#0c0c0c]">On the books</p>
              <Link href="/tickets" className="mt-3 block font-display text-[28px] font-semibold leading-[1.1] underline decoration-[#c9a96e] underline-offset-4 md:text-[40px]">
                Serena Pastificio · Nov 18 Networking Night
              </Link>
            </div>
            <p className="text-[16px] leading-relaxed text-[#0c0c0c]/80 md:text-[18px]">
              Restaurant film Des has shot on site: the dining room, the table, and the plate.
            </p>
          </div>
          <ul className="mt-8 grid grid-cols-3 gap-2 md:gap-4">
            {venueStills.map((still) => (
              <li key={still.src}>
                <div className="relative aspect-[4/5] overflow-hidden bg-[#ece7dc]">
                  <Image src={still.src} alt={still.alt} fill className="object-cover object-center" sizes="(min-width: 768px) 30vw, 33vw" />
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[16px] text-[#0c0c0c]/75">Serena Pastificio, Boca Raton.</p>
        </section>

        <section className="bg-[#f6f1e7] text-[#0c0c0c] px-5 pb-16 pt-2 md:px-14 md:pb-24" aria-label="Brand Ambassadors">
          <div className="mb-8 flex flex-col items-start gap-4 border-t border-black/10 pt-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#0c0c0c]">The roster</p>
              <h2 className="mt-2 font-display text-[40px] font-semibold leading-none md:text-[64px]">Brand Ambassadors</h2>
            </div>
            <Link href="/marketplace" className="text-[16px] font-semibold underline decoration-[#c9a96e] underline-offset-4">
              View the roster
            </Link>
          </div>

          <div
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 scroll-px-5 md:hidden"
            style={{ marginInline: '-1.25rem', scrollPaddingInline: '1.25rem' }}
          >
            <Portrait
              href="/influencer/des-001"
              name="Deseray Marie"
              image="/images/Des/IMG_3412.JPG"
              position="center 15%"
              meta="HOST"
              host
              priority
              className="w-[78vw] max-w-[420px] shrink-0 snap-start"
            />
            {roster.map((person, index) => (
              <Portrait
                key={person.id}
                href={`/influencer/${person.id}`}
                {...person}
                priority={index < 2}
                className="w-[64vw] max-w-[300px] shrink-0 snap-start"
              />
            ))}
          </div>

          <div className="hidden md:grid md:grid-cols-3 md:items-stretch md:gap-5">
            <Portrait
              href="/influencer/des-001"
              name="Deseray Marie"
              image="/images/Des/IMG_3412.JPG"
              position="center 15%"
              meta="HOST"
              host
              priority
              className="col-span-2"
            />
            <div className="grid h-full grid-rows-2 gap-5">
              {roster.slice(0, 2).map((person, index) => (
                <Portrait key={person.id} href={`/influencer/${person.id}`} {...person} priority={index === 0} frame="fill" className="min-h-0" />
              ))}
            </div>
          </div>
          <div className="mt-5 hidden md:grid md:grid-cols-3 md:items-stretch md:gap-5">
            {roster.slice(2).map((person) => (
              <Portrait key={person.id} href={`/influencer/${person.id}`} {...person} />
            ))}
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

      <SiteFooter />
    </div>
  );
}
