import type { Metadata } from 'next';
import TicketForm from './ticket-form';
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
        <header className="px-5 pb-6 pt-7">
          <p className="text-[11px] font-bold uppercase tracking-[0.42em] text-[#c8a95a]">Influence</p>
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#f7f1e4]/70">Presents</p>
          <h1 className="mt-2 font-display text-[52px] font-medium leading-[0.88] text-[#f7f1e4] sm:text-[60px]">
            Influence
            <br />
            Connect
          </h1>
          <p className="mt-4 max-w-[18rem] font-display text-[26px] italic leading-tight text-[#e6d3a1]">
            {INFLUENCE_CONNECT.tagline}
          </p>
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#f7f1e4]/75">
            {INFLUENCE_CONNECT.eyebrow}
          </p>
          <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#c8a95a]">Hosted by</p>
          <p className="font-display text-[28px] leading-none text-[#f7f1e4]">{INFLUENCE_CONNECT.host}</p>
        </header>

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

        <TicketForm />
      </div>
    </main>
  );
}
