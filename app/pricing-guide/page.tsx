'use client';

import Link from 'next/link';
import { Crown, ChevronRight, Check } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface PricingTier {
  tier: string;
  name: string;
  price: number;
  creators: number;
  reach: string;
  description: string;
  features: string[];
}

const pricingTiers: Record<string, PricingTier> = {
  SAMPLE: {
    tier: 'SAMPLE',
    name: 'Sample',
    price: 80,
    creators: 1,
    reach: '50K',
    description: 'Test our service risk-free',
    features: ['1x 15-second reel', 'Single platform', '48-hour delivery'],
  },
  STARTER: {
    tier: 'STARTER',
    name: 'Starter',
    price: 250,
    creators: 1,
    reach: '100K',
    description: 'Perfect for first-time campaigns',
    features: ['2x 30-second reels', 'Dual platform', '3-day delivery'],
  },
  GROWTH: {
    tier: 'GROWTH',
    name: 'Growth',
    price: 500,
    creators: 1,
    reach: '200K',
    description: 'Scale your brand presence',
    features: ['4x 30-second reels', 'Multi-platform', '5-day delivery'],
  },
  PRO: {
    tier: 'PRO',
    name: 'Pro',
    price: 850,
    creators: 1,
    reach: '300K',
    description: 'Most popular for serious brands',
    features: ['6x premium reels', 'Full platform coverage', '7-day delivery'],
  },
  TRIO: {
    tier: 'TRIO',
    name: 'Trio Campaign',
    price: 1500,
    creators: 3,
    reach: '300K',
    description: '3 verified creators posting together',
    features: ['3 creators', '3x reels each', '24-hour launch window'],
  },
  SQUAD: {
    tier: 'SQUAD',
    name: 'Squad Campaign',
    price: 2750,
    creators: 5,
    reach: '500K',
    description: '5 verified creators coordinated launch',
    features: ['5 creators', '4x reels each', '12-hour launch window'],
  },
  VIRAL_NETWORK: {
    tier: 'VIRAL_NETWORK',
    name: 'Viral Network',
    price: 5999,
    creators: 10,
    reach: '1M',
    description: '10 creators synchronized launch',
    features: ['10 creators', '5x reels each', '6-hour launch window'],
  },
  MEGA: {
    tier: 'MEGA',
    name: 'Mega Campaign',
    price: 12999,
    creators: 20,
    reach: '2M',
    description: '20 creators enterprise-level campaign',
    features: ['20 creators', '6x reels each', '2-hour launch window'],
  },
  DOMINATION: {
    tier: 'DOMINATION',
    name: 'Domination',
    price: 35000,
    creators: 50,
    reach: '5M',
    description: '50 creators mega viral campaign',
    features: ['50 creators', '8x reels each', 'Simultaneous launch'],
  },
  ENTERPRISE: {
    tier: 'ENTERPRISE',
    name: 'Enterprise',
    price: 100000,
    creators: 100,
    reach: '10M',
    description: '100+ creators total market domination',
    features: ['100+ creators', '10x reels each', 'Full management team'],
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
    <div className="min-h-screen bg-black">
      <nav className="border-b border-white/10 bg-black/80 backdrop-blur-xl fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center space-x-3">
              <Crown className="h-10 w-10 text-yellow-500" />
              <span className="text-3xl font-bold gradient-text tracking-tight">INFLUENCE</span>
            </Link>
            <Link href="/pricing" className="text-white/80 hover:text-yellow-500 transition-colors text-sm font-medium tracking-wide uppercase">
              View All Packages
            </Link>
          </div>
        </div>
      </nav>

      <section className="relative pt-32 pb-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900 to-black"></div>
        <div className="relative max-w-2xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            <span className="text-white">Find Your Perfect</span>
            <br />
            <span className="gradient-text">Campaign Package</span>
          </h1>
          <p className="text-xl text-white/70">
            Answer a few quick questions and we'll recommend the ideal package for your budget and goals
          </p>
        </div>
      </section>

      <section className="py-20 bg-zinc-950">
        <div className="max-w-2xl mx-auto px-4">
          {step === 'budget' && (
            <div className="bg-black border border-white/10 p-12 rounded-lg">
              <h2 className="text-3xl font-black text-white mb-2">What's your budget?</h2>
              <p className="text-white/60 mb-10">Use the slider to select your budget range</p>

              <div className="space-y-8">
                <div>
                  <input
                    type="range"
                    min="80"
                    max="100000"
                    value={budget}
                    onChange={(e) => handleBudgetChange(Number(e.target.value))}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                  />
                </div>

                <div className="text-center">
                  <p className="text-5xl font-black gradient-text mb-2">${budget.toLocaleString()}</p>
                  <p className="text-white/60">per campaign</p>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <button
                    onClick={() => handleBudgetChange(250)}
                    className="p-4 bg-white/5 border border-white/10 rounded hover:border-yellow-500 transition-all"
                  >
                    <p className="text-white/60 text-sm">Quick Test</p>
                    <p className="text-white font-bold">$250</p>
                  </button>
                  <button
                    onClick={() => handleBudgetChange(2750)}
                    className="p-4 bg-white/5 border border-white/10 rounded hover:border-yellow-500 transition-all"
                  >
                    <p className="text-white/60 text-sm">Popular</p>
                    <p className="text-white font-bold">$2,750</p>
                  </button>
                  <button
                    onClick={() => handleBudgetChange(35000)}
                    className="p-4 bg-white/5 border border-white/10 rounded hover:border-yellow-500 transition-all"
                  >
                    <p className="text-white/60 text-sm">Enterprise</p>
                    <p className="text-white font-bold">$35K+</p>
                  </button>
                </div>

                <Button
                  onClick={() => setStep('goal')}
                  className="w-full gold-gradient text-black font-bold py-6 text-lg tracking-wider uppercase hover:shadow-2xl hover:shadow-yellow-500/50 transition-all"
                >
                  Continue <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          )}

          {step === 'goal' && (
            <div className="bg-black border border-white/10 p-12 rounded-lg">
              <h2 className="text-3xl font-black text-white mb-2">What's your main goal?</h2>
              <p className="text-white/60 mb-10">Select what matters most for your campaign</p>

              <div className="space-y-4">
                {[
                  { id: 'test', label: 'Test & Learn', desc: 'Try influencer marketing for the first time' },
                  { id: 'growth', label: 'Growth', desc: 'Scale your brand and increase awareness' },
                  { id: 'viral', label: 'Go Viral', desc: 'Maximum reach and trending potential' },
                  { id: 'dominate', label: 'Dominate', desc: 'Own your market and crush competitors' },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleGoalSelect(option.id)}
                    className="w-full p-6 bg-white/5 border border-white/10 rounded hover:border-yellow-500 hover:bg-yellow-500/5 transition-all text-left group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-bold text-lg">{option.label}</p>
                        <p className="text-white/60 text-sm">{option.desc}</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-white/40 group-hover:text-yellow-500 transition-colors" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'reach' && (
            <div className="bg-black border border-white/10 p-12 rounded-lg">
              <h2 className="text-3xl font-black text-white mb-2">How much reach do you need?</h2>
              <p className="text-white/60 mb-10">Select your target impression range</p>

              <div className="space-y-4">
                {[
                  { id: 'local', label: '50K - 300K Impressions', desc: 'Local/niche audience reach' },
                  { id: 'regional', label: '300K - 1M Impressions', desc: 'Regional/growing audience' },
                  { id: 'viral', label: '1M - 5M Impressions', desc: 'Viral potential, major reach' },
                  { id: 'massive', label: '5M+ Impressions', desc: 'Massive scale, market domination' },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleReachSelect(option.id)}
                    className="w-full p-6 bg-white/5 border border-white/10 rounded hover:border-yellow-500 hover:bg-yellow-500/5 transition-all text-left group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-bold text-lg">{option.label}</p>
                        <p className="text-white/60 text-sm">{option.desc}</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-white/40 group-hover:text-yellow-500 transition-colors" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'result' && recommendedTier && (
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border border-yellow-500/30 p-12 rounded-lg">
                <p className="text-yellow-500 font-bold text-sm uppercase tracking-wider mb-4">Perfect Match</p>
                <h2 className="text-4xl font-black text-white mb-4">{recommendedTier.name}</h2>
                <p className="text-white/70 text-lg mb-8">{recommendedTier.description}</p>

                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div>
                    <p className="text-white/60 text-sm uppercase tracking-wider mb-2">Price</p>
                    <p className="text-3xl font-black gradient-text">${recommendedTier.price.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm uppercase tracking-wider mb-2">Creators</p>
                    <p className="text-3xl font-black text-white">{recommendedTier.creators}+</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm uppercase tracking-wider mb-2">Reach</p>
                    <p className="text-3xl font-black text-white">{recommendedTier.reach}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  {recommendedTier.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <Check className="h-5 w-5 text-yellow-500" />
                      <span className="text-white">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link href="/pricing">
                  <Button className="w-full gold-gradient text-black font-bold py-6 text-lg tracking-wider uppercase hover:shadow-2xl hover:shadow-yellow-500/50 transition-all">
                    Book {recommendedTier.name}
                  </Button>
                </Link>
              </div>

              <div className="text-center">
                <p className="text-white/60 mb-4">Want to explore other options?</p>
                <button
                  onClick={resetQuiz}
                  className="text-yellow-500 hover:text-yellow-400 font-bold transition-colors"
                >
                  Start Over
                </button>
                <span className="text-white/40 mx-4">•</span>
                <Link href="/pricing" className="text-yellow-500 hover:text-yellow-400 font-bold transition-colors">
                  View All Packages
                </Link>
              </div>
            </div>
          )}
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
