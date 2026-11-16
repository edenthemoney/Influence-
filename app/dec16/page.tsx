/* eslint-disable @next/next/no-img-element -- hero collage + venue use static img; roster gallery uses next/image */
import type { Metadata } from 'next';
import Image from 'next/image';
import TicketForm from './ticket-form';
import { StickyBar } from './cta';
import { PAYMENT_LINK_URL, SHORT_LINK } from '@/lib/dec16/payment-link';
import ShareButton from './share-button';
import { INFLUENCE_CONNECT } from '@/lib/dec16/influence-connect';
import { DEC16_HERO_COLLAGE, DEC16_ROSTER } from '@/lib/dec16/roster';

const HEADLINE = 'Meet the Right Brand Ambassadors for Your Business';

export const metadata: Metadata = {
  title: { absolute: `${HEADLINE} — Dec 16 | Influence` },
  description: `${INFLUENCE_CONNECT.name}: an evening for business owners and brand ambassadors. Curated introductions to brand ambassadors matched to your business. Wednesday, December 16, 2026, 4–7 PM ET at Serena Pastificio, 301 Plaza Real, Mizner Park, Boca Raton. Hosted by Deseray Marie. Business Owner Entry $75. Ladies and brand ambassadors RSVP free.`,
  alternates: { canonical: 'https://influencecreators.marketing/dec16' },
  openGraph: {
    title: `${HEADLINE} — Dec 16`,
    description:
      'An evening for business owners and brand ambassadors. Wed, Dec 16, 2026, 4–7 PM ET at Serena Pastificio, Mizner Park, Boca Raton. Hosted by Deseray Marie. Business Owner Entry $75.',
    url: 'https://influencecreators.marketing/dec16',
    type: 'website',
    images: [
      {
        url: 'https://influencecreators.marketing/dec16-assets/dec16-feed-flyer.png',
        width: 1080,
        height: 1350,
        alt: 'Influence Connect, Wed Dec 16 at Serena Pastificio, hosted by Deseray Marie',
      },
    ],
  },
};

const eventJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: `${INFLUENCE_CONNECT.name}: ${HEADLINE}`,
  description: `An evening for business owners and brand ambassadors at ${INFLUENCE_CONNECT.venue}, Mizner Park. Curated introductions to brand ambassadors matched to your business. Hosted by ${INFLUENCE_CONNECT.host}.`,
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
    {
      '@type': 'Offer',
      name: 'Ladies & Brand Ambassadors RSVP',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: 'https://influencecreators.marketing/dec16',
    },
    {
      '@type': 'Offer',
      name: 'Business Owner Entry',
      price: '75',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: PAYMENT_LINK_URL,
    },
  ],
};

const EXPECT = [
  {
    t: 'Arrive and check in',
    d: 'Tell our team what your business does and who you want to reach.',
  },
  {
    t: 'Curated introductions',
    d: 'Deseray and the Influence team introduce brand ambassadors who fit your brand.',
  },
  {
    t: 'Talk in person',
    d: 'Meet over the evening at Serena Pastificio and leave knowing who to work with.',
  },
];

const FOR_WHOM = [
  'Restaurants, lounges, and hospitality',
  'Boutiques, beauty, and wellness',
  'Real estate and luxury services',
  'Founders launching or growing a brand',
];

const FAQ = [
  { q: 'What should I wear?', a: 'All black with a touch of gold.' },
  {
    q: 'Where do I park?',
    a: 'Mizner Park has public garages around the plaza. Serena Pastificio is at 301 Plaza Real.',
  },
  {
    q: 'Is entry free for business owners?',
    a: 'No. Business Owner Entry is $75 for gentlemen. Only ladies and brand ambassadors RSVP free.',
  },
  {
    q: 'What does the $75 Business Owner Entry include?',
    a: 'Entry for one and curated introductions to brand ambassadors matched to your business.',
  },
  {
    q: 'Ladies and brand ambassadors?',
    a: 'Entry is free with an RSVP. Business owners still pay $75.',
  },
  { q: 'Refunds or changes?', a: 'Questions? Contact us.' },
];

const wrap = 'mx-auto w-full max-w-[1180px] px-6 md:px-10';

export default function TicketsPage() {
  return (
    <main className="min-h-dvh w-full bg-black text-[#f4efe6]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }} />

      {/* 1. Hero — private invitation: bold date, venue, host, roster collage */}
      <section className="ic-hero min-h-[min(100dvh,920px)]" aria-label="Influence Connect">
        <div className="ic-hero-collage" aria-hidden="true">
          {DEC16_HERO_COLLAGE.map((m) => (
            <figure key={m.name}>
              <img src={m.image} alt="" width={480} height={600} decoding="async" />
            </figure>
          ))}
        </div>
        <div className="ic-hero-veil" />

        <div className="ic-hero-content">
          <div className={`${wrap} flex items-center justify-between pt-[max(1.15rem,env(safe-area-inset-top))]`}>
            <p className="font-display text-[22px] font-semibold tracking-[0.32em] text-[#c9a96e]">INFLUENCE</p>
            <ShareButton variant="icon" />
          </div>

          <div className={`${wrap} flex min-h-[min(calc(100dvh-4.5rem),860px)] flex-col justify-end pb-14 pt-16 md:justify-center md:pb-20 md:pt-10`}>
            <div className="max-w-[640px]">
              <p className="ic-eyebrow ic-rise">Influence Connect · Hosted by Deseray Marie</p>

              <div className="ic-date-block ic-rise ic-rise-delay mt-7">
                <span className="ic-weekday">Wednesday</span>
                <span className="ic-day">December 16</span>
                <span className="ic-year">2026 · 4–7 PM ET</span>
              </div>

              <div className="ic-rise ic-rise-delay-2 mt-8 space-y-1.5 border-l border-[#c9a96e]/55 pl-5">
                <p className="text-[19px] font-bold leading-snug text-[#f4efe6]">{INFLUENCE_CONNECT.venue}</p>
                <p className="text-[16px] leading-snug text-[#f4efe6]/80">
                  {INFLUENCE_CONNECT.street}, {INFLUENCE_CONNECT.area}
                  <br />
                  Boca Raton
                </p>
              </div>

              <p className="ic-rise ic-rise-delay-2 mt-7 max-w-[480px] text-[17px] leading-relaxed text-[#f4efe6]/85">
                Connect affluent business owners with the right brand ambassadors — in person.
              </p>

              <p className="ic-rise ic-rise-delay-2 mt-5 text-[14px] font-bold uppercase tracking-[0.16em] text-[#c9a96e]">
                Business owners $75 · Ladies &amp; ambassadors RSVP free
              </p>

              <div id="hero-cta" className="ic-rise ic-rise-delay-2 mt-6 flex flex-col gap-3 sm:max-w-[420px]">
                <a href={PAYMENT_LINK_URL} className="ic-btn-gold w-full">
                  Get Business Owner Entry – $75
                </a>
                <a href="#rsvp" className="text-center text-[15px] font-bold uppercase tracking-[0.12em] text-[#c9a96e] underline decoration-[#c9a96e]/45 underline-offset-[6px]">
                  Ladies &amp; Ambassadors: RSVP Free
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Who it's for */}
      <section className={`${wrap} py-16 md:py-24`} aria-labelledby="for-who">
        <div className="md:grid md:grid-cols-12 md:gap-12">
          <p className="ic-eyebrow md:col-span-4">Who it&rsquo;s for</p>
          <div className="mt-5 md:col-span-8 md:mt-0">
            <h2 id="for-who" className="ic-h2">Business owners meeting brand ambassadors.</h2>
            <p className="ic-body mt-5 max-w-[560px]">
              An evening hosted by Deseray Marie for owners and founders who want the right faces representing their brand.
            </p>
            <ul className="mt-9 grid gap-0 border-t border-[#c9a96e]/25 md:grid-cols-2 md:gap-x-10">
              {FOR_WHOM.map((t) => (
                <li key={t} className="border-b border-[#c9a96e]/25 py-4 text-[17px] text-[#f4efe6]">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className={wrap}>
        <div className="ic-hair" />
      </div>

      {/* 3. What to expect */}
      <section className={`${wrap} py-16 md:py-24`} aria-labelledby="expect">
        <p className="ic-eyebrow">What to expect</p>
        <h2 id="expect" className="ic-h2 mt-4 max-w-[720px]">Three unhurried hours. Introductions made for you.</h2>
        <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-12">
          {EXPECT.map((s, i) => (
            <li key={s.t} className="border-t border-[#c9a96e]/40 pt-6">
              <p className="ic-step">0{i + 1}</p>
              <p className="mt-4 text-[20px] font-bold leading-snug text-[#f4efe6]">{s.t}</p>
              <p className="ic-body mt-2">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 4. Full roster gallery */}
      <section className="bg-[#0b0a08] py-16 md:py-28" aria-labelledby="roster">
        <div className={wrap}>
          <div className="md:grid md:grid-cols-12 md:items-end md:gap-10">
            <div className="md:col-span-7">
              <p className="ic-eyebrow">The roster</p>
              <h2 id="roster" className="ic-h2 mt-4">Brand ambassadors from the Influence network.</h2>
            </div>
            <p className="ic-body mt-5 md:col-span-5 md:mt-0 md:pb-1">
              The full Influence roster — real creators you can meet in person on December 16.
            </p>
          </div>

          <ul className="ic-roster-grid mt-12 md:mt-16">
            {DEC16_ROSTER.map((m) => (
              <li key={m.name} className="ic-roster-item">
                <div className="ic-frame relative">
                  <Image
                    src={m.image}
                    alt={m.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover object-[center_15%]"
                    quality={75}
                  />
                </div>
                <p className="ic-roster-name">{m.name}</p>
              </li>
            ))}
          </ul>

          {/* Host spotlight within the roster narrative */}
          <div className="mt-16 grid items-center gap-8 border-t border-[#c9a96e]/25 pt-14 md:mt-20 md:grid-cols-[minmax(0,280px)_1fr] md:gap-14 md:pt-16">
            <div className="ic-photo relative aspect-[4/5] border border-[#c9a96e]/40">
              <Image
                src="/images/Des/des-5.jpg"
                alt="Deseray Marie, host of Influence Connect"
                fill
                sizes="(max-width: 768px) 80vw, 280px"
                className="object-cover object-[50%_20%]"
                quality={80}
              />
            </div>
            <div>
              <p className="ic-eyebrow">Your host</p>
              <h3 className="mt-3 font-display text-[clamp(32px,6vw,48px)] font-semibold leading-none text-[#f4efe6]">
                Deseray Marie
              </h3>
              <p className="ic-body mt-5 max-w-[480px]">
                Deseray hosts the evening and, with the Influence team, introduces each business owner to brand ambassadors who fit their brand.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Venue */}
      <section className={`${wrap} py-16 md:py-28`} aria-labelledby="venue">
        <div className="md:grid md:grid-cols-12 md:items-center md:gap-14">
          <div className="md:col-span-7">
            <div className="ic-photo aspect-[4/3] border border-[#c9a96e]/25">
              <img
                src="/dec16-assets/v3/venue-room.webp"
                alt="Serena Pastificio dining room, Boca Raton"
                width={960}
                height={700}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
          <div className="mt-10 md:col-span-5 md:mt-0">
            <p className="ic-eyebrow">The venue</p>
            <h2 id="venue" className="ic-h2 mt-4">
              Serena Pastificio
            </h2>
            <p className="ic-body mt-4">
              {INFLUENCE_CONNECT.street}, {INFLUENCE_CONNECT.area}
              <br />
              Boca Raton, FL 33432
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row md:flex-col">
              <a href={INFLUENCE_CONNECT.mapsUrl} className="ic-btn-ghost w-full sm:flex-1 md:w-full">
                Open in Maps
              </a>
              <a
                href={INFLUENCE_CONNECT.calendarFile}
                download="influence-connect-dec16.ics"
                className="ic-btn-ghost w-full sm:flex-1 md:w-full"
              >
                Add to calendar
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Tickets + RSVP */}
      <section id="tickets" className="scroll-mt-6 bg-[#0b0a08] py-16 md:py-28" aria-labelledby="tickets-h">
        <div className={wrap}>
          <p className="ic-eyebrow">Reserve your place</p>
          <h2 id="tickets-h" className="ic-h2 mt-4">
            Wednesday, December 16
          </h2>
          <p className="mt-2 text-[18px] text-[#f4efe6]/85">4–7 PM ET · Serena Pastificio, Boca Raton</p>

          <p className="mt-6 max-w-[560px] text-[16px] leading-relaxed text-[#f4efe6]/85">
            Business owners pay <span className="font-bold text-[#f4efe6]">$75</span> — entry is not free.
            Ladies and brand ambassadors RSVP free.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8">
            <div className="ic-card p-7 md:p-10">
              <p className="ic-eyebrow">Business Owner Entry · Paid</p>
              <p className="mt-4 font-display text-[64px] font-semibold leading-none text-[#c9a96e]">$75</p>
              <p className="mt-2 text-[15px] font-bold uppercase tracking-[0.14em] text-[#f4efe6]/85">Gentlemen / business owners</p>
              <ul className="mt-6 space-y-3 text-[17px] text-[#f4efe6]/90">
                <li>· Curated introductions to brand ambassadors matched to your business</li>
                <li>· Hosted by Deseray Marie</li>
                <li>· Serena Pastificio, Mizner Park</li>
              </ul>
              <a href={PAYMENT_LINK_URL} className="ic-btn-gold mt-8 w-full">
                Get Business Owner Entry – $75
              </a>
              <p className="mt-3 text-center text-[14px] text-[#f4efe6]/65">Secure checkout by Stripe · Not free</p>
            </div>

            <div className="ic-card p-7 md:p-10">
              <p className="ic-eyebrow">Ladies &amp; brand ambassadors only</p>
              <p className="mt-4 font-display text-[40px] font-semibold leading-none text-[#f4efe6]">Free RSVP</p>
              <p className="mt-3 text-[17px] text-[#f4efe6]/85">
                Free for ladies and brand ambassadors — not for business owners. Add your name to the door list.
              </p>
              <div className="mt-6">
                <TicketForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Share / Instagram flyer */}
      <section id="share" className={`${wrap} scroll-mt-6 py-16 md:py-28`} aria-labelledby="share-h">
        <div className="md:grid md:grid-cols-12 md:items-start md:gap-14">
          <div className="md:col-span-5">
            <p className="ic-eyebrow">Share the invitation</p>
            <h2 id="share-h" className="ic-h2 mt-4">
              Instagram story flyer + shareable link
            </h2>
            <p className="ic-body mt-5">
              Copy the link, share the flyer to your story, and paste it as a Link sticker. Business Owner Entry is $75 on the page.
            </p>
            <p className="mt-6 break-all font-display text-[22px] font-medium tracking-wide text-[#c9a96e]">
              {SHORT_LINK}
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <ShareButton />
              <a href="/dec16/share" className="ic-btn-ghost w-full">
                Open share tools &amp; flyers
              </a>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="/dec16-assets/dec16-story-flyer.png"
                  download="influence-dec16-story.png"
                  className="ic-btn-ghost !min-h-[48px] !text-[12px]"
                >
                  Story flyer
                </a>
                <a
                  href="/dec16-assets/dec16-feed-flyer.png"
                  download="influence-dec16-feed.png"
                  className="ic-btn-ghost !min-h-[48px] !text-[12px]"
                >
                  Feed flyer
                </a>
              </div>
            </div>
          </div>
          <div className="mt-10 md:col-span-7 md:mt-0">
            <div className="mx-auto max-w-[320px] border border-[#c9a96e]/45 md:ml-auto md:mr-0 md:max-w-[360px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/dec16-assets/dec16-story-flyer.jpg"
                width={1080}
                height={1920}
                alt="Influence Connect Dec 16 story flyer — Business Owners $75, Ladies RSVP free"
                className="w-full"
                loading="lazy"
                decoding="async"
              />
            </div>
            <p className="mt-4 text-center text-[14px] text-[#f4efe6]/65 md:text-right">
              Flyer shows Business Owners $75 · Ladies RSVP free
            </p>
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className={`${wrap} py-16 md:py-24`} aria-labelledby="faq">
        <div className="md:grid md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4">
            <p className="ic-eyebrow">Good to know</p>
            <h2 id="faq" className="ic-h2 mt-4">
              Questions
            </h2>
          </div>
          <div className="mt-8 border-t border-[#c9a96e]/25 md:col-span-8 md:mt-0">
            {FAQ.map((f) => (
              <details key={f.q} className="ic-faq border-b border-[#c9a96e]/25">
                <summary className="flex min-h-[64px] items-center justify-between gap-4 py-4 text-[18px] font-bold text-[#f4efe6]">
                  {f.q}
                  <span className="ic-plus font-display text-[28px] font-normal leading-none text-[#c9a96e]" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="ic-body pb-5 pr-8">
                  {f.a === 'Questions? Contact us.' ? (
                    <>
                      Questions?{' '}
                      <a href="/contact" className="text-[#c9a96e] underline underline-offset-4">
                        Contact us
                      </a>
                      .
                    </>
                  ) : (
                    f.a
                  )}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Final CTA */}
      <section id="final-cta" className="border-t border-[#c9a96e]/25 bg-[#0b0a08]" aria-label="Get your entry">
        <div className={`${wrap} py-16 text-center md:py-24`}>
          <p className="font-display text-[22px] font-semibold tracking-[0.32em] text-[#c9a96e]">INFLUENCE</p>
          <h2 className="ic-h2 mx-auto mt-6 max-w-[640px]">Wednesday, December 16 · Serena Pastificio</h2>
          <p className="mx-auto mt-4 max-w-[480px] text-[17px] text-[#f4efe6]/80">
            Hosted by Deseray Marie. Business Owner Entry is <span className="font-bold text-[#f4efe6]">$75</span> — not free.
            Ladies and brand ambassadors RSVP free.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:max-w-[420px] sm:mx-auto">
            <a href={PAYMENT_LINK_URL} className="ic-btn-gold w-full">
              Get Business Owner Entry – $75
            </a>
            <a href="#rsvp" className="text-[15px] font-bold uppercase tracking-[0.12em] text-[#c9a96e] underline decoration-[#c9a96e]/45 underline-offset-[6px]">
              Ladies &amp; Ambassadors: RSVP Free
            </a>
          </div>
        </div>
      </section>

      <footer className={`${wrap} pb-36 pt-10 md:pb-16`}>
        <div className="ic-hair" />
        <div className="mt-10 flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display text-[26px] font-semibold tracking-[0.28em] text-[#c9a96e]">INFLUENCE</p>
            <p className="mt-2 text-[15px] text-[#f4efe6]/75">
              Influence Connect · Wed Dec 16 · {SHORT_LINK}
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:max-w-[280px] md:w-auto">
            <ShareButton />
            <a href="/dec16/share" className="text-center text-[14px] font-bold uppercase tracking-[0.14em] text-[#c9a96e] underline decoration-[#c9a96e]/40 underline-offset-4">
              Flyer downloads
            </a>
          </div>
        </div>
      </footer>

      <StickyBar />
    </main>
  );
}
