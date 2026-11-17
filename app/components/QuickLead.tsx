'use client';
/** Minimal inline lead form (name + phone). Saves instantly, then opens the one-tap qualifier. */
import { useRef, useState } from 'react';
import { ChevronRight, Check } from 'lucide-react';
import { saveLead } from '../../lib/leadClient';

const gold = '#c9a96e';
export default function QuickLead({ source, title = 'Get options & pricing by text', sub = 'Takes 10 seconds. We reply fast.', serviceType }: { source: string; title?: string; sub?: string; serviceType?: string }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [hp, setHp] = useState('');
  const [state, setState] = useState<'idle' | 'busy' | 'done'>('idle');
  const started = useRef(Date.now());
  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); if (!phone.trim()) return; setState('busy');
    await saveLead({ name, phone }, source, serviceType ? { serviceType } : {}, { startedAt: started.current, hp });
    setState('done');
  };
  return (
    <div className="lx-card mx-auto w-full max-w-xl border border-white/10 bg-[#0c0c0c] p-5 md:p-7" style={{ boxShadow: 'inset 0 1px 0 rgba(201,169,110,.25)' }}>
      {state === 'done' ? (
        <div className="flex items-center gap-3 py-2"><Check className="h-5 w-5" style={{ color: gold }} /><p className="text-[15px] text-white">Saved. A rep will text you shortly.</p></div>
      ) : (
        <form onSubmit={submit} className="relative">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.35em]" style={{ color: gold }}>Quick quote</p>
          <p className="mb-1 font-display text-[22px] font-bold italic leading-tight text-white">{title}</p>
          <p className="mb-4 text-[13px] text-white/45">{sub}</p>
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} />
          <div className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" autoComplete="name" className="min-h-[50px] border border-white/12 bg-white/[0.04] px-4 text-[16px] text-white placeholder-white/30 focus:border-[#c9a96e]/60 focus:outline-none" />
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone *" type="tel" required autoComplete="tel" inputMode="tel" className="min-h-[50px] border border-white/12 bg-white/[0.04] px-4 text-[16px] text-white placeholder-white/30 focus:border-[#c9a96e]/60 focus:outline-none" />
            <button type="submit" disabled={state === 'busy' || !phone.trim()} className="flex min-h-[50px] items-center justify-center gap-2 px-6 text-[13px] font-bold uppercase tracking-widest disabled:opacity-50" style={{ background: gold, color: '#000' }}>{state === 'busy' ? '…' : <>Get pricing <ChevronRight className="h-4 w-4" /></>}</button>
          </div>
          <p className="mt-3 text-[11px] text-white/30">No spam. Only about your booking.</p>
        </form>
      )}
    </div>
  );
}
