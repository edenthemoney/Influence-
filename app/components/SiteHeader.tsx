import Link from 'next/link';
import MobileNav from './MobileNav';

const gold = '#c9a96e';
const ink = '#0c0c0c';

export default function SiteHeader() {
  return (
    <header data-site-header className="relative z-20 bg-[#0c0c0c]">
      <div className="flex items-center justify-between gap-3 h-16 px-4 md:h-[4.5rem] md:px-10">
        <div className="flex items-center gap-3">
          <MobileNav />
          <Link
            href="/"
            className="shrink-0 whitespace-nowrap font-display font-semibold uppercase text-[#c9a96e] text-[16px] tracking-[0.14em] md:text-[20px] md:tracking-[0.28em]"
          >
            INFLUENCE
          </Link>
        </div>
        <nav className="hidden xl:flex items-center gap-8 text-[13px] font-semibold uppercase tracking-[0.16em] text-[#f6f1e7]">
          <Link href="/marketplace" className="hover:text-[#c9a96e]">Creators</Link>
          <Link href="/services" className="hover:text-[#c9a96e]">Services</Link>
          <Link href="/tickets" className="hover:text-[#c9a96e]">Events</Link>
          <Link href="/about" className="hover:text-[#c9a96e]">About</Link>
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <Link href="/join" className="hidden md:inline-flex items-center min-h-11 px-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#f6f1e7] hover:text-[#c9a96e]">
            Join
          </Link>
          <Link
            href="/start"
            className="inline-flex items-center justify-center min-h-11 px-3 md:px-5 text-[13px] font-semibold uppercase tracking-[0.12em]"
            style={{ backgroundColor: gold, color: ink }}
          >
            <span className="md:hidden">Start</span>
            <span className="hidden md:inline">Start a Campaign</span>
          </Link>
        </div>
      </div>
      <div className="h-px w-full" style={{ backgroundColor: gold }} />
    </header>
  );
}
