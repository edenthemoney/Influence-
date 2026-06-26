import Link from 'next/link';

export const metadata = {
  title: 'Social Media Content Creation for Your Brand | Influence Models Agency',
  description: 'Verified creators deliver scroll-stopping content — reels, reviews & campaigns — ready to post in 48 hours.',
};

export default function LandingPage_social_media_content_creation() {
  return (
    <main className="min-h-screen bg-black text-white font-sans">

      {/* Hero */}
      <section className="relative px-6 pt-20 pb-16 text-center max-w-4xl mx-auto">
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#c9a96e] mb-4">Influence Models Agency</p>
        <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
          Social Media Content Creation for Your Brand
        </h1>
        <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Verified creators deliver scroll-stopping content — reels, reviews & campaigns — ready to post in 48 hours.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/quote"
            className="px-8 py-4 text-black font-bold text-sm tracking-widest uppercase"
            style={{ backgroundColor: '#c9a96e' }}
          >
            Get a Free Quote
          </Link>
          <Link
            href="/services"
            className="px-8 py-4 border border-white/20 text-white font-bold text-sm tracking-widest uppercase hover:border-[#c9a96e] transition-colors"
          >
            Browse Services
          </Link>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="border-y border-white/[0.06] py-6">
        <div className="max-w-4xl mx-auto px-6 flex flex-wrap justify-center gap-8">
          <span className="text-white/40 text-[12px] tracking-widest uppercase">500+ Brands Served</span>
          <span className="text-white/40 text-[12px] tracking-widest uppercase">South Florida Based</span>
          <span className="text-white/40 text-[12px] tracking-widest uppercase">48-Hr Turnaround</span>
          <span className="text-white/40 text-[12px] tracking-widest uppercase">No Lock-In Contracts</span>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="border border-white/[0.08] bg-[#0a0a0a] p-8">
            <div className="text-3xl mb-4">🎬</div>
            <h3 className="text-xl font-bold mb-3">UGC Content & Reels</h3>
            <p className="text-white/50 text-sm leading-relaxed">Creators visit your location or film on their own — delivering polished, brand-ready content.</p>
          </div>
          <div className="border border-white/[0.08] bg-[#0a0a0a] p-8">
            <div className="text-3xl mb-4">📣</div>
            <h3 className="text-xl font-bold mb-3">Influencer Campaigns</h3>
            <p className="text-white/50 text-sm leading-relaxed">Coordinated multi-creator rollouts with synchronized posting and real measurable reach.</p>
          </div>
          <div className="border border-white/[0.08] bg-[#0a0a0a] p-8">
            <div className="text-3xl mb-4">📸</div>
            <h3 className="text-xl font-bold mb-3">Photo & Brand Shoots</h3>
            <p className="text-white/50 text-sm leading-relaxed">Camera-ready models for lookbooks, e-comm, editorials and product campaigns.</p>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="border-t border-white/[0.06] py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xl text-white/80 italic leading-relaxed mb-6">
            &ldquo;We saw a 4x increase in engagement within the first week. The content was exactly on-brand.&rdquo;
          </p>
          <p className="text-[#c9a96e] text-sm font-bold tracking-widest uppercase">Marketing Director, South FL Brand</p>
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
          Get a Free Quote →
        </Link>
      </section>

    </main>
  );
}
