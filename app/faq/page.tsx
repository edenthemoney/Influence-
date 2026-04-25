'use client';

import Link from 'next/link';
import { Crown, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqItems: FAQItem[] = [
  {
    category: 'Getting Started',
    question: 'How does INFLUENCE work?',
    answer: 'Browse our marketplace of verified creators, select the one that fits your brand, choose a package tier, and provide your campaign details (promotion type, instructions, song info if applicable). Our creators then produce authentic content and deliver it within the agreed timeframe.'
  },
  {
    category: 'Getting Started',
    question: 'Do I need to create an account?',
    answer: 'No! You can book directly with just your email address. No login, no account creation, no hassle. We keep it simple so you can launch campaigns instantly.'
  },
  {
    category: 'Creators & Talent',
    question: 'Are all creators verified?',
    answer: 'Yes. Every creator on our platform has authenticated follower counts, verified engagement rates, and proven campaign history. We only work with creators who meet our quality standards.'
  },
  {
    category: 'Creators & Talent',
    question: 'Can I choose which creator I work with?',
    answer: 'Absolutely! You browse our marketplace, view each creator\'s profile, stats, and past work, then select the one that aligns with your brand. You have full control over who promotes your content.'
  },
  {
    category: 'Creators & Talent',
    question: 'What niches do you specialize in?',
    answer: 'We work across 12+ niches including Beauty & Skincare, Fashion & Luxury, Health & Wellness, Music & Entertainment, Tech, Food & Lifestyle, Business, Fitness, Travel, Gaming, Education, and Home & Lifestyle. Each creator specializes in specific categories.'
  },
  {
    category: 'Campaign Details',
    question: 'Can I specify exactly what I want in the content?',
    answer: 'Yes! When you book, you provide detailed instructions including: promotion type (song/business), specific messaging, hashtags, call-to-action, and any other creative direction. Creators deliver authentic content that follows your guidelines.'
  },
  {
    category: 'Campaign Details',
    question: 'How do I promote a song?',
    answer: 'Select "Song Promotion" when booking. Provide the song title and link (Spotify, Apple Music, SoundCloud, etc.), plus detailed instructions on how you want it featured. Our creators will integrate your song into authentic, engaging content.'
  },
  {
    category: 'Campaign Details',
    question: 'How long does content creation take?',
    answer: 'Most campaigns are completed within 7-14 days depending on the package tier. You\'ll receive content for approval before final posting. Rush options are available for additional fees.'
  },
  {
    category: 'Pricing & Packages',
    question: 'What are your package tiers?',
    answer: 'We offer 8 tiers ranging from SAMPLE ($85) to SIGNATURE ($10,000). Each tier includes different numbers of posts, story mentions, and engagement levels. View our Pricing page for detailed breakdowns.'
  },
  {
    category: 'Pricing & Packages',
    question: 'What\'s included in each package?',
    answer: 'Packages vary by tier but typically include: number of Instagram posts/reels, story mentions, engagement guarantees, content approval process, and delivery timeline. Higher tiers include more content, longer engagement periods, and premium creators.'
  },
  {
    category: 'Pricing & Packages',
    question: 'Are there any hidden fees?',
    answer: 'No. Our pricing is transparent. The price you see is what you pay. We don\'t add surprise fees or charges. All costs are clearly listed upfront.'
  },
  {
    category: 'Payment & Security',
    question: 'How do payments work?',
    answer: 'We use Stripe for secure payment processing. You pay upfront when booking. Your payment is held securely until content is delivered and approved. We never charge your card without authorization.'
  },
  {
    category: 'Payment & Security',
    question: 'Is my payment information safe?',
    answer: 'Yes. We use Stripe, a PCI-compliant payment processor trusted by millions of businesses worldwide. Your credit card information is never stored on our servers.'
  },
  {
    category: 'Payment & Security',
    question: 'What if I\'m not satisfied with the content?',
    answer: 'We work with creators to ensure content meets your expectations. If revisions are needed, we coordinate directly with the creator. Our goal is your satisfaction.'
  },
  {
    category: 'Results & Analytics',
    question: 'How do I measure campaign success?',
    answer: 'You can track performance through Instagram\'s native analytics (reach, impressions, engagement) and any links you provided. We also provide campaign summaries with key metrics.'
  },
  {
    category: 'Results & Analytics',
    question: 'What kind of results can I expect?',
    answer: 'Results vary based on creator reach, audience alignment, and content quality. Music promotions typically see 50K-500K+ impressions. Brand campaigns drive engagement and conversions based on audience fit.'
  },
  {
    category: 'Music Promotion',
    question: 'How does music promotion work?',
    answer: 'Provide your song link (Spotify, Apple Music, SoundCloud, YouTube Music, etc.) and tell us your target audience. Our creators produce authentic content featuring your song—from lip-syncs to dance videos to storytelling. This drives streams and discovery.'
  },
  {
    category: 'Music Promotion',
    question: 'Can multiple creators promote my song?',
    answer: 'Yes! You can book multiple creators for the same song to maximize reach. Many artists book 3-5 creators simultaneously for coordinated campaigns.'
  },
  {
    category: 'Music Promotion',
    question: 'Does this guarantee streams?',
    answer: 'No, but it significantly increases visibility. When creators with engaged audiences feature your song, it reaches their followers organically. Streams depend on listener interest, but exposure is guaranteed.'
  },
  {
    category: 'Business & Product',
    question: 'Can I promote a product or service?',
    answer: 'Absolutely. Select "Business/Product" when booking and provide details about what you\'re promoting. Creators will integrate your product/service into authentic, engaging content that resonates with their audience.'
  },
  {
    category: 'Business & Product',
    question: 'How do creators make my product look good?',
    answer: 'Our creators are skilled at authentic product integration. They use your product naturally in their content, share genuine benefits, and present it in a way that feels organic to their audience—not like a hard sell.'
  },
  {
    category: 'Support & Communication',
    question: 'How do I contact support?',
    answer: 'You\'ll receive an email confirmation with your order details and creator contact information. You can reach out directly to your assigned creator or contact our support team through the order dashboard.'
  },
  {
    category: 'Support & Communication',
    question: 'What if I have questions during the campaign?',
    answer: 'Your creator is your main point of contact. They\'ll keep you updated on progress, share content drafts for approval, and address any concerns. We\'re here to ensure smooth communication throughout.'
  },
];

const categories = Array.from(new Set(faqItems.map(item => item.category)));

export default function FAQPage() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredItems = selectedCategory === 'All' 
    ? faqItems 
    : faqItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-black">
      <nav className="border-b border-white/10 bg-black/80 backdrop-blur-xl fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center space-x-3">
              <Crown className="h-10 w-10 text-yellow-500" />
              <span className="text-3xl font-bold gradient-text tracking-tight">INFLUENCE</span>
            </Link>
            <div className="hidden md:flex items-center space-x-10">
              <Link href="/marketplace" className="text-white/80 hover:text-yellow-500 transition-colors text-sm font-medium tracking-wide uppercase">
                Talent
              </Link>
              <Link href="/about" className="text-white/80 hover:text-yellow-500 transition-colors text-sm font-medium tracking-wide uppercase">
                About
              </Link>
              <Link href="/pricing" className="text-white/80 hover:text-yellow-500 transition-colors text-sm font-medium tracking-wide uppercase">
                Services
              </Link>
              <Link href="/pricing" className="px-8 py-3 gold-gradient text-black rounded-none font-bold text-sm tracking-wider uppercase hover:shadow-2xl hover:shadow-yellow-500/50 transition-all">
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative pt-32 pb-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900 to-black"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-black mb-8 leading-tight">
            <span className="text-white">Frequently Asked</span>
            <br />
            <span className="gradient-text">Questions</span>
          </h1>
          <p className="text-xl text-white/70">
            Everything you need to know about booking creators and launching campaigns
          </p>
        </div>
      </section>

      <section className="py-20 bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === 'All'
                  ? 'gold-gradient text-black'
                  : 'bg-black border border-white/20 text-white hover:border-yellow-500'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'gold-gradient text-black'
                    : 'bg-black border border-white/20 text-white hover:border-yellow-500'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredItems.map((item, index) => (
              <div
                key={index}
                className="bg-black border border-white/10 hover:border-yellow-500/50 transition-all"
              >
                <button
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-zinc-900/50 transition-colors"
                >
                  <div>
                    <p className="text-xs text-yellow-500 font-semibold uppercase tracking-wider mb-2">
                      {item.category}
                    </p>
                    <h3 className="text-lg font-bold text-white">{item.question}</h3>
                  </div>
                  <ChevronDown
                    className={`h-6 w-6 text-yellow-500 flex-shrink-0 ml-4 transition-transform ${
                      expandedIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedIndex === index && (
                  <div className="px-8 py-6 border-t border-white/10 bg-zinc-900/30">
                    <p className="text-white/70 leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-black border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black text-white mb-8">Still have questions?</h2>
          <p className="text-white/70 text-lg mb-8">
            Can't find the answer you're looking for? Reach out to our team.
          </p>
          <Link href="/marketplace" className="inline-block px-10 py-5 gold-gradient text-black rounded-none text-lg font-bold tracking-wider uppercase hover:shadow-2xl hover:shadow-yellow-500/50 transition-all">
            Browse Creators
          </Link>
        </div>
      </section>

      <footer className="bg-black border-t border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-white/40 text-sm">&copy; 2024 INFLUENCE. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
