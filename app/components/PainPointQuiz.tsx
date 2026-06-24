'use client';

import { useState } from 'react';
import { ChevronRight, Check, Zap, Target, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type QuizStep = 'type' | 'painpoints' | 'budget' | 'result';

interface PainPoint {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
}

interface RecommendedPackage {
  name: string;
  price: number;
  influencers: number;
  reach: string;
  description: string;
  tagline: string;
}

const brandPainPoints: PainPoint[] = [
  { 
    id: 'reach', 
    label: 'Algorithm Blindness', 
    description: 'Your content disappears. Organic reach is dead.',
    icon: <Zap className="h-5 w-5" />
  },
  { 
    id: 'trust', 
    label: 'Credibility Gap', 
    description: 'Audiences trust influencers 10x more than brands.',
    icon: <Users className="h-5 w-5" />
  },
  { 
    id: 'targeting', 
    label: 'Ad Fatigue', 
    description: 'Paid ads cost more, deliver less every quarter.',
    icon: <Target className="h-5 w-5" />
  },
  { 
    id: 'speed', 
    label: 'Trend Lag', 
    description: 'By the time you launch, the moment is gone.',
    icon: <TrendingUp className="h-5 w-5" />
  },
];

const musicPainPoints: PainPoint[] = [
  { 
    id: 'streams', 
    label: 'Playlist Gatekeeping', 
    description: 'Spotify algorithms control your destiny.',
    icon: <Zap className="h-5 w-5" />
  },
  { 
    id: 'followers', 
    label: 'Growth Ceiling', 
    description: 'Organic growth takes years you don\'t have.',
    icon: <TrendingUp className="h-5 w-5" />
  },
  { 
    id: 'budget', 
    label: 'Label Economics', 
    description: 'Can\'t compete with $500K label budgets.',
    icon: <Target className="h-5 w-5" />
  },
  { 
    id: 'quality', 
    label: 'Production Gap', 
    description: 'Your music deserves better visuals.',
    icon: <Users className="h-5 w-5" />
  },
];

const packagesByBudget: Record<string, RecommendedPackage> = {
  'under500': {
    name: 'Starter Package',
    price: 250,
    influencers: 1,
    reach: '100K',
    description: 'Perfect for testing influencer marketing',
    tagline: 'Test the waters',
  },
  '500-1500': {
    name: 'Growth Package',
    price: 500,
    influencers: 1,
    reach: '200K',
    description: 'Scale your brand presence',
    tagline: 'Solid growth',
  },
  '1500-3000': {
    name: 'Trio Campaign',
    price: 1500,
    influencers: 3,
    reach: '300K',
    description: '3 verified influencers coordinated launch',
    tagline: 'Multi-influencer power',
  },
  '3000-6000': {
    name: 'Squad Campaign',
    price: 2750,
    influencers: 5,
    reach: '500K',
    description: '5 verified influencers coordinated launch',
    tagline: 'Serious reach',
  },
  '6000-15000': {
    name: 'Viral Network',
    price: 5999,
    influencers: 10,
    reach: '1M',
    description: '10 influencers synchronized launch',
    tagline: 'Viral potential',
  },
  'over15000': {
    name: 'Mega Campaign',
    price: 12999,
    influencers: 20,
    reach: '2M',
    description: '20 influencers enterprise-level campaign',
    tagline: 'Enterprise scale',
  },
};

export default function PainPointQuiz() {
  const [step, setStep] = useState<QuizStep>('type');
  const [userType, setUserType] = useState<'brand' | 'musician' | null>(null);
  const [selectedPainPoints, setSelectedPainPoints] = useState<string[]>([]);
  const [budget, setBudget] = useState<string>('');
  const [recommendedPackage, setRecommendedPackage] = useState<RecommendedPackage | null>(null);

  const painPoints = userType === 'brand' ? brandPainPoints : musicPainPoints;

  const handlePainPointToggle = (id: string) => {
    setSelectedPainPoints((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleBudgetSelect = (budgetRange: string) => {
    setBudget(budgetRange);
    const pkg = packagesByBudget[budgetRange];
    setRecommendedPackage(pkg);
    setStep('result');
  };

  const resetQuiz = () => {
    setStep('type');
    setUserType(null);
    setSelectedPainPoints([]);
    setBudget('');
    setRecommendedPackage(null);
  };

  return (
    <div className="w-full">
      {step === 'type' && (
        <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/10 p-8 md:p-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#c9a96e]/5 blur-3xl"></div>
          <div className="relative">
            <h3 className="text-3xl md:text-4xl font-black text-white mb-2">Who are you?</h3>
            <p className="text-white/60 mb-10 text-lg">We'll match you with the perfect strategy</p>

            <div className="space-y-4">
              <button
                onClick={() => {
                  setUserType('brand');
                  setStep('painpoints');
                }}
                className="w-full p-8 bg-white/5 border border-white/10 hover:border-[#c9a96e] hover:bg-[#c9a96e]/5 transition-all text-left group backdrop-blur-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-black text-xl mb-1">Brand or Business</p>
                    <p className="text-white/60">Scale your reach. Build your audience.</p>
                  </div>
                  <ChevronRight className="h-6 w-6 text-white/40 group-hover:text-[#c9a96e] transition-all group-hover:translate-x-1" />
                </div>
              </button>

              <button
                onClick={() => {
                  setUserType('musician');
                  setStep('painpoints');
                }}
                className="w-full p-8 bg-white/5 border border-white/10 hover:border-[#c9a96e] hover:bg-[#c9a96e]/5 transition-all text-left group backdrop-blur-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-black text-xl mb-1">Musician or Artist</p>
                    <p className="text-white/60">Promote your music. Go viral. Get streams.</p>
                  </div>
                  <ChevronRight className="h-6 w-6 text-white/40 group-hover:text-[#c9a96e] transition-all group-hover:translate-x-1" />
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 'painpoints' && (
        <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/10 p-8 md:p-12 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-40 h-40 bg-[#c9a96e]/5 blur-3xl"></div>
          <div className="relative">
            <h3 className="text-3xl md:text-4xl font-black text-white mb-2">What's holding you back?</h3>
            <p className="text-white/60 mb-10 text-lg">Select your pain points (choose multiple)</p>

            <div className="space-y-3 mb-10">
              {painPoints.map((point) => (
                <button
                  key={point.id}
                  onClick={() => handlePainPointToggle(point.id)}
                  className={`w-full p-5 border transition-all text-left flex items-start space-x-4 backdrop-blur-sm ${
                    selectedPainPoints.includes(point.id)
                      ? 'bg-[#c9a96e]/15 border-[#c9a96e] shadow-lg shadow-[#c9a96e]/20'
                      : 'bg-white/5 border-white/10 hover:border-[#c9a96e]/50 hover:bg-white/8'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-md border flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                      selectedPainPoints.includes(point.id)
                        ? 'bg-[#c9a96e] border-[#c9a96e]'
                        : 'border-white/30'
                    }`}
                  >
                    {selectedPainPoints.includes(point.id) && (
                      <Check className="h-4 w-4 text-black" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-[#c9a96e]">{point.icon}</span>
                      <p className="text-white font-bold text-lg">{point.label}</p>
                    </div>
                    <p className="text-white/60 text-sm">{point.description}</p>
                  </div>
                </button>
              ))}
            </div>

            <Button
              onClick={() => setStep('budget')}
              disabled={selectedPainPoints.length === 0}
              className="w-full gold-gradient text-black font-bold py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Continue <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      )}

      {step === 'budget' && (
        <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/10 p-8 md:p-12 overflow-hidden relative">
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#c9a96e]/5 blur-3xl"></div>
          <div className="relative">
            <h3 className="text-3xl md:text-4xl font-black text-white mb-2">What's your investment?</h3>
            <p className="text-white/60 mb-10 text-lg">Select your budget range</p>

            <div className="space-y-3">
              {[
                { range: 'under500', label: 'Under $500', desc: 'Test the waters' },
                { range: '500-1500', label: '$500 - $1,500', desc: 'Solid growth' },
                { range: '1500-3000', label: '$1,500 - $3,000', desc: 'Multi-influencer power' },
                { range: '3000-6000', label: '$3,000 - $6,000', desc: 'Serious reach' },
                { range: '6000-15000', label: '$6,000 - $15,000', desc: 'Viral potential' },
                { range: 'over15000', label: '$15,000+', desc: 'Enterprise domination' },
              ].map((option) => (
                <button
                  key={option.range}
                  onClick={() => handleBudgetSelect(option.range)}
                  className="w-full p-5 bg-white/5 border border-white/10 hover:border-[#c9a96e] hover:bg-[#c9a96e]/5 transition-all text-left backdrop-blur-sm group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-bold text-lg">{option.label}</p>
                      <p className="text-white/60 text-sm">{option.desc}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-white/40 group-hover:text-[#c9a96e] transition-all group-hover:translate-x-1" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {step === 'result' && recommendedPackage && (
        <div className="bg-gradient-to-br from-[#c9a96e]/20 via-[#c9a96e]/10 to-black border border-[#c9a96e]/40 p-8 md:p-12 overflow-hidden relative shadow-2xl shadow-[#c9a96e]/20">
          <div className="absolute top-0 right-0 w-60 h-60 bg-[#c9a96e]/10 rounded-full blur-3xl"></div>
          <div className="relative">
            <div className="inline-block mb-6">
              <p className="text-[#c9a96e] font-black text-sm uppercase tracking-widest px-4 py-2 bg-[#c9a96e]/20 border border-[#c9a96e]/50">
                ✨ Your Perfect Match
              </p>
            </div>
            
            <h3 className="text-4xl md:text-5xl font-black text-white mb-3">{recommendedPackage.name}</h3>
            <p className="text-white/80 text-xl mb-10 leading-relaxed">{recommendedPackage.description}</p>

            <div className="grid grid-cols-3 gap-6 mb-12 py-8 border-y border-white/10">
              <div>
                <p className="text-white/60 text-xs uppercase tracking-widest font-bold mb-3">Investment</p>
                <p className="text-4xl font-black gradient-text">${recommendedPackage.price.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-white/60 text-xs uppercase tracking-widest font-bold mb-3">Influencers</p>
                <p className="text-4xl font-black text-white">{recommendedPackage.influencers}+</p>
              </div>
              <div>
                <p className="text-white/60 text-xs uppercase tracking-widest font-bold mb-3">Reach</p>
                <p className="text-4xl font-black text-white">{recommendedPackage.reach}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/pricing" className="flex-1">
                <Button className="w-full gold-gradient text-black font-black py-4 text-lg tracking-wider uppercase hover:shadow-2xl hover:shadow-[#c9a96e]/50 transition-all">
                  Book This Package
                </Button>
              </Link>
              <button
                onClick={resetQuiz}
                className="flex-1 px-6 py-4 bg-white/10 border-2 border-white/30 text-white font-bold hover:bg-white/20 hover:border-white/50 transition-all text-lg"
              >
                Explore Other Options
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
