/* eslint-disable @next/next/no-img-element -- pre-sized WebP assets in /public/dec16-assets */
import type { Metadata } from 'next';
import TicketForm from './ticket-form';
import Countdown from './countdown';
import { HeroButtons, StickyBar } from './cta';
import { PAYMENT_LINK_URL } from '@/lib/dec16/payment-link';
import ShareButton from './share-button';
import { INFLUENCE_CONNECT } from '@/lib/dec16/influence-connect';

const HEADLINE = 'Meet the Right Brand Ambassadors for Your Business';

export const metadata: Metadata = {
  title: { absolute: `${HEADLINE} — Dec 16 | Influence` },
  description: `${INFLUENCE_CONNECT.name}: an evening for business owners and brand ambassadors. Curated introductions to brand ambassadors matched to your business. Wednesday, December 16, 2026, 4–7 PM ET at Serena Pastificio, 301 Plaza Real, Mizner Park, Boca Raton. Hosted by Deseray Marie. Business Owner Entry $75, apps on us. Ladies and brand ambassadors RSVP free.`,
  alternates: { canonical: 'https://influencecreators.marketing/dec16' },
  openGraph: {
    title: `${HEADLINE} — Dec 16`,
    description:
      'An evening for business owners and brand ambassadors. Curated introductions, apps on us. Wed, Dec 16, 2026, 4–7 PM ET at Serena Pastificio, Mizner Park, Boca Raton. Hosted by Deseray Marie. Business Owner Entry $75.',
    url: 'https://influencecreators.marketing/dec16',
    type: 'website',
    images: [{ url: 'https://influencecreators.marketing/dec16-assets/patio-hero.webp', width: 780, height: 560, alt: 'Serena Pastificio patio under string lights' }],
  },
};

const eventJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: `${INFLUENCE_CONNECT.name}: ${HEADLINE}`,
  description: `An evening for business owners and brand ambassadors at ${INFLUENCE_CONNECT.venue}, Mizner Park. Curated introductions to brand ambassadors matched to your business, apps on us. Hosted by ${INFLUENCE_CONNECT.host}.`,
  startDate: '2026-12-16T16:00:00-05:00',
  endDate: '2026-12-16T19:00:00-05:00',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  eventStatus: 'https://schema.org/EventRescheduled',
  previousStartDate: '2026-11-18T16:00:00-05:00',
  image: ['https://influencecreators.marketing/dec16-assets/patio-hero.webp'],
  location: {
    '@type': 'Place',
    name: INFLUENCE_CONNECT.venue,
    address: {
      '@type': 'PostalAddress',
      streetAddress: INFLUENCE_CONNECT.street,
      addressLocality: 'Boca Raton',
      addressRegion: 'FL',
      postalCode: '33432',
      addressCountry: 'US',
    },
  },
  organizer: { '@type': 'Person', name: INFLUENCE_CONNECT.host },
  offers: [
    { '@type': 'Offer', name: 'Ladies & Brand Ambassadors RSVP', price: '0', priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: 'https://influencecreators.marketing/dec16' },
    { '@type': 'Offer', name: 'Business Owner Entry', price: '75', priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: 'https://influencecreators.marketing/dec16' },
  ],
};

const AMBASSADORS = ['Genesis', 'Seahra', 'Kat', 'Ferrari', 'Alisha'];

const DRINKS = [
  { src: '/dec16-assets/drink-espresso-martini.webp', alt: 'Espresso martini at Serena' },
  { src: '/dec16-assets/drink-smoked-old-fashioned.webp', alt: 'Smoked old fashioned at Serena' },
  { src: '/dec16-assets/serena-dining-room.webp', alt: 'Serena Pastificio dining room' },
];

const label = 'text-[13px] font-bold uppercase tracking-[0.16em] text-[#c9a96e]';

export default function TicketsPage() {
  return (
    <main className="mx-auto min-h-dvh w-full max-w-[480px] bg-black pb-[env(safe-area-inset-bottom)] text-[#f4efe6]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }} />

      {/* Serena string-light patio. Photo only, no text on it. */}
      <div className="ic-hero-photo relative">
        <div className="absolute right-3 top-[max(0.75rem,env(safe-area-inset-top))] z-10"><ShareButton variant="icon" /></div>
        <img
          src="/dec16-assets/patio-hero.webp"
          alt="Serena Pastificio patio under string lights, Mizner Park"
          width={780}
          height={560}
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>

      <header className="px-5 pb-6">
        <p className="font-display -mt-1 whitespace-nowrap text-[min(68px,calc((100vw-40px)*0.152))] font-bold leading-[0.95] tracking-[0.04em] text-[#c9a96e]">
          INFLUENCE
        </p>
        <p className="mt-3 text-[14px] font-black uppercase tracking-[0.13em] text-[#c9a96e]">Influence Connect · An Evening for Business Owners</p>
        <h1 className="mt-4 font-display font-extrabold leading-[1.02]">
          <span className="block text-[min(38px,calc((100vw-40px)*0.092))] text-[#f4efe6]">Meet the Right</span>
          <span className="mt-1 block whitespace-nowrap text-[min(52px,calc((100vw-40px)*0.117))] font-bold tracking-[0.02em] text-[#c9a96e]">
            BRAND
            <br />
            AMBASSADORS
          </span>
          <span className="mt-2 block text-[min(34px,calc((100vw-40px)*0.08))] text-[#f4efe6]">
            for Your Business
          </span>
        </h1>
        <p className="mt-5 text-[17px] font-medium leading-relaxed text-[#f4efe6]/90">
          An evening in Mizner Park for business owners, founders and brands. Tell us what you sell and who you want to reach, and Deseray Marie and the Influence team introduce you to brand ambassadors who fit, over apps on us.
        </p>
      </header>

      <HeroButtons />

      <div className="ic-rule mx-5" />

      {/* Host: clearly separate from the ambassadors */}
      <section className="flex gap-4 px-5 py-5" aria-label="Host, date and venue">
        <img
          src="/dec16-assets/host-deseray-marie.webp"
          alt="Deseray Marie, host"
          width={480}
          height={600}
          decoding="async"
          className="h-[170px] w-[136px] shrink-0 border border-[#c9a96e] object-cover"
        />
        <div className="min-w-0 pt-1">
          <p className={label}>Hosted by</p>
          <p className="mt-1 font-display text-[26px] font-bold leading-[1.05] text-[#f4efe6]">Deseray Marie</p>
          <p className="mt-3 text-[17px] font-bold uppercase leading-snug tracking-[0.06em] text-[#c9a96e]">
            Wed Dec 16
            <br />
            4–7 PM ET
          </p>
          <p className="mt-1 text-[13px] font-bold uppercase tracking-[0.12em] text-[#f4efe6]/80">New date · moved from Nov 18</p>
          <p className="mt-2 text-[16px] font-medium leading-snug text-[#f4efe6]">
            {INFLUENCE_CONNECT.venue}
            <br />
            Boca Raton
          </p>
        </div>
      </section>

      <section className="px-5 pb-6" aria-label="Countdown and tickets">
        <Countdown />
        <a
          href={PAYMENT_LINK_URL}
          className="mt-4 flex min-h-14 w-full touch-manipulation items-center justify-center bg-[#c9a96e] px-4 text-[16px] font-black uppercase tracking-[0.14em] text-[#0b0a08]"
        >
          Business Owner Entry · $75&nbsp;&nbsp;→
        </a>
      </section>

      <div className="ic-rule mx-5" />

      <section className="px-5 pb-6 pt-5" aria-labelledby="for-who">
        <h2 id="for-who" className={label}>Who it&rsquo;s for</h2>
        <p className="mt-2 font-display text-[26px] font-bold leading-[1.1] text-[#f4efe6]">Business owners, founders &amp; brands</p>
        <p className="mt-2 text-[16px] leading-relaxed text-[#f4efe6]/85">
          Restaurants, boutiques, beauty and wellness, real estate, hospitality, and anyone who wants the right faces and voices behind their brand. A curated guest list, a relaxed setting, real conversations.
        </p>
      </section>

      <section className="px-5 pb-7" aria-labelledby="how">
        <h2 id="how" className={label}>How it works</h2>
        <ol className="mt-3 space-y-3">
          {[
            ['Get your entry', 'Business Owner Entry is $75. Apps are on us.'],
            ['Tell us about your business', 'At check-in, share what you sell and who you want to reach.'],
            ['Meet your matches', 'Deseray and the Influence team introduce you to brand ambassadors who fit.'],
          ].map(([t, d], i) => (
            <li key={t} className="flex gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#c9a96e] font-display text-[18px] font-bold text-[#c9a96e]">{i + 1}</span>
              <div>
                <p className="text-[17px] font-bold leading-snug text-[#f4efe6]">{t}</p>
                <p className="mt-0.5 text-[15px] leading-snug text-[#f4efe6]/80">{d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <div className="ic-rule mx-5" />

      {/* Example talent from the network. Not hosts. */}
      <section className="px-5 pb-7 pt-5" aria-labelledby="ambassadors">
        <h2 id="ambassadors" className={label}>
          Brand Ambassadors
        </h2>
        <ul className="mt-3 grid grid-cols-3 gap-[6px]">
          {AMBASSADORS.map((name) => (
            <li key={name}>
              <img
                src={`/dec16-assets/ambassador-${name.toLowerCase()}.webp`}
                alt={name}
                width={330}
                height={450}
                loading="lazy"
                decoding="async"
                className="aspect-[330/450] w-full object-cover"
              />
              <p className="mt-1.5 text-center font-display text-[18px] font-bold leading-tight text-[#f4efe6]">{name}</p>
            </li>
          ))}
          <li className="flex aspect-[330/450] flex-col items-center justify-center border border-[#c9a96e]/60 px-2 text-center">
            <p className="font-display text-[22px] font-bold leading-tight text-[#c9a96e]">&amp; many more</p>
            <p className="mt-2 text-[13px] font-medium leading-snug text-[#f4efe6]">from the Influence network</p>
          </li>
        </ul>
      </section>

      {/* Drinks and dining at Serena. Photos only. */}
      <div className="grid grid-cols-3 gap-[6px]" aria-label="Serena Pastificio">
        {DRINKS.map((d) => (
          <img
            key={d.src}
            src={d.src}
            alt={d.alt}
            width={360}
            height={440}
            loading="lazy"
            decoding="async"
            className="aspect-[360/440] w-full object-cover"
          />
        ))}
      </div>

      <section className="px-5 pb-2 pt-7" aria-labelledby="details">
        <h2 id="details" className={label}>
          What&rsquo;s included
        </h2>
        <ul className="mt-3 space-y-2 text-[17px] font-medium leading-snug text-[#f4efe6]">
          <li>
            <span className="font-bold text-[#c9a96e]">Business Owner Entry · $75</span> · curated introductions to brand ambassadors matched to your business, apps on us
          </li>
          <li>
            <span className="font-bold text-[#c9a96e]">Ladies &amp; brand ambassadors</span> · free RSVP, first drink free
          </li>
          <li>
            <span className="font-bold text-[#c9a96e]">Dress</span> · {INFLUENCE_CONNECT.dressCode.toLowerCase()}
          </li>
        </ul>

        <a href={INFLUENCE_CONNECT.mapsUrl} className="mt-6 block min-h-14 touch-manipulation border border-[#c9a96e]/70 px-4 py-4">
          <p className={label}>{INFLUENCE_CONNECT.area}</p>
          <p className="mt-1.5 font-display text-[26px] font-bold leading-tight text-[#f4efe6]">{INFLUENCE_CONNECT.venue}</p>
          <p className="mt-1.5 text-[16px] leading-snug text-[#f4efe6]">
            {INFLUENCE_CONNECT.street}, {INFLUENCE_CONNECT.cityLine}
          </p>
          <p className="mt-3 text-[14px] font-bold uppercase tracking-[0.12em] text-[#c9a96e]">Open in Google Maps →</p>
        </a>
        <a
          href={INFLUENCE_CONNECT.calendarFile}
          download="influence-connect-dec16.ics"
          className="mt-3 flex min-h-14 w-full touch-manipulation items-center justify-center border border-[#c9a96e] px-4 text-center text-[15px] font-bold uppercase tracking-[0.14em] text-[#c9a96e]"
        >
          Add to calendar
        </a>
      </section>

      <div className="px-5 pb-2"><ShareButton /></div>
      <TicketForm />
      <StickyBar />
    </main>
  );
}
