/* eslint-disable @next/next/no-img-element -- pre-sized WebP assets in /public/tickets */
import type { Metadata } from 'next';
import TicketForm from './ticket-form';
import Countdown from './countdown';
import { INFLUENCE_CONNECT } from '@/lib/influence-connect';

const HEADLINE = 'Find the Right Brand Ambassadors & Influencers for Your Business';

export const metadata: Metadata = {
  title: `${HEADLINE} — Nov 18 | Influence`,
  description: `${INFLUENCE_CONNECT.name}, an influencer networking event on Wednesday, November 18, 2026, 4–7 PM ET at Serena Pastificio, 301 Plaza Real, Mizner Park, Boca Raton. Hosted by Deseray Marie. Ladies RSVP free with first drink free. Gentlemen $25, apps included.`,
  alternates: { canonical: 'https://influencecreators.marketing/tickets' },
  openGraph: {
    title: `${HEADLINE} — Nov 18`,
    description:
      'Influencer networking event. Wednesday, Nov 18, 2026, 4–7 PM ET at Serena Pastificio, Boca Raton. Hosted by Deseray Marie.',
    url: 'https://influencecreators.marketing/tickets',
    type: 'website',
    images: [{ url: 'https://influencecreators.marketing/tickets/patio-hero.webp', width: 780, height: 560, alt: 'Serena Pastificio patio under string lights' }],
  },
};

const eventJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: `${INFLUENCE_CONNECT.name}: ${HEADLINE}`,
  description: `Influencer networking event at ${INFLUENCE_CONNECT.venue}. Hosted by ${INFLUENCE_CONNECT.host}.`,
  startDate: '2026-11-18T16:00:00-05:00',
  endDate: '2026-11-18T19:00:00-05:00',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  eventStatus: 'https://schema.org/EventScheduled',
  image: ['https://influencecreators.marketing/tickets/patio-hero.webp'],
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
    { '@type': 'Offer', name: 'Ladies RSVP', price: '0', priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: 'https://influencecreators.marketing/tickets' },
    { '@type': 'Offer', name: 'Gentlemen Entry', price: '25', priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: 'https://influencecreators.marketing/tickets' },
  ],
};

const AMBASSADORS = ['Genesis', 'Seahra', 'Kat', 'Ferrari', 'Alisha'];

const DRINKS = [
  { src: '/tickets/drink-espresso-martini.webp', alt: 'Espresso martini at Serena' },
  { src: '/tickets/drink-smoked-old-fashioned.webp', alt: 'Smoked old fashioned at Serena' },
  { src: '/tickets/serena-dining-room.webp', alt: 'Serena Pastificio dining room' },
];

const label = 'text-[13px] font-bold uppercase tracking-[0.16em] text-[#c9a96e]';

export default function TicketsPage() {
  return (
    <main className="mx-auto min-h-dvh w-full max-w-[480px] bg-black pb-[env(safe-area-inset-bottom)] text-[#f4efe6]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }} />

      {/* Serena string-light patio. Photo only, no text on it. */}
      <div className="ic-hero-photo">
        <img
          src="/tickets/patio-hero.webp"
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
        <p className="mt-3 text-[14px] font-black uppercase tracking-[0.13em] text-[#c9a96e]">Influencer Networking Event</p>
        <h1 className="mt-4 font-display font-extrabold leading-[1.02]">
          <span className="block text-[min(38px,calc((100vw-40px)*0.092))] text-[#f4efe6]">Find the Right</span>
          <span className="mt-1 block whitespace-nowrap text-[min(52px,calc((100vw-40px)*0.117))] font-bold tracking-[0.02em] text-[#c9a96e]">
            BRAND
            <br />
            AMBASSADORS
          </span>
          <span className="mt-2 block text-[min(34px,calc((100vw-40px)*0.08))] text-[#f4efe6]">
            &amp; Influencers for
            <br />
            Your Business
          </span>
        </h1>
      </header>

      <div className="ic-rule mx-5" />

      {/* Host: clearly separate from the ambassadors */}
      <section className="flex gap-4 px-5 py-5" aria-label="Host, date and venue">
        <img
          src="/tickets/host-deseray-marie.webp"
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
            Wed Nov 18
            <br />
            4–7 PM ET
          </p>
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
          href="#rsvp"
          className="mt-4 flex min-h-14 w-full touch-manipulation items-center justify-center bg-[#c9a96e] px-4 text-[16px] font-black uppercase tracking-[0.14em] text-[#0b0a08]"
        >
          Get Tickets&nbsp;&nbsp;→
        </a>
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
                src={`/tickets/ambassador-${name.toLowerCase()}.webp`}
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
          The Night
        </h2>
        <ul className="mt-3 space-y-2 text-[17px] font-medium leading-snug text-[#f4efe6]">
          <li>
            <span className="font-bold text-[#c9a96e]">Ladies</span> · free RSVP, first drink free
          </li>
          <li>
            <span className="font-bold text-[#c9a96e]">Gentlemen</span> · $25 entry, apps included
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
          download="influence-connect-nov18.ics"
          className="mt-3 flex min-h-14 w-full touch-manipulation items-center justify-center border border-[#c9a96e] px-4 text-center text-[15px] font-bold uppercase tracking-[0.14em] text-[#c9a96e]"
        >
          Add to calendar
        </a>
      </section>

      <TicketForm />
    </main>
  );
}
