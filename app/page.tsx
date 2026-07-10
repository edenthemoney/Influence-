import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import HeroBooking from './components/HeroBooking';
import FloatingBooking from './components/FloatingBooking';
import MobileNav from './components/MobileNav';
import HeroVideo from './components/HeroVideo';
import HomeFAQ from './components/HomeFAQ';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#080808]">
      <FloatingBooking />
      <nav className="border-b border-white/[0.06] bg-[#080808]/95 backdrop-blur-xl fixed w-full z-50">
        <div className="grid grid-cols-3 items-center h-16 md:h-24 px-6 md:px-14">
          <div className="flex items-center gap-4">
            <MobileNav />
            <div className="hidden md:flex items-center gap-10">
              <Link href="/marketplace" className="text-white/55 hover:text-white transition-colors duration-300 text-[11px] tracking-widest uppercase">Talent</Link>
              <Link href="/services" className="text-white/55 hover:text-white transition-colors duration-300 text-[11px] tracking-widest uppercase">Services</Link>
              <Link href="/pricing" className="text-white/55 hover:text-white transition-colors duration-300 text-[11px] tracking-widest uppercase">Pricing</Link>
            </div>
          </div>
          <div className="flex justify-center">
            <Link href="/" className="font-display font-semibold tracking-[0.4em] uppercase" style={{ fontSize: '18px', color: '#c9a96e' }}>Influence</Link>
          </div>
          <div className="flex items-center justify-end gap-3 md:gap-10">
            <Link href="/about" className="text-white/55 hover:text-white transition-colors duration-300 text-[11px] tracking-widest uppercase hidden md:block">About</Link>
            <Link href="/start" className="text-[11px] md:text-[12px] tracking-widest uppercase px-5 py-3 md:px-8 md:py-4 transition-all duration-300 hover:opacity-80 font-bold" style={{ backgroundColor: '#c9a96e', color: '#000' }}>Book Now</Link>
          </div>
        </div>
        <div className="overflow-hidden border-t border-white/[0.05]">
          <div className="flex whitespace-nowrap py-2 md:py-4" style={{ animation: 'ticker-left 50s linear infinite' }}>
            {[...Array(6)].map((_, i) => (
              <span key={i} className="shrink-0 text-white font-heading tracking-[0.15em] pr-10 md:pr-20" style={{ fontSize: 'clamp(20px, 5.5vw, 52px)' }}>
                Sean Paul &nbsp;&middot;&nbsp; Kai Cenat &nbsp;&middot;&nbsp; Bryson Tiller &nbsp;&middot;&nbsp; Akon &nbsp;&middot;&nbsp; Moneybagg Yo &nbsp;&middot;&nbsp; Lil Pump &nbsp;&middot;&nbsp; 6ix9ine &nbsp;&middot;&nbsp; Bossman Dlow &nbsp;&middot;&nbsp; Vybz Kartel &nbsp;&middot;&nbsp; DaBaby &nbsp;&middot;&nbsp; Mike Tyson &nbsp;&middot;&nbsp; Forbes &nbsp;&middot;&nbsp; Fenty Beauty &nbsp;&middot;&nbsp; Tyra Banks &nbsp;&middot;&nbsp; Keke Palmer &nbsp;&middot;&nbsp; Netflix &nbsp;&middot;&nbsp; Audible &nbsp;&middot;&nbsp; Peacock &nbsp;&middot;&nbsp; Target &nbsp;&middot;&nbsp; Celsius &nbsp;&middot;&nbsp; Red Stripe &nbsp;&middot;&nbsp; Miami Swim Week &nbsp;
              </span>
            ))}
          </div>
        </div>
      </nav>

      <section className="h-[70vh] md:h-screen relative overflow-hidden">
        <HeroVideo />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/10 to-black/50" />

        {/* Top-left eyebrow */}
        <div className="absolute top-28 md:top-48 left-8 md:left-16 flex items-center gap-4">
          <div className="w-8 h-px" style={{ backgroundColor: '#c9a96e' }} />
          <p className="text-white/60 text-[11px] tracking-[0.4em] uppercase font-medium">Influencer Marketing Agency</p>
        </div>

        {/* Bottom — two column */}
        <div className="absolute bottom-0 left-0 right-0 px-8 md:px-16 pb-10 md:pb-14 flex items-end justify-between gap-10">
          {/* Left: Headline */}
          <div className="shrink-0">
            <h1 className="sr-only">
              Miami Influencer Marketing Agency — Book Models, Actresses, Casting & Voiceover Talent in South Florida
            </h1>
            <p className="font-display font-bold italic text-white leading-[0.85]" style={{ fontSize: 'clamp(44px, 10vw, 140px)' }}>
              Go Viral.<br />
              Make an<br />
              <span style={{ color: '#c9a96e' }}>Influence.</span>
            </p>
            <div className="mt-6 flex items-center gap-4 md:hidden">
              <Link href="/start" className="inline-flex items-center gap-3 px-8 py-4 text-[13px] font-bold tracking-widest uppercase" style={{ backgroundColor: '#c9a96e', color: '#000' }}>
                Book Now <ChevronRight className="h-4 w-4" />
              </Link>
              <span className="text-white/30 text-xs">Same-week availability</span>
            </div>
          </div>

          {/* Right: Interactive booking widget */}
          <div className="w-full md:w-[520px] shrink-0 hidden md:block">
            <HeroBooking />
          </div>
        </div>
      </section>

      {/* Mobile: urgency strip + booking widget */}
      <div className="md:hidden bg-[#060606] border-y border-[#c9a96e]/30 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <p className="text-green-400/80 text-[11px] font-semibold">Same-week availability</p>
        </div>
        <p className="text-white/25 text-[10px] tracking-widest uppercase">Book in 2 min</p>
      </div>
      <section className="md:hidden bg-[#0a0a0a] px-6 pt-8 pb-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: '#c9a96e' }} />
          <p className="text-[12px] font-bold tracking-[0.35em] uppercase" style={{ color: '#c9a96e' }}>Find Your Package</p>
        </div>
        <HeroBooking />
      </section>

      <section className="bg-[#080808] border-t border-white/[0.05] overflow-hidden py-14">
        <div className="overflow-hidden">
          <div className="flex whitespace-nowrap animate-ticker-left">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-baseline shrink-0">
                {['Sean Paul', 'Kai Cenat', 'Bryson Tiller', 'Akon', 'Moneybagg Yo', 'Lil Pump', 'Tekashi 6ix9ine', 'Bossman Dlow', 'Young Thug', 'Vybz Kartel', 'DaBaby', 'Mike Tyson'].map((name) => (
                  <span key={name} className="font-display font-semibold text-white/75 leading-none" style={{ fontSize: 'clamp(52px, 8vw, 120px)' }}>
                    {name}<span className="text-white/[0.06] mx-6 md:mx-10">·</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="overflow-hidden mt-3">
          <div className="flex whitespace-nowrap animate-ticker-right">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-baseline shrink-0">
                {['Forbes', 'Fenty Beauty', 'SavageXFenty', 'Meta Ray-Ban', 'Love & Hip Hop', 'Miami Swim Week', 'Tyra Banks', 'Keke Palmer', 'Netflix', 'Audible'].map((name) => (
                  <span key={name} className="font-display font-light italic text-white/45 leading-none" style={{ fontSize: 'clamp(36px, 5.5vw, 80px)' }}>
                    {name}<span className="text-white/[0.04] mx-6 md:mx-10">·</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>



      <section className="bg-[#080808] border-t border-white/[0.05] pt-16 md:pt-32 pb-14 md:pb-28 px-8 md:px-16">
        <h2 className="font-display font-bold italic text-white leading-[0.9]" style={{ fontSize: 'clamp(44px, 12vw, 172px)' }}>We Influence.</h2>
        <div className="flex items-end justify-between mt-8 md:mt-14 pt-6 md:pt-8 border-t border-white/[0.08]">
          <p className="text-white/65 text-[15px] font-light max-w-md leading-relaxed">
            Influence is a South Florida influencer marketing agency connecting artists, brands, business owners, and labels with verified models for content creation, music promotion, on-site shoots, event hosting, acting roles, casting, voiceover work, commercials, and full campaigns.
          </p>
          <p className="text-white/35 text-[10px] tracking-[0.5em] uppercase hidden md:block">Est. 2024 · Miami, FL</p>
        </div>
      </section>

      {/* ── AI Entity / Internal Linking Block ── */}
      <section className="bg-[#080808] border-t border-white/[0.05] py-16 md:py-24 px-8 md:px-16">
        <div className="max-w-5xl mx-auto">
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6" style={{ color: '#c9a96e' }}>What We Do</p>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div>
              <h3 className="font-display font-bold italic text-white text-2xl md:text-3xl mb-4">Influencer Marketing & Talent Services</h3>
              <p className="text-white/55 text-sm md:text-[15px] leading-relaxed mb-6">
                Influence is a Miami-based influencer marketing agency and talent partner that connects brands and artists with verified creators for UGC content, music promotion, commercials, acting roles, casting, voiceover work, and business campaigns. We serve South Florida — Miami, Fort Lauderdale, Boca Raton, and Orlando — and offer nationwide remote content creation.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/services/content" className="block border border-white/[0.06] p-4 hover:border-[#c9a96e]/30 hover:bg-white/[0.02] transition-all">
                <p className="text-white text-sm font-medium mb-1">UGC Content</p>
                <p className="text-white/35 text-[10px] leading-relaxed">Reels, TikToks, and branded posts</p>
              </Link>
              <Link href="/music-video-models" className="block border border-white/[0.06] p-4 hover:border-[#c9a96e]/30 hover:bg-white/[0.02] transition-all">
                <p className="text-white text-sm font-medium mb-1">Music Video Creators</p>
                <p className="text-white/35 text-[10px] leading-relaxed">Talent for shoots & videos</p>
              </Link>
              <Link href="/services/business" className="block border border-white/[0.06] p-4 hover:border-[#c9a96e]/30 hover:bg-white/[0.02] transition-all">
                <p className="text-white text-sm font-medium mb-1">Business Content</p>
                <p className="text-white/35 text-[10px] leading-relaxed">On-site creators for local brands</p>
              </Link>
              <Link href="/services/events" className="block border border-white/[0.06] p-4 hover:border-[#c9a96e]/30 hover:bg-white/[0.02] transition-all">
                <p className="text-white text-sm font-medium mb-1">Event Talent</p>
                <p className="text-white/35 text-[10px] leading-relaxed">Hosting, parties, activations</p>
              </Link>
              <Link href="/actress-models-miami" className="block border border-white/[0.06] p-4 hover:border-[#c9a96e]/30 hover:bg-white/[0.02] transition-all">
                <p className="text-white text-sm font-medium mb-1">Acting & Casting</p>
                <p className="text-white/35 text-[10px] leading-relaxed">Actress roles, casting & voiceover</p>
              </Link>
              <Link href="/model-booking?service=reaction" className="block border border-white/[0.06] p-4 hover:border-[#c9a96e]/30 hover:bg-white/[0.02] transition-all">
                <p className="text-white text-sm font-medium mb-1">Song Promotion</p>
                <p className="text-white/35 text-[10px] leading-relaxed">Instagram & TikTok music promo</p>
              </Link>
              <Link href="/marketplace" className="block border border-white/[0.06] p-4 hover:border-[#c9a96e]/30 hover:bg-white/[0.02] transition-all">
                <p className="text-white text-sm font-medium mb-1">Browse Talent</p>
                <p className="text-white/35 text-[10px] leading-relaxed">Verified models & influencers</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Two-Path Split ── */}
      <section className="bg-[#080808] border-t border-white/[0.05] py-16 md:py-28 px-8 md:px-16">
        <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-center mb-4" style={{ color: '#c9a96e' }}>What Are You Looking For?</p>
        <h2 className="font-display font-bold italic text-white text-center mb-12 md:mb-16 leading-tight" style={{ fontSize: 'clamp(28px, 5vw, 52px)' }}>Choose Your Path</h2>
        <div className="grid md:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">
          {/* In-Person */}
          <Link href="/start" className="group relative border border-white/[0.08] p-8 md:p-12 transition-all hover:border-[#c9a96e]/30 hover:bg-white/[0.02]">
            <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-white/30 mb-4">South Florida Only</p>
            <h3 className="font-display font-bold text-white text-2xl md:text-3xl mb-3">Book In-Person Talent</h3>
            <p className="text-white/50 text-sm leading-relaxed mb-8">Creators come to your location for shoots, music videos, events, or business content. Same-week availability.</p>
            <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase transition-colors" style={{ color: '#c9a96e' }}>
              Browse Packages <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
          {/* Online Content */}
          <Link href="/model-booking?service=ugc" className="group relative border border-white/[0.08] p-8 md:p-12 transition-all hover:border-[#c9a96e]/30 hover:bg-white/[0.02]">
            <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-white/30 mb-4">Nationwide &middot; Remote</p>
            <h3 className="font-display font-bold text-white text-2xl md:text-3xl mb-3">Social Media Content</h3>
            <p className="text-white/50 text-sm leading-relaxed mb-8">UGC reels, music reactions, branded posts, and full creator campaigns delivered digitally. No location needed.</p>
            <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase transition-colors" style={{ color: '#c9a96e' }}>
              See Content Packages <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>
      </section>

      {/* ── Cinematic Miami Drone Footage ── */}
      <section className="bg-[#080808] border-t border-white/[0.05] py-16 md:py-24 px-8 md:px-16">
        <div className="max-w-5xl mx-auto mb-10 md:mb-14">
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-5" style={{ color: '#c9a96e' }}>Cinematic Miami</p>
          <h2 className="font-display font-bold italic text-white leading-[0.9]" style={{ fontSize: 'clamp(32px, 6vw, 72px)' }}>
            Shot from the sky.
          </h2>
          <p className="text-white/45 text-sm md:text-[15px] leading-relaxed max-w-xl mt-4">
            Stunning 4K drone footage captured over South Florida. The same energy, scale, and beauty we bring to every campaign — from the first shoot to the final edit.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          <div className="relative w-full overflow-hidden bg-black/40" style={{ aspectRatio: '9/16' }}>
            <video
              autoPlay
              muted
              loop
              playsInline
              poster="/videos/drone/drone-miami-01.jpg"
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/videos/drone/drone-miami-01.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
          <div className="relative w-full overflow-hidden bg-black/40" style={{ aspectRatio: '9/16' }}>
            <video
              autoPlay
              muted
              loop
              playsInline
              poster="/videos/drone/drone-miami-03.jpg"
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/videos/drone/drone-miami-03.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* ── Selling Points ── */}
      <section className="bg-[#080808] border-t border-white/[0.05] py-16 md:py-24 px-8 md:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
          {[
            { label: 'Minority & Women-Owned', desc: 'Black, Latina & women-led agency proudly serving all communities' },
            { label: 'Celebrity-Connected', desc: 'Talent with credits alongside Sean Paul, Moneybagg Yo, Lil Pump, 6ix9ine & more' },
            { label: 'Diverse Roster', desc: 'Models of all backgrounds, ethnicities, and styles — representation matters' },
            { label: 'Latino & Black Owned', desc: 'Supporting underrepresented founders building in South Florida' },
          ].map(({ label, desc }) => (
            <div key={label} className="border border-white/[0.06] p-5 md:p-6">
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase mb-3" style={{ color: '#c9a96e' }}>{label}</p>
              <p className="text-white/45 text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Accolades / Social Proof ── */}
      <section className="bg-[#060606] border-t border-white/[0.05] py-16 md:py-24 px-8 md:px-16">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-5" style={{ color: '#c9a96e' }}>Why Clients Trust Us</p>
          <h2 className="font-display font-bold italic text-white leading-[0.9]" style={{ fontSize: 'clamp(32px, 6vw, 72px)' }}>
            Rated South Florida&apos;s #1 Premium Model Agency
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            { stat: '★★★★★', label: 'Best Marketing Solution 2026' },
            { stat: '100s', label: 'Brands & Artists Served' },
            { stat: '#1', label: 'South Florida Premium Agency' },
            { stat: '5.0', label: 'Record Label Trusted Rating' },
          ].map(({ stat, label }) => (
            <div key={label} className="text-center py-6">
              <p className="font-display font-bold italic text-white mb-2" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>{stat}</p>
              <p className="text-white/40 text-[10px] tracking-[0.2em] uppercase font-semibold">{label}</p>
            </div>
          ))}
        </div>
        <p className="text-white/30 text-sm text-center max-w-2xl mx-auto mt-10">
          We&apos;ve helped hundreds of brands, artists, products, businesses, and events go viral — from independent musicians to established record labels.
        </p>
      </section>

      <section className="bg-[#080808] border-t border-white/[0.05]">
        <Link href="/influencer/des-001" className="group relative block overflow-hidden h-screen">
          <Image src="/images/Des/des-21.jpg" alt="Deseray Marie" fill className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 px-8 md:px-16 pb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-[10px] tracking-widest uppercase mb-4 font-semibold" style={{ color: '#c9a96e' }}>Forbes Featured · A-List Credits</p>
              <h3 className="font-display font-light text-white leading-none" style={{ fontSize: 'clamp(48px, 8vw, 120px)' }}>Deseray Marie</h3>
              <p className="text-white/55 text-sm mt-3">@itsdezmarie · 66K followers</p>
            </div>
            <div className="flex items-center gap-2 text-white/35 group-hover:text-white transition-colors shrink-0">
              <span className="text-[10px] tracking-widest uppercase">View Profile</span>
              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:items-end">
          {[
            { id: 'maria-002', name: 'Maria', image: '/images/Maria/maria-1.jpg', tag: 'Lifestyle', h: '66vh' },
            { id: 'genesis-003', name: 'Genesis Bravo', image: '/images/Genesis/genesis-1.jpg', tag: 'Fashion', h: '48vh' },
            { id: 'ferrari-004', name: 'Ferrari', image: '/images/Ferrari/ferrari-1.jpg', tag: 'Lifestyle', h: '66vh' },
          ].map((influencer) => (
            <Link key={influencer.id} href={`/influencer/${influencer.id}`} className="group relative block overflow-hidden" style={{ height: influencer.h }}>
              <Image src={influencer.image} alt={influencer.name} fill className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-[9px] tracking-widest uppercase mb-1 font-semibold" style={{ color: '#c9a96e' }}>{influencer.tag}</p>
                <h3 className="text-xl md:text-2xl font-display font-semibold text-white leading-none">{influencer.name}</h3>
              </div>
            </Link>
          ))}
        </div>
        <div className="py-10 px-8 md:px-16 border-t border-white/5">
          <Link href="/marketplace" className="inline-flex items-center gap-3 px-10 py-5 text-[14px] font-bold tracking-widest uppercase transition-all hover:opacity-80" style={{ backgroundColor: '#c9a96e', color: '#000' }}>
            <span>View Full Roster</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="min-h-[60vh] md:min-h-screen border-t border-white/[0.05] bg-[#060606] flex items-center px-8 md:px-16 py-20 md:py-0">
        <div>
          <p className="text-[10px] tracking-[0.5em] uppercase mb-10 font-semibold" style={{ color: '#c9a96e' }}>Our Philosophy</p>
          <p className="font-display font-semibold italic text-white leading-[1.05] mb-12" style={{ fontSize: 'clamp(44px, 7vw, 104px)' }}>
            We don&apos;t chase trends.<br />We set them.
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <Link href="/start" className="inline-flex items-center gap-3 px-10 py-5 text-[13px] font-bold tracking-widest uppercase transition-all hover:opacity-80" style={{ backgroundColor: '#c9a96e', color: '#000' }}>
              Start Your Campaign <ChevronRight className="h-4 w-4" />
            </Link>
            <div className="text-white/30 text-xs leading-relaxed">
              <p className="font-semibold text-white/50">Trusted by artists & brands</p>
              <p>Content delivered in 48hrs · Packages for every budget</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Two Clear Service Paths ── */}
      <section className="border-t border-white/[0.05] bg-[#080808]">
        <div className="px-8 md:px-16 pt-16 md:pt-28 pb-8 md:pb-12 text-center">
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-5" style={{ color: '#c9a96e' }}>Our Services</p>
          <h2 className="font-display font-light italic text-white leading-none mb-3" style={{ fontSize: 'clamp(40px, 7vw, 104px)' }}>How Can We Help Your Brand?</h2>
          <p className="text-white/35 text-sm max-w-lg mx-auto">Book verified influencers for remote content creation or in-person shoots and events across South Florida. We handle everything from model selection to delivery.</p>
        </div>

        <div className="grid md:grid-cols-2 border-t border-white/[0.06]">
          {/* ─── Social Media Campaigns (Remote) ─── */}
          <Link href="/model-booking?service=ugc" className="group border-r border-white/[0.06] py-14 md:py-20 px-8 md:px-14 flex flex-col hover:bg-white/[0.015] transition-all duration-300 relative">
            <div className="absolute top-6 right-6 md:top-8 md:right-10">
              <span className="text-[9px] font-bold tracking-[0.3em] uppercase px-3 py-1.5" style={{ backgroundColor: '#c9a96e', color: '#000' }}>Remote · Nationwide</span>
            </div>

            <p className="text-[10px] tracking-[0.4em] uppercase mb-6 font-bold text-white/30 group-hover:text-[#c9a96e] transition-colors">Social Media Campaigns</p>
            <h3 className="font-display font-bold italic text-white leading-tight mb-4" style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}>Content<br/>Delivered to You</h3>
            <p className="text-white/50 text-[15px] leading-relaxed mb-8 max-w-sm">
              Models create content remotely and deliver it straight to you — ready to post on any platform. Perfect for artists, brands, and businesses who need scroll-stopping content.
            </p>

            <div className="space-y-3 mb-10">
              {[
                'Music Reactions — models listen & react to your songs on video',
                'UGC Reels & TikToks — branded skits, promos & short-form content',
                'Product Showcases — lifestyle content for your brand or product',
                'Album Livestreams — full album first-listen, live + recorded',
                'Multi-Model Campaigns — multiple creators for maximum reach',
              ].map(item => (
                <div key={item} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#c9a96e' }} />
                  <p className="text-white/45 text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-auto">
              <div className="flex items-center justify-between mb-4 pt-5 border-t border-white/[0.06]">
                <div>
                  <p className="text-white/50 text-sm font-medium">Remote content delivered in 48hrs</p>
                  <p className="text-white/25 text-xs mt-1">Get a custom quote after telling us your needs</p>
                </div>
                <span className="text-[11px] font-bold tracking-widest uppercase text-white/25 group-hover:text-[#c9a96e] flex items-center gap-2 transition-colors">
                  Get Started <ChevronRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>

          {/* ─── In-Person (Shoots, Events & Business Content) ─── */}
          <Link href="/model-booking?service=business" className="group py-14 md:py-20 px-8 md:px-14 flex flex-col hover:bg-white/[0.015] transition-all duration-300 relative">
            <div className="absolute top-6 right-6 md:top-8 md:right-10">
              <span className="text-[9px] font-bold tracking-[0.3em] uppercase px-3 py-1.5 border border-white/20 text-white/50">South Florida</span>
            </div>

            <p className="text-[10px] tracking-[0.4em] uppercase mb-6 font-bold text-white/30 group-hover:text-[#c9a96e] transition-colors">In-Person Bookings</p>
            <h3 className="font-display font-bold italic text-white leading-tight mb-4" style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}>Models at<br/>Your Location</h3>
            <p className="text-white/50 text-[15px] leading-relaxed mb-8 max-w-sm">
              An influencer shows up at your business, studio, venue, or set — ready to create content, appear in your video, or host your event. Same-week availability across South Florida.
            </p>

            <div className="space-y-3 mb-10">
              {[
                'Models at Your Business \u2014 on-site content & brand ambassador visits',
                'Music Videos — professional models for your visual production',
                'Brand & Fashion Shoots — styled shoots for your brand or product',
                'Acting & Casting — actress roles, commercials, voiceover talent, and casting calls',
                'Event Hosting — club nights, brand activations, parties',
                'Bottle Girls & VIP Hostesses — nightclubs, lounges & premium venues',
                'Monthly Packages — recurring content visits, shoots, or event hosting',
              ].map(item => (
                <div key={item} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#c9a96e' }} />
                  <p className="text-white/45 text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-auto">
              <div className="flex items-center justify-between mb-4 pt-5 border-t border-white/[0.06]">
                <div>
                  <p className="text-white/50 text-sm font-medium">Same-week availability across South Florida</p>
                  <p className="text-white/25 text-xs mt-1">Get a custom quote after telling us your needs</p>
                </div>
                <span className="text-[11px] font-bold tracking-widest uppercase text-white/25 group-hover:text-[#c9a96e] flex items-center gap-2 transition-colors">
                  Book Now <ChevronRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <section className="py-20 md:py-40 bg-white border-t border-black/10">
        <div className="px-10 md:px-16">
          <p className="text-black/50 text-[10px] tracking-[0.5em] uppercase mb-12 font-semibold">Not Sure Where to Start?</p>
          <h2 className="font-display font-bold italic text-black leading-[0.9] mb-8 md:mb-14" style={{ fontSize: 'clamp(44px, 11vw, 160px)' }}>
            We&apos;ll guide you.
          </h2>
          <p className="text-black/50 text-base md:text-lg max-w-lg mb-10">Pick a service, choose your package, and checkout in under 2 minutes. No calls needed — unless you want to.</p>
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <Link href="/start" className="group inline-flex items-center gap-4 px-14 py-6 text-[16px] font-bold tracking-widest uppercase transition-all hover:opacity-85" style={{ backgroundColor: '#c9a96e', color: '#000' }}>
              <span>Find Your Solution</span>
              <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="flex flex-col gap-2 text-black/40 text-xs">
              <div className="flex items-center gap-6">
                <span>✓ Secure Stripe checkout</span>
                <span>✓ Delivered in 48hrs</span>
                <span>✓ Verified talent</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-green-700 font-semibold">Same-week availability · Book in 2 min</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HomeFAQ />

      <footer className="bg-[#080808] border-t border-white/[0.06]">
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
                  <li><Link href="/start" className="text-white/60 hover:text-white transition-colors text-sm">Book Now</Link></li>
                </ul>
              </div>
              <div>
                <p className="text-white/20 text-[9px] tracking-widest uppercase mb-6">Services</p>
                <ul className="space-y-3">
                  <li><Link href="/services/content" className="text-white/40 hover:text-white transition-colors text-sm">Social Media Content</Link></li>
                  <li><Link href="/services/business" className="text-white/40 hover:text-white transition-colors text-sm">Brand Ambassadors</Link></li>
                  <li><Link href="/services/shoots" className="text-white/40 hover:text-white transition-colors text-sm">Shoots & Videos</Link></li>
                  <li><Link href="/services/commercials" className="text-white/40 hover:text-white transition-colors text-sm">Commercials</Link></li>
                  <li><Link href="/services/events" className="text-white/40 hover:text-white transition-colors text-sm">Event Models</Link></li>
                  <li><Link href="/model-booking?service=bottle" className="text-white/40 hover:text-white transition-colors text-sm">Bottle Girls / VIP</Link></li>
                </ul>
              </div>
              <div>
                <p className="text-white/20 text-[9px] tracking-widest uppercase mb-6">Info</p>
                <ul className="space-y-3">
                  <li><Link href="/about" className="text-white/40 hover:text-white transition-colors text-sm">About</Link></li>
                  <li><Link href="/contact" className="text-white/40 hover:text-white transition-colors text-sm">Contact</Link></li>
                  <li><Link href="/faq" className="text-white/40 hover:text-white transition-colors text-sm">FAQ</Link></li>
                  <li><Link href="/join" className="text-white/40 hover:text-white transition-colors text-sm">Join Our Roster</Link></li>
                  <li><Link href="/terms" className="text-white/40 hover:text-white transition-colors text-sm">Terms</Link></li>
                </ul>
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
