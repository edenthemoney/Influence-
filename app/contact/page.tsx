import Link from 'next/link';
import { Mail, MapPin, Clock, Crown, ChevronRight, Phone } from 'lucide-react';
import MobileNav from '../components/MobileNav';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Influence — South Florida Influencer Marketing Agency',
  description: 'Get in touch with Influence, a South Florida influencer marketing agency based in Miami and Boca Raton. Reach out for bookings, partnerships, or questions about UGC content, music promotion, and event hosting.',
  openGraph: {
    title: 'Contact Influence — South Florida Influencer Marketing Agency',
    description: 'Reach out for bookings, partnerships, or questions. Based in Miami & Boca Raton, FL.',
    url: 'https://influencemodels.agency/contact',
  },
  alternates: {
    canonical: 'https://influencemodels.agency/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#080808]">
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
          <Link href="/" className="font-display font-semibold tracking-[0.4em] uppercase" style={{ fontSize: '18px', color: '#c9a96e' }}>Influence</Link>
          <div className="flex items-center gap-10">
            <Link href="/about" className="text-white/55 hover:text-white transition-colors duration-300 text-[11px] tracking-widest uppercase hidden md:block">About</Link>
            <Link href="/model-booking" className="text-[11px] md:text-[12px] tracking-widest uppercase px-5 py-3 md:px-8 md:py-4 transition-all duration-300 hover:opacity-80 font-bold" style={{ backgroundColor: '#c9a96e', color: '#000' }}>Book Now</Link>
          </div>
        </div>
      </nav>

      <div className="pt-32 pb-20 px-6 md:px-14 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-5" style={{ color: '#c9a96e' }}>Get In Touch</p>
          <h1 className="font-display font-bold italic text-white leading-[0.9] mb-6" style={{ fontSize: 'clamp(44px, 8vw, 96px)' }}>Contact Us</h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Have a question about our services, need a custom quote, or want to discuss a partnership? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Email */}
          <a href="mailto:influencemodelsagency@gmail.com" className="border border-white/[0.06] p-8 hover:bg-white/[0.02] transition-all group">
            <Mail className="h-8 w-8 mb-4" style={{ color: '#c9a96e' }} />
            <h2 className="text-white font-bold text-xl mb-2">Email Us</h2>
            <p className="text-white/40 text-sm mb-4">For bookings, partnerships, and general inquiries.</p>
            <p className="font-bold text-sm group-hover:underline" style={{ color: '#c9a96e' }}>influencemodelsagency@gmail.com</p>
          </a>

          {/* Location */}
          <div className="border border-white/[0.06] p-8">
            <MapPin className="h-8 w-8 mb-4" style={{ color: '#c9a96e' }} />
            <h2 className="text-white font-bold text-xl mb-2">Location</h2>
            <p className="text-white/40 text-sm mb-4">In-person services available in South Florida.</p>
            <p className="text-white/60 text-sm font-medium">Miami &middot; Boca Raton, FL</p>
          </div>

          {/* Phone */}
          <a href="tel:+15615520392" className="border border-white/[0.06] p-8 hover:bg-white/[0.02] transition-all group">
            <Phone className="h-8 w-8 mb-4" style={{ color: '#c9a96e' }} />
            <h2 className="text-white font-bold text-xl mb-2">Call Us</h2>
            <p className="text-white/40 text-sm mb-4">For urgent bookings or quick questions.</p>
            <p className="font-bold text-sm group-hover:underline" style={{ color: '#c9a96e' }}>(561) 552-0392</p>
          </a>

          {/* For Models */}
          <Link href="/join" className="border border-white/[0.06] p-8 hover:bg-white/[0.02] transition-all group">
            <Crown className="h-8 w-8 mb-4" style={{ color: '#c9a96e' }} />
            <h2 className="text-white font-bold text-xl mb-2">Want to Join Our Roster?</h2>
            <p className="text-white/40 text-sm mb-4">We&apos;re always looking for new talent.</p>
            <p className="font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all" style={{ color: '#c9a96e' }}>Apply Now <ChevronRight className="h-4 w-4" /></p>
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="border-t border-white/[0.06] pt-12">
          <h2 className="text-white font-bold text-2xl mb-6 text-center">Looking to Book?</h2>
          <p className="text-white/40 text-center text-sm mb-8 max-w-lg mx-auto">Skip the email — book directly through our platform in under 2 minutes.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/model-booking" className="px-10 py-5 text-[13px] font-bold tracking-widest uppercase hover:opacity-80 transition-all" style={{ backgroundColor: '#c9a96e', color: '#000' }}>
              Start Booking
            </Link>
            <Link href="/marketplace" className="px-10 py-5 border border-white/15 text-white text-[13px] font-bold tracking-widest uppercase hover:border-white/30 transition-all">
              Browse Talent
            </Link>
          </div>
        </div>
      </div>

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
                  <li><Link href="/model-booking" className="text-white/60 hover:text-white transition-colors text-sm">Book Now</Link></li>
                </ul>
              </div>
              <div>
                <p className="text-white/20 text-[9px] tracking-widest uppercase mb-6">Services</p>
                <ul className="space-y-3">
                  <li><Link href="/services/content" className="text-white/40 hover:text-white transition-colors text-sm">Social Media Content</Link></li>
                  <li><Link href="/services/business" className="text-white/40 hover:text-white transition-colors text-sm">Business Content</Link></li>
                  <li><Link href="/services/shoots" className="text-white/40 hover:text-white transition-colors text-sm">Shoots & Videos</Link></li>
                  <li><Link href="/services/commercials" className="text-white/40 hover:text-white transition-colors text-sm">Commercials</Link></li>
                  <li><Link href="/services/events" className="text-white/40 hover:text-white transition-colors text-sm">Event Models</Link></li>
                </ul>
              </div>
              <div>
                <p className="text-white/20 text-[9px] tracking-widest uppercase mb-6">Info</p>
                <ul className="space-y-3">
                  <li><Link href="/about" className="text-white/40 hover:text-white transition-colors text-sm">About</Link></li>
                  <li><Link href="/faq" className="text-white/40 hover:text-white transition-colors text-sm">FAQ</Link></li>
                  <li><Link href="/contact" className="text-white/40 hover:text-white transition-colors text-sm">Contact</Link></li>
                  <li><Link href="/join" className="text-white/40 hover:text-white transition-colors text-sm">Join Our Roster</Link></li>
                  <li><Link href="/terms" className="text-white/40 hover:text-white transition-colors text-sm">Terms</Link></li>                </ul>
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
