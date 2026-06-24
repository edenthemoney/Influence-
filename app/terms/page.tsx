import Link from 'next/link';
import type { Metadata } from 'next';
import MobileNav from '../components/MobileNav';

export const metadata: Metadata = {
  title: 'Terms of Service — Influence',
  description: 'Terms of service for Influence influencer marketing agency. Read our policies on bookings, payments, content delivery, and usage.',
  alternates: {
    canonical: 'https://influencemodels.agency/terms',
  },
};

export default function TermsPage() {
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

      <div className="pt-32 pb-20 px-6 md:px-14 max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-display font-bold italic text-white leading-[0.9] mb-6" style={{ fontSize: 'clamp(36px, 6vw, 72px)' }}>Terms of Service</h1>
          <p className="text-white/35 text-sm">Last updated: May 2025</p>
        </div>

        <div className="space-y-10 text-white/60 text-[15px] leading-relaxed">
          <section>
            <h2 className="text-white font-bold text-xl mb-4">1. Overview</h2>
            <p>
              These Terms of Service (&quot;Terms&quot;) govern your use of the Influence website (influencemodels.agency) and services operated by Influence (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). By accessing our website or purchasing services, you agree to these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-xl mb-4">2. Services</h2>
            <p>
              Influence provides influencer marketing services including but not limited to: UGC content creation, music promotion and reaction videos, event hosting and model bookings, brand campaign management, and social media content. Services are described on our website and selected during the booking process.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-xl mb-4">3. Bookings & Payments</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>All bookings are confirmed upon successful payment through our secure Stripe checkout.</li>
              <li>Prices displayed at checkout are final. No hidden fees are added after purchase.</li>
              <li>Payment is required in full at the time of booking.</li>
              <li>We accept all major credit cards and debit cards through Stripe.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-bold text-xl mb-4">4. Content Delivery</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Content is delivered within the timeframe specified at booking (typically 48 hours for remote content, varies for in-person).</li>
              <li>You will receive content via email or direct message as agreed during booking.</li>
              <li>If content requires revisions, we will work with the assigned influencer to address concerns.</li>
              <li>Content usage rights are granted upon full payment and delivery.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-bold text-xl mb-4">5. Cancellations & Refunds</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>All sales are final. No refunds are issued once a booking is confirmed and payment is processed.</li>
              <li>By completing checkout, you acknowledge and agree to this no-refund policy.</li>
              <li>We are committed to delivering the agreed content and services as described at the time of booking.</li>
              <li>For questions or concerns about your order, contact influencemodelsagency@gmail.com.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-bold text-xl mb-4">6. Content Rights & Usage</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Upon delivery and full payment, you receive a license to use the content for the agreed promotional purposes.</li>
              <li>Influencers retain the right to display content in their own portfolios.</li>
              <li>Content may not be resold or sublicensed to third parties without written permission.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-bold text-xl mb-4">7. Client Responsibilities</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Provide accurate campaign details, instructions, and materials in a timely manner.</li>
              <li>Respond to approval requests within 48 hours to avoid delivery delays.</li>
              <li>Do not request content that violates any laws or platform terms of service.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-bold text-xl mb-4">8. Limitation of Liability</h2>
            <p>
              Influence provides marketing services and cannot guarantee specific results such as follower counts, stream numbers, or sales. We guarantee delivery of the agreed content and services. Results depend on market conditions, audience reception, and other factors outside our control.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-xl mb-4">9. Privacy</h2>
            <p>
              We collect only the information necessary to fulfill your booking (email, campaign details). We do not sell your personal information. Payment information is processed securely through Stripe and never stored on our servers.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-xl mb-4">10. Changes to Terms</h2>
            <p>
              We may update these Terms from time to time. Changes will be posted on this page with an updated date. Continued use of our services constitutes acceptance of any changes.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-xl mb-4">11. Contact</h2>
            <p>
              Questions about these Terms? Contact us at{' '}
              <a href="mailto:influencemodelsagency@gmail.com" className="underline" style={{ color: '#c9a96e' }}>influencemodelsagency@gmail.com</a>.
            </p>
          </section>
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
