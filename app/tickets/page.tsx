import type { Metadata } from 'next';
import TicketForm from './ticket-form';
import SoireeHero from './soiree-hero';
import { INFLUENCE_CONNECT } from '@/lib/influence-connect';

export const metadata: Metadata = {
  title: 'Influence Connect — Nov 18 Tickets',
  description:
    'Influence Connect on Wednesday, November 18, 2026, 4–7 PM ET at Serena Pastificio, 301 Plaza Real, Mizner Park, Boca Raton. Hosted by Deseray Marie. Ladies RSVP is free. Gentlemen entry is $25.',
  alternates: { canonical: 'https://influencecreators.marketing/tickets' },
  openGraph: {
    title: 'Influence Connect — Nov 18',
    description:
      'Where Businesses Meet the Right Influencers. Wednesday, Nov 18, 2026, 4–7 PM ET at Serena Pastificio, Boca Raton. Hosted by Deseray Marie.',
    url: 'https://influencecreators.marketing/tickets',
    type: 'website',
  },
};

const eventJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: INFLUENCE_CONNECT.name,
  description: `${INFLUENCE_CONNECT.tagline}. ${INFLUENCE_CONNECT.eyebrow}. Hosted by ${INFLUENCE_CONNECT.host}.`,
  startDate: '2026-11-18T16:00:00-05:00',
  endDate: '2026-11-18T19:00:00-05:00',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  eventStatus: 'https://schema.org/EventScheduled',
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
  organizer: {
    '@type': 'Person',
    name: INFLUENCE_CONNECT.host,
  },
  offers: [
    {
      '@type': 'Offer',
      name: 'Ladies RSVP',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: 'https://influencecreators.marketing/tickets',
    },
    {
      '@type': 'Offer',
      name: 'Gentlemen Entry',
      price: '25',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: 'https://influencecreators.marketing/tickets',
    },
  ],
};

export default function TicketsPage() {
  return (
    <main className="min-h-dvh bg-[#050505] px-[max(10px,env(safe-area-inset-left))] pr-[max(10px,env(safe-area-inset-right))] pt-[max(10px,env(safe-area-inset-top))] text-[#f7f1e4]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }} />
      <div className="mx-auto min-h-[calc(100dvh-20px)] w-full max-w-[440px] border border-[#c8a95a] bg-[#050505]">
        <div className="h-1.5 bg-gradient-to-r from-[#c8a95a] via-[#f3e5ab] to-[#c8a95a]" />
        <SoireeHero />

        <section className="bg-[#c8a95a] px-5 py-4 text-[#16140f]" aria-label="Date and place">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em]">Wednesday</p>
              <p className="font-display text-[clamp(32px,9vw,42px)] leading-none">Nov 18</p>
            </div>
            <div className="border-l border-[#16140f]/25 pl-3">
              <p className="text-[13px] font-bold uppercase tracking-[0.16em]">4 – 7 PM</p>
              <p className="mt-1 font-display text-[22px] leading-none">{INFLUENCE_CONNECT.venue}</p>
              <p className="mt-1 text-[12px] leading-snug">
                {INFLUENCE_CONNECT.street} · {INFLUENCE_CONNECT.area} · Boca Raton
              </p>
            </div>
          </div>
        </section>

        <section className="px-5 py-7" aria-labelledby="dress-code">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#c8a95a]">{INFLUENCE_CONNECT.theme}</p>
          <h2 id="dress-code" className="mt-2 font-display text-[34px] leading-none text-[#f7f1e4]">
            {INFLUENCE_CONNECT.dressCode}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[#f7f1e4]/75">
            {INFLUENCE_CONNECT.tagline}. A meet and greet with the Influence network, hosted by {INFLUENCE_CONNECT.host} at{' '}
            {INFLUENCE_CONNECT.venue} in {INFLUENCE_CONNECT.area}.
          </p>
          <p className="mt-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-[#e6d3a1]">
            {INFLUENCE_CONNECT.eyebrow}
          </p>
        </section>

        <section className="px-5 pb-2" aria-label="Mizner Park">
          <a
            href={INFLUENCE_CONNECT.mapsUrl}
            className="block min-h-14 touch-manipulation border border-[#c8a95a]/70 px-4 py-4"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#c8a95a]">Mizner Park</p>
            <p className="mt-2 font-display text-[26px] leading-none text-[#f7f1e4]">{INFLUENCE_CONNECT.venue}</p>
            <p className="mt-2 text-[14px] leading-snug text-[#f7f1e4]/75">
              {INFLUENCE_CONNECT.street}
              <br />
              {INFLUENCE_CONNECT.area}
              <br />
              {INFLUENCE_CONNECT.cityLine}
            </p>
            <p className="mt-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#e6d3a1]">Open in Google Maps</p>
          </a>
          <a
            href={INFLUENCE_CONNECT.calendarFile}
            download="influence-connect-nov18.ics"
            className="mt-3 flex min-h-14 w-full touch-manipulation items-center justify-center border border-[#c8a95a] px-4 text-center text-[13px] font-bold uppercase tracking-[0.16em] text-[#f3e5ab]"
          >
            Add to calendar
          </a>
        </section>

        <TicketForm />
      </div>
    </main>
  );
}
