import Link from 'next/link';

export const metadata = {
  title: 'Bottle Girls Boca Raton | Influence',
  description: 'Book Brand Ambassadors and hostesses for clubs, private events, and activations in South Florida.',
};

export default function LandingPage_bottle_girls_boca_raton() {
  return (
    <main className="min-h-screen bg-black text-white font-sans">

      {/* Hero */}
      <section className="relative px-6 pt-20 pb-16 text-center max-w-4xl mx-auto">
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#c9a96e] mb-4">Influence</p>
        <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
          Bottle Girls Boca Raton
        </h1>
        <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Book Brand Ambassadors and hostesses for clubs, private events, and activations in South Florida.
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
            href="/event-creators"
            className="px-8 py-4 border border-white/20 text-white font-bold text-sm tracking-widest uppercase hover:border-[#c9a96e] transition-colors"
          >
            View Event Creators
          </Link>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="border-y border-white/[0.06] py-6">
        <div className="max-w-4xl mx-auto px-6 flex flex-wrap justify-center gap-8">
          <span className="text-white/40 text-[12px] tracking-widest uppercase">Top South FL Venues</span>
          <span className="text-white/40 text-[12px] tracking-widest uppercase">Palm Beach to Miami</span>
          <span className="text-white/40 text-[12px] tracking-widest uppercase">Vetted Professionals</span>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="border border-white/[0.08] bg-[#0a0a0a] p-8">
            <div className="text-3xl mb-4">🥂</div>
            <h3 className="text-xl font-bold mb-3">Bottle Girls & VIP Service</h3>
            <p className="text-white/50 text-sm leading-relaxed">Professional, reliable bottle service creators for clubs, lounges and private events.</p>
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

      {/* CTA */}
      <section className="bg-[#0a0a0a] border-t border-white/[0.06] py-20 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-black mb-4">Book a creator</h2>
        <p className="text-white/50 mb-10 max-w-xl mx-auto">Tell us the date and what you need. We match Brand Ambassadors and influencers in South Florida.</p>
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
