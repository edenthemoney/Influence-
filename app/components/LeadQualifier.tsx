'use client';
/** One-tap qualifier shown right after ANY lead form saves contact info (event 'lead:qualify'). */
import { useEffect, useState } from 'react';
import { X, Check, ChevronLeft } from 'lucide-react';
import { LEAD_TYPES, SERVICES_BY_TYPE, BUDGETS, TIMINGS, CITIES, type LeadType, type LeadAnswers } from '../../lib/leads';
import { trackLanding, leadMeta, type LeadContact } from '../../lib/leadClient';

const gold = '#c9a96e';
type Ctx = { leadId: string; contact: LeadContact; source: string };

const chip = (on: boolean) =>
  `min-h-[48px] w-full px-4 py-3 text-left text-[15px] border transition-colors active:scale-[0.99] ${on ? 'border-[#c9a96e] bg-[#c9a96e]/15 text-white' : 'border-white/12 bg-white/[0.03] text-white/80'}`;
const pill = (on: boolean) =>
  `min-h-[44px] px-3 py-2 text-[14px] border transition-colors ${on ? 'border-[#c9a96e] bg-[#c9a96e] text-black font-semibold' : 'border-white/15 bg-white/[0.03] text-white/80'}`;

export default function LeadQualifier() {
  const [ctx, setCtx] = useState<Ctx | null>(null);
  const [step, setStep] = useState(1);
  const [a, setA] = useState<LeadAnswers>({});
  const [done, setDone] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    trackLanding();
    const on = (e: Event) => { const d = (e as CustomEvent).detail as Ctx; setCtx(d); setStep(1); setA({}); setDone(false); setSent(false); };
    window.addEventListener('lead:qualify', on);
    // resume after a redirect (e.g. hero widget -> /start)
    try { const pend = sessionStorage.getItem('lead_pending_qualify'); if (pend) setTimeout(() => on(new CustomEvent('x', { detail: JSON.parse(pend) })), 700); } catch {}
    return () => window.removeEventListener('lead:qualify', on);
  }, []);
  useEffect(() => { if (ctx) { const o = document.body.style.overflow; document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = o; }; } }, [ctx]);
  if (!ctx) return null;

  const patch = (partial: boolean, ans = a) => {
    if (sent) return; setSent(!partial);
    const body = JSON.stringify({ leadId: ctx.leadId, ...ctx.contact, source: ctx.source, answers: ans, partial, meta: leadMeta() });
    fetch('/api/save-lead', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body, keepalive: true }).catch(() => {});
  };
  const clear = () => { try { sessionStorage.removeItem('lead_pending_qualify'); } catch {} };
  const close = () => { clear(); if (!done && (a.type || a.services?.length || a.budget || a.timing)) patch(true); setCtx(null); };
  const toggle = (id: string) => setA((p) => { const s = new Set(p.services || []); s.has(id) ? s.delete(id) : s.add(id); return { ...p, services: Array.from(s) }; });
  const finish = () => { clear(); patch(false); setDone(true); try { sessionStorage.setItem('lead_qualified', '1'); } catch {} };

  return (
    <div className="fixed inset-0 z-[10000] flex items-end justify-center sm:items-center" style={{ background: 'rgba(0,0,0,0.78)' }} role="dialog" aria-modal="true" aria-label="Tell us what you need">
      <div className="relative max-h-[92svh] w-full max-w-md overflow-y-auto border border-white/10 bg-[#0c0c0c] px-5 pb-[max(20px,env(safe-area-inset-bottom))] pt-5 sm:p-7" style={{ boxShadow: '0 -20px 60px rgba(0,0,0,.6), inset 0 1px 0 rgba(201,169,110,.25)' }}>
        <button onClick={close} aria-label="Close" className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center text-white/40"><X className="h-5 w-5" /></button>
        {!done && (
          <>
            <div className="mb-4 flex items-center gap-2 pr-10">
              {step > 1 && <button onClick={() => setStep(step - 1)} aria-label="Back" className="-ml-2 flex h-9 w-9 items-center justify-center text-white/50"><ChevronLeft className="h-5 w-5" /></button>}
              <div className="flex flex-1 gap-1.5">{[1, 2, 3].map((i) => <div key={i} className="h-[3px] flex-1" style={{ background: i <= step ? gold : 'rgba(255,255,255,.12)' }} />)}</div>
            </div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.35em]" style={{ color: gold }}>✓ Got it. Saved. Step {step} of 3</p>
          </>
        )}

        {!done && step === 1 && (
          <div>
            <h2 className="mb-4 font-display text-[26px] font-bold italic leading-tight text-white">I&apos;m a…</h2>
            <div className="grid gap-2">
              {LEAD_TYPES.map((t) => (
                <button key={t.id} className={chip(a.type === t.id)} onClick={() => { setA({ ...a, type: t.id as LeadType, services: [] }); setStep(2); }}>{t.label}</button>
              ))}
            </div>
            <p className="mt-4 text-center text-[12px] text-white/35">3 taps so we can text you the right options and prices.</p>
          </div>
        )}

        {!done && step === 2 && a.type && (
          <div>
            <h2 className="mb-1 font-display text-[26px] font-bold italic leading-tight text-white">What do you need?</h2>
            <p className="mb-4 text-[13px] text-white/45">Pick all that apply.</p>
            <div className="grid gap-2">
              {SERVICES_BY_TYPE[a.type].map((s) => {
                const on = !!a.services?.includes(s.id);
                return (
                  <button key={s.id} className={`${chip(on)} flex items-center justify-between gap-3`} onClick={() => toggle(s.id)} aria-pressed={on}>
                    <span>{s.label}</span>
                    <span className="flex shrink-0 items-center gap-2 text-[12px]" style={{ color: gold }}>{s.from && `from ${s.from}`}{on && <Check className="h-4 w-4" />}</span>
                  </button>
                );
              })}
            </div>
            <button disabled={!a.services?.length} onClick={() => setStep(3)} className="mt-4 min-h-[52px] w-full text-[13px] font-bold uppercase tracking-widest disabled:opacity-40" style={{ background: gold, color: '#000' }}>Next</button>
          </div>
        )}

        {!done && step === 3 && (
          <div>
            <h2 className="mb-3 font-display text-[26px] font-bold italic leading-tight text-white">Budget &amp; timing</h2>
            <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-white/45">Budget</p>
            <div className="mb-4 grid grid-cols-2 gap-2">{BUDGETS.map((b) => <button key={b} className={pill(a.budget === b)} onClick={() => setA({ ...a, budget: b })}>{b}</button>)}</div>
            <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-white/45">When</p>
            <div className="mb-4 grid grid-cols-3 gap-2">{TIMINGS.map((t) => <button key={t} className={pill(a.timing === t)} onClick={() => setA({ ...a, timing: t })}>{t}</button>)}</div>
            <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-white/45">Optional</p>
            <div className="grid gap-2">
              <input value={a.business || ''} onChange={(e) => setA({ ...a, business: e.target.value })} placeholder="Business / venue / artist name" className="min-h-[48px] w-full border border-white/12 bg-white/[0.04] px-4 text-[16px] text-white placeholder-white/30 focus:border-[#c9a96e]/60 focus:outline-none" />
              <input value={a.ig || ''} onChange={(e) => setA({ ...a, ig: e.target.value })} placeholder="Instagram @handle" autoCapitalize="none" autoCorrect="off" className="min-h-[48px] w-full border border-white/12 bg-white/[0.04] px-4 text-[16px] text-white placeholder-white/30 focus:border-[#c9a96e]/60 focus:outline-none" />
              <select value={a.city || ''} onChange={(e) => setA({ ...a, city: e.target.value })} className="min-h-[48px] w-full border border-white/12 bg-[#141414] px-4 text-[16px] text-white focus:border-[#c9a96e]/60 focus:outline-none" aria-label="City">
                <option value="">City (South Florida)</option>
                {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <button disabled={!a.budget || !a.timing} onClick={finish} className="mt-4 min-h-[52px] w-full text-[13px] font-bold uppercase tracking-widest disabled:opacity-40" style={{ background: gold, color: '#000' }}>Send to my rep</button>
          </div>
        )}

        {done && (
          <div className="py-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center border border-[#c9a96e]/50"><Check className="h-5 w-5" style={{ color: gold }} /></div>
            <p className="mb-2 font-display text-2xl font-bold italic text-white">Perfect. You&apos;re all set.</p>
            <p className="mb-6 text-sm text-white/50">A rep will text you options and pricing shortly.</p>
            <button onClick={() => setCtx(null)} className="min-h-[48px] w-full border border-white/20 text-[12px] font-bold uppercase tracking-widest text-white">Keep browsing</button>
          </div>
        )}
      </div>
    </div>
  );
}
