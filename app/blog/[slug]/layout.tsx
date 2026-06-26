import type { Metadata } from 'next';

const BASE = 'https://influencemodels.agency';

const meta: Record<string, { title: string; description: string; date: string; image: string }> = {
  'why-influencer-marketing-is-dominating-2025': { title: 'Why Influencer Marketing Is Dominating 2025', description: 'The influencer marketing industry hits $32.5B in 2025. Why brands shift budgets and how Miami influencers deliver 11x ROI.', date: '2025-05-19', image: '/images/Des/des-2.jpg' },
  'roi-of-influencer-marketing-vs-traditional-ads': { title: 'Influencer Marketing ROI: 11x Returns vs. Traditional Advertising', description: 'Every $1 on influencer marketing yields $5.78 in earned media value. Data-driven breakdown vs. paid ads.', date: '2025-05-18', image: '/images/Des/des-3.jpg' },
  'how-miami-brands-are-winning-with-local-influencers': { title: 'How Miami Brands Are Winning With Local Influencers', description: 'A Miami restaurant got 847 reservations from a $3,000 local influencer campaign. Case studies for South Florida brands.', date: '2025-05-17', image: '/images/Des/des-4.jpg' },
  'ugc-vs-branded-content-what-converts-better': { title: 'UGC vs. Branded Content: What Converts Better in 2025', description: 'UGC delivers 4x higher CTR and 2.4x more conversions than branded content. Strategy guide for brands.', date: '2025-05-16', image: '/images/Des/des-5.jpg' },
  'music-video-models-the-secret-weapon-for-viral-videos': { title: 'Music Video Models: The Secret Weapon Behind Every Viral Video', description: 'Professional models increase watch time 40-60% on music videos. How South Florida model casting drives views.', date: '2025-05-15', image: '/images/Nadia/nadia-1.jpg' },
  'how-to-go-viral-on-tiktok-with-music': { title: 'How to Go Viral on TikTok With Your Music in 2025', description: '75% of TikTok users discover new music on the platform. Step-by-step influencer campaign guide.', date: '2025-06-08', image: '/images/Shay/shay-1.jpg' },
  'viral-challenge-marketing-guide': { title: 'The Complete Guide to Viral Challenge Marketing', description: 'How to engineer viral challenge campaigns. Strategy, timing, and seed creator selection.', date: '2025-06-08', image: '/images/Nya/nya-1.jpg' },
  'best-ways-to-promote-your-song-on-instagram': { title: 'The 7 Best Ways to Promote Your Song on Instagram in 2025', description: 'Instagram Reels see 200B plays/day. The 7 most effective tactics for music promotion.', date: '2025-06-08', image: '/images/Kady/kady-1.jpg' },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = meta[slug];
  if (!a) return {};
  return {
    title: `${a.title} | Influence Journal`,
    description: a.description,
    openGraph: { title: a.title, description: a.description, url: `${BASE}/blog/${slug}`, type: 'article', publishedTime: a.date, authors: ['Influence Models Agency'], images: [{ url: `${BASE}${a.image}`, width: 1200, height: 630 }] },
    alternates: { canonical: `${BASE}/blog/${slug}` },
  };
}

export default function ArticleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
