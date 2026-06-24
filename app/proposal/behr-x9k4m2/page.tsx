import Link from 'next/link';
import { Check, Music, Users, TrendingUp, Globe, Mail, Phone } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  robots: 'noindex, nofollow',
  title: 'Campaign Proposal — Behr | Influence',
};

const gold = '#c9a96e';

export default function BehrProposal() {
  return (
    <div className="min-h-screen bg-[#060606] text-white">
      {/* Header */}
      <header className="border-b border-white/[0.06] px-8 md:px-16 py-8 flex items-center justify-between">
        <div>
          <p className="font-display font-bold italic text-2xl text-white">INFLUENCE</p>
          <p className="text-white/30 text-[10px] tracking-[0.4em] uppercase mt-1">Influencer Marketing Agency</p>
        </div>
        <div className="text-right">
          <p className="text-white/40 text-[10px] tracking-[0.3em] uppercase">Proposal For</p>
          <p className="text-white font-display font-bold italic text-xl mt-1">Behr</p>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-8 md:px-16 py-16 md:py-24 border-b border-white/[0.06]">
        <p className="text-[10px] tracking-[0.5em] uppercase font-bold mb-6" style={{ color: gold }}>Custom Campaign Proposal</p>
        <h1 className="font-display font-bold italic text-white leading-[0.9] mb-6" style={{ fontSize: 'clamp(36px, 6vw, 72px)' }}>
          Targeted Social Media<br />& Sync Licensing Campaign
        </h1>
        <p className="text-white/50 text-lg max-w-2xl leading-relaxed">
          A comprehensive monthly campaign designed to maximize exposure for your 4-song catalog across social media, 
          streaming platforms, and industry decision-makers.
        </p>
      </section>

      {/* Artist & Songs */}
      <section className="px-8 md:px-16 py-14 border-b border-white/[0.06]">
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl">
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase font-bold mb-5" style={{ color: gold }}>Genre</p>
            <p className="text-white/70 text-lg">Pop Rock · Psychedelic Rock · Blues Rock</p>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase font-bold mb-5" style={{ color: gold }}>Songs (4)</p>
            <div className="space-y-3">
              {[
                { num: 1, title: 'She Ain\'t Easy', week: 'Week 1' },
                { num: 2, title: 'World Gone Crazy', week: 'Week 2' },
                { num: 3, title: 'Take Me Back', week: 'Week 3' },
                { num: 4, title: 'Riding Down the Road', week: 'Week 4' },
              ].map(song => (
                <div key={song.num} className="flex items-center gap-4 py-3 border-b border-white/[0.04]">
                  <div className="w-8 h-8 flex items-center justify-center text-[12px] font-bold" style={{ backgroundColor: gold, color: '#000' }}>
                    {song.num}
                  </div>
                  <p className="text-white font-semibold flex-1">{song.title}</p>
                  <span className="text-white/30 text-[11px] tracking-widest uppercase">{song.week}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service 1: Influencer Campaign */}
      <section className="px-8 md:px-16 py-16 border-b border-white/[0.06]">
        <div className="max-w-5xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 flex items-center justify-center" style={{ backgroundColor: gold }}>
              <Users className="h-6 w-6 text-black" />
            </div>
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase font-bold text-white/40">Service 1</p>
              <h2 className="text-white font-display font-bold italic text-2xl">Influencer Music Reaction Campaign</h2>
            </div>
          </div>

          <p className="text-white/50 text-[16px] leading-relaxed mb-10 max-w-3xl">
            We will custom tailor an in-depth, targeted social media campaign delivering <strong className="text-white">100+ reaction posts per month</strong> from 
            25 top-tier social influencers — each listening and reacting to your full 4-song catalog across their platforms.
          </p>

          {/* What's Included */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {[
              '100+ original reaction posts delivered every month',
              '25 verified influencers with 100K–1M+ followers each',
              'All 4 songs covered — 1 new song spotlighted each week',
              'Content posted on Instagram, YouTube & TikTok',
              'Organic reach: estimated 2.5M–10M+ impressions/month',
              'Authentic, in-depth song listening reactions',
              'Cross-platform engagement driving streams & saves',
              'Monthly performance report & analytics',
            ].map(item => (
              <div key={item} className="flex items-start gap-3">
                <Check className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: gold }} />
                <p className="text-white/60 text-[14px] leading-relaxed">{item}</p>
              </div>
            ))}
          </div>

          {/* Pricing */}
          <div className="border p-8" style={{ borderColor: gold, backgroundColor: 'rgba(201,169,110,0.02)' }}>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-white/40 text-[10px] tracking-[0.3em] uppercase font-bold mb-2">Monthly Investment</p>
                <p className="font-display font-bold italic text-white" style={{ fontSize: '42px' }}>$7,500<span className="text-white/30 text-lg font-normal">/month</span></p>
              </div>
              <div className="text-right">
                <p className="text-white/30 text-[11px]">100+ reaction posts/month</p>
                <p className="text-white/30 text-[11px]">across IG, TikTok & YouTube</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service 2: Sync Licensing */}
      <section className="px-8 md:px-16 py-16 border-b border-white/[0.06]">
        <div className="max-w-5xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 flex items-center justify-center" style={{ backgroundColor: gold }}>
              <TrendingUp className="h-6 w-6 text-black" />
            </div>
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase font-bold text-white/40">Service 2</p>
              <h2 className="text-white font-display font-bold italic text-2xl">Sync Licensing & Industry Outreach</h2>
            </div>
          </div>

          <p className="text-white/50 text-[16px] leading-relaxed mb-10 max-w-3xl">
            We will create a comprehensive plan and strategy to get your music in front of <strong className="text-white">top industry executives, 
            A&R representatives, and Spotify playlist curators</strong> from our extensive network of contacts.
          </p>

          {/* What's Included */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {[
              '75+ A&R and curator contacts reached per month',
              'Targeted sync licensing pitches for TV, film & ads',
              'Spotify playlist placement strategy & outreach',
              'Industry relationship building on your behalf',
              'Custom pitch decks for your catalog',
              'Direct submissions to music supervisors',
              'Monthly outreach report with responses',
              'Strategic positioning for licensing opportunities',
            ].map(item => (
              <div key={item} className="flex items-start gap-3">
                <Check className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: gold }} />
                <p className="text-white/60 text-[14px] leading-relaxed">{item}</p>
              </div>
            ))}
          </div>

          {/* Pricing */}
          <div className="border p-8" style={{ borderColor: gold, backgroundColor: 'rgba(201,169,110,0.02)' }}>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-white/40 text-[10px] tracking-[0.3em] uppercase font-bold mb-2">Monthly Investment</p>
                <p className="font-display font-bold italic text-white" style={{ fontSize: '42px' }}>$3,500<span className="text-white/30 text-lg font-normal">/month</span></p>
              </div>
              <div className="text-right">
                <p className="text-white/30 text-[11px]">75+ targeted outreach contacts</p>
                <p className="text-white/30 text-[11px]">A&R + Curators + Sync Supervisors</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Total */}
      <section className="px-8 md:px-16 py-16 border-b border-white/[0.06]">
        <div className="max-w-5xl">
          <p className="text-[10px] tracking-[0.4em] uppercase font-bold mb-8" style={{ color: gold }}>Investment Summary</p>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-between py-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-4">
                <Users className="h-5 w-5" style={{ color: gold }} />
                <span className="text-white font-semibold">Influencer Music Reaction Campaign</span>
              </div>
              <span className="text-white font-display font-bold italic text-xl">$7,500</span>
            </div>
            <div className="flex items-center justify-between py-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-4">
                <TrendingUp className="h-5 w-5" style={{ color: gold }} />
                <span className="text-white font-semibold">Sync Licensing & Industry Outreach</span>
              </div>
              <span className="text-white font-display font-bold italic text-xl">$3,500</span>
            </div>
          </div>

          <div className="flex items-end justify-between p-8" style={{ backgroundColor: gold }}>
            <div>
              <p className="text-black/60 text-[10px] tracking-[0.3em] uppercase font-bold mb-1">Total Monthly Investment</p>
              <p className="font-display font-bold italic text-black" style={{ fontSize: '52px', lineHeight: 1 }}>$11,000</p>
              <p className="text-black/50 text-sm mt-2">per month · billed monthly via Stripe</p>
            </div>
            <div className="text-right text-black/60 text-[13px]">
              <p>Campaign starts upon approval</p>
              <p>Cancel anytime with 30-day notice</p>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get (Value Stack) */}
      <section className="px-8 md:px-16 py-16 border-b border-white/[0.06]">
        <div className="max-w-5xl">
          <p className="text-[10px] tracking-[0.4em] uppercase font-bold mb-8" style={{ color: gold }}>Monthly Deliverables at a Glance</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: '100+', label: 'Posts Per Month', sub: 'Reaction videos across IG, TikTok & YouTube' },
              { num: '25', label: 'Influencers Working', sub: '100K–1M+ followers each' },
              { num: '75+', label: 'Industry Contacts', sub: 'A&R, curators & sync supervisors' },
            ].map(item => (
              <div key={item.label} className="text-center p-8 border border-white/[0.06]">
                <p className="font-display font-bold italic" style={{ fontSize: '48px', color: gold }}>{item.num}</p>
                <p className="text-white font-bold text-lg mt-2">{item.label}</p>
                <p className="text-white/35 text-sm mt-1">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-8 md:px-16 py-16 border-b border-white/[0.06]">
        <div className="max-w-5xl">
          <p className="text-[10px] tracking-[0.4em] uppercase font-bold mb-8" style={{ color: gold }}>Monthly Rollout Schedule</p>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { week: 'Week 1', song: 'She Ain\'t Easy', desc: '25 influencers react & post' },
              { week: 'Week 2', song: 'World Gone Crazy', desc: '25 influencers react & post' },
              { week: 'Week 3', song: 'Take Me Back', desc: '25 influencers react & post' },
              { week: 'Week 4', song: 'Riding Down the Road', desc: '25 influencers react & post' },
            ].map((w, i) => (
              <div key={w.week} className="p-6 border border-white/[0.06]">
                <div className="w-8 h-8 flex items-center justify-center text-[11px] font-bold mb-4" style={{ backgroundColor: gold, color: '#000' }}>
                  {i + 1}
                </div>
                <p className="text-white/40 text-[10px] tracking-widest uppercase mb-2">{w.week}</p>
                <p className="text-white font-bold text-[15px] mb-1">{w.song}</p>
                <p className="text-white/35 text-[12px]">{w.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-white/25 text-[12px] mt-6 italic">+ Sync licensing outreach runs continuously throughout the month</p>
        </div>
      </section>

      {/* Contact / CTA */}
      <section className="px-8 md:px-16 py-16">
        <div className="max-w-5xl text-center">
          <h2 className="font-display font-bold italic text-white text-3xl mb-4">Ready to Get Started?</h2>
          <p className="text-white/40 text-[15px] mb-10">Once approved, we'll activate your campaign within 48 hours.</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <a
              href="tel:+15615520392"
              className="flex items-center gap-3 px-8 py-5 font-bold text-[14px] tracking-[0.15em] uppercase transition-all hover:opacity-90"
              style={{ backgroundColor: gold, color: '#000' }}
            >
              <Phone className="h-5 w-5" />
              Call to Approve — (561) 552-0392
            </a>
            <a
              href="mailto:eden@influenceagency.com"
              className="flex items-center gap-3 px-8 py-5 border border-white/10 text-white/60 hover:text-white hover:border-white/20 font-bold text-[14px] tracking-[0.15em] uppercase transition-all"
            >
              <Mail className="h-5 w-5" />
              Email Us
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] px-8 md:px-16 py-8 flex items-center justify-between">
        <p className="text-white/20 text-[11px]">© 2024 Influence Agency · All Rights Reserved</p>
        <p className="text-white/20 text-[11px]">Confidential — prepared exclusively for Behr</p>
      </footer>
    </div>
  );
}
