'use client';
import { useState } from 'react';
import posthog from 'posthog-js';
import { ChevronRight, Camera, Headphones, Sparkles, Play, Check, Music, TrendingUp, Film, Wine, Phone } from 'lucide-react';

const G = '#c9a96e';

type ServiceId = 'reaction' | 'ugc' | 'business' | 'musicvideo' | 'shoot' | 'commercial' | 'event' | 'bottle';
type PersonaId = 'brands' | 'music' | 'nightlife';

const personas: { id: PersonaId; Icon: React.ElementType; label: string; sub: string; services: ServiceId[] }[] = [
  { id: 'brands',    Icon: TrendingUp, label: 'Brands & Businesses', sub: 'UGC, reels, business content & commercials', services: ['business', 'ugc', 'commercial'] },
  { id: 'music',     Icon: Music,      label: 'Artists & Music',     sub: 'Music videos, reactions & photo shoots',     services: ['musicvideo', 'reaction', 'shoot'] },
  { id: 'nightlife', Icon: Sparkles,   label: 'Events & Nightlife',  sub: 'Event models, hosting & bottle girls',       services: ['event', 'bottle'] },
];

const allServices: Record<ServiceId, { Icon: React.ElementType; label: string; sub: string; badge: string }> = {
  reaction:   { Icon: Headphones, label: 'Music Reactions',    sub: 'Models react to your songs on camera',                    badge: 'Remote' },
  ugc:        { Icon: Play,       label: 'UGC & Reels',        sub: 'Branded skits, promos & short-form content',              badge: 'Remote' },
  business:   { Icon: TrendingUp, label: 'Business Content',   sub: 'Influencer visits your location, creates reels on-site',  badge: 'In-Person' },
  musicvideo: { Icon: Music,      label: 'Music Videos',       sub: 'Book models for your music video production',             badge: 'In-Person' },
  shoot:      { Icon: Camera,     label: 'Photo Shoots',       sub: 'Models for brand shoots, fashion, editorials',            badge: 'In-Person' },
  commercial: { Icon: Film,       label: 'Commercials',        sub: 'Script reading, dialogue & acting for commercials',       badge: 'In-Person' },
  event:      { Icon: Sparkles,   label: 'Events & Hosting',   sub: 'Models for parties, activations & brand events',          badge: 'In-Person' },
  bottle:     { Icon: Wine,       label: 'Bottle Girls / VIP', sub: 'VIP hostesses for clubs, lounges & nightlife',            badge: 'In-Person' },
};

export default function HeroBooking() {
  const [persona,   setPersona]   = useState<PersonaId | null>(null);
  const [svc,       setSvc]       = useState<ServiceId | null>(null);
  const [step,      setStep]      = useState<'persona' | 'service' | 'lead'>('persona');
  const [name,      setName]      = useState('');
  const [phone,     setPhone]     = useState('');
  const [loading,   setLoading]   = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const pickPersona = (id: PersonaId) => {
    posthog.capture('hero_persona_selected', { persona: id });
    setPersona(id);
    setStep('service');
  };

  const pickService = (id: ServiceId) => {
    posthog.capture('hero_service_selected', { service: id });
    setSvc(id);
    setStep('lead');
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;
    setLoading(true);
    try {
      await fetch('/api/save-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, source: 'hero_widget', serviceType: svc }),
      });
      try { sessionStorage.setItem('lead_name', name); sessionStorage.setItem('lead_phone', phone); } catch {}
    } catch {}
    setLoading(false);
    setSubmitted(true);
    setTimeout(() => { window.location.href = `/model-booking?service=${svc}`; }, 600);
  };

  const activePersona = personas.find(p => p.id === persona);

  return (
    <div
      className="w-full p-6 md:p-8 flex flex-col gap-5"
      style={{ backgroundColor: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '2px' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full animate-pulse inline-block" style={{ backgroundColor: G }} />
          <p className="text-[13px] tracking-[0.3em] uppercase font-bold" style={{ color: G }}>Book Your Models</p>
        </div>
        {step !== 'persona' && (
          <button
            onClick={() => { if (step === 'lead') { setSvc(null); setStep('service'); } else { setPersona(null); setStep('persona'); } }}
            className="text-white/30 hover:text-white/60 text-[11px] tracking-widest uppercase transition-colors"
          >
            ← Back
          </button>
        )}
      </div>

      {/* ─── Step 1: Pick persona ─── */}
      {step === 'persona' && (
        <div>
          <p className="text-white/85 text-[15px] font-medium mb-4">What do you need?</p>
          <div className="flex flex-col gap-2">
            {personas.map(({ id, Icon, label, sub }) => (
              <button
                key={id}
                onClick={() => pickPersona(id)}
                className="w-full flex items-center gap-4 px-4 py-4 text-left group transition-all duration-150"
                style={{ border: '1px solid rgba(255,255,255,0.07)', backgroundColor: 'rgba(255,255,255,0.01)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = G; e.currentTarget.style.backgroundColor = 'rgba(201,169,110,0.05)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.01)'; }}
              >
                <Icon className="h-4 w-4 text-white/30 group-hover:text-[#c9a96e] transition-colors shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-white/85 font-bold text-[14px] group-hover:text-white transition-colors">{label}</p>
                  <p className="text-white/35 text-[11px] mt-0.5">{sub}</p>
                </div>
                <ChevronRight className="h-3.5 w-3.5 text-white/20 group-hover:text-[#c9a96e] transition-colors shrink-0" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ─── Step 2: Pick specific service ─── */}
      {step === 'service' && activePersona && (
        <div>
          <p className="text-white/85 text-[15px] font-medium mb-4">{activePersona.label} — pick a service</p>
          <div className="flex flex-col gap-2">
            {activePersona.services.map(id => {
              const { Icon, label, sub, badge } = allServices[id];
              return (
                <button
                  key={id}
                  onClick={() => pickService(id)}
                  className="w-full flex items-center gap-4 px-4 py-3.5 text-left group transition-all duration-150"
                  style={{ border: '1px solid rgba(255,255,255,0.07)', backgroundColor: 'rgba(255,255,255,0.01)' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = G; e.currentTarget.style.backgroundColor = 'rgba(201,169,110,0.05)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.01)'; }}
                >
                  <Icon className="h-4 w-4 text-white/30 group-hover:text-[#c9a96e] transition-colors shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-white/85 font-bold text-[14px] group-hover:text-white transition-colors">{label}</p>
                    <p className="text-white/35 text-[11px] mt-0.5">{sub}</p>
                  </div>
                  <span className="text-[9px] font-bold tracking-wider uppercase px-2 py-1 border border-white/10 text-white/25 shrink-0">{badge}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ─── Step 3: Lead capture before redirect ─── */}
      {step === 'lead' && (
        <div>
          {submitted ? (
            <div className="text-center py-6">
              <Check className="h-8 w-8 mx-auto mb-3" style={{ color: G }} />
              <p className="text-white font-bold mb-1">Got it — taking you to booking</p>
              <p className="text-white/35 text-sm">One moment...</p>
            </div>
          ) : (
            <>
              {svc && (
                <div className="flex items-center gap-2 mb-3">
                  <Check className="h-3.5 w-3.5" style={{ color: G }} />
                  <span className="text-[11px] font-bold tracking-widest uppercase text-white/40">{allServices[svc].label}</span>
                  <span className="text-white/15 text-[10px]">·</span>
                  <span className="text-[10px] text-white/20">{allServices[svc].badge}</span>
                </div>
              )}
              <p className="text-white/85 text-[15px] font-medium mb-1">Almost there — drop your number</p>
              <p className="text-white/35 text-[12px] mb-4">We&apos;ll confirm availability and have your packages ready on the next screen.</p>
              <form onSubmit={handleLeadSubmit} className="space-y-3">
                <input
                  type="text" placeholder="Your Name" value={name} onChange={e => setName(e.target.value)}
                  className="w-full h-11 bg-white/[0.04] border border-white/10 px-4 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#c9a96e]/50 transition-colors"
                />
                <input
                  type="tel" placeholder="Phone Number *" required value={phone} onChange={e => setPhone(e.target.value)}
                  className="w-full h-11 bg-white/[0.04] border border-white/10 px-4 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#c9a96e]/50 transition-colors"
                />
                <button
                  type="submit" disabled={loading || !phone.trim()}
                  className="w-full py-4 text-[13px] font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-40"
                  style={{ backgroundColor: G, color: '#000' }}
                >
                  {loading ? 'One sec...' : (<>See Packages & Book <ChevronRight className="h-4 w-4" /></>)}
                </button>
              </form>
              <button
                onClick={() => { window.location.href = `/model-booking?service=${svc}`; }}
                className="w-full mt-2 text-center text-white/25 hover:text-white/50 text-[11px] transition-colors"
              >
                Skip → go straight to booking
              </button>
              <div className="flex items-center justify-center gap-2 mt-3">
                <a href="tel:+15615520392" className="flex items-center gap-2 text-white/30 hover:text-white/60 text-[11px] transition-colors">
                  <Phone className="h-3 w-3" /> Prefer to call? (561) 552-0392
                </a>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
