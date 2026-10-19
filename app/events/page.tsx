/* eslint-disable @next/next/no-img-element -- pre-sized WebP event images */
import type { Metadata } from 'next';
import Link from 'next/link';
import MobileNav from '../components/MobileNav';
import { EVENTS } from '@/lib/events';
import EventsList from './events-list';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Events',
  description: 'Upcoming Influence events in South Florida: creator meet and greets, brand nights and networking.',
  alternates: { canonical: 'https://influencecreators.marketing/events' },
};

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <nav className="border-b border-white/[0.06] bg-[#080808]/95 backdrop-blur-xl fixed w-full z-50">
        <div className="flex items-center justify-between h-16 md:h-20 px-6 md:px-14">
          <div className="flex items-center gap-4">
            <MobileNav />
            <div className="hidden md:flex items-center gap-10">
              <Link href="/marketplace" className="text-white/55 hover:text-white transition-colors duration-300 text-[11px] tracking-widest uppercase">Creators</Link>
              <Link href="/services" className="text-white/55 hover:text-white transition-colors duration-300 text-[11px] tracking-widest uppercase">Services</Link>
              <Link href="/events" className="text-white hover:text-white transition-colors duration-300 text-[11px] tracking-widest uppercase">Events</Link>
            </div>
          </div>
          <Link href="/" className="font-display font-semibold tracking-[0.4em] uppercase" style={{ fontSize: '18px', color: '#c9a96e' }}>Influence</Link>
          <div className="flex items-center gap-10">
            <Link href="/about" className="text-white/55 hover:text-white transition-colors duration-300 text-[11px] tracking-widest uppercase hidden md:block">About</Link>
            <Link href="/start" className="text-[11px] md:text-[12px] tracking-widest uppercase px-5 py-3 md:px-8 md:py-4 transition-all duration-300 hover:opacity-80 font-bold" style={{ backgroundColor: '#c9a96e', color: '#000' }}>Book Now</Link>
          </div>
        </div>
      </nav>
      <section className="pt-32 pb-10 px-6 md:px-14 max-w-6xl mx-auto">
        <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-5" style={{ color: '#c9a96e' }}>Influence Events</p>
        <h1 className="font-display font-bold italic leading-[0.95]" style={{ fontSize: 'clamp(44px, 8vw, 96px)' }}>
          Upcoming <span style={{ color: '#c9a96e' }}>events</span>
        </h1>
      </section>
      <EventsList events={EVENTS} />
    </div>
  );
}
