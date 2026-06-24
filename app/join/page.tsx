'use client';

import Link from 'next/link';
import MobileNav from '../components/MobileNav';
import { Crown, Camera, Instagram, DollarSign, MapPin, ChevronRight, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function JoinPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    instagram: '',
    location: '',
    experience: '',
    services: [] as string[],
    portfolio: '',
    message: '',
  });

  const serviceOptions = [
    'UGC / Reels / TikToks',
    'Music Video Modeling',
    'Event Hosting / Appearances',
    'Brand Photoshoots',
    'Fashion / Runway',
    'Music Reactions / Livestreams',
  ];

  const toggleService = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/submit-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Submission failed');
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please email us directly at influencemodelsagency@gmail.com');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <CheckCircle className="h-16 w-16 mx-auto mb-6" style={{ color: '#c9a96e' }} />
          <h1 className="font-display font-bold italic text-white text-4xl mb-4">Application Sent!</h1>
          <p className="text-white/50 mb-8">Thank you for your interest in joining Influence. We&apos;ll review your application and get back to you within 48 hours.</p>
          <Link href="/" className="px-10 py-5 text-[13px] font-bold tracking-widest uppercase hover:opacity-80 transition-all inline-block" style={{ backgroundColor: '#c9a96e', color: '#000' }}>
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

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

      <div className="pt-32 pb-20 px-6 md:px-14 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-5" style={{ color: '#c9a96e' }}>Join Our Roster</p>
          <h1 className="font-display font-bold italic text-white leading-[0.9] mb-6" style={{ fontSize: 'clamp(44px, 8vw, 96px)' }}>Become a Model</h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Join South Florida&apos;s premier influencer agency. Get booked for UGC content, music videos, brand campaigns, and events.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { icon: DollarSign, label: 'Get Paid', desc: 'Competitive rates per booking' },
            { icon: Camera, label: 'Get Booked', desc: 'Regular campaign opportunities' },
            { icon: Instagram, label: 'Grow Your Brand', desc: 'Exposure to new audiences' },
            { icon: MapPin, label: 'South Florida', desc: 'Local & remote opportunities' },
          ].map(({ icon: Icon, label, desc }) => (
            <div key={label} className="border border-white/[0.06] p-5 text-center">
              <Icon className="h-6 w-6 mx-auto mb-3" style={{ color: '#c9a96e' }} />
              <p className="text-white font-bold text-sm mb-1">{label}</p>
              <p className="text-white/35 text-xs">{desc}</p>
            </div>
          ))}
        </div>

        {/* Application Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-white/40 text-[10px] tracking-widest uppercase block mb-2">Full Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full bg-[#111] border border-white/[0.08] px-4 py-3 text-white text-sm focus:border-[#c9a96e]/50 focus:outline-none transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="text-white/40 text-[10px] tracking-widest uppercase block mb-2">Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full bg-[#111] border border-white/[0.08] px-4 py-3 text-white text-sm focus:border-[#c9a96e]/50 focus:outline-none transition-colors"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="text-white/40 text-[10px] tracking-widest uppercase block mb-2">Instagram Handle *</label>
              <input
                type="text"
                required
                value={formData.instagram}
                onChange={e => setFormData(prev => ({ ...prev, instagram: e.target.value }))}
                className="w-full bg-[#111] border border-white/[0.08] px-4 py-3 text-white text-sm focus:border-[#c9a96e]/50 focus:outline-none transition-colors"
                placeholder="@yourusername"
              />
            </div>
            <div>
              <label className="text-white/40 text-[10px] tracking-widest uppercase block mb-2">Location *</label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={e => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="w-full bg-[#111] border border-white/[0.08] px-4 py-3 text-white text-sm focus:border-[#c9a96e]/50 focus:outline-none transition-colors"
                placeholder="City, State"
              />
            </div>
          </div>

          <div>
            <label className="text-white/40 text-[10px] tracking-widest uppercase block mb-2">Experience Level</label>
            <select
              value={formData.experience}
              onChange={e => setFormData(prev => ({ ...prev, experience: e.target.value }))}
              className="w-full bg-[#111] border border-white/[0.08] px-4 py-3 text-white text-sm focus:border-[#c9a96e]/50 focus:outline-none transition-colors"
            >
              <option value="">Select experience level</option>
              <option value="beginner">Beginner (0-1 years)</option>
              <option value="intermediate">Intermediate (1-3 years)</option>
              <option value="experienced">Experienced (3-5 years)</option>
              <option value="professional">Professional (5+ years)</option>
            </select>
          </div>

          <div>
            <label className="text-white/40 text-[10px] tracking-widest uppercase block mb-3">Services You Can Offer</label>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {serviceOptions.map(service => (
                <button
                  key={service}
                  type="button"
                  onClick={() => toggleService(service)}
                  className={`px-4 py-3 text-sm font-medium border transition-all text-left ${
                    formData.services.includes(service)
                      ? 'border-[#c9a96e] bg-[#c9a96e]/10 text-white'
                      : 'border-white/[0.08] text-white/50 hover:border-white/20'
                  }`}
                >
                  {service}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-white/40 text-[10px] tracking-widest uppercase block mb-2">Portfolio Link (optional)</label>
            <input
              type="url"
              value={formData.portfolio}
              onChange={e => setFormData(prev => ({ ...prev, portfolio: e.target.value }))}
              className="w-full bg-[#111] border border-white/[0.08] px-4 py-3 text-white text-sm focus:border-[#c9a96e]/50 focus:outline-none transition-colors"
              placeholder="https://your-portfolio.com or link to your work"
            />
          </div>

          <div>
            <label className="text-white/40 text-[10px] tracking-widest uppercase block mb-2">Anything Else? (optional)</label>
            <textarea
              value={formData.message}
              onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
              rows={4}
              className="w-full bg-[#111] border border-white/[0.08] px-4 py-3 text-white text-sm focus:border-[#c9a96e]/50 focus:outline-none transition-colors resize-none"
              placeholder="Tell us about yourself, your experience, notable credits, etc."
            />
          </div>

          {error && (
            <p className="text-red-400/80 text-sm text-center">{error}</p>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-5 text-[13px] font-bold tracking-widest uppercase hover:opacity-80 transition-all disabled:opacity-50"
            style={{ backgroundColor: '#c9a96e', color: '#000' }}
          >
            {submitting ? 'Sending...' : 'Submit Application'}
          </button>

          <p className="text-white/25 text-xs text-center">
            By submitting, you agree to be contacted by Influence regarding modeling opportunities.
          </p>
        </form>
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
                  <li><Link href="/model-booking?service=bottle" className="text-white/40 hover:text-white transition-colors text-sm">Bottle Girls / VIP</Link></li>
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
