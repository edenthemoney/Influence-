import Link from 'next/link';

export const metadata = {
  title: 'Promote My Music — Cast & Promote Fast | Influence Models Agency',
  description: 'Book verified talent for your music video and get creators to promote your song on TikTok & Instagram.',
};

export default function LandingPage_promote_my_music() {
  return (
    <main className="min-h-screen bg-black text-white font-sans">

      {/* Hero */}
      <section className="relative px-6 pt-20 pb-16 text-center max-w-4xl mx-auto">
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#c9a96e] mb-4">Influence Models Agency</p>
        <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
          Promote My Music — Cast & Promote Fast
        </h1>
        <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Book verified talent for your music video and get creators to promote your song on TikTok & Instagram.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/music-video-booking"
            className="px-8 py-4 text-black font-bold text-sm tracking-widest uppercase"
            style={{ backgroundColor: '#c9a96e' }}
          >
            Book Video Talent
          </Link>
          <Link
            href="/model-booking?service=reaction"
            className="px-8 py-4 border border-white/20 text-white font-bold text-sm tracking-widest uppercase hover:border-[#c9a96e] transition-colors"
          >
            Promote My Music
          </Link>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="border-y border-white/[0.06] py-6">
        <div className="max-w-4xl mx-auto px-6 flex flex-wrap justify-center gap-8">
          <span className="text-white/40 text-[12px] tracking-widest uppercase">100+ Music Videos Cast</span>
          <span className="text-white/40 text-[12px] tracking-widest uppercase">South Florida Based</span>
          <span className="text-white/40 text-[12px] tracking-widest uppercase">Solo to Full Squad</span>
          <span className="text-white/40 text-[12px] tracking-widest uppercase">24-Hr Booking</span>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="border border-white/[0.08] bg-[#0a0a0a] p-8">
            <div className="text-3xl mb-4">🎵</div>
            <h3 className="text-xl font-bold mb-3">Music Video Casting</h3>
            <p className="text-white/50 text-sm leading-relaxed">Solo features, duo, trio or full casts — all verified, styled and camera-ready on set.</p>
          </div>
          <div className="border border-white/[0.08] bg-[#0a0a0a] p-8">
            <div className="text-3xl mb-4">📱</div>
            <h3 className="text-xl font-bold mb-3">Song Reactions & Promo</h3>
            <p className="text-white/50 text-sm leading-relaxed">Creators react to your track on camera — authentic content that drives streams and saves.</p>
          </div>
          <div className="border border-white/[0.08] bg-[#0a0a0a] p-8">
            <div className="text-3xl mb-4">🚀</div>
            <h3 className="text-xl font-bold mb-3">Influencer Music Campaigns</h3>
            <p className="text-white/50 text-sm leading-relaxed">Multi-creator coordinated drops to maximize your release day reach across platforms.</p>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="border-t border-white/[0.06] py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xl text-white/80 italic leading-relaxed mb-6">
            &ldquo;Booked a full cast for my music video in less than 24 hours. Professional, on time, and the content was 🔥&rdquo;
          </p>
          <p className="text-[#c9a96e] text-sm font-bold tracking-widest uppercase">Independent Artist, Miami FL</p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0a0a0a] border-t border-white/[0.06] py-20 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-black mb-4">Ready to Get Started?</h2>
        <p className="text-white/50 mb-10 max-w-xl mx-auto">No lock-in contracts. Fast turnaround. South Florida&apos;s top talent agency.</p>
        <Link
          href="/music-video-booking"
          className="inline-block px-10 py-5 text-black font-bold text-sm tracking-widest uppercase"
          style={{ backgroundColor: '#c9a96e' }}
        >
          Book Video Talent →
        </Link>
      </section>

    </main>
  );
}
