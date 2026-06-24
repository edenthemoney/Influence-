import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, Users, Star, MapPin, Camera, Sparkles, Film, Play } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Book Models in Miami | Hire a Model for Any Project | Influence Agency',
  description: 'Book professional models in Miami for music videos, photoshoots, events, commercials, UGC, and brand campaigns. From $150. Same-week availability across South Florida.',
  keywords: 'book models miami, hire models miami, models for hire miami, hire a model, book a model, miami models, book model south florida',
  openGraph: {
    title: 'Book Models in Miami | Hire a Model for Any Project',
    description: 'Professional models for music videos, photoshoots, events, commercials & more. From $150. Miami & South Florida.',
    url: 'https://influencemodels.agency/book-models-miami',
  },
};

const gold = '#c9a96e';

export default function BookModelsMiami() {
  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <div className="max-w-4xl mx-auto px-6 py-24">
        <div className="mb-4">
          <span className="text-[10px] tracking-[0.3em] uppercase font-bold" style={{ color: gold }}>Miami Model Booking Agency</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Book Models in<br /><span style={{ color: gold }}>Miami</span>
        </h1>
        <p className="text-white/50 text-lg mb-12 max-w-2xl">
          Hire professional models in Miami and South Florida for any project — music videos, brand shoots, photoshoots, events, commercials, UGC content, and more. No agency calls. No back-and-forth. Book online and get talent confirmed same week.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="border border-white/[0.06] p-6">
            <Users className="w-5 h-5 mb-3" style={{ color: gold }} />
            <h3 className="font-bold text-white mb-1">15+ Active Models</h3>
            <p className="text-white/40 text-sm">Curated roster of professional South Florida talent</p>
          </div>
          <div className="border border-white/[0.06] p-6">
            <Star className="w-5 h-5 mb-3" style={{ color: gold }} />
            <h3 className="font-bold text-white mb-1">Celebrity Credits</h3>
            <p className="text-white/40 text-sm">Sean Paul, Kai Cenat, DaBaby, Moneybagg Yo, Lil Pump & more</p>
          </div>
          <div className="border border-white/[0.06] p-6">
            <MapPin className="w-5 h-5 mb-3" style={{ color: gold }} />
            <h3 className="font-bold text-white mb-1">South Florida</h3>
            <p className="text-white/40 text-sm">Miami, Boca Raton, Fort Lauderdale, West Palm & beyond</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">Every Type of Booking</h2>
        <div className="space-y-4 mb-16">
          {[
            { icon: Camera, title: 'Shoots & Music Videos', desc: 'Models for your video production, brand campaign, fashion editorial, or creative shoot.', link: '/services/shoots' },
            { icon: Film, title: 'Commercials & Acting', desc: 'Models with script reading, dialogue, and acting ability for TV spots, web ads, and brand commercials.', link: '/services/commercials' },
            { icon: Sparkles, title: 'Events & Parties', desc: 'Promo girls and event models for club nights, brand activations, grand openings, and private events.', link: '/services/events' },
            { icon: Play, title: 'UGC & Social Content', desc: 'Models create branded reels, skits, and short-form content for your social media. Delivered remotely.', link: '/services/content' },
            { icon: Star, title: 'Music Reactions', desc: 'Models react to your music on camera — authentic promotional content for artists and labels.', link: '/services/content' },
            { icon: MapPin, title: 'Business Visits', desc: 'A model comes to your restaurant, salon, or store and creates promo content on-site.', link: '/services/business' },
          ].map((item, i) => (
            <Link key={i} href={item.link} className="flex items-start gap-3 border border-white/[0.06] p-5 hover:border-[#c9a96e]/30 transition-all group">
              <item.icon className="w-4 h-4 mt-0.5 flex-shrink-0 text-white/30 group-hover:text-[#c9a96e] transition-colors" />
              <div>
                <h3 className="font-bold text-white text-sm">{item.title}</h3>
                <p className="text-white/40 text-sm">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="border border-white/[0.06] p-10 text-center">
          <h2 className="text-2xl font-bold mb-3">Ready to Book?</h2>
          <p className="text-white/40 mb-6">Pick your service, get a custom quote, and checkout in under 2 minutes. Same-week availability.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/start" className="px-8 py-4 text-[11px] font-bold tracking-widest uppercase hover:opacity-90 transition-all text-center" style={{ backgroundColor: gold, color: '#000' }}>
              Find Your Service
            </Link>
            <Link href="/marketplace" className="px-8 py-4 text-[11px] font-bold tracking-widest uppercase border border-white/10 hover:border-[#c9a96e]/50 transition-all text-center text-white/70 hover:text-white">
              Browse Models
            </Link>
          </div>
        </div>

        <div className="mt-16 text-white/20 text-sm leading-relaxed">
          <h3 className="text-white/40 font-bold mb-2">Serving All of South Florida</h3>
          <p>Influence Models Agency is the fastest way to book professional models in Miami, Fort Lauderdale, Boca Raton, West Palm Beach, Hollywood, and all of South Florida. Whether you need a model for a music video, a photoshoot, a commercial, or an event — we handle casting, coordination, and booking so you can focus on your project. Same-week availability for most services.</p>
        </div>
      </div>
    </div>
  );
}
