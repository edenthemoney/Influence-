'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const GOLD = '#c9a96e';
const links = [
  { href: '/marketplace', label: 'Talent' },
  { href: '/services', label: 'Services' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/faq', label: 'FAQ' },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)} className="md:hidden" aria-label="Open menu">
        <Menu className="h-5 w-5 text-white/70" />
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] flex flex-col" style={{ backgroundColor: '#080808' }}>
          <div className="flex items-center justify-between px-8 h-16 border-b border-white/[0.06]">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="font-display font-semibold tracking-[0.4em] uppercase"
              style={{ fontSize: '18px', color: GOLD }}
            >
              Influence
            </Link>
            <button onClick={() => setOpen(false)} aria-label="Close menu">
              <X className="h-5 w-5 text-white/60" />
            </button>
          </div>

          <nav className="flex-1 flex flex-col justify-center px-8">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="font-display font-light italic text-white border-b border-white/[0.06] py-6 flex items-center justify-between group"
                style={{ fontSize: 'clamp(38px, 11vw, 58px)' }}
              >
                <span>{label}</span>
                <span className="text-white/30 text-[11px] tracking-widest uppercase not-italic font-sans group-hover:text-white/60 transition-colors">→</span>
              </Link>
            ))}
          </nav>

          <div className="px-8 pb-14 pt-8">
            <Link
              href="/start"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center w-full py-5 font-bold text-[14px] tracking-widest uppercase"
              style={{ backgroundColor: GOLD, color: '#000' }}
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
