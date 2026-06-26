'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Music, Play, PartyPopper, Camera, TrendingUp, Headphones, Briefcase, Mic2, Building2, ArrowRight, ArrowLeft } from 'lucide-react';

const gold = '#c9a96e';

type Service = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: any;
  href: string;
  cta: string;
  popular?: boolean;
};

const SERVICES: Record<string, Service> = {
  ugc: {
    id: 'ugc',
    title: 'Creator Content & UGC',
    subtitle: 'Reels · Reviews · Testimonials',
    description: 'Verified creators make scroll-stopping reels, reviews, and branded content — delivered ready to post.',
    icon: Play,
    href: '/model-booking?service=ugc',
    cta: 'Get Creator Content',
    popular: true,
  },
  campaigns: {
    id: 'campaigns',
    title: 'Influencer Campaigns',
    subtitle: 'Multi-Creator Rollouts',
    description: 'Coordinated creator campaigns with synchronized posting and real reach — for launches and big releases.',
    icon: TrendingUp,
    href: '/quote?type=campaign',
    cta: 'Plan a Campaign',
  },
  shoots: {
    id: 'shoots',
    title: 'Photo & Brand Shoots',
    subtitle: 'Editorials · Lookbooks · E-Comm',
    description: 'Camera-ready models for brand shoots, fashion editorials, lookbooks, and e-commerce productions.',
    icon: Camera,
    href: '/model-booking?service=shoot',
    cta: 'Book Models',
  },
  'music-video': {
    id: 'music-video',
    title: 'Music Video Talent',
    subtitle: 'Solo · Duo · Trio · Full Cast',
    description: 'Book verified talent for your music video. From solo features to full squads — styled and camera-ready.',
    icon: Music,
    href: '/model-booking?service=musicvideo',
    cta: 'Book Video Talent',
    popular: true,
  },
  'music-promo': {
    id: 'music-promo',
    title: 'Music Promo & Reactions',
    subtitle: 'On-Camera Song Reactions',
    description: 'Creators react to and promote your song on camera — authentic content that markets your music.',
    icon: Headphones,
    href: '/model-booking?service=reaction',
    cta: 'Promote My Music',
  },
  events: {
    id: 'events',
    title: 'Events, VIP & Bottle Girls',
    subtitle: 'Hostesses · VIP · Activations',
    description: 'Professional event talent, bottle girls, and hostesses for clubs, parties, and brand activations.',
    icon: PartyPopper,
    href: '/model-booking?service=event',
    cta: 'Book Event Talent',
  },
};

type Persona = {
  id: string;
  label: string;
  tagline: string;
  icon: any;
  services: string[];
};

const PERSONAS: Persona[] = [
  {
    id: 'brand',
    label: 'Promote My Business, Brand or Product',
    tagline: 'Content that grows your brand — from on-site visits to professional campaigns',
    icon: Briefcase,
    services: ['ugc', 'campaigns', 'shoots'],
  },
  {
    id: 'artist',
    label: 'Promote My Music',
    tagline: 'Music videos, reactions, and promotional content for artists',
    icon: Mic2,
    services: ['music-video', 'music-promo', 'campaigns'],
  },
  {
    id: 'venue',
    label: 'Host an Event / VIP / Bottle Service',
    tagline: 'Models for your club, party, brand activation or private event',
    icon: Building2,
    services: ['events', 'shoots'],
  },
];

export default function StartSelector() {
  const [persona, setPersona] = useState<Persona | null>(null);

  if (!persona) {
    return (
      <div className="max-w-5xl mx-auto">
        <p className="text-center text-white/30 text-[11px] tracking-[0.3em] uppercase mb-8">Step 1 of 2 · Who are you?</p>
        <div className="grid md:grid-cols-3 gap-5">
          {PERSONAS.map((p) => {
            const Icon = p.icon;
            return (
              <button
                key={p.id}
                onClick={() => setPersona(p)}
                className="group flex flex-col items-start text-left border border-white/[0.08] bg-[#0a0a0a] p-8 transition-all duration-300 hover:border-[#c9a96e]/40 hover:bg-[#c9a96e]/[0.03]"
              >
                <div className="w-14 h-14 border flex items-center justify-center mb-6" style={{ borderColor: gold }}>
                  <Icon className="h-6 w-6" style={{ color: gold }} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 leading-tight">{p.label}</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-4 flex-1">{p.tagline}</p>
                <span className="text-[11px] text-white/25 mb-4">{p.services.length} services available</span>
                <span className="text-[12px] font-bold tracking-widest uppercase text-white/40 group-hover:text-[#c9a96e] flex items-center gap-2 transition-colors">
                  See My Options <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            );
          })}
        </div>
        <p className="text-center text-white/30 text-sm mt-10">
          Not sure? <Link href="/quote" className="text-white/60 hover:text-white underline underline-offset-4 transition-colors">Talk to a rep</Link> and we&apos;ll point you the right way.
        </p>
      </div>
    );
  }

  const services = persona.services.map((id) => SERVICES[id]).filter(Boolean);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8 max-w-5xl mx-auto">
        <button
          onClick={() => setPersona(null)}
          className="inline-flex items-center gap-2 text-white/40 hover:text-white text-[11px] tracking-widest uppercase transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <p className="text-white/30 text-[11px] tracking-[0.3em] uppercase">Step 2 of 2 · Pick your service</p>
      </div>

      <div className={`grid gap-5 ${services.length === 2 ? 'md:grid-cols-2 max-w-3xl mx-auto' : 'md:grid-cols-3'}`}>
        {services.map((option) => {
          const Icon = option.icon;
          return (
            <Link
              key={option.id}
              href={option.href}
              className="group relative flex flex-col border border-white/[0.08] bg-[#0a0a0a] p-7 md:p-8 transition-all duration-300 hover:border-[#c9a96e]/40 hover:bg-[#c9a96e]/[0.03]"
            >
              {option.popular && (
                <div className="absolute top-0 right-0 px-3 py-1.5 text-[9px] font-bold tracking-[0.2em] uppercase" style={{ backgroundColor: gold, color: '#000' }}>
                  Most Popular
                </div>
              )}
              <div className="w-14 h-14 border flex items-center justify-center mb-6" style={{ borderColor: gold }}>
                <Icon className="h-6 w-6" style={{ color: gold }} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{option.title}</h3>
              <p className="text-[11px] font-bold tracking-[0.25em] uppercase mb-4" style={{ color: `${gold}99` }}>{option.subtitle}</p>
              <p className="text-white/45 text-[14px] leading-relaxed mb-8 flex-1">{option.description}</p>
              <div className="flex items-center justify-between pt-5 border-t border-white/[0.06]">
                <span className="text-[12px] font-bold tracking-widest uppercase text-white/40 group-hover:text-white transition-colors">{option.cta}</span>
                <ArrowRight className="h-4 w-4 text-white/20 group-hover:text-[#c9a96e] group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          );
        })}
      </div>

      <p className="text-center text-white/30 text-sm mt-10">
        Want something else? <Link href="/quote" className="text-white/60 hover:text-white underline underline-offset-4 transition-colors">Tell us your goal</Link> and we&apos;ll build a custom quote.
      </p>
    </div>
  );
}
