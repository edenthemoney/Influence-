'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Check, ChevronRight, Phone, ArrowRight, TrendingUp, Music, Sparkles, Camera, Play, Film, Wine } from 'lucide-react';
import MobileNav from '../components/MobileNav';

const gold = '#c9a96e';

const projectTypes = [
  { id: 'campaign', label: 'Influencer Campaign', icon: TrendingUp, desc: '3+ creators, coordinated launch' },
  { id: 'label', label: 'Label / Big-Budget Video', icon: Music, desc: '10+ talent, full production' },
  { id: 'musicvideo', label: 'Music Video', icon: Music, desc: '1–10 girls for your video' },
  { id: 'event', label: 'Event / VIP / Bottle Service', icon: Sparkles, desc: 'Hostesses for your venue or party' },
  { id: 'shoot', label: 'Photo / Video Shoot', icon: Camera, desc: 'Models for shoots & editorials' },
  { id: 'ugc', label: 'UGC Content / Reviews', icon: Play, desc: 'Creator content for your brand' },
  { id: 'commercial', label: 'Commercial / Speaking Role', icon: Film, desc: 'Scripted talent for ads' },
  { id: 'other', label: 'Something Else', icon: Wine, desc: 'Tell us what you need' },
];

const budgetOptions = [
  '$500 – $1,500',
  '$1,500 – $5,000',
  '$5,000 – $10,000',
  '$10,000 – $25,000',
  '$25,000+',
  'Not sure yet',
];

function QuoteForm() {
  const searchParams = useSearchParams();
  const [type, setType] = useState(searchParams.get('type') || '');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [budget, setBudget] = useState('');
  const [details, setDetails] = useState('');
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const leadName = sessionStorage.getItem('lead_name');
    const leadPhone = sessionStorage.getItem('lead_phone');
    const leadEmail = sessionStorage.getItem('lead_email');
    if (leadName) setName(leadName);
    if (leadPhone) setPhone(leadPhone);
    if (leadEmail) setEmail(leadEmail);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError('');

    try {
      const res = await fetch('/api/save-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          source: 'custom_quote_page',
          serviceType: type,
          packageName: budget,
          notes: details,
        }),
      });

      if (!res.ok) throw new Error('Failed to submit');
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please call or text us directly.');
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center px-6">
        <div className="text-center max-w-lg">
          <div className="w-16 h-16 flex items-center justify-center mx-auto mb-8 border-2" style={{ borderColor: gold }}>
            <Check className="h-8 w-8" style={{ color: gold }} />
          </div>
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-4" style={{ color: gold }}>Quote Request Sent</p>
          <h2 className="font-display font-light italic text-white text-4xl mb-4">
            We&apos;ll be in touch, {name.split(' ')[0]}.
          </h2>
          <p className="text-white/40 text-sm leading-relaxed mb-8">
            Our team reviews every quote request and will call or email you within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="px-8 py-4 text-sm font-bold tracking-widest uppercase text-black" style={{ backgroundColor: gold }}>
              Back to Home
            </Link>
            <Link href="/marketplace" className="px-8 py-4 border border-white/10 text-sm font-bold tracking-widest uppercase text-white/50 hover:text-white hover:border-white/30 transition-all">
              Browse Talent
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808]">
      {/* Nav */}
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
          <Link href="/" className="font-display font-semibold tracking-[0.4em] uppercase" style={{ fontSize: '18px', color: gold }}>Influence</Link>
          <div className="flex items-center gap-10">
            <Link href="/about" className="text-white/55 hover:text-white transition-colors duration-300 text-[11px] tracking-widest uppercase hidden md:block">About</Link>
            <Link href="/start" className="text-[11px] md:text-[12px] tracking-widest uppercase px-5 py-3 md:px-8 md:py-4 transition-all duration-300 hover:opacity-80 font-bold" style={{ backgroundColor: gold, color: '#000' }}>Book Now</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 md:pt-44 pb-12 md:pb-16 px-8 md:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6" style={{ color: gold }}>Custom Quote</p>
          <h1 className="font-display font-bold italic text-white leading-[0.9] mb-6" style={{ fontSize: 'clamp(40px, 7vw, 80px)' }}>
            Tell Us What<br />You Need.
          </h1>
          <p className="text-white/55 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            For campaigns, large productions, and custom projects. We&apos;ll reply within 24 hours with a plan and exact pricing.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="px-8 md:px-16 pb-20 md:pb-32">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Project Type */}
            <div>
              <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-4 text-white/40">Project Type</p>
              <div className="grid md:grid-cols-2 gap-3">
                {projectTypes.map((project) => {
                  const Icon = project.icon;
                  const selected = type === project.id;
                  return (
                    <button
                      key={project.id}
                      type="button"
                      onClick={() => setType(project.id)}
                      className={`flex items-start gap-4 p-4 border text-left transition-all ${selected ? 'border-[#c9a96e] bg-[#c9a96e]/[0.06]' : 'border-white/[0.08] bg-[#0a0a0a] hover:border-white/20'}`}
                    >
                      <div className={`w-10 h-10 border flex items-center justify-center flex-shrink-0 ${selected ? 'border-[#c9a96e]' : 'border-white/10'}`}>
                        <Icon className="h-5 w-5" style={{ color: selected ? gold : 'rgba(255,255,255,0.4)' }} />
                      </div>
                      <div>
                        <p className={`text-sm font-bold ${selected ? 'text-white' : 'text-white/70'}`}>{project.label}</p>
                        <p className="text-white/30 text-xs mt-1">{project.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-4 text-white/40">Your Info</p>
              <div className="grid md:grid-cols-3 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-12 bg-white/[0.03] border border-white/10 px-4 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#c9a96e]/50 transition-colors"
                />
                <input
                  type="email"
                  required
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 bg-white/[0.03] border border-white/10 px-4 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#c9a96e]/50 transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-12 bg-white/[0.03] border border-white/10 px-4 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#c9a96e]/50 transition-colors"
                />
              </div>
            </div>

            {/* Budget */}
            <div>
              <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-4 text-white/40">Budget Range</p>
              <div className="flex flex-wrap gap-3">
                {budgetOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setBudget(option)}
                    className={`px-5 py-3 text-[11px] font-bold tracking-wider uppercase border transition-all ${budget === option ? 'border-[#c9a96e] bg-[#c9a96e]/10 text-white' : 'border-white/10 text-white/40 hover:border-white/30 hover:text-white'}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Details */}
            <div>
              <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-4 text-white/40">Project Details</p>
              <textarea
                placeholder="Tell us about your project, dates, location, and anything else we should know..."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={5}
                className="w-full bg-white/[0.03] border border-white/10 p-4 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#c9a96e]/50 transition-colors resize-none"
              />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between pt-4">
              <button
                type="submit"
                disabled={sending || !type}
                className="inline-flex items-center justify-center gap-3 px-10 py-5 text-[13px] font-bold tracking-widest uppercase hover:opacity-85 transition-all disabled:opacity-50"
                style={{ backgroundColor: gold, color: '#000' }}
              >
                {sending ? 'Sending...' : 'Get My Quote'} <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href="tel:+15615520392"
                className="inline-flex items-center gap-2 text-[12px] font-bold tracking-widest uppercase text-white/40 hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4" /> Prefer to call? (561) 552-0392
              </a>
            </div>
          </form>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-t border-white/[0.06] bg-[#060606] py-12 md:py-16 px-8 md:px-16">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-8 md:gap-12">
          {['Verified Talent', '24-Hour Response', 'No Obligation', 'Label-Ready', 'South Florida'].map((badge) => (
            <span key={badge} className="text-white/30 text-[10px] tracking-widest uppercase flex items-center gap-2">
              <Check className="h-3 w-3" style={{ color: gold }} /> {badge}
            </span>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#080808] border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 md:px-16 pt-16 pb-10">
          <div className="flex flex-col md:flex-row justify-between gap-16 mb-16">
            <Link href="/" className="font-display font-semibold tracking-[0.4em] uppercase self-start shrink-0" style={{ fontSize: '17px', color: gold }}>Influence</Link>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-20">
              <div>
                <p className="text-white/40 text-[9px] tracking-widest uppercase mb-6">Work With Us</p>
                <ul className="space-y-3">
                  <li><Link href="/marketplace" className="text-white/60 hover:text-white transition-colors text-sm">Browse Talent</Link></li>
                  <li><Link href="/services" className="text-white/60 hover:text-white transition-colors text-sm">All Services</Link></li>
                  <li><Link href="/pricing" className="text-white/60 hover:text-white transition-colors text-sm">Packages</Link></li>
                  <li><Link href="/start" className="text-white/60 hover:text-white transition-colors text-sm">Book Now</Link></li>
                </ul>
              </div>
              <div>
                <p className="text-white/20 text-[9px] tracking-widest uppercase mb-6">Services</p>
                <ul className="space-y-3">
                  <li><Link href="/music-video-booking" className="text-white/40 hover:text-white transition-colors text-sm">Music Video Talent</Link></li>
                  <li><Link href="/ugc-content" className="text-white/40 hover:text-white transition-colors text-sm">UGC Content</Link></li>
                  <li><Link href="/event-talent" className="text-white/40 hover:text-white transition-colors text-sm">Event Talent</Link></li>
                  <li><Link href="/models-for-shoots" className="text-white/40 hover:text-white transition-colors text-sm">Models for Shoots</Link></li>
                </ul>
              </div>
              <div>
                <p className="text-white/20 text-[9px] tracking-widest uppercase mb-6">Info</p>
                <ul className="space-y-3">
                  <li><Link href="/about" className="text-white/40 hover:text-white transition-colors text-sm">About</Link></li>
                  <li><Link href="/faq" className="text-white/40 hover:text-white transition-colors text-sm">FAQ</Link></li>
                  <li><Link href="/contact" className="text-white/40 hover:text-white transition-colors text-sm">Contact</Link></li>
                  <li><Link href="/terms" className="text-white/40 hover:text-white transition-colors text-sm">Terms</Link></li>
                </ul>
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

export default function QuotePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <QuoteForm />
    </Suspense>
  );
}
