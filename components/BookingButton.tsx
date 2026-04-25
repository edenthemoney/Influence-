'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, X, Music, Building2 } from 'lucide-react';

interface BookingButtonProps {
  packageTier: string;
  influencerId?: string;
  className?: string;
  children?: React.ReactNode;
}

export function BookingButton({ 
  packageTier, 
  influencerId = 'default', 
  className,
  children = 'Book Now'
}: BookingButtonProps) {
  const [loading, setLoading] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState('');
  const [promotionType, setPromotionType] = useState<'song' | 'business' | ''>('');
  const [instructions, setInstructions] = useState('');
  const [songTitle, setSongTitle] = useState('');
  const [songLink, setSongLink] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const getPackagePrice = (tier: string): number => {
    const prices: Record<string, number> = {
      'SAMPLE': 80,
      'STARTER': 250,
      'GROWTH': 500,
      'PRO': 850,
      'TRIO': 1500,
      'SQUAD': 2750,
      'VIRAL_NETWORK': 5999,
      'MEGA': 12999,
      'DOMINATION': 35000,
      'ENTERPRISE': 100000,
    };
    return prices[tier] || 80;
  };

  const handleProceedToCheckout = async () => {
    if (!email || !validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!promotionType) {
      setError('Please select a promotion type');
      return;
    }

    if (!instructions.trim()) {
      setError('Please provide instructions for the creator');
      return;
    }

    if (promotionType === 'song' && !songLink.trim() && !songTitle.trim()) {
      setError('Please provide either a song link or song title');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          packageTier,
          influencerId,
          clientEmail: email,
          promotionType,
          instructions,
          songTitle: promotionType === 'song' ? songTitle : '',
          songLink: promotionType === 'song' ? songLink : '',
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('No checkout URL returned:', data);
        setError(data.error || 'Failed to create checkout session');
        setLoading(false);
      }
    } catch (err: any) {
      console.error('Booking error:', err);
      setError(err.message || 'Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setShowEmailModal(true)}
        disabled={loading}
        className={className}
      >
        {children}
      </Button>

      {showEmailModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-yellow-500/30 p-8 max-w-md w-full relative">
            <button
              onClick={() => setShowEmailModal(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-2xl font-bold text-white mb-2">Complete Your Purchase</h3>
            <p className="text-white/60 mb-6">
              Tell us what you want {influencerId !== 'default' ? 'the creator' : ''} to promote.
            </p>

            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-black border-white/20 text-white placeholder:text-white/40"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Promotion Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setPromotionType('song')}
                    className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-all ${
                      promotionType === 'song' 
                        ? 'border-yellow-500 bg-yellow-500/10 text-yellow-500' 
                        : 'border-white/20 text-white/60 hover:border-white/40'
                    }`}
                  >
                    <Music className="h-6 w-6" />
                    <span className="text-sm font-medium">Song Promotion</span>
                  </button>
                  <button
                    onClick={() => setPromotionType('business')}
                    className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-all ${
                      promotionType === 'business' 
                        ? 'border-yellow-500 bg-yellow-500/10 text-yellow-500' 
                        : 'border-white/20 text-white/60 hover:border-white/40'
                    }`}
                  >
                    <Building2 className="h-6 w-6" />
                    <span className="text-sm font-medium">Business/Product</span>
                  </button>
                </div>
              </div>

              {promotionType === 'song' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Song Title
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter song title"
                      value={songTitle}
                      onChange={(e) => setSongTitle(e.target.value)}
                      className="bg-black border-white/20 text-white placeholder:text-white/40"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Song Link (Spotify, Apple Music, SoundCloud, etc.)
                    </label>
                    <Input
                      type="url"
                      placeholder="https://..."
                      value={songLink}
                      onChange={(e) => setSongLink(e.target.value)}
                      className="bg-black border-white/20 text-white placeholder:text-white/40"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Detailed Instructions
                </label>
                <Textarea
                  placeholder="Describe exactly what you want in the reels. What should the creator say/show? Any specific hashtags or mentions?"
                  value={instructions}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInstructions(e.target.value)}
                  className="bg-black border-white/20 text-white placeholder:text-white/40 min-h-[100px]"
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}

              <Button
                onClick={handleProceedToCheckout}
                disabled={loading}
                className="w-full gold-gradient text-black font-bold tracking-wider uppercase"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Proceed to Checkout - $${getPackagePrice(packageTier)}`
                )}
              </Button>

              <p className="text-white/40 text-xs text-center">
                You'll be redirected to Stripe's secure checkout
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
