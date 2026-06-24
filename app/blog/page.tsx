'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock, TrendingUp } from 'lucide-react';
import MobileNav from '../components/MobileNav';

const gold = '#c9a96e';

const articles = [
  {
    slug: 'why-influencer-marketing-is-dominating-2025',
    title: 'Why Influencer Marketing Is Dominating 2025 (And It\'s Only Getting Bigger)',
    excerpt: 'Brands are shifting billions from traditional advertising to influencer partnerships. Here\'s the data behind the explosion — and why it matters for your business.',
    category: 'Industry',
    readTime: '7 min read',
    date: 'May 2025',
    featured: true,
    image: '/images/Des/des-2.jpg',
  },
  {
    slug: 'roi-of-influencer-marketing-vs-traditional-ads',
    title: 'Influencer Marketing ROI: 11x Returns vs. Traditional Advertising',
    excerpt: 'The numbers don\'t lie. Dollar for dollar, influencer campaigns outperform TV, billboard, and paid social. We break down exactly why.',
    category: 'Data',
    readTime: '5 min read',
    date: 'May 2025',
    featured: false,
    image: '/images/Des/des-3.jpg',
  },
  {
    slug: 'how-miami-brands-are-winning-with-local-influencers',
    title: 'How Miami Brands Are Winning Big With Local Influencers',
    excerpt: 'Restaurants, nightclubs, and fashion labels in Miami are seeing 3-5x more engagement using local talent over celebrity endorsements. Here\'s their playbook.',
    category: 'Case Study',
    readTime: '6 min read',
    date: 'May 2025',
    featured: false,
    image: '/images/Des/des-4.jpg',
  },
  {
    slug: 'ugc-vs-branded-content-what-converts-better',
    title: 'UGC vs. Branded Content: What Actually Converts Better in 2025',
    excerpt: 'User-generated content outperforms polished brand ads by 4x on engagement and 2.4x on conversions. Here\'s how to use it.',
    category: 'Strategy',
    readTime: '5 min read',
    date: 'May 2025',
    featured: false,
    image: '/images/Des/des-5.jpg',
  },
  {
    slug: 'music-video-models-the-secret-weapon-for-viral-videos',
    title: 'Music Video Models: The Secret Weapon Behind Every Viral Video',
    excerpt: 'From Trippie Redd to Sean Paul — why professional models make or break a music video\'s performance. Plus: what it costs.',
    category: 'Music',
    readTime: '8 min read',
    date: 'May 2025',
    featured: false,
    image: '/images/Nadia/nadia-1.jpg',
  },
];

export default function BlogPage() {
  const featured = articles.find(a => a.featured);
  const rest = articles.filter(a => !a.featured);

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
              <Link href="/blog" className="text-white transition-colors duration-300 text-[11px] tracking-widest uppercase" style={{ color: gold }}>Journal</Link>
            </div>
          </div>
          <Link href="/" className="font-display font-semibold tracking-[0.4em] uppercase" style={{ fontSize: '18px', color: gold }}>Influence</Link>
          <div className="flex items-center gap-10">
            <div className="hidden md:flex items-center gap-10">
              <Link href="/about" className="text-white/55 hover:text-white transition-colors duration-300 text-[11px] tracking-widest uppercase">About</Link>
              <Link href="/contact" className="text-white/55 hover:text-white transition-colors duration-300 text-[11px] tracking-widest uppercase">Contact</Link>
            </div>
            <Link href="/book" className="px-5 py-2.5 text-[10px] font-bold tracking-widest uppercase transition-all hover:opacity-90" style={{ backgroundColor: gold, color: '#000' }}>
              Book Now
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-32 pb-20 px-6 md:px-14">
        {/* Header */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-4 h-4" style={{ color: gold }} />
            <span className="text-[10px] tracking-[0.3em] uppercase font-bold" style={{ color: gold }}>The Influence Journal</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Insights on the<br />
            <span style={{ color: gold }}>Creator Economy</span>
          </h1>
          <p className="text-white/40 text-lg max-w-xl">
            Data, strategy, and stories from the front lines of influencer marketing.
          </p>
        </div>

        {/* Featured Article */}
        {featured && (
          <Link href={`/blog/${featured.slug}`} className="block max-w-5xl mx-auto mb-16 group">
            <div className="relative overflow-hidden border border-white/[0.06] hover:border-[#c9a96e]/30 transition-all">
              <div className="grid md:grid-cols-2">
                <div className="relative h-64 md:h-96">
                  <Image src={featured.image} alt={featured.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#080808] hidden md:block" />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 text-[9px] font-bold tracking-widest uppercase border" style={{ borderColor: gold, color: gold }}>{featured.category}</span>
                    <span className="text-white/30 text-xs flex items-center gap-1"><Clock className="w-3 h-3" />{featured.readTime}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-[#c9a96e] transition-colors leading-tight">{featured.title}</h2>
                  <p className="text-white/40 text-sm leading-relaxed mb-6">{featured.excerpt}</p>
                  <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase" style={{ color: gold }}>
                    Read Article <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Article Grid */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          {rest.map(article => (
            <Link key={article.slug} href={`/blog/${article.slug}`} className="group block border border-white/[0.06] hover:border-[#c9a96e]/30 transition-all">
              <div className="relative h-48">
                <Image src={article.image} alt={article.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="px-2 py-0.5 text-[8px] font-bold tracking-widest uppercase bg-black/60 border border-white/10 text-white/70">{article.category}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#c9a96e] transition-colors leading-snug">{article.title}</h3>
                <p className="text-white/35 text-sm leading-relaxed mb-4">{article.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-white/20 text-xs">{article.date}</span>
                  <span className="text-white/20 text-xs flex items-center gap-1"><Clock className="w-3 h-3" />{article.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="max-w-5xl mx-auto mt-20 text-center border border-white/[0.06] p-12">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to Leverage Influencer Marketing?</h2>
          <p className="text-white/40 mb-6">Book a model or launch a campaign today.</p>
          <Link href="/book" className="inline-block px-8 py-4 text-[11px] font-bold tracking-widest uppercase hover:opacity-90 transition-all" style={{ backgroundColor: gold, color: '#000' }}>
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
