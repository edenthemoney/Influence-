import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { serviceLineup } from '@/data/service-lineup';
import { previewRoster } from '@/data/preview-roster';
import { BOOK_HREF, Eyebrow, GOLD, Headline } from './Chrome';

const F = '/images/feed';

/** Plain, concrete copy for each dimension of Influence. Images are real roster and venue photos. */
export const dimensionMeta: Record<string, { short: string; image: string; position?: string; examples: string }> = {
  venues: { short: 'Venues & Brands', image: `${F}/serena-patio-hero.webp`, examples: 'Brand Ambassadors at your venue, influencer campaigns, activations, fashion and label rollouts.' },
  talent: { short: 'Talent & Production', image: `${F}/genesis-lg.webp`, position: 'center 20%', examples: 'Models, photo and brand shoots, commercials, casting, and voiceover.' },
  content: { short: 'Content & Social', image: `${F}/seahra-gold-lg.webp`, examples: 'UGC filmed and delivered, story reposts, and collab posts.' },
  music: { short: 'Music', image: `${F}/des-jet-lg.webp`, examples: 'On-camera talent for music videos and song promotion on TikTok and Instagram.' },
  events: { short: 'Events', image: `${F}/serena-drink-smoked-old-fashioned.webp`, examples: 'Event staffing, VIP hosts and bottle service, and creator networking nights.' },
};

function GroupLinks({ id }: { id: string }) {
  const group = serviceLineup.find((g) => g.id === id);
  if (!group) return null;
  return (
    <ul className="mt-4 flex flex-wrap gap-2">
      {group.items.map((item) => (
        <li key={item.title}>
          <Link href={item.href} className="inline-flex min-h-10 items-center border border-white/15 px-3 text-[14px] text-white/90 hover:border-white/40">
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** A: numbered editorial rows, image left, everything we book listed under each. */
export function DimensionsRows() {
  return (
    <section id="what-we-book" className="border-t border-white/10 bg-[#080808] px-5 py-16 md:px-16 md:py-24">
      <Eyebrow>What we book</Eyebrow>
      <div className="mt-4 max-w-3xl"><Headline>Five ways to work with Influence.</Headline></div>
      <div className="mt-12 divide-y divide-white/10 border-y border-white/10">
        {serviceLineup.map((group, i) => {
          const meta = dimensionMeta[group.id];
          return (
            <div key={group.id} className="grid gap-6 py-8 md:grid-cols-[220px_1fr_auto] md:items-center md:gap-10 md:py-10">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#111] md:aspect-[4/5]">
                <img src={meta.image} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: meta.position || 'center' }} />
              </div>
              <div>
                <p className="font-display text-[20px] italic" style={{ color: GOLD }}>0{i + 1}</p>
                <h3 className="mt-1 font-display text-[32px] font-bold italic leading-tight text-white md:text-[44px]">{meta.short}</h3>
                <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-white/85">{meta.examples}</p>
                <GroupLinks id={group.id} />
              </div>
              <Link href={`${BOOK_HREF}?group=${group.id}`} className="inline-flex min-h-12 items-center justify-center gap-2 self-start px-6 text-[14px] font-bold uppercase tracking-[0.1em] md:self-center" style={{ backgroundColor: GOLD, color: '#000' }}>
                Book {meta.short.split(' ')[0]} <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/** B: tall image tiles that read like posts, swipe on mobile. */
export function DimensionsTiles() {
  return (
    <section id="what-we-book" className="border-t border-white/10 bg-[#080808] py-16 md:py-24">
      <div className="px-5 md:px-16">
        <Eyebrow>What we book</Eyebrow>
        <div className="mt-4 max-w-3xl"><Headline>Venues, talent, content, music, events.</Headline></div>
        <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/85">Pick the part you need. Every tile opens the full list and a booking request for that kind of job.</p>
      </div>
      <div className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-4 md:grid md:grid-cols-5 md:overflow-visible md:px-16">
        {serviceLineup.map((group) => {
          const meta = dimensionMeta[group.id];
          return (
            <article key={group.id} className="relative w-[78vw] max-w-[340px] shrink-0 snap-start overflow-hidden border border-white/10 bg-[#0d0d0d] md:w-auto md:max-w-none">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img src={meta.image} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: meta.position || 'center' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <h3 className="absolute bottom-4 left-4 right-4 font-display text-[30px] font-bold italic leading-none text-white">{meta.short}</h3>
              </div>
              <div className="p-4">
                <p className="text-[15px] leading-relaxed text-white/85">{meta.examples}</p>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <Link href={`/services#${group.id}`} className="text-[14px] font-semibold text-white underline decoration-white/30 underline-offset-4">See all</Link>
                  <Link href={`${BOOK_HREF}?group=${group.id}`} className="inline-flex min-h-11 items-center gap-1 px-4 text-[13px] font-bold uppercase tracking-[0.1em]" style={{ backgroundColor: GOLD, color: '#000' }}>
                    Book <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

/** C: a plain index, like a menu, every service named. Used beside a sticky phone. */
export function DimensionsIndex() {
  return (
    <div className="space-y-12">
      {serviceLineup.map((group, i) => {
        const meta = dimensionMeta[group.id];
        return (
          <div key={group.id} id={`dim-${group.id}`}>
            <div className="flex items-baseline gap-4 border-b border-white/10 pb-3">
              <span className="font-display text-[18px] italic" style={{ color: GOLD }}>0{i + 1}</span>
              <h3 className="font-display text-[34px] font-bold italic leading-none text-white md:text-[44px]">{meta.short}</h3>
            </div>
            <ul className="mt-2 divide-y divide-white/[0.07]">
              {group.items.map((item) => (
                <li key={item.title}>
                  <Link href={item.href} className="flex min-h-14 items-center justify-between gap-4 py-3 text-white hover:text-[#c9a96e]">
                    <span>
                      <span className="block text-[17px] font-semibold">{item.title}</span>
                      <span className="block text-[15px] text-white/75">{item.line}</span>
                    </span>
                    <ChevronRight className="h-5 w-5 shrink-0 text-white/60" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

/** The roster, big. Mobile swipes full-width portraits; desktop shows a large grid. */
export function RosterBig({ layout = 'rail', title = 'The roster.' }: { layout?: 'rail' | 'grid' | 'feature'; title?: string }) {
  const people = previewRoster;
  const head = (
    <div className="mb-8 flex flex-col gap-4 px-5 md:flex-row md:items-end md:justify-between md:px-16">
      <div>
        <Eyebrow>Brand Ambassadors &amp; creators</Eyebrow>
        <div className="mt-3"><Headline>{title}</Headline></div>
      </div>
      <Link href="/marketplace" className="self-start text-[16px] font-semibold text-white underline decoration-[#c9a96e] underline-offset-4 md:self-auto">See everyone on the roster</Link>
    </div>
  );
  const card = (p: (typeof people)[number], cls: string, sizes = '') => (
    <Link key={p.id} href={`/influencer/${p.id}`} className={`group block ${cls}`}>
      <div className="relative aspect-[4/5] overflow-hidden bg-[#111]">
        <img src={p.image} alt={p.name} loading="lazy" decoding="async" sizes={sizes} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
      </div>
      <p className="mt-3 text-[13px] font-semibold uppercase tracking-[0.18em]" style={{ color: GOLD }}>{p.role}</p>
      <p className="mt-1 font-display text-[26px] italic leading-tight text-white">{p.name}</p>
    </Link>
  );
  if (layout === 'grid') {
    return (
      <section id="roster" className="border-t border-white/10 bg-[#080808] py-16 md:py-24">
        {head}
        <div className="grid grid-cols-2 gap-x-3 gap-y-8 px-5 md:grid-cols-4 md:gap-x-6 md:px-16">
          {people.slice(0, 8).map((p) => card(p, ''))}
        </div>
      </section>
    );
  }
  if (layout === 'feature') {
    const [lead, ...rest] = people;
    return (
      <section id="roster" className="border-t border-white/10 bg-[#080808] py-16 md:py-24">
        {head}
        <div className="grid gap-8 px-5 md:grid-cols-[1.15fr_1fr] md:gap-10 md:px-16">
          {card(lead, '')}
          <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:gap-x-6">
            {rest.slice(0, 4).map((p) => card(p, ''))}
          </div>
        </div>
        <div className="mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-5 px-5 pb-2 md:gap-6 md:px-16">
          {rest.slice(4).map((p) => card(p, 'w-[46vw] max-w-[260px] shrink-0 snap-start'))}
        </div>
      </section>
    );
  }
  return (
    <section id="roster" className="border-t border-white/10 bg-[#080808] py-16 md:py-24">
      {head}
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 md:gap-6 md:px-16">
        {people.map((p) => card(p, 'w-[82vw] max-w-[380px] shrink-0 snap-start md:w-[340px]'))}
      </div>
    </section>
  );
}

export function JoinCreators({ image = `${F}/leila-lg.webp` }: { image?: string }) {
  return (
    <section id="join" className="border-t border-white/10 bg-[#0b0b0b]">
      <div className="grid md:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[560px]">
          <img src={image} alt="A creator on the Influence roster" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: 'center 30%' }} />
        </div>
        <div className="px-5 py-14 md:px-16 md:py-24">
          <Eyebrow>For creators</Eyebrow>
          <div className="mt-4"><Headline>Join the roster.</Headline></div>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-white/85">Apply once with your Instagram and the kinds of jobs you want. We book roster creators for venue nights, brand campaigns, shoots, music videos, and content.</p>
          <ul className="mt-6 space-y-2 text-[16px] text-white/85">
            <li>· Paid bookings with venues and brands</li>
            <li>· A profile page brands can browse</li>
            <li>· Networking nights to meet the team</li>
          </ul>
          <Link href="/join" className="mt-8 inline-flex min-h-12 items-center gap-2 border border-white px-6 text-[15px] font-bold uppercase tracking-[0.1em] text-white hover:bg-white hover:text-black">
            Apply to join <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function BookBand({ line = 'Tell us the date, the city, and the kind of night or shoot. We reply by text or call.' }: { line?: string }) {
  return (
    <section className="border-t border-white/10 bg-[#060606] px-5 py-16 md:px-16 md:py-24">
      <Eyebrow>Book talent</Eyebrow>
      <div className="mt-4 max-w-4xl"><Headline size="clamp(44px, 8vw, 96px)">Tell us the date and what you need.</Headline></div>
      <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-white/85">{line}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href={BOOK_HREF} className="inline-flex min-h-14 items-center justify-center gap-2 px-8 text-[16px] font-bold uppercase tracking-[0.08em]" style={{ backgroundColor: GOLD, color: '#000' }}>
          Start a booking <ChevronRight className="h-4 w-4" />
        </Link>
        <a href="tel:+15612877194" className="inline-flex min-h-14 items-center justify-center border border-white/40 px-8 text-[16px] font-bold uppercase tracking-[0.08em] text-white">
          Call (561) 287-7194
        </a>
      </div>
    </section>
  );
}

export function Ticker({ items = ['Restaurants', 'Nightclubs', 'Hotels & Resorts', 'Brands', 'Music', 'Events', 'Brand Ambassadors'] }: { items?: string[] }) {
  return (
    <div className="overflow-hidden border-y border-white/10 bg-[#080808]" aria-hidden>
      <div className="flex whitespace-nowrap py-2.5" style={{ animation: 'ticker-left 50s linear infinite' }}>
        {[...Array(6)].map((_, i) => (
          <span key={i} className="shrink-0 pr-10 font-heading text-[18px] tracking-[0.12em] text-white">
            {items.join('  ·  ')}&nbsp;&nbsp;·&nbsp;&nbsp;
          </span>
        ))}
      </div>
    </div>
  );
}
