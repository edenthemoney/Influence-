import Link from 'next/link';
import { Suspense } from 'react';
import { Check, Crown, ChevronRight } from 'lucide-react';
import MobileNav from '../../components/MobileNav';
import { BookingSuccessTracker } from './tracker';
import { PostBookingForm } from './post-booking-form';

const gold = '#c9a96e';

export default function BookingSuccessPage() {
  return (
    <div className="min-h-screen bg-[#080808]">
      <Suspense fallback={null}><BookingSuccessTracker /></Suspense>

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
            <Link href="/model-booking" className="text-[11px] md:text-[12px] tracking-widest uppercase px-5 py-3 md:px-8 md:py-4 transition-all duration-300 hover:opacity-80 font-bold" style={{ backgroundColor: gold, color: '#000' }}>Book Again</Link>
          </div>
        </div>
      </nav>

      {/* Success Content */}
      <div className="pt-32 md:pt-44 pb-20 px-6 md:px-14 max-w-3xl mx-auto text-center">
        <div className="w-20 h-20 mx-auto mb-8 flex items-center justify-center" style={{ backgroundColor: gold }}>
          <Check className="h-10 w-10 text-black" />
        </div>
        <h1 className="font-display font-bold italic text-white leading-[0.9] mb-4" style={{ fontSize: 'clamp(40px, 7vw, 80px)' }}>
          Booking Confirmed.
        </h1>
        <p className="text-white/50 text-lg mb-12 max-w-lg mx-auto">
          Payment received. Now fill in the details so we can get started.
        </p>

        <div className="mb-10">
          <Suspense fallback={null}><PostBookingForm /></Suspense>
        </div>

        <div className="border border-white/[0.06] bg-[#0a0a0a] p-8 md:p-10 text-left mb-10">
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6" style={{ color: gold }}>Next Steps</p>
          <div className="space-y-5">
            {[
              { num: '01', text: 'Confirmation email sent to your inbox with all booking details' },
              { num: '02', text: 'Our team matches you with the right model or influencer' },
              { num: '03', text: 'You provide your creative brief and any campaign direction' },
              { num: '04', text: 'Content is created and delivered for your approval' },
            ].map(({ num, text }) => (
              <div key={num} className="flex items-start gap-4">
                <span className="font-display font-bold italic text-xl shrink-0" style={{ color: gold }}>{num}</span>
                <p className="text-white/60 text-[15px] leading-relaxed pt-0.5">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/model-booking" className="inline-flex items-center justify-center gap-2 px-10 py-5 text-[12px] font-bold tracking-widest uppercase transition-all hover:opacity-80" style={{ backgroundColor: gold, color: '#000' }}>
            Book Another Service <ChevronRight className="h-4 w-4" />
          </Link>
          <Link href="/marketplace" className="inline-flex items-center justify-center gap-2 px-10 py-5 text-[12px] font-bold tracking-widest uppercase border border-white/10 text-white/50 hover:text-white hover:border-white/20 transition-all">
            Browse Talent
          </Link>
        </div>

        <div className="border-t border-white/[0.06] pt-8">
          <div className="flex items-center justify-center gap-3 text-white/35 text-sm">
            <Crown className="h-4 w-4" style={{ color: gold }} />
            <span>Need help? <a href="mailto:influencemodelsagency@gmail.com" className="underline hover:text-white transition-colors" style={{ color: gold }}>influencemodelsagency@gmail.com</a> or <a href="tel:+15615520392" className="underline hover:text-white transition-colors" style={{ color: gold }}>(561) 552-0392</a></span>
          </div>
        </div>
      </div>
    </div>
  );
}
