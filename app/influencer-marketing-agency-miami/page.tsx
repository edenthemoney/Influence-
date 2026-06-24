import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, Award, Users, TrendingUp, Globe, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Influencer Marketing Agency Miami | Influence Models Agency',
  description: 'Miami\'s premier influencer marketing agency. Full-service campaigns, talent booking, UGC creation, and brand partnerships. 15+ vetted models. Celebrity-level credits.',
  keywords: 'influencer marketing agency Miami, Miami marketing agency, influencer agency Florida, social media marketing Miami, brand ambassador agency Miami',
  openGraph: {
    title: 'Influencer Marketing Agency Miami | Influence Models Agency',
    description: 'Full-service influencer marketing from Miami\'s top talent agency. Campaigns, content, and results.',
    url: 'https://influencemodels.agency/influencer-marketing-agency-miami',
  },
};

const gold = '#c9a96e';

export default function InfluencerMarketingAgencyMiami() {
  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <div className="max-w-4xl mx-auto px-6 py-24">
        <div className="mb-4">
          <span className="text-[10px] tracking-[0.3em] uppercase font-bold" style={{ color: gold }}>Full-Service Agency</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Influencer Marketing<br />Agency in <span style={{ color: gold }}>Miami</span>
        </h1>
        <p className="text-white/50 text-lg mb-12 max-w-2xl">
          Influence Models Agency is Miami's full-service influencer marketing platform. We connect brands with professional, vetted talent for campaigns that actually convert — not just impressions, but real business results.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="border border-white/[0.06] p-8">
            <Award className="w-6 h-6 mb-4" style={{ color: gold }} />
            <h3 className="text-xl font-bold text-white mb-2">Celebrity-Level Talent</h3>
            <p className="text-white/40 text-sm leading-relaxed">Our roster includes models who've worked with Sean Paul, Trippie Redd, Kodak Black, Bryson Tiller, Akon, French Montana, Sexyy Red, and appeared on Love & Hip Hop and in Forbes. This isn't amateur talent — this is the real deal.</p>
          </div>
          <div className="border border-white/[0.06] p-8">
            <Zap className="w-6 h-6 mb-4" style={{ color: gold }} />
            <h3 className="text-xl font-bold text-white mb-2">End-to-End Execution</h3>
            <p className="text-white/40 text-sm leading-relaxed">From talent selection to content delivery, we handle everything. You tell us your goal, we execute the campaign. No middlemen, no complexity — just results.</p>
          </div>
          <div className="border border-white/[0.06] p-8">
            <Users className="w-6 h-6 mb-4" style={{ color: gold }} />
            <h3 className="text-xl font-bold text-white mb-2">15+ Vetted Models</h3>
            <p className="text-white/40 text-sm leading-relaxed">Every model in our roster is personally vetted. We guarantee professionalism, punctuality, and quality. No ghosting, no flaking — the reliability brands need.</p>
          </div>
          <div className="border border-white/[0.06] p-8">
            <TrendingUp className="w-6 h-6 mb-4" style={{ color: gold }} />
            <h3 className="text-xl font-bold text-white mb-2">Performance-Focused</h3>
            <p className="text-white/40 text-sm leading-relaxed">We track everything — views, engagement, conversions, ROI. Our campaigns are designed to drive real business metrics, not just vanity numbers.</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">Our Services</h2>
        <div className="space-y-4 mb-16">
          {[
            { title: 'Music Video Talent', desc: 'Professional models for hip-hop, R&B, pop, and Latin music videos. Lead roles and featured appearances.', link: '/music-video-models' },
            { title: 'UGC & Reels', desc: 'Authentic short-form content for TikTok, Instagram, and YouTube Shorts. Content that converts.', link: '/ugc-creators-florida' },
            { title: 'Brand Campaigns', desc: 'Full influencer campaigns — product launches, brand partnerships, and sponsored content across platforms.', link: '/services/business' },
            { title: 'Event Appearances', desc: 'Model hosting, promotional appearances, and VIP event activation across South Florida.', link: '/services/events' },
            { title: 'Photo Shoots', desc: 'Lifestyle, fashion, editorial, and commercial photo shoots with professional models.', link: '/services/shoots' },
            { title: 'Monthly Retainers', desc: 'Ongoing influencer partnerships with guaranteed content output, reach, and engagement. From $1,500/mo.', link: '/pricing' },
          ].map((item, i) => (
            <Link key={i} href={item.link} className="flex items-start gap-3 border border-white/[0.06] p-5 hover:border-[#c9a96e]/30 transition-all group">
              <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: gold }} />
              <div className="flex-1">
                <h3 className="font-bold text-white text-sm group-hover:text-[#c9a96e] transition-colors">{item.title}</h3>
                <p className="text-white/40 text-sm">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-6">Who We Work With</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-16">
          {[
            'Independent Artists', 'Record Labels', 'Restaurants & Bars',
            'Fashion Brands', 'Beauty Companies', 'Real Estate',
            'Nightclubs & Lounges', 'E-Commerce Brands', 'Event Promoters',
            'Fitness Brands', 'Hotels & Resorts', 'Tech Startups',
          ].map((client, i) => (
            <div key={i} className="border border-white/[0.06] p-3 text-center">
              <p className="text-white/50 text-sm">{client}</p>
            </div>
          ))}
        </div>

        <div className="border border-white/[0.06] p-10 text-center">
          <h2 className="text-2xl font-bold mb-3">Let's Build Your Campaign</h2>
          <p className="text-white/40 mb-6">Tell us your goal. We'll match you with the right talent and execute.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book" className="px-8 py-4 text-[11px] font-bold tracking-widest uppercase hover:opacity-90 transition-all text-center" style={{ backgroundColor: gold, color: '#000' }}>
              Start a Campaign
            </Link>
            <Link href="/contact" className="px-8 py-4 text-[11px] font-bold tracking-widest uppercase border border-white/10 hover:border-[#c9a96e]/50 transition-all text-center text-white/70 hover:text-white">
              Contact Us
            </Link>
          </div>
        </div>

        <div className="mt-16 text-white/20 text-sm leading-relaxed">
          <h3 className="text-white/40 font-bold mb-2">Miami Influencer Marketing Agency</h3>
          <p>Influence Models Agency operates out of Miami, Florida, serving clients across South Florida, the United States, and internationally. Our talent roster is based primarily in Miami, Fort Lauderdale, Hollywood, and Orlando, with availability for travel. We specialize in influencer marketing, talent booking, content creation, and brand partnerships. Contact us at influencemodelsagency@gmail.com or visit influencemodels.agency.</p>
        </div>
      </div>
    </div>
  );
}
