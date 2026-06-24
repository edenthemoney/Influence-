'use client';

import Link from 'next/link';
import { CheckCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import { Suspense } from 'react';

const gold = '#c9a96e';

function SuccessContent() {
  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <CheckCircle className="w-16 h-16 mx-auto mb-6" style={{ color: gold }} />
        <h1 className="text-3xl font-bold text-white mb-3">Order Confirmed</h1>
        <p className="text-white/40 mb-2">Your INFLUENCE merch is being prepared.</p>
        <p className="text-white/30 text-sm mb-8">
          You'll receive a confirmation email with tracking info once your order ships. 
          Made-to-order items typically ship within 5-7 business days.
        </p>
        <div className="space-y-3">
          <Link href="/shop" className="flex items-center justify-center gap-2 w-full py-4 text-[11px] font-bold tracking-widest uppercase hover:opacity-90 transition-all" style={{ backgroundColor: gold, color: '#000' }}>
            <ShoppingBag className="w-4 h-4" />
            Continue Shopping
          </Link>
          <Link href="/" className="flex items-center justify-center gap-2 w-full py-4 text-[11px] font-bold tracking-widest uppercase border border-white/10 text-white/50 hover:text-white hover:border-[#c9a96e]/50 transition-all">
            Back to Home <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ShopSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#080808]" />}>
      <SuccessContent />
    </Suspense>
  );
}
