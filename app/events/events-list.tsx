/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import type { EventListing } from '@/lib/events';

export default function EventsList({ events }: { events: EventListing[] }) {
  const now = Date.now();
  const upcoming = events.filter((e) => Date.parse(e.startsAt) + 6 * 3600e3 >= now);
  const past = events.filter((e) => Date.parse(e.startsAt) + 6 * 3600e3 < now).reverse();
  return (
    <section className="px-6 md:px-14 pb-24 max-w-6xl mx-auto">
      {upcoming.length === 0 && <p className="text-white/60 text-lg">New dates coming soon.</p>}
      <div className="grid gap-8 md:grid-cols-2">
        {upcoming.map((e) => <Card key={e.slug} e={e} />)}
      </div>
      {past.length > 0 && (
        <>
          <h2 className="mt-20 mb-6 text-[11px] tracking-[0.4em] uppercase text-white/50">Past events</h2>
          <div className="grid gap-8 md:grid-cols-2 opacity-70">{past.map((e) => <Card key={e.slug} e={e} past />)}</div>
        </>
      )}
    </section>
  );
}

function Card({ e, past }: { e: EventListing; past?: boolean }) {
  return (
    <Link href={e.href} className="group block border border-[#c9a96e]/30 bg-[#0d0c0a] hover:border-[#c9a96e] transition-colors">
      <div className="aspect-[780/560] overflow-hidden">
        <img src={e.image} alt={e.imageAlt} width={780} height={560} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
      </div>
      <div className="p-6 md:p-8">
        <p className="text-[11px] font-bold tracking-[0.3em] uppercase" style={{ color: '#c9a96e' }}>{e.dateLong} · {e.time}</p>
        <h3 className="mt-3 font-display text-4xl font-bold italic leading-none">{e.name}</h3>
        <p className="mt-3 text-white/70 text-[16px]">{e.tagline}</p>
        <p className="mt-4 text-white/60 text-[15px]">{e.venue} · {e.location}{e.host ? ` · Hosted by ${e.host}` : ''}</p>
        {!past && (
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <span className="inline-flex min-h-[48px] items-center px-6 text-[13px] font-bold tracking-widest uppercase bg-[#c9a96e] text-black">{e.ctaLabel} →</span>
            <span className="text-[14px] text-white/60">{e.priceNote}</span>
          </div>
        )}
      </div>
    </Link>
  );
}
