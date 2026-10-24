'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import MobileNav from '../components/MobileNav';
import posthog from 'posthog-js';
import { Camera, Sparkles, CalendarDays, RefreshCcw, Users, ChevronRight, ChevronLeft, Check, MapPin, TrendingUp, Zap, Play, ArrowUpRight, Headphones, Music, Phone, Lock, ShieldCheck, Film, Wine } from 'lucide-react';

// ── Package Data ─────────────────────────────────────────────────────────────

import { PACKAGES, CREW_ADDONS } from '@/lib/booking-packages';


// ── Streamlined 3-step flow ──
// Step 0: Service picker (grouped by persona)
// Step 1: Packages — frequency toggle + curated cards + custom card
// Step 2: Contact details → lead save → Stripe checkout

type ServiceType = 'shoot' | 'musicvideo' | 'event' | 'reaction' | 'ugc' | 'business' | 'commercial' | 'bottle' | 'storyreposts' | 'collabreposts' | 'starter';

type ServiceCategory = 'in-person' | 'remote-content' | 'story-reposts' | 'collab-posts';

const STEPS = ['Service', 'Package', 'Your Details'];

// Tiers above this price route to a call instead of self-serve checkout
const SELF_SERVE_MAX = 6000;
// How many curated cards to show before "View all"
const CURATED_COUNT = 4;

const SERVICE_INFO: Record<ServiceType, { title: string; desc: string; from: string; tag: 'In-Person' | 'Remote'; hasMonthly: boolean; Icon: React.ElementType; category: ServiceCategory }> = {
  business:      { title: 'Celebrity-Connected Brand Ambassadors',        desc: 'Celebrity-connected creators visit your location, create reels & promo content on-site.',        from: '$600',      tag: 'In-Person', hasMonthly: true,  Icon: TrendingUp, category: 'in-person' },
  ugc:           { title: 'Premium UGC & Branded Reels',            desc: 'Celebrity-connected creators create branded skits, promos & short-form content to your brief.',      from: '$750',      tag: 'Remote',    hasMonthly: true,  Icon: Play, category: 'remote-content' },
  commercial:    { title: 'Actors & Voiceover for Commercials',   desc: 'On-camera actors and voiceover for TV, radio, web & brand ads.',                   from: '$450',      tag: 'In-Person', hasMonthly: true,  Icon: Film, category: 'in-person' },
  musicvideo:    { title: 'Music Videos',                   desc: 'Featured creators for your video — featured, lead or ensemble.',              from: '$450',      tag: 'In-Person', hasMonthly: false, Icon: Music, category: 'in-person' },
  reaction:      { title: 'Premium Music Reactions',                desc: 'Celebrity-connected creators react to your songs on camera — first-listen & livestreams.',           from: '$500',      tag: 'Remote',    hasMonthly: true,  Icon: Headphones, category: 'remote-content' },
  shoot:         { title: 'Photo Shoots',                   desc: 'Commercial & print models for brand shoots, editorials & lookbooks.',                     from: '$600',      tag: 'In-Person', hasMonthly: true,  Icon: Camera, category: 'in-person' },
  event:         { title: 'Events & Hosting',               desc: 'Creators for brand activations, parties & grand openings.',                      from: '$760', tag: 'In-Person', hasMonthly: true,  Icon: Sparkles, category: 'in-person' },
  bottle:        { title: 'Bottle Girls / VIP Hostesses',   desc: 'VIP hostesses for nightclubs, lounges & bottle service.',                      from: '$760', tag: 'In-Person', hasMonthly: true,  Icon: Wine, category: 'in-person' },
  storyreposts:  { title: 'Premium Story Reposts',                 desc: 'Celebrity-connected creators post your content to their Instagram Stories with swipe-up links.',      from: '$600',       tag: 'Remote',    hasMonthly: true,  Icon: RefreshCcw, category: 'story-reposts' },
  starter:       { title: 'Starter · One Creator, One Deliverable', desc: 'Single-unit options for solo artists and small creatives.', from: '$200', tag: 'Remote', hasMonthly: false, Icon: Sparkles, category: 'remote-content' },
  collabreposts: { title: 'Premium Collab Posts',                  desc: 'Celebrity-connected creators co-author posts with your brand — appears on both feeds for dual reach.', from: '$500',      tag: 'Remote',    hasMonthly: true,  Icon: Users, category: 'collab-posts' },
};

// Verified monthly-vs-one-time savings, computed from actual PACKAGES data.
// Every service below has a real discount of at least this percentage vs. booking one-time repeatedly.
const MONTHLY_SAVINGS_PCT: Partial<Record<ServiceType, number>> = {
  shoot: 30,
  ugc: 30,
  reaction: 30,
  event: 30,
  bottle: 30,
  business: 20,
  commercial: 30,
  storyreposts: 25,
  collabreposts: 25,
};

const SERVICE_GROUPS: { label: string; services: ServiceType[]; category: ServiceCategory }[] = [
  { label: 'In-Person Services', services: ['business', 'commercial', 'musicvideo', 'shoot', 'event', 'bottle'], category: 'in-person' },
  { label: 'Remote Content Creation', services: ['ugc', 'reaction'], category: 'remote-content' },
  { label: 'Content Amplification', services: ['storyreposts'], category: 'story-reposts' },
  { label: 'Co-Authored Content', services: ['collabreposts'], category: 'collab-posts' },
];

// ── Page ─────────────────────────────────────────────────────────────────────

function ModelBookingContent() {
  const searchParams = useSearchParams();
  const [step,        setStep]        = useState(0);
  const [serviceType, setServiceType] = useState<ServiceType | null>(null);
  const [addCrew, setAddCrew] = useState<string | null>(null);

  // Test mode disabled
  const isTestMode = false;

  // Pre-selected model from profile page
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  // Booking state
  const [bookingType, setBookingType] = useState<'one-time' | 'monthly'>('one-time');
  const [selectedPkgId, setSelectedPkgId] = useState<string | null>(null);
  const [showAllPkgs, setShowAllPkgs] = useState(false);

  // Deep links: ?service=ugc&billing=monthly&package=triple&model=Nya
  useEffect(() => {
    const svc = searchParams.get('service') as ServiceType | null;
    const pkgParam = searchParams.get('package');
    if (svc && SERVICE_INFO[svc]) {
      setServiceType(svc);
      const requestedType = searchParams.get('billing') as 'one-time' | 'monthly' | null;
      const bt = (requestedType === 'monthly' && SERVICE_INFO[svc].hasMonthly) ? 'monthly' : 'one-time';
      setBookingType(bt);
      if (pkgParam) {
        const pkgs = PACKAGES[`${svc}-${bt}`] || [];
        const match = pkgs.find((p: any) => p.id === pkgParam);
        if (match) setSelectedPkgId(match.id);
      }
      setStep(1); // Straight to package selection
    }
    const modelParam = searchParams.get('model');
    if (modelParam) setSelectedModel(modelParam);
  }, [searchParams]);
  const stepRef = useRef<HTMLDivElement>(null);
  const [date,        setDate]        = useState('');
  const [name,        setName]        = useState('');
  const [email,       setEmail]       = useState('');
  const [phone,       setPhone]       = useState('');
  const [notes,       setNotes]       = useState('');
  const [modelPreference, setModelPreference] = useState<string>('');
  const [location,    setLocation]    = useState('');
  const [time,        setTime]        = useState('');
  const [songLink,    setSongLink]    = useState('');
  const [submitted,   setSubmitted]   = useState(false);
  const [sending,     setSending]     = useState(false);
  const [sendError,   setSendError]   = useState('');
  const [showOptional, setShowOptional] = useState(false);

  // Pre-fill from lead capture popup
  useEffect(() => {
    const leadName = sessionStorage.getItem('lead_name');
    const leadPhone = sessionStorage.getItem('lead_phone');
    const leadEmail = sessionStorage.getItem('lead_email');
    if (leadName) setName(leadName);
    if (leadPhone) setPhone(leadPhone);
    if (leadEmail) setEmail(leadEmail);
  }, []);

  // ── Package derivation ──
  const pkgKey  = serviceType ? `${serviceType}-${bookingType}` : '';
  const rawPackages = PACKAGES[pkgKey] || [];
  const packages = isTestMode ? rawPackages.map(p => ({ ...p, price: 1 })) : rawPackages;
  // Self-serve tiers (checkout-able) vs enterprise tiers (routed to a call)
  const selfServe = packages.filter((p: any) => p.price <= SELF_SERVE_MAX);
  const hasEnterprise = packages.length > selfServe.length;
  // Curated view: first N self-serve tiers (data is price-ascending, popular tier sits in range)
  const curated = selfServe.slice(0, CURATED_COUNT);
  const visiblePkgs = showAllPkgs ? selfServe : curated;
  const hasMorePkgs = selfServe.length > curated.length;
  const pkg = packages.find((p: any) => p.id === selectedPkgId) || null;

  // Abandoned checkout tracking — fire when user leaves after reaching step 1+
  useEffect(() => {
    const handleUnload = () => {
      if (step >= 1 && (phone || email) && !submitted) {
        const payload = JSON.stringify({
          name, email, phone,
          source: 'abandoned_checkout',
          serviceType,
          packageName: pkg?.name,
          packagePrice: pkg?.price,
          modelPreference: modelPreference || selectedModel || '',
          step,
        });
        navigator.sendBeacon('/api/save-lead', new Blob([payload], { type: 'application/json' }));
      }
    };
    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, [step, phone, email, name, serviceType, pkg, submitted]);

  // In-person one-time bookings need a date + location before we can confirm availability
  const requiresDateLocation = bookingType === 'one-time' && !!serviceType && SERVICE_INFO[serviceType].tag === 'In-Person';

  const canNext = () => {
    if (step === 0) return serviceType !== null;
    if (step === 1) return pkg !== null;
    if (step === 2) {
      const baseValid = pkg !== null && name.trim() !== '' && phone.trim() !== '' && email.trim() !== '';
      if (!baseValid) return false;
      if (requiresDateLocation) return date.trim() !== '' && location.trim() !== '';
      return true;
    }
    return false;
  };

  const goNext = async () => {
    if (step < 2) {
      posthog.capture('booking_step_completed', { step, serviceType, bookingType, packageName: pkg?.name });
      setStep(s => s + 1);
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50);
      return;
    }
    // Step 2 (final): save lead, then straight to Stripe
    if (name.trim() && phone.trim() && email.trim()) {
        try {
          await fetch('/api/save-lead', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name, email, phone,
              source: 'booking_flow_details',
              serviceType,
              bookingType,
              modelPreference: modelPreference || selectedModel || '',
              notes: [selectedModel ? `Booked from: ${selectedModel}'s profile` : '', modelPreference ? `Model preference: ${modelPreference}` : ''].filter(Boolean).join(' | '),
            }),
          });
      } catch {
        // Non-fatal — continue to checkout
      }
    }
    // Hard guard — never call API with missing package data
    if (!pkg || !pkg.name || !pkg.price) {
      setSendError('No package selected. Please choose a package before checking out.');
      return;
    }
    setSending(true);
    setSendError('');
    try {
      // Redirect to Stripe Checkout
      const res = await fetch('/api/create-booking-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceType,
          bookingType,
          packageName: pkg.name,
          packageTagline: pkg.tagline,
          packageId: pkg.id,
          packagePrice: pkg.price,
          crewAddon: addCrew ? CREW_ADDONS.find(a => a.id === addCrew) : null,
          date, name, email, phone,
          notes: selectedModel ? `[Requested Model: ${selectedModel}] ${notes}` : notes,
          location, time, songLink,
          selectedModel,
          modelPreference: modelPreference || selectedModel || '',
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        const msg = data.error || 'Checkout failed';
        const detail = data.code ? ` (${data.code})` : data.type ? ` (${data.type})` : '';
        throw new Error(msg + detail);
      }
      posthog.capture('checkout_redirect', { serviceType, bookingType, packageName: pkg.name, packagePrice: pkg.price });
      window.location.href = data.url;
    } catch (err: any) {
      setSendError(err.message || 'Something went wrong. Please email us at influencemodelsagency@gmail.com');
      setSending(false);
    }
  };

  const chooseService = (t: ServiceType) => {
    posthog.capture('service_selected', { service: t });
    setServiceType(t);
    setSelectedPkgId(null);
    setShowAllPkgs(false);
    setAddCrew(null);
    setBookingType('one-time');
    setTimeout(() => { setStep(1); window.scrollTo({ top: 0, behavior: 'smooth' }); }, 250);
  };
  const chooseFrequency = (t: 'one-time' | 'monthly') => {
    posthog.capture('booking_type_selected', { bookingType: t, serviceType });
    setBookingType(t);
    setSelectedPkgId(null);
    setShowAllPkgs(false);
  };
  const choosePackage = (id: string) => {
    posthog.capture('package_selected', { packageId: id, serviceType, bookingType });
    setSelectedPkgId(id);
  };

  const gold  = '#c9a96e';
  const input = 'w-full h-12 bg-white/[0.03] border border-white/10 px-4 text-white text-sm placeholder:text-white/20 focus:outline-none transition-colors';

  // ── Confirmation Screen ───────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center px-6">
        <div className="text-center max-w-lg">
          <div className="w-16 h-16 flex items-center justify-center mx-auto mb-8 border-2" style={{ borderColor: gold }}>
            <Check className="h-8 w-8" style={{ color: gold }} />
          </div>
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-4" style={{ color: gold }}>Booking Requested</p>
          <h2 className="font-display font-light italic text-white text-4xl mb-4">
            We'll be in touch, {name.split(' ')[0]}.
          </h2>
          <p className="text-white/40 text-sm leading-relaxed mb-2">
            Your <strong className="text-white/70">{pkg?.name}</strong> {serviceType === 'shoot' ? 'shoot booking' : serviceType === 'reaction' ? 'music reaction' : serviceType === 'ugc' ? 'UGC content' : serviceType === 'business' ? 'brand ambassador' : serviceType === 'commercial' ? 'commercial production' : serviceType === 'bottle' ? 'bottle girl / VIP hostess' : 'event hosting'} request has been received.
            {bookingType === 'one-time' && date && (
              <> Requested date: <strong className="text-white/60">{new Date(date + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</strong>.</>
            )}
          </p>
          <p className="text-white/25 text-sm mb-10">Our team will confirm model availability and reach out within 24 hours.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/marketplace" className="px-8 py-4 border border-white/10 text-sm font-bold tracking-widest uppercase text-white/50 hover:text-white hover:border-white/30 transition-all">
              Browse Models
            </Link>
            <Link href="/" className="px-8 py-4 text-sm font-bold tracking-widest uppercase text-black" style={{ backgroundColor: gold }}>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Main Layout ───────────────────────────────────────────────────────────
  return (
    <div className="h-screen bg-[#080808] flex flex-col overflow-hidden">
      {/* Test Mode Banner */}
      {isTestMode && (
        <div className="bg-red-500/10 border-b border-red-500/20 py-2 px-4 text-center z-[999] relative">
          <p className="text-red-400 text-xs font-bold tracking-widest uppercase">⚠ Test Mode — All prices are $1 — Not a real booking</p>
        </div>
      )}
      {/* Nav */}
      <nav className="border-b border-white/[0.06] bg-[#080808]/95 backdrop-blur-xl fixed w-full z-50">
        <div className="flex items-center justify-between h-16 md:h-20 px-6 md:px-14">
          <div className="flex items-center gap-4">
            <MobileNav />
            <div className="hidden md:flex items-center gap-10">
              <Link href="/marketplace" className="text-white/55 hover:text-white transition-colors duration-300 text-[11px] tracking-widest uppercase">Creators</Link>
              <Link href="/services" className="text-white/55 hover:text-white transition-colors duration-300 text-[11px] tracking-widest uppercase">Services</Link>
              <Link href="/pricing" className="text-white/55 hover:text-white transition-colors duration-300 text-[11px] tracking-widest uppercase">Pricing</Link>
            </div>
          </div>
          <Link href="/" className="font-display font-semibold tracking-[0.4em] uppercase" style={{ fontSize: '18px', color: '#c9a96e' }}>Influence</Link>
          <div className="flex items-center gap-10">
            <Link href="/about" className="text-white/55 hover:text-white transition-colors duration-300 text-[11px] tracking-widest uppercase hidden md:block">About</Link>
            <Link href="/marketplace" className="text-[11px] md:text-[12px] tracking-widest uppercase px-5 py-3 md:px-8 md:py-4 transition-all duration-300 hover:opacity-80 font-bold" style={{ backgroundColor: '#c9a96e', color: '#000' }}>View Creators</Link>
          </div>
        </div>
      </nav>

      {/* Header + Progress */}
      <div className="pt-16 px-6 md:px-14 py-3 border-b border-white/[0.06]">
        <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-2 flex items-center gap-2" style={{ color: gold }}>
          {serviceType === 'reaction' ? (
            <><Headphones className="h-3 w-3" /> Music Reactions</>
          ) : serviceType === 'ugc' ? (
            <><Play className="h-3 w-3" /> UGC & Reels</>
          ) : serviceType === 'business' ? (
            <><TrendingUp className="h-3 w-3" /> Brand Ambassadors · Business Content</>
          ) : serviceType === 'commercial' ? (
            <><Film className="h-3 w-3" /> Commercials & Speaking Roles</>
          ) : serviceType === 'event' ? (
            <><Sparkles className="h-3 w-3" /> Events & Hosting</>
          ) : serviceType === 'bottle' ? (
            <><Wine className="h-3 w-3" /> Bottle Girls / VIP Hostesses</>
          ) : serviceType === 'shoot' ? (
            <><Camera className="h-3 w-3" /> Shoots & Videos</>
          ) : (
            <><MapPin className="h-3 w-3" /> Influence Marketplace</>
          )}
        </p>
        <h1 className="font-display font-light italic text-white mb-2" style={{ fontSize: 'clamp(24px, 4vw, 48px)' }}>
          {selectedModel ? `Book ${selectedModel}` : serviceType === 'reaction' ? 'Get Your Music Heard' : serviceType === 'ugc' ? 'Get Content Created' : serviceType === 'business' ? 'Models at Your Business' : serviceType === 'commercial' ? 'Book Your Commercial' : serviceType === 'event' ? 'Book Event Creators' : serviceType === 'bottle' ? 'Book Bottle Girls / VIP Hostesses' : serviceType === 'shoot' ? 'Book Your Shoot' : 'What Do You Need?'}
        </h1>
        {selectedModel && (
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center gap-2 px-3 py-1.5 border border-[#c9a96e]/30 bg-[#c9a96e]/5">
              <Check className="h-3 w-3" style={{ color: gold }} />
              <span className="text-[11px] font-bold tracking-wide" style={{ color: gold }}>Booking: {selectedModel}</span>
            </div>
            <button onClick={() => setSelectedModel(null)} className="text-white/30 hover:text-white/60 text-[10px] tracking-widest uppercase transition-colors">Change</button>
          </div>
        )}
        {/* Progress steps — 3 linear steps */}
        <div className="flex items-center gap-2">
          {STEPS.map((s, displayIdx) => {
            const actualStep = displayIdx;
            const isCompleted = step > actualStep;
            const isCurrent = step === actualStep;
            return (
              <div key={s} className="flex items-center gap-2">
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => isCompleted && setStep(actualStep)}
                >
                  <div
                    className="w-7 h-7 flex items-center justify-center text-[10px] font-bold transition-all duration-300 border"
                    style={{
                      backgroundColor: isCompleted ? gold : 'transparent',
                      borderColor: isCompleted ? gold : isCurrent ? gold : 'rgba(255,255,255,0.1)',
                      color: isCompleted ? '#000' : isCurrent ? gold : 'rgba(255,255,255,0.2)',
                    }}
                  >
                    {isCompleted ? <Check className="h-3 w-3" /> : displayIdx + 1}
                  </div>
                  <span
                    className="text-[10px] tracking-widest uppercase hidden sm:block"
                    style={{ color: isCurrent ? 'white' : isCompleted ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.15)' }}
                  >
                    {s}
                  </span>
                </div>
                {displayIdx < STEPS.length - 1 && (
                  <div className="w-6 md:w-10 h-px mx-1 transition-all duration-300" style={{ backgroundColor: isCompleted ? gold : 'rgba(255,255,255,0.07)' }} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected service banner — always visible after step 0 */}
      {step >= 1 && serviceType && (
        <div className="px-6 md:px-14 py-3 border-b border-white/[0.04] bg-white/[0.02] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: gold }} />
            <p className="text-white/60 text-sm font-semibold">
              {SERVICE_INFO[serviceType].title}
            </p>
            <span className="text-white/20 text-xs">
              · {SERVICE_INFO[serviceType].tag}
            </span>
          </div>
          <button onClick={() => { setStep(0); setServiceType(null); setSelectedPkgId(null); }} className="text-[10px] tracking-widest uppercase text-white/25 hover:text-white/50 transition-colors">
            Change
          </button>
        </div>
      )}

      {/* Step Content */}
      <div ref={stepRef} className="flex-1 px-6 md:px-14 py-4 overflow-y-auto" key={step} style={{ animation: 'fadeIn 0.3s ease-out' }}>

        {/* ── STEP 0: All services in one screen, grouped by category ── */}
        {step === 0 && (
          <div className="max-w-3xl">
            {selectedModel ? (
              <div className="mb-4 px-4 py-3 border border-[#c9a96e]/30 bg-[#c9a96e]/5 flex items-center gap-3">
                <Check className="h-3.5 w-3.5 flex-shrink-0" style={{ color: gold }} />
                <p className="text-sm" style={{ color: gold }}>Booking <span className="font-bold">{selectedModel}</span> — select your service below</p>
              </div>
            ) : (
              <div className="mb-4 p-3 border border-[#c9a96e]/15 bg-[#c9a96e]/[0.03] flex items-center justify-between gap-3">
                <p className="text-white/40 text-xs">Want a specific model? <span className="text-white/25">Browse the roster first.</span></p>
                <Link href="/marketplace" className="text-[10px] font-bold tracking-widest uppercase shrink-0 hover:opacity-80 transition-opacity px-3 py-2" style={{ backgroundColor: '#c9a96e', color: '#000' }}>Browse Creators →</Link>
              </div>
            )}

            <h2 className="font-display font-light italic text-white text-xl md:text-2xl mb-1">What do you need?</h2>
            <p className="text-white/35 text-xs mb-5">Pick a service — we handle the rest.</p>

            {SERVICE_GROUPS.map(({ label, services: svcList }) => {
              return (
                <div key={label} className="mb-5">
                  <p className="text-[9px] font-bold tracking-[0.35em] uppercase text-white/25 mb-2">{label}</p>
                  <div className="grid gap-1.5">
                    {svcList.map(svcId => {
                      const info = SERVICE_INFO[svcId];
                      const SvcIcon = info.Icon;
                      return (
                        <button
                          key={svcId}
                          onClick={() => chooseService(svcId)}
                          className="w-full text-left p-3 border transition-all duration-200 flex items-center gap-3 group"
                          style={{ borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.01)' }}
                          onMouseEnter={e => { e.currentTarget.style.borderColor = gold; e.currentTarget.style.backgroundColor = 'rgba(201,169,110,0.04)'; }}
                          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.01)'; }}
                        >
                          <div className="w-9 h-9 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-[#c9a96e]/40 transition-colors">
                            <SvcIcon className="h-4 w-4 text-white/35 group-hover:text-[#c9a96e] transition-colors" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white/80 font-bold text-sm group-hover:text-white transition-colors">{info.title}</p>
                            <p className="text-white/30 text-[11px] mt-0.5 leading-snug hidden md:block">{info.desc}</p>
                          </div>
                          <div className="text-right shrink-0 flex items-center gap-3">
                            <span className="text-[9px] font-bold tracking-wider uppercase px-2 py-1 border border-white/10 text-white/25">{info.tag}</span>
                            <span className="text-[9px] font-bold tracking-wider uppercase px-2 py-1 text-white/40" style={{ backgroundColor: info.category === 'in-person' ? 'rgba(201,169,110,0.15)' : info.category === 'remote-content' ? 'rgba(59,130,246,0.15)' : info.category === 'story-reposts' ? 'rgba(168,85,247,0.15)' : 'rgba(236,72,153,0.15)' }}>
                              {info.category === 'in-person' ? 'In-Person' : info.category === 'remote-content' ? 'Remote' : info.category === 'story-reposts' ? 'Story Reposts' : 'Collab Posts'}
                            </span>
                            <p className="text-white/50 text-xs font-bold">{info.from}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            <div className="mt-2 p-4 border border-white/[0.04] bg-white/[0.01]">
              <p className="text-white/40 text-sm mb-3">Not sure what you need? Answer a quick question:</p>
              <div className="flex flex-wrap gap-2 mb-3">
                <button onClick={() => { if (typeof window !== 'undefined') window.location.href = '/start?service=storyreposts'; }} className="px-3 py-1.5 text-[10px] font-bold tracking-wider uppercase border border-white/10 text-white/40 hover:border-[#c9a96e]/40 hover:text-white/60 transition-all">
                  Quick visibility boost
                </button>
                <button onClick={() => { if (typeof window !== 'undefined') window.location.href = '/start?service=collabreposts'; }} className="px-3 py-1.5 text-[10px] font-bold tracking-wider uppercase border border-white/10 text-white/40 hover:border-[#c9a96e]/40 hover:text-white/60 transition-all">
                  Dual audience reach
                </button>
                <button onClick={() => { if (typeof window !== 'undefined') window.location.href = '/start?service=ugc'; }} className="px-3 py-1.5 text-[10px] font-bold tracking-wider uppercase border border-white/10 text-white/40 hover:border-[#c9a96e]/40 hover:text-white/60 transition-all">
                  Custom content creation
                </button>
                <button onClick={() => { if (typeof window !== 'undefined') window.location.href = '/start?service=business'; }} className="px-3 py-1.5 text-[10px] font-bold tracking-wider uppercase border border-white/10 text-white/40 hover:border-[#c9a96e]/40 hover:text-white/60 transition-all">
                  In-person brand activation
                </button>
              </div>
              <a href="tel:+15612877194" className="inline-flex items-center gap-2 px-4 py-2.5 text-[10px] font-bold tracking-widest uppercase transition-all hover:opacity-80 shrink-0" style={{ backgroundColor: gold, color: '#000' }}>
                <Phone className="h-3 w-3" /> Call Us
              </a>
            </div>
          </div>
        )}

        {/* ── STEP 1: Packages — frequency toggle + curated cards ── */}
        {step === 1 && serviceType && (
          <div className="max-w-3xl">
            <h2 className="font-display font-light italic text-white text-2xl md:text-3xl mb-1">Choose your package</h2>
            <p className="text-white/35 text-xs mb-5">Transparent pricing — pick what fits, upgrade anytime.</p>

            {/* Frequency toggle — only when monthly exists for this service */}
            {SERVICE_INFO[serviceType].hasMonthly && (
              <div className="inline-flex border border-white/10 mb-6">
                {(['one-time', 'monthly'] as const).map(t => {
                  const active = bookingType === t;
                  return (
                    <button
                      key={t}
                      onClick={() => chooseFrequency(t)}
                      className="px-5 py-2.5 text-[11px] font-bold tracking-widest uppercase transition-all flex items-center gap-2"
                      style={{
                        backgroundColor: active ? gold : 'transparent',
                        color: active ? '#000' : 'rgba(255,255,255,0.4)',
                      }}
                    >
                      {t === 'one-time' ? <CalendarDays className="h-3 w-3" /> : <RefreshCcw className="h-3 w-3" />}
                      {t === 'one-time' ? 'One-Time' : 'Monthly'}
                      {t === 'monthly' && (
                        <span className="text-[8px] px-1.5 py-0.5 border" style={{ borderColor: active ? '#000' : 'rgba(74,222,128,0.3)', color: active ? '#000' : 'rgb(74,222,128)' }}>
                          {MONTHLY_SAVINGS_PCT[serviceType] ? `Save ${MONTHLY_SAVINGS_PCT[serviceType]}%` : 'Priority Scheduling'}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
            {bookingType === 'monthly' && (
              <p className="text-white/30 text-[11px] mb-5 -mt-2">Monthly billing · Priority scheduling · Cancel anytime</p>
            )}

            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              {visiblePkgs.map((p: any) => {
                const active = selectedPkgId === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => choosePackage(p.id)}
                    className="text-left p-5 border transition-all duration-200 relative"
                    style={{
                      borderColor: active ? gold : p.popular ? 'rgba(201,169,110,0.35)' : 'rgba(255,255,255,0.08)',
                      backgroundColor: active ? 'rgba(201,169,110,0.06)' : 'rgba(255,255,255,0.01)',
                    }}
                  >
                    {p.popular && (
                      <span className="absolute -top-2.5 left-4 text-[9px] font-bold tracking-[0.25em] uppercase px-2 py-0.5" style={{ backgroundColor: gold, color: '#000' }}>
                        Most Popular
                      </span>
                    )}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="text-white font-bold text-base">{p.name}</h3>
                        <p className="text-white/35 text-[11px] mt-0.5 leading-snug">{p.tagline}</p>
                      </div>
                      <p className="font-display italic font-bold text-lg shrink-0" style={{ color: gold }}>
                        ${p.price.toLocaleString()}{bookingType === 'monthly' ? '/mo' : ''}
                      </p>
                    </div>
                    <div className="space-y-1.5">
                      {p.perks.slice(0, 4).map((perk: string) => (
                        <div key={perk} className="flex items-center gap-2">
                          <Check className="h-3 w-3 flex-shrink-0" style={{ color: active ? gold : 'rgba(255,255,255,0.2)' }} />
                          <span className="text-white/45 text-xs">{perk}</span>
                        </div>
                      ))}
                    </div>
                    {active && (
                      <div className="mt-3 pt-3 border-t border-[#c9a96e]/20 flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase" style={{ color: gold }}>
                        <Check className="h-3 w-3" /> Selected — continue below
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* View all packages — card grid only */}
            {hasMorePkgs && !showAllPkgs && (
              <button
                onClick={() => setShowAllPkgs(true)}
                className="w-full py-3 mb-4 border border-dashed border-white/10 hover:border-white/25 text-white/35 hover:text-white/60 text-[11px] font-bold tracking-widest uppercase transition-all"
              >
                View All {selfServe.length} Packages ↓
              </button>
            )}

            {/* Enterprise / custom — big productions route to a call */}
            {hasEnterprise && (
              <a
                href="tel:+15612877194"
                className="w-full p-4 border border-white/[0.07] bg-white/[0.01] hover:bg-[#c9a96e]/[0.04] hover:border-[#c9a96e]/30 transition-all duration-300 flex items-center gap-4 group"
              >
                <div className="w-10 h-10 border border-white/10 group-hover:border-[#c9a96e]/40 flex items-center justify-center flex-shrink-0 transition-colors">
                  <Phone className="h-4 w-4 text-white/25 group-hover:text-[#c9a96e] transition-colors" />
                </div>
                <div className="flex-1">
                  <p className="text-white/60 text-sm font-semibold group-hover:text-white transition-colors">Need a larger production or custom package?</p>
                  <p className="text-white/25 text-xs">Full casts, venue takeovers & multi-model teams — talk to us directly</p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-white/15 group-hover:text-[#c9a96e] transition-colors" />
              </a>
            )}
          </div>
        )}

        {/* ── STEP 2: Your Details ── */}
        {step === 2 && (
          <div className="max-w-xl">
            {pkg && (
              <div className="mb-5 p-4 border flex items-center justify-between gap-3" style={{ borderColor: 'rgba(201,169,110,0.3)', backgroundColor: 'rgba(201,169,110,0.04)' }}>
                <div>
                  <p className="text-white font-bold text-sm">{pkg.name} — {SERVICE_INFO[serviceType!].title}</p>
                  <p className="text-white/35 text-[11px] mt-0.5">{pkg.tagline}</p>
                </div>
                <p className="font-display italic font-bold text-xl shrink-0" style={{ color: gold }}>
                  ${pkg.price.toLocaleString()}{bookingType === 'monthly' ? '/mo' : ''}
                </p>
              </div>
            )}
            <h2 className="font-display font-light italic text-white text-3xl md:text-4xl mb-2">Where do we send your confirmation?</h2>
            <p className="text-white/35 text-sm mb-5">Name, phone &amp; email — then straight to secure checkout.</p>

            {/* Social proof strip */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { stat: '500+', label: 'Clients Booked' },
                { stat: '★ 5.0', label: 'Average Rating' },
                { stat: '48hr', label: 'Avg. Response' },
              ].map(({ stat, label }) => (
                <div key={label} className="border border-white/[0.06] p-3 text-center">
                  <p className="font-bold text-sm mb-0.5" style={{ color: gold }}>{stat}</p>
                  <p className="text-white/30 text-[10px] leading-tight">{label}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 mb-6 px-3 py-2 border border-green-500/15 bg-green-500/[0.03]">
              <Check className="h-3.5 w-3.5 text-green-400/70 flex-shrink-0" />
              <p className="text-green-300/60 text-[11px]">Next: secure checkout — powered by Stripe</p>
            </div>

            {/* Contact capture before showing packages */}
            <div className="mb-8 space-y-3">
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/35">Your Contact Info</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Full Name *"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="h-12 bg-white/[0.03] border border-white/10 px-4 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#c9a96e]/50 transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Phone Number *"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="h-12 bg-white/[0.03] border border-white/10 px-4 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#c9a96e]/50 transition-colors"
                />
              </div>
              <input
                type="email"
                placeholder="Email Address *"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full h-12 bg-white/[0.03] border border-white/10 px-4 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#c9a96e]/50 transition-colors"
              />
              {selectedModel && (
                <div className="flex items-center gap-3 px-4 py-3 border border-[#c9a96e]/30 bg-[#c9a96e]/5">
                  <Check className="h-3.5 w-3.5 flex-shrink-0" style={{ color: gold }} />
                  <p className="text-sm" style={{ color: gold }}>Booking <span className="font-bold">{selectedModel}</span> — confirmed</p>
                  <button onClick={() => setSelectedModel(null)} className="ml-auto text-[10px] text-white/30 hover:text-white/60 tracking-widest uppercase">Change</button>
                </div>
              )}
            </div>

            {/* Date / Location — required for in-person one-time bookings so we can confirm availability */}
            {requiresDateLocation && (
              <div className="mb-8 space-y-3">
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/35">Booking Date &amp; Location</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="date"
                    placeholder="Date *"
                    value={date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={e => setDate(e.target.value)}
                    className={input}
                    style={{ colorScheme: 'dark' }}
                  />
                  <input
                    type="time"
                    placeholder="Preferred Time"
                    value={time}
                    onChange={e => setTime(e.target.value)}
                    className={input}
                    style={{ colorScheme: 'dark' }}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Location / Venue Address * (South Florida / Greater Miami)"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  className={input}
                />
                <p className="text-white/20 text-[10px]">We confirm exact availability within 24 hours of booking. Travel outside South Florida / Greater Miami may incur additional fees.</p>
              </div>
            )}

            {/* Optional details toggle */}
            <button
              onClick={() => setShowOptional(v => !v)}
              className="w-full flex items-center justify-between px-4 py-3 mb-3 border border-white/[0.07] hover:border-white/[0.14] bg-white/[0.01] transition-colors text-left"
            >
              <span className="text-white/40 text-xs font-semibold tracking-widest uppercase">{showOptional ? 'Hide' : 'Add'} details — {!requiresDateLocation ? 'date, ' : ''}model preference, notes</span>
              <ChevronRight className={`h-3.5 w-3.5 text-white/25 transition-transform duration-200 ${showOptional ? 'rotate-90' : ''}`} />
            </button>
            {showOptional && (
              <div className="mb-6 space-y-3 border border-white/[0.06] p-4">
                {!requiresDateLocation && (
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/35 mb-2">Preferred Date <span className="text-white/20 normal-case tracking-normal font-normal">(optional)</span></p>
                    <input
                      type="date"
                      value={date}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={e => setDate(e.target.value)}
                      className={input}
                      style={{ colorScheme: 'dark' }}
                    />
                  </div>
                )}
                {!selectedModel && (
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/35 mb-2">Preferred Model <span className="text-white/20 normal-case tracking-normal font-normal">(optional)</span></p>
                    <select
                      value={modelPreference}
                      onChange={e => setModelPreference(e.target.value)}
                      className="w-full h-12 bg-white/[0.03] border border-white/10 px-4 text-sm focus:outline-none focus:border-[#c9a96e]/50 transition-colors appearance-none"
                      style={{ color: modelPreference ? 'white' : 'rgba(255,255,255,0.25)' }}
                    >
                      <option value="">No preference — best available</option>
                      <optgroup label="⭐ Featured">
                        <option value="Deseray Marie">Deseray Marie (66K · Forbes · Celebrity Credits)</option>
                        <option value="Ty Nadia">Ty Nadia (124K · 17M+ Views · Music Video Lead)</option>
                        <option value="Bianca Bonnie">Bianca Bonnie (1.3M · Love &amp; Hip Hop · VH1)</option>
                        <option value="Nya">Nya (94K · Celebrity Credits · Miami)</option>
                        <option value="Bree">Bree (67K · Skits &amp; Brand Content)</option>
                        <option value="Leila">Leila (64K · Fashion &amp; Fitness · Miami)</option>
                      </optgroup>
                      <optgroup label="Music Video Creators">
                        <option value="Shay">Shay (25K · Kodak · Lil Baby · DJ Khaled)</option>
                        <option value="Kady">Kady (11K · Tekashi · Lil Pump · Love &amp; Hip Hop)</option>
                        <option value="Peach">Peach (23K · Buju Banton · Vybz Kartel · Peacock)</option>
                        <option value="Breanna Banks">Breanna Banks (45K · Celeb Features)</option>
                        <option value="Scarlet">Scarlet (12K · LA Fashion Week · Bossman Dlow)</option>
                        <option value="Grace Jenn">Grace Jenn (20K · Coulda Been Love S2 · Druski)</option>
                      </optgroup>
                      <optgroup label="UGC &amp; Content Creators">
                        <option value="Kiki">Kiki (15K · 7-8M Viral Views · Skits)</option>
                        <option value="Malibu">Malibu (35K · Skits &amp; Brand Content)</option>
                        <option value="Nysia">Nysia (60K · Beauty &amp; Lifestyle)</option>
                        <option value="Jas Healer">Jas Healer (16K · YouTuber)</option>
                        <option value="Maelyn Sabrina">Maelyn Sabrina (10K · TikTok &amp; YouTube)</option>
                        <option value="Ashley Mar">Ashley Mar (Netflix · Target · Celsius · Peacock)</option>
                      </optgroup>
                      <optgroup label="Fashion &amp; Lifestyle">
                        <option value="Angelina">Angelina (9.2K · Luxury Lifestyle · Miami)</option>
                        <option value="Hope">Hope (5K · Editorial · Beauty)</option>
                        <option value="Sandra">Sandra (10K · Caribbean Lifestyle · Miami)</option>
                        <option value="Lexcii">Lexcii (4.8K · Fashion · Miami)</option>
                        <option value="Yuli Escobar">Yuli Escobar (22K · Fashion Week · Commercials)</option>
                      </optgroup>
                      <optgroup label="All Other Models">
                        <option value="Kat">Kat (10K · Fashion &amp; Beauty · S. Florida)</option>
                        <option value="Nikki">Nikki (8.6K · Fashion &amp; Lifestyle)</option>
                        <option value="Ayana Alvarez">Ayana Alvarez (5K · Fashion &amp; Beauty)</option>
                        <option value="Kaylese Redd">Kaylese Redd (Voiceover · Commercial · Hair)</option>
                        <option value="Maria">Maria (13.9K · Lifestyle &amp; Fashion)</option>
                        <option value="Genesis Bravo">Genesis Bravo (13.9K · Fashion)</option>
                        <option value="Aliyana Vasquez">Aliyana Vasquez (5K · Miami Swim Week · Runway)</option>
                        <option value="Gabriela">Gabriela (Savage X Fenty · Dez Beauty)</option>
                        <option value="Seahra Raquel">Seahra Raquel (15K · Florida)</option>
                        <option value="Krystle">Krystle (10K · Miami Fashion)</option>
                        <option value="Kendra">Kendra (10K · Florida)</option>
                      </optgroup>
                    </select>
                  </div>
                )}
                {/* Service-specific notes inside optional block */}
                {(serviceType === 'shoot' || serviceType === 'event' || serviceType === 'business') && (
                  <div className="flex items-start gap-3 pt-2 border-t border-white/[0.06]">
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: gold }} />
                    <p className="text-white/25 text-xs leading-relaxed">
                      All in-person bookings are for the <span className="text-white/45">South Florida / Greater Miami</span> area. Travel outside the region may incur additional fees discussed during confirmation.
                    </p>
                  </div>
                )}
                {serviceType === 'reaction' && (
                  <div className="flex items-start gap-3 pt-2 border-t border-white/[0.06]">
                    <Headphones className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: gold }} />
                    <p className="text-white/25 text-xs leading-relaxed">
                      Reaction videos are recorded <span className="text-white/45">remotely</span> and delivered as HD vertical video files ready to post. Typical turnaround is 3–5 business days.
                    </p>
                  </div>
                )}
                {serviceType === 'ugc' && (
                  <div className="flex items-start gap-3 pt-2 border-t border-white/[0.06]">
                    <Play className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: gold }} />
                    <p className="text-white/25 text-xs leading-relaxed">
                      UGC content is created <span className="text-white/45">remotely</span> to your brief and delivered as HD vertical video files. Typical turnaround is 5–7 business days.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Trust strip — no distractions before checkout */}
            <div className="flex items-center gap-2 text-white/25 text-[11px]">
              <ShieldCheck className="h-3.5 w-3.5 flex-shrink-0" style={{ color: gold }} />
              <p>Secure checkout via Stripe · Our team confirms model availability within 24 hours of booking.</p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="px-6 md:px-14 py-6 border-t border-white/[0.06] flex items-center justify-between sticky bottom-0 bg-[#080808]">
        <button
          onClick={() => {
            setStep(s => Math.max(0, s - 1));
            setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50);
          }}
          disabled={step === 0}
          className="flex items-center gap-2 text-sm tracking-widest uppercase text-white/30 hover:text-white transition-colors disabled:opacity-0"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </button>

        <div className="flex items-center gap-6">
          {pkg && step >= 1 && (
            <p className="text-white/25 text-sm hidden sm:block">
              <span className="text-white/60 font-semibold">{pkg.name}</span>
              {' · '}
              <span style={{ color: gold }}>${pkg.price.toLocaleString()}{bookingType === 'monthly' ? '/mo' : ''}</span>
            </p>
          )}
          {step === 2 && canNext() && (
            <div className="items-center gap-1.5 text-white/20 text-[10px] hidden md:flex">
              <ShieldCheck className="h-3 w-3" /> Powered by Stripe · 256-bit SSL
            </div>
          )}

          {/* On step 0, service click auto-advances — no Next button needed */}
          {step > 0 && (
            <button
              onClick={goNext}
              disabled={!canNext() || sending}
              className="flex items-center gap-3 px-8 py-4 text-sm font-bold tracking-widest uppercase transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ backgroundColor: gold, color: '#000' }}
            >
              {sending ? 'Redirecting to Payment...' : step === 2 ? (<><Lock className="h-3.5 w-3.5" /> Secure Checkout →</>) : step === 1 && pkg ? `Continue with ${pkg.name} →` : step === 1 ? 'Select a Package' : 'Next →'}
            </button>
          )}
        </div>
      </div>
      {sendError && (
        <div className="px-6 md:px-14 py-3 bg-red-500/10 border-t border-red-500/20">
          <p className="text-red-400 text-sm text-center">{sendError}</p>
        </div>
      )}
    </div>
  );
}

export default function ModelBookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#080808]" />}>
      <ModelBookingContent />
    </Suspense>
  );
}
