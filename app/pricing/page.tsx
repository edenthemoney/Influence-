'use client';

import Link from 'next/link';
import MobileNav from '../components/MobileNav';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Star, Check, ChevronRight, ChevronLeft, ChevronDown, Crown, Rocket, TrendingUp, Flame, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookingButton } from '@/components/BookingButton';

type BudgetTier = 'testing' | 'scaling' | 'enterprise';

const budgetTiers: {
  id: BudgetTier;
  label: string;
  range: string;
  min: number;
  max: number;
  tagline: string;
  description: string;
  audience: string;
  icon: any;
  accent: string;
}[] = [
  {
    id: 'testing',
    label: 'Single Influencer',
    range: '$300 – $1,500',
    min: 300,
    max: 1500,
    tagline: 'Test the waters',
    description: 'One verified creator, premium content. Perfect for solo artists, indie brands, and first-time campaigns looking to make an impact.',
    audience: 'Solo / Independent',
    icon: Rocket,
    accent: 'from-blue-500/20 to-cyan-500/10 border-blue-500/40',
  },
  {
    id: 'scaling',
    label: 'Influencer Campaign',
    range: '$2,000 – $5,000',
    min: 2000,
    max: 5000,
    tagline: 'Coordinated rollout',
    description: 'Multi-influencer campaigns with synchronized launches. For brands and artists with proof of concept who want serious reach and real firepower.',
    audience: 'Growing Brands / Artists',
    icon: TrendingUp,
    accent: 'from-[#c9a96e]/30 to-amber-500/10 border-[#c9a96e]/60',
  },
  {
    id: 'enterprise',
    label: 'Platform Takeover',
    range: '$8,000 – $65,000',
    min: 8000,
    max: 65000,
    tagline: 'Agency-level domination',
    description: 'Full agency rollout with 10 to 100+ influencers, dedicated campaign teams, and guaranteed reach. For record labels, big-budget artists, and enterprise brands.',
    audience: 'Labels / Enterprise / Big-Budget Artists',
    icon: Flame,
    accent: 'from-[#c9a96e]/40 to-red-500/20 border-[#c9a96e]',
  },
];

const packages = [
  {
    tier: "SAMPLE",
    name: "Single Reel",
    price: 300,
    description: "1 premium reel from a verified Miami influencer",
    features: [
      "1x 30-second Instagram Reel or TikTok",
      "Professional editing & trending audio",
      "Single platform posting",
      "3-day delivery",
      "1 revision included",
      "HD vertical video delivered",
    ],
    popular: false,
  },
  {
    tier: "GIFTED",
    name: "Product Review",
    price: 400,
    description: "Authentic unboxing or review from a verified creator",
    features: [
      "Ship your product to our creator",
      "1x authentic unboxing or review reel",
      "IG or TikTok posting",
      "Genuine first-impression content",
      "HD vertical video delivered",
      "2 revisions included",
      "Perfect for beauty, fashion & lifestyle brands",
    ],
    popular: false,
  },
  {
    tier: "TESTIMONIAL",
    name: "Testimonial Video",
    price: 400,
    description: "Scripted model testimonial — ideal for ads & product pages",
    features: [
      "1 professional model / actress",
      "Scripted or guided testimonial delivery",
      "HD vertical video (30–60 sec)",
      "Ready for Meta Ads, TikTok Ads & landing pages",
      "2 revisions included",
      "Perfect for e-commerce & service businesses",
    ],
    popular: false,
  },
  {
    tier: "STARTER",
    name: "Dual Reel — IG + TikTok",
    price: 500,
    description: "2 reels across Instagram & TikTok — double the reach",
    features: [
      "2x 30-second reels (IG + TikTok)",
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
    tier: "TRIPLE_POST",
    name: "Tri-Platform",
    price: 750,
    description: "IG + TikTok + YouTube Shorts — max solo reach",
    features: [
      "3x 30-second reels across 3 platforms",
      "IG, TikTok, and YouTube Shorts",
      "Premium editing with transitions & effects",
      "Trending audio + custom captions",
      "4-day delivery",
      "2 revisions included",
      "Hashtag & SEO strategy",
    ],
    popular: false,
  },
  {
    tier: "GROWTH",
    name: "Content Pack",
    price: 1000,
    description: "4 premium reels — multi-platform content bundle",
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
    name: "Brand Deal Package",
    price: 1500,
    description: "Premium solo influencer placement — most popular for brands",
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
      "Direct influencer communication",
    ],
    popular: true,
  },
  {
    tier: "TRIO",
    name: "3-Influencer Collab",
    price: 2250,
    description: "3 verified influencers, coordinated campaign",
    features: [
      "3 verified influencers",
      "2x 30-second reels each (6 total)",
      "IG + TikTok distribution",
      "Coordinated 24-hour launch window",
      "5-day delivery",
      "Hashtag strategy",
      "Performance report",
      "300K+ combined reach",
    ],
    popular: false,
  },
  {
    tier: "SQUAD",
    name: "5-Influencer Rollout",
    price: 3500,
    description: "5 verified influencers, coordinated launch",
    features: [
      "5 verified influencers",
      "2x 30-second reels each (10 total)",
      "IG + TikTok distribution",
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
    tier: "COLLECTIVE",
    name: "Influencer Collective",
    price: 5000,
    description: "7 verified influencers, multi-platform blitz",
    features: [
      "7 verified influencers",
      "2x 30-second reels each (14 total)",
      "IG + TikTok distribution",
      "Coordinated 8-hour launch window",
      "6-day delivery",
      "Advanced hashtag & trend strategy",
      "Dedicated campaign coordinator",
      "Performance dashboard + weekly report",
      "700K+ combined reach",
    ],
    popular: true,
  },
  {
    tier: "VIRAL_NETWORK",
    name: "Viral Launch — 10 Influencers",
    price: 8500,
    description: "10 influencers, synchronized viral launch",
    features: [
      "10 verified influencers",
      "2x 30-second reels each (20 total)",
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
    name: "Feed Takeover — 20 Influencers",
    price: 15000,
    description: "20 influencers dominating feeds simultaneously",
    features: [
      "20 verified influencers",
      "2x 30-second reels each (40 total)",
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
    name: "Agency Campaign — 50 Influencers",
    price: 35000,
    description: "50 influencers, full agency campaign management",
    features: [
      "50 verified influencers",
      "2x 30-second reels each (100 total)",
      "Synchronized simultaneous launch",
      "14-day delivery",
      "Full campaign management team",
      "Influencer recruitment & vetting",
      "Paid ad integration support",
      "Daily strategy optimization",
      "Advanced analytics & reporting",
      "Monthly strategy sessions",
      "Extended usage rights (90 days)",
      "5M+ combined reach",
    ],
    popular: false,
  },
  {
    tier: "ENTERPRISE",
    name: "Enterprise — 100+ Influencers",
    price: 65000,
    description: "100+ influencers, total market domination",
    features: [
      "100+ verified influencers",
      "2x 30-second reels each (200+ total)",
      "Synchronized simultaneous launch",
      "21-day delivery",
      "Dedicated 5-person team",
      "Celebrity/mega-influencer partnerships",
      "Full production crew & studio access",
      "Daily strategy & optimization calls",
      "Real-time analytics dashboard",
      "PR & media outreach included",
      "Event activations & IRL content",
      "Extended usage rights (6 months)",
      "Concierge support 24/7/365",
      "10M+ combined reach",
    ],
    popular: false,
  },
];

const LOG_MIN = Math.log(300);
const LOG_MAX = Math.log(65000);

function sliderPosToDollar(pos: number): number {
  return Math.round(Math.exp(LOG_MIN + (pos / 100) * (LOG_MAX - LOG_MIN)));
}

function dollarToTier(dollar: number): BudgetTier {
  if (dollar < 2000) return 'testing';
  if (dollar < 8000) return 'scaling';
  return 'enterprise';
}

function formatBudget(n: number): string {
  if (n >= 1000) return `$${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K`;
  return `$${n}`;
}

const subscriptionPlans = [
  {
    id: 'ESSENTIAL',
    name: 'Essential',
    price: 999,
    tagline: 'Stay consistent, stay visible',
    highlight: false,
    influencers: 1,
    reels: 4,
    reach: '80K+',
    features: [
      '1 dedicated influencer',
      '4 reels per month (1/week)',
      'Instagram + TikTok distribution',
      'Monthly performance report',
      'Priority booking & scheduling',
      '30-day content calendar',
      'Basic hashtag strategy',
      '80K+ monthly views guaranteed',
    ],
  },
  {
    id: 'GROWTH_SUB',
    name: 'Growth',
    price: 2499,
    tagline: 'Scale your presence month over month',
    highlight: true,
    influencers: 2,
    reels: 6,
    reach: '200K+',
    features: [
      '2 dedicated influencers',
      '6 reels per month (3 each)',
      'IG + TikTok + YouTube Shorts',
      'Bi-weekly strategy calls',
      'Advanced analytics dashboard',
      'Hashtag & SEO optimization',
      'Dedicated campaign coordinator',
      'Trend optimization included',
      '200K+ monthly views guaranteed',
    ],
  },
  {
    id: 'PRO_SUB',
    name: 'Pro',
    price: 3999,
    tagline: 'Full-service monthly management',
    highlight: false,
    influencers: 3,
    reels: 10,
    reach: '400K+',
    features: [
      '3 dedicated influencers',
      '10 reels per month',
      'Full platform coverage',
      'Weekly strategy & creative calls',
      'Dedicated account manager',
      'Brand integration & product placement',
      'Custom 30-day content calendar',
      'Real-time analytics dashboard',
      'Unlimited revisions',
      '400K+ monthly views guaranteed',
    ],
  },
  {
    id: 'AGENCY_SUB',
    name: 'Agency',
    price: 9999,
    tagline: 'Total market domination on retainer',
    highlight: false,
    influencers: 10,
    reels: 20,
    reach: '1M+',
    features: [
      '10+ dedicated influencers',
      '20 reels per month (2 each)',
      'All platforms + Snapchat & Facebook',
      'Daily campaign optimization',
      'Dedicated 3-person agency team',
      'Influencer recruitment & vetting',
      'Real-time analytics dashboard',
      'Weekly executive strategy sessions',
      'Trend jacking & viral campaign design',
      'PR & media outreach integration',
      'Direct access to agency leadership',
      '1M+ monthly views guaranteed',
    ],
  },
];

function PricingInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const budgetParam = searchParams.get('budget') as BudgetTier | null;
  const [selectedBudget, setSelectedBudget] = useState<BudgetTier | null>(
    budgetParam && ['testing', 'scaling', 'enterprise'].includes(budgetParam) ? budgetParam : null
  );
  const [sliderPos, setSliderPos] = useState(23);
  const [activeBudgetDollar, setActiveBudgetDollar] = useState<number | null>(null);
  const [billingMode, setBillingMode] = useState<'one-time' | 'subscription'>('one-time');

  const handleSubscribe = async (planId: string, price: number) => {
    try {
      const res = await fetch('/api/create-subscription-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId, price }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (err) {
      console.error('Subscription checkout error:', err);
    }
  };

  useEffect(() => {
    // keep URL in sync so "back" + share links work
    if (selectedBudget) {
      const url = new URL(window.location.href);
      url.searchParams.set('budget', selectedBudget);
      window.history.replaceState({}, '', url.toString());
    } else {
      const url = new URL(window.location.href);
      url.searchParams.delete('budget');
      window.history.replaceState({}, '', url.toString());
    }
  }, [selectedBudget]);

  const sliderDollar = sliderPosToDollar(sliderPos);
  const sliderTier = dollarToTier(sliderDollar);
  const activeTier = selectedBudget ? budgetTiers.find((t) => t.id === selectedBudget) : null;
  const filteredPackages = activeTier
    ? activeBudgetDollar
      ? packages.filter((p) =>
          p.price >= Math.max(activeTier.min, activeBudgetDollar * 0.35) &&
          p.price <= Math.min(activeTier.max, activeBudgetDollar * 2.5) &&
          p.tier !== 'TEST'
        )
      : packages.filter((p) => p.price >= activeTier.min && p.price <= activeTier.max && p.tier !== 'TEST')
    : [];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#080808' }}>
      <nav className="border-b border-white/[0.06] bg-[#080808]/95 backdrop-blur-xl fixed w-full z-50">
        <div className="flex items-center justify-between h-16 md:h-20 px-6 md:px-14">
          <div className="flex items-center gap-4">
            <MobileNav />
            <div className="hidden md:flex items-center gap-10">
              <Link href="/marketplace" className="text-white/55 hover:text-white transition-colors duration-300 text-[11px] tracking-widest uppercase">Talent</Link>
              <Link href="/services" className="text-white/55 hover:text-white transition-colors duration-300 text-[11px] tracking-widest uppercase">Services</Link>
              <Link href="/pricing" className="text-white/55 hover:text-white transition-colors duration-300 text-[11px] tracking-widest uppercase">Pricing</Link>
            </div>
          </div>
          <Link href="/" className="font-display font-semibold tracking-[0.4em] uppercase" style={{ fontSize: '18px', color: '#c9a96e' }}>Influence</Link>
          <div className="flex items-center gap-10">
            <Link href="/about" className="text-white/55 hover:text-white transition-colors duration-300 text-[11px] tracking-widest uppercase hidden md:block">About</Link>
            <Link href="/model-booking" className="text-[11px] md:text-[12px] tracking-widest uppercase px-5 py-3 md:px-8 md:py-4 transition-all duration-300 hover:opacity-80 font-bold" style={{ backgroundColor: '#c9a96e', color: '#000' }}>Book Now</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        {/* ── Billing Mode Toggle ── */}
        <div className="flex items-center justify-center mb-14">
          <div className="flex items-center border border-white/[0.1]" style={{ backgroundColor: '#0d0d0d' }}>
            <button
              onClick={() => setBillingMode('one-time')}
              className="px-10 py-4 font-bold text-[12px] tracking-widest uppercase transition-all"
              style={billingMode === 'one-time' ? { backgroundColor: '#c9a96e', color: '#000' } : { color: 'rgba(255,255,255,0.5)' }}
            >
              One-Time
            </button>
            <button
              onClick={() => { setBillingMode('subscription'); setSelectedBudget(null); }}
              className="px-10 py-4 font-bold text-[12px] tracking-widest uppercase transition-all flex items-center gap-3"
              style={billingMode === 'subscription' ? { backgroundColor: '#c9a96e', color: '#000' } : { color: 'rgba(255,255,255,0.5)' }}
            >
              Monthly Plan
              <span className="px-2 py-0.5 text-[9px] font-black tracking-wider uppercase" style={{ backgroundColor: '#16a34a', color: '#fff' }}>Save</span>
            </button>
          </div>
        </div>

        {billingMode === 'subscription' ? (
          <>
            <div className="text-center mb-20">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-8 h-px" style={{ backgroundColor: '#c9a96e' }} />
                <span className="text-[11px] font-bold tracking-[0.4em] uppercase" style={{ color: '#c9a96e' }}>Monthly Retainer</span>
                <div className="w-8 h-px" style={{ backgroundColor: '#c9a96e' }} />
              </div>
              <h1 className="font-display font-bold italic text-white mb-6" style={{ fontSize: 'clamp(36px, 6vw, 72px)' }}>
                Always On. <span style={{ color: '#c9a96e' }}>Always Growing.</span>
              </h1>
              <p className="text-white/50 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
                Lock in your dedicated influencer team. Consistent content, compounding growth, no per-campaign surprises.
              </p>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-500/5 border border-green-500/20">
                <Check className="h-4 w-4 text-green-400" />
                <span className="text-green-400/80 text-xs font-semibold tracking-wider uppercase">Cancel anytime · No contracts</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-0 max-w-7xl mx-auto mb-16 border border-white/[0.06]">
              {subscriptionPlans.map((plan, idx) => (
                <div
                  key={plan.id}
                  className={`relative flex flex-col p-8 md:p-9 transition-all ${
                    plan.highlight
                      ? 'bg-[#c9a96e]/[0.04] border-x border-[#c9a96e]/30 md:-translate-y-3 md:shadow-2xl md:shadow-[#c9a96e]/10 z-10'
                      : 'bg-[#0a0a0a]'
                  } ${idx > 0 && !plan.highlight ? 'border-l border-white/[0.06]' : ''}`}
                >
                  {plan.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                      <span className="px-4 py-1.5 text-[10px] font-black tracking-widest uppercase" style={{ backgroundColor: '#c9a96e', color: '#000' }}>Most Popular</span>
                    </div>
                  )}
                  <div className={plan.highlight ? 'pt-2' : ''}>
                    <p className="text-white/30 text-[9px] font-bold tracking-[0.3em] uppercase mb-2">{plan.tagline}</p>
                    <h3 className="text-2xl font-bold text-white mb-1">{plan.name}</h3>
                    <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-3xl font-bold" style={{ color: '#c9a96e' }}>${plan.price.toLocaleString()}</span>
                      <span className="text-white/30 text-xs">/mo</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-6 py-4 border-y border-white/[0.06]">
                      <div className="text-center">
                        <p className="text-lg font-bold text-white">{plan.influencers}</p>
                        <p className="text-[8px] text-white/25 uppercase tracking-widest mt-0.5">Creator{plan.influencers > 1 ? 's' : ''}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-white">{plan.reels}+</p>
                        <p className="text-[8px] text-white/25 uppercase tracking-widest mt-0.5">Reels/mo</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold" style={{ color: '#c9a96e' }}>{plan.reach}</p>
                        <p className="text-[8px] text-white/25 uppercase tracking-widest mt-0.5">Views/mo</p>
                      </div>
                    </div>

                    <ul className="space-y-2.5 mb-8">
                      {plan.features.slice(0, 6).map((f: string, i: number) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <Check className="h-3.5 w-3.5 text-[#c9a96e]/60 flex-shrink-0 mt-0.5" />
                          <span className="text-white/50 text-[12px] leading-snug">{f}</span>
                        </li>
                      ))}
                      {plan.features.length > 6 && (
                        <li className="text-white/20 text-[11px] pl-6">+ {plan.features.length - 6} more</li>
                      )}
                    </ul>
                  </div>
                  <button
                    onClick={() => handleSubscribe(plan.id, plan.price)}
                    className={`w-full py-4 text-[11px] font-bold tracking-widest uppercase transition-all mt-auto ${
                      plan.highlight
                        ? 'text-black hover:opacity-90'
                        : 'bg-transparent border border-white/10 text-white/70 hover:border-[#c9a96e]/50 hover:text-white'
                    }`}
                    style={plan.highlight ? { backgroundColor: '#c9a96e' } : undefined}
                  >
                    Start {plan.name}
                  </button>
                </div>
              ))}
            </div>

            <div className="text-center mt-4 mb-8">
              <p className="text-white/20 text-xs">Plans renew monthly. Cancel anytime from your dashboard.</p>
              <p className="text-white/20 text-xs mt-2">Need a custom retainer? <Link href="/contact" className="text-[#c9a96e]/50 hover:text-[#c9a96e] underline">Talk to our team →</Link></p>
            </div>
          </>
        ) : !selectedBudget ? (
          // STEP 1: Budget tier selection
          <>
            <div className="text-center mb-16">
              <div className="mb-6 flex items-center justify-center gap-3">
                <div className="w-6 h-px" style={{ backgroundColor: '#c9a96e' }} />
                <span className="text-[11px] font-bold tracking-[0.4em] uppercase" style={{ color: '#c9a96e' }}>Step 1 of 2</span>
                <div className="w-6 h-px" style={{ backgroundColor: '#c9a96e' }} />
              </div>
              <h1 className="font-display font-bold italic text-white mb-6" style={{ fontSize: 'clamp(52px, 8vw, 100px)' }}>
                What&apos;s Your Budget?
              </h1>
              <p className="text-white/55 text-xl max-w-2xl mx-auto leading-relaxed">
                Tell us where you&apos;re at — we&apos;ll show you the packages that match.
              </p>
            </div>

            {/* ── Budget Slider ── */}
            <div className="max-w-2xl mx-auto mb-16 px-4">
              <div className="border border-white/[0.08] p-8 md:p-10" style={{ backgroundColor: '#0d0d0d' }}>
                <div className="flex items-end justify-between mb-6">
                  <div>
                    <p className="text-[11px] font-bold tracking-[0.4em] uppercase mb-1" style={{ color: '#c9a96e' }}>Drag to set your budget</p>
                    <p className="text-white/35 text-xs">Slide to find your perfect match</p>
                  </div>
                  <div className="text-right">
                    <span className="font-heading" style={{ fontSize: '52px', color: '#c9a96e', lineHeight: 1 }}>{formatBudget(sliderDollar)}</span>
                    <p className="text-white/40 text-xs mt-1 uppercase tracking-wider">
                      {sliderTier === 'testing' ? 'Single Influencer' : sliderTier === 'scaling' ? 'Influencer Campaign' : 'Platform Takeover'}
                    </p>
                  </div>
                </div>
                <div className="relative mt-4 mb-5">
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={sliderPos}
                    onChange={(e) => setSliderPos(Number(e.target.value))}
                    className="budget-slider w-full h-1 appearance-none cursor-pointer"
                    style={{ background: `linear-gradient(to right, #c9a96e ${sliderPos}%, rgba(255,255,255,0.1) ${sliderPos}%)` }}
                  />
                  <div className="flex justify-between text-white/30 text-[10px] tracking-widest uppercase mt-3">
                    <span>$100</span><span>$500</span><span>$5K</span><span>$100K</span>
                  </div>
                </div>
                <button
                  onClick={() => { setSelectedBudget(sliderTier); setActiveBudgetDollar(sliderDollar); }}
                  className="w-full mt-4 py-5 font-bold text-[14px] tracking-widest uppercase transition-all hover:opacity-85"
                  style={{ backgroundColor: '#c9a96e', color: '#000' }}
                >
                  Show Packages for {formatBudget(sliderDollar)} →
                </button>
              </div>
              <p className="text-center text-white/25 text-xs mt-6 tracking-[0.3em] uppercase">— or select a budget range below —</p>
            </div>

            <div className="grid md:grid-cols-3 gap-px max-w-6xl mx-auto" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
              {budgetTiers.map((tier) => {
                const Icon = tier.icon;
                const isActive = sliderTier === tier.id;
                return (
                  <button
                    key={tier.id}
                    onClick={() => { setSelectedBudget(tier.id); setActiveBudgetDollar(null); }}
                    className="group relative text-left p-8 md:p-10 overflow-hidden transition-all duration-300"
                    style={{ backgroundColor: isActive ? 'rgba(201,169,110,0.06)' : '#0d0d0d', borderBottom: isActive ? '2px solid #c9a96e' : '2px solid transparent' }}
                  >
                    <div className="relative">
                      <div className="w-14 h-14 border flex items-center justify-center mb-8 transition-all" style={{ borderColor: isActive ? '#c9a96e' : 'rgba(255,255,255,0.15)' }}>
                        <Icon className="h-6 w-6" style={{ color: '#c9a96e' }} />
                      </div>
                      <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-3" style={{ color: '#c9a96e' }}>{tier.tagline}</p>
                      <h3 className="font-display font-semibold italic text-white mb-2" style={{ fontSize: '28px' }}>{tier.label}</h3>
                      <p className="font-heading mb-5" style={{ fontSize: '28px', color: '#c9a96e', lineHeight: 1 }}>{tier.range}</p>
                      <p className="text-white/50 text-[10px] tracking-[0.3em] uppercase mb-5 border border-white/[0.08] inline-block px-3 py-1.5">{tier.audience}</p>
                      <p className="text-white/55 text-sm leading-relaxed mb-8">{tier.description}</p>
                      <div className="flex items-center justify-between pt-5 border-t border-white/[0.08]">
                        <span className="text-white font-semibold text-[11px] tracking-widest uppercase">See Packages</span>
                        <ChevronRight className="h-4 w-4 text-white group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="text-center mt-16">
              <p className="text-white/40 text-sm mb-3">Not sure which fits? No problem.</p>
              <Link href="/contact" className="font-semibold text-base hover:opacity-70 transition-all" style={{ color: '#c9a96e' }}>
                Talk to our team →
              </Link>
            </div>

          </>
        ) : (
          // STEP 2: Filtered packages for selected budget
          <>
            <button
              onClick={() => { setSelectedBudget(null); setActiveBudgetDollar(null); }}
              className="inline-flex items-center space-x-2 text-white/60 hover:text-[#c9a96e] transition-colors mb-8 text-sm font-semibold tracking-wider uppercase"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Change Budget</span>
            </button>

            <div className="text-center mb-16">
              <div className="mb-6 inline-flex items-center space-x-2 px-5 py-2 border border-[#c9a96e]/30 rounded-full bg-[#c9a96e]/5">
                {activeTier && <activeTier.icon className="h-4 w-4 text-[#c9a96e]" />}
                <span className="text-[#c9a96e] text-xs font-bold tracking-widest uppercase">{activeTier?.label} · {activeBudgetDollar ? formatBudget(activeBudgetDollar) + ' budget' : activeTier?.range}</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
                Your <span className="gradient-text">Packages</span>
              </h1>
              <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
                {filteredPackages.length} {filteredPackages.length === 1 ? 'package' : 'packages'} matched to your {activeBudgetDollar ? formatBudget(activeBudgetDollar) : activeTier?.range} budget. Pick the right one and launch.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-16">
              {filteredPackages.map((pkg) => (
            <Card 
              key={pkg.tier} 
              className={`relative bg-zinc-900 border hover-lift transition-all overflow-hidden ${
                pkg.popular 
                  ? 'border-[#c9a96e] border-2 shadow-xl shadow-[#c9a96e]/20' 
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
                      <Check className="h-4 w-4 text-[#c9a96e] flex-shrink-0 mt-0.5" />
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
                      ? 'gold-gradient text-black hover:shadow-lg hover:shadow-[#c9a96e]/40' 
                      : 'bg-transparent border border-white/20 text-white hover:border-[#c9a96e] hover:text-[#c9a96e]'
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
          <div className="mt-32 bg-zinc-900 border border-[#c9a96e]/30 p-12 text-center">
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
            <Link href="/quote?type=campaign" className="text-[#c9a96e] hover:text-white font-bold text-xl underline">
              Contact us for enterprise solutions
            </Link>
          </div>

          {/* In-Person Services Cross-Sell */}
          <div className="mt-16 border border-white/[0.08] p-8 md:p-10 text-center" style={{ backgroundColor: '#0d0d0d' }}>
            <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-3" style={{ color: '#c9a96e' }}>In-Person Services</p>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Looking for models in South Florida?</h3>
            <p className="text-white/50 text-sm mb-6 max-w-xl mx-auto">
              Book professional models for shoots, events, business content, and music videos. All in-person packages are available on our booking page.
            </p>
            <Link href="/model-booking" className="inline-flex items-center gap-2 px-8 py-4 text-[12px] font-bold tracking-widest uppercase transition-all hover:opacity-80" style={{ backgroundColor: '#c9a96e', color: '#000' }}>
              Book In-Person Models →
            </Link>
          </div>
        </div>

        <footer className="bg-[#080808] border-t border-white/[0.06] mt-32">
          <div className="max-w-7xl mx-auto px-6 md:px-16 pt-16 pb-10">
            <div className="flex flex-col md:flex-row justify-between gap-16 mb-16">
              <Link href="/" className="font-display font-semibold tracking-[0.4em] uppercase self-start shrink-0" style={{ fontSize: '17px', color: '#c9a96e' }}>Influence</Link>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-20">
                <div>
                  <p className="text-white/40 text-[9px] tracking-widest uppercase mb-6">Work With Us</p>
                  <ul className="space-y-3">
                    <li><Link href="/marketplace" className="text-white/60 hover:text-white transition-colors text-sm">Browse Talent</Link></li>
                    <li><Link href="/services" className="text-white/60 hover:text-white transition-colors text-sm">All Services</Link></li>
                    <li><Link href="/pricing" className="text-white/60 hover:text-white transition-colors text-sm">Packages</Link></li>
                    <li><Link href="/model-booking" className="text-white/60 hover:text-white transition-colors text-sm">Book Now</Link></li>
                  </ul>
                </div>
                <div>
                  <p className="text-white/20 text-[9px] tracking-widest uppercase mb-6">Services</p>
                  <ul className="space-y-3">
                    <li><Link href="/services/content" className="text-white/40 hover:text-white transition-colors text-sm">Social Media Content</Link></li>
                    <li><Link href="/services/business" className="text-white/40 hover:text-white transition-colors text-sm">Business Content</Link></li>
                    <li><Link href="/services/shoots" className="text-white/40 hover:text-white transition-colors text-sm">Shoots &amp; Videos</Link></li>
                    <li><Link href="/services/commercials" className="text-white/40 hover:text-white transition-colors text-sm">Commercials</Link></li>
                    <li><Link href="/services/events" className="text-white/40 hover:text-white transition-colors text-sm">Event Models</Link></li>
                  </ul>
                </div>
                <div>
                  <p className="text-white/20 text-[9px] tracking-widest uppercase mb-6">Info</p>
                  <ul className="space-y-3">
                    <li><Link href="/about" className="text-white/40 hover:text-white transition-colors text-sm">About</Link></li>
                    <li><Link href="/faq" className="text-white/40 hover:text-white transition-colors text-sm">FAQ</Link></li>
                    <li><Link href="/contact" className="text-white/40 hover:text-white transition-colors text-sm">Contact</Link></li>
                    <li><Link href="/join" className="text-white/40 hover:text-white transition-colors text-sm">Join Our Roster</Link></li>
                  <li><Link href="/terms" className="text-white/40 hover:text-white transition-colors text-sm">Terms</Link></li>                  </ul>
                </div>
              </div>
            </div>
            <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-white/20 text-xs">&copy; 2026 Influence</p>
              <Link href="https://www.instagram.com/influencemodels.agency" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white/70 transition-colors text-[11px] tracking-widest uppercase">Instagram</Link>
              <p className="text-white/10 text-[9px] tracking-widest uppercase">Miami &middot; Boca Raton, FL</p>
            </div>
          </div>
        </footer>
          </>
        )}
      </div>
    </div>
  );
}

export default function PricingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <PricingInner />
    </Suspense>
  );
}
