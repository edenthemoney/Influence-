'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Clock, Share2, TrendingUp } from 'lucide-react';
import { useParams } from 'next/navigation';
import MobileNav from '../../components/MobileNav';

const gold = '#c9a96e';

const articles: Record<string, any> = {
  'why-influencer-marketing-is-dominating-2025': {
    title: 'Why Influencer Marketing Is Dominating 2025 (And It\'s Only Getting Bigger)',
    category: 'Industry',
    readTime: '7 min read',
    date: 'May 19, 2025',
    author: 'Influence Models Agency',
    image: '/images/Des/des-2.jpg',
    content: [
      { type: 'text', value: 'The influencer marketing industry is projected to hit $32.5 billion in 2025 — a number that would have sounded absurd just five years ago. But the data is undeniable, and the shift is irreversible.' },
      { type: 'heading', value: 'The Death of Traditional Advertising' },
      { type: 'text', value: 'Consumers don\'t trust ads anymore. Banner blindness is real — 86% of people skip TV commercials, and ad-blocker usage has grown 30% year over year. The average person sees 6,000-10,000 ads per day, and their brain has learned to ignore virtually all of them.' },
      { type: 'text', value: 'But when their favorite influencer recommends a product? 61% of consumers trust influencer recommendations over branded content. That number jumps to 72% for Gen Z.' },
      { type: 'heading', value: 'Why Influencers Convert Better' },
      { type: 'stat', label: '11x', description: 'Higher ROI than traditional digital marketing' },
      { type: 'stat', label: '4.2x', description: 'More engagement than brand-created content' },
      { type: 'stat', label: '72%', description: 'Of Gen Z trust influencer recommendations' },
      { type: 'text', value: 'The reason is simple: parasocial relationships. People follow influencers because they feel a genuine connection. When that person recommends a product, it feels like advice from a friend — not a billboard screaming at you on I-95.' },
      { type: 'heading', value: 'The Miami Advantage' },
      { type: 'text', value: 'Miami has become the epicenter of influencer culture. The city\'s lifestyle — beaches, nightlife, fashion, music — creates the perfect content backdrop. Miami-based influencers consistently outperform national averages on engagement rates because their content is aspirational and authentic simultaneously.' },
      { type: 'text', value: 'At Influence Models Agency, we\'ve seen this firsthand. Our talent roster — featuring models who\'ve worked with Sean Paul, Trippie Redd, Kodak Black, and appeared on Love & Hip Hop — delivers engagement rates 3-5x above industry benchmarks. Because when the talent is real, the content performs.' },
      { type: 'heading', value: 'What This Means for Your Brand' },
      { type: 'text', value: 'If you\'re still allocating 80% of your marketing budget to traditional channels, you\'re leaving money on the table. The brands winning in 2025 are the ones who understand that a single well-placed influencer collaboration can outperform a month of paid social ads.' },
      { type: 'text', value: 'The question isn\'t whether influencer marketing works. The question is whether you can afford to ignore it.' },
      { type: 'cta', value: 'Ready to leverage influencer marketing for your brand? Book a consultation.' },
    ],
  },
  'roi-of-influencer-marketing-vs-traditional-ads': {
    title: 'Influencer Marketing ROI: 11x Returns vs. Traditional Advertising',
    category: 'Data',
    readTime: '5 min read',
    date: 'May 18, 2025',
    author: 'Influence Models Agency',
    image: '/images/Des/des-3.jpg',
    content: [
      { type: 'text', value: 'Every dollar spent on influencer marketing generates an average of $5.78 in earned media value. For top-performing campaigns, that number climbs to $11.69. Compare that to traditional digital ads averaging $2.80 per dollar spent, and the math becomes obvious.' },
      { type: 'heading', value: 'Breaking Down the Numbers' },
      { type: 'stat', label: '$5.78', description: 'Average earned media value per $1 spent on influencer marketing' },
      { type: 'stat', label: '$2.80', description: 'Average return per $1 spent on traditional digital ads' },
      { type: 'stat', label: '92%', description: 'Of marketers believe influencer marketing is effective' },
      { type: 'text', value: 'But ROI isn\'t just about direct sales. Influencer marketing delivers compounding returns that paid ads simply can\'t match:' },
      { type: 'text', value: '**Content Longevity** — A paid ad stops generating value the moment you stop paying. An influencer\'s post continues generating organic reach, shares, and saves for months. We\'ve seen client posts from six months ago still driving bookings today.' },
      { type: 'text', value: '**Trust Transfer** — When an influencer endorses your brand, their audience\'s trust transfers to you. This is impossible to buy with traditional advertising. It takes years to build brand trust through conventional channels — an influencer partnership can establish it overnight.' },
      { type: 'text', value: '**Content Creation** — You\'re not just paying for distribution. You\'re getting professional-quality content that can be repurposed across your own channels. One influencer collaboration can yield 10-15 pieces of content for your brand.' },
      { type: 'heading', value: 'The Cost of Doing Nothing' },
      { type: 'text', value: 'Brands that haven\'t adopted influencer marketing are watching their competitors eat their market share. In beauty, fashion, fitness, food, and entertainment — the top-performing brands in every category have influencer partnerships as a core strategy.' },
      { type: 'text', value: 'The barrier to entry has never been lower. You don\'t need a Kardashian. A micro-influencer with 10K-50K engaged followers in your niche will outperform a celebrity with 10M passive followers — at a fraction of the cost.' },
      { type: 'cta', value: 'See our influencer packages starting at $100.' },
    ],
  },
  'how-miami-brands-are-winning-with-local-influencers': {
    title: 'How Miami Brands Are Winning Big With Local Influencers',
    category: 'Case Study',
    readTime: '6 min read',
    date: 'May 17, 2025',
    author: 'Influence Models Agency',
    image: '/images/Des/des-4.jpg',
    content: [
      { type: 'text', value: 'A South Beach restaurant spent $15,000 on Facebook and Instagram ads over three months. They got decent impressions, a few clicks, and maybe a handful of reservations they could directly attribute to the spend. Then they tried something different.' },
      { type: 'text', value: 'They hired three local Miami influencers for $3,000 total. Each influencer posted a reel of themselves enjoying a meal at the restaurant — genuine, unscripted, beautiful. The result? 847 reservations in two weeks, a 2,100% increase in Instagram followers, and content they repurposed for the next six months.' },
      { type: 'heading', value: 'Why Local Beats Global' },
      { type: 'text', value: 'National influencers have reach. Local influencers have relevance. When a Miami-based influencer posts about a Miami business, their audience — which over-indexes for Miami residents and visitors — sees it as a genuine local recommendation, not an ad.' },
      { type: 'stat', label: '3-5x', description: 'Higher engagement for local influencer campaigns vs. national' },
      { type: 'stat', label: '847', description: 'Reservations driven by a single local influencer campaign' },
      { type: 'stat', label: '70%', description: 'Lower cost vs. equivalent reach through paid ads' },
      { type: 'heading', value: 'Industries Crushing It With Local Influencers in Miami' },
      { type: 'text', value: '**Restaurants & Nightlife** — Visual content of food, drinks, and ambiance performs incredibly well. One reel of a beautiful model enjoying a meal at your restaurant does more than a month of paid posts. The aspirational element ("I want to be there") drives action.' },
      { type: 'text', value: '**Real Estate** — Luxury developments are using influencer lifestyle shoots to sell units. Instead of sterile property photos, they show influencers living the lifestyle the property promises. Conversion rates on these campaigns are 4x higher than traditional listings.' },
      { type: 'text', value: '**Fashion & Retail** — Miami\'s fashion scene is internationally recognized. Local boutiques and designers partnering with Miami models and influencers are seeing direct-to-consumer sales spike after every collaboration.' },
      { type: 'text', value: '**Music & Entertainment** — Artists launching music in Miami know that local model and influencer support can make or break a video\'s performance. Our talent has appeared in videos that have collectively generated over 50 million views.' },
      { type: 'heading', value: 'How to Get Started' },
      { type: 'text', value: 'You don\'t need a massive budget. Our starter packages begin at $100 for a single reel. For businesses serious about sustained growth, our monthly retainer packages provide consistent content and guaranteed reach — starting at $1,500/month.' },
      { type: 'cta', value: 'Browse our Miami talent roster and find your perfect match.' },
    ],
  },
  'ugc-vs-branded-content-what-converts-better': {
    title: 'UGC vs. Branded Content: What Actually Converts Better in 2025',
    category: 'Strategy',
    readTime: '5 min read',
    date: 'May 16, 2025',
    author: 'Influence Models Agency',
    image: '/images/Des/des-5.jpg',
    content: [
      { type: 'text', value: 'Your brand just spent $20,000 on a professional video shoot. Studio lighting, professional makeup, scripted lines, multiple takes. The result is polished, beautiful — and it gets half the engagement of a 15-second reel shot on an iPhone by one of your customers.' },
      { type: 'text', value: 'Welcome to the UGC era.' },
      { type: 'heading', value: 'The Numbers Don\'t Lie' },
      { type: 'stat', label: '4x', description: 'Higher click-through rates for UGC vs. branded content' },
      { type: 'stat', label: '2.4x', description: 'More conversions from UGC ads vs. traditional ads' },
      { type: 'stat', label: '50%', description: 'Lower cost-per-acquisition with UGC campaigns' },
      { type: 'text', value: 'User-generated content works because it doesn\'t feel like an ad. The "raw" aesthetic signals authenticity to the viewer. Their guard drops. They engage instead of scroll. They click instead of ignore.' },
      { type: 'heading', value: 'The Sweet Spot: Professional UGC' },
      { type: 'text', value: 'Here\'s what the smartest brands have figured out: you can have both quality AND authenticity. The trick is hiring professional creators who can produce content that looks organic but performs at a professional level.' },
      { type: 'text', value: 'This is exactly what our UGC & Reels service delivers. Our models and creators produce content that looks like it was spontaneously created — because they understand the platform aesthetics — but every frame is intentional, on-brand, and optimized for conversions.' },
      { type: 'text', value: 'The result? Content that performs like UGC in terms of engagement and trust, but executes your brand strategy with precision. It\'s the best of both worlds.' },
      { type: 'heading', value: 'How to Use UGC in Your Marketing Stack' },
      { type: 'text', value: '**Paid Social Ads** — Use UGC as your ad creative. Facebook and TikTok\'s algorithms reward content that keeps users on-platform, and UGC-style content has higher watch times and lower skip rates.' },
      { type: 'text', value: '**Product Pages** — Replace one of your polished product photos with UGC showing the product in real use. Conversion rates increase an average of 29%.' },
      { type: 'text', value: '**Email Marketing** — UGC in emails generates 73% higher click-through rates than branded imagery.' },
      { type: 'text', value: '**Social Proof** — Repost UGC on your own channels to show real people using and loving your product. This builds trust faster than any testimonial page.' },
      { type: 'cta', value: 'Get professional UGC content for your brand — starting at $100 per reel.' },
    ],
  },
  'music-video-models-the-secret-weapon-for-viral-videos': {
    title: 'Music Video Models: The Secret Weapon Behind Every Viral Video',
    category: 'Music',
    readTime: '8 min read',
    date: 'May 15, 2025',
    author: 'Influence Models Agency',
    image: '/images/Nadia/nadia-1.jpg',
    content: [
      { type: 'text', value: 'Every artist knows the formula: a great beat, sharp visuals, and stunning models. But what separates a music video that gets 10,000 views from one that gets 10 million? More often than you\'d think, it comes down to the talent on screen.' },
      { type: 'heading', value: 'The Model Effect on Video Performance' },
      { type: 'text', value: 'YouTube\'s algorithm prioritizes watch time and engagement. Videos with professional models see 40-60% longer average watch times — viewers literally stay to watch because the visuals are compelling. And in the first 3 seconds (the make-or-break window on social media), a striking visual featuring a professional model dramatically reduces scroll-past rates.' },
      { type: 'stat', label: '17M+', description: 'Views on a single music video featuring our talent (Chicken P)' },
      { type: 'stat', label: '40-60%', description: 'Longer watch times on videos with professional models' },
      { type: 'stat', label: '3 sec', description: 'The window to capture attention — models make the difference' },
      { type: 'heading', value: 'Our Music Video Roster' },
      { type: 'text', value: 'At Influence Models Agency, music video work is in our DNA. Our lead talent, Deseray Marie, has appeared in official music videos for Sean Paul, Bryson Tiller, DaBaby, Akon, Young Thug, and Vybz Kartel. She\'s also collaborated with Kai Cenat and appeared on Love & Hip Hop.' },
      { type: 'text', value: 'Our newest addition, Ty Nadia, brings an equally impressive resume — lead model roles in videos for Trippie Redd ("Stay The Same"), Kodak Black, and Chicken P (17M+ YouTube views). Additional credits include French Montana, Sukihana, Sexyy Red, and Cash Cobain. She\'s also a skilled contortionist and flexibility artist, adding a unique visual element that directors love.' },
      { type: 'heading', value: 'What It Costs' },
      { type: 'text', value: 'Here\'s the part that surprises most artists: professional music video models are more affordable than you think.' },
      { type: 'text', value: '**Solo Shoot ($300)** — 1 model, 4 hours on set. Perfect for music video scenes or brand visuals.' },
      { type: 'text', value: '**Duo Shoot ($550)** — 2 models, 4 hours. Great for a full music video with coordinated model shots.' },
      { type: 'text', value: '**Trio Shoot ($650)** — 3 models, 4 hours, styled production. Full music video coverage with multiple looks.' },
      { type: 'text', value: '**Full Day ($1,500+)** — 6–8 hours, multi-scene, multiple looks. The full treatment — wardrobe changes, multiple setups, behind-the-scenes content included.' },
      { type: 'text', value: 'For artists serious about their visual brand, our monthly retainer packages provide consistent model talent for ongoing content — music videos, social media, promotional shoots — starting at $1,500/month.' },
      { type: 'heading', value: 'How to Book' },
      { type: 'text', value: 'Browse our talent roster, pick the model that fits your visual direction, select your package, and book directly through our platform. We handle the logistics — you focus on the music.' },
      { type: 'cta', value: 'Browse our talent and book a music video model today.' },
    ],
  },
  'how-to-go-viral-on-tiktok-with-music': {
    title: 'How to Go Viral on TikTok With Your Music in 2025',
    category: 'Music Promo',
    readTime: '6 min read',
    date: 'Jun 8, 2025',
    author: 'Influence Models Agency',
    image: '/images/Shay/shay-1.jpg',
    content: [
      { type: 'text', value: 'TikTok has become the most powerful music discovery engine on the planet. In 2024, over 75% of TikTok users discovered new music on the platform. More songs charted on Billboard because of TikTok virality than any other platform combined. If you\'re an artist and you\'re not leveraging TikTok, you\'re leaving streams — and fans — on the table.' },
      { type: 'heading', value: 'Why TikTok Works Differently for Music' },
      { type: 'text', value: 'TikTok\'s algorithm doesn\'t care about your follower count. A brand new account can go viral on day one if the content is right. This levels the playing field for independent artists in a way Spotify and Apple Music never could. The key is getting your sound into content that people want to watch, share, and recreate.' },
      { type: 'stat', label: '75%', description: 'Of TikTok users discover new music on the platform' },
      { type: 'stat', label: '175+', description: 'Songs have charted on Billboard due to TikTok virality' },
      { type: 'stat', label: '3x', description: 'More streams for songs used in trending TikTok challenges' },
      { type: 'heading', value: 'The Viral Challenge Strategy' },
      { type: 'text', value: 'The most reliable path to TikTok virality for a song is a challenge. When multiple creators post videos using your sound in the same format, the algorithm recognizes the pattern and amplifies all of them simultaneously. Here\'s how it works:' },
      { type: 'text', value: '**Step 1: Create the seed content.** Launch the challenge with 5-10 creators posting the same dance, reaction, or POV format using your song. This creates the initial pattern the algorithm can recognize.' },
      { type: 'text', value: '**Step 2: Use attractive, high-engagement creators.** Content featuring models and influencers with strong visual presence gets saved and shared more. This signals the algorithm to push it further.' },
      { type: 'text', value: '**Step 3: Coordinate the timing.** Drop all seed content within 24-48 hours of your release. The simultaneous spike in usage triggers TikTok\'s trending detection.' },
      { type: 'text', value: '**Step 4: Sustain the momentum.** Keep adding creators over the first two weeks. Once a challenge gains traction, organic creators join in — but you need the initial push to get there.' },
      { type: 'heading', value: 'How Influence Executes This' },
      { type: 'text', value: 'At Influence Models Agency, we run coordinated TikTok challenge campaigns for artists. We assign multiple models and creators to your track, coordinate the posting schedule, and create the seed content that gives your song the best shot at algorithm pickup. Our models have combined audiences in the millions — meaning your challenge launches with real reach from day one.' },
      { type: 'text', value: 'Our Multi-Model campaigns (starting at $3,500) are specifically designed for this — 3+ creators, coordinated posting, multiple content formats, all aligned to your release date.' },
      { type: 'cta', value: 'Launch your TikTok challenge campaign — book a multi-model package.' },
    ],
  },
  'viral-challenge-marketing-guide': {
    title: 'The Complete Guide to Viral Challenge Marketing for Brands & Artists',
    category: 'Strategy',
    readTime: '8 min read',
    date: 'Jun 8, 2025',
    author: 'Influence Models Agency',
    image: '/images/Nya/nya-1.jpg',
    content: [
      { type: 'text', value: 'A well-executed viral challenge is the single most cost-effective marketing tactic available to brands and artists today. The Ice Bucket Challenge raised $115 million. The #MannequinChallenge reached 600 million views. The #InMyFeelings challenge turned a Drake song into a global phenomenon overnight. And they all started the same way: one great hook, a handful of seed creators, and perfect timing.' },
      { type: 'heading', value: 'What Makes a Challenge Go Viral' },
      { type: 'text', value: 'The anatomy of a viral challenge has four essential components: a simple, repeatable action; a clear trigger (usually a sound or visual cue); aspirational or entertaining seed content; and enough initial momentum to trip the algorithm. Miss any one of these, and the challenge dies before it starts.' },
      { type: 'stat', label: '600M+', description: 'Views generated by the #MannequinChallenge' },
      { type: 'stat', label: '10x', description: 'More user-generated content when a challenge has strong seed creators' },
      { type: 'stat', label: '48hrs', description: 'The critical window to build momentum after launching a challenge' },
      { type: 'heading', value: 'Challenges for Music Artists' },
      { type: 'text', value: 'For music artists, challenges work best when tied to a specific moment in your track — a drop, a hook, a lyric that lends itself to a specific motion or reaction. The #RunItUp challenge format (model reacting to a beat drop) has driven streams for countless indie artists. The key is having attractive, high-engagement creators as your first wave.' },
      { type: 'text', value: 'A successful music challenge campaign looks like this: 5 creators post the same format using your track within 48 hours of your drop. Each video gets 10K-50K views. The algorithm detects the pattern. Organic creators start joining. Your song trends. Streams spike 300-500% in the first week.' },
      { type: 'heading', value: 'Challenges for Brands' },
      { type: 'text', value: 'For brands, challenges create something paid advertising never can: organic, authentic user-generated content at scale. When consumers create content featuring your brand, they\'re simultaneously marketing to their followers and signaling personal affinity — which is worth more than any ad impression.' },
      { type: 'text', value: 'The best brand challenges have a simple mechanic tied to the product. A food brand might do a "first bite" reaction challenge. A clothing brand might do an "outfit reveal" format. A tech brand might do an "unboxing reaction." The simpler the format, the more people participate.' },
      { type: 'heading', value: 'How to Launch One With Influence' },
      { type: 'text', value: 'Our Viral Challenge package pairs your brand or track with multiple models and creators who launch the seed content simultaneously. We handle creative direction, timing, and coordination — you provide the product or track. This is the fastest, most reliable way to trigger organic challenge participation from real creators.' },
      { type: 'cta', value: 'Ready to launch your viral challenge? Book a multi-model campaign.' },
    ],
  },
  'best-ways-to-promote-your-song-on-instagram': {
    title: 'The 7 Best Ways to Promote Your Song on Instagram in 2025',
    category: 'Music Promo',
    readTime: '5 min read',
    date: 'Jun 8, 2025',
    author: 'Influence Models Agency',
    image: '/images/Kady/kady-1.jpg',
    content: [
      { type: 'text', value: 'Instagram is the second-largest music discovery platform after TikTok — and for many genres (R&B, hip-hop, dancehall, reggaeton), it\'s still number one. With 2 billion monthly active users and Reels now averaging 200 billion plays per day, the reach potential for a well-promoted song is massive. Here are the 7 most effective tactics working right now.' },
      { type: 'heading', value: '1. Song Reaction Videos' },
      { type: 'text', value: 'Genuine first-listen reaction videos are the highest-converting format for music promotion on Instagram. When a real person — especially an attractive model or influencer — hears your song for the first time and their reaction is authentic, viewers are compelled to listen to find out what\'s generating that reaction. These videos consistently outperform every other music promo format on the platform.' },
      { type: 'heading', value: '2. Coordinated Reel Drops' },
      { type: 'text', value: 'Dropping 3-5 Reels featuring your song within 24 hours tells Instagram\'s algorithm that your track is trending. This coordinated push gets your sound placed in the Reels audio discovery section — where users can find and use your track in their own content.' },
      { type: 'heading', value: '3. Story Takeovers' },
      { type: 'text', value: 'Having influencers post your song in their Stories — especially with a swipe-up or music sticker — creates direct discovery for their followers. Stories feel more personal and less like ads, which means higher trust and conversion.' },
      { type: 'heading', value: '4. Behind-the-Scenes Content' },
      { type: 'text', value: 'Showing models or influencers reacting to your music in casual, unscripted settings performs exceptionally well. A model listening to your track while getting ready, or in the car with a genuine reaction, feels real — and real content converts.' },
      { type: 'heading', value: '5. Trending Audio Strategy' },
      { type: 'text', value: 'When multiple creators use your track as the audio in their Reels, Instagram promotes it in the audio discovery section. Getting 10+ creators to use your track in the first week can push it into trending audio status — generating organic usage from thousands of other creators.' },
      { type: 'heading', value: '6. Livestream Reactions' },
      { type: 'text', value: 'Live reactions to your album or EP — streamed from a model or influencer\'s account — generate real-time engagement and comments that Instagram\'s algorithm loves. These can reach audiences of 5K-50K depending on the creator\'s following.' },
      { type: 'heading', value: '7. Multi-Model Campaigns' },
      { type: 'text', value: 'The most powerful promotion strategy combines all of the above: multiple models posting reactions, Reels, and Stories in a coordinated window around your release. This creates the perception of widespread buzz, triggers the algorithm, and generates genuine organic momentum. It\'s how independent artists compete with major label release rollouts.' },
      { type: 'stat', label: '200B', description: 'Instagram Reels plays per day — the opportunity is massive' },
      { type: 'stat', label: '3-5x', description: 'More streams when a release has coordinated influencer support' },
      { type: 'cta', value: 'Promote your next release with our music reaction packages — from $300.' },
    ],
  },
};

export default function ArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const article = articles[slug];

  if (!article) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Article not found</h1>
          <Link href="/blog" className="text-sm" style={{ color: gold }}>← Back to Journal</Link>
        </div>
      </div>
    );
  }

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
              <Link href="/blog" className="text-white/55 hover:text-white transition-colors duration-300 text-[11px] tracking-widest uppercase" style={{ color: gold }}>Journal</Link>
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

      <article className="pt-28 pb-20">
        {/* Hero Image */}
        <div className="relative h-64 md:h-96 w-full mb-10">
          <Image src={article.image} alt={article.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent" />
          <div className="absolute bottom-6 left-6 md:left-14">
            <Link href="/blog" className="text-white/40 text-xs hover:text-white transition-colors flex items-center gap-1 mb-3">
              <ArrowLeft className="w-3 h-3" /> Back to Journal
            </Link>
          </div>
        </div>

        {/* Article Header */}
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-5">
            <span className="px-3 py-1 text-[9px] font-bold tracking-widest uppercase border" style={{ borderColor: gold, color: gold }}>{article.category}</span>
            <span className="text-white/30 text-xs flex items-center gap-1"><Clock className="w-3 h-3" />{article.readTime}</span>
            <span className="text-white/20 text-xs">{article.date}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">{article.title}</h1>
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-6 mb-10">
            <span className="text-white/30 text-sm">By {article.author}</span>
          </div>

          {/* Article Body */}
          <div className="space-y-6">
            {article.content.map((block: any, i: number) => {
              switch (block.type) {
                case 'heading':
                  return <h2 key={i} className="text-xl md:text-2xl font-bold text-white mt-10 mb-2">{block.value}</h2>;
                case 'text':
                  return <p key={i} className="text-white/50 text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: block.value.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white/80">$1</strong>') }} />;
                case 'stat':
                  return (
                    <div key={i} className="border-l-2 pl-6 py-3 my-4" style={{ borderColor: gold }}>
                      <p className="text-3xl font-bold mb-1" style={{ color: gold }}>{block.label}</p>
                      <p className="text-white/40 text-sm">{block.description}</p>
                    </div>
                  );
                case 'cta':
                  return (
                    <div key={i} className="mt-12 p-8 border border-white/[0.06] text-center">
                      <p className="text-white/60 text-base mb-5">{block.value}</p>
                      <Link href="/book" className="inline-block px-8 py-4 text-[11px] font-bold tracking-widest uppercase hover:opacity-90 transition-all" style={{ backgroundColor: gold, color: '#000' }}>
                        Book Now
                      </Link>
                    </div>
                  );
                default:
                  return null;
              }
            })}
          </div>
        </div>
      </article>
    </div>
  );
}
