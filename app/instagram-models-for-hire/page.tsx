import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, Instagram, Camera, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Instagram Models for Hire | Book IG Models | Influence Models Agency',
  description: 'Book professional Instagram models for brand campaigns, photo shoots, events, and content creation. Verified talent with real followers and engagement. Miami & Florida.',
  keywords: 'Instagram models for hire, book Instagram model, IG models Miami, Instagram influencer for hire, social media models',
  openGraph: {
    title: 'Instagram Models for Hire | Influence Models Agency',
    description: 'Professional Instagram models for campaigns, shoots, events & content. Starting at $100.',
    url: 'https://influencemodels.agency/instagram-models-for-hire',
  },
};

const gold = '#c9a96e';

export default function InstagramModelsForHire() {
  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <div className="max-w-4xl mx-auto px-6 py-24">
        <div className="mb-4">
          <span className="text-[10px] tracking-[0.3em] uppercase font-bold" style={{ color: gold }}>Instagram Talent</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Instagram Models<br /><span style={{ color: gold }}>for Hire</span>
        </h1>
        <p className="text-white/50 text-lg mb-12 max-w-2xl">
          Skip the DMs and the flaky talent. Our roster of 15+ professional Instagram models are vetted, reliable, and ready to create content that performs. Real followers, real engagement, real results.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="border border-white/[0.06] p-6">
            <Instagram className="w-5 h-5 mb-3" style={{ color: gold }} />
            <h3 className="font-bold text-white mb-1">Verified Talent</h3>
            <p className="text-white/40 text-sm">Real followers, real engagement — no fake accounts</p>
          </div>
          <div className="border border-white/[0.06] p-6">
            <Camera className="w-5 h-5 mb-3" style={{ color: gold }} />
            <h3 className="font-bold text-white mb-1">Content Included</h3>
            <p className="text-white/40 text-sm">Professional reels, stories, and photos with every booking</p>
          </div>
          <div className="border border-white/[0.06] p-6">
            <Sparkles className="w-5 h-5 mb-3" style={{ color: gold }} />
            <h3 className="font-bold text-white mb-1">Celebrity Credits</h3>
            <p className="text-white/40 text-sm">Moneybagg Yo, Lil Pump, 6ix9ine, Bossman Dlow, Forbes & more</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">What You Can Book Our IG Models For</h2>
        <div className="space-y-4 mb-16">
          {[
            { title: 'Brand Collaborations', desc: 'Sponsored posts, stories, and reels featuring your product or service on the model\'s Instagram.' },
            { title: 'Photo Shoots', desc: 'Professional modeling for your brand\'s Instagram content. Get a library of high-quality images.' },
            { title: 'Instagram Reels & TikToks', desc: 'Short-form video content optimized for algorithm performance and engagement.' },
            { title: 'Event Coverage', desc: 'Instagram model appears at your event and creates real-time content — stories, reels, posts.' },
            { title: 'Product Features', desc: 'Model showcases your product in authentic, lifestyle-integrated content.' },
            { title: 'Takeovers', desc: 'Model takes over your brand\'s Instagram account for a day, driving new followers and engagement.' },
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

        <h2 className="text-2xl font-bold mb-4">Why Hire Through an Agency?</h2>
        <p className="text-white/40 mb-8 leading-relaxed">
          Finding models on Instagram is easy. Finding ones who show up on time, deliver quality content, and don't ghost you? That's hard. When you book through Influence Models Agency, you get:
        </p>
        <div className="space-y-3 mb-16">
          {[
            'Vetted, professional talent with verified work history',
            'Guaranteed show rates — no ghosting, no flaking',
            'Content delivery within 48 hours of the shoot',
            'Full commercial usage rights on all content',
            'One point of contact — we handle all coordination',
            'Transparent pricing — no hidden fees or negotiations',
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <Check className="w-4 h-4 flex-shrink-0" style={{ color: gold }} />
              <p className="text-white/50 text-sm">{item}</p>
            </div>
          ))}
        </div>

        <div className="border border-white/[0.06] p-10 text-center">
          <h2 className="text-2xl font-bold mb-3">Browse Our Instagram Models</h2>
          <p className="text-white/40 mb-6">View portfolios, see credits, and book directly. Starting at $100.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/marketplace" className="px-8 py-4 text-[11px] font-bold tracking-widest uppercase hover:opacity-90 transition-all text-center" style={{ backgroundColor: gold, color: '#000' }}>
              View Talent Roster
            </Link>
            <Link href="/book" className="px-8 py-4 text-[11px] font-bold tracking-widest uppercase border border-white/10 hover:border-[#c9a96e]/50 transition-all text-center text-white/70 hover:text-white">
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
