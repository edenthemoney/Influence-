import Link from 'next/link';
import { Check, ChevronRight, Phone, ArrowRight } from 'lucide-react';
import MobileNav from './MobileNav';

const gold = '#c9a96e';

interface Package {
  name: string;
  price: number;
  tagline: string;
  features: string[];
  cta: string;
  href: string;
  popular?: boolean;
}

interface PersonaLandingProps {
  title: string;
  description: string;
  tagline: string;
  headline: string;
  subheadline: string;
  heroImage: string;
  heroImageAlt: string;
  primaryCta: { text: string; href: string };
  secondaryCta?: { text: string; href: string };
  painPoints: string[];
  solutionTitle: string;
  solutionBody: string;
  solutionFeatures: string[];
  packages: Package[];
  trustBadges: string[];
  socialProof: { stat: string; label: string }[];
  faq: { q: string; a: string }[];
  finalCta: { text: string; href: string };
  bookingSection?: React.ReactNode;
  hidePackagePrices?: boolean;
}

export default function PersonaLanding({
  title,
  description,
  tagline,
  headline,
  subheadline,
  heroImage,
  heroImageAlt,
  primaryCta,
  secondaryCta,
  painPoints,
  solutionTitle,
  solutionBody,
  solutionFeatures,
  packages,
  trustBadges,
  socialProof,
  faq,
  finalCta,
  bookingSection,
  hidePackagePrices,
}: PersonaLandingProps) {
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
            <Link href={primaryCta.href} className="text-[11px] md:text-[12px] tracking-widest uppercase px-5 py-3 md:px-8 md:py-4 transition-all duration-300 hover:opacity-80 font-bold" style={{ backgroundColor: gold, color: '#000' }}>
              {primaryCta.text}
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-end overflow-hidden">
        <img src={heroImage} alt={heroImageAlt} className="absolute inset-0 w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
        <div className="relative z-10 px-8 md:px-16 pb-20 md:pb-28 max-w-4xl">
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6" style={{ color: gold }}>{tagline}</p>
          <h1 className="font-display font-bold italic text-white leading-[0.9] mb-6" style={{ fontSize: 'clamp(40px, 7vw, 96px)' }}>
            {headline.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-xl leading-relaxed mb-10">
            {subheadline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={primaryCta.href} className="inline-flex items-center justify-center gap-3 px-10 py-5 text-[13px] font-bold tracking-widest uppercase hover:opacity-85 transition-all" style={{ backgroundColor: gold, color: '#000' }}>
              {primaryCta.text} <ChevronRight className="h-4 w-4" />
            </Link>
            {secondaryCta && (
              <Link href={secondaryCta.href} className="inline-flex items-center justify-center gap-3 px-8 py-5 text-[13px] font-bold tracking-widest uppercase border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-all">
                {secondaryCta.text}
              </Link>
            )}
          </div>
          <div className="flex flex-wrap gap-6 mt-10">
            {trustBadges.map((badge) => (
              <span key={badge} className="text-white/30 text-[10px] tracking-widest uppercase flex items-center gap-2">
                <Check className="h-3 w-3" style={{ color: gold }} /> {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="border-t border-white/[0.06] bg-[#060606] py-16 md:py-24 px-8 md:px-16">
        <div className="max-w-5xl mx-auto">
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-8" style={{ color: gold }}>The Problem</p>
          <div className="grid md:grid-cols-3 gap-6">
            {painPoints.map((point) => (
              <div key={point} className="border border-white/[0.06] p-6 md:p-8">
                <p className="text-white/70 text-sm md:text-[15px] leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-20 md:py-32 px-8 md:px-16 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
            <div>
              <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6" style={{ color: gold }}>The Solution</p>
              <h2 className="font-display font-bold italic text-white leading-[0.9] mb-6" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
                {solutionTitle}
              </h2>
              <p className="text-white/50 text-[15px] leading-relaxed mb-8">
                {solutionBody}
              </p>
              <Link href={primaryCta.href} className="inline-flex items-center gap-3 text-[12px] font-bold tracking-widest uppercase transition-colors" style={{ color: gold }}>
                {primaryCta.text} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {solutionFeatures.map((feature) => (
                <div key={feature} className="flex items-start gap-4 border border-white/[0.06] p-5">
                  <div className="w-8 h-8 border flex items-center justify-center flex-shrink-0" style={{ borderColor: gold }}>
                    <Check className="h-4 w-4" style={{ color: gold }} />
                  </div>
                  <p className="text-white/70 text-[14px] leading-relaxed">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="bg-[#060606] border-t border-white/[0.06] py-20 md:py-32 px-8 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6" style={{ color: gold }}>{hidePackagePrices ? 'Popular Options' : 'Simple Pricing'}</p>
            <h2 className="font-display font-bold italic text-white leading-[0.9] mb-6" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
              {hidePackagePrices ? 'Pick What You Need.' : 'Pick Your Package.'}
            </h2>
            <p className="text-white/45 text-lg max-w-2xl mx-auto">
              {hidePackagePrices
                ? 'Tell us what you need and we\'ll send a custom quote — usually within a few hours.'
                : 'No hidden fees. No surprise markups. Just verified talent and clear deliverables.'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {packages.map((pkg) => (
              <div key={pkg.name} className={`relative border flex flex-col p-7 md:p-8 transition-all hover:border-[#c9a96e]/40 ${pkg.popular ? 'border-[#c9a96e] bg-[#c9a96e]/[0.04]' : 'border-white/[0.08] bg-[#0a0a0a]'}`}>
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1.5 text-[10px] font-black tracking-widest uppercase" style={{ backgroundColor: gold, color: '#000' }}>Most Popular</span>
                  </div>
                )}
                <p className="text-white/30 text-[9px] font-bold tracking-[0.3em] uppercase mb-2">{pkg.tagline}</p>
                <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                {!hidePackagePrices && (
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-3xl font-bold" style={{ color: gold }}>${pkg.price.toLocaleString()}</span>
                    <span className="text-white/30 text-xs">/project</span>
                  </div>
                )}
                <ul className={`space-y-2.5 mb-8 flex-1 ${hidePackagePrices ? 'mt-4' : ''}`}>
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check className="h-3.5 w-3.5 text-[#c9a96e]/70 flex-shrink-0 mt-0.5" />
                      <span className="text-white/50 text-[12px] leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href={pkg.href} className={`w-full py-4 text-[11px] font-bold tracking-widest uppercase text-center transition-all ${pkg.popular ? 'text-black hover:opacity-90' : 'border border-white/10 text-white/70 hover:border-[#c9a96e]/50 hover:text-white'}`} style={pkg.popular ? { backgroundColor: gold } : undefined}>
                  {pkg.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="border-t border-white/[0.06] py-16 md:py-24 px-8 md:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {socialProof.map((item) => (
              <div key={item.label} className="text-center">
                <p className="font-display font-bold italic text-4xl md:text-5xl mb-2" style={{ color: gold }}>{item.stat}</p>
                <p className="text-white/30 text-[10px] tracking-widest uppercase">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#060606] border-t border-white/[0.06] py-20 md:py-28 px-8 md:px-16">
        <div className="max-w-3xl mx-auto">
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-8 text-center" style={{ color: gold }}>Questions</p>
          <h2 className="font-display font-bold italic text-white text-center mb-14" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
            What You Need to Know.
          </h2>
          <div className="space-y-5">
            {faq.map(({ q, a }) => (
              <div key={q} className="border border-white/[0.06] p-6 md:p-8">
                <h3 className="text-white font-bold text-lg mb-3">{q}</h3>
                <p className="text-white/45 text-[14px] leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inline Booking Widget */}
      {bookingSection && (
        <section id="booking-widget" className="py-16 md:py-24 px-8 md:px-16 border-t border-white/[0.06]">
          <div className="max-w-5xl mx-auto">{bookingSection}</div>
        </section>
      )}

      {/* Final CTA */}
      <section className="relative py-24 md:py-36 px-8 md:px-16 overflow-hidden">
        <img src={heroImage} alt={heroImageAlt} className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/90 to-[#080808]/70" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="font-display font-bold italic text-white leading-[0.9] mb-6" style={{ fontSize: 'clamp(36px, 6vw, 72px)' }}>
            Ready to Book?
          </h2>
          <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Same-week availability. Verified talent. Professional results. Start your project today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={finalCta.href} className="inline-flex items-center justify-center gap-3 px-10 py-5 text-[13px] font-bold tracking-widest uppercase hover:opacity-85 transition-all" style={{ backgroundColor: gold, color: '#000' }}>
              {finalCta.text} <ChevronRight className="h-4 w-4" />
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center gap-3 px-8 py-5 text-[13px] font-bold tracking-widest uppercase border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-all">
              <Phone className="h-4 w-4" /> Talk to a Rep
            </Link>
          </div>
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
                  <li><Link href="/services/events" className="text-white/40 hover:text-white transition-colors text-sm">Event Talent</Link></li>
                </ul>
              </div>
              <div>
                <p className="text-white/20 text-[9px] tracking-widest uppercase mb-6">Info</p>
                <ul className="space-y-3">
                  <li><Link href="/about" className="text-white/40 hover:text-white transition-colors text-sm">About</Link></li>
                  <li><Link href="/faq" className="text-white/40 hover:text-white transition-colors text-sm">FAQ</Link></li>
                  <li><Link href="/contact" className="text-white/40 hover:text-white transition-colors text-sm">Contact</Link></li>
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
