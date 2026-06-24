'use client';

import { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookingButton } from '@/components/BookingButton';

type UserType = 'brand' | 'artist' | null;
type Tier = 'starter' | 'pro' | 'enterprise';

interface Package {
  tier: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
  userType: 'brand' | 'artist' | 'both';
  tier_level: 'starter' | 'pro' | 'enterprise';
  reach: string;
}

const allPackages: Package[] = [
  {
    tier: 'SAMPLE',
    name: 'Single Reel',
    price: 300,
    description: '1x 30-second premium reel',
    features: ['1 Influencer', '30-second reel', '50K+ reach', '3-day turnaround'],
    userType: 'both',
    tier_level: 'starter',
    reach: '50K',
  },
  {
    tier: 'STARTER',
    name: 'Dual Reel',
    price: 500,
    description: '2x 30-second reels (IG + TikTok)',
    features: ['1 Influencer', '2x 30-second reels', '100K+ reach', '3-day turnaround'],
    popular: true,
    userType: 'both',
    tier_level: 'starter',
    reach: '100K',
  },
  {
    tier: 'GROWTH',
    name: 'Content Pack',
    price: 1000,
    description: '4x 30-second reels multi-platform',
    features: ['1 Influencer', '4x 30-second reels', '200K+ reach', '5-day turnaround'],
    userType: 'both',
    tier_level: 'starter',
    reach: '200K',
  },
  {
    tier: 'PRO',
    name: 'Brand Deal',
    price: 1500,
    description: '6x 30-second premium reels',
    features: ['1 Influencer', '6x premium reels', '300K+ reach', '7-day turnaround'],
    popular: true,
    userType: 'both',
    tier_level: 'pro',
    reach: '300K',
  },
  {
    tier: 'TRIO',
    name: 'Trio Campaign',
    price: 2250,
    description: '3 verified influencers coordinated campaign',
    features: ['3 Influencers', '2x reels each (6 total)', '300K+ reach', '5-day turnaround'],
    userType: 'brand',
    tier_level: 'pro',
    reach: '300K',
  },
  {
    tier: 'SQUAD',
    name: 'Squad Campaign',
    price: 3500,
    description: '5 verified influencers coordinated launch',
    features: ['5 Influencers', '2x reels each (10 total)', '500K+ reach', '5-day turnaround'],
    userType: 'brand',
    tier_level: 'pro',
    reach: '500K',
  },
  {
    tier: 'VIRAL_NETWORK',
    name: 'Viral Launch',
    price: 8500,
    description: '10 influencers synchronized launch',
    features: ['10 Influencers', '2x reels each (20 total)', '1M+ reach', '7-day turnaround', 'Dedicated manager'],
    popular: true,
    userType: 'brand',
    tier_level: 'pro',
    reach: '1M',
  },
  {
    tier: 'MEGA',
    name: 'Feed Takeover',
    price: 15000,
    description: '20 influencers dominating feeds',
    features: ['20 Influencers', '2x reels each (40 total)', '2M+ reach', '10-day turnaround', 'Full team support'],
    userType: 'brand',
    tier_level: 'enterprise',
    reach: '2M',
  },
  {
    tier: 'DOMINATION',
    name: 'Agency Campaign',
    price: 35000,
    description: '50 influencers full agency management',
    features: ['50 Influencers', '2x reels each (100 total)', '5M+ reach', '14-day turnaround', 'Premium support'],
    userType: 'brand',
    tier_level: 'enterprise',
    reach: '5M',
  },
  {
    tier: 'ENTERPRISE',
    name: 'Enterprise',
    price: 65000,
    description: '100+ verified influencers — 10M+ reach',
    features: ['100+ Influencers', '2x reels each (200+ total)', '10M+ reach', 'Custom timeline', 'White-glove service'],
    userType: 'brand',
    tier_level: 'enterprise',
    reach: '10M',
  },
];

export default function PricingFilter() {
  const [userType, setUserType] = useState<UserType>(null);
  const [selectedTier, setSelectedTier] = useState<Tier | null>(null);

  const filteredPackages = allPackages.filter((pkg) => {
    if (!userType) return false;
    if (pkg.userType !== 'both' && pkg.userType !== userType) return false;
    if (selectedTier && pkg.tier_level !== selectedTier) return false;
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Type Selection */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => {
            setUserType('brand');
            setSelectedTier(null);
          }}
          className={`px-8 py-4 font-bold tracking-wider uppercase transition-all ${
            userType === 'brand'
              ? 'gold-gradient text-black shadow-lg shadow-[#c9a96e]/30'
              : 'bg-white/10 border border-white/20 text-white hover:border-[#c9a96e]'
          }`}
        >
          🏢 Brand / Business
        </button>
        <button
          onClick={() => {
            setUserType('artist');
            setSelectedTier(null);
          }}
          className={`px-8 py-4 font-bold tracking-wider uppercase transition-all ${
            userType === 'artist'
              ? 'gold-gradient text-black shadow-lg shadow-[#c9a96e]/30'
              : 'bg-white/10 border border-white/20 text-white hover:border-[#c9a96e]'
          }`}
        >
          🎤 Artist / Musician
        </button>
      </div>

      {/* Tier Selection (only show if user type selected) */}
      {userType && (
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => setSelectedTier('starter')}
            className={`px-6 py-3 font-bold text-sm tracking-wider uppercase transition-all ${
              selectedTier === 'starter'
                ? 'bg-[#c9a96e] text-black'
                : 'bg-white/10 border border-white/20 text-white hover:border-[#c9a96e]'
            }`}
          >
            Starter
          </button>
          <button
            onClick={() => setSelectedTier('pro')}
            className={`px-6 py-3 font-bold text-sm tracking-wider uppercase transition-all ${
              selectedTier === 'pro'
                ? 'bg-[#c9a96e] text-black'
                : 'bg-white/10 border border-white/20 text-white hover:border-[#c9a96e]'
            }`}
          >
            Pro
          </button>
          <button
            onClick={() => setSelectedTier('enterprise')}
            className={`px-6 py-3 font-bold text-sm tracking-wider uppercase transition-all ${
              selectedTier === 'enterprise'
                ? 'bg-[#c9a96e] text-black'
                : 'bg-white/10 border border-white/20 text-white hover:border-[#c9a96e]'
            }`}
          >
            Enterprise
          </button>
          <button
            onClick={() => setSelectedTier(null)}
            className="px-6 py-3 font-bold text-sm tracking-wider uppercase bg-white/10 border border-white/20 text-white hover:border-[#c9a96e]"
          >
            View All
          </button>
        </div>
      )}

      {/* Packages Grid */}
      {userType && filteredPackages.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredPackages.map((pkg) => (
            <Card
              key={pkg.tier}
              className={`relative bg-zinc-900 border hover-lift transition-all overflow-hidden ${
                pkg.popular ? 'border-[#c9a96e] border-2 shadow-xl shadow-[#c9a96e]/20' : 'border-white/10 hover:border-white/20'
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
                <div className="mt-2 inline-block px-2 py-1 bg-[#c9a96e]/10 border border-[#c9a96e]/30 rounded text-xs text-[#c9a96e] font-semibold">
                  {pkg.reach} Reach
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
      )}

      {/* Empty State */}
      {userType && filteredPackages.length === 0 && (
        <div className="text-center py-12">
          <p className="text-white/60 text-lg">No packages match your selection. Try adjusting your filters.</p>
        </div>
      )}

      {/* Initial State */}
      {!userType && (
        <div className="text-center py-12">
          <p className="text-white/60 text-lg">Select your type above to see available packages</p>
        </div>
      )}
    </div>
  );
}
