import Link from 'next/link';
import { Crown, TrendingUp, Users, Music, Zap, Target, Lock, Lightbulb, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SolutionsPage() {
  const brandPainPoints = [
    {
      icon: TrendingUp,
      title: "Algorithm Hell",
      problem: "Your content gets lost in the noise. Posting organically doesn't cut it anymore.",
      solution: "We leverage 10-100+ verified creators to trigger algorithm recommendations. Multiple accounts posting simultaneously = exponential reach.",
    },
    {
      icon: Users,
      title: "Audience Trust Gap",
      problem: "People don't trust brands. They trust creators they follow.",
      solution: "Your message comes from authentic creators your target audience already loves and trusts. Instant credibility.",
    },
    {
      icon: Target,
      title: "Targeting Nightmare",
      problem: "Paid ads are expensive, unpredictable, and often reach the wrong people.",
      solution: "We connect you with creators whose audiences perfectly match your target market. Precision targeting without ad fatigue.",
    },
    {
      icon: Zap,
      title: "Speed to Market",
      problem: "Traditional marketing takes months. Your competitors move faster.",
      solution: "From booking to live content in 5-14 days. Launch campaigns while trends are hot.",
    },
    {
      icon: Lock,
      title: "Authenticity Paradox",
      problem: "Fake endorsements destroy brand reputation. But real influencers are expensive and unreliable.",
      solution: "Our creators are verified and incentivized to deliver authentic content. You get real engagement from real people.",
    },
    {
      icon: Lightbulb,
      title: "Creative Bottleneck",
      problem: "You need fresh, platform-native content constantly. Your team can't keep up.",
      solution: "Professional creators produce optimized content for TikTok, Instagram, YouTube. You focus on strategy, we handle creation.",
    },
  ];

  const musicPainPoints = [
    {
      icon: Music,
      title: "Spotify Playlist Prison",
      problem: "Getting on playlists is nearly impossible without connections. Streaming payouts are pennies.",
      solution: "Viral TikTok/Instagram content drives millions of streams. One trending clip = thousands of playlist adds and real revenue.",
    },
    {
      icon: TrendingUp,
      title: "The Chicken & Egg Problem",
      problem: "You need followers to get noticed, but you need to be noticed to get followers.",
      solution: "Our creators introduce your music to their audiences (100K-10M+ followers). Instant credibility and organic growth.",
    },
    {
      icon: Users,
      title: "No Budget for Marketing",
      problem: "Record labels spend $50K+ per artist. Independent artists can't compete.",
      solution: "For $1,500-$5,999, get 3-10 creators promoting your music. That's your own record label infrastructure.",
    },
    {
      icon: Zap,
      title: "Slow Organic Growth",
      problem: "Building an audience organically takes years. You need momentum NOW.",
      solution: "Coordinated creator campaigns create viral moments. One campaign can add 10K-100K+ followers in weeks.",
    },
    {
      icon: Lock,
      title: "Fake Engagement Trap",
      problem: "Buying followers/plays destroys credibility and wastes money.",
      solution: "Real creators, real audiences, real engagement. Your growth is authentic and sustainable.",
    },
    {
      icon: Lightbulb,
      title: "Production Quality Gap",
      problem: "Your music is great, but your visuals/videos look amateur.",
      solution: "Professional creators produce high-quality content featuring your music. Cinematic production at a fraction of the cost.",
    },
  ];

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
                Pricing
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
            <span className="text-white">We Solve Your</span>
            <br />
            <span className="gradient-text">Marketing Pain Points</span>
          </h1>
          <p className="text-xl text-white/70">
            Whether you're a brand struggling with reach or an artist trying to break through, we have the solution.
          </p>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-20 bg-zinc-950 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-4">For <span className="gradient-text">Brands & Businesses</span></h2>
            <p className="text-white/60 text-lg">Stop fighting the algorithm. Start leveraging authentic influence.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {brandPainPoints.map((point, idx) => {
              const Icon = point.icon;
              return (
                <div key={idx} className="bg-black border border-white/10 p-8 hover:border-yellow-500/50 transition-all">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-6 w-6 text-yellow-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-3">{point.title}</h3>
                      <p className="text-white/60 mb-4 leading-relaxed">
                        <span className="text-red-400 font-semibold">Problem:</span> {point.problem}
                      </p>
                      <p className="text-white/70 leading-relaxed">
                        <span className="text-green-400 font-semibold">Solution:</span> {point.solution}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <p className="text-white/60 text-lg mb-8">Ready to dominate your market?</p>
            <Link href="/pricing-guide">
              <Button className="px-12 py-6 gold-gradient text-black font-bold text-lg tracking-wider uppercase hover:shadow-2xl hover:shadow-yellow-500/50 transition-all">
                Find Your Perfect Package
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Musicians Section */}
      <section className="py-20 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-4">For <span className="gradient-text">Musicians & Artists</span></h2>
            <p className="text-white/60 text-lg">Become your own record label. Build a fanbase. Get streams.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {musicPainPoints.map((point, idx) => {
              const Icon = point.icon;
              return (
                <div key={idx} className="bg-zinc-900 border border-white/10 p-8 hover:border-yellow-500/50 transition-all">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-6 w-6 text-yellow-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-3">{point.title}</h3>
                      <p className="text-white/60 mb-4 leading-relaxed">
                        <span className="text-red-400 font-semibold">Problem:</span> {point.problem}
                      </p>
                      <p className="text-white/70 leading-relaxed">
                        <span className="text-green-400 font-semibold">Solution:</span> {point.solution}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border border-yellow-500/30 p-12 rounded-lg">
            <h3 className="text-3xl font-black text-white mb-4">Your Own Record Label</h3>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              Independent artists used to need a record label to compete. Now you have INFLUENCE. For $1,500-$35,000, you get the same infrastructure major labels use:
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center space-x-3">
                <span className="text-yellow-500 font-bold">✓</span>
                <span className="text-white"><strong>Distribution Network:</strong> 3-50+ creators reaching millions</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="text-yellow-500 font-bold">✓</span>
                <span className="text-white"><strong>Production Quality:</strong> Professional content creators</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="text-yellow-500 font-bold">✓</span>
                <span className="text-white"><strong>Marketing Strategy:</strong> Coordinated viral campaigns</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="text-yellow-500 font-bold">✓</span>
                <span className="text-white"><strong>Analytics & Reporting:</strong> Real-time performance tracking</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="text-yellow-500 font-bold">✓</span>
                <span className="text-white"><strong>Speed to Market:</strong> Launch in 5-14 days</span>
              </li>
            </ul>
            <p className="text-white/70 text-lg mb-8">
              Major labels spend $50K-$500K per artist. You get enterprise-level infrastructure for a fraction of the cost.
            </p>
            <Link href="/pricing-guide">
              <Button className="px-12 py-6 gold-gradient text-black font-bold text-lg tracking-wider uppercase hover:shadow-2xl hover:shadow-yellow-500/50 transition-all">
                Launch Your Music Campaign
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why INFLUENCE Section */}
      <section className="py-20 bg-zinc-950 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4">Why Choose INFLUENCE?</h2>
          </div>

          <div className="space-y-6">
            {[
              { title: "Verified Creators", desc: "All influencers are authenticated with real followers and proven engagement." },
              { title: "Transparent Pricing", desc: "No hidden fees. What you see is what you pay. Full breakdown of costs." },
              { title: "Fast Turnaround", desc: "5-14 day campaigns. Launch while trends are hot, not after they're dead." },
              { title: "Full Control", desc: "You specify exactly what you want. Creators deliver authentic content that aligns with your vision." },
              { title: "Real Results", desc: "Track performance in real-time. See impressions, engagement, and conversions." },
              { title: "Direct Communication", desc: "Talk directly to your creators. No agency middlemen. No bureaucracy." },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start space-x-4 p-6 bg-black border border-white/10 rounded hover:border-yellow-500/50 transition-all">
                <ChevronRight className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-white/60">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-black border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black text-white mb-8">Ready to Solve Your Marketing Challenge?</h2>
          <p className="text-white/70 text-lg mb-12">
            Whether you're a brand scaling fast or an artist breaking through, we have the solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/pricing-guide">
              <Button className="px-12 py-6 gold-gradient text-black font-bold text-lg tracking-wider uppercase hover:shadow-2xl hover:shadow-yellow-500/50 transition-all">
                Take the Quiz
              </Button>
            </Link>
            <Link href="/marketplace">
              <Button className="px-12 py-6 bg-transparent border-2 border-white text-white font-bold text-lg tracking-wider uppercase hover:bg-white hover:text-black transition-all">
                Browse Creators
              </Button>
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
