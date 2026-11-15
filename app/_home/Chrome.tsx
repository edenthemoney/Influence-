import Link from 'next/link';
import MobileNav from '../components/MobileNav';

export const GOLD = '#c9a96e';
export const BOOK_HREF = '/start';

export function PreviewNav({ variant }: { variant: string }) {
  return (
    <nav className={`fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] ${variant === 'E' ? 'bg-[#080808]' : 'bg-[#080808]/95 backdrop-blur-xl'}`} aria-label={`Main (${variant})`}>
      <div className="flex h-16 items-center justify-between gap-2 px-4 md:h-20 md:px-14">
        <div className="flex min-w-0 items-center gap-3">
          <MobileNav />
          <div className="hidden items-center gap-8 md:flex">
            <Link href="/marketplace" className="text-[13px] uppercase tracking-[0.14em] text-white/90 hover:text-white">Creators</Link>
            <Link href="/services" className="text-[13px] uppercase tracking-[0.14em] text-white/90 hover:text-white">Services</Link>
            <Link href="/dec16" className="text-[13px] uppercase tracking-[0.14em] text-white/90 hover:text-white">Events</Link>
          </div>
        </div>
        <Link href="/" className="shrink-0 whitespace-nowrap font-display text-[18px] font-semibold uppercase tracking-[0.4em]" style={{ color: GOLD }}>
          Influence
        </Link>
        <div className="flex shrink-0 items-center justify-end gap-2 md:gap-8">
          <Link href="/join" className="hidden text-[13px] uppercase tracking-[0.14em] text-white/90 hover:text-white md:block">Join</Link>
          <Link href={BOOK_HREF} className="whitespace-nowrap px-3 py-2.5 text-[13px] font-bold uppercase tracking-[0.12em] md:px-8 md:py-4" style={{ backgroundColor: GOLD, color: '#000' }}>
            <span className="md:hidden">Book</span>
            <span className="hidden md:inline">Book talent</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export function PreviewFooter() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#080808]">
      <div className="mx-auto max-w-7xl px-6 pb-10 pt-16 md:px-16">
        <div className="mb-14 flex flex-col justify-between gap-12 md:flex-row">
          <div>
            <Link href="/" className="font-display text-[17px] font-semibold uppercase tracking-[0.4em]" style={{ color: GOLD }}>Influence</Link>
            <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-white/75">Brand Ambassadors, creators, and talent for South Florida venues and brands.</p>
          </div>
          <div className="grid grid-cols-2 gap-10 md:grid-cols-3 md:gap-20">
            <div>
              <p className="mb-5 text-[13px] uppercase tracking-[0.18em] text-white/60">Book</p>
              <ul className="space-y-3 text-[15px] text-white/85">
                <li><Link href={BOOK_HREF}>Start a booking</Link></li>
                <li><Link href="/services">All services</Link></li>
                <li><Link href="/marketplace">Browse the roster</Link></li>
                <li><Link href="/dec16">Networking night</Link></li>
              </ul>
            </div>
            <div>
              <p className="mb-5 text-[13px] uppercase tracking-[0.18em] text-white/60">Creators</p>
              <ul className="space-y-3 text-[15px] text-white/85">
                <li><Link href="/join">Join the roster</Link></li>
                <li><Link href="/faq">FAQ</Link></li>
                <li><Link href="/starter" className="text-white/60">Starter</Link></li>
              </ul>
            </div>
            <div>
              <p className="mb-5 text-[13px] uppercase tracking-[0.18em] text-white/60">Contact</p>
              <ul className="space-y-3 text-[15px] text-white/85">
                <li><a href="tel:+15612877194">(561) 287-7194</a></li>
                <li><a href="mailto:influencemodelsagency@gmail.com">Email us</a></li>
                <li><a href="https://instagram.com/influencecreators.marketing" rel="noopener noreferrer" target="_blank">Instagram</a></li>
              </ul>
            </div>
          </div>
        </div>
        <p className="text-[13px] text-white/60">© {new Date().getFullYear()} Influence · Miami &amp; Boca Raton, FL</p>
      </div>
    </footer>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-[13px] font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>{children}</p>;
}

export function Headline({ children, size = 'clamp(40px, 7vw, 84px)', as: Tag = 'h2' }: { children: React.ReactNode; size?: string; as?: 'h1' | 'h2' }) {
  return (
    <Tag className="font-display font-bold italic leading-[0.92] text-white" style={{ fontSize: size }}>
      {children}
    </Tag>
  );
}
