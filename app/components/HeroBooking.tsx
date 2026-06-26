'use client';
import { useState } from 'react';
import posthog from 'posthog-js';
import { ChevronRight, Camera, Headphones, Sparkles, Play, Check, Music, TrendingUp, Film, Wine, Phone } from 'lucide-react';

const G = '#c9a96e';

type ServiceId = 'reaction' | 'ugc' | 'business' | 'musicvideo' | 'shoot' | 'commercial' | 'event' | 'bottle';

const topOptions: { id: ServiceId; Icon: React.ElementType; label: string; sub: string }[] = [
  { id: 'business',   Icon: TrendingUp, label: 'Brands & Businesses', sub: 'UGC, reels, business content & commercials' },
  { id: 'musicvideo', Icon: Music,      label: 'Artists & Music',     sub: 'Music videos, reactions & photo shoots' },
  { id: 'event',      Icon: Sparkles,   label: 'Events & Nightlife',  sub: 'Event models, hosting & bottle girls' },
];

const allServices: Record<ServiceId, { Icon: React.ElementType; label: string; sub: string; from: string; badge: string }> = {
  reaction:   { Icon: Headphones, label: 'Music Reactions',    sub: 'Models react to your songs on camera',               from: '$300',      badge: 'Remote' },
  ugc:        { Icon: Play,       label: 'UGC & Reels',        sub: 'Branded skits, promos & short-form content',         from: '$300',      badge: 'Remote' },
  business:   { Icon: TrendingUp, label: 'Business Content',   sub: 'Model visits your location, creates reels on-site',  from: '$300',      badge: 'In-Person' },
  musicvideo: { Icon: Music,      label: 'Music Videos',       sub: 'Book models for your music video production',        from: '$500',      badge: 'In-Person' },
  shoot:      { Icon: Camera,     label: 'Photo Shoots',       sub: 'Models for brand shoots, fashion, editorials',       from: '$300',      badge: 'In-Person' },
  commercial: { Icon: Film,       label: 'Commercials',        sub: 'Script reading, dialogue & acting for commercials',  from: '$599',      badge: 'In-Person' },
  event:      { Icon: Sparkles,   label: 'Events & Hosting',   sub: 'Models for parties, activations & brand events',    from: '$400/girl', badge: 'In-Person' },
  bottle:     { Icon: Wine,       label: 'Bottle Girls / VIP', sub: 'VIP hostesses for clubs, lounges & nightlife',      from: '$400/girl', badge: 'In-Person' },
};

/* ── Budget → recommendation (per service) ──────────────────────── */
const recs: Record<string, { min: number; max: number; name: string; price: string; detail: string; popular?: boolean }[]> = {
  reaction: [
    { min: 0,    max: 450,   name: 'Single Reaction',      price: '$300',         detail: '1 model reacts to 1 song · HD video' },
    { min: 450,  max: 650,   name: 'Double Pack',          price: '$550',         detail: '1 model reacts to 2 songs · save $50' },
    { min: 650,  max: 950,   name: 'Triple Pack',          price: '$625',         detail: '1 model reacts to 3 songs · save $275', popular: true },
    { min: 950,  max: 1600,  name: '5-Song Pack',          price: '$1,000',       detail: '1 model · 5 songs · best rate per song' },
    { min: 1600, max: 3000,  name: 'Album Livestream',     price: '$1,500–$2.5K', detail: 'Full album live reaction + edited clips' },
    { min: 3000, max: 99999, name: 'Multi-Model Campaign', price: '$3,500+',      detail: '3–5 models · full reaction campaign' },
  ],
  ugc: [
    { min: 0,    max: 400,   name: 'Single Reel',   price: '$300',    detail: '1 branded reel or skit · to your brief' },
    { min: 400,  max: 600,   name: '2-Reel Pack',   price: '$500',    detail: '2 custom reels · different hooks' },
    { min: 600,  max: 850,   name: '3-Reel Pack',   price: '$750',    detail: '3 branded reels · A/B test content', popular: true },
    { min: 850,  max: 1400,  name: '5-Reel Pack',   price: '$1,200',  detail: '5 reels · best per-reel rate' },
    { min: 1400, max: 2700,  name: 'Multi-Model',   price: '$1,500',  detail: '3 creators · 6 total videos' },
    { min: 2700, max: 99999, name: 'Full Campaign', price: '$2,500+', detail: '5 creators · 10 videos · account manager' },
  ],
  business: [
    { min: 0,    max: 350,  name: 'Solo Visit',       price: '$300',   detail: '1 model · 2hr at your business · 3–5 reels' },
    { min: 350,  max: 475,  name: 'Duo Visit',        price: '$450',   detail: '2 models · 2hr · 5–8 reels & stories' },
    { min: 475,  max: 650,  name: 'Content Day',      price: '$400',   detail: '1 model · 4hr · 8–12 content pieces', popular: true },
    { min: 650,  max: 825,  name: 'Full Production',  price: '$700',   detail: '2 models · 4hr · 12–20 content pieces' },
    { min: 825,  max: 99999,name: 'Premium',           price: '$950',   detail: '3 models · 4hr · 20+ content pieces' },
  ],
  shoot: [
    { min: 0,    max: 450,   name: 'Solo Shoot',  price: '$300',    detail: '1 model · 4 hours on set' },
    { min: 450,  max: 650,   name: 'Duo Shoot',   price: '$550',    detail: '2 models · 4 hours · coordinated' },
    { min: 650,  max: 900,   name: 'Trio Shoot',  price: '$650',    detail: '3 models · styled production', popular: true },
    { min: 900,  max: 1200,  name: 'Squad Shoot', price: '$950',    detail: '5 models · full production' },
    { min: 1200, max: 99999, name: 'Full Day',    price: '$1,500+', detail: '6–8 hrs · multi-scene · multiple looks' },
  ],
  event: [
    { min: 0,    max: 600,   name: '1 Girl',   price: '$400',    detail: '1 model · 4hr · $100/hr' },
    { min: 600,  max: 1000,  name: '2 Girls',  price: '$800',    detail: '2 models · 4hr · $100/hr each' },
    { min: 1000, max: 1500,  name: '3 Girls',  price: '$1,200',  detail: '3 models · 4hr · $100/hr each', popular: true },
    { min: 1500, max: 2500,  name: '5 Girls',  price: '$2,000',  detail: '5 models · 4hr · $100/hr each' },
    { min: 2500, max: 4000,  name: '8 Girls',  price: '$3,200',  detail: '8 models · 4hr · $100/hr each' },
    { min: 4000, max: 6500,  name: '10 Girls', price: '$4,000',  detail: '10 models · 4hr · $100/hr each' },
    { min: 6500, max: 99999, name: '15 Girls', price: '$6,000',  detail: '15 models · 4hr · full event takeover' },
  ],
  commercial: [
    { min: 0,    max: 850,  name: 'Solo',           price: '$599',    detail: '1 model · half-day · script & spoken role' },
    { min: 850,  max: 1300, name: 'Full Day Solo',  price: '$999',    detail: '1 model · full day · multi-scene commercial' },
    { min: 1300, max: 1650, name: 'Duo',            price: '$1,050',  detail: '2 models · half-day · scripted commercial', popular: true },
    { min: 1650, max: 2300, name: 'Full Day Duo',   price: '$1,800',  detail: '2 models · full day · multi-scene commercial' },
    { min: 2300, max: 3700, name: 'Squad',          price: '$2,750',  detail: '5 models · half-day · large-cast commercial' },
    { min: 3700, max: 5500, name: 'Full Day Squad', price: '$4,500',  detail: '5 models · full day · multi-scene production' },
    { min: 5500, max: 8000, name: 'Ensemble',       price: '$6,500',  detail: '8 models · full day · big-budget commercial' },
    { min: 8000, max: 99999,name: 'Mega Production',price: '$9,000+', detail: '10+ models · full day · premium commercial' },
  ],
  bottle: [
    { min: 0,    max: 600,   name: '1 Bottle Girl',   price: '$400',    detail: '1 VIP hostess · 4hr shift · $100/hr' },
    { min: 600,  max: 1000,  name: '2 Bottle Girls',  price: '$800',    detail: '2 VIP hostesses · 4hr shift' },
    { min: 1000, max: 1500,  name: '3 Bottle Girls',  price: '$1,200',  detail: '3 VIP hostesses · 4hr · full VIP section', popular: true },
    { min: 1500, max: 2500,  name: '5 Bottle Girls',  price: '$2,000',  detail: '5 VIP hostesses · 4hr · multiple tables' },
    { min: 2500, max: 4000,  name: '8 Bottle Girls',  price: '$3,200',  detail: '8 VIP hostesses · 4hr · full venue coverage' },
    { min: 4000, max: 6500,  name: '10 Bottle Girls', price: '$4,000',  detail: '10 VIP hostesses · 4hr · on-site coordinator' },
    { min: 6500, max: 99999, name: '15 Bottle Girls', price: '$6,000',  detail: '15 VIP hostesses · 4hr · full club takeover' },
  ],
  musicvideo: [
    { min: 0,    max: 650,   name: 'Solo Feature',       price: '$500',    detail: '1 model · 4hr · featured scenes in your video' },
    { min: 650,  max: 1100,  name: 'Duo Feature',        price: '$900',    detail: '2 models · 4hr · coordinated feature roles' },
    { min: 1100, max: 1500,  name: 'Trio Feature',       price: '$1,200',  detail: '3 models · 4hr · full video feature cast', popular: true },
    { min: 1500, max: 2400,  name: 'Squad (5)',          price: '$1,800',  detail: '5 models · 4hr · crew scenes & group shots' },
    { min: 2400, max: 3200,  name: 'Full Day Solo',      price: '$800',    detail: '1 model · 6-8hr · full video lead role' },
    { min: 3200, max: 4500,  name: 'Full Day Duo',       price: '$1,400',  detail: '2 models · 6-8hr · all scenes covered' },
    { min: 4500, max: 6200,  name: 'Full Day Trio',      price: '$2,000',  detail: '3 models · 6-8hr · complete video cast' },
    { min: 6200, max: 99999, name: 'Big Production',     price: '$3,500+', detail: '10-50 models · full music video production' },
  ],
};

const sliderRanges: Record<string, { min: number; max: number; step: number }> = {
  reaction:   { min: 300,  max: 6000,  step: 50 },
  ugc:        { min: 300,  max: 3000,  step: 50 },
  business:   { min: 300,  max: 1000,  step: 25 },
  musicvideo: { min: 500,  max: 35000, step: 100 },
  shoot:      { min: 300,  max: 2000,  step: 50 },
  commercial: { min: 599,  max: 10000, step: 50 },
  event:      { min: 400,  max: 7000,  step: 100 },
  bottle:     { min: 400,  max: 9000,  step: 100 },
};

export default function HeroBooking() {
  const [svc,       setSvc]       = useState<ServiceId | null>(null);
  const [bgt,       setBgt]       = useState(300);
  const [step,      setStep]      = useState<'service' | 'budget' | 'lead'>('service');
  const [name,      setName]      = useState('');
  const [phone,     setPhone]     = useState('');
  const [loading,   setLoading]   = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const currentService = svc || 'reaction';
  const range   = sliderRanges[currentService] || sliderRanges.reaction;
  const recList = recs[currentService] || [];
  const rec     = recList.find(r => bgt >= r.min && bgt < r.max) ?? recList[recList.length - 1];

  const pickService = (id: ServiceId) => {
    posthog.capture('hero_service_selected', { service: id });
    setSvc(id);
    setBgt(sliderRanges[id]?.min || 300);
    setStep('budget');
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;
    setLoading(true);
    try {
      await fetch('/api/save-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, source: 'hero_widget', serviceType: svc, notes: `Budget: $${bgt} · Package: ${rec?.name}` }),
      });
      try { sessionStorage.setItem('lead_name', name); sessionStorage.setItem('lead_phone', phone); } catch {}
    } catch {}
    setLoading(false);
    setSubmitted(true);
    setTimeout(() => { window.location.href = `/model-booking?service=${svc}`; }, 600);
  };

  return (
    <div
      className="w-full p-6 md:p-8 flex flex-col gap-5"
      style={{ backgroundColor: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '2px' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full animate-pulse inline-block" style={{ backgroundColor: G }} />
          <p className="text-[13px] tracking-[0.3em] uppercase font-bold" style={{ color: G }}>Find Your Package</p>
        </div>
        {step !== 'service' && (
          <button onClick={() => { setSvc(null); setStep('service'); }} className="text-white/30 hover:text-white/60 text-[11px] tracking-widest uppercase transition-colors">
            ← Change
          </button>
        )}
      </div>

      {/* ─── Step 1: Pick category (3 options) ─── */}
      {step === 'service' && (
        <div>
          <p className="text-white/85 text-[15px] font-medium mb-4">What do you need?</p>
          <div className="flex flex-col gap-2">
            {topOptions.map(({ id, Icon, label, sub }) => (
              <button
                key={id}
                onClick={() => pickService(id)}
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

      {/* ─── Step 2: Budget slider + recommendation ─── */}
      {step === 'budget' && rec && svc && (
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold tracking-widest uppercase text-white/30">{allServices[svc].label}</span>
            <span className="text-white/15 text-[10px]">·</span>
            <span className="text-[10px] text-white/20">{allServices[svc].badge}</span>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-white/70 text-[14px]">Your budget</p>
              <span className="font-display font-bold italic text-2xl" style={{ color: G }}>${bgt.toLocaleString()}</span>
            </div>
            <input
              type="range" min={range.min} max={range.max} step={range.step} value={bgt}
              onChange={e => setBgt(Number(e.target.value))}
              className="budget-slider w-full h-2 cursor-pointer rounded-full appearance-none"
            />
            <div className="flex justify-between text-white/20 text-[10px] tracking-widest uppercase mt-2">
              <span>${range.min.toLocaleString()}</span><span>${range.max.toLocaleString()}+</span>
            </div>
          </div>

          <div className="border p-5" style={{ borderColor: G, backgroundColor: 'rgba(201,169,110,0.03)' }}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-white/35 text-[10px] tracking-[0.3em] uppercase font-bold">Best Match</p>
              {rec.popular && <span className="text-green-400/60 text-[10px] font-semibold flex items-center gap-1"><Check className="h-3 w-3" /> Popular</span>}
            </div>
            <p className="text-white font-bold text-lg leading-tight">{rec.name}</p>
            <p className="text-white/40 text-[12px] mt-1 mb-4">{rec.detail}</p>
            <button
              onClick={() => setStep('lead')}
              className="flex items-center justify-center gap-2 w-full py-4 text-[13px] font-bold tracking-widest uppercase transition-all hover:opacity-85"
              style={{ backgroundColor: G, color: '#000' }}
            >
              Book This Package <ChevronRight className="h-4 w-4" />
            </button>
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
              <p className="text-white/85 text-[15px] font-medium mb-1">Almost there — drop your number</p>
              <p className="text-white/35 text-[12px] mb-4">We'll confirm availability and have everything ready when you arrive.</p>
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
                  {loading ? 'One sec...' : (<>Continue to Booking <ChevronRight className="h-4 w-4" /></>)}
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
