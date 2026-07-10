'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import posthog from 'posthog-js';
import { MessageCircle, X, ChevronRight, Send } from 'lucide-react';

const gold = '#c9a96e';

type Step = 'welcome' | 'purpose' | 'location' | 'budget' | 'contact' | 'result';

// Map a chat purpose to a booking service param so we can route + prefill.
const PURPOSE_TO_SERVICE: Record<string, string> = {
  'Music Video': 'musicvideo',
  'Photo / Video Shoot': 'shoot',
  'Event Staffing': 'event',
  'Models at My Business': 'business',
  'Reels & Social Content': 'ugc',
  'Music Promo & Reactions': 'reaction',
};

interface Result {
  title: string;
  description: string;
  link: string;
  cta: string;
}

export default function ChatFunnel() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>('welcome');
  const [purpose, setPurpose] = useState('');
  const [location, setLocation] = useState<'local' | 'remote' | ''>('');
  const [budget, setBudget] = useState('');
  const [customInput, setCustomInput] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [messages, setMessages] = useState<{ from: 'bot' | 'user'; text: string }[]>([
    { from: 'bot', text: "Hey! I'll match you with the perfect package in 30 seconds. What are you looking for?" }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Hide on booking page so it doesn't overlap the sticky checkout button
  if (pathname === '/model-booking') return null;

  const addMessage = (from: 'bot' | 'user', text: string) => {
    setMessages(prev => [...prev, { from, text }]);
  };

  const handlePurpose = (choice: string) => {
    setPurpose(choice);
    addMessage('user', choice);

    posthog.capture('chat_funnel_purpose', { purpose: choice });

    if (choice === 'Music Video' || choice === 'Photo / Video Shoot' || choice === 'Event Staffing' || choice === 'Models at My Business') {
      addMessage('bot', 'Great pick. Are you based in South Florida, or do you need digital-only content?');
      setStep('location');
    } else if (choice === 'Reels & Social Content' || choice === 'Music Promo & Reactions') {
      setLocation('remote');
      addMessage('bot', 'All done remotely — we deliver to your inbox. How much content do you need?');
      setStep('budget');
    } else {
      addMessage('bot', 'Got it. Would this be in-person (South Florida) or remote/digital?');
      setStep('location');
    }
  };

  const handleCustomSubmit = () => {
    if (!customInput.trim()) return;
    handlePurpose(customInput.trim());
    setCustomInput('');
  };

  const handleLocation = (loc: 'local' | 'remote') => {
    setLocation(loc);
    addMessage('user', loc === 'local' ? 'In-person (South Florida)' : 'Remote / Digital');
    addMessage('bot', 'Almost there — how big is this booking?');
    setStep('budget');
  };

  const handleBudget = (range: string) => {
    setBudget(range);
    addMessage('user', range);
    addMessage('bot', "Perfect — I've got a match. Drop your name & number and I'll send your options and lock in availability.");
    setStep('contact');
    posthog.capture('chat_funnel_budget', { purpose, location, budget: range });
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setSubmitting(true);
    // Prefill the booking/quote forms downstream
    try {
      sessionStorage.setItem('lead_name', name);
      sessionStorage.setItem('lead_phone', phone);
      sessionStorage.setItem('lead_email', email);
    } catch {}
    // Capture the lead immediately so sales can follow up
    try {
      await fetch('/api/save-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, phone, email,
          source: 'chat_funnel',
          serviceType: PURPOSE_TO_SERVICE[purpose] || purpose,
          notes: `Chat funnel — Purpose: ${purpose} · ${location === 'remote' ? 'Remote/Digital' : location === 'local' ? 'In-person (South FL)' : 'Unspecified'} · Budget: ${budget}`,
        }),
      });
    } catch {
      // Non-fatal — still show the recommendation
    }
    posthog.capture('chat_funnel_complete', { purpose, location, budget, recommendation: getResult(budget).title });
    addMessage('user', `${name} · ${phone}`);
    addMessage('bot', getResult(budget).description);
    setStep('result');
    setSubmitting(false);
  };

  const getResult = (budgetRange: string): Result => {
    const svc = PURPOSE_TO_SERVICE[purpose];
    const bookLink = svc ? `/model-booking?service=${svc}` : '/start';
    if (location === 'remote') {
      if (budgetRange === 'Just one to start') {
        return { title: 'Starter Content', description: 'A Starter pack is your move — a creator makes a reel or reaction for you. Quick and effective. Your packages are ready on the next screen.', link: bookLink, cta: 'See My Options' };
      } else if (budgetRange === 'A few pieces of content') {
        return { title: 'Growth Campaign', description: 'Growth is perfect — multiple creators, more content, bigger reach. Our most popular range. Let\u2019s build it.', link: bookLink, cta: 'See My Options' };
      } else {
        return { title: 'Full Campaign', description: 'You\u2019re in full-campaign territory — multiple influencers, coordinated rollout, max reach. A rep will tailor this with you.', link: '/quote', cta: 'Get My Custom Plan' };
      }
    } else {
      if (budgetRange === 'Just one to start') {
        return { title: 'Solo Model', description: 'A solo booking fits perfectly — one verified model for your shoot or event. Let\u2019s lock your date.', link: bookLink, cta: 'See My Options' };
      } else if (budgetRange === 'A few pieces of content') {
        return { title: 'Duo or Trio', description: 'You could get a 2–3 model squad — our most booked range. Let\u2019s find your match.', link: bookLink, cta: 'See My Options' };
      } else {
        return { title: 'Full Production', description: 'Full squad production — ideal for music videos, events, or big brand shoots. A rep will help you plan it.', link: svc ? bookLink : '/quote', cta: 'See My Options' };
      }
    }
  };

  const reset = () => {
    setStep('welcome');
    setPurpose('');
    setLocation('');
    setBudget('');
    setCustomInput('');
    setName('');
    setPhone('');
    setEmail('');
    setMessages([{ from: 'bot', text: "Hey! I'll match you with the perfect package in 30 seconds. What are you looking for?" }]);
  };

  const result = step === 'result' ? getResult(budget) : null;

  return (
    <>
      {/* Floating Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-[60] w-14 h-14 flex items-center justify-center shadow-2xl transition-transform hover:scale-105"
          style={{ backgroundColor: gold }}
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6 text-black" />
        </button>
      )}

      {/* Chat Panel */}
      {open && (
        <div className="fixed bottom-6 right-6 z-[60] w-[360px] max-w-[calc(100vw-3rem)] bg-[#111] border border-white/10 shadow-2xl flex flex-col" style={{ height: '520px', maxHeight: 'calc(100vh - 6rem)' }}>
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center" style={{ backgroundColor: gold }}>
                <MessageCircle className="w-4 h-4 text-black" />
              </div>
              <div>
                <p className="text-white text-sm font-bold">Influence</p>
                <p className="text-white/40 text-[10px]">Usually replies instantly</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/40 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3" role="log" aria-live="polite" aria-label="Chat messages">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] px-4 py-2.5 text-sm leading-relaxed ${
                    msg.from === 'user'
                      ? 'bg-[#c9a96e]/20 text-white border border-[#c9a96e]/30'
                      : 'bg-white/5 text-white/80 border border-white/[0.08]'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            <div ref={messagesEndRef} />

            {/* Result CTA */}
            {step === 'result' && result && (
              <div className="flex justify-start">
                <div className="max-w-[85%]">
                  <Link
                    href={result.link}
                    className="inline-flex items-center gap-2 px-5 py-3 text-[11px] font-bold tracking-widest uppercase mt-2 transition-all hover:opacity-80"
                    style={{ backgroundColor: gold, color: '#000' }}
                  >
                    {result.cta} <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                  <button onClick={reset} className="block text-white/30 text-[10px] tracking-wider uppercase mt-3 hover:text-white/50 transition-colors">
                    Start over
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-white/10 px-5 py-4">
            {step === 'welcome' && (
              <div className="space-y-2">
                {['Reels & Social Content', 'Music Promo & Reactions', 'Music Video', 'Models at My Business', 'Event Staffing', 'Photo / Video Shoot'].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handlePurpose(opt)}
                    className="block w-full text-left px-4 py-2.5 text-sm text-white/70 border border-white/[0.08] hover:border-[#c9a96e]/40 hover:text-white transition-all"
                  >
                    {opt}
                  </button>
                ))}
                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCustomSubmit()}
                    placeholder="Something else..."
                    className="flex-1 bg-transparent border border-white/[0.08] px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#c9a96e]/40"
                  />
                  <button onClick={handleCustomSubmit} className="px-3 border border-white/[0.08] text-white/40 hover:text-white hover:border-white/20 transition-colors">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 'location' && (
              <div className="space-y-2">
                <button
                  onClick={() => handleLocation('local')}
                  className="block w-full text-left px-4 py-2.5 text-sm text-white/70 border border-white/[0.08] hover:border-[#c9a96e]/40 hover:text-white transition-all"
                >
                  🌴 In-person (South Florida)
                </button>
                <button
                  onClick={() => handleLocation('remote')}
                  className="block w-full text-left px-4 py-2.5 text-sm text-white/70 border border-white/[0.08] hover:border-[#c9a96e]/40 hover:text-white transition-all"
                >
                  📱 Remote / Digital delivery
                </button>
              </div>
            )}

            {step === 'budget' && (
              <div className="space-y-2">
                {['Just one to start', 'A few pieces of content', 'Full production / recurring'].map((range) => (
                  <button
                    key={range}
                    onClick={() => handleBudget(range)}
                    className="block w-full text-left px-4 py-2.5 text-sm text-white/70 border border-white/[0.08] hover:border-[#c9a96e]/40 hover:text-white transition-all"
                  >
                    {range}
                  </button>
                ))}
              </div>
            )}

            {step === 'contact' && (
              <form onSubmit={handleContactSubmit} className="space-y-2">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name *"
                  className="w-full bg-transparent border border-white/[0.08] px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#c9a96e]/40"
                />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone number *"
                  className="w-full bg-transparent border border-white/[0.08] px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#c9a96e]/40"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email (optional)"
                  className="w-full bg-transparent border border-white/[0.08] px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#c9a96e]/40"
                />
                <button
                  type="submit"
                  disabled={submitting || !name.trim() || !phone.trim()}
                  className="w-full px-4 py-3 text-[11px] font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-50"
                  style={{ backgroundColor: gold, color: '#000' }}
                >
                  {submitting ? 'Sending...' : (<>Show My Match <ChevronRight className="w-3.5 h-3.5" /></>)}
                </button>
                <p className="text-white/20 text-[9px] text-center">No spam — we only reach out about your booking.</p>
              </form>
            )}

            {step === 'result' && (
              <p className="text-white/20 text-[10px] tracking-wider uppercase text-center">Chat complete — tap the button above ↑</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
