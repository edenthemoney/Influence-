'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { LEAD_TYPES, SERVICES } from '@/lib/leads';
import { templateDrafts } from '@/lib/leadDrafts';

type Lead = any;
const gold = '#c9a96e';
const STATUSES = ['new', 'contacted', 'booked', 'lost'] as const;
const SCORE_STYLE: Record<string, string> = { hot: 'bg-red-500/20 text-red-300 border-red-400/40', warm: 'bg-amber-500/20 text-amber-200 border-amber-400/40', cold: 'bg-sky-500/15 text-sky-200 border-sky-400/40' };
const API = '/.netlify/functions/leads';
const fmt = (s: string) => { try { return new Date(s).toLocaleString('en-US', { timeZone: 'America/New_York', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }) + ' ET'; } catch { return s; } };
const smsHref = (phone: string, text: string) => `sms:${phone.replace(/[^\d+]/g, '')}${/iPhone|iPad|Mac/.test(typeof navigator !== 'undefined' ? navigator.userAgent : '') ? '&' : '?'}body=${encodeURIComponent(text)}`;

function Copy({ text, label }: { text: string; label: string }) {
  const [ok, setOk] = useState(false);
  return <button onClick={async () => { try { await navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 1500); } catch {} }} className="min-h-[44px] flex-1 border border-white/20 px-3 text-[11px] font-bold uppercase tracking-widest text-white">{ok ? 'Copied ✓' : label}</button>;
}

function LeadCard({ l, token, onSaved }: { l: Lead; token: string; onSaved: (x: Lead) => void }) {
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState(l.notes || '');
  const [draft, setDraft] = useState(() => templateDrafts(l) as { text: string; subject: string; body: string; ai?: boolean });
  const [busy, setBusy] = useState('');
  const a = l.answers || {};
  const save = async (patch: any) => {
    setBusy('save');
    const r = await fetch(API, { method: 'PATCH', headers: { 'content-type': 'application/json', 'x-admin-token': token }, body: JSON.stringify({ id: l.id, ...patch }) });
    const d = await r.json().catch(() => ({})); setBusy('');
    if (r.ok && d.lead) onSaved(d.lead);
  };
  const ai = async () => {
    setBusy('ai');
    const r = await fetch('/api/admin/lead-draft', { method: 'POST', headers: { 'content-type': 'application/json', authorization: `Bearer ${token}` }, body: JSON.stringify({ lead: l }) });
    const d = await r.json().catch(() => null); setBusy('');
    if (r.ok && d?.text) setDraft(d);
  };
  const typeLabel = LEAD_TYPES.find((t) => t.id === a.type)?.label;
  const svcs = (a.services || []).map((id: string) => SERVICES[id]?.label || id).join(', ');
  const utm = l.meta?.utm && Object.keys(l.meta.utm).length ? Object.entries(l.meta.utm).map(([k, v]) => `${k.replace('utm_', '')}=${v}`).join(' · ') : '';
  let page = ''; try { page = l.meta?.pageUrl ? new URL(l.meta.pageUrl).pathname : ''; } catch {}
  return (
    <div className="border border-white/[0.1] bg-white/[0.02]" data-lead={l.id}>
      <button onClick={() => setOpen(!open)} className="w-full p-4 text-left">
        <div className="flex flex-wrap items-center gap-2">
          {l.score && <span className={`border px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${SCORE_STYLE[l.score]}`}>{l.score}</span>}
          {l.spam && <span className="border border-fuchsia-400/40 bg-fuchsia-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-fuchsia-200">spam/vendor?</span>}
          <span className="border border-white/20 px-2 py-0.5 text-[10px] uppercase tracking-widest text-white/70">{l.status}</span>
          <span className="ml-auto text-[11px] text-white/45">{fmt(l.createdAt)}</span>
        </div>
        <p className="mt-2 text-[17px] font-semibold text-white">{l.name || l.phone || l.email || 'Unknown'}{a.business ? <span className="font-normal text-white/55"> · {a.business}</span> : null}</p>
        <p className="mt-1 text-[13px] text-white/60">{[typeLabel, svcs, a.budget, a.timing, a.city].filter(Boolean).join(' · ') || (l.stage === 'contact' ? 'Qualifier not finished' : l.source)}</p>
      </button>
      {open && (
        <div className="space-y-4 border-t border-white/[0.08] p-4 text-[14px] text-white/80">
          <div className="grid gap-1.5">
            {l.phone && <p>📱 <a className="underline" href={`tel:${l.phone}`}>{l.phone}</a></p>}
            {l.email && <p>✉️ <a className="underline" href={`mailto:${l.email}`}>{l.email}</a></p>}
            {a.ig && <p>IG: {a.ig}</p>}
            {l.recommendation && <p><span className="text-white/45">Recommended:</span> {l.recommendation}</p>}
            {(l.packageName || l.serviceType) && <p><span className="text-white/45">Interest:</span> {[l.serviceType, l.packageName].filter(Boolean).join(' · ')}</p>}
            <p className="text-[12px] text-white/45">Source: {l.source || '—'}{page ? ` · ${page}` : ''}{utm ? ` · ${utm}` : ''}{l.meta?.device ? ` · ${l.meta.device}` : ''}</p>
            {l.flags?.length > 0 && <p className="text-[12px] text-fuchsia-200">Flags: {l.flags.join(', ')}</p>}
          </div>
          <div className="flex flex-wrap gap-2">
            {STATUSES.map((s) => <button key={s} disabled={busy === 'save'} onClick={() => save({ status: s })} className={`min-h-[44px] flex-1 border px-3 text-[11px] font-bold uppercase tracking-widest ${l.status === s ? 'border-[#c9a96e] bg-[#c9a96e] text-black' : 'border-white/20 text-white/80'}`}>{s}</button>)}
          </div>
          <div>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Notes" className="w-full border border-white/15 bg-black/40 p-3 text-[16px] text-white" />
            <button onClick={() => save({ notes })} disabled={busy === 'save'} className="mt-2 min-h-[44px] w-full border border-white/20 text-[11px] font-bold uppercase tracking-widest">{busy === 'save' ? 'Saving…' : 'Save notes'}</button>
          </div>
          <div className="space-y-3 border border-[#c9a96e]/30 p-3">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: gold }}>Follow-up draft {draft.ai ? '· AI' : '· template'}</p>
              <button onClick={ai} disabled={busy === 'ai'} className="min-h-[40px] border border-[#c9a96e]/50 px-3 text-[10px] font-bold uppercase tracking-widest text-white">{busy === 'ai' ? 'Drafting…' : 'AI redraft'}</button>
            </div>
            <p className="text-[11px] text-white/45">Nothing is sent from here. Copy it, or tap to open your own Messages / Mail app.</p>
            <p className="text-[11px] uppercase tracking-widest text-white/45">Text</p>
            <textarea value={draft.text} onChange={(e) => setDraft({ ...draft, text: e.target.value })} rows={4} className="w-full border border-white/15 bg-black/40 p-3 text-[16px] text-white" />
            <div className="flex gap-2">
              <Copy text={draft.text} label="Copy text" />
              {l.phone && <a href={smsHref(l.phone, draft.text)} className="flex min-h-[44px] flex-1 items-center justify-center text-[11px] font-bold uppercase tracking-widest" style={{ background: gold, color: '#000' }}>Open in Messages</a>}
            </div>
            <p className="text-[11px] uppercase tracking-widest text-white/45">Email</p>
            <input value={draft.subject} onChange={(e) => setDraft({ ...draft, subject: e.target.value })} className="w-full border border-white/15 bg-black/40 p-3 text-[16px] text-white" />
            <textarea value={draft.body} onChange={(e) => setDraft({ ...draft, body: e.target.value })} rows={9} className="w-full border border-white/15 bg-black/40 p-3 text-[16px] text-white" />
            <div className="flex gap-2">
              <Copy text={`${draft.subject}\n\n${draft.body}`} label="Copy email" />
              {l.email && <a href={`mailto:${l.email}?subject=${encodeURIComponent(draft.subject)}&body=${encodeURIComponent(draft.body)}`} className="flex min-h-[44px] flex-1 items-center justify-center text-[11px] font-bold uppercase tracking-widest" style={{ background: gold, color: '#000' }}>Open in Mail</a>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LeadsAdmin() {
  const [token, setToken] = useState('');
  const [input, setInput] = useState('');
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [err, setErr] = useState('');
  const [score, setScore] = useState('all');
  const [status, setStatus] = useState('all');
  const [hideSpam, setHideSpam] = useState(true);

  const load = useCallback(async (t: string) => {
    setErr('');
    const r = await fetch(API, { headers: { 'x-admin-token': t }, cache: 'no-store' });
    if (r.status === 401) { setErr('Wrong password.'); setToken(''); sessionStorage.removeItem('leads_admin'); return; }
    const d = await r.json().catch(() => ({}));
    if (!r.ok) { setErr(d.error || 'Could not load leads.'); return; }
    setToken(t); sessionStorage.setItem('leads_admin', t); setLeads(d.leads || []);
  }, []);
  useEffect(() => { const t = sessionStorage.getItem('leads_admin'); if (t) load(t); }, [load]);

  const shown = useMemo(() => (leads || []).filter((l) => (score === 'all' || (score === 'none' ? !l.score : l.score === score)) && (status === 'all' || l.status === status) && (!hideSpam || !l.spam)), [leads, score, status, hideSpam]);
  const counts = useMemo(() => Object.fromEntries(STATUSES.map((s) => [s, (leads || []).filter((l) => l.status === s).length])), [leads]);
  const pill = (on: boolean) => `min-h-[40px] px-3 border text-[11px] font-bold uppercase tracking-widest ${on ? 'border-[#c9a96e] bg-[#c9a96e] text-black' : 'border-white/20 text-white/75'}`;

  if (!token) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#080808] px-5 text-white">
        <form onSubmit={(e) => { e.preventDefault(); load(input); }} className="w-full max-w-sm space-y-4">
          <p className="text-[11px] uppercase tracking-[0.35em]" style={{ color: gold }}>Influence · Admin</p>
          <h1 className="font-display text-4xl font-bold italic">Leads</h1>
          <input type="password" autoComplete="current-password" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Admin password" className="min-h-[52px] w-full border border-white/20 bg-black/40 px-4 text-[16px]" />
          {err && <p className="text-sm text-red-400">{err}</p>}
          <button className="min-h-[52px] w-full text-[12px] font-bold uppercase tracking-[0.2em]" style={{ background: gold, color: '#000' }}>Sign in</button>
        </form>
      </main>
    );
  }
  return (
    <main className="min-h-screen bg-[#080808] px-4 pb-20 pt-6 text-white md:px-10">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-3xl font-bold italic">Leads <span className="text-white/40">({shown.length})</span></h1>
          <div className="flex gap-2">
            <button onClick={() => load(token)} className="min-h-[40px] border border-white/20 px-3 text-[11px] font-bold uppercase tracking-widest">Refresh</button>
            <button onClick={() => { sessionStorage.removeItem('leads_admin'); setToken(''); setLeads(null); }} className="min-h-[40px] border border-white/20 px-3 text-[11px] font-bold uppercase tracking-widest text-white/60">Log out</button>
          </div>
        </div>
        <p className="mt-1 text-[12px] text-white/45">{STATUSES.map((s) => `${counts[s] || 0} ${s}`).join(' · ')}</p>
        <div className="mt-4 flex flex-wrap gap-2">{['all', 'hot', 'warm', 'cold', 'none'].map((s) => <button key={s} onClick={() => setScore(s)} className={pill(score === s)}>{s === 'none' ? 'unscored' : s}</button>)}</div>
        <div className="mt-2 flex flex-wrap gap-2">{['all', ...STATUSES].map((s) => <button key={s} onClick={() => setStatus(s)} className={pill(status === s)}>{s}</button>)}
          <button onClick={() => setHideSpam(!hideSpam)} className={pill(!hideSpam)}>{hideSpam ? 'Show spam' : 'Hide spam'}</button></div>
        {err && <p className="mt-4 text-sm text-red-400">{err}</p>}
        <div className="mt-5 space-y-3">
          {leads === null ? <p className="text-white/50">Loading…</p> : shown.length === 0 ? <p className="text-white/50">No leads match.</p> : shown.map((l) => <LeadCard key={l.id + l.updatedAt} l={l} token={token} onSaved={(x) => setLeads((p) => (p || []).map((y) => (y.id === x.id ? x : y)))} />)}
        </div>
      </div>
    </main>
  );
}
