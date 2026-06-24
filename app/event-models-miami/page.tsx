import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, Users, Star, MapPin, Clock, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Event Models for Hire in Miami | Promo Girls & Party Models',
  description: 'Hire event models and promo girls in Miami for club nights, brand activations, parties, grand openings, and VIP events. $400/girl (4hr shift). Same-week booking.',
  keywords: 'event models for hire, hire models for event, hire models for party, promo girls miami, event models miami, party models miami, promotional models florida',
  openGraph: {
    title: 'Event Models for Hire in Miami | Promo Girls & Party Models',
    description: 'Professional event models and promo girls for parties, clubs, brand activations, and VIP events. $400/girl (4hr shift). Miami & South Florida.',
    url: 'https://influencemodels.agency/event-models-miami',
  },
};

const gold = '#c9a96e';

export default function EventModelsMiami() {
  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <div className="max-w-4xl mx-auto px-6 py-24">
        <div className="mb-4">
          <span className="text-[10px] tracking-[0.3em] uppercase font-bold" style={{ color: gold }}>In-Person · South Florida</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Event Models &<br />Promo Girls in <span style={{ color: gold }}>Miami</span>
        </h1>
        <p className="text-white/50 text-lg mb-12 max-w-2xl">
          Book professional event models and promotional girls for your club night, brand activation, private party, grand opening, or VIP event. Flat rate per girl — more girls, better rate. Same-week availability across South Florida.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="border border-white/[0.06] p-6">
            <Users className="w-5 h-5 mb-3" style={{ color: gold }} />
            <h3 className="font-bold text-white mb-1">1–100+ Girls</h3>
            <p className="text-white/40 text-sm">Scale from a single model to full venue takeover</p>
          </div>
          <div className="border border-white/[0.06] p-6">
            <MapPin className="w-5 h-5 mb-3" style={{ color: gold }} />
            <h3 className="font-bold text-white mb-1">South Florida</h3>
            <p className="text-white/40 text-sm">Miami, Fort Lauderdale, Boca Raton, West Palm Beach & more</p>
          </div>
          <div className="border border-white/[0.06] p-6">
            <Clock className="w-5 h-5 mb-3" style={{ color: gold }} />
            <h3 className="font-bold text-white mb-1">Same-Week Booking</h3>
            <p className="text-white/40 text-sm">Last-minute events? We can book within 48 hours</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">What We Cover</h2>
        <div className="space-y-4 mb-16">
          {[
            { title: 'Club Nights & Nightlife', desc: 'Professional models for your club event — bottle service presence, VIP section, and atmosphere enhancement.' },
            { title: 'Brand Activations', desc: 'Promo girls for product launches, pop-ups, samplings, and experiential marketing events.' },
            { title: 'Private Parties', desc: 'Models for birthday parties, yacht events, mansion parties, and exclusive gatherings.' },
            { title: 'Grand Openings', desc: 'Create a buzz for your new venue, restaurant, or retail opening with professional event talent.' },
            { title: 'Corporate Events', desc: 'Professional models for trade shows, conferences, and corporate hospitality.' },
            { title: 'Festival & Concert Activations', desc: 'Large-scale event staffing for festivals, concerts, and multi-day events.' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 border border-white/[0.06] p-5">
              <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: gold }} />
              <div>
                <h3 className="font-bold text-white text-sm">{item.title}</h3>
                <p className="text-white/40 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-6">Event Model Pricing</h2>
        <div className="grid md:grid-cols-4 gap-0 border border-white/[0.06] mb-6">
          {[
            { name: '1 Girl', price: '$400', desc: '$400/girl' },
            { name: '3 Girls', price: '$1,200', desc: '$400/girl', highlight: true },
            { name: '5 Girls', price: '$2,000', desc: '$400/girl' },
            { name: '10 Girls', price: '$4,000', desc: '$400/girl' },
          ].map((pkg, i) => (
            <div key={i} className={`p-6 text-center ${pkg.highlight ? 'bg-[#c9a96e]/[0.04]' : ''} ${i > 0 ? 'border-l border-white/[0.06]' : ''}`}>
              <p className="text-white/30 text-[9px] tracking-widest uppercase mb-1">{pkg.name}</p>
              <p className="text-2xl font-bold mb-1" style={{ color: gold }}>{pkg.price}</p>
              <p className="text-white/40 text-xs">{pkg.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-white/20 text-xs mb-16">3–4 hour appearance included. Volume discounts for 15+ girls. Monthly packages available for recurring events.</p>

        <div className="border border-white/[0.06] p-10 text-center">
          <h2 className="text-2xl font-bold mb-3">Book Event Models Now</h2>
          <p className="text-white/40 mb-6">Flat rate, same-week availability, no agency markups. Book online in 2 minutes.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/model-booking?service=event" className="px-8 py-4 text-[11px] font-bold tracking-widest uppercase hover:opacity-90 transition-all text-center" style={{ backgroundColor: gold, color: '#000' }}>
              Book Event Models
            </Link>
            <Link href="/marketplace" className="px-8 py-4 text-[11px] font-bold tracking-widest uppercase border border-white/10 hover:border-[#c9a96e]/50 transition-all text-center text-white/70 hover:text-white">
              Browse Talent
            </Link>
          </div>
        </div>

        <div className="mt-16 text-white/20 text-sm leading-relaxed">
          <h3 className="text-white/40 font-bold mb-2">Serving All of South Florida</h3>
          <p>Influence Models Agency provides professional event models, promo girls, and party models across Miami, Miami Beach, Fort Lauderdale, Hollywood, Boca Raton, West Palm Beach, and all of South Florida. Same-week and last-minute availability for most events. All models are event-ready, styled, and professionally briefed.</p>
        </div>
      </div>
    </div>
  );
}
