/* eslint-disable @next/next/no-img-element -- pre-sized WebP assets in /public/dec16-assets */
import type { Metadata } from 'next';
import TicketForm from './ticket-form';
import Countdown from './countdown';
import { StickyBar } from './cta';
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
    images: [{ url: 'https://influencecreators.marketing/dec16-assets/dec16-feed-flyer.png', width: 1080, height: 1350, alt: 'Influence Connect, Wed Dec 16 at Serena Pastificio, hosted by Deseray Marie' }],
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

const AMBASSADORS = [
  { name: 'Genesis', src: '/dec16-assets/v3/amb-genesis.webp' },
  { name: 'Seahra', src: '/dec16-assets/v3/amb-seahra.webp' },
  { name: 'Kat', src: '/dec16-assets/v3/amb-kat.webp' },
  { name: 'Alisha', src: '/dec16-assets/v3/amb-alisha.webp' },
];

const STEPS = [
  { t: 'Arrive and check in', d: 'Tell our team what your business does and who you want to reach.' },
  { t: 'We make the introductions', d: 'Deseray and the Influence team bring over brand ambassadors who fit your brand.' },
  { t: 'Talk it through', d: 'Meet in person over apps and drinks, and leave with the right people to work with.' },
];

const FAQ = [
  { q: 'What should I wear?', a: 'All black with a touch of gold.' },
  { q: 'Where do I park?', a: 'Mizner Park has public garages around the plaza. Serena Pastificio is at 301 Plaza Real.' },
  { q: 'What does the $75 Business Owner Entry include?', a: 'Entry for one, curated introductions to brand ambassadors matched to your business, and apps on us.' },
  { q: 'Ladies and brand ambassadors?', a: 'Entry is free with an RSVP, and your first drink is free.' },
  { q: 'Refunds or changes?', a: 'Questions? Contact us.' },
];

const wrap = 'mx-auto w-full max-w-[1120px] px-6 md:px-10';

export default function TicketsPage() {
  return (
    <main className="min-h-dvh w-full bg-black text-[#f4efe6]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }} />

      {/* 1. Hero */}
      <section className="relative md:min-h-[min(100dvh,860px)]" aria-label="Influence Connect">
        <div className="absolute inset-x-0 top-0 z-20">
          <div className={`${wrap} flex items-center justify-between pt-[max(1.1rem,env(safe-area-inset-top))]`}>
            <p className="font-display text-[22px] font-semibold tracking-[0.28em] text-[#c9a96e]">INFLUENCE</p>
            <ShareButton variant="icon" />
          </div>
        </div>
        <div className="md:absolute md:inset-y-0 md:right-0 md:w-[52%]">
          <div className="ic-photo ic-hero-img aspect-[4/4.4] w-full md:aspect-auto md:h-full">
            <img
              src="/dec16-assets/v3/des-hero.webp"
              alt="Deseray Marie, host of Influence Connect"
              width={1200}
              height={1500}
              fetchPriority="high"
              decoding="async"
              className="object-[50%_18%]"
            />
          </div>
        </div>
        <div className={`${wrap} relative z-10 -mt-24 pb-12 md:mt-0 md:flex md:min-h-[min(100dvh,860px)] md:items-center md:pb-0`}>
          <div className="md:max-w-[50%] md:pr-10">
            <p className="ic-eyebrow">Influence Connect</p>
            <h1 className="mt-4 font-display text-[clamp(40px,11vw,68px)] font-semibold leading-[1.02] tracking-[-0.01em]">
              Meet the Right <span className="text-[#c9a96e]">Brand Ambassadors</span> for Your Business
            </h1>
            <div className="mt-6 space-y-1 text-[18px] leading-snug">
              <p className="font-bold text-[#f4efe6]">Wednesday, December 16 · 4–7 PM</p>
              <p className="text-[#f4efe6]/85"><span className="whitespace-nowrap">Serena Pastificio</span> · <span className="whitespace-nowrap">Mizner Park, Boca Raton</span></p>
            </div>
            <div id="hero-cta" className="mt-8">
              <a href={PAYMENT_LINK_URL} className="ic-btn-gold w-full md:w-auto md:px-10">Business Owner Entry · $75 →</a>
              <p className="mt-4 text-[15px] text-[#f4efe6]/80">
                Ladies &amp; brand ambassadors: <a href="#rsvp" className="text-[#c9a96e] underline decoration-[#c9a96e]/50 underline-offset-4">RSVP free</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. The evening */}
      <section className={`${wrap} py-16 md:py-28`} aria-labelledby="evening">
        <div className="md:grid md:grid-cols-12 md:gap-10">
          <p id="evening" className="ic-eyebrow md:col-span-4">The evening</p>
          <div className="mt-5 md:col-span-8 md:mt-0">
            <p className="font-display text-[clamp(28px,7.4vw,44px)] font-medium leading-[1.2] text-[#f4efe6]">
              An evening for business owners and the brand ambassadors who can carry their name.
            </p>
            <p className="ic-body mt-6 max-w-[620px]">
              Three unhurried hours at Serena Pastificio, hosted by Deseray Marie. A curated guest list, apps on us, and introductions made for you, in person.
            </p>
            <p className="mt-6 text-[14px] font-bold uppercase tracking-[0.18em] text-[#f4efe6]/70">New date · moved from Nov 18</p>
          </div>
        </div>
      </section>

      <div className={wrap}><div className="ic-hair" /></div>

      {/* 3. Who it's for */}
      <section className={`${wrap} py-16 md:py-24`} aria-labelledby="for-who">
        <div className="md:grid md:grid-cols-12 md:gap-10">
          <p className="ic-eyebrow md:col-span-4">Who it&rsquo;s for</p>
          <div className="mt-5 md:col-span-8 md:mt-0">
            <h2 id="for-who" className="ic-h2">Business owners, founders and brands.</h2>
            <ul className="mt-8 grid gap-0 border-t border-[#c9a96e]/25 md:grid-cols-2 md:gap-x-10">
              {[
                'Restaurants, lounges and hospitality',
                'Boutiques, beauty and wellness',
                'Real estate and luxury services',
                'Founders launching or growing a brand',
              ].map((t) => (
                <li key={t} className="border-b border-[#c9a96e]/25 py-4 text-[18px] text-[#f4efe6]">{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4. How the introductions work */}
      <section className="bg-[#0b0a08] py-16 md:py-24" aria-labelledby="how">
        <div className={wrap}>
          <p className="ic-eyebrow">How the introductions work</p>
          <h2 id="how" className="ic-h2 mt-4 max-w-[760px]">Three simple steps, handled for you.</h2>
          <ol className="mt-10 grid gap-10 md:grid-cols-3 md:gap-12">
            {STEPS.map((s, i) => (
              <li key={s.t} className="border-t border-[#c9a96e]/40 pt-6">
                <p className="ic-step">0{i + 1}</p>
                <p className="mt-4 text-[20px] font-bold leading-snug text-[#f4efe6]">{s.t}</p>
                <p className="ic-body mt-2">{s.d}</p>
              </li>
            ))}
          </ol>
          <p className="ic-eyebrow mt-16">Brand ambassadors from the Influence network</p>
          <ul className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
            {AMBASSADORS.map((a) => (
              <li key={a.name}>
                <div className="ic-photo aspect-[4/5]">
                  <img src={a.src} alt={a.name} width={640} height={800} loading="lazy" decoding="async" />
                </div>
                <p className="mt-3 font-display text-[20px] font-medium text-[#f4efe6]">{a.name}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[16px] text-[#f4efe6]/80">&amp; many more from the Influence network.</p>
        </div>
      </section>

      {/* 5. Host */}
      <section className={`${wrap} py-16 md:py-28`} aria-labelledby="host">
        <div className="grid grid-cols-[128px_1fr] items-center gap-6 md:grid-cols-2 md:gap-x-16 md:gap-y-6">
          <div className="ic-photo aspect-[4/5] w-full max-w-[460px] border border-[#c9a96e]/40 md:row-span-2">
            <img src="/dec16-assets/v3/des-host.webp" alt="Deseray Marie" width={800} height={1000} loading="lazy" decoding="async" className="object-[50%_25%]" />
          </div>
          <div className="md:self-end">
            <p className="ic-eyebrow">Your host</p>
            <h2 id="host" className="ic-h2 mt-3">Deseray Marie</h2>
          </div>
          <div className="col-span-2 md:col-span-1 md:col-start-2 md:self-start">
            <p className="ic-body max-w-[520px]">
              Deseray hosts the evening and, with the Influence team, introduces each business owner to the brand ambassadors who fit their brand.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Venue */}
      <section className="bg-[#0b0a08] pb-16 md:py-24" aria-labelledby="venue">
        <div className="md:mx-auto md:grid md:max-w-[1120px] md:grid-cols-12 md:items-center md:gap-12 md:px-10">
          <div className="md:col-span-7">
            <div className="ic-photo aspect-[4/3]">
              <img src="/dec16-assets/v3/venue-room.webp" alt="Serena Pastificio dining room, Boca Raton" width={960} height={700} loading="lazy" decoding="async" />
            </div>
          </div>
          <div className="px-6 pt-10 md:col-span-5 md:px-0 md:pt-0">
            <p className="ic-eyebrow">The venue</p>
            <h2 id="venue" className="ic-h2 mt-4">Serena Pastificio</h2>
            <p className="ic-body mt-4">{INFLUENCE_CONNECT.street}, Mizner Park<br />Boca Raton, FL 33432</p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2 md:grid-cols-1">
              <a href={INFLUENCE_CONNECT.mapsUrl} className="ic-btn-ghost">Open in Maps</a>
              <a href={INFLUENCE_CONNECT.calendarFile} download="influence-connect-dec16.ics" className="ic-btn-ghost">Add to calendar</a>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Tickets */}
      <section id="tickets" className={`${wrap} scroll-mt-6 py-16 md:py-28`} aria-labelledby="tickets-h">
        <p className="ic-eyebrow">Tickets</p>
        <h2 id="tickets-h" className="ic-h2 mt-4">Wednesday, December 16</h2>
        <p className="mt-2 text-[18px] text-[#f4efe6]/85">4–7 PM ET · Serena Pastificio, Boca Raton</p>
        <div className="mt-8 max-w-[520px]"><Countdown /></div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8">
          <div className="ic-card p-7 md:p-10">
            <p className="ic-eyebrow">Business Owner Entry</p>
            <p className="mt-4 font-display text-[64px] font-semibold leading-none text-[#f4efe6]">$75</p>
            <ul className="mt-6 space-y-3 text-[17px] text-[#f4efe6]/90">
              <li>· Curated introductions to brand ambassadors matched to your business</li>
              <li>· Apps on us</li>
              <li>· Hosted by Deseray Marie</li>
            </ul>
            <a href={PAYMENT_LINK_URL} className="ic-btn-gold mt-8 w-full">Get my entry · $75 →</a>
            <p className="mt-3 text-center text-[14px] text-[#f4efe6]/70">Secure checkout by Stripe</p>
          </div>
          <div className="ic-card p-7 md:p-10">
            <p className="ic-eyebrow">Ladies &amp; brand ambassadors</p>
            <p className="mt-4 font-display text-[40px] font-semibold leading-none text-[#f4efe6]">Free RSVP</p>
            <p className="mt-3 text-[17px] text-[#f4efe6]/85">First drink on us. Add your name to the door list.</p>
            <div className="mt-6"><TicketForm /></div>
          </div>
        </div>
      </section>

      <div className={wrap}><div className="ic-hair" /></div>

      {/* 8. FAQ */}
      <section className={`${wrap} py-16 md:py-24`} aria-labelledby="faq">
        <div className="md:grid md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4">
            <p className="ic-eyebrow">Good to know</p>
            <h2 id="faq" className="ic-h2 mt-4">Questions</h2>
          </div>
          <div className="mt-8 border-t border-[#c9a96e]/25 md:col-span-8 md:mt-0">
            {FAQ.map((f) => (
              <details key={f.q} className="ic-faq border-b border-[#c9a96e]/25">
                <summary className="flex min-h-[64px] items-center justify-between gap-4 py-4 text-[18px] font-bold text-[#f4efe6]">
                  {f.q}
                  <span className="ic-plus font-display text-[28px] font-normal leading-none text-[#c9a96e]" aria-hidden="true">+</span>
                </summary>
                <p className="ic-body pb-5 pr-8">
                  {f.a === 'Questions? Contact us.' ? (<>Questions? <a href="/contact" className="text-[#c9a96e] underline underline-offset-4">Contact us</a>.</>) : f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className={`${wrap} pb-36 pt-6 md:pb-16`}>
        <div className="ic-hair" />
        <div className="mt-10 flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display text-[26px] font-semibold tracking-[0.28em] text-[#c9a96e]">INFLUENCE</p>
            <p className="mt-2 text-[15px] text-[#f4efe6]/75">Influence Connect · Wed Dec 16 · Serena Pastificio, Boca Raton</p>
          </div>
          <div className="w-full md:w-auto"><ShareButton /></div>
        </div>
      </footer>

      <StickyBar />
    </main>
  );
}
