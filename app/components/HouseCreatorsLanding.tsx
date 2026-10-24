import Link from 'next/link';
import type { Metadata } from 'next';
import { ChevronRight, Check, Phone, MapPin } from 'lucide-react';
import MobileNav from './MobileNav';
import { HOUSE_CITIES, HOUSE_MONTHLY, HOUSE_TRIAL, cityPath, pillarPath, type HouseCity } from '@/lib/houseCreators';

const gold = '#c9a96e';
const BOOK = '/model-booking?service=house&billing=monthly';
const TRIAL = '/model-booking?service=house';

export function houseMetadata(city?: HouseCity): Metadata {
  if (!city) {
    return {
      title: 'Hire Influencers for Your Restaurant, Bar or Club \u2014 Monthly Packages | Influence',
      description: 'Hire South Florida influencers to visit your restaurant, bar, or nightclub on a weekly or monthly schedule. They film the night, post a collab on their Instagram and yours, and run stories so the Reel keeps getting views. From $850 trial / $3,200 per month.',
      alternates: { canonical: 'https://influencemodels.agency/hire-influencers-for-restaurant' },
      openGraph: {
        title: 'Hire Influencers for Restaurants, Bars & Clubs in South Florida',
        description: 'Monthly influencer visits. Collab posts on both Instagrams. Stories that keep the Reels alive.',
        url: 'https://influencemodels.agency/hire-influencers-for-restaurant',
      },
    };
  }
  const url = `https://influencemodels.agency${cityPath(city.slug)}`;
  return {
    title: `Hire Influencers for Restaurants in ${city.name}, FL \u2014 Monthly Visits | Influence`,
    description: `Hire local influencers for restaurants, bars, and clubs in ${city.name}. They visit on a schedule, vlog the experience, collab-post to their Instagram and your official page, and run stories after. Serving ${city.neighborhoods.slice(0, 4).join(', ')}.`,
    alternates: { canonical: url },
    openGraph: {
      title: `Hire Restaurant Influencers in ${city.name}`,
      description: city.hook,
      url,
    },
  };
}

function schemas(city?: HouseCity) {
  const url = city
    ? `https://influencemodels.agency${cityPath(city.slug)}`
    : 'https://influencemodels.agency/hire-influencers-for-restaurant';
  const name = city
    ? `Hire Restaurant Influencers in ${city.name}`
    : 'Hire Influencers for Restaurants, Bars & Clubs';
  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    serviceType: 'Influencer marketing for restaurants, bars, and nightclubs',
    provider: {
      '@type': 'Organization',
      name: 'Influence Models Agency',
      url: 'https://influencemodels.agency',
      telephone: '+15615520392',
    },
    areaServed: city
      ? { '@type': 'City', name: city.name, containedInPlace: { '@type': 'State', name: 'Florida' } }
      : HOUSE_CITIES.map((c) => ({ '@type': 'City', name: c.name })),
    url,
    offers: HOUSE_MONTHLY.map((p) => ({
      '@type': 'Offer',
      name: p.name,
      price: p.price,
      priceCurrency: 'USD',
    })),
  };
  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: city
          ? `How much does it cost to hire an influencer for a restaurant in ${city.name}?`
          : 'How much does it cost to hire an influencer for a restaurant?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A one-night trial with 1 influencer starts at $850. Monthly packages start at $3,200 for 1 influencer (2 visits, 2 collab posts, and story support). 2 influencers are $5,800/mo. Featured 100k+ talent is quoted separately.',
        },
      },
      {
        '@type': 'Question',
        name: 'What does the influencer actually post?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Each visit includes an on-site vlog of the real experience, one Instagram collab Reel on their personal account and your official page, a same-day story set, and 3 follow-up stories over 72 hours that drive views back to the Reel.',
        },
      },
      {
        '@type': 'Question',
        name: city ? `Do you send ${city.name} influencers or people from out of town?` : 'Are the influencers local?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: city
            ? `We prioritize creators who already live and post in ${city.name} and nearby ${city.region} so the audience can actually walk in.`
            : 'We prioritize South Florida creators whose audience can actually walk into the room. Nationwide remote UGC is a different service.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I pick which influencers come in?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Browse the roster and request specific talent, or we match by neighborhood, look, and follower range. Price assumes 10k-80k roster talent. Higher-reach creators are a custom line item.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is this only for restaurants?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Same package works for bars, lounges, nightclubs, hotel restaurants, rooftops, brunch spots, and any room where people show up in person.',
        },
      },
    ],
  };
  const crumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://influencemodels.agency' },
      { '@type': 'ListItem', position: 2, name: 'Hire Restaurant Influencers', item: 'https://influencemodels.agency/hire-influencers-for-restaurant' },
      ...(city ? [{ '@type': 'ListItem', position: 3, name: city.name, item: url }] : []),
    ],
  };
  return { service, faq, crumbs };
}

export default function HouseCreatorsLanding({ city }: { city?: HouseCity }) {
  const { service, faq, crumbs } = schemas(city);
  const place = city?.name ?? 'South Florida';
  return (
    <div className="min-h-screen bg-[#080808]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />

      <nav className="border-b border-white/[0.06] bg-[#080808]/95 backdrop-blur-xl fixed w-full z-50">
        <div className="flex items-center justify-between h-16 md:h-20 px-6 md:px-14">
          <div className="flex items-center gap-4">
            <MobileNav />
            <div className="hidden md:flex items-center gap-10">
              <Link href="/marketplace" className="text-white/55 hover:text-white text-[11px] tracking-widest uppercase">Talent</Link>
              <Link href="/services" className="text-white/55 hover:text-white text-[11px] tracking-widest uppercase">Services</Link>
              <Link href={pillarPath()} className="text-white hover:text-white text-[11px] tracking-widest uppercase">Restaurant Influencers</Link>
            </div>
          </div>
          <Link href="/" className="font-display font-semibold tracking-[0.4em] uppercase" style={{ fontSize: '18px', color: gold }}>Influence</Link>
          <Link href={BOOK} className="text-[11px] md:text-[12px] tracking-widest uppercase px-5 py-3 md:px-8 md:py-4 font-bold" style={{ backgroundColor: gold, color: '#000' }}>Book Influencers</Link>
        </div>
      </nav>

      <section className="pt-32 md:pt-44 pb-16 md:pb-24 px-8 md:px-16">
        <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6" style={{ color: gold }}>
          {city ? `${city.name}, Florida \u00b7 ${city.region}` : 'South Florida \u00b7 Restaurants, Bars & Clubs'}
        </p>
        <h1 className="font-display font-bold italic text-white leading-[0.9] mb-6" style={{ fontSize: 'clamp(40px, 7vw, 88px)' }}>
          {city ? (
            <>Hire influencers<br />for restaurants<br />in {city.name}.</>
          ) : (
            <>Hire influencers<br />for your restaurant,<br />bar, or club.</>
          )}
        </h1>
        <p className="text-white/50 text-lg max-w-2xl leading-relaxed mb-8">
          {city
            ? city.hook
            : 'We send local influencers into your room on a weekly or monthly calendar. They film the night, post a collab on their Instagram and your official page, then run stories so the Reel does not die in 24 hours.'}
        </p>
        {city && (
          <p className="text-white/40 text-base max-w-2xl leading-relaxed mb-10">
            {city.why} Serving {city.venues}.
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href={BOOK} className="inline-flex items-center justify-center gap-3 px-10 py-5 text-[13px] font-bold tracking-widest uppercase" style={{ backgroundColor: gold, color: '#000' }}>
            See Monthly Packages <ChevronRight className="h-4 w-4" />
          </Link>
          <a href="tel:+15615520392" className="inline-flex items-center justify-center gap-3 px-8 py-5 text-[13px] font-bold tracking-widest uppercase border border-white/20 text-white/60">
            <Phone className="h-4 w-4" /> (561) 552-0392
          </a>
        </div>
      </section>

      <section className="border-t border-white/[0.06] py-16 px-8 md:px-16">
        <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-8" style={{ color: gold }}>What You Get Every Visit</p>
        <div className="grid md:grid-cols-4 gap-5 max-w-6xl">
          {[
            { t: 'They come in', d: `An influencer shows up at your ${place} location and vlogs the real experience \u2014 not a sterile product demo.` },
            { t: 'Collab on both feeds', d: 'One Reel published as an Instagram Collab: their personal account + your official restaurant page.' },
            { t: 'Stories after', d: 'Same-day story set plus 3 boost stories over 72 hours pointing at the Reel so it keeps getting views.' },
            { t: 'A calendar', d: 'Monthly, bi-weekly, or weekly. You know who is coming before they walk in.' },
          ].map((x) => (
            <div key={x.t} className="border border-white/[0.06] p-6">
              <h2 className="text-white font-bold mb-2">{x.t}</h2>
              <p className="text-white/40 text-[13px] leading-relaxed">{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="packages" className="border-t border-white/[0.06] py-20 md:py-28 px-8 md:px-16 bg-[#060606]">
        <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-4" style={{ color: gold }}>Monthly Packages</p>
        <h2 className="font-display font-bold italic text-white leading-[0.9] mb-4" style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}>
          Priced by how many<br />influencers walk in.
        </h2>
        <p className="text-white/40 text-sm max-w-xl mb-12">
          Each influencer on a monthly plan visits twice a month. More influencers = more feeds, not just more posts from the same person. 10k-80k roster talent. 100k+ quoted separately.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl">
          {HOUSE_MONTHLY.map((p) => (
            <div
              key={p.id}
              className="border p-8 flex flex-col"
              style={{
                borderColor: p.popular ? gold : 'rgba(255,255,255,0.06)',
                backgroundColor: p.popular ? 'rgba(201,169,110,0.04)' : 'transparent',
              }}
            >
              {p.popular && (
                <p className="text-[9px] font-bold tracking-[0.3em] uppercase mb-3" style={{ color: gold }}>Most Booked</p>
              )}
              <h3 className="text-white font-bold text-xl">{p.name}</h3>
              <p className="text-white/35 text-sm mb-4">{p.tagline}</p>
              <p className="font-display italic text-4xl mb-6" style={{ color: gold }}>
                ${p.price.toLocaleString()}<span className="text-lg text-white/30">/mo</span>
              </p>
              <ul className="space-y-2 mb-8 text-white/40 text-[13px]">
                <li className="flex gap-2"><Check className="h-3.5 w-3.5 mt-0.5 shrink-0" style={{ color: gold }} />{p.influencers} influencer{p.influencers > 1 ? 's' : ''} on rotation</li>
                <li className="flex gap-2"><Check className="h-3.5 w-3.5 mt-0.5 shrink-0" style={{ color: gold }} />{p.visits} on-site visits / month</li>
                <li className="flex gap-2"><Check className="h-3.5 w-3.5 mt-0.5 shrink-0" style={{ color: gold }} />{p.posts} collab Reels (their IG + yours)</li>
                <li className="flex gap-2"><Check className="h-3.5 w-3.5 mt-0.5 shrink-0" style={{ color: gold }} />Stories the day of + 72hr boost</li>
                <li className="flex gap-2"><Check className="h-3.5 w-3.5 mt-0.5 shrink-0" style={{ color: gold }} />{place} location \u00b7 assets delivered</li>
              </ul>
              <Link
                href={`${BOOK}&package=${p.id}`}
                className="mt-auto text-center py-4 text-[12px] font-bold tracking-widest uppercase"
                style={{
                  backgroundColor: p.popular ? gold : 'transparent',
                  color: p.popular ? '#000' : 'rgba(255,255,255,0.6)',
                  border: p.popular ? 'none' : '1px solid rgba(255,255,255,0.12)',
                }}
              >
                Book {p.influencers} Influencer{p.influencers > 1 ? 's' : ''}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-white/[0.06] py-20 px-8 md:px-16">
        <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-4" style={{ color: gold }}>Try It Once</p>
        <h2 className="font-display font-bold italic text-white mb-10" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
          One-night trials before you retain.
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-6xl">
          {HOUSE_TRIAL.map((p) => (
            <Link key={p.id} href={`${TRIAL}&package=${p.id}`} className="border border-white/[0.06] p-5 hover:border-[#c9a96e]/40 transition-colors">
              <p className="text-white font-bold text-sm mb-1">{p.influencers} influencer{p.influencers > 1 ? 's' : ''}</p>
              <p className="text-[13px] font-bold" style={{ color: gold }}>${p.price.toLocaleString()}</p>
              <p className="text-white/30 text-[11px] mt-2">{p.tagline}</p>
            </Link>
          ))}
        </div>
      </section>

      {city && (
        <section className="border-t border-white/[0.06] py-20 px-8 md:px-16 bg-[#060606]">
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-4" style={{ color: gold }}>{city.name} Service Area</p>
          <h2 className="font-display font-bold italic text-white mb-8" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
            Neighborhoods we book in {city.name}.
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl">
            {city.neighborhoods.map((n) => (
              <div key={n} className="flex items-center gap-2 border border-white/[0.06] px-4 py-3">
                <MapPin className="h-3.5 w-3.5" style={{ color: gold }} />
                <span className="text-white/60 text-sm">{n}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="border-t border-white/[0.06] py-20 px-8 md:px-16">
        <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-4" style={{ color: gold }}>South Florida</p>
        <h2 className="font-display font-bold italic text-white mb-10" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
          Hire restaurant influencers by city.
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 max-w-6xl">
          {HOUSE_CITIES.map((c) => (
            <Link
              key={c.slug}
              href={cityPath(c.slug)}
              className={`border px-4 py-4 text-sm transition-colors ${city?.slug === c.slug ? 'text-black' : 'text-white/60 hover:text-white border-white/[0.06] hover:border-[#c9a96e]/40'}`}
              style={city?.slug === c.slug ? { backgroundColor: gold, borderColor: gold } : undefined}
            >
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-white/[0.06] py-20 px-8 md:px-16 bg-[#060606]">
        <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-8" style={{ color: gold }}>FAQ</p>
        <div className="max-w-3xl space-y-6">
          {[
            { q: city ? `What does it cost to hire influencers in ${city.name}?` : 'What does it cost?', a: 'Trials from $850. Monthly from $3,200 for 1 influencer. Add influencers to add feeds. 100k+ talent is custom.' },
            { q: 'Do they post on their page or just send us videos?', a: 'Both. The collab Reel goes on their personal Instagram and your official page. You also get the assets.' },
            { q: 'How fast can we start?', a: `Same-week in most of ${place}. Trial nights book faster than a full monthly bench.` },
          ].map((x) => (
            <div key={x.q}>
              <h3 className="text-white font-bold mb-2">{x.q}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{x.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 md:py-28 px-8 md:px-16 bg-white">
        <p className="text-black/40 text-[10px] tracking-[0.5em] uppercase mb-6 font-semibold">{place}</p>
        <h2 className="font-display font-bold italic text-black leading-[0.9] mb-6" style={{ fontSize: 'clamp(36px, 6vw, 72px)' }}>
          Stop posting empty plates.<br />Put a real audience in the room.
        </h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href={BOOK} className="inline-flex items-center justify-center gap-3 px-12 py-6 text-[14px] font-bold tracking-widest uppercase" style={{ backgroundColor: gold, color: '#000' }}>
            Book Monthly Influencers <ChevronRight className="h-4 w-4" />
          </Link>
          <Link href="/marketplace" className="inline-flex items-center justify-center gap-3 px-8 py-6 text-[14px] font-bold tracking-widest uppercase border border-black/15 text-black/60">
            Browse Talent
          </Link>
        </div>
      </section>
    </div>
  );
}
