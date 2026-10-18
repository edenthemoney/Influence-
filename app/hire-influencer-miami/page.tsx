import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Check, ArrowRight, Star, MapPin, Users, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Hire an Influencer in Miami | Influence',
  description: 'Book Miami-based influencers and creators for music videos, brand campaigns, UGC content, events, and more. Professional creators with celebrity-level credits. Starting at $100.',
  keywords: 'hire influencer Miami, Miami influencer marketplace, book influencer Miami, creator marketing Miami, Miami creators for hire',
  openGraph: {
    title: 'Hire an Influencer in Miami | Influence',
    description: 'Professional Miami influencers for music videos, brand campaigns, UGC, and events. Starting at $100.',
    url: 'https://influencecreators.marketing/hire-influencer-miami',
  },
};

const gold = '#c9a96e';

export default function HireInfluencerMiami() {
  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <div className="max-w-4xl mx-auto px-6 py-24">
        <div className="mb-4">
          <span className="text-[10px] tracking-[0.3em] uppercase font-bold" style={{ color: gold }}>Miami Influencer Marketplace</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Hire an Influencer<br />in <span style={{ color: gold }}>Miami</span>
        </h1>
        <p className="text-white/50 text-lg mb-12 max-w-2xl">
          Book professional Miami-based influencers and creators for music videos, brand campaigns, UGC content, event appearances, and more. Our creators roster includes models who've worked with Sean Paul, Trippie Redd, Kodak Black, and appeared on Love & Hip Hop.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="border border-white/[0.06] p-6">
            <Users className="w-5 h-5 mb-3" style={{ color: gold }} />
            <h3 className="font-bold text-white mb-1">15+ Models</h3>
            <p className="text-white/40 text-sm">Curated roster of Miami & Florida-based creators</p>
          </div>
          <div className="border border-white/[0.06] p-6">
            <Star className="w-5 h-5 mb-3" style={{ color: gold }} />
            <h3 className="font-bold text-white mb-1">Celebrity Credits</h3>
            <p className="text-white/40 text-sm">Sean Paul, Moneybagg Yo, Lil Pump, 6ix9ine, Bossman Dlow, Trippie Redd & more</p>
          </div>
          <div className="border border-white/[0.06] p-6">
            <TrendingUp className="w-5 h-5 mb-3" style={{ color: gold }} />
            <h3 className="font-bold text-white mb-1">17M+ Views</h3>
            <p className="text-white/40 text-sm">Combined music video views from our creators</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">What You Can Book</h2>
        <div className="space-y-4 mb-16">
          {[
            { title: 'Music Video Creators', desc: 'Professional creators for your music video. Lead roles, background creators, or featured appearances.' },
            { title: 'UGC & Reels', desc: 'Authentic, high-converting short-form content for your brand\'s social media channels.' },
            { title: 'Brand Campaigns', desc: 'Photo shoots, product launches, and branded content featuring Miami\'s top influencers.' },
            { title: 'Event Appearances', desc: 'Model hosting, promotional appearances, and event activation.' },
            { title: 'Music Reactions', desc: 'Creators listen and react to your music on camera — authentic promotional content.' },
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

        <div className="border border-white/[0.06] p-10 text-center">
          <h2 className="text-2xl font-bold mb-3">Ready to Book Miami Creators?</h2>
          <p className="text-white/40 mb-6">Browse our network and book directly. Same-week availability.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/marketplace" className="px-8 py-4 text-[11px] font-bold tracking-widest uppercase hover:opacity-90 transition-all text-center" style={{ backgroundColor: gold, color: '#000' }}>
              Browse Creators
            </Link>
            <Link href="/start" className="px-8 py-4 text-[11px] font-bold tracking-widest uppercase border border-white/10 hover:border-[#c9a96e]/50 transition-all text-center text-white/70 hover:text-white">
              Find Your Service
            </Link>
          </div>
        </div>

        <div className="mt-16 text-white/20 text-sm leading-relaxed">
          <h3 className="text-white/40 font-bold mb-2">Serving All of South Florida</h3>
          <p>Influence provides professional influencer and creator network across Miami, Fort Lauderdale, Hollywood, Miami Beach, Boca Raton, West Palm Beach, Orlando, Tampa, and all of Florida. Our creators are available for local shoots and willing to travel for the right projects.</p>
        </div>
      </div>
    </div>
  );
}
