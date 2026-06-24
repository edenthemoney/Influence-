'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Music, ShoppingBag, Smartphone, CalendarDays } from 'lucide-react';

const GOLD = '#c9a96e';

const categories = [
  { id: 'music', label: 'Song / Music', icon: Music },
  { id: 'brand', label: 'Brand / Product', icon: ShoppingBag },
  { id: 'app', label: 'App / Service', icon: Smartphone },
  { id: 'event', label: 'Event / Launch', icon: CalendarDays },
];

const packages = [
  { min: 0,    max: 500,   name: 'Starter', price: '$100–$499',    desc: 'Single influencer, 1–2 posts',  reach: '50K–100K',   budgetTier: 'testing' },
  { min: 500,  max: 1500,  name: 'Growth',  price: '$500–$1,499',  desc: '1 influencer, 4–6 posts',      reach: '200K–300K',  budgetTier: 'scaling' },
  { min: 1500, max: 5000,  name: 'Pro',     price: '$1,500–$4,999', desc: 'Multi-influencer rollout',     reach: '300K–700K',  budgetTier: 'scaling' },
  { min: 5000, max: 99999, name: 'Elite',   price: '$5,000+',      desc: '10–100+ influencers, full team', reach: '1M+',          budgetTier: 'enterprise' },
];

const chatMessages = [
  "Hey! I'm your Influence booking assistant.",
  "I'll match you with the perfect package in 30 seconds.",
  "First — what are you promoting?",
];

export default function BookingGuide() {
  const [category, setCategory] = useState('');
  const [budget, setBudget] = useState(500);
  const [step, setStep] = useState(0);

  const recommended = packages.find(p => budget >= p.min && budget < p.max) ?? packages[packages.length - 1];

  const handleCategorySelect = (id: string) => {
    setCategory(id);
    setStep(1);
  };

  return (
    <section className="bg-[#0d0d0d] border-t border-white/[0.06] px-6 md:px-16 py-20">
      <div className="max-w-3xl mx-auto md:mx-0">

        {/* Header */}
        <div className="flex items-center gap-3 mb-10">
          <span className="inline-block w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: GOLD }} />
          <p className="text-[11px] tracking-[0.45em] uppercase font-bold" style={{ color: GOLD }}>
            Booking Assistant — Live
          </p>
        </div>

        {/* Chat bubbles intro */}
        <div className="space-y-3 mb-10">
          {chatMessages.map((msg, i) => (
            <div key={i} className="inline-flex">
              <p
                className="text-white text-base md:text-lg font-light leading-snug px-5 py-3 rounded-2xl rounded-tl-none"
                style={{ backgroundColor: '#1a1a1a', display: 'inline-block' }}
              >
                {msg}
              </p>
            </div>
          ))}
        </div>

        {/* Step 0 — Category picker */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {categories.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => handleCategorySelect(id)}
              className="flex flex-col items-start gap-3 p-5 border transition-all duration-200 text-left"
              style={
                category === id
                  ? { backgroundColor: GOLD, borderColor: GOLD, color: '#000' }
                  : { borderColor: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.7)' }
              }
            >
              <Icon className="h-5 w-5" />
              <span className="text-sm font-semibold tracking-wide leading-tight">{label}</span>
            </button>
          ))}
        </div>

        {/* Step 1 — Budget slider */}
        {step >= 1 && (
          <div className="mb-10 border-t border-white/[0.06] pt-10">
            <div className="inline-flex mb-8">
              <p className="text-white text-base md:text-lg font-light px-5 py-3 rounded-2xl rounded-tl-none" style={{ backgroundColor: '#1a1a1a' }}>
                Great choice. Now drag to set your budget 👇
              </p>
            </div>

            <div className="flex items-center gap-6 mb-3">
              <input
                type="range"
                min={200}
                max={5000}
                step={100}
                value={budget}
                onChange={e => { setBudget(Number(e.target.value)); setStep(2); }}
                className="budget-slider flex-1 h-1 cursor-pointer rounded-full appearance-none"
              />
              <span className="font-heading text-4xl font-bold shrink-0 tabular-nums" style={{ color: GOLD }}>
                ${budget.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-white/25 text-xs tracking-widest uppercase">
              <span>$300</span>
              <span>$5,000+</span>
            </div>
          </div>
        )}

        {/* Step 2 — Recommendation */}
        {step >= 2 && (
          <div className="border-t border-white/[0.06] pt-10">
            <div className="inline-flex mb-8">
              <p className="text-white text-base md:text-lg font-light px-5 py-3 rounded-2xl rounded-tl-none" style={{ backgroundColor: '#1a1a1a' }}>
                Perfect — here&apos;s what I recommend for you 🔥
              </p>
            </div>

            <div className="border border-white/[0.1] p-8 md:p-10" style={{ backgroundColor: 'rgba(201,169,110,0.04)' }}>
              <p className="text-[10px] tracking-[0.45em] uppercase font-bold mb-5" style={{ color: GOLD }}>
                Recommended Package
              </p>
              <div className="flex items-end justify-between gap-6 mb-6 flex-wrap">
                <div>
                  <h3 className="font-display font-bold italic text-white mb-2" style={{ fontSize: 'clamp(40px, 6vw, 72px)' }}>
                    {recommended.name}
                  </h3>
                  <p className="text-white/60 text-base">{recommended.desc}</p>
                  <p className="text-white/40 text-sm mt-1">Estimated reach: <span className="text-white/70 font-semibold">{recommended.reach}</span></p>
                </div>
                <p className="font-heading shrink-0" style={{ fontSize: '52px', color: GOLD, lineHeight: 1 }}>
                  {recommended.price}
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  href={`/pricing?budget=${recommended.budgetTier}`}
                  className="inline-flex items-center gap-3 px-12 py-5 text-[15px] font-bold tracking-widest uppercase transition-all hover:opacity-85"
                  style={{ backgroundColor: GOLD, color: '#000' }}
                >
                  <span>Book This Package</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-3 px-10 py-5 text-[14px] font-semibold tracking-widest uppercase transition-all hover:border-white/50"
                  style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.6)' }}
                >
                  Compare All Packages
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
