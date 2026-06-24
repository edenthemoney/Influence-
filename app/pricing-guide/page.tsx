'use client';

import Link from 'next/link';
import { ChevronRight, Check } from 'lucide-react';
import { useState } from 'react';
import MobileNav from '../components/MobileNav';

const gold = '#c9a96e';

interface PricingTier {
  tier: string;
  name: string;
  price: number;
  influencers: number;
  reach: string;
  description: string;
  features: string[];
}

const pricingTiers: Record<string, PricingTier> = {
  SAMPLE: {
    tier: 'SAMPLE',
    name: 'Single Reel',
    price: 300,
    influencers: 1,
    reach: '50K',
    description: '1 premium reel from a verified creator',
    features: ['1x 30-second reel', 'Single platform', '3-day delivery'],
  },
  STARTER: {
    tier: 'STARTER',
    name: 'Dual Reel',
    price: 500,
    influencers: 1,
    reach: '100K',
    description: 'IG + TikTok — double the reach',
    features: ['2x 30-second reels', 'Dual platform', '3-day delivery'],
  },
  GROWTH: {
    tier: 'GROWTH',
    name: 'Content Pack',
    price: 1000,
    influencers: 1,
    reach: '200K',
    description: '4 premium reels multi-platform',
    features: ['4x 30-second reels', 'Multi-platform', '5-day delivery'],
  },
  PRO: {
    tier: 'PRO',
    name: 'Brand Deal',
    price: 1500,
    influencers: 1,
    reach: '300K',
    description: 'Most popular for serious brands',
    features: ['6x premium reels', 'Full platform coverage', '7-day delivery'],
  },
  TRIO: {
    tier: 'TRIO',
    name: 'Trio Campaign',
    price: 2250,
    influencers: 3,
    reach: '300K',
    description: '3 verified influencers, coordinated campaign',
    features: ['3 influencers', '2x reels each', '24-hour launch window'],
  },
  SQUAD: {
    tier: 'SQUAD',
    name: 'Squad Campaign',
    price: 3500,
    influencers: 5,
    reach: '500K',
    description: '5 verified influencers coordinated launch',
    features: ['5 influencers', '2x reels each', '12-hour launch window'],
  },
  VIRAL_NETWORK: {
    tier: 'VIRAL_NETWORK',
    name: 'Viral Launch',
    price: 8500,
    influencers: 10,
    reach: '1M',
    description: '10 influencers synchronized launch',
    features: ['10 influencers', '2x reels each', '6-hour launch window'],
  },
  MEGA: {
    tier: 'MEGA',
    name: 'Feed Takeover',
    price: 15000,
    influencers: 20,
    reach: '2M',
    description: '20 influencers dominating feeds',
    features: ['20 influencers', '2x reels each', '2-hour launch window'],
  },
  DOMINATION: {
    tier: 'DOMINATION',
    name: 'Agency Campaign',
    price: 35000,
    influencers: 50,
    reach: '5M',
    description: '50 influencers full agency management',
    features: ['50 influencers', '2x reels each', 'Simultaneous launch'],
  },
  ENTERPRISE: {
    tier: 'ENTERPRISE',
    name: 'Enterprise',
    price: 65000,
    influencers: 100,
    reach: '10M',
    description: '100+ influencers total market domination',
    features: ['100+ influencers', '2x reels each', 'Full management team'],
  },
};

type QuestionStep = 'budget' | 'goal' | 'reach' | 'result';

export default function PricingGuidePage() {
  const [step, setStep] = useState<QuestionStep>('budget');
  const [budget, setBudget] = useState<number>(500);
  const [goal, setGoal] = useState<string>('');
  const [reach, setReach] = useState<string>('');
  const [recommendedTier, setRecommendedTier] = useState<PricingTier | null>(null);

  const handleBudgetChange = (value: number) => {
    setBudget(value);
  };

  const handleGoalSelect = (selectedGoal: string) => {
    setGoal(selectedGoal);
    setStep('reach');
  };

  const handleReachSelect = (selectedReach: string) => {
    setReach(selectedReach);
    calculateRecommendation(budget, goal, selectedReach);
    setStep('result');
  };

  const calculateRecommendation = (budgetVal: number, goalVal: string, reachVal: string) => {
    let recommended: PricingTier | null = null;

    if (budgetVal <= 100) {
      recommended = pricingTiers.SAMPLE;
    } else if (budgetVal <= 300) {
      recommended = pricingTiers.STARTER;
    } else if (budgetVal <= 600) {
      recommended = pricingTiers.GROWTH;
    } else if (budgetVal <= 1000) {
      recommended = pricingTiers.PRO;
    } else if (budgetVal <= 2000) {
      recommended = pricingTiers.TRIO;
    } else if (budgetVal <= 3500) {
      recommended = pricingTiers.SQUAD;
    } else if (budgetVal <= 7000) {
      recommended = pricingTiers.VIRAL_NETWORK;
    } else if (budgetVal <= 15000) {
      recommended = pricingTiers.MEGA;
    } else if (budgetVal <= 50000) {
      recommended = pricingTiers.DOMINATION;
    } else {
      recommended = pricingTiers.ENTERPRISE;
    }

    // Adjust based on reach goals
    if (reachVal === 'viral' && recommended.price < 5999) {
      recommended = pricingTiers.VIRAL_NETWORK;
    } else if (reachVal === 'massive' && recommended.price < 12999) {
      recommended = pricingTiers.MEGA;
    }

    setRecommendedTier(recommended);
  };

  const resetQuiz = () => {
    setStep('budget');
    setBudget(500);
    setGoal('');
    setReach('');
    setRecommendedTier(null);
  };

  return (
    <div className="min-h-screen bg-[#080808]">
      {/* Nav */}
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
          <Link href="/" className="font-display font-semibold tracking-[0.4em] uppercase" style={{ fontSize: '18px', color: gold }}>Influence</Link>
          <div className="flex items-center gap-10">
            <Link href="/about" className="text-white/55 hover:text-white transition-colors duration-300 text-[11px] tracking-widest uppercase hidden md:block">About</Link>
            <Link href="/model-booking" className="text-[11px] md:text-[12px] tracking-widest uppercase px-5 py-3 md:px-8 md:py-4 transition-all duration-300 hover:opacity-80 font-bold" style={{ backgroundColor: gold, color: '#000' }}>Book Now</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 md:pt-44 pb-12 md:pb-16 px-8 md:px-16">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-5" style={{ color: gold }}>Package Finder</p>
          <h1 className="font-display font-bold italic text-white leading-[0.9] mb-6" style={{ fontSize: 'clamp(36px, 6vw, 72px)' }}>
            Find Your Perfect Campaign
          </h1>
          <p className="text-white/45 text-sm md:text-base max-w-md mx-auto">
            Answer a few quick questions and we&apos;ll recommend the ideal package for your budget and goals.
          </p>
        </div>
      </section>

      {/* Quiz */}
      <section className="pb-20 md:pb-32 px-6 md:px-16">
        <div className="max-w-2xl mx-auto">
          {step === 'budget' && (
            <div className="border border-white/[0.08] p-8 md:p-12" style={{ backgroundColor: '#0a0a0a' }}>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">What&apos;s your budget?</h2>
              <p className="text-white/40 text-sm mb-10">Use the slider or quick-select below</p>
              <div className="space-y-8">
                <input
                  type="range" min="80" max="100000" value={budget}
                  onChange={(e) => handleBudgetChange(Number(e.target.value))}
                  className="w-full h-1 appearance-none cursor-pointer"
                  style={{ background: `linear-gradient(to right, ${gold} ${((budget - 80) / (100000 - 80)) * 100}%, rgba(255,255,255,0.1) ${((budget - 80) / (100000 - 80)) * 100}%)` }}
                />
                <div className="text-center">
                  <p className="font-display font-bold italic mb-1" style={{ fontSize: '48px', color: gold }}>${budget.toLocaleString()}</p>
                  <p className="text-white/30 text-xs tracking-widest uppercase">Per campaign</p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[{ label: 'Quick Test', value: 250 }, { label: 'Popular', value: 2750 }, { label: 'Enterprise', value: 35000 }].map(({ label, value }) => (
                    <button key={value} onClick={() => handleBudgetChange(value)}
                      className="p-4 border transition-all text-center"
                      style={{ borderColor: budget === value ? 'rgba(201,169,110,0.3)' : 'rgba(255,255,255,0.08)', backgroundColor: budget === value ? 'rgba(201,169,110,0.08)' : 'transparent' }}>
                      <p className="text-white/40 text-[10px] tracking-widest uppercase">{label}</p>
                      <p className="text-white font-bold mt-1">${value >= 1000 ? `${value / 1000}K` : value}</p>
                    </button>
                  ))}
                </div>
                <button onClick={() => setStep('goal')}
                  className="w-full flex items-center justify-center gap-3 py-5 text-[13px] font-bold tracking-widest uppercase transition-all hover:opacity-80"
                  style={{ backgroundColor: gold, color: '#000' }}>
                  Continue <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {step === 'goal' && (
            <div className="border border-white/[0.08] p-8 md:p-12" style={{ backgroundColor: '#0a0a0a' }}>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">What&apos;s your main goal?</h2>
              <p className="text-white/40 text-sm mb-10">Select what matters most for your campaign</p>
              <div className="space-y-3">
                {[
                  { id: 'test', label: 'Test & Learn', desc: 'Try influencer marketing for the first time' },
                  { id: 'growth', label: 'Growth', desc: 'Scale your brand and increase awareness' },
                  { id: 'viral', label: 'Go Viral', desc: 'Maximum reach and trending potential' },
                  { id: 'dominate', label: 'Dominate', desc: 'Own your market and crush competitors' },
                ].map((option) => (
                  <button key={option.id} onClick={() => handleGoalSelect(option.id)}
                    className="w-full p-6 border border-white/[0.08] hover:border-white/20 transition-all text-left group flex items-center justify-between">
                    <div>
                      <p className="text-white font-bold text-lg">{option.label}</p>
                      <p className="text-white/40 text-sm">{option.desc}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-white/20 group-hover:text-white/60 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'reach' && (
            <div className="border border-white/[0.08] p-8 md:p-12" style={{ backgroundColor: '#0a0a0a' }}>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">How much reach do you need?</h2>
              <p className="text-white/40 text-sm mb-10">Select your target impression range</p>
              <div className="space-y-3">
                {[
                  { id: 'local', label: '50K – 300K Impressions', desc: 'Local / niche audience reach' },
                  { id: 'regional', label: '300K – 1M Impressions', desc: 'Regional / growing audience' },
                  { id: 'viral', label: '1M – 5M Impressions', desc: 'Viral potential, major reach' },
                  { id: 'massive', label: '5M+ Impressions', desc: 'Massive scale, market domination' },
                ].map((option) => (
                  <button key={option.id} onClick={() => handleReachSelect(option.id)}
                    className="w-full p-6 border border-white/[0.08] hover:border-white/20 transition-all text-left group flex items-center justify-between">
                    <div>
                      <p className="text-white font-bold text-lg">{option.label}</p>
                      <p className="text-white/40 text-sm">{option.desc}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-white/20 group-hover:text-white/60 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'result' && recommendedTier && (
            <div className="space-y-8">
              <div className="border p-8 md:p-12" style={{ backgroundColor: '#0a0a0a', borderColor: 'rgba(201,169,110,0.25)' }}>
                <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-4" style={{ color: gold }}>Perfect Match</p>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">{recommendedTier.name}</h2>
                <p className="text-white/50 text-base mb-8">{recommendedTier.description}</p>
                <div className="grid grid-cols-3 gap-6 mb-8 pt-6 border-t border-white/[0.06]">
                  <div>
                    <p className="text-white/30 text-[10px] tracking-widest uppercase mb-2">Price</p>
                    <p className="font-display font-bold italic" style={{ fontSize: '28px', color: gold }}>${recommendedTier.price.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-white/30 text-[10px] tracking-widest uppercase mb-2">Influencers</p>
                    <p className="text-2xl font-bold text-white">{recommendedTier.influencers}+</p>
                  </div>
                  <div>
                    <p className="text-white/30 text-[10px] tracking-widest uppercase mb-2">Reach</p>
                    <p className="text-2xl font-bold text-white">{recommendedTier.reach}</p>
                  </div>
                </div>
                <div className="space-y-3 mb-8">
                  {recommendedTier.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <Check className="h-4 w-4 flex-shrink-0" style={{ color: gold }} />
                      <span className="text-white/70 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                <Link href="/model-booking"
                  className="flex items-center justify-center gap-3 w-full py-5 text-[13px] font-bold tracking-widest uppercase transition-all hover:opacity-80"
                  style={{ backgroundColor: gold, color: '#000' }}>
                  Book {recommendedTier.name} <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="text-center flex items-center justify-center gap-6 text-sm">
                <button onClick={resetQuiz} className="underline transition-colors hover:text-white" style={{ color: gold }}>Start Over</button>
                <span className="text-white/20">|</span>
                <Link href="/pricing" className="underline transition-colors hover:text-white" style={{ color: gold }}>View All Packages</Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#080808] border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 md:px-16 pt-16 pb-10">
          <div className="flex flex-col md:flex-row justify-between gap-16 mb-16">
            <Link href="/" className="font-display font-semibold tracking-[0.4em] uppercase self-start shrink-0" style={{ fontSize: '17px', color: gold }}>Influence</Link>
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
                  <li><Link href="/terms" className="text-white/40 hover:text-white transition-colors text-sm">Terms</Link></li>                </ul>
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
    </div>
  );
}
