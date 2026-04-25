import Link from 'next/link';
import { Crown, Star, Sparkles, TrendingUp, Shield, Award, ChevronRight, Play, Music, ShoppingBag, Briefcase, Megaphone, Zap, Target, BarChart3, Users } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black">
      <nav className="border-b border-white/10 bg-black/80 backdrop-blur-xl fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <Crown className="h-10 w-10 text-yellow-500" />
              <span className="text-3xl font-bold gradient-text tracking-tight">INFLUENCE</span>
            </div>
            <div className="hidden md:flex items-center space-x-10">
              <Link href="/marketplace" className="text-white/80 hover:text-yellow-500 transition-colors text-sm font-medium tracking-wide uppercase">
                Talent
              </Link>
              <Link href="/pricing" className="text-white/80 hover:text-yellow-500 transition-colors text-sm font-medium tracking-wide uppercase">
                Pricing
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

      <section className="relative pt-32 pb-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900 to-black"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-600 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto text-center animate-fade-in">
          <div className="mb-6 inline-flex items-center space-x-2 px-5 py-2 border border-yellow-500/30 rounded-full bg-yellow-500/5">
            <Sparkles className="h-4 w-4 text-yellow-500" />
            <span className="text-yellow-500 text-xs font-bold tracking-widest uppercase">All-In-One Influencer Marketing</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.05] tracking-tight">
            <span className="text-white">Go Viral.</span>
            <br />
            <span className="gradient-text text-shadow-luxury">On Demand.</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-6 max-w-3xl mx-auto font-light leading-relaxed">
            The elite influencer network trusted by brands, artists, and businesses to <span className="text-yellow-400 font-semibold">make anything go viral</span>.
          </p>
          <p className="text-base md:text-lg text-white/50 mb-12 max-w-2xl mx-auto">
            Launch your song. Promote your product. Scale your brand. One platform. One solution. Guaranteed 10K+ views per reel.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link href="/pricing" className="group w-full sm:w-auto px-10 py-5 gold-gradient text-black text-lg font-black tracking-wider uppercase hover:shadow-2xl hover:shadow-yellow-500/50 transition-all flex items-center justify-center space-x-2 rounded-lg">
              <span>Launch Campaign</span>
              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/marketplace" className="w-full sm:w-auto px-10 py-5 bg-white/5 border border-white/20 text-white text-lg font-bold tracking-wider uppercase hover:bg-white/10 hover:border-yellow-500 transition-all flex items-center justify-center space-x-2 rounded-lg">
              <Users className="h-5 w-5" />
              <span>Browse Talent</span>
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-white/40 text-sm">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-yellow-500" />
              <span>Secure Escrow Payments</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span>Fast Turnaround</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="h-4 w-4 text-yellow-500" />
              <span>10K+ Views Guaranteed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases - What You Can Promote */}
      <section className="py-24 bg-zinc-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-yellow-500 text-xs font-bold tracking-widest uppercase mb-3">What We Promote</p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">One Platform. <span className="gradient-text">Every Use Case.</span></h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">From indie artists to Fortune 500 brands, we make anything go viral.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group relative bg-gradient-to-br from-zinc-900 to-black border border-white/10 p-8 hover:border-yellow-500/50 transition-all overflow-hidden">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl group-hover:bg-yellow-500/20 transition-all"></div>
              <Music className="h-10 w-10 text-yellow-500 mb-6 relative" />
              <h3 className="text-2xl font-black text-white mb-3 relative">Music & Artists</h3>
              <p className="text-white/60 leading-relaxed relative">Turn your track into the next viral sound. TikTok-ready placements with top creators who dance, lip-sync, and feature your music.</p>
            </div>
            <div className="group relative bg-gradient-to-br from-zinc-900 to-black border border-white/10 p-8 hover:border-yellow-500/50 transition-all overflow-hidden">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl group-hover:bg-yellow-500/20 transition-all"></div>
              <ShoppingBag className="h-10 w-10 text-yellow-500 mb-6 relative" />
              <h3 className="text-2xl font-black text-white mb-3 relative">Products</h3>
              <p className="text-white/60 leading-relaxed relative">Drive sales with authentic product placements. Unboxings, tutorials, and reviews that convert viewers into buyers.</p>
            </div>
            <div className="group relative bg-gradient-to-br from-zinc-900 to-black border border-white/10 p-8 hover:border-yellow-500/50 transition-all overflow-hidden">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl group-hover:bg-yellow-500/20 transition-all"></div>
              <Briefcase className="h-10 w-10 text-yellow-500 mb-6 relative" />
              <h3 className="text-2xl font-black text-white mb-3 relative">Brands & Businesses</h3>
              <p className="text-white/60 leading-relaxed relative">Build brand awareness that scales. Elevate your company's presence with strategic creator partnerships.</p>
            </div>
            <div className="group relative bg-gradient-to-br from-zinc-900 to-black border border-white/10 p-8 hover:border-yellow-500/50 transition-all overflow-hidden">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl group-hover:bg-yellow-500/20 transition-all"></div>
              <Megaphone className="h-10 w-10 text-yellow-500 mb-6 relative" />
              <h3 className="text-2xl font-black text-white mb-3 relative">Services & Apps</h3>
              <p className="text-white/60 leading-relaxed relative">Launch apps, services, or events with massive reach. Get instant downloads, signups, and attention.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-black relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-yellow-500 text-xs font-bold tracking-widest uppercase mb-3">How It Works</p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">From Zero to Viral in <span className="gradient-text">3 Steps</span></h2>
            <p className="text-white/60 text-lg">Simple, seamless, and built for speed.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-16 h-16 gold-gradient flex items-center justify-center text-black text-2xl font-black rounded-lg shadow-xl shadow-yellow-500/30">1</div>
              <div className="bg-zinc-900 border border-white/10 p-8 pt-14 h-full hover:border-yellow-500/30 transition-all">
                <h3 className="text-2xl font-black text-white mb-3">Pick Your Package</h3>
                <p className="text-white/60 leading-relaxed">Choose the package that matches your goal — from a single creator to a 100+ creator viral network.</p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-16 h-16 gold-gradient flex items-center justify-center text-black text-2xl font-black rounded-lg shadow-xl shadow-yellow-500/30">2</div>
              <div className="bg-zinc-900 border border-white/10 p-8 pt-14 h-full hover:border-yellow-500/30 transition-all">
                <h3 className="text-2xl font-black text-white mb-3">We Handle Everything</h3>
                <p className="text-white/60 leading-relaxed">Our team coordinates the creators, content, and launch timing. You just brief us on your vision.</p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-16 h-16 gold-gradient flex items-center justify-center text-black text-2xl font-black rounded-lg shadow-xl shadow-yellow-500/30">3</div>
              <div className="bg-zinc-900 border border-white/10 p-8 pt-14 h-full hover:border-yellow-500/30 transition-all">
                <h3 className="text-2xl font-black text-white mb-3">Watch It Go Viral</h3>
                <p className="text-white/60 leading-relaxed">Content drops synchronized for maximum algorithm impact. Track performance in real-time via your dashboard.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-4">Featured <span className="gradient-text">Creator</span></h2>
            <p className="text-white/60 text-lg">Meet our elite talent available for booking</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
              <img src="/images/influencers/des-1.jpg" alt="Deseray Marie" className="relative w-full h-96 object-cover rounded-lg" />
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-4xl font-black text-white mb-2">Deseray Marie</h3>
                <p className="text-yellow-500 font-semibold text-lg">@itsdezmarie</p>
              </div>
              <p className="text-white/70 text-lg leading-relaxed">
                Beauty & Health Brand Owner | Fashion & Luxury Creator specializing in authentic brand partnerships that drive real engagement and conversions.
              </p>
              <div className="grid grid-cols-2 gap-6 py-6 border-y border-white/10 max-w-xs mx-auto">
                <div>
                  <p className="text-3xl font-black gradient-text">56.9K</p>
                  <p className="text-white/60 text-sm uppercase tracking-wider">Followers</p>
                </div>
                <div>
                  <p className="text-3xl font-black text-white mb-1">★★★★★</p>
                  <p className="text-white/60 text-sm uppercase tracking-wider">5 Stars</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Beauty', 'Health', 'Fashion', 'Luxury'].map((cat) => (
                  <span key={cat} className="px-4 py-2 bg-yellow-500/10 text-yellow-500 border border-yellow-500/30 rounded-full text-sm font-medium">
                    {cat}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 pt-4">
                <Link href="/influencer/des-001" className="flex-1 px-8 py-4 bg-transparent border-2 border-white text-white font-bold tracking-wider uppercase hover:bg-white hover:text-black transition-all text-center rounded-none">
                  View Profile
                </Link>
                <Link href="/pricing" className="flex-1 px-8 py-4 gold-gradient text-black font-bold tracking-wider uppercase hover:shadow-2xl hover:shadow-yellow-500/50 transition-all text-center rounded-none">
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-zinc-950 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-500/5 via-transparent to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-4">The <span className="gradient-text">Elite</span> Difference</h2>
            <p className="text-white/60 text-lg">Unmatched quality. Proven results. Premium service.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-zinc-900 border border-white/10 p-10 hover-lift hover:border-yellow-500/50 transition-all">
              <div className="w-16 h-16 gold-gradient flex items-center justify-center mb-6">
                <Crown className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">Curated Excellence</h3>
              <p className="text-white/60 leading-relaxed">
                Hand-selected influencers with verified metrics, authentic engagement, and proven campaign success across all major platforms
              </p>
            </div>
            <div className="group bg-zinc-900 border border-white/10 p-10 hover-lift hover:border-yellow-500/50 transition-all">
              <div className="w-16 h-16 gold-gradient flex items-center justify-center mb-6">
                <TrendingUp className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">Viral Mastery</h3>
              <p className="text-white/60 leading-relaxed">
                Strategic campaign planning with multi-creator coordination, trend optimization, and clip farming for maximum viral potential
              </p>
            </div>
            <div className="group bg-zinc-900 border border-white/10 p-10 hover-lift hover:border-yellow-500/50 transition-all">
              <div className="w-16 h-16 gold-gradient flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">Premium Protection</h3>
              <p className="text-white/60 leading-relaxed">
                Enterprise-grade security with escrow payments, milestone tracking, automated splits, and full legal protection
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-12">
              <div>
                <h2 className="text-5xl font-black text-white mb-6">Built For <span className="gradient-text">Champions</span></h2>
                <p className="text-white/60 text-lg leading-relaxed">Whether you're launching a music career or scaling a global brand, our elite network delivers results.</p>
              </div>
              <div className="space-y-8">
                <div className="flex items-start space-x-6">
                  <div className="w-14 h-14 gold-gradient flex items-center justify-center flex-shrink-0">
                    <Sparkles className="h-7 w-7 text-black" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">Artists & Musicians</h3>
                    <p className="text-white/60 leading-relaxed">
                      Turn your tracks into trending audio. Our influencers create viral content that gets your music heard by millions.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="w-14 h-14 gold-gradient flex items-center justify-center flex-shrink-0">
                    <Award className="h-7 w-7 text-black" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">Premium Brands</h3>
                    <p className="text-white/60 leading-relaxed">
                      Elevate your brand with authentic partnerships. Drive sales, build awareness, and dominate your market segment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-zinc-900 to-black border border-yellow-500/30 p-12">
              <div className="mb-8">
                <div className="inline-block px-4 py-2 gold-gradient text-black text-sm font-bold tracking-wider uppercase mb-4">Premium Packages</div>
                <h3 className="text-4xl font-black text-white mb-2">From $50</h3>
                <p className="text-white/60">Professional campaigns that deliver</p>
              </div>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center space-x-3">
                  <div className="w-6 h-6 gold-gradient flex items-center justify-center">
                    <span className="text-black text-sm font-bold">✓</span>
                  </div>
                  <span className="text-white font-medium">Elite creator selection</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-6 h-6 gold-gradient flex items-center justify-center">
                    <span className="text-black text-sm font-bold">✓</span>
                  </div>
                  <span className="text-white font-medium">Multi-platform distribution</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-6 h-6 gold-gradient flex items-center justify-center">
                    <span className="text-black text-sm font-bold">✓</span>
                  </div>
                  <span className="text-white font-medium">Full commercial rights</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-6 h-6 gold-gradient flex items-center justify-center">
                    <span className="text-black text-sm font-bold">✓</span>
                  </div>
                  <span className="text-white font-medium">Priority support & revisions</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-6 h-6 gold-gradient flex items-center justify-center">
                    <span className="text-black text-sm font-bold">✓</span>
                  </div>
                  <span className="text-white font-medium">Performance analytics</span>
                </li>
              </ul>
              <Link href="/pricing" className="block w-full text-center px-8 py-5 gold-gradient text-black font-bold text-lg tracking-wider uppercase hover:shadow-2xl hover:shadow-yellow-500/50 transition-all">
                View All Packages
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-gradient-to-b from-black via-zinc-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-yellow-500 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-5xl mx-auto text-center px-4">
          <h2 className="text-6xl md:text-7xl font-black text-white mb-8 leading-tight">
            Ready to <span className="gradient-text text-shadow-luxury">Dominate?</span>
          </h2>
          <p className="text-2xl text-white/70 mb-12 font-light max-w-3xl mx-auto">
            Join the elite network of brands and creators launching viral campaigns that break the internet
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/signup" className="px-12 py-6 gold-gradient text-black text-xl font-bold tracking-wider uppercase hover:shadow-2xl hover:shadow-yellow-500/50 transition-all">
              Launch Campaign
            </Link>
            <Link href="/marketplace" className="px-12 py-6 bg-transparent border-2 border-white text-white text-xl font-bold tracking-wider uppercase hover:bg-white hover:text-black transition-all">
              Browse Talent
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-black border-t border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Crown className="h-8 w-8 text-yellow-500" />
                <span className="text-2xl font-bold gradient-text tracking-tight">INFLUENCE</span>
              </div>
              <p className="text-white/60 leading-relaxed">
                Elite model agency and influencer marketplace for premium brands
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6 tracking-wider uppercase text-sm">For Brands</h4>
              <ul className="space-y-3 text-white/60">
                <li><Link href="/marketplace" className="hover:text-yellow-500 transition-colors">Browse Talent</Link></li>
                <li><Link href="/pricing" className="hover:text-yellow-500 transition-colors">Packages</Link></li>
                <li><Link href="/case-studies" className="hover:text-yellow-500 transition-colors">Case Studies</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6 tracking-wider uppercase text-sm">For Creators</h4>
              <ul className="space-y-3 text-white/60">
                <li><Link href="/join" className="hover:text-yellow-500 transition-colors">Apply Now</Link></li>
                <li><Link href="/resources" className="hover:text-yellow-500 transition-colors">Resources</Link></li>
                <li><Link href="/success-stories" className="hover:text-yellow-500 transition-colors">Success Stories</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6 tracking-wider uppercase text-sm">Company</h4>
              <ul className="space-y-3 text-white/60">
                <li><Link href="/about" className="hover:text-yellow-500 transition-colors">About</Link></li>
                <li><Link href="/contact" className="hover:text-yellow-500 transition-colors">Contact</Link></li>
                <li><Link href="/terms" className="hover:text-yellow-500 transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/40 text-sm">&copy; 2024 Influence. All rights reserved.</p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-white/40 hover:text-yellow-500 transition-colors text-sm">Privacy</Link>
              <Link href="#" className="text-white/40 hover:text-yellow-500 transition-colors text-sm">Terms</Link>
              <Link href="#" className="text-white/40 hover:text-yellow-500 transition-colors text-sm">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
