import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, Minus } from 'lucide-react';
import { STARTER_OT } from '../../lib/booking-packages';
import { PreviewNav } from '../_home/Chrome';
import { LuxeFooter } from '../_home/Luxe';
import StarterCheckout from './StarterCheckout';

export const metadata: Metadata = {
  title: 'Starter for Independent Creatives | Influence',
  description: 'One creator, one deliverable. A limited entry option for solo artists and small creatives in South Florida.',
  alternates: { canonical: 'https://influencecreators.marketing/starter' },
};

const gold = '#c9a96e';
const IN_PERSON = new Set(['starter-mv-1hr', 'starter-mv-2hr']);

export default function StarterPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <PreviewNav variant="E" />
      <main className="mx-auto max-w-6xl px-5 pb-24 pt-32 md:px-10 md:pt-40">
        <p className="mb-4 text-[11px] uppercase tracking-[0.35em]" style={{ color: gold }}>Starter · For independent creatives</p>
        <h1 className="font-display text-[clamp(38px,8vw,76px)] font-bold italic leading-[1.02]">One creator.<br />One deliverable.</h1>
        <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-white/70">
          A limited entry option for solo artists and small creatives who want to work with us on a single piece before committing to a full package.
        </p>

        <div className="mt-10 grid gap-3 border border-white/[0.08] p-5 text-[14px] text-white/70 sm:grid-cols-2 md:p-6">
          {['1 creator per booking', 'A set duration or a single deliverable', 'Organic use only, no paid-ad rights', 'Simple brief, limited customization'].map((t) => (
            <p key={t} className="flex items-start gap-3"><Minus className="mt-[3px] h-4 w-4 shrink-0" style={{ color: gold }} />{t}</p>
          ))}
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {STARTER_OT.map((p) => (
            <div key={p.id} className="flex flex-col border border-white/[0.08] bg-white/[0.02] p-6">
              <p className="text-[11px] uppercase tracking-[0.25em] text-white/45">{p.tagline}</p>
              <h2 className="mt-3 text-[20px] font-semibold leading-snug">{p.name}</h2>
              <p className="mt-3 font-display text-[40px] font-bold italic" style={{ color: gold }}>${p.price}</p>
              <ul className="mt-4 flex-1 space-y-2.5">
                {p.perks.map((k: string) => (
                  <li key={k} className="flex items-start gap-2.5 text-[14px] text-white/70"><Check className="mt-[3px] h-4 w-4 shrink-0" style={{ color: gold }} />{k}</li>
                ))}
              </ul>
              <StarterCheckout pkg={{ id: p.id, name: p.name, price: p.price }} inPerson={IN_PERSON.has(p.id)} />
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-white/[0.08] pt-10">
          <h2 className="font-display text-[28px] font-bold italic">Need more than one piece?</h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/65">
            Our main packages start at $450 and include longer bookings, multiple creators, more customization, and paid-ad rights options.
          </p>
          <Link href="/start" className="mt-6 inline-flex min-h-[48px] items-center border border-white/20 px-6 text-[12px] font-bold uppercase tracking-[0.2em] hover:border-[#c9a96e]/60">See main packages</Link>
        </div>
      </main>
      <LuxeFooter />
    </div>
  );
}
