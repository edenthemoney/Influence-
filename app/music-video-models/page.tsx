import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, Film, Star, Eye } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Music Video Models for Hire | Miami | Influence Models Agency',
  description: 'Book professional music video models in Miami. Our talent has appeared in videos for Sean Paul, Trippie Redd, Kodak Black, French Montana & more. 17M+ combined views.',
  keywords: 'music video models, music video girls, hire models for music video, music video models Miami, video vixens Miami',
  openGraph: {
    title: 'Music Video Models for Hire | Influence Models Agency',
    description: 'Professional music video models with credits including Sean Paul, Trippie Redd, Kodak Black. Starting at $100.',
    url: 'https://influencemodels.agency/music-video-models',
  },
};

const gold = '#c9a96e';

export default function MusicVideoModels() {
  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <div className="max-w-4xl mx-auto px-6 py-24">
        <div className="mb-4">
          <span className="text-[10px] tracking-[0.3em] uppercase font-bold" style={{ color: gold }}>Music Video Talent</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Music Video<br /><span style={{ color: gold }}>Models for Hire</span>
        </h1>
        <p className="text-white/50 text-lg mb-12 max-w-2xl">
          Professional models who've been leads in videos with 17M+ views. From Trippie Redd to Sean Paul — our talent knows how to perform on camera and elevate your visual.
        </p>

        <h2 className="text-2xl font-bold mb-6">Featured Music Video Credits</h2>
        <div className="grid md:grid-cols-2 gap-4 mb-16">
          {[
            { artist: 'Sean Paul', model: 'Deseray Marie', type: 'Official Music Video' },
            { artist: 'Trippie Redd', model: 'Ty Nadia', type: '"Stay The Same" — Lead Model' },
            { artist: 'Kodak Black', model: 'Ty Nadia', type: 'Official Music Video — Lead' },
            { artist: 'Bryson Tiller', model: 'Deseray Marie', type: 'Official Music Video' },
            { artist: 'French Montana', model: 'Ty Nadia', type: 'Official Music Video' },
            { artist: 'DaBaby', model: 'Deseray Marie', type: 'Official Music Video' },
            { artist: 'Sexyy Red', model: 'Ty Nadia', type: 'Official Music Video' },
            { artist: 'Akon', model: 'Deseray Marie', type: 'Music Video / Collaboration' },
            { artist: 'Chicken P', model: 'Ty Nadia', type: 'Music Video — 17M+ Views' },
            { artist: 'Young Thug', model: 'Deseray Marie', type: 'Music Video / Collaboration' },
          ].map((credit, i) => (
            <div key={i} className="flex items-start gap-3 border border-white/[0.06] p-4">
              <Film className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: gold }} />
              <div>
                <p className="font-bold text-white text-sm">{credit.artist}</p>
                <p className="text-white/30 text-xs">{credit.type} — {credit.model}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-6">Why Choose Our Models</h2>
        <div className="space-y-3 mb-16">
          {[
            'Professional on-camera experience — not first-timers',
            'Credits with major label artists (Atlantic, Republic, Interscope)',
            'Comfortable with long shoot days, multiple setups, and direction changes',
            'Available for same-week bookings in Miami/South Florida',
            'Content rights included — use footage across all platforms',
            'Behind-the-scenes social media coverage included with Pro packages',
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <Check className="w-4 h-4 flex-shrink-0" style={{ color: gold }} />
              <p className="text-white/50 text-sm">{item}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-6">Packages for Artists</h2>
        <div className="space-y-4 mb-16">
          {[
            { name: 'Sample', price: '$100', desc: '1 model, 1 scene/reel. Perfect for a teaser or social clip.', best: 'Emerging artists' },
            { name: 'Starter', price: '$300', desc: '1 model, 2 scenes. Full music video with featured model.', best: 'Independent artists' },
            { name: 'Growth', price: '$500', desc: '1 model, 4 scenes. Multiple looks, outfits, and setups.', best: 'Serious releases', highlight: true },
            { name: 'Pro', price: '$850', desc: '1 model, 6 premium scenes. Full treatment with BTS content.', best: 'Label-quality visuals' },
          ].map((pkg, i) => (
            <div key={i} className={`border p-6 flex items-center justify-between ${pkg.highlight ? 'border-[#c9a96e]/30 bg-[#c9a96e]/[0.04]' : 'border-white/[0.06]'}`}>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-bold text-white">{pkg.name}</h3>
                  {pkg.highlight && <span className="px-2 py-0.5 text-[8px] font-bold tracking-widest uppercase" style={{ backgroundColor: gold, color: '#000' }}>Popular</span>}
                </div>
                <p className="text-white/40 text-sm">{pkg.desc}</p>
                <p className="text-white/20 text-xs mt-1">Best for: {pkg.best}</p>
              </div>
              <p className="text-2xl font-bold flex-shrink-0 ml-6" style={{ color: gold }}>{pkg.price}</p>
            </div>
          ))}
        </div>

        <div className="border border-white/[0.06] p-10 text-center">
          <h2 className="text-2xl font-bold mb-3">Book a Music Video Model</h2>
          <p className="text-white/40 mb-6">Same-week availability. Professional talent. Starting at $100.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/marketplace" className="px-8 py-4 text-[11px] font-bold tracking-widest uppercase hover:opacity-90 transition-all text-center" style={{ backgroundColor: gold, color: '#000' }}>
              Browse Models
            </Link>
            <Link href="/book" className="px-8 py-4 text-[11px] font-bold tracking-widest uppercase border border-white/10 hover:border-[#c9a96e]/50 transition-all text-center text-white/70 hover:text-white">
              Book Now
            </Link>
          </div>
        </div>

        <div className="mt-16 text-white/20 text-sm leading-relaxed">
          <h3 className="text-white/40 font-bold mb-2">Music Video Models Across Florida</h3>
          <p>Our music video models are based in Miami, Hollywood, Fort Lauderdale, and Orlando. Available for shoots throughout Florida and willing to travel nationally for the right project. All models have professional music video experience and are comfortable with full-day shoots, choreography, and creative direction.</p>
        </div>
      </div>
    </div>
  );
}
