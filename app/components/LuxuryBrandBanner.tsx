'use client';

import { Crown, Sparkles } from 'lucide-react';

interface LuxuryBrandBannerProps {
  brands: string[];
  className?: string;
}

export default function LuxuryBrandBanner({ brands, className = '' }: LuxuryBrandBannerProps) {
  if (!brands || brands.length === 0) return null;

  return (
    <div className={`relative ${className}`}>
      {/* Gold gradient background */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          background: 'linear-gradient(135deg, #c9a96e 0%, #f4e4bc 50%, #c9a96e 100%)',
        }}
      />
      
      <div className="relative border border-[#c9a96e]/30 bg-black/50 backdrop-blur-sm rounded-lg p-6">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <Crown className="w-5 h-5 text-[#c9a96e]" />
          <h3 className="text-sm font-bold tracking-widest uppercase text-[#c9a96e]">
            Luxury Brand Partnerships
          </h3>
          <Sparkles className="w-4 h-4 text-[#c9a96e]/70" />
        </div>
        
        {/* Brand Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {brands.map((brand, index) => (
            <div 
              key={`${brand}-${index}`}
              className="flex items-center justify-center px-4 py-3 bg-white/5 border border-white/10 rounded-md hover:border-[#c9a96e]/50 transition-colors"
            >
              <span className="text-xs md:text-sm font-medium text-white/90 text-center">
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
