import Link from 'next/link';

export const metadata = {
  title: 'Palm Beach Event Promotion — Book in 24 Hours | Influence Models Agency',
  description: 'Professional bottle girls, hostesses and VIP models for clubs, private events and brand activations across South Florida.',
};

export default function LandingPage_palm_beach_event_promotion() {
  return (
    <main className="min-h-screen bg-black text-white font-sans">

      {/* Hero */}
      <section className="relative px-6 pt-20 pb-16 text-center max-w-4xl mx-auto">
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#c9a96e] mb-4">Influence Models Agency</p>
        <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
          Palm Beach Event Promotion — Book in 24 Hours
        </h1>
        <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Professional bottle girls, hostesses and VIP models for clubs, private events and brand activations across South Florida.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/quote"
            className="px-8 py-4 text-black font-bold text-sm tracking-widest uppercase"
            style={{ backgroundColor: '#c9a96e' }}
          >
            Get a Free Event Quote
          </Link>
          <Link
            href="/event-talent"
            className="px-8 py-4 border border-white/20 text-white font-bold text-sm tracking-widest uppercase hover:border-[#c9a96e] transition-colors"
          >
            View Event Talent
          </Link>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="border-y border-white/[0.06] py-6">
        <div className="max-w-4xl mx-auto px-6 flex flex-wrap justify-center gap-8">
          <span className="text-white/40 text-[12px] tracking-widest uppercase">Top South FL Venues</span>
          <span className="text-white/40 text-[12px] tracking-widest uppercase">Palm Beach to Miami</span>
          <span className="text-white/40 text-[12px] tracking-widest uppercase">Vetted Professionals</span>
          <span className="text-white/40 text-[12px] tracking-widest uppercase">Book in 24 Hrs</span>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="border border-white/[0.08] bg-[#0a0a0a] p-8">
            <div className="text-3xl mb-4">🥂</div>
            <h3 className="text-xl font-bold mb-3">Bottle Girls & VIP Service</h3>
            <p className="text-white/50 text-sm leading-relaxed">Professional, reliable bottle service models for clubs, lounges and private events.</p>
          </div>
          <div className="border border-white/[0.08] bg-[#0a0a0a] p-8">
            <div className="text-3xl mb-4">🎉</div>
            <h3 className="text-xl font-bold mb-3">Brand Activations</h3>
            <p className="text-white/50 text-sm leading-relaxed">Trained hostesses and promo models who represent your brand with energy and professionalism.</p>
          </div>
          <div className="border border-white/[0.08] bg-[#0a0a0a] p-8">
            <div className="text-3xl mb-4">📸</div>
            <h3 className="text-xl font-bold mb-3">Event Content Creation</h3>
            <p className="text-white/50 text-sm leading-relaxed">Models who also capture and post content from your event — reach built in.</p>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="border-t border-white/[0.06] py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xl text-white/80 italic leading-relaxed mb-6">
            &ldquo;Best agency I've worked with. Showed up early, looked amazing, and kept the VIP section popping all night.&rdquo;
          </p>
          <p className="text-[#c9a96e] text-sm font-bold tracking-widest uppercase">Event Promoter, Boca Raton FL</p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0a0a0a] border-t border-white/[0.06] py-20 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-black mb-4">Ready to Get Started?</h2>
        <p className="text-white/50 mb-10 max-w-xl mx-auto">No lock-in contracts. Fast turnaround. South Florida&apos;s top talent agency.</p>
        <Link
          href="/quote"
          className="inline-block px-10 py-5 text-black font-bold text-sm tracking-widest uppercase"
          style={{ backgroundColor: '#c9a96e' }}
        >
          Get a Free Event Quote →
        </Link>
      </section>

    </main>
  );
}
