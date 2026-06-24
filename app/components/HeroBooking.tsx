'use client';
import { useState } from 'react';
import Link from 'next/link';
import posthog from 'posthog-js';
import { ChevronRight, ChevronLeft, Camera, Headphones, Sparkles, Play, Check, Music, TrendingUp, Zap, Film, Wine } from 'lucide-react';

const G = '#c9a96e';

/* ── 3 Scenarios with sub-services ──────────────────────────────────── */
type ScenarioId = 'business' | 'music' | 'event';
type ServiceId = 'reaction' | 'ugc' | 'business' | 'musicvideo' | 'shoot' | 'commercial' | 'event' | 'bottle';

const scenarios: { id: ScenarioId; Icon: React.ElementType; title: string; desc: string; services: ServiceId[] }[] = [
  { id: 'business', Icon: TrendingUp, title: 'Promote My Business, Brand or Product', desc: 'Content that grows your brand — from on-site visits to professional campaigns', services: ['business', 'ugc', 'commercial'] },
  { id: 'music',    Icon: Music,     title: 'Promote My Music',                      desc: 'Music videos, reactions, and promotional content for artists', services: ['musicvideo', 'reaction', 'shoot'] },
  { id: 'event',    Icon: Sparkles,  title: 'Host an Event / VIP / Bottle Service',  desc: 'Models for your club, party, brand activation or private event', services: ['event', 'bottle'] },
];

const allServices: Record<ServiceId, { Icon: React.ElementType; label: string; sub: string; from: string; badge: string }> = {
  reaction:   { Icon: Headphones, label: 'Music Reactions',   sub: 'Models react to your songs on camera',                    from: '$300',      badge: 'Remote' },
  ugc:        { Icon: Play,       label: 'UGC & Reels',       sub: 'Branded skits, promos & short-form content',               from: '$300',      badge: 'Remote' },
  business:   { Icon: TrendingUp, label: 'Business Content',  sub: 'Model comes to your business, creates reels on-site',     from: '$300',      badge: 'In-Person' },
  musicvideo: { Icon: Camera,     label: 'Music Videos',      sub: 'Book models for your music video production',             from: '$500',      badge: 'In-Person' },
  shoot:      { Icon: Camera,     label: 'Photo Shoots',      sub: 'Models for brand shoots, fashion, editorials',            from: '$300',      badge: 'In-Person' },
  commercial: { Icon: Film,       label: 'Commercials',       sub: 'Script reading, dialogue & acting for commercials',       from: '$599',      badge: 'In-Person' },
  event:      { Icon: Sparkles,   label: 'Events & Hosting',  sub: 'Models for parties, activations & brand events',         from: '$400/girl', badge: 'In-Person' },
  bottle:     { Icon: Wine,       label: 'Bottle Girls / VIP', sub: 'VIP hostesses for clubs, lounges & nightlife',           from: '$400/girl', badge: 'In-Person' },
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

type SvcType = '' | 'reaction' | 'ugc' | 'business' | 'musicvideo' | 'shoot' | 'commercial' | 'event' | 'bottle';

/* ── Client identity → service mapping ──────────────────────── */
const identities = [
  { id: 'indie-artist', label: 'Artist / Musician',   icon: Music,      rec: 'musicvideo' as const },
  { id: 'label',        label: 'Record Label',        icon: Headphones, rec: 'musicvideo' as const },
  { id: 'biz-owner',    label: 'Business Owner',      icon: TrendingUp, rec: 'business' as const },
  { id: 'brand',        label: 'Brand / Product',     icon: Camera,     rec: 'ugc' as const },
  { id: 'venue',        label: 'Venue / Promoter',    icon: Sparkles,   rec: 'event' as const },
  { id: 'agency',       label: 'Marketing Agency',    icon: Zap,        rec: 'ugc' as const },
];

export default function HeroBooking() {
  const [scenario, setScenario] = useState<ScenarioId | null>(null);
  const [svc,      setSvc]      = useState<ServiceId | null>(null);
  const [bgt,      setBgt]      = useState(250);
  const [step,     setStep]     = useState<'scenario' | 'service' | 'budget'>('scenario');

  const currentService = svc || 'reaction';
  const range = sliderRanges[currentService] || sliderRanges.reaction;
  const recList = recs[currentService] || [];
  const rec = recList.find(r => bgt >= r.min && bgt < r.max) ?? recList[recList.length - 1];

  const pickScenario = (id: ScenarioId) => {
    posthog.capture('hero_scenario_selected', { scenario: id });
    setScenario(id);
    setStep('service');
  };

  const pickService = (id: ServiceId) => {
    posthog.capture('hero_service_selected', { service: id, scenario });
    setSvc(id);
    setBgt(sliderRanges[id]?.min || 300);
    setStep('budget');
  };

  const reset = () => { setScenario(null); setSvc(null); setStep('scenario'); };
  const backToScenarios = () => { setSvc(null); setStep('scenario'); };

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
        {step !== 'scenario' && (
          <button onClick={reset} className="text-white/30 hover:text-white/60 text-[11px] tracking-widest uppercase flex items-center gap-1.5 transition-colors">
            <ChevronLeft className="h-3.5 w-3.5" /> Start Over
          </button>
        )}
      </div>

      {/* ─── Step 1: Pick Your Scenario ─── */}
      {step === 'scenario' && (
        <div>
          <p className="text-white/90 text-[16px] mb-1.5 font-medium">What are you looking for?</p>
          <p className="text-white/35 text-[12px] mb-4">Pick the option that best describes you — then choose your specific service.</p>
          <div className="flex flex-col gap-2.5">
            {scenarios.map(({ id, Icon, title, desc, services: svcIds }) => (
              <button
                key={id}
                onClick={() => pickScenario(id)}
                className="w-full text-left p-4 transition-all duration-200 group rounded-sm"
                style={{ border: '1px solid rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.01)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = G; e.currentTarget.style.backgroundColor = 'rgba(201,169,110,0.06)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.01)'; }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 flex items-center justify-center flex-shrink-0" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                    <Icon className="h-4 w-4 text-white/40 group-hover:text-[#c9a96e] transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white/80 font-bold text-[14px] group-hover:text-[#c9a96e] transition-colors">{title}</p>
                    <p className="text-white/35 text-[11px] mt-1 leading-relaxed">{desc}</p>
                    <p className="text-white/20 text-[10px] mt-2 tracking-wider uppercase">{svcIds.length} services available</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-white/20 group-hover:text-[#c9a96e] transition-colors mt-1" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ─── Step 2: Pick Your Service (within scenario) ─── */}
      {step === 'service' && scenario && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <button onClick={backToScenarios} className="text-white/30 hover:text-white/60 text-[11px] tracking-widest uppercase flex items-center gap-1 transition-colors">
              <ChevronLeft className="h-3 w-3" /> Back
            </button>
          </div>
          <p className="text-white/90 text-[16px] mb-1 font-medium">
            {scenarios.find(s => s.id === scenario)?.title}
          </p>
          <p className="text-white/35 text-[12px] mb-4">Select the specific service you need:</p>
          <div className="flex flex-col gap-1.5">
            {scenarios.find(s => s.id === scenario)?.services.map(svcId => {
              const service = allServices[svcId];
              const Icon = service.Icon;
              return (
                <button
                  key={svcId}
                  onClick={() => pickService(svcId)}
                  className="w-full flex items-center gap-3 px-4 py-3 transition-all duration-200 text-left group"
                  style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = G; e.currentTarget.style.backgroundColor = 'rgba(201,169,110,0.04)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.backgroundColor = 'transparent'; }}
                >
                  <Icon className="h-4 w-4 text-white/30 group-hover:text-[#c9a96e] transition-colors shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-white/70 font-bold text-[14px] group-hover:text-[#c9a96e] transition-colors">{service.label}</p>
                    <p className="text-white/30 text-[11px] mt-0.5">{service.sub}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/20 text-[9px] uppercase tracking-wider">{service.badge}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ─── Step 3: Budget + Recommendation ─── */}
      {step === 'budget' && rec && (
        <div className="flex flex-col gap-6">
          {/* Service context */}
          <p className="text-white/30 text-[11px] tracking-widest uppercase">
            {currentService === 'reaction' ? '🎧 Music Reactions' : currentService === 'ugc' ? '🎬 UGC & Reels' : currentService === 'business' ? '🏢 Business Content' : currentService === 'musicvideo' ? '🎬 Music Videos' : currentService === 'shoot' ? '📸 Photo Shoots' : currentService === 'commercial' ? '🎬 Commercials' : currentService === 'bottle' ? '🍾 Bottle Girls / VIP' : '✨ Events & Hosting'}
          </p>

          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-white/80 text-[17px] font-light">Your project range</p>
              <span className="font-display font-bold italic" style={{ color: G, fontSize: 'clamp(28px, 5vw, 36px)' }}>${bgt.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={range.min}
              max={range.max}
              step={range.step}
              value={bgt}
              onChange={e => setBgt(Number(e.target.value))}
              className="budget-slider w-full h-2 cursor-pointer rounded-full appearance-none"
            />
            <div className="flex justify-between text-white/20 text-[11px] tracking-widest uppercase mt-3">
              <span>${range.min.toLocaleString()}</span>
              <span>${range.max.toLocaleString()}+</span>
            </div>
          </div>

          {/* Recommendation card */}
          <div className="border pt-6 pb-7 px-6" style={{ borderColor: G, backgroundColor: 'rgba(201,169,110,0.03)' }}>
            <div className="flex items-center justify-between mb-3">
              <p className="text-white/40 text-[11px] tracking-[0.3em] uppercase font-bold">Best Fit for Your Budget</p>
              {rec.popular && (
                <div className="flex items-center gap-1.5 text-green-400/60 text-[11px] font-semibold">
                  <Check className="h-3.5 w-3.5" /> Most Popular
                </div>
              )}
            </div>
            <p className="text-white font-display font-bold italic leading-tight" style={{ fontSize: 'clamp(22px, 4vw, 28px)' }}>{rec.name}</p>
            <p className="text-white/45 text-[13px] mt-2 mb-5">{rec.detail}</p>
            <div className="flex items-center justify-between mb-6">
              <p className="text-white/40 text-[12px]">Get a custom quote based on your needs</p>
              {rec.popular && (
                <div className="flex -space-x-1.5">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-5 h-5 rounded-full border border-[#111] bg-white/10" />
                  ))}
                  <span className="text-white/25 text-[10px] ml-2 self-center">top choice</span>
                </div>
              )}
            </div>
            <Link
              href={`/model-booking?service=${svc}`}
              className="flex items-center justify-center gap-3 w-full py-5 text-[14px] font-bold tracking-[0.2em] uppercase transition-all hover:opacity-85"
              style={{ backgroundColor: G, color: '#000' }}
            >
              Get Your Quote <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Cross-sell */}
          {svc === 'reaction' && (
            <button
              onClick={() => pickService('ugc')}
              className="w-full p-3 border border-white/[0.06] hover:border-[#c9a96e]/20 flex items-center gap-3 transition-all duration-200 group text-left"
            >
              <Play className="h-4 w-4 text-white/15 group-hover:text-[#c9a96e] transition-colors shrink-0" />
              <p className="text-white/25 text-[11px] group-hover:text-white/40 transition-colors">
                Want promo skits too? Try <span className="font-semibold">UGC & Reels</span>
              </p>
              <ChevronRight className="h-3 w-3 text-white/10 group-hover:text-[#c9a96e] ml-auto shrink-0 transition-colors" />
            </button>
          )}
          {svc === 'ugc' && (
            <button
              onClick={() => pickService('reaction')}
              className="w-full p-3 border border-white/[0.06] hover:border-[#c9a96e]/20 flex items-center gap-3 transition-all duration-200 group text-left"
            >
              <Headphones className="h-4 w-4 text-white/15 group-hover:text-[#c9a96e] transition-colors shrink-0" />
              <p className="text-white/25 text-[11px] group-hover:text-white/40 transition-colors">
                Promoting a song? Add <span className="font-semibold">music reactions</span>
              </p>
              <ChevronRight className="h-3 w-3 text-white/10 group-hover:text-[#c9a96e] ml-auto shrink-0 transition-colors" />
            </button>
          )}
          {(svc === 'shoot' || svc === 'event' || svc === 'business' || svc === 'commercial') && (
            <button
              onClick={() => pickService('ugc')}
              className="w-full p-3 border border-white/[0.06] hover:border-[#c9a96e]/20 flex items-center gap-3 transition-all duration-200 group text-left"
            >
              <Play className="h-4 w-4 text-white/15 group-hover:text-[#c9a96e] transition-colors shrink-0" />
              <p className="text-white/25 text-[11px] group-hover:text-white/40 transition-colors">
                Need <span className="font-semibold">social media content</span> too? Add UGC reels
              </p>
              <ChevronRight className="h-3 w-3 text-white/10 group-hover:text-[#c9a96e] ml-auto shrink-0 transition-colors" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
