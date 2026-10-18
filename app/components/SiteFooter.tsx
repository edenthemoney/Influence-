import Link from 'next/link';

const gold = '#c9a96e';

export default function SiteFooter() {
  return (
    <footer data-site-footer className="border-t border-white/10 bg-[#0c0c0c] px-5 py-12 text-[#f6f1e7] md:px-14 md:py-16">
      <div className="flex flex-col gap-10 md:flex-row md:justify-between">
        <div>
          <Link href="/" className="font-display text-[18px] font-semibold uppercase tracking-[0.22em]" style={{ color: gold }}>
            INFLUENCE
          </Link>
          <p className="mt-4 max-w-xs text-[16px] leading-relaxed text-[#f6f1e7]/80">
            Brand ambassadors and influencer marketing for South Florida.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 md:gap-16">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.16em]" style={{ color: gold }}>Contact</p>
            <ul className="mt-4 space-y-2 text-[16px]">
              <li><a href="tel:+15612877194" className="hover:text-[#c9a96e]">(561) 287-7194</a></li>
              <li><a href="mailto:influencemodelsagency@gmail.com" className="hover:text-[#c9a96e]">influencemodelsagency@gmail.com</a></li>
              <li>4756 NW 2nd Ave<br />Boca Raton, FL 33431</li>
              <li>
                <a href="https://www.instagram.com/influencecreators.marketing" target="_blank" rel="noopener noreferrer" className="hover:text-[#c9a96e]">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.16em]" style={{ color: gold }}>Work</p>
            <ul className="mt-4 space-y-2 text-[16px]">
              <li><Link href="/marketplace" className="hover:text-[#c9a96e]">Creators</Link></li>
              <li><Link href="/services" className="hover:text-[#c9a96e]">Services</Link></li>
              <li><Link href="/tickets" className="hover:text-[#c9a96e]">Events</Link></li>
              <li><Link href="/start" className="hover:text-[#c9a96e]">Start a campaign</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.16em]" style={{ color: gold }}>Studio</p>
            <ul className="mt-4 space-y-2 text-[16px]">
              <li><Link href="/about" className="hover:text-[#c9a96e]">About</Link></li>
              <li><Link href="/join" className="hover:text-[#c9a96e]">Join</Link></li>
              <li><Link href="/blog" className="hover:text-[#c9a96e]">Journal</Link></li>
              <li><Link href="/contact" className="hover:text-[#c9a96e]">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-[#c9a96e]">FAQ</Link></li>
              <li><Link href="/terms" className="hover:text-[#c9a96e]">Terms</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <p className="mt-12 text-[13px] text-[#f6f1e7]/70">© 2026 Influence · Miami &amp; Boca Raton, FL</p>
    </footer>
  );
}
