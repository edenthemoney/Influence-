import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, Users, Star, Camera, Clock, Palette } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Hire Models for Photoshoot | Professional Photo & Fashion Models | Miami',
  description: 'Book professional models for your photoshoot in South Florida. Fashion, product, lifestyle, editorial, and brand photography. From $300. Same-week availability.',
  keywords: 'hire models for photoshoot, photoshoot models miami, models for photography, fashion models for hire, product photoshoot models, book model for shoot',
  openGraph: {
    title: 'Hire Models for Photoshoot | Professional Photo & Fashion Models',
    description: 'Professional models for fashion, product, lifestyle, and editorial photoshoots. From $300. South Florida.',
    url: 'https://influencemodels.agency/models-for-photoshoot',
  },
};

const gold = '#c9a96e';

export default function ModelsForPhotoshoot() {
  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <div className="max-w-4xl mx-auto px-6 py-24">
        <div className="mb-4">
          <span className="text-[10px] tracking-[0.3em] uppercase font-bold" style={{ color: gold }}>In-Person · South Florida</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Hire Models for<br />Your <span style={{ color: gold }}>Photoshoot</span>
        </h1>
        <p className="text-white/50 text-lg mb-12 max-w-2xl">
          Need professional models for your next photoshoot? We provide camera-ready, styled talent for fashion shoots, product photography, lifestyle campaigns, editorial content, lookbooks, and brand imagery. Book online — models confirmed same week.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="border border-white/[0.06] p-6">
            <Camera className="w-5 h-5 mb-3" style={{ color: gold }} />
            <h3 className="font-bold text-white mb-1">Camera-Ready</h3>
            <p className="text-white/40 text-sm">Models arrive styled, prepared, and ready to shoot</p>
          </div>
          <div className="border border-white/[0.06] p-6">
            <Star className="w-5 h-5 mb-3" style={{ color: gold }} />
            <h3 className="font-bold text-white mb-1">Pro Experience</h3>
            <p className="text-white/40 text-sm">Talent with editorial, commercial, and fashion credits</p>
          </div>
          <div className="border border-white/[0.06] p-6">
            <Clock className="w-5 h-5 mb-3" style={{ color: gold }} />
            <h3 className="font-bold text-white mb-1">Same-Week Booking</h3>
            <p className="text-white/40 text-sm">Need models fast? Most shoots booked within 48 hours</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">Photoshoot Types We Cover</h2>
        <div className="space-y-4 mb-16">
          {[
            { title: 'Fashion & Lookbook Shoots', desc: 'Models for clothing brands, streetwear labels, and fashion designers. Multiple looks and wardrobe changes.' },
            { title: 'Product Photography', desc: 'Models holding, wearing, or demonstrating your product for e-commerce, ads, and social media imagery.' },
            { title: 'Lifestyle & Brand Imagery', desc: 'Natural, candid-style shots of models using your product or service in real-world settings.' },
            { title: 'Editorial & Magazine', desc: 'High-fashion and creative editorial photography for publications, portfolios, and campaigns.' },
            { title: 'Headshots & Portraits', desc: 'Professional headshots, beauty shots, and portrait photography with stunning models.' },
            { title: 'E-commerce & Catalog', desc: 'Clean, consistent product-on-model photography for your online store or catalog.' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 border border-white/[0.06] p-5">
              <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: gold }} />
              <div>
                <h3 className="font-bold text-white text-sm">{item.title}</h3>
                <p className="text-white/40 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-6">Photoshoot Pricing</h2>
        <div className="grid md:grid-cols-4 gap-0 border border-white/[0.06] mb-6">
          {[
            { name: 'Solo', price: '$300', desc: '1 model · 4hr' },
            { name: 'Duo', price: '$450', desc: '2 models · 4hr' },
            { name: 'Trio', price: '$650', desc: '3 models · 4hr', highlight: true },
            { name: 'Full Day', price: '$500+', desc: '1 model · 6–8hr' },
          ].map((pkg, i) => (
            <div key={i} className={`p-6 text-center ${pkg.highlight ? 'bg-[#c9a96e]/[0.04]' : ''} ${i > 0 ? 'border-l border-white/[0.06]' : ''}`}>
              <p className="text-white/30 text-[9px] tracking-widest uppercase mb-1">{pkg.name}</p>
              <p className="text-2xl font-bold mb-1" style={{ color: gold }}>{pkg.price}</p>
              <p className="text-white/40 text-xs">{pkg.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-white/20 text-xs mb-16">Need 5–50+ models? Volume packages available. Add a photographer/videographer from $300. Monthly retainers for recurring shoots.</p>

        <div className="border border-white/[0.06] p-10 text-center">
          <h2 className="text-2xl font-bold mb-3">Book Photoshoot Models</h2>
          <p className="text-white/40 mb-6">Choose your package, pick your models, and checkout in under 2 minutes. No agency calls needed.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/model-booking?service=shoot" className="px-8 py-4 text-[11px] font-bold tracking-widest uppercase hover:opacity-90 transition-all text-center" style={{ backgroundColor: gold, color: '#000' }}>
              Book Shoot Models
            </Link>
            <Link href="/marketplace" className="px-8 py-4 text-[11px] font-bold tracking-widest uppercase border border-white/10 hover:border-[#c9a96e]/50 transition-all text-center text-white/70 hover:text-white">
              Browse Models
            </Link>
          </div>
        </div>

        <div className="mt-16 text-white/20 text-sm leading-relaxed">
          <h3 className="text-white/40 font-bold mb-2">Serving All of South Florida</h3>
          <p>Influence Models Agency provides professional photoshoot models across Miami, Fort Lauderdale, Boca Raton, West Palm Beach, Hollywood, and all of South Florida. Our models are available for studio shoots, on-location sessions, and will travel for the right projects. Same-week availability for most bookings.</p>
        </div>
      </div>
    </div>
  );
}
