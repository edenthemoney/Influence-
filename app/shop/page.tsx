'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { ShoppingBag, Lock, Clock, Flame, ChevronDown } from 'lucide-react';
import MobileNav from '../components/MobileNav';

const gold = '#c9a96e';

type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  comparePrice?: number;
  images: string[];
  category: 'women' | 'men' | 'unisex';
  sizes: Size[];
  stock: number;
  tag?: string;
  details: string[];
}

const products: Product[] = [
  {
    id: 'influence-crop-gold',
    name: 'INFLUENCE Crop Top — Gold Edition',
    description: 'Premium cropped tee with embroidered gold "INFLUENCE" logo. Fitted cut, ultra-soft cotton blend.',
    price: 45,
    comparePrice: 65,
    images: ['/images/merch/crop-gold.jpg'],
    category: 'women',
    sizes: ['XS', 'S', 'M', 'L'],
    stock: 25,
    tag: 'DROP 001',
    details: ['95% cotton, 5% spandex', 'Embroidered gold logo', 'Cropped fit', 'Pre-shrunk', 'Machine washable'],
  },
  {
    id: 'influence-crop-black',
    name: 'INFLUENCE Crop Top — Blackout',
    description: 'All-black cropped tee with tonal "INFLUENCE" print. Minimal, sleek, and made to move.',
    price: 40,
    images: ['/images/merch/crop-black.jpg'],
    category: 'women',
    sizes: ['XS', 'S', 'M', 'L'],
    stock: 30,
    tag: 'DROP 001',
    details: ['95% cotton, 5% spandex', 'Tonal black-on-black print', 'Cropped fit', 'Pre-shrunk', 'Machine washable'],
  },
  {
    id: 'influence-sports-bra',
    name: 'INFLUENCE Sports Bra — Gold Logo',
    description: 'High-support sports bra with gold metallic "INFLUENCE" band. Designed for the shoot and the gym.',
    price: 38,
    images: ['/images/merch/sports-bra.jpg'],
    category: 'women',
    sizes: ['XS', 'S', 'M', 'L'],
    stock: 20,
    tag: 'LIMITED',
    details: ['Nylon/spandex blend', 'Removable pads', 'Gold metallic logo band', 'Moisture-wicking', 'Medium-high support'],
  },
  {
    id: 'influence-hoodie-women',
    name: 'INFLUENCE Oversized Hoodie — Women\'s',
    description: 'Heavyweight oversized hoodie with gold embroidered "INFLUENCE" across the back. The off-duty essential.',
    price: 75,
    comparePrice: 95,
    images: ['/images/merch/hoodie-women.jpg'],
    category: 'women',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 15,
    tag: 'DROP 001',
    details: ['80% cotton, 20% polyester', 'Oversized fit', 'Gold embroidered back logo', 'Kangaroo pocket', 'Ribbed cuffs'],
  },
  {
    id: 'influence-biker-shorts',
    name: 'INFLUENCE Biker Shorts — Gold Stripe',
    description: 'High-waist biker shorts with gold side stripe and subtle "INFLUENCE" logo at the hip.',
    price: 35,
    images: ['/images/merch/biker-shorts.jpg'],
    category: 'women',
    sizes: ['XS', 'S', 'M', 'L'],
    stock: 25,
    tag: 'DROP 001',
    details: ['Nylon/spandex blend', 'High-waist fit', 'Gold side stripe', 'Squat-proof', '5" inseam'],
  },
  {
    id: 'influence-tee-men',
    name: 'INFLUENCE Tee — Men\'s Classic',
    description: 'Premium heavyweight tee with gold foil "INFLUENCE" logo. Relaxed fit, street-ready.',
    price: 40,
    images: ['/images/merch/tee-men.jpg'],
    category: 'men',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 20,
    tag: 'DROP 001',
    details: ['100% heavyweight cotton', 'Gold foil chest logo', 'Relaxed fit', 'Reinforced collar', 'Pre-shrunk'],
  },
  {
    id: 'influence-hoodie-men',
    name: 'INFLUENCE Hoodie — Men\'s',
    description: 'Heavyweight pullover hoodie with gold embroidered "INFLUENCE" across the chest. Premium streetwear.',
    price: 75,
    images: ['/images/merch/hoodie-men.jpg'],
    category: 'men',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 15,
    details: ['80% cotton, 20% polyester', 'Standard fit', 'Gold embroidered logo', 'Kangaroo pocket', 'Drawstring hood'],
  },
  {
    id: 'influence-cap',
    name: 'INFLUENCE Dad Cap — Gold Logo',
    description: 'Unstructured dad cap with gold embroidered "INFLUENCE" logo. One size fits all. Adjustable strap.',
    price: 28,
    images: ['/images/merch/cap.jpg'],
    category: 'unisex',
    sizes: ['S', 'M', 'L'],
    stock: 40,
    details: ['100% cotton twill', 'Unstructured crown', 'Gold embroidery', 'Adjustable brass buckle', 'One size fits most'],
  },
];

export default function ShopPage() {
  const [filter, setFilter] = useState<'all' | 'women' | 'men' | 'unisex'>('all');
  const [cart, setCart] = useState<{ product: Product; size: Size; qty: number }[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, Size>>({});
  const [showCart, setShowCart] = useState(false);
  const [loading, setLoading] = useState(false);

  const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);

  const addToCart = (product: Product) => {
    const size = selectedSizes[product.id];
    if (!size) return;
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id && i.size === size);
      if (existing) {
        return prev.map(i => i.product.id === product.id && i.size === size ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { product, size, qty: 1 }];
    });
    setShowCart(true);
  };

  const removeFromCart = (productId: string, size: Size) => {
    setCart(prev => prev.filter(i => !(i.product.id === productId && i.size === size)));
  };

  const cartTotal = cart.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setLoading(true);
    try {
      const res = await fetch('/api/create-merch-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.map(i => ({
            id: i.product.id,
            name: i.product.name,
            size: i.size,
            price: i.product.price,
            qty: i.qty,
          })),
        }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (err) {
      console.error('Checkout error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808]">
      {/* Nav */}
      <nav className="border-b border-white/[0.06] bg-[#080808]/95 backdrop-blur-xl fixed w-full z-50">
        <div className="flex items-center justify-between h-16 md:h-20 px-6 md:px-14">
          <div className="flex items-center gap-4">
            <MobileNav />
            <div className="hidden md:flex items-center gap-10">
              <Link href="/marketplace" className="text-white/55 hover:text-white transition-colors duration-300 text-[11px] tracking-widest uppercase">Talent</Link>
              <Link href="/services" className="text-white/55 hover:text-white transition-colors duration-300 text-[11px] tracking-widest uppercase">Services</Link>
              <Link href="/pricing" className="text-white/55 hover:text-white transition-colors duration-300 text-[11px] tracking-widest uppercase">Pricing</Link>
              <Link href="/blog" className="text-white/55 hover:text-white transition-colors duration-300 text-[11px] tracking-widest uppercase">Journal</Link>
            </div>
          </div>
          <Link href="/" className="font-display font-semibold tracking-[0.4em] uppercase" style={{ fontSize: '18px', color: gold }}>Influence</Link>
          <div className="flex items-center gap-6">
            <button onClick={() => setShowCart(!showCart)} className="relative text-white/55 hover:text-white transition-colors">
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 text-[9px] font-bold flex items-center justify-center text-black" style={{ backgroundColor: gold }}>{cartCount}</span>
              )}
            </button>
            <Link href="/book" className="hidden md:inline-block px-5 py-2.5 text-[10px] font-bold tracking-widest uppercase transition-all hover:opacity-90" style={{ backgroundColor: gold, color: '#000' }}>
              Book Now
            </Link>
          </div>
        </div>
      </nav>

      {/* Cart Drawer */}
      {showCart && (
        <div className="fixed inset-0 z-[60]">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowCart(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/[0.06] p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-bold text-white tracking-widest uppercase">Your Bag</h2>
              <button onClick={() => setShowCart(false)} className="text-white/40 hover:text-white text-sm">Close</button>
            </div>
            {cart.length === 0 ? (
              <p className="text-white/30 text-sm">Your bag is empty.</p>
            ) : (
              <>
                <div className="space-y-4 mb-8">
                  {cart.map((item, i) => (
                    <div key={i} className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                      <div>
                        <p className="text-white text-sm font-bold">{item.product.name}</p>
                        <p className="text-white/30 text-xs">Size: {item.size} — Qty: {item.qty}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="text-sm font-bold" style={{ color: gold }}>${item.product.price * item.qty}</p>
                        <button onClick={() => removeFromCart(item.product.id, item.size)} className="text-white/20 hover:text-red-400 text-xs">Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/[0.06] pt-4 mb-6">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white/40 text-sm">Subtotal</span>
                    <span className="text-white font-bold">${cartTotal}</span>
                  </div>
                  <p className="text-white/20 text-xs">Shipping calculated at checkout</p>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full py-4 text-[11px] font-bold tracking-widest uppercase transition-all hover:opacity-90 disabled:opacity-50"
                  style={{ backgroundColor: gold, color: '#000' }}
                >
                  {loading ? 'Processing...' : 'Checkout'}
                </button>
                <div className="flex items-center justify-center gap-2 mt-3">
                  <Lock className="w-3 h-3 text-white/20" />
                  <span className="text-white/20 text-[10px]">Secure checkout powered by Stripe</span>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <div className="pt-32 pb-20 px-6 md:px-14">
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-12 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Flame className="w-4 h-4" style={{ color: gold }} />
            <span className="text-[10px] tracking-[0.3em] uppercase font-bold" style={{ color: gold }}>Drop 001 — Limited Edition</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-3 tracking-tight">
            THE <span style={{ color: gold }}>INFLUENCE</span> COLLECTION
          </h1>
          <p className="text-white/35 text-sm max-w-lg mx-auto mb-8">
            Exclusive, limited-run pieces. Once they're gone, they're gone. Worn by our models. Designed for you.
          </p>

          {/* Filters — hidden until drop goes live
          <div className="flex items-center justify-center gap-3">
            {(['all', 'women', 'men', 'unisex'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 text-[10px] font-bold tracking-widest uppercase transition-all border ${
                  filter === f
                    ? 'text-black border-transparent'
                    : 'text-white/40 border-white/10 hover:border-[#c9a96e]/50 hover:text-white'
                }`}
                style={filter === f ? { backgroundColor: gold } : undefined}
              >
                {f === 'all' ? 'All' : f}
              </button>
            ))}
          </div>
          */}
        </div>

        {/* Coming Soon */}
        <div className="max-w-2xl mx-auto border border-white/[0.06] p-16 text-center">
          <Flame className="w-8 h-8 mx-auto mb-4" style={{ color: gold }} />
          <h2 className="text-2xl font-bold text-white mb-3">Drop 001 — Coming Soon</h2>
          <p className="text-white/35 text-sm mb-6 leading-relaxed">
            The first INFLUENCE collection is in production. Crop tops, hoodies, biker shorts, and more — 
            worn by our models, designed for you. Extremely limited quantities.
          </p>
          <p className="text-white/20 text-xs tracking-widest uppercase">Follow @influencemodels.agency for the drop date</p>
        </div>

        {/* Info Section */}
        <div className="max-w-6xl mx-auto mt-16 grid md:grid-cols-3 gap-6">
          <div className="border border-white/[0.06] p-6 text-center">
            <Flame className="w-5 h-5 mx-auto mb-3" style={{ color: gold }} />
            <h3 className="text-white font-bold text-sm mb-1">Limited Drops</h3>
            <p className="text-white/30 text-xs">Each drop is extremely limited. When it sells out, it's gone forever.</p>
          </div>
          <div className="border border-white/[0.06] p-6 text-center">
            <ShoppingBag className="w-5 h-5 mx-auto mb-3" style={{ color: gold }} />
            <h3 className="text-white font-bold text-sm mb-1">Premium Quality</h3>
            <p className="text-white/30 text-xs">Every piece is made-to-order with premium materials. No fast fashion.</p>
          </div>
          <div className="border border-white/[0.06] p-6 text-center">
            <Lock className="w-5 h-5 mx-auto mb-3" style={{ color: gold }} />
            <h3 className="text-white font-bold text-sm mb-1">Secure Checkout</h3>
            <p className="text-white/30 text-xs">Stripe-secured payments. Ships within 5-7 business days.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
