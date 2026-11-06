import { MetadataRoute } from 'next';

/**
 * Indexable URLs that exist as pages on this branch.
 * Omitted: redirect-only routes, /lp doorway pages (noindex), admin and checkout
 * receipts, and URLs with no page (including the four legacy sitemap 404s).
 * lastmod stays 2026-06-28 except routes whose visible copy changed on 2026-11-06.
 */
const ORIGIN = 'https://influencecreators.marketing';

type Entry = {
  route: string;
  priority: number;
  changeFrequency: 'weekly' | 'monthly' | 'yearly';
  lastModified: string;
};

const routes: Entry[] = [
  { route: '', priority: 1.0, changeFrequency: 'weekly', lastModified: '2026-11-06' },
  { route: '/about', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/actress-models-miami', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/admin/outreach', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/blog', priority: 0.8, changeFrequency: 'weekly', lastModified: '2026-06-28' },
  { route: '/book-models-miami', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/casting-agency-miami', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/contact', priority: 0.6, changeFrequency: 'monthly', lastModified: '2026-11-06' },
  { route: '/event-models-miami', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/event-talent', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/faq', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/for-fashion-brands', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/hire-influencer-miami', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/influencer-campaigns', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/influencer-marketing-agency-miami', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/influencer-marketing-boca-raton', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/influencer-marketing-fort-lauderdale', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/influencer-marketing-miami', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/instagram-models-for-hire', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/join', priority: 0.5, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/label-campaigns', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/marketplace', priority: 0.9, changeFrequency: 'weekly', lastModified: '2026-06-28' },
  { route: '/model-booking', priority: 0.8, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/models-for-photoshoot', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/models-for-shoots', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/music-video-booking', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/music-video-models', priority: 0.85, changeFrequency: 'monthly', lastModified: '2026-11-06' },
  { route: '/quote', priority: 0.5, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/services', priority: 0.9, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/services/business', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/services/commercials', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/services/content', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/services/events', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/services/shoots', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/shop', priority: 0.4, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/start', priority: 0.8, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/terms', priority: 0.3, changeFrequency: 'yearly', lastModified: '2026-06-28' },
  { route: '/ugc-content', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/ugc-creators-florida', priority: 0.85, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/ugc-creators-miami', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/voiceover-talent-miami', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/blog/why-influencer-marketing-is-dominating-2025', priority: 0.6, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/blog/roi-of-influencer-marketing-vs-traditional-ads', priority: 0.6, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/blog/how-miami-brands-are-winning-with-local-influencers', priority: 0.6, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/blog/ugc-vs-branded-content-what-converts-better', priority: 0.6, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/blog/music-video-models-the-secret-weapon-for-viral-videos', priority: 0.6, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/blog/how-to-go-viral-on-tiktok-with-music', priority: 0.6, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/blog/viral-challenge-marketing-guide', priority: 0.6, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/blog/best-ways-to-promote-your-song-on-instagram', priority: 0.6, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/influencer/shay-050', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/influencer/kat-051', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/influencer/nikki-052', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/influencer/ayana-053', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/influencer/des-001', priority: 0.9, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/influencer/kaylese-062', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/influencer/bianca-055', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/influencer/maria-002', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/influencer/genesis-003', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/influencer/ferrari-004', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/influencer/lexci-044', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/influencer/peach-045', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/influencer/breanna-046', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/influencer/breyanna-056', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/influencer/sandra-011', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/influencer/kady-010', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/influencer/leila-009', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/influencer/swan-008', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/influencer/hope-007', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/influencer/angelina-006', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/influencer/nysia-014', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/influencer/krystle-015', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/influencer/kendra-016', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/influencer/maelyn-017', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/influencer/yenny-018', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/influencer/gabriella-019', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/influencer/sydnie-022', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/influencer/simone-021', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/influencer/nadia-020', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/influencer/alisha-023', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/influencer/celeste-024', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/influencer/gabriela-025', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/influencer/seahra-026', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/influencer/jas-028', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/influencer/daisha-030', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/influencer/scarlet-031', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/influencer/aliyana-032', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/influencer/kiki-035', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/influencer/amanda-037', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/influencer/nella-039', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/influencer/malibu-040', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/influencer/bree-041', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/influencer/nya-042', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/influencer/ashley-morris-043', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/influencer/ashley-mar-044', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/influencer/endy-045', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/influencer/mika-057', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/influencer/gracejenn-058', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/influencer/ashleypena-060', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/influencer/hannah-061', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/influencer/yuli-059', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/influencer/madeline-063', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
  { route: '/influencer/thereallexciii-064', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-28' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const seen = new Set<string>();
  return routes.flatMap((item) => {
    const url = item.route ? `${ORIGIN}${item.route}` : ORIGIN;
    if (seen.has(url)) return [];
    seen.add(url);
    return [{
      url,
      lastModified: new Date(item.lastModified),
      changeFrequency: item.changeFrequency,
      priority: item.priority,
    }];
  });
}
