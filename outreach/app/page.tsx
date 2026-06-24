'use client';

import { useState, useEffect, useCallback } from 'react';

const G = '#c9a96e';

type Tab = 'autopilot' | 'drops' | 'search' | 'businesses' | 'leads' | 'dm' | 'add';
type LeadStatus = 'new' | 'emailed' | 'replied' | 'booked' | 'declined' | 'follow-up';

interface Lead {
  id: string;
  name: string;
  type: string;
  email: string;
  phone?: string;
  instagram?: string;
  spotify?: string;
  website?: string;
  followers?: number;
  genre?: string;
  niche?: string;
  city?: string;
  address?: string;
  rating?: number;
  source: string;
  status: LeadStatus;
  notes: string;
  emailsSent: { date: string; template: string; subject: string }[];
  dmsSent?: { date: string; platform: string; text: string }[];
  createdAt: string;
}

interface BusinessProspect {
  placeId: string;
  name: string;
  address: string;
  phone?: string;
  website?: string;
  rating?: number;
  reviewCount?: number;
  types: string[];
  mapsUrl: string;
}

interface SpotifyArtist {
  id: string;
  name: string;
  followers: number;
  genres: string[];
  spotifyUrl: string;
  imageUrl?: string;
  popularity: number;
}

interface NewRelease {
  trackName: string;
  artistName: string;
  artistId: string;
  albumName: string;
  releaseDate: string;
  spotifyUrl: string;
  artistSpotifyUrl: string;
  imageUrl?: string;
  followers?: number;
  popularity?: number;
}

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-500/20 text-blue-400',
  emailed: 'bg-yellow-500/20 text-yellow-400',
  replied: 'bg-green-500/20 text-green-400',
  booked: 'bg-emerald-500/20 text-emerald-300',
  declined: 'bg-red-500/20 text-red-400',
  'follow-up': 'bg-purple-500/20 text-purple-400',
};

export default function Dashboard() {
  const [tab, setTab] = useState<Tab>('drops');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<any>({});
  const [rateLimit, setRateLimit] = useState<any>({});

  // Drops state
  const [drops, setDrops] = useState<NewRelease[]>([]);
  const [dropsLoading, setDropsLoading] = useState(false);
  const [dropsGenre, setDropsGenre] = useState('');
  const [addingDrop, setAddingDrop] = useState<string | null>(null);
  const [dropEmail, setDropEmail] = useState('');

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [artists, setArtists] = useState<SpotifyArtist[]>([]);
  const [searching, setSearching] = useState(false);
  const [scraping, setScraping] = useState<string | null>(null);
  const [scrapeResults, setScrapeResults] = useState<Record<string, any>>({});

  // Add lead state
  const [addForm, setAddForm] = useState({ name: '', email: '', type: 'artist', instagram: '', notes: '' });

  // Send email state
  const [sendingTo, setSendingTo] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState('artist-cold');

  // Business finder state
  const [bizNiche, setBizNiche] = useState('med spa');
  const [bizCity, setBizCity] = useState('Miami FL');
  const [niches, setNiches] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [businesses, setBusinesses] = useState<BusinessProspect[]>([]);
  const [bizLoading, setBizLoading] = useState(false);
  const [bizSaving, setBizSaving] = useState(false);

  // Auto-pilot state
  const [autoConfig, setAutoConfig] = useState({
    discoverArtists: true,
    discoverBusinesses: true,
    autoEmail: true,
    autoFollowUp: true,
    maxNewLeads: 20,
    businessNiche: '',
    businessCity: '',
    artistGenre: '',
  });
  const [autoRunning, setAutoRunning] = useState(false);
  const [autoResult, setAutoResult] = useState<any>(null);
  const [ramp, setRamp] = useState<any>(null);

  // DM state
  const [dmLead, setDmLead] = useState<Lead | null>(null);
  const [dmScripts, setDmScripts] = useState<{ variant: number; text: string }[]>([]);
  const [dmDeepLink, setDmDeepLink] = useState('');
  const [copiedVariant, setCopiedVariant] = useState<number | null>(null);

  const fetchLeads = useCallback(async () => {
    try {
      const res = await fetch('/api/leads');
      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads || []);
        setStats(data.stats || {});
      }
    } catch {}
  }, []);

  const fetchRateLimit = useCallback(async () => {
    try {
      const res = await fetch('/api/send');
      if (res.ok) setRateLimit(await res.json());
    } catch {}
  }, []);

  useEffect(() => { fetchLeads(); fetchRateLimit(); }, [fetchLeads, fetchRateLimit]);

  // Spotify search
  async function handleSearch(action: string, customQuery?: string) {
    setSearching(true);
    setScrapeResults({});
    try {
      const q = customQuery || searchQuery;
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, query: q }),
      });
      const data = await res.json();
      setArtists(data.artists || []);
    } catch { setArtists([]); }
    setSearching(false);
  }

  // Fetch new drops
  async function fetchDrops(genre?: string) {
    setDropsLoading(true);
    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'drops', query: genre || dropsGenre || undefined }),
      });
      const data = await res.json();
      setDrops(data.drops || []);
    } catch { setDrops([]); }
    setDropsLoading(false);
  }

  // Add a drop as a lead with email
  async function addDropAsLead(drop: NewRelease, email: string) {
    if (!email) return;
    await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: drop.artistName,
        email,
        type: 'artist',
        spotify: drop.artistSpotifyUrl,
        notes: `New release: "${drop.trackName}" (${drop.releaseDate})`,
        source: 'new-drop',
      }),
    });
    setAddingDrop(null);
    setDropEmail('');
    fetchLeads();
  }

  // Scrape contact info for an artist
  async function handleScrape(artist: SpotifyArtist) {
    setScraping(artist.id);
    try {
      const res = await fetch('/api/search', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: artist.name,
          spotify: artist.spotifyUrl,
          followers: artist.followers,
          genre: artist.genres[0] || '',
        }),
      });
      const data = await res.json();
      setScrapeResults(prev => ({ ...prev, [artist.id]: data }));
      if (data.added > 0) fetchLeads();
    } catch {}
    setScraping(null);
  }

  // Add lead manually
  async function handleAddLead(e: React.FormEvent) {
    e.preventDefault();
    await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...addForm, source: 'manual' }),
    });
    setAddForm({ name: '', email: '', type: 'artist', instagram: '', notes: '' });
    fetchLeads();
    setTab('leads');
  }

  // Send email
  async function handleSendEmail(leadId: string) {
    setSendingTo(leadId);
    await fetch('/api/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ leadId, template: selectedTemplate }),
    });
    setSendingTo(null);
    fetchLeads();
    fetchRateLimit();
  }

  // Update lead status
  async function updateStatus(id: string, status: string) {
    await fetch('/api/leads', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    fetchLeads();
  }

  // Delete lead
  async function handleDelete(id: string) {
    await fetch('/api/leads', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetchLeads();
  }

  // ── Business finder ──
  const fetchNiches = useCallback(async () => {
    try {
      const res = await fetch('/api/places');
      if (res.ok) {
        const data = await res.json();
        setNiches(data.niches || []);
        setCities(data.cities || []);
      }
    } catch {}
  }, []);

  useEffect(() => { fetchNiches(); }, [fetchNiches]);

  const fetchRamp = useCallback(async () => {
    try {
      const res = await fetch('/api/scheduler');
      if (res.ok) setRamp(await res.json());
    } catch {}
  }, []);

  useEffect(() => { fetchRamp(); }, [fetchRamp]);

  async function findBusinesses() {
    setBizLoading(true);
    setBusinesses([]);
    try {
      const res = await fetch('/api/places', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ niche: bizNiche, city: bizCity, limit: 15 }),
      });
      const data = await res.json();
      if (data.error) alert(data.error);
      setBusinesses(data.businesses || []);
    } catch { setBusinesses([]); }
    setBizLoading(false);
  }

  async function saveBusinesses() {
    setBizSaving(true);
    try {
      const res = await fetch('/api/places', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businesses, niche: bizNiche, city: bizCity }),
      });
      const data = await res.json();
      alert(`Added ${data.added} business leads`);
      fetchLeads();
    } catch {}
    setBizSaving(false);
  }

  // ── Auto-pilot ──
  async function runAutopilot() {
    setAutoRunning(true);
    setAutoResult(null);
    try {
      const res = await fetch('/api/autopilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(autoConfig),
      });
      const data = await res.json();
      setAutoResult(data);
      fetchLeads();
      fetchRateLimit();
      fetchRamp();
    } catch (e: any) {
      setAutoResult({ error: e.message });
    }
    setAutoRunning(false);
  }

  // ── DM scripts ──
  async function openDM(lead: Lead) {
    setDmLead(lead);
    setDmScripts([]);
    setDmDeepLink('');
    try {
      const res = await fetch('/api/dm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId: lead.id }),
      });
      const data = await res.json();
      setDmScripts(data.scripts || []);
      setDmDeepLink(data.deepLink || '');
    } catch {}
  }

  async function copyDM(variant: number, text: string) {
    try { await navigator.clipboard.writeText(text); } catch {}
    setCopiedVariant(variant);
    setTimeout(() => setCopiedVariant(null), 1500);
  }

  async function markDMSent(text: string) {
    if (!dmLead) return;
    await fetch('/api/dm', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ leadId: dmLead.id, text, platform: 'instagram' }),
    });
    fetchLeads();
    setDmLead(null);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: G }}>Influence Outreach</h1>
          <p className="text-white/40 text-sm mt-1">Find artists · Scrape emails · Send cold outreach</p>
        </div>
        <div className="flex items-center gap-4 text-xs text-white/30">
          <span>📧 {rateLimit.sentToday || 0}/{rateLimit.maxPerDay || 100} today</span>
          <span>⏱ {rateLimit.sentThisHour || 0}/{rateLimit.maxPerHour || 20} this hr</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-8">
        {[
          { label: 'Total', value: stats.total || 0, color: 'text-white' },
          { label: 'New', value: stats.new || 0, color: 'text-blue-400' },
          { label: 'Emailed', value: stats.emailed || 0, color: 'text-yellow-400' },
          { label: 'Replied', value: stats.replied || 0, color: 'text-green-400' },
          { label: 'Booked', value: stats.booked || 0, color: 'text-emerald-300' },
          { label: 'Declined', value: stats.declined || 0, color: 'text-red-400' },
        ].map(s => (
          <div key={s.label} className="bg-white/[0.03] border border-white/[0.06] p-4 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-white/30 text-[10px] uppercase tracking-wider mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-white/[0.06] pb-px flex-wrap">
        {(['autopilot', 'drops', 'search', 'businesses', 'leads', 'dm', 'add'] as Tab[]).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-3 text-sm font-bold uppercase tracking-wider transition-all ${
              tab === t ? 'text-black' : 'text-white/40 hover:text-white/60'
            }`}
            style={tab === t ? { backgroundColor: G } : {}}
          >
            {t === 'autopilot' ? '🚀 Auto-Pilot'
              : t === 'drops' ? '🔥 New Drops'
              : t === 'search' ? '🔍 Find Artists'
              : t === 'businesses' ? '💼 Find Businesses'
              : t === 'leads' ? `📋 Leads (${leads.length})`
              : t === 'dm' ? '💬 DM Queue'
              : '➕ Add Lead'}
          </button>
        ))}
      </div>

      {/* ═══ AUTO-PILOT TAB ═══ */}
      {tab === 'autopilot' && (
        <div className="max-w-3xl">
          {/* Warm-up / ramp status */}
          {ramp && (
            <div className="bg-gradient-to-r from-[#c9a96e]/[0.08] to-transparent border border-[#c9a96e]/20 p-5 mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-bold text-sm uppercase tracking-wider">📈 Inbox Warm-Up Status</h3>
                {ramp.fullVolumeReached
                  ? <span className="text-emerald-300 text-xs font-bold">✓ Full volume</span>
                  : <span className="text-[#c9a96e] text-xs font-bold">Ramping up</span>}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: 'Warm-up Day', value: ramp.warmupDay },
                  { label: "Today's Cap", value: `${ramp.dailyCap}/day` },
                  { label: 'Sent Today', value: ramp.emailsSentToday },
                  { label: 'Remaining', value: ramp.remainingToday },
                ].map(s => (
                  <div key={s.label} className="bg-black/30 border border-white/[0.06] p-3 text-center">
                    <p className="text-xl font-bold" style={{ color: G }}>{s.value}</p>
                    <p className="text-white/30 text-[10px] uppercase tracking-wider mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
              {/* Progress to full volume */}
              <div className="mt-3">
                <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${Math.min(100, (ramp.dailyCap / ramp.ceiling) * 100)}%`, backgroundColor: G }} />
                </div>
                <p className="text-white/30 text-[11px] mt-2">
                  Ramping toward {ramp.ceiling}/day ceiling · total sent all-time: {ramp.totalEmailsSent}
                </p>
              </div>
            </div>
          )}

          {/* Continuous worker instructions */}
          <div className="bg-green-500/[0.05] border border-green-500/20 p-5 mb-6">
            <h3 className="text-green-400/90 font-bold text-sm mb-2">♾️ Run It Continuously (Hands-Off)</h3>
            <p className="text-white/50 text-xs mb-3">
              The button below runs the pipeline once. To make it run <b>by itself all day</b> — scraping + emailing on the warm-up ramp — start the continuous worker in a terminal:
            </p>
            <code className="block bg-black/40 border border-white/10 px-3 py-2 text-green-400/80 text-xs">
              cd /Users/edenroy/Downloads/INFLUENCE/outreach && npm run autopilot
            </code>
            <p className="text-white/30 text-[11px] mt-2">
              Keep that terminal open. It runs every ~45 min during 9am–7pm, paces emails ~45s apart, and stops automatically at your daily ramp cap. Press Ctrl+C to stop.
            </p>
          </div>

          <div className="bg-white/[0.02] border border-white/[0.06] p-6 mb-6">
            <h2 className="text-lg font-bold text-white mb-1">🚀 Auto-Pilot Outreach</h2>
            <p className="text-white/40 text-sm mb-5">
              One click: discovers artists + businesses, scrapes their contacts, sends cold emails, and schedules follow-ups — all within your rate limits.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-5">
              {[
                { key: 'discoverArtists', label: 'Discover artists (Spotify)' },
                { key: 'discoverBusinesses', label: 'Discover businesses (Places)' },
                { key: 'autoEmail', label: 'Auto-send cold emails' },
                { key: 'autoFollowUp', label: 'Auto follow-up (3+ days)' },
              ].map(opt => (
                <label key={opt.key} className="flex items-center gap-3 bg-white/[0.02] border border-white/[0.06] px-4 py-3 cursor-pointer hover:border-white/10">
                  <input
                    type="checkbox"
                    checked={(autoConfig as any)[opt.key]}
                    onChange={e => setAutoConfig(c => ({ ...c, [opt.key]: e.target.checked }))}
                    className="accent-[#c9a96e]"
                  />
                  <span className="text-white/70 text-sm">{opt.label}</span>
                </label>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3 mb-5">
              <div>
                <label className="text-white/40 text-[10px] uppercase tracking-wider block mb-1">Max new leads</label>
                <input
                  type="number"
                  value={autoConfig.maxNewLeads}
                  onChange={e => setAutoConfig(c => ({ ...c, maxNewLeads: parseInt(e.target.value) || 10 }))}
                  className="w-full bg-white/[0.04] border border-white/10 px-3 py-2 text-white text-sm focus:outline-none"
                />
              </div>
              <div>
                <label className="text-white/40 text-[10px] uppercase tracking-wider block mb-1">Business niche (optional)</label>
                <select
                  value={autoConfig.businessNiche}
                  onChange={e => setAutoConfig(c => ({ ...c, businessNiche: e.target.value }))}
                  className="w-full bg-white/[0.04] border border-white/10 px-3 py-2 text-white text-sm focus:outline-none"
                >
                  <option value="" className="bg-[#0a0a0a]">Rotate all</option>
                  {niches.map(n => <option key={n} value={n} className="bg-[#0a0a0a]">{n}</option>)}
                </select>
              </div>
              <div>
                <label className="text-white/40 text-[10px] uppercase tracking-wider block mb-1">Business city (optional)</label>
                <select
                  value={autoConfig.businessCity}
                  onChange={e => setAutoConfig(c => ({ ...c, businessCity: e.target.value }))}
                  className="w-full bg-white/[0.04] border border-white/10 px-3 py-2 text-white text-sm focus:outline-none"
                >
                  <option value="" className="bg-[#0a0a0a]">Rotate all</option>
                  {cities.map(c => <option key={c} value={c} className="bg-[#0a0a0a]">{c}</option>)}
                </select>
              </div>
            </div>

            <button
              onClick={runAutopilot}
              disabled={autoRunning}
              className="w-full px-6 py-4 font-bold text-sm uppercase tracking-wider disabled:opacity-40"
              style={{ backgroundColor: G, color: '#000' }}
            >
              {autoRunning ? '⏳ Running pipeline...' : '🚀 Run Auto-Pilot Now'}
            </button>
            <p className="text-white/20 text-[11px] mt-3">
              Tip: to run this automatically every day, point a cron service (cron-job.org or Netlify scheduled functions) at <code className="text-white/40">/api/autopilot?secret=YOUR_SECRET</code>.
            </p>
          </div>

          {autoResult && (
            <div className="bg-white/[0.02] border border-white/[0.06] p-6">
              <h3 className="text-white font-bold mb-4">Run Results</h3>
              {autoResult.error ? (
                <p className="text-red-400 text-sm">{autoResult.error}</p>
              ) : (
                <>
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-4">
                    {[
                      { label: 'Artists', value: autoResult.artistsFound },
                      { label: 'Businesses', value: autoResult.businessesFound },
                      { label: 'Leads Added', value: autoResult.leadsAdded },
                      { label: 'Emails Sent', value: autoResult.emailsSent },
                      { label: 'Follow-ups', value: autoResult.followUpsSent },
                    ].map(s => (
                      <div key={s.label} className="bg-white/[0.03] border border-white/[0.06] p-3 text-center">
                        <p className="text-xl font-bold" style={{ color: G }}>{s.value ?? 0}</p>
                        <p className="text-white/30 text-[10px] uppercase tracking-wider mt-1">{s.label}</p>
                      </div>
                    ))}
                  </div>
                  {autoResult.errors?.length > 0 && (
                    <details className="text-xs">
                      <summary className="text-yellow-400/60 cursor-pointer">{autoResult.errors.length} warnings</summary>
                      <ul className="mt-2 space-y-1 text-white/30">
                        {autoResult.errors.map((e: string, i: number) => <li key={i}>· {e}</li>)}
                      </ul>
                    </details>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      )}

      {/* ═══ FIND BUSINESSES TAB ═══ */}
      {tab === 'businesses' && (
        <div>
          <p className="text-white/40 text-sm mb-4">Find local businesses (med spas, restaurants, nightlife, etc.) → pull their website + phone → save as leads for cold outreach.</p>
          <div className="flex flex-wrap gap-3 mb-4">
            <select
              value={bizNiche}
              onChange={e => setBizNiche(e.target.value)}
              className="bg-white/[0.04] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/20"
            >
              {(niches.length ? niches : [bizNiche]).map(n => <option key={n} value={n} className="bg-[#0a0a0a]">{n}</option>)}
            </select>
            <select
              value={bizCity}
              onChange={e => setBizCity(e.target.value)}
              className="bg-white/[0.04] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/20"
            >
              {(cities.length ? cities : [bizCity]).map(c => <option key={c} value={c} className="bg-[#0a0a0a]">{c}</option>)}
            </select>
            <button
              onClick={findBusinesses}
              disabled={bizLoading}
              className="px-6 py-3 font-bold text-sm uppercase tracking-wider disabled:opacity-30"
              style={{ backgroundColor: G, color: '#000' }}
            >
              {bizLoading ? '...' : 'Find Businesses'}
            </button>
            {businesses.length > 0 && (
              <button
                onClick={saveBusinesses}
                disabled={bizSaving}
                className="px-6 py-3 font-bold text-sm uppercase tracking-wider border border-white/10 text-white/60 hover:text-white hover:border-white/20 disabled:opacity-30"
              >
                {bizSaving ? 'Saving...' : `+ Save All (${businesses.length})`}
              </button>
            )}
          </div>

          {businesses.length > 0 && (
            <div className="space-y-2">
              <p className="text-white/30 text-xs mb-3">{businesses.length} businesses found</p>
              {businesses.map(b => (
                <div key={b.placeId} className="flex items-center gap-4 bg-white/[0.02] border border-white/[0.06] p-4 hover:border-white/10 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <p className="text-white font-semibold truncate">{b.name}</p>
                      {b.rating && <span className="text-[#c9a96e] text-xs">{b.rating}★ ({b.reviewCount || 0})</span>}
                    </div>
                    <p className="text-white/30 text-xs truncate">{b.address}</p>
                    <div className="flex items-center gap-3 mt-1 text-[11px]">
                      {b.phone && <span className="text-white/40">{b.phone}</span>}
                      {b.website && <a href={b.website} target="_blank" rel="noopener noreferrer" className="text-blue-400/70 hover:text-blue-400">Website ↗</a>}
                      <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-green-400/60 hover:text-green-400">Maps ↗</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ═══ DM QUEUE TAB ═══ */}
      {tab === 'dm' && (
        <div>
          <div className="bg-yellow-500/[0.06] border border-yellow-500/20 p-4 mb-5">
            <p className="text-yellow-400/80 text-xs">
              ⚠️ Compliant DM workflow: we generate personalized scripts + open the real chat. You send manually (2 sec each) to avoid Instagram/TikTok bans from automated DMs.
            </p>
          </div>
          {leads.filter(l => l.instagram).length === 0 ? (
            <div className="text-center py-20">
              <p className="text-white/20 text-lg">No leads with Instagram handles yet</p>
              <p className="text-white/10 text-sm mt-2">Find artists/businesses with IG handles to generate DM scripts</p>
            </div>
          ) : (
            <div className="space-y-2">
              {leads.filter(l => l.instagram).map(lead => (
                <div key={lead.id} className="flex items-center gap-4 bg-white/[0.02] border border-white/[0.06] p-4 hover:border-white/10 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <p className="text-white font-semibold">{lead.name}</p>
                      <span className="text-white/15 text-[10px]">{lead.type}</span>
                      {lead.dmsSent && lead.dmsSent.length > 0 && <span className="text-green-400/60 text-[10px]">✓ DM sent</span>}
                    </div>
                    <p className="text-white/40 text-xs mt-1">{lead.instagram}</p>
                  </div>
                  <button
                    onClick={() => openDM(lead)}
                    className="px-4 py-2 text-xs font-bold uppercase tracking-wider"
                    style={{ backgroundColor: G, color: '#000' }}
                  >
                    Get DM Script
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* DM Modal */}
          {dmLead && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50" onClick={() => setDmLead(null)}>
              <div className="bg-[#0d0d0d] border border-white/10 max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-white font-bold text-lg">DM Scripts — {dmLead.name}</h3>
                    <p className="text-white/30 text-xs">{dmLead.instagram}</p>
                  </div>
                  <button onClick={() => setDmLead(null)} className="text-white/30 hover:text-white text-xl">✕</button>
                </div>
                {dmDeepLink && (
                  <a
                    href={dmDeepLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mb-4 px-4 py-2 text-xs font-bold uppercase tracking-wider border border-white/10 text-white/60 hover:text-white hover:border-white/20"
                  >
                    Open Instagram ↗
                  </a>
                )}
                <div className="space-y-3">
                  {dmScripts.map(s => (
                    <div key={s.variant} className="bg-white/[0.03] border border-white/[0.06] p-4">
                      <p className="text-white/80 text-sm whitespace-pre-wrap mb-3">{s.text}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => copyDM(s.variant, s.text)}
                          className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider border border-white/10 text-white/60 hover:text-white hover:border-white/20"
                        >
                          {copiedVariant === s.variant ? '✓ Copied' : 'Copy'}
                        </button>
                        <button
                          onClick={() => markDMSent(s.text)}
                          className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider"
                          style={{ backgroundColor: G, color: '#000' }}
                        >
                          Mark Sent
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ═══ NEW DROPS TAB ═══ */}
      {tab === 'drops' && (
        <div>
          <p className="text-white/40 text-sm mb-4">Find artists who just dropped new music → add their email → send personalized outreach mentioning their song.</p>
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              value={dropsGenre}
              onChange={e => setDropsGenre(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && fetchDrops()}
              placeholder="Genre filter (e.g. rap, r&b, latin)..."
              className="flex-1 bg-white/[0.04] border border-white/10 px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white/20"
            />
            <button
              onClick={() => fetchDrops()}
              disabled={dropsLoading}
              className="px-6 py-3 font-bold text-sm uppercase tracking-wider disabled:opacity-30"
              style={{ backgroundColor: G, color: '#000' }}
            >
              {dropsLoading ? '...' : 'Find Drops'}
            </button>
          </div>
          {/* Genre chips */}
          <div className="flex flex-wrap gap-2 mb-6">
            {['hip hop', 'rap', 'r&b', 'trap', 'latin', 'pop', 'florida rap', 'drill'].map(g => (
              <button
                key={g}
                onClick={() => { setDropsGenre(g); fetchDrops(g); }}
                className="px-3 py-1.5 text-[11px] border border-white/10 text-white/40 hover:text-white hover:border-white/20 transition-all"
              >
                {g}
              </button>
            ))}
          </div>

          {drops.length > 0 && (
            <div className="space-y-3">
              <p className="text-white/30 text-xs">{drops.length} new releases found — find their email on IG/socials and add to outreach</p>
              {drops.map((d, i) => (
                <div key={i} className="bg-white/[0.02] border border-white/[0.06] p-5 hover:border-white/10 transition-colors">
                  <div className="flex items-start gap-4">
                    {d.imageUrl && (
                      <img src={d.imageUrl} alt={d.trackName} className="w-16 h-16 object-cover flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold">&ldquo;{d.trackName}&rdquo;</p>
                      <p className="text-white/50 text-sm">{d.artistName}</p>
                      <p className="text-white/20 text-xs mt-1">Released {d.releaseDate}{d.followers ? ` · ${d.followers.toLocaleString()} followers` : ''}</p>
                      {/* Quick links to find their email */}
                      <div className="flex items-center gap-3 mt-2">
                        <a href={`https://www.instagram.com/explore/search/keyword/?q=${encodeURIComponent(d.artistName)}`} target="_blank" rel="noopener noreferrer" className="text-pink-400/70 hover:text-pink-400 text-[11px] font-medium">
                          IG Search ↗
                        </a>
                        <a href={`https://www.google.com/search?q=${encodeURIComponent(d.artistName + ' musician instagram')}`} target="_blank" rel="noopener noreferrer" className="text-blue-400/70 hover:text-blue-400 text-[11px] font-medium">
                          Google ↗
                        </a>
                        <a href={d.artistSpotifyUrl} target="_blank" rel="noopener noreferrer" className="text-green-400/70 hover:text-green-400 text-[11px] font-medium">
                          Spotify ↗
                        </a>
                        <a href={d.spotifyUrl} target="_blank" rel="noopener noreferrer" className="text-green-400/40 hover:text-green-400 text-[11px]">
                          Track ↗
                        </a>
                        <a href={`https://www.google.com/search?q=${encodeURIComponent('"' + d.artistName + '" email booking contact')}`} target="_blank" rel="noopener noreferrer" className="text-yellow-400/70 hover:text-yellow-400 text-[11px] font-medium">
                          Find Email ↗
                        </a>
                      </div>
                    </div>
                    <div className="shrink-0">
                      {addingDrop === d.artistId ? (
                        <div className="flex flex-col gap-2">
                          <input
                            type="email"
                            value={dropEmail}
                            onChange={e => setDropEmail(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && addDropAsLead(d, dropEmail)}
                            placeholder="Paste email from their bio..."
                            className="bg-white/[0.04] border border-white/10 px-3 py-2 text-xs text-white placeholder:text-white/20 focus:outline-none w-56"
                            autoFocus
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => addDropAsLead(d, dropEmail)}
                              disabled={!dropEmail}
                              className="flex-1 px-3 py-2 text-xs font-bold uppercase disabled:opacity-30"
                              style={{ backgroundColor: G, color: '#000' }}
                            >
                              Save Lead
                            </button>
                            <button onClick={() => setAddingDrop(null)} className="text-white/30 text-xs hover:text-white px-2">✕</button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => { setAddingDrop(d.artistId); setDropEmail(''); }}
                          className="px-4 py-2 text-xs font-bold uppercase tracking-wider border border-white/10 text-white/50 hover:text-white hover:border-white/20"
                        >
                          + Add
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ═══ SEARCH TAB ═══ */}
      {tab === 'search' && (
        <div>
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch('search')}
              placeholder="Search small/upcoming artists..."
              className="flex-1 bg-white/[0.04] border border-white/10 px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white/20"
            />
            <button
              onClick={() => handleSearch('search')}
              disabled={searching || !searchQuery}
              className="px-6 py-3 font-bold text-sm uppercase tracking-wider disabled:opacity-30"
              style={{ backgroundColor: G, color: '#000' }}
            >
              {searching ? '...' : 'Search'}
            </button>
            <button
              onClick={() => handleSearch('discover')}
              disabled={searching}
              className="px-6 py-3 font-bold text-sm uppercase tracking-wider border border-white/10 text-white/60 hover:text-white hover:border-white/20 disabled:opacity-30"
            >
              🎲 Discover
            </button>
          </div>
          {/* Quick search suggestions */}
          <div className="flex flex-wrap gap-2 mb-6">
            {['miami rapper', 'underground r&b', 'florida hip hop', 'independent artist', 'latin trap', 'upcoming singer', 'new rapper 2024', 'south florida artist'].map(q => (
              <button
                key={q}
                onClick={() => { setSearchQuery(q); handleSearch('search', q); }}
                className="px-3 py-1.5 text-[11px] border border-white/10 text-white/40 hover:text-white hover:border-white/20 transition-all"
              >
                {q}
              </button>
            ))}
          </div>

          {artists.length > 0 && (
            <div className="space-y-2">
              <p className="text-white/30 text-xs mb-3">{artists.length} artists found — click "Find Email" to scrape contact info</p>
              {artists.map(a => (
                <div key={a.id} className="flex items-center gap-4 bg-white/[0.02] border border-white/[0.06] p-4 hover:border-white/10 transition-colors">
                  {a.imageUrl && (
                    <img src={a.imageUrl} alt={a.name} className="w-12 h-12 object-cover rounded-full flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold truncate">{a.name}</p>
                    <p className="text-white/30 text-xs">
                      {a.followers.toLocaleString()} followers · {a.genres.slice(0, 2).join(', ') || 'No genre'} · Pop. {a.popularity}
                    </p>
                  </div>
                  <a href={a.spotifyUrl} target="_blank" rel="noopener noreferrer" className="text-green-400/60 hover:text-green-400 text-xs">
                    Spotify ↗
                  </a>
                  {scrapeResults[a.id] ? (
                    <div className="text-xs">
                      {scrapeResults[a.id].found ? (
                        <span className="text-green-400">✓ {scrapeResults[a.id].emails?.join(', ')}</span>
                      ) : (
                        <span className="text-red-400/60">No email found</span>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => handleScrape(a)}
                      disabled={scraping === a.id}
                      className="px-4 py-2 text-xs font-bold uppercase tracking-wider border border-white/10 text-white/50 hover:text-white hover:border-white/20 disabled:opacity-30"
                    >
                      {scraping === a.id ? 'Scraping...' : 'Find Email'}
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ═══ LEADS TAB ═══ */}
      {tab === 'leads' && (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <select
              value={selectedTemplate}
              onChange={e => setSelectedTemplate(e.target.value)}
              className="bg-white/[0.04] border border-white/10 px-3 py-2 text-sm text-white focus:outline-none"
            >
              <option value="new-drop">🔥 New Drop — Deserves Recognition (w/ link)</option>
              <option value="new-drop-nolink">🔥 New Drop — No Link (A/B test)</option>
              <option value="artist-cold">🎵 Artist Cold Outreach</option>
              <option value="manager-cold">🏢 Manager / Label</option>
              <option value="business-cold">💼 Business / Brand</option>
              <option value="follow-up">🔄 Follow Up</option>
            </select>
            <p className="text-white/20 text-xs">Select template → click Send on any lead</p>
          </div>

          {leads.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-white/20 text-lg">No leads yet</p>
              <p className="text-white/10 text-sm mt-2">Search for artists or add leads manually</p>
            </div>
          ) : (
            <div className="space-y-2">
              {leads.map(lead => (
                <div key={lead.id} className="flex items-center gap-4 bg-white/[0.02] border border-white/[0.06] p-4 hover:border-white/10 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <p className="text-white font-semibold">{lead.name}</p>
                      <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-sm ${STATUS_COLORS[lead.status]}`}>
                        {lead.status}
                      </span>
                      <span className="text-white/15 text-[10px]">{lead.type}</span>
                    </div>
                    <p className="text-white/40 text-xs mt-1">
                      {lead.email}
                      {lead.instagram && <span> · {lead.instagram}</span>}
                      {lead.followers ? <span> · {lead.followers.toLocaleString()} followers</span> : ''}
                      {lead.emailsSent.length > 0 && <span> · {lead.emailsSent.length} emails sent</span>}
                    </p>
                  </div>
                  <select
                    value={lead.status}
                    onChange={e => updateStatus(lead.id, e.target.value)}
                    className="bg-transparent border border-white/10 text-xs text-white/50 px-2 py-1.5 focus:outline-none"
                  >
                    {['new', 'emailed', 'replied', 'booked', 'declined', 'follow-up'].map(s => (
                      <option key={s} value={s} className="bg-[#0a0a0a]">{s}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleSendEmail(lead.id)}
                    disabled={sendingTo === lead.id}
                    className="px-4 py-2 text-xs font-bold uppercase tracking-wider disabled:opacity-30"
                    style={{ backgroundColor: G, color: '#000' }}
                  >
                    {sendingTo === lead.id ? 'Sending...' : 'Send'}
                  </button>
                  <button
                    onClick={() => handleDelete(lead.id)}
                    className="text-red-400/30 hover:text-red-400 text-xs transition-colors"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ═══ ADD TAB ═══ */}
      {tab === 'add' && (
        <form onSubmit={handleAddLead} className="max-w-lg space-y-4">
          <div>
            <label className="text-white/40 text-xs uppercase tracking-wider block mb-2">Name *</label>
            <input
              type="text"
              required
              value={addForm.name}
              onChange={e => setAddForm(f => ({ ...f, name: e.target.value }))}
              className="w-full bg-white/[0.04] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/20"
            />
          </div>
          <div>
            <label className="text-white/40 text-xs uppercase tracking-wider block mb-2">Email *</label>
            <input
              type="email"
              required
              value={addForm.email}
              onChange={e => setAddForm(f => ({ ...f, email: e.target.value }))}
              className="w-full bg-white/[0.04] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/20"
            />
          </div>
          <div>
            <label className="text-white/40 text-xs uppercase tracking-wider block mb-2">Type</label>
            <select
              value={addForm.type}
              onChange={e => setAddForm(f => ({ ...f, type: e.target.value }))}
              className="w-full bg-white/[0.04] border border-white/10 px-4 py-3 text-white focus:outline-none"
            >
              <option value="artist" className="bg-[#0a0a0a]">Artist</option>
              <option value="manager" className="bg-[#0a0a0a]">Manager</option>
              <option value="label" className="bg-[#0a0a0a]">Label</option>
              <option value="business" className="bg-[#0a0a0a]">Business</option>
            </select>
          </div>
          <div>
            <label className="text-white/40 text-xs uppercase tracking-wider block mb-2">Instagram</label>
            <input
              type="text"
              value={addForm.instagram}
              onChange={e => setAddForm(f => ({ ...f, instagram: e.target.value }))}
              placeholder="@handle"
              className="w-full bg-white/[0.04] border border-white/10 px-4 py-3 text-white placeholder:text-white/15 focus:outline-none focus:border-white/20"
            />
          </div>
          <div>
            <label className="text-white/40 text-xs uppercase tracking-wider block mb-2">Notes</label>
            <textarea
              value={addForm.notes}
              onChange={e => setAddForm(f => ({ ...f, notes: e.target.value }))}
              rows={3}
              className="w-full bg-white/[0.04] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/20 resize-none"
            />
          </div>
          <button
            type="submit"
            className="px-8 py-3 font-bold text-sm uppercase tracking-wider"
            style={{ backgroundColor: G, color: '#000' }}
          >
            Add Lead
          </button>
        </form>
      )}
    </div>
  );
}
