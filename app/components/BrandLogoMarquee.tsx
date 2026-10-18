'use client';

import { useState } from 'react';
import { verifiedPartners } from '@/data/partners';

interface BrandLogoMarqueeProps {
  brands: string[];
  speed?: number;
  className?: string;
}

export default function BrandLogoMarquee({ brands, speed = 30, className = '' }: BrandLogoMarqueeProps) {
  const [isPaused, setIsPaused] = useState(false);
  const allowed = new Set(verifiedPartners.map((partner) => partner.name.toLowerCase()));
  const shown = brands.filter((brand) => allowed.has(brand.toLowerCase()));
  if (shown.length === 0) return null;

  const displayBrands = [...shown, ...shown, ...shown];

  return (
    <div className={`relative overflow-hidden w-full max-w-full ${className}`}>
      {/* Gold gradient fade on edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#080808] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#080808] to-transparent z-10" />

      {/* Marquee container */}
      <div 
        className="flex items-center gap-6 py-8"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div 
          className="flex items-center gap-6 animate-marquee"
          style={{
            animationDuration: `${speed}s`,
            animationPlayState: isPaused ? 'paused' : 'running',
          }}
        >
          {displayBrands.map((brand, index) => (
            <div
              key={`${brand}-${index}`}
              className="flex-shrink-0 px-4 py-3 bg-white/[0.02] border border-white/[0.08] rounded-lg hover:border-[#c9a96e]/30 hover:bg-white/[0.04] transition-all duration-300 group"
            >
              <span className="text-white/70 text-sm font-medium tracking-wide group-hover:text-[#c9a96e] transition-colors">
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
        .animate-marquee {
          animation: marquee linear infinite;
        }
      `}</style>
    </div>
  );
}
