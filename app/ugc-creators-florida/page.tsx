import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, Video, Zap, BarChart3 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'UGC Creators in Florida | Hire UGC Content Creators | Influence Models Agency',
  description: 'Hire professional UGC creators in Florida for TikTok, Instagram Reels, and brand content. Authentic, high-converting content that outperforms traditional ads. From $100.',
  keywords: 'UGC creators Florida, hire UGC creator, UGC content creator Miami, user generated content Florida, TikTok creators Florida',
  openGraph: {
    title: 'UGC Creators in Florida | Influence Models Agency',
    description: 'Professional UGC creators for authentic, high-converting brand content. Starting at $100.',
    url: 'https://influencemodels.agency/ugc-creators-florida',
  },
};

const gold = '#c9a96e';

export default function UGCCreatorsFlorida() {
  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <div className="max-w-4xl mx-auto px-6 py-24">
        <div className="mb-4">
          <span className="text-[10px] tracking-[0.3em] uppercase font-bold" style={{ color: gold }}>UGC Content Creation</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          UGC Creators<br />in <span style={{ color: gold }}>Florida</span>
        </h1>
        <p className="text-white/50 text-lg mb-12 max-w-2xl">
          User-generated content outperforms branded ads by 4x on engagement and 2.4x on conversions. Our Florida-based creators produce scroll-stopping UGC that looks organic but converts like a sales machine.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="border border-white/[0.06] p-6">
            <Zap className="w-5 h-5 mb-3" style={{ color: gold }} />
            <h3 className="font-bold text-white mb-1">4x Engagement</h3>
            <p className="text-white/40 text-sm">UGC gets 4x higher click-through than branded content</p>
          </div>
          <div className="border border-white/[0.06] p-6">
            <BarChart3 className="w-5 h-5 mb-3" style={{ color: gold }} />
            <h3 className="font-bold text-white mb-1">2.4x Conversions</h3>
            <p className="text-white/40 text-sm">UGC ads convert 2.4x better than traditional creative</p>
          </div>
          <div className="border border-white/[0.06] p-6">
            <Video className="w-5 h-5 mb-3" style={{ color: gold }} />
            <h3 className="font-bold text-white mb-1">50% Lower CPA</h3>
            <p className="text-white/40 text-sm">Cut your cost-per-acquisition in half with UGC</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">Types of UGC We Create</h2>
        <div className="space-y-4 mb-16">
          {[
            { title: 'Product Reviews & Unboxings', desc: 'Authentic on-camera reactions to your product. Perfect for e-commerce brands.' },
            { title: 'Lifestyle Reels', desc: 'Models showcasing your product or service in natural, aspirational settings.' },
            { title: 'Testimonial-Style Content', desc: 'First-person "talking head" content that builds trust and drives conversions.' },
            { title: 'TikTok & Instagram Reels', desc: 'Trend-aware short-form video optimized for platform algorithms.' },
            { title: 'Before & After Content', desc: 'Transformation content perfect for beauty, fitness, and wellness brands.' },
            { title: 'Day-in-My-Life Features', desc: 'Natural product placement within lifestyle content — subtle but effective.' },
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

        <h2 className="text-2xl font-bold mb-6">Industries We Serve</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-16">
          {['Fashion', 'Beauty', 'Restaurants', 'Real Estate', 'Fitness', 'Music', 'E-Commerce', 'Nightlife', 'Hotels', 'Automotive', 'Health', 'Tech'].map((industry, i) => (
            <div key={i} className="border border-white/[0.06] p-3 text-center">
              <p className="text-white/50 text-sm">{industry}</p>
            </div>
          ))}
        </div>

        <div className="border border-white/[0.06] p-10 text-center">
          <h2 className="text-2xl font-bold mb-3">Get UGC Content That Converts</h2>
          <p className="text-white/40 mb-6">15+ creators across Florida. Starting at $100 per reel.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/marketplace" className="px-8 py-4 text-[11px] font-bold tracking-widest uppercase hover:opacity-90 transition-all text-center" style={{ backgroundColor: gold, color: '#000' }}>
              Browse Creators
            </Link>
            <Link href="/pricing" className="px-8 py-4 text-[11px] font-bold tracking-widest uppercase border border-white/10 hover:border-[#c9a96e]/50 transition-all text-center text-white/70 hover:text-white">
              View Pricing
            </Link>
          </div>
        </div>

        <div className="mt-16 text-white/20 text-sm leading-relaxed">
          <h3 className="text-white/40 font-bold mb-2">UGC Creators Across Florida</h3>
          <p>Our UGC content creators are based in Miami, Fort Lauderdale, Hollywood, Orlando, Tampa, and throughout Florida. We produce content for brands nationwide — our creators can shoot locally or receive your product by mail for remote UGC creation. All content is delivered in HD with full commercial usage rights.</p>
        </div>
      </div>
    </div>
  );
}
