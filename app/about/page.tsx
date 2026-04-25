import Link from 'next/link';
import { Crown, Target, Zap, Users, TrendingUp, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black">
      <nav className="border-b border-white/10 bg-black/80 backdrop-blur-xl fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center space-x-3">
              <Crown className="h-10 w-10 text-yellow-500" />
              <span className="text-3xl font-bold gradient-text tracking-tight">INFLUENCE</span>
            </Link>
            <div className="hidden md:flex items-center space-x-10">
              <Link href="/marketplace" className="text-white/80 hover:text-yellow-500 transition-colors text-sm font-medium tracking-wide uppercase">
                Talent
              </Link>
              <Link href="/pricing" className="text-white/80 hover:text-yellow-500 transition-colors text-sm font-medium tracking-wide uppercase">
                Services
              </Link>
              <Link href="/faq" className="text-white/80 hover:text-yellow-500 transition-colors text-sm font-medium tracking-wide uppercase">
                FAQ
              </Link>
              <Link href="/pricing" className="px-8 py-3 gold-gradient text-black rounded-none font-bold text-sm tracking-wider uppercase hover:shadow-2xl hover:shadow-yellow-500/50 transition-all">
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative pt-32 pb-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900 to-black"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-black mb-8 leading-tight">
            <span className="text-white">About</span>
            <br />
            <span className="gradient-text">INFLUENCE</span>
          </h1>
          <p className="text-xl text-white/70 mb-8 leading-relaxed">
            Connecting brands with elite creators to drive authentic engagement, viral growth, and measurable results.
          </p>
        </div>
      </section>

      <section className="py-20 bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-12">
            <div>
              <h2 className="text-4xl font-black text-white mb-6">Our Mission</h2>
              <p className="text-white/70 text-lg leading-relaxed">
                We bridge the gap between ambitious brands and world-class content creators. Our mission is to democratize influencer marketing—making it accessible, transparent, and results-driven for businesses of all sizes. Whether you're launching a music career, scaling a product, or building a brand, we connect you with creators who have the reach, authenticity, and influence to move the needle.
              </p>
            </div>

            <div>
              <h2 className="text-4xl font-black text-white mb-6">What We Do</h2>
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                INFLUENCE is a premium influencer marketplace and campaign management platform. We curate verified creators across multiple niches and platforms, manage end-to-end campaign execution, and deliver measurable results through authentic partnerships.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-black border border-white/10 p-6">
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center space-x-2">
                    <TrendingUp className="h-6 w-6 text-yellow-500" />
                    <span>Social Media Growth</span>
                  </h3>
                  <p className="text-white/60">Boost your follower count, engagement rates, and reach through strategic influencer partnerships and viral content campaigns.</p>
                </div>
                <div className="bg-black border border-white/10 p-6">
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center space-x-2">
                    <Users className="h-6 w-6 text-yellow-500" />
                    <span>Brand Marketing</span>
                  </h3>
                  <p className="text-white/60">Launch product campaigns, build brand awareness, and drive conversions with creators who align with your target audience.</p>
                </div>
                <div className="bg-black border border-white/10 p-6">
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center space-x-2">
                    <Zap className="h-6 w-6 text-yellow-500" />
                    <span>Music Promotion</span>
                  </h3>
                  <p className="text-white/60">Turn your tracks into trending audio. Our creators produce viral content that gets your music heard by millions across TikTok, Instagram, and beyond.</p>
                </div>
                <div className="bg-black border border-white/10 p-6">
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center space-x-2">
                    <Award className="h-6 w-6 text-yellow-500" />
                    <span>Campaign Management</span>
                  </h3>
                  <p className="text-white/60">From concept to delivery, we handle strategy, creator coordination, content approval, and performance tracking.</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-black text-white mb-6">Our Expertise by Niche</h2>
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                We specialize in connecting brands with creators across diverse industries:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'Beauty & Skincare',
                  'Fashion & Luxury',
                  'Health & Wellness',
                  'Music & Entertainment',
                  'Tech & Innovation',
                  'Food & Lifestyle',
                  'Business & Entrepreneurship',
                  'Fitness & Sports',
                  'Travel & Adventure',
                  'Gaming & Streaming',
                  'Education & Self-Development',
                  'Home & Lifestyle'
                ].map((niche) => (
                  <div key={niche} className="flex items-center space-x-3 p-4 bg-black border border-white/10 rounded">
                    <Target className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                    <span className="text-white font-medium">{niche}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-black text-white mb-6">Why Choose INFLUENCE?</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-yellow-500 font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Verified Creators</h3>
                    <p className="text-white/60">All influencers are authenticated with verified metrics, real engagement, and proven track records.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-yellow-500 font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Full Campaign Control</h3>
                    <p className="text-white/60">You specify exactly what you want—messaging, hashtags, call-to-action, and creative direction. Creators deliver authentic content that aligns with your vision.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-yellow-500 font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Fast Turnaround</h3>
                    <p className="text-white/60">Content delivered quickly without compromising quality. Most campaigns complete within 7-14 days.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-yellow-500 font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Transparent Pricing</h3>
                    <p className="text-white/60">No hidden fees. Clear package pricing with detailed breakdowns of what you get at each tier.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-yellow-500 font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Results-Driven</h3>
                    <p className="text-white/60">We track performance metrics including reach, engagement, clicks, and conversions to prove ROI.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-black border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black text-white mb-8">Ready to Grow?</h2>
          <p className="text-white/70 text-lg mb-8">
            Explore our talent marketplace or browse our service packages to launch your first campaign.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/marketplace" className="px-10 py-5 gold-gradient text-black rounded-none text-lg font-bold tracking-wider uppercase hover:shadow-2xl hover:shadow-yellow-500/50 transition-all">
              Browse Creators
            </Link>
            <Link href="/pricing" className="px-10 py-5 bg-transparent border-2 border-white text-white rounded-none text-lg font-bold tracking-wider uppercase hover:bg-white hover:text-black transition-all">
              View Packages
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-black border-t border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-white/40 text-sm">&copy; 2024 INFLUENCE. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
