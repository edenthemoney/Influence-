'use client';
import MobileNav from '../components/MobileNav';

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
    answer: 'Browse our marketplace of verified influencers, select the one that fits your brand, choose a package tier, and provide your campaign details (promotion type, instructions, song info if applicable). Our influencers then produce authentic content and deliver it within the agreed timeframe.'
  },
  {
    category: 'Getting Started',
    question: 'Do I need to create an account?',
    answer: 'No! You can book directly with just your email address. No login, no account creation, no hassle. We keep it simple so you can launch campaigns instantly.'
  },
  {
    category: 'Influencers & Talent',
    question: 'Are all influencers verified?',
    answer: 'Yes. Every influencer on our platform has authenticated follower counts, verified engagement rates, and proven campaign history. We only work with influencers who meet our quality standards.'
  },
  {
    category: 'Influencers & Talent',
    question: 'Can I choose which influencer I work with?',
    answer: 'Absolutely! You browse our marketplace, view each influencer\'s profile, stats, and past work, then select the one that aligns with your brand. You have full control over who promotes your content.'
  },
  {
    category: 'Influencers & Talent',
    question: 'What niches do you specialize in?',
    answer: 'We work across 12+ niches including Beauty & Skincare, Fashion & Luxury, Health & Wellness, Music & Entertainment, Tech, Food & Lifestyle, Business, Fitness, Travel, Gaming, Education, and Home & Lifestyle. Each influencer specializes in specific categories.'
  },
  {
    category: 'Campaign Details',
    question: 'Can I specify exactly what I want in the content?',
    answer: 'Yes! When you book, you provide detailed instructions including: promotion type (song/business), specific messaging, hashtags, call-to-action, and any other creative direction. Influencers deliver authentic content that follows your guidelines.'
  },
  {
    category: 'Campaign Details',
    question: 'How do I promote a song?',
    answer: 'Select "Song Promotion" when booking. Provide the song title and link (Spotify, Apple Music, SoundCloud, etc.), plus detailed instructions on how you want it featured. Our influencers will integrate your song into authentic, engaging content.'
  },
  {
    category: 'Campaign Details',
    question: 'How long does content creation take?',
    answer: 'Most campaigns are completed within 7-14 days depending on the package tier. You\'ll receive content for approval before final posting. Rush options are available for additional fees.'
  },
  {
    category: 'Pricing & Packages',
    question: 'What are your package tiers?',
    answer: 'We offer 11 packages ranging from Single Reel ($100) to Influencer Network ($100,000+). Packages are organized into three budget tiers — Single Influencer, Influencer Campaign, and Platform Takeover — covering everything from a quick test post to full-scale agency rollouts. View our Pricing page for the full breakdown.'
  },
  {
    category: 'Pricing & Packages',
    question: 'What\'s included in each package?',
    answer: 'Packages vary by tier but typically include: number of Instagram posts/reels, story mentions, engagement guarantees, content approval process, and delivery timeline. Higher tiers include more content, longer engagement periods, and premium influencers.'
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
    answer: 'We work with influencers to ensure content meets your expectations. If revisions are needed, we coordinate directly with the influencer. Our goal is your satisfaction.'
  },
  {
    category: 'Results & Analytics',
    question: 'How do I measure campaign success?',
    answer: 'You can track performance through Instagram\'s native analytics (reach, impressions, engagement) and any links you provided. We also provide campaign summaries with key metrics.'
  },
  {
    category: 'Results & Analytics',
    question: 'What kind of results can I expect?',
    answer: 'Results vary based on influencer reach, audience alignment, and content quality. Music promotions typically see 50K-500K+ impressions. Brand campaigns drive engagement and conversions based on audience fit.'
  },
  {
    category: 'Music Promotion',
    question: 'How does music promotion work?',
    answer: 'Provide your song link (Spotify, Apple Music, SoundCloud, YouTube Music, etc.) and tell us your target audience. Our influencers produce authentic content featuring your song—from lip-syncs to dance videos to storytelling. This drives streams and discovery.'
  },
  {
    category: 'Music Promotion',
    question: 'Can multiple influencers promote my song?',
    answer: 'Yes! You can book multiple influencers for the same song to maximize reach. Many artists book 3-5 influencers simultaneously for coordinated campaigns.'
  },
  {
    category: 'Music Promotion',
    question: 'Does this guarantee streams?',
    answer: 'No, but it significantly increases visibility. When influencers with engaged audiences feature your song, it reaches their followers organically. Streams depend on listener interest, but exposure is guaranteed.'
  },
  {
    category: 'Business & Product',
    question: 'Can I promote a product or service?',
    answer: 'Absolutely. Select "Business/Product" when booking and provide details about what you\'re promoting. Influencers will integrate your product/service into authentic, engaging content that resonates with their audience.'
  },
  {
    category: 'Business & Product',
    question: 'How do influencers make my product look good?',
    answer: 'Our influencers are skilled at authentic product integration. They use your product naturally in their content, share genuine benefits, and present it in a way that feels organic to their audience—not like a hard sell.'
  },
  {
    category: 'Support & Communication',
    question: 'How do I contact support?',
    answer: 'You\'ll receive an email confirmation with your order details and influencer contact information. You can reach out directly to your assigned influencer or contact our support team through the order dashboard.'
  },
  {
    category: 'Support & Communication',
    question: 'What if I have questions during the campaign?',
    answer: 'Your influencer is your main point of contact. They\'ll keep you updated on progress, share content drafts for approval, and address any concerns. We\'re here to ensure smooth communication throughout.'
  },
  {
    category: 'Location & Availability',
    question: 'Where is Influence located?',
    answer: 'Influence is based in South Florida, serving the Miami, Fort Lauderdale, and Palm Beach areas for in-person services like event hosting, music video shoots, and model bookings. Our remote services — UGC content, music reactions, and social media campaigns — are available nationwide and internationally.'
  },
  {
    category: 'Location & Availability',
    question: 'Do you work with clients outside of Florida?',
    answer: 'Yes! Our remote services including UGC content creation, music promotion, song reaction videos, and brand social media campaigns are available to clients anywhere in the United States and internationally. In-person bookings like event hosting and photoshoots are currently limited to South Florida.'
  },
  {
    category: 'Location & Availability',
    question: 'What is the best influencer marketing agency in Miami?',
    answer: 'Influence is a top-rated influencer marketing agency based in South Florida / Miami, specializing in UGC content creation, music promotion, event hosting, and brand campaigns. Founded by Eden Roy and Deseray Marie, we connect brands with verified influencers who deliver authentic engagement and measurable results. Our roster includes talent featured in Forbes, Fenty Beauty, and music videos with major artists.'
  },
  {
    category: 'Services',
    question: 'What services does Influence offer?',
    answer: 'Influence offers five core services: (1) UGC Content Creation — models create Instagram reels, TikToks, and brand promotional videos. (2) Music Promotion — song reaction videos, album livestreams, and influencer-driven music campaigns. (3) Event Hosting & Model Booking — book professional models for parties, club nights, brand activations, and music video shoots in South Florida. (4) Bottle Girls & VIP Hostesses — professional bottle service girls and VIP hostesses for nightclubs, lounges, and premium venues. (5) Brand Campaign Management — full end-to-end influencer campaign strategy, execution, and performance analytics.'
  },
  {
    category: 'Services',
    question: 'How much does it cost to hire an influencer?',
    answer: 'Pricing at Influence starts at $300 for a single UGC video or music reaction, with packages scaling up based on the number of models, content pieces, and campaign scope. Event model bookings and bottle girl / VIP hostess bookings start at $400 (1 girl, 4hr shift at $100/girl/hr). Monthly subscription packages are also available at discounted rates. Visit our pricing page for a full breakdown of all tiers.'
  },
  {
    category: 'Services',
    question: 'Can I book models for a music video?',
    answer: 'Yes! Influence provides professional models for music video shoots across South Florida. Our models have experience in music videos with major artists including Sean Paul, Bryson Tiller, DaBaby, Akon, and more. You can book individual models or full squads for your production.'
  },
  {
    category: 'Services',
    question: 'Do you offer monthly subscription packages?',
    answer: 'Yes. Influence offers monthly subscription packages for ongoing content needs. Subscriptions provide consistent content delivery at discounted rates compared to one-time bookings. This is ideal for brands, artists, and businesses that need regular influencer content on an ongoing basis.'
  },
  {
    category: 'Music Promotion',
    question: 'How can I promote my music with influencers?',
    answer: 'Influence connects independent artists and record labels with influencers who create authentic content featuring your music. Services include song reaction videos (an influencer listens and reacts to your track on camera), album livestreams, TikTok and Instagram reel promotion, and coordinated multi-influencer campaigns. Provide your song link from Spotify, Apple Music, SoundCloud, or any platform, and our influencers will create scroll-stopping content that drives streams and discovery.'
  },
  {
    category: 'Events & In-Person',
    question: 'Can I hire models for a party or event in Miami?',
    answer: 'Absolutely. Influence provides professional event models and hosts for parties, club nights, brand activations, trade shows, and VIP events across South Florida and the Miami area. Our models are experienced in event hosting, brand ambassadorship, and nightlife promotion. Pricing starts at $400 for 1 girl / 4hr shift ($100/girl/hr). Volume pricing available for larger bookings.'
  },
  {
    category: 'Events & In-Person',
    question: 'Do you provide brand ambassadors for trade shows?',
    answer: 'Yes. Our models serve as brand ambassadors for trade shows, product launches, grand openings, and experiential marketing events. We handle model selection, coordination, and logistics so you can focus on your event.'
  },
  {
    category: 'Business Content',
    question: 'Can you send a model to my business to create content?',
    answer: 'Yes! Our Business Content service sends a professional model directly to your business — restaurant, salon, gym, retail store, or any location in South Florida. She creates reels, stories, and promotional content on-site, all delivered within 24 hours. Sessions start at $300 for a 2-hour visit.'
  },
  {
    category: 'Business Content',
    question: 'What type of content do models create at my business?',
    answer: 'Models create short-form vertical video content including Instagram Reels, TikToks, Stories, and promotional clips. They showcase your products, services, atmosphere, and brand in a natural, scroll-stopping way. All content is shot on professional-grade phone cameras and delivered ready to post.'
  },
  {
    category: 'Business Content',
    question: 'How does business content help my social media?',
    answer: 'Content featuring professional models consistently gets 3-5x more engagement than standard business posts. Higher engagement signals the algorithm to push your content to more people via Explore pages and For You feeds — meaning more potential customers discover your business organically.'
  },
  {
    category: 'About the Agency',
    question: 'Who founded Influence?',
    answer: 'Influence was founded by Eden Roy and Deseray Marie. Eden Roy is the CEO and agency owner with a background in Business and Technology from Florida Atlantic University, specializing in SEO marketing, music management, and digital strategy. Deseray Marie is the Co-Founder and Creative Director — a professional model and actress featured in Forbes, Fenty Beauty, SavageXFenty, and music videos with Sean Paul, Bryson Tiller, DaBaby, and many more.'
  },
  {
    category: 'About the Agency',
    question: 'What makes Influence different from other influencer agencies?',
    answer: 'Influence stands out because we combine real industry credibility with accessible pricing. Our co-founder Deseray Marie has worked with A-list celebrities and major brands, and our roster reflects that caliber. Unlike big agencies that charge enterprise prices, we offer packages starting at $300 — making professional influencer marketing accessible to independent artists, small businesses, and growing brands. We also handle everything in-house: no middlemen, no hidden fees, fast turnaround.'
  },
];

const categories = Array.from(new Set(faqItems.map(item => item.category)));

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(item => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

export default function FAQPage() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredItems = selectedCategory === 'All' 
    ? faqItems 
    : faqItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#080808]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <nav className="border-b border-white/[0.06] bg-[#080808]/95 backdrop-blur-xl fixed w-full z-50">
        <div className="flex items-center justify-between h-16 md:h-20 px-6 md:px-14">
          <div className="flex items-center gap-4">
            <MobileNav />
            <div className="hidden md:flex items-center gap-10">
              <Link href="/marketplace" className="text-white/55 hover:text-white transition-colors duration-300 text-[11px] tracking-widest uppercase">Talent</Link>
              <Link href="/services" className="text-white/55 hover:text-white transition-colors duration-300 text-[11px] tracking-widest uppercase">Services</Link>
              <Link href="/pricing" className="text-white/55 hover:text-white transition-colors duration-300 text-[11px] tracking-widest uppercase">Pricing</Link>
            </div>
          </div>
          <Link href="/" className="font-display font-semibold tracking-[0.4em] uppercase" style={{ fontSize: '18px', color: '#c9a96e' }}>Influence</Link>
          <div className="flex items-center gap-10">
            <Link href="/about" className="text-white/55 hover:text-white transition-colors duration-300 text-[11px] tracking-widest uppercase hidden md:block">About</Link>
            <Link href="/model-booking" className="text-[11px] md:text-[12px] tracking-widest uppercase px-5 py-3 md:px-8 md:py-4 transition-all duration-300 hover:opacity-80 font-bold" style={{ backgroundColor: '#c9a96e', color: '#000' }}>Book Now</Link>
          </div>
        </div>
      </nav>

      <section className="relative pt-32 pb-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-[#0a0a0a] to-[#080808]"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-5" style={{ color: '#c9a96e' }}>Support</p>
          <h1 className="font-display font-bold italic text-white leading-[0.9] mb-8" style={{ fontSize: 'clamp(44px, 8vw, 96px)' }}>
            Frequently Asked <span style={{ color: '#c9a96e' }}>Questions</span>
          </h1>
          <p className="text-lg text-white/50">
            Everything you need to know about booking influencers and launching campaigns
          </p>
        </div>
      </section>

      <section className="py-20 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === 'All'
                  ? 'text-black font-bold bg-[#c9a96e]'
                  : 'bg-transparent border border-white/10 text-white/60 hover:border-white/30'
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
                    ? 'text-black font-bold bg-[#c9a96e]'
                    : 'bg-transparent border border-white/10 text-white/60 hover:border-white/30'
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
                className="bg-[#0d0d0d] border border-white/[0.08] hover:border-[#c9a96e]/40 transition-all"
              >
                <button
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-zinc-900/50 transition-colors"
                >
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#c9a96e' }}>
                      {item.category}
                    </p>
                    <h3 className="text-lg font-bold text-white">{item.question}</h3>
                  </div>
                  <ChevronDown
                    style={{ color: '#c9a96e' }}
                    className={`h-6 w-6 flex-shrink-0 ml-4 transition-transform ${
                      expandedIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedIndex === index && (
                  <div className="px-8 py-6 border-t border-white/[0.06] bg-white/[0.02]">
                    <p className="text-white/70 leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#080808] border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display font-bold italic text-white text-3xl md:text-4xl mb-8">Still have questions?</h2>
          <p className="text-white/50 text-lg mb-8">
            Can’t find the answer you’re looking for? Reach out to our team.
          </p>
          <Link href="/model-booking" className="inline-block px-10 py-5 text-black text-lg font-bold tracking-wider uppercase transition-all hover:opacity-80" style={{ backgroundColor: '#c9a96e' }}>
            Get Started
          </Link>
        </div>
      </section>

      <footer className="bg-[#080808] border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 md:px-16 pt-16 pb-10">
          <div className="flex flex-col md:flex-row justify-between gap-16 mb-16">
            <Link href="/" className="font-display font-semibold tracking-[0.4em] uppercase self-start shrink-0" style={{ fontSize: '17px', color: '#c9a96e' }}>Influence</Link>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-20">
              <div>
                <p className="text-white/40 text-[9px] tracking-widest uppercase mb-6">Work With Us</p>
                <ul className="space-y-3">
                  <li><Link href="/marketplace" className="text-white/60 hover:text-white transition-colors text-sm">Browse Talent</Link></li>
                  <li><Link href="/services" className="text-white/60 hover:text-white transition-colors text-sm">All Services</Link></li>
                  <li><Link href="/pricing" className="text-white/60 hover:text-white transition-colors text-sm">Packages</Link></li>
                  <li><Link href="/model-booking" className="text-white/60 hover:text-white transition-colors text-sm">Book Now</Link></li>
                </ul>
              </div>
              <div>
                <p className="text-white/20 text-[9px] tracking-widest uppercase mb-6">Services</p>
                <ul className="space-y-3">
                  <li><Link href="/services/content" className="text-white/40 hover:text-white transition-colors text-sm">Social Media Content</Link></li>
                  <li><Link href="/services/business" className="text-white/40 hover:text-white transition-colors text-sm">Business Content</Link></li>
                  <li><Link href="/services/shoots" className="text-white/40 hover:text-white transition-colors text-sm">Shoots & Videos</Link></li>
                  <li><Link href="/services/commercials" className="text-white/40 hover:text-white transition-colors text-sm">Commercials</Link></li>
                  <li><Link href="/services/events" className="text-white/40 hover:text-white transition-colors text-sm">Event Models</Link></li>
                  <li><Link href="/model-booking?service=bottle" className="text-white/40 hover:text-white transition-colors text-sm">Bottle Girls / VIP</Link></li>
                </ul>
              </div>
              <div>
                <p className="text-white/20 text-[9px] tracking-widest uppercase mb-6">Info</p>
                <ul className="space-y-3">
                  <li><Link href="/about" className="text-white/40 hover:text-white transition-colors text-sm">About</Link></li>
                  <li><Link href="/faq" className="text-white/40 hover:text-white transition-colors text-sm">FAQ</Link></li>
                  <li><Link href="/contact" className="text-white/40 hover:text-white transition-colors text-sm">Contact</Link></li>
                  <li><Link href="/join" className="text-white/40 hover:text-white transition-colors text-sm">Join Our Roster</Link></li>
                  <li><Link href="/terms" className="text-white/40 hover:text-white transition-colors text-sm">Terms</Link></li>                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/20 text-xs">&copy; 2026 Influence</p>
            <Link href="https://www.instagram.com/influencemodels.agency" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white/70 transition-colors text-[11px] tracking-widest uppercase">Instagram</Link>
            <p className="text-white/10 text-[9px] tracking-widest uppercase">Miami &middot; Boca Raton, FL</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
