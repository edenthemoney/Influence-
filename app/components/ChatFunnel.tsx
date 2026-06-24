'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import posthog from 'posthog-js';
import { MessageCircle, X, ChevronRight, Send } from 'lucide-react';

const gold = '#c9a96e';

type Step = 'welcome' | 'purpose' | 'location' | 'budget' | 'result';

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
      addMessage('bot', 'All done remotely — we deliver to your inbox. What\'s your budget?');
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
    addMessage('bot', 'Almost there — what\'s your budget?');
    setStep('budget');
  };

  const handleBudget = (range: string) => {
    setBudget(range);
    addMessage('user', range);
    addMessage('bot', getResult(range).description);
    setStep('result');
    posthog.capture('chat_funnel_complete', { purpose, location, budget: range, recommendation: getResult(range).title });
  };

  const getResult = (budgetRange: string): Result => {
    if (location === 'remote') {
      if (budgetRange === 'Under $300') {
        return { title: 'Starter Content', description: 'I\'d recommend our Starter pack — 1 model creates a reel or reaction for you. Quick, affordable, and effective.', link: '/pricing?tier=testing', cta: 'View Starter Packages' };
      } else if (budgetRange === '$300 – $700') {
        return { title: 'Growth Campaign', description: 'Our Growth packages are perfect — multiple models, more content pieces, bigger reach. Most popular choice.', link: '/pricing?tier=scaling', cta: 'View Growth Packages' };
      } else {
        return { title: 'Full Campaign', description: 'For that budget, you get the full campaign treatment — multiple influencers, coordinated rollout, maximum reach.', link: '/pricing?tier=enterprise', cta: 'View Campaign Packages' };
      }
    } else {
      if (budgetRange === 'Under $300') {
        return { title: 'Solo Model', description: 'Our Solo package is perfect — 1 model for your shoot or event. Starting at $400 for events, $300 for shoots.', link: '/model-booking', cta: 'Book a Model' };
      } else if (budgetRange === '$300 – $700') {
        return { title: 'Duo or Trio', description: 'You could get 2–3 models for a shoot or a small event squad. Our most booked range.', link: '/model-booking', cta: 'Browse Packages' };
      } else {
        return { title: 'Full Production', description: 'Full squad production — 4+ models, perfect for music videos, events, or big brand shoots.', link: '/model-booking', cta: 'View All Options' };
      }
    }
  };

  const reset = () => {
    setStep('welcome');
    setPurpose('');
    setLocation('');
    setBudget('');
    setCustomInput('');
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
                {['Under $300', '$300 – $700', '$700+'].map((range) => (
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

            {step === 'result' && (
              <p className="text-white/20 text-[10px] tracking-wider uppercase text-center">Chat complete — tap the button above ↑</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
