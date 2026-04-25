import Link from 'next/link';
import { Star, Check, ChevronRight, ChevronDown, Crown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookingButton } from '@/components/BookingButton';
import PricingFilter from '@/app/components/PricingFilter';

const packages = [
  {
    tier: "SAMPLE",
    name: "Sample",
    price: 80,
    description: "Test our service risk-free",
    features: [
      "1x 15-second Instagram Reel",
      "Single platform posting",
      "Basic editing & music",
      "48-hour delivery",
      "1 minor revision",
    ],
    popular: false,
  },
  {
    tier: "STARTER",
    name: "Starter",
    price: 250,
    description: "Perfect for first-time campaigns",
    features: [
      "2x 30-second reels (TikTok + IG)",
      "Dual platform posting",
      "Professional editing & transitions",
      "Trending audio selection",
      "3-day delivery",
      "2 revisions included",
      "Basic hashtag strategy",
    ],
    popular: true,
  },
  {
    tier: "GROWTH",
    name: "Growth",
    price: 500,
    description: "Scale your brand presence",
    features: [
      "4x 30-second reels",
      "Multi-platform distribution (IG, TikTok, YouTube Shorts)",
      "Premium editing with effects",
      "Custom captions & CTAs",
      "5-day delivery",
      "3 revisions included",
      "Hashtag & SEO optimization",
      "Content posting schedule",
      "Basic performance report",
    ],
    popular: false,
  },
  {
    tier: "PRO",
    name: "Pro",
    price: 850,
    description: "Most popular for serious brands",
    features: [
      "6x 30-second premium reels",
      "Full platform coverage (IG, TikTok, YouTube, Snapchat)",
      "Advanced editing with VFX",
      "Brand integration & product placement",
      "7-day delivery",
      "Unlimited revisions",
      "Advanced hashtag & trend strategy",
      "Content calendar (2 weeks)",
      "Detailed analytics report",
      "Direct creator communication",
    ],
    popular: true,
  },
  {
    tier: "TRIO",
    name: "Trio Campaign",
    price: 1500,
    description: "3 verified creators posting together",
    features: [
      "3 verified creators",
      "3x 30-second reels each",
      "Coordinated 24-hour launch window",
      "5-day delivery",
      "Basic hashtag strategy",
      "Performance report",
      "Multi-platform distribution",
      "300K+ combined reach",
    ],
    popular: false,
  },
  {
    tier: "SQUAD",
    name: "Squad Campaign",
    price: 2750,
    description: "5 verified creators coordinated launch",
    features: [
      "5 verified creators",
      "4x 30-second reels each",
      "Coordinated 12-hour launch window",
      "5-day delivery",
      "Advanced hashtag strategy",
      "Trend optimization",
      "Performance dashboard",
      "500K+ combined reach",
    ],
    popular: false,
  },
  {
    tier: "VIRAL_NETWORK",
    name: "Viral Network",
    price: 5999,
    description: "10 creators synchronized launch",
    features: [
      "10 verified creators",
      "5x 30-second reels each",
      "Synchronized 6-hour launch window",
      "7-day delivery",
      "Dedicated campaign manager",
      "Trend jacking strategy",
      "Real-time analytics",
      "Weekly strategy call",
      "1M+ combined reach",
    ],
    popular: true,
  },
  {
    tier: "MEGA",
    name: "Mega Campaign",
    price: 12999,
    description: "20 creators enterprise-level campaign",
    features: [
      "20 verified creators",
      "6x 30-second reels each",
      "Synchronized 2-hour launch window",
      "10-day delivery",
      "Dedicated campaign manager + strategist",
      "Multi-wave rollout strategy",
      "Advanced analytics dashboard",
      "Bi-weekly strategy calls",
      "Content calendar (30 days)",
      "2M+ combined reach",
    ],
    popular: false,
  },
  {
    tier: "DOMINATION",
    name: "Domination",
    price: 35000,
    description: "50 creators mega viral campaign",
    features: [
      "50 verified creators",
      "8x 30-second reels each",
      "Synchronized simultaneous launch",
      "14-day delivery",
      "Full campaign management team",
      "Influencer recruitment assistance",
      "Paid ad integration support",
      "Daily strategy optimization",
      "Advanced analytics & reporting",
      "Monthly strategy sessions",
      "Extended usage rights (6 months)",
      "5M+ combined reach",
    ],
    popular: false,
  },
  {
    tier: "ENTERPRISE",
    name: "Enterprise",
    price: 100000,
    description: "100+ creators total market domination",
    features: [
      "100+ verified creators",
      "10x 30-second reels each",
      "Synchronized simultaneous launch",
      "21-day delivery",
      "Dedicated 5-person team",
      "Celebrity/mega-influencer partnerships",
      "Full production crew & studio access",
      "Custom music production & licensing",
      "Daily strategy & optimization calls",
      "Real-time analytics dashboard",
      "Paid media budget management ($50K+)",
      "PR & media outreach included",
      "Event activations & IRL content",
      "Lifetime unlimited usage rights",
      "Concierge support 24/7/365",
      "10M+ combined reach",
    ],
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-black">
      <nav className="border-b border-white/10 bg-black/80 backdrop-blur-xl fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center space-x-3">
              <Crown className="h-10 w-10 text-yellow-500" />
              <span className="text-3xl font-bold gradient-text tracking-tight">INFLUENCE</span>
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/marketplace">
                <Button variant="ghost" className="text-white/80 hover:text-yellow-500">Talent</Button>
              </Link>
              <Link href="/login">
                <Button className="px-8 py-3 gold-gradient text-black rounded-none font-bold text-sm tracking-wider uppercase">Book Now</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-black text-white mb-6">
            Simple <span className="gradient-text">Pricing</span>
          </h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
            Pick your reach. Launch your campaign. Get results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-16">
          {packages.map((pkg) => (
            <Card 
              key={pkg.tier} 
              className={`relative bg-zinc-900 border hover-lift transition-all overflow-hidden ${
                pkg.popular 
                  ? 'border-yellow-500 border-2 shadow-xl shadow-yellow-500/20' 
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="gold-gradient text-black px-4 py-1 text-xs font-bold tracking-wider uppercase">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className={`pb-3 ${pkg.popular ? 'pt-6' : 'pt-4'}`}>
                <CardTitle className="text-2xl font-black text-white tracking-tight">{pkg.name}</CardTitle>
                <CardDescription className="text-white/60 text-sm">{pkg.description}</CardDescription>
                <div className="mt-4 pt-3 border-t border-white/10">
                  <span className="text-4xl font-black gradient-text">${pkg.price.toLocaleString()}</span>
                  <span className="text-white/40 text-xs uppercase tracking-wider ml-2">per campaign</span>
                </div>
              </CardHeader>
              
              <CardContent className="py-3">
                <ul className="space-y-2">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Check className="h-4 w-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <span className="text-white/70 text-xs leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter className="pt-2">
                <BookingButton 
                  packageTier={pkg.tier}
                  className={`w-full h-10 font-bold text-xs tracking-wider uppercase transition-all ${
                    pkg.popular 
                      ? 'gold-gradient text-black hover:shadow-lg hover:shadow-yellow-500/40' 
                      : 'bg-transparent border border-white/20 text-white hover:border-yellow-500 hover:text-yellow-500'
                  }`}
                >
                  {pkg.popular ? 'Book' : 'Select'}
                </BookingButton>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-24 text-center">
          <h2 className="text-5xl font-black text-white mb-6">Need a <span className="gradient-text">Custom</span> Solution?</h2>
          <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto">
            Custom enterprise packages, long-term partnerships, and white-label solutions available
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="text-center">
              <div className="text-3xl font-black gradient-text mb-2">$5K+</div>
              <div className="text-white/60 text-sm">Monthly Retainers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black gradient-text mb-2">$10K+</div>
              <div className="text-white/60 text-sm">Product Launches</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black gradient-text mb-2">Custom</div>
              <div className="text-white/60 text-sm">White Label Agency</div>
            </div>
          </div>
          <div className="mt-32 bg-zinc-900 border border-yellow-500/30 p-12 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="inline-block px-4 py-2 gold-gradient text-black text-sm font-bold tracking-wider uppercase mb-6">100% Satisfaction Guarantee</div>
              <h3 className="text-4xl font-black text-white mb-6">Risk-Free Investment</h3>
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                If you're not completely satisfied with your campaign results, we'll work with you until you are - or provide a full refund. No questions asked. That's our commitment to excellence.
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 gold-gradient flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="h-4 w-4 text-black" />
                  </div>
                  <div>
                    <div className="text-white font-bold mb-1">30-Day Guarantee</div>
                    <div className="text-white/60 text-sm">Full refund if not satisfied</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 gold-gradient flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="h-4 w-4 text-black" />
                  </div>
                  <div>
                    <div className="text-white font-bold mb-1">Unlimited Revisions</div>
                    <div className="text-white/60 text-sm">Until you're 100% happy</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 gold-gradient flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="h-4 w-4 text-black" />
                  </div>
                  <div>
                    <div className="text-white font-bold mb-1">Secure Payments</div>
                    <div className="text-white/60 text-sm">Stripe-powered escrow</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-24 text-center">
            <p className="text-white/60 text-lg mb-4">Need a custom package?</p>
            <Link href="/contact" className="text-yellow-500 hover:text-yellow-400 font-bold text-xl underline">
              Contact us for enterprise solutions
            </Link>
          </div>
        </div>

        <footer className="bg-black border-t border-white/10 py-16 mt-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-4xl font-black text-white mb-6">Frequently Asked Questions</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-zinc-900 border border-white/10 p-6 hover-lift transition-all">
                  <h3 className="text-2xl font-bold text-white mb-3">What is the campaign process?</h3>
                  <p className="text-white/60 leading-relaxed">
                    Our team will work closely with you to understand your brand goals and objectives. We'll then develop a customized campaign strategy, create high-quality content, and execute the campaign across multiple platforms.
                  </p>
                </div>
                <div className="bg-zinc-900 border border-white/10 p-6 hover-lift transition-all">
                  <h3 className="text-2xl font-bold text-white mb-3">How long does a campaign take?</h3>
                  <p className="text-white/60 leading-relaxed">
                    Campaign duration varies depending on the package and scope of work. Our standard campaign duration is 30 days, but we can accommodate longer or shorter campaigns based on your needs.
                  </p>
                </div>
                <div className="bg-zinc-900 border border-white/10 p-6 hover-lift transition-all">
                  <h3 className="text-2xl font-bold text-white mb-3">What kind of support do you offer?</h3>
                  <p className="text-white/60 leading-relaxed">
                    We offer premium support to all our clients, including dedicated account management, real-time analytics tracking, and priority support.
                  </p>
                </div>
                <div className="bg-zinc-900 border border-white/10 p-6 hover-lift transition-all">
                  <h3 className="text-2xl font-bold text-white mb-3">Can I cancel my campaign?</h3>
                  <p className="text-white/60 leading-relaxed">
                    Yes, you can cancel your campaign at any time. However, please note that we require a 30-day notice period for cancellations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
