'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, ArrowRight, Phone } from 'lucide-react';

const gold = '#c9a96e';

interface Option {
  count: number;
  label: string;
  price: number;
}

const musicVideoOptions: Option[] = [
  { count: 1, label: '1 Girl', price: 500 },
  { count: 2, label: '2 Girls', price: 900 },
  { count: 3, label: '3 Girls', price: 1200 },
  { count: 5, label: '5 Girls', price: 1800 },
  { count: 10, label: '10 Girls', price: 3500 },
];

export default function SimpleHeadcountBooking() {
  const router = useRouter();
  const [selected, setSelected] = useState<Option | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSelect = (option: Option) => {
    setSelected(option);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected || !name || !phone) return;
    setSubmitting(true);

    // Save lead info for prefill on booking page
    sessionStorage.setItem('lead_name', name);
    sessionStorage.setItem('lead_phone', phone);
    sessionStorage.setItem('lead_email', email);

    // Also send lead to backend so sales can follow up immediately
    try {
      await fetch('/api/save-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          source: 'music_video_headcount',
          serviceType: 'musicvideo',
          packageName: selected.label,
          packagePrice: selected.price,
          notes: `Requested date: ${date || 'Not specified'}`,
        }),
      });
    } catch {
      // Non-fatal — continue to booking page
    }

    // Redirect to booking with package preselected
    const pkgMap: Record<number, string> = {
      1: 'mv-solo',
      2: 'mv-duo',
      3: 'mv-trio',
      5: 'mv-squad',
      10: 'mv-ten',
    };
    router.push(`/model-booking?service=musicvideo&package=${pkgMap[selected.count]}`);
  };

  return (
    <div className="border border-white/[0.08] bg-[#0a0a0a] p-6 md:p-8">
      {!showForm ? (
        <>
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-4" style={{ color: gold }}>Step 1 of 2</p>
          <h3 className="text-2xl font-bold text-white mb-2">How Many Girls Do You Need?</h3>
          <p className="text-white/45 text-sm mb-6">Pick your headcount. We&apos;ll show pricing and confirm availability after you send your info.</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {musicVideoOptions.map((option) => (
              <button
                key={option.count}
                onClick={() => handleSelect(option)}
                className="group border border-white/[0.08] p-4 text-center transition-all hover:border-[#c9a96e]/40 hover:bg-[#c9a96e]/[0.03]"
              >
                <p className="text-white font-bold text-lg mb-1">{option.label}</p>
                <p className="text-white/30 text-[10px] tracking-widest uppercase">4 hours on set</p>
                <div className="mt-3 flex items-center justify-center gap-1 text-[#c9a96e] text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  Select <ArrowRight className="h-3 w-3" />
                </div>
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => setShowForm(false)}
              className="text-white/30 hover:text-white/60 text-[11px] tracking-widest uppercase transition-colors"
            >
              ← Back
            </button>
            <div className="flex items-center gap-2 px-3 py-1.5 border border-[#c9a96e]/30 bg-[#c9a96e]/5">
              <Check className="h-3 w-3" style={{ color: gold }} />
              <span className="text-[11px] font-bold tracking-wide" style={{ color: gold }}>{selected?.label} selected</span>
            </div>
          </div>
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-4" style={{ color: gold }}>Step 2 of 2</p>
          <h3 className="text-2xl font-bold text-white mb-2">Get Your Quote & Availability</h3>
          <p className="text-white/45 text-sm mb-6">Enter your info and we&apos;ll confirm your {selected?.label} booking. A rep may call to finalize details.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                required
                placeholder="Name *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-12 bg-white/[0.03] border border-white/10 px-4 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#c9a96e]/50 transition-colors"
              />
              <input
                type="tel"
                required
                placeholder="Phone *"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-12 bg-white/[0.03] border border-white/10 px-4 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#c9a96e]/50 transition-colors"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 bg-white/[0.03] border border-white/10 px-4 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#c9a96e]/50 transition-colors"
              />
              <input
                type="date"
                placeholder="Preferred shoot date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full h-12 bg-white/[0.03] border border-white/10 px-4 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#c9a96e]/50 transition-colors"
              />
            </div>
            <div className="pt-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center gap-3 px-10 py-5 text-[13px] font-bold tracking-widest uppercase hover:opacity-85 transition-all disabled:opacity-50"
                style={{ backgroundColor: gold, color: '#000' }}
              >
                {submitting ? 'Sending...' : 'Continue to Booking'} <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href="tel:+15615520392"
                className="inline-flex items-center gap-2 text-[12px] font-bold tracking-widest uppercase text-white/40 hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4" /> Call (561) 552-0392
              </a>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
