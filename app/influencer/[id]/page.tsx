import Link from 'next/link';
import { Instagram, Check, Film, Award, BadgeCheck, Sparkles } from 'lucide-react';
import MobileNav from '../../components/MobileNav';
import IPhoneMockup from '../../components/IPhoneMockup';
import LuxuryBrandBanner from '../../components/LuxuryBrandBanner';
import BrandLogoMarquee from '../../components/BrandLogoMarquee';
import AnimatedCounter from '../../components/AnimatedCounter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Metadata } from 'next';

// SEO metadata for Deseray Marie - helps Google Knowledge Panel
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  if (params.id === 'des-001') {
    return {
      title: 'Deseray Marie | Model, Actress, Entrepreneur & CEO | Influence Models',
      description: 'Deseray Marie is a Miami-based model, actress, entrepreneur, and CEO of Influence Models Agency. Featured in Forbes Magazine, 40M+ music video views with Sean Paul, Bryson Tiller, Kai Cenat. Film credits: Sacrifice, Spanish Fly. TV: Love & Hip Hop.',
      keywords: ['Deseray Marie', 'Dez Marie', 'Model', 'Actress', 'Entrepreneur', 'CEO', 'Influence Models Agency', 'Miami Model', 'Forbes Feature', 'Music Video Model', 'Sacrifice Film', 'Spanish Fly Film'],
      openGraph: {
        title: 'Deseray Marie | Model, Actress, Entrepreneur & CEO',
        description: 'Featured in Forbes Magazine. 40M+ music video views. Film & TV credits. CEO of Influence Models Agency.',
        images: ['https://influencemodels.agency/images/Des/des-1.jpg'],
        type: 'profile',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Deseray Marie | Model, Actress, Entrepreneur & CEO',
        description: 'Featured in Forbes Magazine. 40M+ music video views. CEO of Influence Models Agency.',
        images: ['https://influencemodels.agency/images/Des/des-1.jpg'],
      },
      alternates: {
        canonical: 'https://influencemodels.agency/influencer/des-001',
      },
    };
  }
  
  return {
    title: 'Influencer Profile | Influence Models Agency',
    description: 'Book top models and influencers for music videos, brand campaigns, and content creation.',
  };
}

const influencers: Record<string, any> = {
  'shay-050': {
    name: 'Shay',
    bio: 'Kodak Black · Vybz Kartel · Lil Baby · DJ Khaled · Moneybagg Yo · Future · NLE Choppa · Kali Uchis · TV: The Hookup (NowThatsTV)',
    avatar: '/images/Shay/shay-1.jpg',
    followers: 25000,
    rating: 5.0,
    categories: ['Music Video', 'Fashion', 'Lifestyle', 'TV'],
    ugcFormats: ['Lifestyle', 'Trend', 'Brand Feature', 'Event Content'],
    niches: ['Music', 'Fashion', 'Nightlife', 'Lifestyle'],
    instagram: '@shay',
    location: 'South Florida',
    verified: true,
    celebrityCredits: true,
    contentTypes: ['Music Video Talent', 'Fashion Modeling', 'Lifestyle Content', 'TV Appearances', 'Brand Partnerships', 'Event Hosting'],
    pastBrands: ['Kodak Black', 'Vybz Kartel', 'Lil Baby', 'DJ Khaled', 'Moneybagg Yo', 'Future', 'NLE Choppa', 'Kali Uchis'],
    featuredIn: [
      { title: 'Kodak Black', subtitle: 'Music Video', type: 'Music Video' },
      { title: 'Vybz Kartel', subtitle: 'Music Video', type: 'Music Video' },
      { title: 'Lil Baby', subtitle: 'Music Video', type: 'Music Video' },
      { title: 'DJ Khaled', subtitle: 'Music Video', type: 'Music Video' },
      { title: 'Moneybagg Yo', subtitle: 'Music Video', type: 'Music Video' },
      { title: 'Future', subtitle: 'Music Video', type: 'Music Video' },
      { title: 'NLE Choppa', subtitle: 'Music Video', type: 'Music Video' },
      { title: 'Kali Uchis', subtitle: 'Music Video', type: 'Music Video' },
      { title: 'The Hookup', subtitle: 'NowThatsTV', type: 'Television' },
    ],
    description: 'South Florida model with 25K following and major music video credits spanning hip-hop, reggae, and R&B. TV credits include "The Hookup" on NowThatsTV. Known for her high-energy presence and professional on-set work ethic. Available for music videos, brand campaigns, event hosting, and fashion shoots.',
    gallery: [
      '/images/Shay/shay-1.jpg',
      '/images/Shay/shay-2.jpg',
      '/images/Shay/shay-3.jpg',
      '/images/Shay/shay-4.jpg',
      '/images/Shay/shay-5.jpg',
    ],
  },
  'kat-051': {
    name: 'Kat',
    bio: 'Fashion & Lifestyle Model · South Florida',
    avatar: '/images/Kat/kat-1.jpg',
    followers: 10000,
    rating: 5.0,
    categories: ['Fashion', 'Lifestyle', 'Beauty'],
    ugcFormats: ['Lifestyle', 'GRWM', 'Testimonial', 'Product Review', 'Haul'],
    niches: ['Beauty', 'Fashion', 'Skincare', 'Lifestyle'],
    instagram: '@whois.kat',
    location: 'South Florida',
    contentTypes: ['Fashion Modeling', 'Lifestyle Content', 'Beauty Content', 'Brand Shoots', 'UGC Reels', 'Brand Partnerships'],
    pastBrands: [],
    description: 'South Florida-based model and content creator with a clean, fashion-forward aesthetic. Ideal for brands looking for polished lifestyle and beauty content with authentic engagement.',
    gallery: [
      '/images/Kat/kat-1.jpg',
      '/images/Kat/kat-2.jpg',
      '/images/Kat/kat-3.jpg',
      '/images/Kat/kat-4.jpg',
    ],
  },
  'nikki-052': {
    name: 'Nikki',
    bio: 'Fashion & Lifestyle Model · South Florida',
    avatar: '/images/Nikki/nikki-1.jpg',
    followers: 8600,
    rating: 5.0,
    categories: ['Fashion', 'Lifestyle', 'Beauty'],
    ugcFormats: ['Lifestyle', 'Trend', 'GRWM', 'Testimonial', 'Product Review'],
    niches: ['Fashion', 'Beauty', 'Lifestyle', 'Skincare'],
    instagram: '@nikkismok3x',
    location: 'South Florida',
    contentTypes: ['Fashion Modeling', 'Lifestyle Content', 'Beauty Content', 'Brand Shoots', 'UGC Reels', 'Brand Partnerships'],
    pastBrands: [],
    description: 'South Florida model and lifestyle creator known for striking visuals and versatile look. Strong engagement with a loyal audience. Available for brand partnerships, fashion shoots, and UGC content.',
    gallery: [
      '/images/Nikki/nikki-1.jpg',
      '/images/Nikki/nikki-2.jpg',
      '/images/Nikki/nikki-3.jpg',
    ],
  },
  'ayana-053': {
    name: 'Ayana Alvarez',
    bio: 'Fashion & Lifestyle Model · South Florida',
    avatar: '/images/Ayana/ayana-1.jpg',
    followers: 5000,
    rating: 5.0,
    categories: ['Fashion', 'Lifestyle', 'Beauty'],
    ugcFormats: ['Lifestyle', 'GRWM', 'Testimonial', 'Trend', 'Unboxing'],
    niches: ['Fashion', 'Beauty', 'Lifestyle', 'Hair Care'],
    instagram: '@ayanaa.alvaarez',
    location: 'South Florida',
    contentTypes: ['Fashion Modeling', 'Lifestyle Content', 'Beauty Content', 'Brand Shoots', 'UGC Reels', 'Brand Partnerships'],
    pastBrands: [],
    description: 'South Florida model with a fresh, editorial look and a growing social presence. Eager and professional — available for brand partnerships, fashion shoots, music videos, and on-site business content.',
    gallery: [
      '/images/Ayana/ayana-1.jpg',
      '/images/Ayana/ayana-2.jpg',
    ],
  },
  'des-001': {
    name: 'Deseray Marie',
    bio: 'Model · Actress · Entrepreneur · Influencer · CEO of Influence Models Agency · Forbes Featured · Sean Paul · Bryson Tiller · Kai Cenat · Akon · Moneybagg Yo · Lil Pump · Tekashi 6ix9ine · Bossman Dlow · Vybz Kartel · Young Thug · AMP · Love & Hip Hop · Films · Meta Billboard · 40M+ Music Video Views',
    avatar: '/images/Des/des-1.jpg',
    followers: 66000,
    rating: 5.0,
    categories: ['Music Video', 'Commercial', 'Fashion', 'Film', 'TV', 'Entrepreneurship', 'Beauty', 'Luxury'],
    instagram: '@itsdezmarie',
    ugcFormats: ['Testimonial', 'Brand Feature', 'GRWM', 'Lifestyle', 'Product Launch', 'Unboxing', 'Talking Head'],
    niches: ['Beauty', 'Fashion', 'Luxury', 'Hair Care', 'Skincare', 'Music', 'Commercial'],
    location: 'Miami, FL',
    verified: true,
    celebrityCredits: true,
    stats: [
      { value: '7', label: 'Years Modeling' },
      { value: '20+', label: 'Magazines' },
      { value: '10+', label: 'Fashion Shows' },
      { value: '4', label: 'Countries' },
    ],
    contentTypes: [
      'Music Video Talent',
      'National Commercials',
      'Fashion Show Runway',
      'Editorial Modeling',
      'Celebrity Collaborations',
      'Beauty Campaigns',
      'Billboard Advertising',
      'Brand Partnerships',
    ],
    pastBrands: ['Forbes', 'Fenty Beauty', 'SavageXFenty', 'Meta Ray-Ban', 'DezBeauty', 'Iridium Clothing', 'Elite 6 Makeup', 'Fashion Nova', 'PrettyLittleThing', 'SHEIN', 'Moneybagg Yo', 'Lil Pump', 'Tekashi 6ix9ine', 'Bossman Dlow'],
    featuredIn: [
      { title: 'Forbes Magazine', subtitle: 'Fragrance Brand Feature', type: 'Press' },
      { title: 'Mike Tyson Commercial', subtitle: 'Playing a Reporter · 2026', type: 'Commercial' },
      { title: 'Fenty Beauty', subtitle: 'Brand Feature', type: 'Beauty' },
      { title: 'Sean Paul', subtitle: 'Official Music Video', type: 'Music Video' },
      { title: 'Bryson Tiller', subtitle: 'Official Music Video', type: 'Music Video' },
      { title: 'DaBaby', subtitle: 'Official Music Video', type: 'Music Video' },
      { title: 'Akon', subtitle: 'Music Video / Collaboration', type: 'Music Video' },
      { title: 'Shaggy', subtitle: 'Music Video / Collaboration', type: 'Music Video' },
      { title: 'Young Thug', subtitle: 'Music Video / Collaboration', type: 'Music Video' },
      { title: 'Vybz Kartel', subtitle: 'Music Video / Collaboration', type: 'Music Video' },
      { title: 'Kai Cenat', subtitle: 'Collaboration · AMP', type: 'Celebrity' },
      { title: 'Plaqueboymax', subtitle: 'Collaboration', type: 'Celebrity' },
      { title: 'Lil Pump', subtitle: 'Official Music Video', type: 'Music Video' },
      { title: 'Tekashi 6ix9ine', subtitle: 'Official Music Video', type: 'Music Video' },
      { title: 'Bossman Dlow', subtitle: 'Official Music Video', type: 'Music Video' },
      { title: 'Moneybagg Yo', subtitle: 'Official Music Video', type: 'Music Video' },
      { title: 'Lucci', subtitle: 'Music Video / Collaboration', type: 'Music Video' },
      { title: 'Hurricane Wisdom', subtitle: 'Music Video / Collaboration', type: 'Music Video' },
      { title: 'SavageXFenty', subtitle: 'Campaign Model', type: 'Fashion' },
      { title: 'Tyra Banks', subtitle: 'Public Shoutout · Debut Shoot', type: 'Celebrity Feature' },
      { title: 'Keke Palmer', subtitle: 'Collaboration', type: 'Celebrity' },
      { title: 'Love & Hip Hop', subtitle: 'TV Appearance', type: 'Television' },
      { title: 'Sacrifice', subtitle: 'Film Role', type: 'Film' },
      { title: 'Spanish Fly', subtitle: 'Film Role', type: 'Film' },
      { title: 'Miami Swim Week', subtitle: 'Body Painted Runway', type: 'Fashion Show' },
      { title: 'Iridium Clothing', subtitle: 'Fashion Show Runway', type: 'Fashion Show' },
      { title: 'Kisssmoothes', subtitle: 'Miami Fashion Week', type: 'Fashion Show' },
      { title: 'Meta Ray-Ban Glasses', subtitle: 'National Billboard Campaign', type: 'Advertising' },
      { title: 'Kava', subtitle: 'National Commercial', type: 'Commercial' },
      { title: 'Elite 6 Makeup', subtitle: 'Brand Promo', type: 'Beauty' },
    ],
    travelHistory: ['United States', 'London', 'Mexico', 'Greece'],
    description: 'Deseray Marie is a Miami-based model, actress, entrepreneur, and CEO of Influence Models Agency. With 7 years of professional modeling experience, she has been published in 20+ magazines and walked 10+ fashion shows across four countries (US, London, Mexico, Greece). She has been featured in Forbes Magazine for her fragrance brand and modeled for Fenty Beauty, SavageXFenty, and national Meta Ray-Ban Glasses billboards. As an actress, she has appeared in films including "Sacrifice" and "Spanish Fly" and on TV\'s Love & Hip Hop. Her music video credits include Sean Paul, Bryson Tiller, DaBaby, Akon, Shaggy, Young Thug, Vybz Kartel, and many more with over 40 million combined views. Celebrity collaborations include Kai Cenat, Mike Tyson, Tyra Banks, and Keke Palmer. As an entrepreneur, she founded and operates Influence Models Agency, the premier talent agency in South Florida.',
    gallery: [
      '/images/Des/des-21.jpg',
      '/images/Des/des-1.jpg',
      '/images/Des/des-2.jpg',
      '/images/Des/des-3.jpg',
      '/images/Des/des-4.jpg',
      '/images/Des/des-5.jpg',
    ],
  },
  'kaylese-062': {
    name: 'Kaylese "Redd" John-Brown',
    bio: 'Model · Actress · Voiceover · Public Speaker · Hair & Beauty · Lifestyle · Commercial Content',
    avatar: '/images/Kaylese/kaylese-1.jpg',
    followers: 4242,
    rating: 5.0,
    categories: ['Fashion', 'Lifestyle', 'Beauty', 'Commercial', 'Voiceover', 'Acting'],
    instagram: '@lifeofreddofficial',
    ugcFormats: ['Testimonial', 'Talking Head', 'Voiceover', 'Lifestyle', 'Before & After', 'GRWM'],
    niches: ['Hair Care', 'Beauty', 'Lifestyle', 'Commercial', 'Wellness'],
    location: 'South Florida',
    contentTypes: ['Fashion Modeling', 'Lifestyle Content', 'Hair & Beauty Campaigns', 'Commercial-Style Content', 'Voiceover Work', 'Brand Campaigns', 'Public Speaking', 'Hosting'],
    pastBrands: [],
    description: 'Kaylese "Redd" John-Brown is a South Florida model, actress, and voiceover talent with a strong personality and natural on-camera presence. She is comfortable with public speaking, brand campaigns, commercial-style content, voiceover work, and hair, beauty, and lifestyle modeling. She is especially interested in projects that align with a positive, professional image and is open to acting roles, promotional videos, hosting, interviews, podcasts, and event appearances.',
    gallery: [
      '/images/Kaylese/kaylese-1.jpg',
      '/images/Kaylese/kaylese-2.jpg',
      '/images/Kaylese/kaylese-3.jpg',
    ],
  },
  'bianca-055': {
    name: 'Bianca Bonnie',
    bio: 'Love & Hip Hop · 1.3M Followers · TV Personality · Celebrity Model',
    avatar: '/images/Bianca/bianca-1.jpg',
    followers: 1300000,
    rating: 5.0,
    categories: ['TV', 'Fashion', 'Lifestyle', 'Music Video'],
    instagram: '@biancaisking',
    ugcFormats: ['Lifestyle', 'Brand Feature', 'Testimonial', 'Trend'],
    niches: ['Fashion', 'Lifestyle', 'Nightlife', 'Music'],
    location: 'Miami, FL',
    verified: true,
    celebrityCredits: true,
    contentTypes: ['TV Personality', 'Fashion Modeling', 'Celebrity Events', 'Brand Partnerships', 'Music Videos', 'Reels & Stories'],
    pastBrands: ['Love & Hip Hop', 'VH1'],
    featuredIn: [
      { title: 'Love & Hip Hop', subtitle: 'VH1 TV Series', type: 'Television' },
    ],
    description: 'Miami-based TV personality and model with 1.3 million followers. Known for Love & Hip Hop on VH1. Available for celebrity events, brand partnerships, fashion shoots, and high-profile campaigns.',
    gallery: [
      '/images/Bianca/bianca-1.jpg',
      '/images/Bianca/bianca-2.jpg',
      '/images/Bianca/bianca-3.jpg',
    ],
  },
  'maria-002': {
    name: 'Maria',
    bio: 'Lifestyle & Fashion Influencer',
    avatar: '/images/Maria/maria-1.jpg',
    followers: 13900,
    rating: 5.0,
    categories: ['Lifestyle', 'Fashion', 'Beauty'],
    instagram: '@mmermar19',
    ugcFormats: ['Lifestyle', 'GRWM', 'Haul', 'Testimonial', 'Trend', 'Product Review'],
    niches: ['Fashion', 'Beauty', 'Lifestyle', 'Skincare'],
    location: 'USA',
    contentTypes: ['Fashion Content', 'Lifestyle Posts', 'Beauty Content', 'Brand Partnerships', 'Product Reviews', 'Reels & Stories'],
    pastBrands: [],
    description: 'Rising lifestyle and fashion influencer with a loyal, highly engaged audience. Known for authentic, high-quality content that resonates with followers and converts for partner brands.',
    gallery: [
      '/images/Maria/maria-1.jpg',
      '/images/Maria/maria-2.jpg',
      '/images/Maria/maria-3.jpg',
    ],
  },
  'genesis-003': {
    name: 'Genesis Bravo',
    bio: 'Fashion & Lifestyle Influencer',
    avatar: '/images/GenesisBravo/genesis-1.jpg',
    followers: 13900,
    rating: 5.0,
    categories: ['Fashion', 'Lifestyle', 'Beauty'],
    instagram: '@genesis.bravoo',
    ugcFormats: ['Lifestyle', 'GRWM', 'Haul', 'Trend', 'Testimonial', 'Unboxing'],
    niches: ['Fashion', 'Beauty', 'Lifestyle', 'Skincare'],
    location: 'USA',
    contentTypes: ['Fashion Content', 'Lifestyle Posts', 'Beauty Content', 'Brand Partnerships', 'Product Reviews', 'Reels & Stories'],
    pastBrands: [],
    description: 'Fashion-forward content influencer delivering elevated lifestyle content with a distinct point of view. Engaged community and consistent on-brand aesthetics make her a strong partner for fashion and lifestyle launches.',
    gallery: [
      '/images/GenesisBravo/genesis-1.jpg',
      '/images/GenesisBravo/genesis-2.jpg',
      '/images/GenesisBravo/genesis-3.jpg',
    ],
  },
  'ferrari-004': {
    name: 'Ferrari',
    bio: 'Lifestyle & Fashion Influencer',
    avatar: '/images/Ferrari/ferrari-1.jpg',
    followers: 2000,
    rating: 5.0,
    categories: ['Lifestyle', 'Fashion'],
    instagram: '@ferrarii_red',
    ugcFormats: ['Lifestyle', 'Trend', 'Testimonial', 'Product Review'],
    niches: ['Fashion', 'Lifestyle'],
    location: 'USA',
    contentTypes: ['Lifestyle Content', 'Fashion Posts', 'Brand Partnerships', 'Product Reviews', 'Reels & Stories'],
    pastBrands: [],
    description: 'Emerging lifestyle and fashion influencer building a tight-knit, high-trust audience. Ideal for brands looking for authentic, niche content with strong influencer-to-audience connection.',
    gallery: [
      '/images/Ferrari/ferrari-1.jpg',
      '/images/Ferrari/ferrari-2.jpg',
      '/images/Ferrari/ferrari-3.jpg',
    ],
  },
  'lexi-044': {
    name: 'Lexi',
    bio: 'Model · Lifestyle · Fashion',
    avatar: '/images/Lexi/lexi-1.jpg',
    followers: 4800,
    rating: 5.0,
    categories: ['Fashion', 'Lifestyle', 'Beauty'],
    instagram: '@im__herr__',
    ugcFormats: ['Lifestyle', 'GRWM', 'Testimonial', 'Trend', 'Brand Feature'],
    niches: ['Fashion', 'Beauty', 'Lifestyle'],
    location: 'Miami, FL',
    contentTypes: ['Fashion Modeling', 'Lifestyle Content', 'Beauty Content', 'Brand Shoots', 'Editorial'],
    pastBrands: [],
    description: 'Miami-based model specializing in fashion, lifestyle, and beauty content. Available for brand partnerships, editorial shoots, and modeling campaigns.',
    gallery: [
      '/images/Lexi/lexi-1.jpg',
      '/images/Lexi/lexi-2.jpg',
      '/images/Lexi/lexi-3.jpg',
    ],
  },
  'peach-045': {
    name: 'Peach',
    bio: 'Model · 23K · Buju Banton · Vybz Kartel · Peacock - Couple to Trouple',
    avatar: '/images/Peach/peach-1.jpg',
    followers: 23000,
    rating: 5.0,
    categories: ['Music Video', 'Fashion', 'Lifestyle'],
    instagram: '@peach',
    ugcFormats: ['Lifestyle', 'Trend', 'Brand Feature', 'Event Content'],
    niches: ['Music', 'Fashion', 'Lifestyle', 'Nightlife'],
    location: 'Miami, FL',
    contentTypes: ['Music Video Talent', 'Fashion Modeling', 'Lifestyle Content', 'Brand Partnerships', 'Reels & Stories'],
    pastBrands: ['Buju Banton', 'Vybz Kartel', 'Peacock Network'],
    featuredIn: [
      { title: 'Buju Banton', subtitle: 'Music Video', type: 'Music Video' },
      { title: 'Vybz Kartel', subtitle: 'Music Video', type: 'Music Video' },
      { title: 'Peacock', subtitle: 'Couple to Trouple', type: 'TV' },
    ],
    description: 'Miami-based model with 23K following. Featured in music videos for Buju Banton and Vybz Kartel. Also appeared on Peacock Network\'s "Couple to Trouple". Available for music videos, fashion shoots, and brand partnerships.',
    gallery: [
      '/images/Peach/peach-1.jpg',
      '/images/Peach/peach-2.jpg',
      '/images/Peach/peach-3.jpg',
    ],
  },
  'breanna-046': {
    name: 'Breanna Banks',
    bio: 'Model · 45K · Celeb Features · Music Videos',
    avatar: '/images/Bree/bree-1.jpg',
    followers: 45000,
    rating: 5.0,
    categories: ['Music Video', 'Fashion', 'Lifestyle'],
    instagram: '@bbreannabankss',
    ugcFormats: ['Lifestyle', 'Trend', 'Testimonial', 'Brand Feature'],
    niches: ['Music', 'Fashion', 'Lifestyle', 'Nightlife'],
    location: 'Miami, FL',
    contentTypes: ['Music Video Talent', 'Fashion Modeling', 'Lifestyle Content', 'Brand Partnerships', 'Reels & Stories'],
    pastBrands: [],
    description: 'Miami-based model with 45K following and celebrity feature credits. Experienced in music videos and brand content. Available for high-profile campaigns, music videos, and brand partnerships.',
    gallery: [
      '/images/Bree/bree-1.jpg',
      '/images/Bree/bree-2.jpg',
      '/images/Bree/bree-3.jpg',
    ],
  },
  'breyanna-056': {
    name: 'Breyanna',
    bio: 'Model · 5K · Fashion · Lifestyle · Miami',
    avatar: '/images/Breyanna/breyanna-1.jpg',
    followers: 5000,
    rating: 5.0,
    categories: ['Fashion', 'Lifestyle', 'Beauty'],
    instagram: '@its.breyyy',
    ugcFormats: ['Lifestyle', 'GRWM', 'Trend', 'Testimonial'],
    niches: ['Fashion', 'Beauty', 'Lifestyle'],
    location: 'Miami, FL',
    contentTypes: ['Fashion Modeling', 'Lifestyle Content', 'Brand Partnerships', 'Reels & Stories'],
    pastBrands: [],
    description: 'Miami-based model available for fashion shoots, brand partnerships, and lifestyle content creation.',
    gallery: [
      '/images/Breyanna/breyanna-1.jpg',
      '/images/Breyanna/breyanna-2.jpg',
      '/images/Breyanna/breyanna-3.jpg',
      '/images/Breyanna/breyanna-4.jpg',
      '/images/Breyanna/breyanna-5.jpg',
    ],
  },
  'sandra-011': {
    name: 'Sandra',
    bio: 'Lifestyle & Fashion Influencer · Miami, FL',
    avatar: '/images/Sandra/sandra-1.jpg',
    followers: 10000,
    rating: 5.0,
    categories: ['Lifestyle', 'Fashion', 'Beauty'],
    instagram: '@CaribbeanBluee',
    ugcFormats: ['Lifestyle', 'GRWM', 'Testimonial', 'Trend', 'Product Review'],
    niches: ['Fashion', 'Beauty', 'Lifestyle', 'Food & Beverage'],
    location: 'Miami, FL',
    contentTypes: ['Fashion Content', 'Lifestyle Posts', 'Beauty Content', 'Brand Partnerships', 'Product Reviews', 'Reels & Stories'],
    pastBrands: [],
    description: 'Miami-based lifestyle and fashion influencer bringing Caribbean-inspired energy and vibrant aesthetics to every campaign. A versatile creator with a warm, authentic presence that resonates strongly with diverse audiences across fashion, beauty, and lifestyle niches.',
    gallery: [
      '/images/Sandra/sandra-1.jpg',
      '/images/Sandra/sandra-2.jpg',
      '/images/Sandra/sandra-3.jpg',
    ],
  },
  'kady-010': {
    name: 'Kady',
    bio: 'Tekashi 6ix9ine · Lil Pump · Bossman Dlow · Loe Shimmy · Love & Hip Hop',
    avatar: '/images/Kady/kady-1.jpg',
    followers: 11000,
    rating: 5.0,
    categories: ['Music Video', 'Fashion', 'Lifestyle', 'Beauty'],
    instagram: '@solelykady',
    ugcFormats: ['Lifestyle', 'Trend', 'GRWM', 'Testimonial', 'Brand Feature'],
    niches: ['Music', 'Fashion', 'Beauty', 'Nightlife', 'Lifestyle'],
    location: 'Miami, FL',
    verified: true,
    celebrityCredits: true,
    stats: [
      { value: "5'5\"", label: 'Height' },
      { value: '5+', label: 'Music Videos' },
      { value: '11K', label: 'Followers' },
      { value: '1', label: 'TV Show' },
    ],
    contentTypes: ['Music Video Talent', 'Fashion Modeling', 'Lifestyle Content', 'Beauty Content', 'Brand Partnerships', 'Reels & Stories', 'Event Appearances'],
    pastBrands: ['Tekashi 6ix9ine', 'Lil Pump', 'Bossman Dlow', 'Loe Shimmy', 'Love & Hip Hop'],
    featuredIn: [
      { title: 'Tekashi 6ix9ine', subtitle: 'Official Music Video', type: 'Music Video' },
      { title: 'Lil Pump', subtitle: 'Official Music Video', type: 'Music Video' },
      { title: 'Bossman Dlow', subtitle: 'Official Music Video', type: 'Music Video' },
      { title: 'Loe Shimmy', subtitle: 'Official Music Video', type: 'Music Video' },
      { title: 'Love & Hip Hop', subtitle: 'TV Appearance', type: 'Television' },
    ],
    description: 'Miami-based model and content creator with major music video credits. Featured in official music videos for Tekashi 6ix9ine, Lil Pump, Bossman Dlow, and Loe Shimmy. Television appearances include Love & Hip Hop. At 5\'5" with a polished, versatile look, Kady is a natural fit for music videos, fashion, beauty, and lifestyle brands looking for professional talent with real industry credits.',
    gallery: [
      '/images/Kady/kady-1.jpg',
      '/images/Kady/kady-2.jpg',
      '/images/Kady/kady-3.jpg',
    ],
  },
  'leila-009': {
    name: 'Leila',
    bio: 'Lifestyle & Fashion Influencer · Miami, FL',
    avatar: '/images/Leila/leila-1.jpg',
    followers: 64000,
    rating: 5.0,
    categories: ['Lifestyle', 'Fashion', 'Fitness', 'Beauty'],
    instagram: '@leilarican',
    ugcFormats: ['Lifestyle', 'GRWM', 'Trend', 'Testimonial', 'Haul', 'Fitness'],
    niches: ['Fashion', 'Fitness & Wellness', 'Swimwear', 'Lifestyle', 'Beauty'],
    location: 'Miami, FL',
    contentTypes: ['Fashion Content', 'Lifestyle Posts', 'Fitness & Wellness', 'Brand Partnerships', 'Swimwear & Activewear', 'Reels & Stories'],
    pastBrands: [],
    description: 'Miami-based lifestyle and fashion influencer known for effortlessly blending streetwear, swimwear, and glam looks. From court-side shoots to yacht-day content, Leila brings authentic Miami energy to every brand she works with. A versatile creator with broad appeal across fashion, fitness, and lifestyle niches.',
    gallery: [
      '/images/Leila/leila-1.jpg',
      '/images/Leila/leila-2.jpg',
      '/images/Leila/leila-3.jpg',
    ],
  },
  'swan-008': {
    name: 'Swan',
    bio: 'Model & Content Creator · Miami, FL',
    avatar: '/images/Swan/swan-1.jpg',
    followers: 4800,
    rating: 5.0,
    categories: ['Fashion', 'Lifestyle', 'Content Creator'],
    instagram: '@swanduras',
    ugcFormats: ['Lifestyle', 'Trend', 'Testimonial', 'Brand Feature'],
    niches: ['Fashion', 'Music', 'Lifestyle', 'Nightlife'],
    location: 'Miami, FL',
    contentTypes: ['Fashion Modeling', 'Lifestyle Content', 'Brand Partnerships', 'Product Promotions', 'Music Video Talent', 'Reels & Stories'],
    pastBrands: [],
    description: 'Miami-based model and content creator with a bold, confident on-camera presence. Known for sharp studio work and versatile looks that translate seamlessly across fashion, music, and lifestyle campaigns. A strong pick for brands that want energy, attitude, and authentic content.',
    gallery: [
      '/images/Swan/swan-1.jpg',
      '/images/Swan/swan-2.jpg',
      '/images/Swan/swan-3.jpg',
    ],
  },
  'hope-007': {
    name: 'Hope',
    bio: 'Editorial Model & Fashion Influencer · Miami, FL',
    avatar: '/images/Hope/hope-1.jpg',
    followers: 5000,
    rating: 5.0,
    categories: ['Fashion', 'Editorial', 'Beauty', 'Lifestyle'],
    instagram: '@elizabeth.thimslick',
    ugcFormats: ['Lifestyle', 'GRWM', 'Testimonial', 'Product Review', 'Aesthetic'],
    niches: ['Fashion', 'Beauty', 'Luxury', 'Skincare'],
    location: 'Miami, FL',
    contentTypes: ['Editorial Modeling', 'Fashion Content', 'Beauty Campaigns', 'Brand Partnerships', 'Luxury Lifestyle', 'Reels & Stories'],
    pastBrands: [],
    description: 'Miami-based editorial model and fashion influencer with a striking, refined aesthetic. Her work blends high-fashion editorial with luxury lifestyle content — from pearl-adorned beauty shoots to chandelier-lit mansion sessions. A compelling choice for fashion, beauty, and luxury brands seeking elevated, magazine-worthy visuals.',
    gallery: [
      '/images/Hope/hope-1.jpg',
      '/images/Hope/hope-2.jpg',
      '/images/Hope/hope-3.jpg',
    ],
  },
  'angelina-006': {
    name: 'Angelina',
    bio: 'Fashion & Luxury Lifestyle Influencer · Miami, FL',
    avatar: '/images/Angelina/angelina-1.jpg',
    followers: 9200,
    rating: 5.0,
    categories: ['Fashion', 'Luxury', 'Lifestyle', 'Beauty'],
    instagram: '@angelinalucii',
    ugcFormats: ['Lifestyle', 'GRWM', 'Trend', 'Brand Feature', 'Aesthetic'],
    niches: ['Fashion', 'Luxury', 'Beauty', 'Nightlife', 'Lifestyle'],
    location: 'Miami, FL',
    contentTypes: ['Fashion Content', 'Luxury Lifestyle', 'Beauty Content', 'Brand Partnerships', 'Editorial Modeling', 'Reels & Stories'],
    pastBrands: [],
    description: 'Miami-based fashion and luxury lifestyle influencer with a striking editorial presence. Known for high-end aesthetic content shot across Miami\'s most iconic settings. A natural fit for luxury fashion, beauty, and nightlife brands looking for aspirational, high-converting content.',
    gallery: [
      '/images/Angelina/angelina-1.jpg',
      '/images/Angelina/angelina-2.jpg',
      '/images/Angelina/angelina-3.jpg',
    ],
  },
  'christina-012': {
    name: 'Christina Rose',
    bio: 'Model & Influencer · Crystal River, FL',
    avatar: '/images/Christina/christina-1.jpg',
    followers: 10000,
    rating: 5.0,
    categories: ['Fashion', 'Lifestyle', 'Beauty'],
    instagram: '@isthatchristinarose',
    ugcFormats: ['Lifestyle', 'GRWM', 'Testimonial', 'Product Review', 'Trend'],
    niches: ['Fashion', 'Beauty', 'Lifestyle', 'Skincare'],
    location: 'Crystal River, FL',
    contentTypes: ['Fashion Modeling', 'Lifestyle Content', 'Beauty Content', 'Brand Partnerships', 'Editorial Modeling', 'Reels & Stories'],
    pastBrands: [],
    description: 'Florida-based model and influencer with a natural, editorial look. Christina brings a polished presence to every shoot — versatile across fashion, beauty, and lifestyle campaigns. Photographer: David Lagarino (@davidjeromephotography).',
    gallery: [
      '/images/Christina/christina-1.jpg',
      '/images/Christina/christina-2.jpg',
      '/images/Christina/christina-3.jpg',
      '/images/Christina/christina-4.jpg',
      '/images/Christina/christina-5.jpg',
    ],
  },
  'nysia-014': {
    name: 'Nysia',
    bio: 'Model & Content Creator · 60K',
    avatar: '/images/Nysia/nysia-1.jpg',
    followers: 60000,
    rating: 5.0,
    categories: ['Fashion', 'Lifestyle', 'Beauty'],
    instagram: '@luvvnysia',
    ugcFormats: ['Lifestyle', 'GRWM', 'Haul', 'Testimonial', 'Trend', 'Unboxing', 'Product Review'],
    niches: ['Beauty', 'Fashion', 'Hair Care', 'Lifestyle', 'Skincare'],
    location: 'Florida',
    contentTypes: ['Fashion Content', 'Lifestyle Posts', 'Beauty Content', 'Brand Partnerships', 'Reels & Stories', 'UGC'],
    pastBrands: [],
    description: 'Florida-based model and content creator with a vibrant, engaging personality. Nysia delivers high-quality visuals and authentic storytelling that resonates with her audience — ideal for beauty, fashion, and lifestyle brands.',
    gallery: [
      '/images/Nysia/nysia-1.jpg',
      '/images/Nysia/nysia-2.jpg',
      '/images/Nysia/nysia-3.jpg',
      '/images/Nysia/nysia-4.jpg',
    ],
  },
  'krystle-015': {
    name: 'Krystle',
    bio: 'Model & Fashion · Miami, FL',
    avatar: '/images/Krystle/krystle-1.jpg',
    followers: 10000,
    rating: 5.0,
    categories: ['Fashion', 'Lifestyle', 'Beauty'],
    instagram: '@krystle',
    ugcFormats: ['Lifestyle', 'GRWM', 'Trend', 'Testimonial'],
    niches: ['Fashion', 'Beauty', 'Lifestyle'],
    location: 'Miami, FL',
    contentTypes: ['Fashion Modeling', 'Lifestyle Content', 'Beauty Content', 'Brand Partnerships', 'Editorial Modeling', 'Reels & Stories'],
    pastBrands: [],
    description: 'Miami-based model with a bold, confident look and strong on-camera presence. Krystle is versatile across fashion, beauty, and lifestyle shoots — bringing energy and professionalism to every campaign.',
    gallery: [
      '/images/Krystle/krystle-1.jpg',
      '/images/Krystle/krystle-2.jpg',
      '/images/Krystle/krystle-3.jpg',
      '/images/Krystle/krystle-4.jpg',
      '/images/Krystle/krystle-5.jpg',
    ],
  },
  'kendra-016': {
    name: 'Kendra',
    bio: 'Model & Creator',
    avatar: '/images/Kendra/kendra-1.jpg',
    followers: 10000,
    rating: 5.0,
    categories: ['Fashion', 'Lifestyle', 'Beauty'],
    instagram: '@kennii.x',
    ugcFormats: ['Lifestyle', 'GRWM', 'Testimonial', 'Product Review', 'Haul'],
    niches: ['Fashion', 'Beauty', 'Lifestyle', 'Skincare'],
    location: 'Florida',
    contentTypes: ['Fashion Content', 'Lifestyle Posts', 'Beauty Content', 'Brand Partnerships', 'Product Reviews', 'Reels & Stories'],
    pastBrands: [],
    description: 'Florida-based model and creator with a polished aesthetic and natural confidence on camera. Kendra is a versatile talent for fashion, beauty, and lifestyle content — delivering clean, professional visuals every time.',
    gallery: [
      '/images/Kendra/kendra-1.jpg',
      '/images/Kendra/kendra-2.jpg',
      '/images/Kendra/kendra-3.jpg',
      '/images/Kendra/kendra-4.jpg',
    ],
  },
  'maelyn-017': {
    name: 'Maelyn Sabrina',
    bio: 'Model & Influencer · Orlando, FL',
    avatar: '/images/Maelyn/maelyn-1.jpg',
    followers: 10000,
    rating: 5.0,
    categories: ['Fashion', 'Lifestyle', 'Beauty'],
    instagram: '@_MaelynSabrina',
    ugcFormats: ['Lifestyle', 'GRWM', 'Trend', 'Testimonial', 'Unboxing', 'Haul'],
    niches: ['Fashion', 'Beauty', 'Lifestyle', 'Skincare'],
    location: 'Orlando, FL',
    contentTypes: ['Fashion Modeling', 'Lifestyle Content', 'Beauty Content', 'Brand Partnerships', 'UGC', 'Reels & Stories'],
    pastBrands: [],
    description: 'Orlando-based model and influencer active across Instagram, TikTok, and YouTube. Maelyn brings a creative, multi-platform approach to every campaign — ideal for brands looking for broad social media reach and authentic, trend-driven content.',
    gallery: [
      '/images/Maelyn/maelyn-1.jpg',
      '/images/Maelyn/maelyn-2.jpg',
      '/images/Maelyn/maelyn-3.png',
      '/images/Maelyn/maelyn-4.png',
      '/images/Maelyn/maelyn-5.png',
    ],
  },
  'yenny-018': {
    name: 'Yenny',
    bio: 'Model & Creator · Hollywood, FL',
    avatar: '/images/Yenny/yenny-1.jpg',
    followers: 10000,
    rating: 5.0,
    categories: ['Fashion', 'Lifestyle', 'Beauty'],
    instagram: '@itsmeyenny',
    ugcFormats: ['Lifestyle', 'GRWM', 'Testimonial', 'Trend', 'Product Review'],
    niches: ['Fashion', 'Beauty', 'Lifestyle', 'Food & Beverage'],
    location: 'Hollywood, FL',
    contentTypes: ['Fashion Modeling', 'Lifestyle Content', 'Beauty Content', 'Brand Partnerships', 'UGC', 'Reels & Stories'],
    pastBrands: [],
    description: 'Hollywood, FL-based model available for fashion shoots, brand campaigns, UGC content, and event appearances. Yenny brings a fresh, versatile look that works across lifestyle, beauty, and fashion verticals.',
    gallery: [
      '/images/Yenny/yenny-1.jpg',
      '/images/Yenny/yenny-2.jpg',
      '/images/Yenny/yenny-3.jpg',
      '/images/Yenny/yenny-4.jpg',
      '/images/Yenny/yenny-5.jpg',
    ],
  },
  'gabriella-019': {
    name: 'Gabriella',
    bio: 'Model · Miami, FL',
    avatar: '/images/Gabriella/gabriella-1.jpg',
    followers: 10000,
    rating: 5.0,
    categories: ['Fashion', 'Lifestyle', 'Beauty'],
    instagram: '@gabriella',
    ugcFormats: ['Lifestyle', 'GRWM', 'Trend', 'Testimonial'],
    niches: ['Fashion', 'Beauty', 'Lifestyle'],
    location: 'Miami, FL',
    contentTypes: ['Fashion Modeling', 'Lifestyle Content', 'Beauty Content', 'Brand Partnerships', 'UGC', 'Reels & Stories'],
    pastBrands: [],
    description: 'Miami-based model bringing a polished, editorial-ready look to every project. Available for fashion campaigns, brand shoots, event hosting, and content creation across all platforms.',
    gallery: [
      '/images/Gabriella/gabriella-1.jpg',
      '/images/Gabriella/gabriella-2.jpg',
      '/images/Gabriella/gabriella-3.jpg',
    ],
  },
  'sydnie-022': {
    name: 'Sydnie Beason',
    bio: 'Model & Creator · 3.8K · Florida',
    avatar: '/images/Sydnie/sydnie-1.jpg',
    followers: 3800,
    rating: 5.0,
    categories: ['Fashion', 'Lifestyle', 'Beauty'],
    instagram: '@sydnieambeason',
    ugcFormats: ['Lifestyle', 'Testimonial', 'GRWM', 'Trend'],
    niches: ['Fashion', 'Beauty', 'Lifestyle'],
    location: 'Florida',
    contentTypes: ['Fashion Modeling', 'Lifestyle Content', 'Beauty Content', 'Brand Partnerships', 'UGC', 'Reels & Stories'],
    pastBrands: [],
    description: 'Florida-based model bringing versatility and confidence to every project. Available for fashion shoots, brand campaigns, UGC content, and event appearances.',
    gallery: [
      '/images/Sydnie/sydnie-1.jpg',
      '/images/Sydnie/sydnie-2.jpg',
      '/images/Sydnie/sydnie-3.jpg',
      '/images/Sydnie/sydnie-4.jpg',
      '/images/Sydnie/sydnie-5.jpg',
    ],
  },
  'simone-021': {
    name: 'Simone',
    bio: 'Model & Creator · Florida',
    avatar: '/images/Simone/simone-1.jpg',
    followers: 10000,
    rating: 5.0,
    categories: ['Fashion', 'Lifestyle', 'Beauty'],
    instagram: '@rajthegoddess',
    ugcFormats: ['Lifestyle', 'GRWM', 'Trend', 'Testimonial'],
    niches: ['Fashion', 'Beauty', 'Lifestyle'],
    location: 'Florida',
    contentTypes: ['Fashion Modeling', 'Lifestyle Content', 'Beauty Content', 'Brand Partnerships', 'UGC', 'Reels & Stories'],
    pastBrands: [],
    description: 'Florida-based model available for fashion shoots, brand campaigns, UGC content, and event appearances. Simone brings a bold, confident energy to every project — ideal for lifestyle, beauty, and fashion brands.',
    gallery: [
      '/images/Simone/simone-1.jpg',
      '/images/Simone/simone-2.jpg',
      '/images/Simone/simone-3.jpg',
    ],
  },
  'nadia-020': {
    name: 'Ty Nadia',
    bio: 'Trippie Redd · Kodak Black · French Montana · Sexyy Red · Love & Hip Hop · Art Basel',
    avatar: '/images/Nadia/nadia-1.jpg',
    followers: 124000,
    rating: 5.0,
    categories: ['Music Video', 'Fashion', 'Runway', 'Swimwear', 'Fitness'],
    instagram: '@tynadia',
    ugcFormats: ['Lifestyle', 'Fitness', 'Trend', 'Brand Feature', 'Testimonial'],
    niches: ['Fitness & Wellness', 'Fashion', 'Swimwear', 'Music', 'Lifestyle'],
    location: 'Miami, FL',
    verified: true,
    celebrityCredits: true,
    stats: [
      { value: '17M+', label: 'Video Views' },
      { value: '10+', label: 'Music Videos' },
      { value: '2', label: 'Fashion Weeks' },
      { value: '1', label: 'TV Show' },
    ],
    contentTypes: [
      'Music Video Lead',
      'High Fashion Modeling',
      'Swimwear & Lingerie',
      'Runway Walking',
      'Fitness Modeling',
      'Commercial Work',
      'Flexibility Performance',
      'Art Shows',
    ],
    pastBrands: ['Trippie Redd', 'Kodak Black', 'Chicken P', 'French Montana', 'Sukihana', 'Sexyy Red', 'Cash Cobain', 'Freebandz', 'Iggy Azalea', 'Love & Hip Hop'],
    featuredIn: [
      { title: 'Trippie Redd', subtitle: '"Stay The Same" — Lead Model + Flexibility', type: 'Music Video' },
      { title: 'Kodak Black', subtitle: 'Official Music Video — Lead Model', type: 'Music Video' },
      { title: 'Chicken P', subtitle: 'Music Video — 17M+ YouTube Views', type: 'Music Video' },
      { title: 'French Montana', subtitle: 'Official Music Video', type: 'Music Video' },
      { title: 'Sukihana', subtitle: 'Official Music Video', type: 'Music Video' },
      { title: 'Sexyy Red', subtitle: 'Official Music Video', type: 'Music Video' },
      { title: 'Cash Cobain', subtitle: 'Official Music Video', type: 'Music Video' },
      { title: 'Freebandz', subtitle: 'Music Video', type: 'Music Video' },
      { title: 'Iggy Azalea', subtitle: 'Celebrity Collaboration', type: 'Celebrity' },
      { title: 'Love & Hip Hop', subtitle: 'TV Appearance', type: 'Television' },
      { title: 'Art Basel', subtitle: 'Fashion Show + Art Exhibition', type: 'Fashion Show' },
      { title: 'Miami Swim Week', subtitle: 'Runway Model', type: 'Fashion Show' },
    ],
    description: 'Miami-based multi-published model specializing in commercial, high fashion, swimwear, lingerie, runway and fitness modeling. Featured as lead model in music videos for Trippie Redd, Kodak Black, and Chicken P (17M+ YouTube views). Additional music video credits include French Montana, Sukihana, Sexyy Red, Cash Cobain, and Freebandz. Television appearances include Love & Hip Hop. Has worked with Iggy Azalea. Also a skilled flexibility artist and contortionist, and a painter who has participated in Art Basel events. Runway experience includes Art Basel and Miami Swim Week fashion shows.',
    gallery: [
      '/images/Nadia/nadia-1.jpg',
      '/images/Nadia/nadia-2.jpg',
      '/images/Nadia/nadia-3.jpg',
      '/images/Nadia/nadia-4.jpg',
      '/images/Nadia/nadia-5.jpg',
      '/images/Nadia/nadia-6.jpg',
      '/images/Nadia/nadia-7.jpg',
      '/images/Nadia/nadia-8.jpg',
    ],
  },
  'alisha-023': {
    name: 'Alisha',
    bio: 'Fashion · Lifestyle · Swimwear',
    avatar: '/images/Alisha/alisha-1.jpg',
    followers: 11000,
    rating: 5.0,
    categories: ['Fashion', 'Lifestyle', 'Swimwear'],
    instagram: '@sunnyydaze_',
    ugcFormats: ['Lifestyle', 'Trend', 'Testimonial', 'GRWM'],
    niches: ['Fashion', 'Swimwear', 'Lifestyle', 'Beauty'],
    location: 'South Florida',
    verified: false,
    celebrityCredits: false,
    stats: [
      { value: 'New', label: 'On Roster' },
      { value: 'FL', label: 'Based In' },
      { value: '3', label: 'Categories' },
    ],
    highlights: [],
    contentTypes: ['Fashion Modeling', 'Lifestyle Content', 'Swimwear Campaigns', 'Brand Ambassador', 'Reels & Stories', 'UGC'],
    pastBrands: [],
    description: 'South Florida-based model available for fashion shoots, lifestyle content, swimwear campaigns, and brand ambassador work.',
    gallery: [
      '/images/Alisha/alisha-1.jpg',
      '/images/Alisha/alisha-2.jpg',
      '/images/Alisha/alisha-3.jpg',
      '/images/Alisha/alisha-4.jpg',
      '/images/Alisha/alisha-5.jpg',
    ],
  },
  'celeste-024': {
    name: 'Celeste Gomez',
    bio: 'Fashion · Beauty · Lifestyle · Swimwear',
    avatar: '/images/Celeste/celeste-1.jpg',
    followers: 7000,
    rating: 5.0,
    categories: ['Fashion', 'Lifestyle', 'Beauty', 'Swimwear'],
    instagram: '@kcelestegomez',
    ugcFormats: ['Lifestyle', 'GRWM', 'Trend', 'Testimonial', 'Unboxing', 'Product Review'],
    niches: ['Fashion', 'Beauty', 'Swimwear', 'Lifestyle', 'Skincare'],
    location: 'South Florida',
    verified: false,
    celebrityCredits: false,
    stats: [
      { value: 'New', label: 'On Roster' },
      { value: 'FL', label: 'Based In' },
      { value: '4', label: 'Categories' },
    ],
    highlights: [],
    contentTypes: ['Fashion Modeling', 'Beauty Content', 'Lifestyle Content', 'Swimwear Campaigns', 'Brand Ambassador', 'UGC', 'Event Appearances', 'Reels & Stories'],
    pastBrands: [],
    description: 'South Florida-based model specializing in fashion, beauty, lifestyle, and swimwear content. Available for shoots, brand ambassador visits, UGC content, and event appearances.',
    gallery: [
      '/images/Celeste/celeste-1.jpg',
      '/images/Celeste/celeste-2.jpg',
      '/images/Celeste/celeste-3.jpg',
      '/images/Celeste/celeste-4.jpg',
      '/images/Celeste/celeste-5.jpg',
      '/images/Celeste/celeste-6.jpg',
      '/images/Celeste/celeste-7.jpg',
      '/images/Celeste/celeste-8.jpg',
    ],
  },
  'gabriela-025': {
    name: 'Gabriela',
    bio: 'Savage X Fenty Ambassador · Dez Beauty · Got2Be',
    avatar: '/images/Gabriela/gabriela-1.jpg',
    followers: 2000,
    rating: 5.0,
    categories: ['Fashion', 'Beauty', 'Brand Ambassador'],
    instagram: '@_gabulouss',
    ugcFormats: ['Testimonial', 'Unboxing', 'GRWM', 'Product Review', 'Haul'],
    niches: ['Fashion', 'Beauty', 'Hair Care', 'Lifestyle'],
    location: 'Madison, WI',
    contentTypes: ['Fashion Modeling', 'Brand Ambassador', 'Beauty Content', 'Lifestyle Content', 'Reels & Stories'],
    pastBrands: ['Savage X Fenty', 'Dez Beauty', 'Got2Be'],
    description: 'Madison-based model and brand ambassador with Savage X Fenty, Dez Beauty, and Got2Be partnerships. Available for fashion shoots, brand campaigns, beauty content, and ambassador work.',
    gallery: [
      '/images/Gabriela/gabriela-1.jpg',
      '/images/Gabriela/gabriela-2.jpg',
      '/images/Gabriela/gabriela-3.jpg',
      '/images/Gabriela/gabriela-4.jpg',
      '/images/Gabriela/gabriela-5.jpg',
    ],
  },
  'seahra-026': {
    name: 'Seahra Raquel',
    bio: 'Model · 15K Following',
    avatar: '/images/Seahra/seahra-1.jpg',
    followers: 15000,
    rating: 5.0,
    categories: ['Fashion', 'Lifestyle', 'Beauty'],
    instagram: '@seahraraquel',
    ugcFormats: ['Lifestyle', 'GRWM', 'Trend', 'Testimonial'],
    niches: ['Fashion', 'Beauty', 'Lifestyle'],
    location: 'Florida',
    contentTypes: ['Fashion Modeling', 'Lifestyle Content', 'Beauty Content', 'Brand Partnerships', 'Reels & Stories'],
    pastBrands: [],
    description: 'Florida-based model with a strong 15K following. Available for fashion shoots, lifestyle campaigns, beauty content, and brand partnerships.',
    gallery: [
      '/images/Seahra/seahra-1.jpg',
      '/images/Seahra/seahra-2.jpg',
      '/images/Seahra/seahra-3.jpg',
    ],
  },
  'jas-028': {
    name: 'Jas Healer',
    bio: 'YouTuber · Model · 16K Following',
    avatar: '/images/Jas/jas-1.jpg',
    followers: 16000,
    rating: 5.0,
    categories: ['YouTube', 'Fashion', 'Lifestyle'],
    instagram: '@jasdahealer',
    ugcFormats: ['Lifestyle', 'Testimonial', 'Product Review', 'Unboxing', 'Haul', 'Tutorial'],
    niches: ['Lifestyle', 'Beauty', 'Fashion', 'Wellness'],
    location: 'Florida',
    contentTypes: ['YouTube Content', 'Fashion Modeling', 'Lifestyle Content', 'Brand Partnerships', 'Reels & Stories'],
    pastBrands: [],
    description: 'Florida-based YouTuber and model with 16K following. Creates engaging content across platforms. Available for YouTube collaborations, fashion shoots, lifestyle campaigns, and brand partnerships.',
    gallery: [
      '/images/Jas/jas-1.jpg',
      '/images/Jas/jas-2.jpg',
      '/images/Jas/jas-3.jpg',
    ],
  },
  'daisha-030': {
    name: 'Des Daisha',
    bio: 'Model · Brand Shoots · 6K Following',
    avatar: '/images/Daisha/daisha-1.jpg',
    followers: 6000,
    rating: 5.0,
    categories: ['Fashion', 'Beauty', 'Brand Shoots'],
    instagram: '@des_daisha',
    ugcFormats: ['Testimonial', 'Lifestyle', 'Product Review', 'GRWM'],
    niches: ['Fashion', 'Beauty', 'Lifestyle'],
    location: 'Florida',
    contentTypes: ['Fashion Modeling', 'Brand Shoots', 'Beauty Content', 'Lifestyle Content', 'Reels & Stories'],
    pastBrands: [],
    description: 'Florida-based model specializing in brand shoots and fashion content. With 6K following, she brings a professional, polished presence to every project. Available for brand campaigns, fashion shoots, and beauty content.',
    gallery: [
      '/images/Daisha/daisha-1.jpg',
      '/images/Daisha/daisha-2.jpg',
      '/images/Daisha/daisha-3.jpg',
      '/images/Daisha/daisha-4.jpg',
    ],
  },
  'scarlet-031': {
    name: 'Scarlet',
    bio: 'LA Fashion Week · Bossman Dlow · Model & Host',
    avatar: '/images/Scarlet/scarlet-1.jpg',
    followers: 12000,
    rating: 5.0,
    categories: ['Runway', 'Music Video', 'Fashion', 'Host'],
    instagram: '@scarleezy_',
    ugcFormats: ['Lifestyle', 'Trend', 'Brand Feature', 'Event Content'],
    niches: ['Fashion', 'Nightlife', 'Music', 'Lifestyle'],
    location: 'Florida',
    contentTypes: ['Runway Modeling', 'Music Video Talent', 'Fashion Modeling', 'Hosting', 'Event Appearances', 'Reels & Stories'],
    pastBrands: ['LA Fashion Week', 'Bossman Dlow'],
    featuredIn: [
      { title: 'LA Fashion Week', subtitle: 'Runway Model', type: 'Fashion Show' },
      { title: 'Bossman Dlow', subtitle: 'Music Video Feature', type: 'Music Video' },
    ],
    description: 'Florida-based model and host with LA Fashion Week runway experience and celebrity music video credits including Bossman Dlow. Available for runway shows, music videos, hosting, fashion shoots, and brand campaigns.',
    gallery: [
      '/images/Scarlet/scarlet-1.jpg',
      '/images/Scarlet/scarlet-2.jpg',
      '/images/Scarlet/scarlet-3.jpg',
    ],
  },
  'aliyana-032': {
    name: 'Aliyana Vasquez',
    bio: 'Miami Swim Week · Dez Beauty · Runway Model',
    avatar: '/images/Aliyana/aliyana-1.jpg',
    followers: 5000,
    rating: 5.0,
    categories: ['Runway', 'Swimwear', 'Fashion', 'Beauty'],
    instagram: '@aliyanavasquez11',
    ugcFormats: ['Lifestyle', 'GRWM', 'Testimonial', 'Product Review'],
    niches: ['Fashion', 'Swimwear', 'Beauty', 'Lifestyle'],
    location: 'Miami, FL',
    contentTypes: ['Runway Modeling', 'Swimwear', 'Fashion Modeling', 'Beauty Content', 'Brand Partnerships', 'Reels & Stories'],
    pastBrands: ['Miami Swim Week', 'Dez Beauty'],
    featuredIn: [
      { title: 'Miami Swim Week', subtitle: 'Runway Model', type: 'Fashion Show' },
      { title: 'Dez Beauty', subtitle: 'Brand Feature', type: 'Beauty' },
    ],
    description: 'Miami-based runway model with Miami Swim Week experience and Dez Beauty features. Available for runway shows, swimwear campaigns, fashion shoots, and beauty brand partnerships.',
    gallery: [
      '/images/Aliyana/aliyana-1.jpg',
      '/images/Aliyana/aliyana-2.jpg',
      '/images/Aliyana/aliyana-3.jpg',
    ],
  },
  'kiki-035': {
    name: 'Kiki',
    bio: 'Skits · Dez Beauty · 15K · 7-8M Viral Views',
    avatar: '/images/Kiki/kiki-1.jpg',
    followers: 15000,
    rating: 5.0,
    categories: ['Skits', 'Music Video', 'Fashion', 'Beauty'],
    instagram: '@kikiithebiggest',
    ugcFormats: ['Skit/Comedy', 'Trend', 'Testimonial', 'Lifestyle', 'Brand Feature'],
    niches: ['Beauty', 'Fashion', 'Lifestyle', 'Entertainment'],
    location: 'Florida',
    contentTypes: ['Skits & Comedy', 'Music Video Talent', 'Fashion Modeling', 'Beauty Content', 'Brand Partnerships'],
    pastBrands: ['Dez Beauty'],
    stats: [
      { value: '15K', label: 'Followers' },
      { value: '7-8M', label: 'Viral Views' },
    ],
    description: 'Florida-based skit creator and model with a massive viral hit (7-8 million views). Dez Beauty model with 15K following. Available for skits, music videos, fashion shoots, and brand campaigns.',
    gallery: [
      '/images/Kiki/kiki-1.jpg',
    ],
  },
  'amanda-037': {
    name: 'Amanda Persaud',
    bio: 'Music Videos · Runway · Model · 4K',
    avatar: '/images/Amanda/amanda-1.jpg',
    followers: 4000,
    rating: 5.0,
    categories: ['Music Video', 'Runway', 'Fashion'],
    instagram: '@persaud_26',
    ugcFormats: ['Lifestyle', 'Trend', 'Brand Feature'],
    niches: ['Music', 'Fashion', 'Lifestyle'],
    location: 'Florida',
    contentTypes: ['Music Video Talent', 'Runway Modeling', 'Fashion Modeling', 'Brand Partnerships', 'Reels & Stories'],
    pastBrands: [],
    description: 'Florida-based model and runway talent with music video experience. Available for music videos, runway shows, fashion shoots, and brand campaigns.',
    gallery: [
      '/images/Amanda/amanda-1.jpg',
      '/images/Amanda/amanda-2.jpg',
      '/images/Amanda/amanda-3.jpg',
      '/images/Amanda/amanda-4.jpg',
    ],
  },
  'nella-039': {
    name: 'Nella',
    bio: 'Model · Streamer · Brand Shoots · 6K Following',
    avatar: '/images/Nella/nella-1.png',
    followers: 6000,
    rating: 5.0,
    categories: ['Fashion', 'Streaming', 'Brand Shoots'],
    instagram: '@nellabrat',
    ugcFormats: ['Lifestyle', 'Trend', 'Testimonial', 'Brand Feature'],
    niches: ['Fashion', 'Lifestyle', 'Gaming & Streaming'],
    location: 'Miami, FL',
    contentTypes: ['Fashion Modeling', 'Streaming Content', 'Brand Shoots', 'Lifestyle Content', 'Reels & Stories'],
    pastBrands: [],
    description: 'Miami-based model and streamer with 6K following. Available for fashion shoots, brand campaigns, streaming collaborations, and content creation.',
    gallery: [
      '/images/Nella/nella-1.png',
      '/images/Nella/nella-2.png',
      '/images/Nella/nella-3.png',
    ],
  },
  'malibu-040': {
    name: 'Malibu',
    bio: 'Skits · Brand Content · Music Videos · 35K',
    avatar: '/images/Model1/model1-2.jpg',
    followers: 35000,
    rating: 5.0,
    categories: ['Skits', 'Music Video', 'Brand Content'],
    instagram: '@malibudollzz',
    ugcFormats: ['Skit/Comedy', 'Trend', 'Testimonial', 'Brand Feature', 'Lifestyle'],
    niches: ['Entertainment', 'Fashion', 'Lifestyle', 'Music'],
    location: 'USA',
    contentTypes: ['Skits & Comedy', 'Music Video Talent', 'Brand Content', 'Fashion Modeling', 'Reels & Stories'],
    pastBrands: [],
    description: 'Content creator and model with 35K following. Specializes in skits, brand content, and music videos. Available for creative collaborations and brand campaigns.',
    gallery: [
      '/images/Model1/model1-1.jpg',
      '/images/Model1/model1-2.jpg',
      '/images/Model1/model1-3.png',
      '/images/Model1/model1-4.png',
    ],
  },
  'bree-041': {
    name: 'Bree',
    bio: 'Model · Skits · Influencer · Brand Shoots · 67K',
    avatar: '/images/Breeyisraela/bree-1.jpg',
    followers: 67000,
    rating: 5.0,
    categories: ['Skits', 'Influencer', 'Fashion', 'Brand Shoots'],
    instagram: '@breeyisraela',
    ugcFormats: ['Skit/Comedy', 'Trend', 'Lifestyle', 'Testimonial', 'Product Review'],
    niches: ['Entertainment', 'Fashion', 'Lifestyle', 'Beauty'],
    location: 'USA',
    contentTypes: ['Skits & Comedy', 'Influencer Content', 'Fashion Modeling', 'Brand Shoots', 'Reels & Stories'],
    pastBrands: [],
    description: 'Multi-talented model and influencer with 67K following. Creates engaging skits and brand content. Available for influencer campaigns, brand shoots, and fashion projects.',
    gallery: [
      '/images/Breeyisraela/bree-1.jpg',
      '/images/Breeyisraela/bree-2.jpg',
      '/images/Breeyisraela/bree-3.jpg',
      '/images/Breeyisraela/bree-4.jpg',
    ],
  },
  'nya-042': {
    name: 'Nya',
    bio: 'Music Videos · Brand Content · 94K · Celebrity Features',
    avatar: '/images/Nya/nya-1.jpg',
    followers: 94000,
    rating: 5.0,
    categories: ['Music Video', 'Brand Content', 'Influencer', 'Fashion'],
    instagram: '@_therealmiamii',
    ugcFormats: ['Lifestyle', 'Trend', 'Testimonial', 'Brand Feature'],
    niches: ['Music', 'Fashion', 'Lifestyle', 'Nightlife'],
    location: 'Miami, FL',
    celebrityCredits: true,
    contentTypes: ['Music Video Talent', 'Brand Content', 'Influencer Campaigns', 'Fashion Modeling', 'Reels & Stories'],
    pastBrands: [],
    description: 'Miami-based model and influencer with 94K following and celebrity feature credits. Experienced in music videos and brand content. Available for high-profile campaigns, music videos, and brand partnerships.',
    gallery: [
      '/images/Nya/nya-1.jpg',
      '/images/Nya/nya-2.jpg',
      '/images/Nya/nya-3.jpg',
      '/images/Nya/nya-4.jpg',
    ],
  },
  'ashley-morris-043': {
    name: 'Ashley Morris',
    bio: 'Model · Content Creator · 14K',
    avatar: '/images/AshleyM/ashleym-1.jpg',
    followers: 14000,
    rating: 5.0,
    categories: ['Fashion', 'Lifestyle', 'Content Creation'],
    instagram: '@theashleypage_',
    ugcFormats: ['Lifestyle', 'GRWM', 'Testimonial', 'Trend', 'Product Review'],
    niches: ['Fashion', 'Lifestyle', 'Beauty'],
    location: 'USA',
    contentTypes: ['Fashion Modeling', 'Lifestyle Content', 'Content Creation', 'Brand Partnerships', 'Reels & Stories'],
    pastBrands: [],
    description: 'Model and content creator available for fashion shoots, lifestyle campaigns, and brand partnerships.',
    gallery: [
      '/images/AshleyM/ashleym-1.jpg',
      '/images/AshleyM/ashleym-2.jpg',
      '/images/AshleyM/ashleym-3.jpg',
      '/images/AshleyM/ashleym-4.jpg',
    ],
  },
  'ashley-mar-044': {
    name: 'Ashley Mar',
    bio: 'Professional Model · Peacock · Netflix · Target · Celsius · Red Stripe',
    avatar: '/images/AshleyMar/ashleymar-1.jpg',
    followers: 3300,
    rating: 5.0,
    categories: ['Commercial', 'Film', 'Music Video', 'Fashion', 'UGC'],
    instagram: '@yelhsamar',
    ugcFormats: ['Testimonial', 'Talking Head', 'Product Launch', 'Demonstration', 'Lifestyle'],
    niches: ['Commercial', 'Food & Beverage', 'Fitness & Wellness', 'Fashion', 'Lifestyle'],
    location: 'Miami, FL',
    celebrityCredits: true,
    contentTypes: ['Commercial Modeling', 'Film & TV', 'Music Video Talent', 'Fashion Modeling', 'UGC Content', 'Brand Partnerships'],
    pastBrands: ['Peacock Network', 'Netflix', 'Target', 'Celsius', 'Red Stripe'],
    featuredIn: [
      { title: 'Peacock Network', subtitle: 'Movie Sets', type: 'Film' },
      { title: 'Netflix', subtitle: 'Production Work', type: 'Film' },
      { title: 'Target', subtitle: 'Commercial Campaign', type: 'Commercial' },
      { title: 'Celsius', subtitle: 'Brand Campaign', type: 'Commercial' },
      { title: 'Red Stripe', subtitle: 'Commercial Work', type: 'Commercial' },
    ],
    description: 'Professional Miami-based model with major credits including Peacock Network, Netflix, Target, Celsius, and Red Stripe commercials. Experienced on movie sets and music videos. Available for commercial work, film/TV, music videos, and brand campaigns.',
    gallery: [
      '/images/AshleyMar/ashleymar-1.jpg',
      '/images/AshleyMar/ashleymar-2.jpg',
      '/images/AshleyMar/ashleymar-3.jpg',
      '/images/AshleyMar/ashleymar-4.jpg',
    ],
  },
  'endy-045': {
    name: 'Endy',
    bio: 'Model · Content Creator · 3K Following',
    avatar: '/images/Endy/endy-1.jpg',
    followers: 3000,
    rating: 5.0,
    categories: ['Fashion', 'Lifestyle', 'Content Creation'],
    instagram: '@theepetitebabe',
    ugcFormats: ['Lifestyle', 'GRWM', 'Trend', 'Testimonial'],
    niches: ['Fashion', 'Lifestyle', 'Beauty'],
    location: 'USA',
    contentTypes: ['Fashion Modeling', 'Lifestyle Content', 'Content Creation', 'Brand Partnerships', 'Reels & Stories'],
    pastBrands: [],
    description: 'Model and content creator with 3K following. Available for fashion shoots, lifestyle campaigns, and content creation.',
    gallery: [
      '/images/Endy/endy-1.jpg',
      '/images/Endy/endy-2.jpg',
      '/images/Endy/endy-3.jpg',
    ],
  },
  'mika-057': {
    name: 'Mika',
    bio: 'Model · Content Creator · 10K Following',
    avatar: '/images/Mika/mika-2.jpg',
    followers: 10000,
    rating: 5.0,
    categories: ['Fashion', 'Lifestyle', 'Content Creation'],
    instagram: '@iammika_ela',
    ugcFormats: ['Lifestyle', 'GRWM', 'Testimonial', 'Trend', 'Unboxing'],
    niches: ['Fashion', 'Lifestyle', 'Beauty'],
    location: 'USA',
    contentTypes: ['Fashion Modeling', 'Lifestyle Content', 'UGC Content', 'Brand Partnerships', 'Reels & Stories'],
    pastBrands: [],
    description: 'Model and content creator with 10K following. Available for fashion shoots, lifestyle campaigns, UGC content, and brand partnerships.',
    gallery: [
      '/images/Mika/mika-2.jpg',
      '/images/Mika/mika-3.jpg',
    ],
  },
  'gracejenn-058': {
    name: 'Grace Jenn',
    bio: 'DJ · Model · Host · Actress · Coulda Been Love S2 · 20K',
    avatar: '/images/GraceJenn/gracejenn-1.jpg',
    followers: 20000,
    rating: 5.0,
    categories: ['Film', 'TV', 'Fashion', 'Lifestyle'],
    instagram: '@gracejennofficial',
    ugcFormats: ['Lifestyle', 'Trend', 'Testimonial', 'Brand Feature', 'Event Content'],
    niches: ['Entertainment', 'Fashion', 'Music', 'Lifestyle', 'Nightlife'],
    location: 'USA',
    verified: true,
    celebrityCredits: true,
    contentTypes: ['Acting', 'TV & Film', 'DJ & Hosting', 'Fashion Modeling', 'Brand Partnerships', 'Reels & Stories'],
    pastBrands: ['Coulda Been Love Season 2', 'Druski'],
    featuredIn: [
      { title: 'Coulda Been Love Season 2', subtitle: 'With Druski — Casted by Dez Marie', type: 'TV Series' },
    ],
    description: 'DJ, model, host, and actress with 20K following. Featured in Coulda Been Love Season 2 with Druski, casted by Dez Marie. Available for acting projects, hosting, brand campaigns, and fashion content.',
    gallery: [
      '/images/GraceJenn/gracejenn-1.jpg',
      '/images/GraceJenn/gracejenn-2.jpg',
      '/images/GraceJenn/gracejenn-3.jpg',
      '/images/GraceJenn/gracejenn-4.jpg',
    ],
  },
  'ashleypena-060': {
    name: 'Ashley Pena',
    bio: 'Model · Content Creator · 2K Following',
    avatar: '/images/AshleyPena/ashleypena-1.jpg',
    followers: 2000,
    rating: 5.0,
    categories: ['Fashion', 'Lifestyle', 'Content Creation'],
    instagram: '@ashleypenaofficial',
    ugcFormats: ['Lifestyle', 'GRWM', 'Testimonial', 'Trend'],
    niches: ['Fashion', 'Lifestyle', 'Beauty'],
    location: 'USA',
    contentTypes: ['Fashion Modeling', 'Lifestyle Content', 'UGC Content', 'Brand Partnerships', 'Reels & Stories'],
    pastBrands: [],
    description: 'Model and content creator available for fashion shoots, lifestyle campaigns, UGC content, and brand partnerships.',
    gallery: [
      '/images/AshleyPena/ashleypena-1.jpg',
      '/images/AshleyPena/ashleypena-2.jpg',
      '/images/AshleyPena/ashleypena-3.jpg',
    ],
  },
  'hannah-061': {
    name: 'Hannah Lopez',
    bio: 'Model · 4.4K Following',
    avatar: '/images/Hannah/hannah-1.jpg',
    followers: 4400,
    rating: 5.0,
    categories: ['Fashion', 'Lifestyle', 'Beauty'],
    instagram: '@hannahlpez',
    ugcFormats: ['Lifestyle', 'GRWM', 'Testimonial', 'Trend', 'Product Review'],
    niches: ['Fashion', 'Beauty', 'Lifestyle'],
    location: 'USA',
    contentTypes: ['Fashion Modeling', 'Lifestyle Content', 'Beauty Content', 'Brand Partnerships', 'Reels & Stories'],
    pastBrands: [],
    description: 'Model with 4.4K following. Available for fashion shoots, beauty campaigns, lifestyle content, and brand partnerships.',
    gallery: [
      '/images/Hannah/hannah-1.jpg',
      '/images/Hannah/hannah-2.jpg',
      '/images/Hannah/hannah-3.jpg',
      '/images/Hannah/hannah-4.jpg',
      '/images/Hannah/hannah-5.png',
    ],
  },
  'yuli-059': {
    name: 'Yuli Escobar',
    bio: 'Fashion Week Model · Commercials · Shoots · 22K',
    avatar: '/images/Yuli/yuli-1.jpg',
    followers: 22000,
    rating: 5.0,
    categories: ['Runway', 'Commercial', 'Fashion', 'Shoots'],
    instagram: '@yuliescobarr',
    ugcFormats: ['Lifestyle', 'Trend', 'Testimonial', 'Brand Feature', 'Demonstration'],
    niches: ['Fashion', 'Commercial', 'Lifestyle', 'Beauty'],
    location: 'USA',
    contentTypes: ['Runway Modeling', 'Commercial Work', 'Fashion Shoots', 'Brand Partnerships', 'Reels & Stories'],
    pastBrands: ['Fashion Week'],
    description: 'Fashion week model and commercial actress with 22K following. Experienced in runway, commercials, and editorial shoots. Available for brand campaigns, fashion productions, and content creation.',
    gallery: [
      '/images/Yuli/yuli-1.jpg',
      '/images/Yuli/yuli-2.jpg',
      '/images/Yuli/yuli-3.jpg',
      '/images/Yuli/yuli-4.jpg',
      '/images/Yuli/yuli-5.jpg',
      '/images/Yuli/yuli-6.jpg',
    ],
  },
};


export default function InfluencerProfilePage({ params }: { params: { id: string } }) {
  const influencer = influencers[params.id];
  if (!influencer) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Influencer Not Found</h1>
          <Link href="/marketplace">
            <Button className="gold-gradient text-black">Browse All Talent</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Schema.org structured data for Deseray Marie - enables Google Knowledge Panel
  const deserayMarieSchema = params.id === 'des-001' ? {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': 'https://influencemodels.agency/influencer/des-001',
    name: 'Deseray Marie',
    alternateName: 'Dez Marie',
    jobTitle: ['Model', 'Actress', 'Entrepreneur', 'Influencer', 'CEO'],
    description: 'Deseray Marie is a Miami-based model, actress, entrepreneur, and CEO of Influence Models Agency. Featured in Forbes Magazine with over 40 million music video views.',
    image: 'https://influencemodels.agency/images/Des/des-1.jpg',
    url: 'https://influencemodels.agency/influencer/des-001',
    sameAs: [
      'https://www.wikidata.org/wiki/Q140177827',
      'https://www.imdb.com/name/nm13223076/',
      'https://www.instagram.com/itsdezmarie',
      'https://www.tiktok.com/@dezmariee',
      'https://www.youtube.com/@dezmariee',
      'https://www.facebook.com/dezmariee',
      'https://twitter.com/dezmariee',
      'https://www.linkedin.com/in/deseray-marie',
    ],
    worksFor: {
      '@type': 'Organization',
      '@id': 'https://influencemodels.agency',
      name: 'Influence Models Agency',
      alternateName: 'Influence Models',
      url: 'https://influencemodels.agency',
      logo: 'https://influencemodels.agency/images/Des/des-1.jpg',
      description: 'Premier talent and influencer agency based in Miami, Florida.',
      foundingDate: '2024',
      founders: [{ '@type': 'Person', name: 'Deseray Marie' }],
      location: {
        '@type': 'Place',
        name: 'Miami, Florida',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Miami',
          addressRegion: 'FL',
          addressCountry: 'US',
        },
      },
      sameAs: [
        'https://www.wikidata.org/wiki/Q140179528',
        'https://www.instagram.com/influencemodels.agency',
        'https://www.tiktok.com/@influencemodels.agency',
      ],
    },
    occupation: [
      {
        '@type': 'Occupation',
        name: 'Fashion Model',
        occupationLocation: {
          '@type': 'City',
          name: 'Miami',
          containedInPlace: {
            '@type': 'State',
            name: 'Florida',
          },
        },
      },
      {
        '@type': 'Occupation',
        name: 'Actress',
      },
      {
        '@type': 'Occupation',
        name: 'Entrepreneur',
      },
    ],
    knowsAbout: ['Modeling', 'Acting', 'Music Videos', 'Fashion', 'Entrepreneurship', 'Talent Management'],
    alumniOf: {
      '@type': 'Organization',
      name: 'Influence Models Agency',
    },
    award: [
      'Forbes Magazine Feature',
      '40M+ Music Video Views',
      'Meta Ray-Ban Billboard Campaign',
    ],
    hasOccupation: {
      '@type': 'Occupation',
      name: 'CEO',
      worksFor: {
        '@type': 'Organization',
        name: 'Influence Models Agency',
        description: 'Premier talent agency in South Florida',
        url: 'https://influencemodels.agency',
      },
    },
    performerIn: [
      { '@type': 'Movie', name: 'Sacrifice' },
      { '@type': 'Movie', name: 'Spanish Fly' },
      { '@type': 'TVSeries', name: 'Love & Hip Hop' },
    ],
    homeLocation: {
      '@type': 'Place',
      name: 'Miami, Florida',
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 25.7617,
        longitude: -80.1918,
      },
    },
    nationality: {
      '@type': 'Country',
      name: 'United States',
    },
    brand: [
      { '@type': 'Brand', name: 'DezBeauty' },
      { '@type': 'Brand', name: 'Influence Models Agency' },
    ],
  } : null;

  return (
    <div className="min-h-screen bg-[#080808] overflow-x-hidden">
      {deserayMarieSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(deserayMarieSchema) }}
        />
      )}
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

      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#080808] via-[#0a0a0a] to-[#080808]" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{ background: 'radial-gradient(circle at 50% 50%, #c9a96e 0%, transparent 60%)' }}
        />

        {/* Hero content */}
        <div className="relative h-full flex items-end pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="w-full lg:w-2/3">
            <div className="flex items-center gap-3 mb-4">
              {influencer.verified && (
                <BadgeCheck className="h-6 w-6 text-[#c9a96e] fill-[#c9a96e]/20" />
              )}
              {influencer.celebrityCredits && (
                <span className="px-3 py-1 bg-[#c9a96e]/20 border border-[#c9a96e]/40 text-[#c9a96e] text-[10px] font-bold tracking-[0.2em] uppercase rounded-full">
                  Celebrity Collaborator
                </span>
              )}
            </div>
            <h1 className="font-display font-bold text-white leading-tight mb-3" style={{ fontSize: 'clamp(40px, 6vw, 72px)' }}>
              {influencer.name}
            </h1>
            <p className="text-white/70 text-lg md:text-xl mb-6 max-w-2xl">
              {influencer.location} · {influencer.categories.join(' · ')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={`/model-booking?model=${encodeURIComponent(influencer.name)}`}
                className="px-6 py-4 text-black font-bold text-sm tracking-widest uppercase hover:opacity-90 transition-all text-center"
                style={{ backgroundColor: '#c9a96e' }}
              >
                Book {influencer.name}
              </Link>
              <a
                href={`https://instagram.com/${influencer.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 border border-white/30 text-white font-bold text-sm tracking-widest uppercase hover:bg-white/10 transition-all text-center"
              >
                View Instagram
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-900 border border-white/10 p-5 sm:p-8 lg:sticky lg:top-32">
              <div className="relative mb-6">
                <img
                  src={influencer.avatar}
                  alt={influencer.name}
                  className="w-48 h-48 rounded-full object-cover border-4 border-[#c9a96e]/30 mx-auto"
                />
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-10 h-10 gold-gradient rounded-full flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-black" />
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 mb-2">
                <h1 className="text-3xl font-bold text-white text-center">{influencer.name}</h1>
                {influencer.verified && (
                  <BadgeCheck className="h-6 w-6 text-[#c9a96e] fill-[#c9a96e]/20" />
                )}
              </div>
              {influencer.celebrityCredits && (
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Film className="h-3.5 w-3.5 text-[#c9a96e]" />
                  <p className="text-[#c9a96e] text-xs font-bold tracking-[0.2em] uppercase">Celebrity Collaborator</p>
                </div>
              )}
              <p className="text-white/60 text-center mb-6">{influencer.location}</p>

              <div className="grid grid-cols-2 gap-4 mb-6 text-center">
                <div>
                  <p className="text-2xl font-bold text-white">
                    <AnimatedCounter 
                      value={influencer.followers >= 1000000 ? (influencer.followers / 1000000).toFixed(1) + 'M' : (influencer.followers / 1000).toFixed(0) + 'K'} 
                      duration={1500}
                    />
                  </p>
                  <p className="text-xs text-white/40 uppercase tracking-wider">Followers</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">★★★★★</p>
                  <p className="text-xs text-white/40 uppercase tracking-wider">5 Stars</p>
                </div>
              </div>

              <div className="bg-[#c9a96e]/10 border border-[#c9a96e]/30 p-3 text-center mb-6">
                <p className="text-[9px] text-[#c9a96e]/60 uppercase tracking-[0.2em] mb-1">Guarantee</p>
                <p className="text-[#c9a96e] font-black text-base">10K+</p>
                <p className="text-[#c9a96e]/60 text-xs">Views / Reel</p>
              </div>

              {/* Availability Badge */}
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <p className="text-green-400 text-xs font-bold tracking-[0.2em] uppercase">Available This Week</p>
                </div>
                <p className="text-white/50 text-[10px] text-center">Same-week booking available</p>
              </div>

              <a href={`https://instagram.com/${influencer.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-2 mb-6 hover:opacity-80 transition-opacity">
                <Instagram className="h-5 w-5" style={{ color: '#c9a96e' }} />
                <span className="font-medium hover:underline" style={{ color: '#c9a96e' }}>{influencer.instagram}</span>
              </a>

              <div className="flex flex-wrap gap-2 justify-center mb-6">
                {influencer.categories.map((cat: string) => (
                  <Badge key={cat} className="bg-[#c9a96e]/10 border-[#c9a96e]/30" style={{ color: '#c9a96e' }}>
                    {cat}
                  </Badge>
                ))}
              </div>

              {/* Primary CTA */}
              <Link href={`/model-booking?model=${encodeURIComponent(influencer.name)}`} className="block w-full py-4 text-center text-black font-bold text-sm tracking-widest uppercase hover:opacity-80 transition-all" style={{ backgroundColor: '#c9a96e' }}>
                Book {influencer.name}
              </Link>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">About</h2>
              <p className="text-white/70 text-lg leading-relaxed">{influencer.description}</p>
            </div>

            {/* Stats Strip — By the Numbers */}
            {influencer.stats && influencer.stats.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-[#c9a96e]/20 md:border-x-0">
                {influencer.stats.map((stat: any, idx: number) => (
                  <div
                    key={idx}
                    className={`py-6 px-4 text-center ${idx !== 0 ? 'md:border-l border-[#c9a96e]/10' : ''}`}
                  >
                    <p className="text-2xl md:text-4xl lg:text-5xl font-black gradient-text mb-1">{stat.value}</p>
                    <p className="text-[10px] md:text-xs text-white/50 tracking-[0.2em] uppercase font-semibold">{stat.label}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Travel / International Work */}
            {influencer.travelHistory && influencer.travelHistory.length > 0 && (
              <div className="bg-zinc-900 border border-white/10 p-6">
                <p className="text-[#c9a96e] text-xs font-bold tracking-[0.2em] uppercase mb-3">Worked Internationally</p>
                <div className="flex flex-wrap gap-2">
                  {influencer.travelHistory.map((country: string) => (
                    <span key={country} className="px-4 py-2 bg-black border border-[#c9a96e]/20 text-white/90 text-sm font-medium">
                      {country}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Featured In — celebrity / notable collaborations */}
            {influencer.featuredIn && influencer.featuredIn.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Award className="h-5 w-5 text-[#c9a96e]" />
                  <h2 className="text-xl font-bold text-white">Featured In</h2>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {influencer.featuredIn.map((credit: any, idx: number) => (
                    <div
                      key={idx}
                      className="flex-shrink-0 bg-zinc-900 border border-white/10 px-4 py-3 rounded-lg hover:border-[#c9a96e]/30 transition-colors"
                    >
                      <p className="text-[#c9a96e]/60 text-[9px] font-bold tracking-[0.15em] uppercase mb-1">{credit.type}</p>
                      <p className="text-white text-sm font-semibold truncate max-w-[200px]">{credit.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Content Preview — UGC-style iPhone mockups */}
            {influencer.gallery && influencer.gallery.length > 0 && (
              <div className="relative -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-12 overflow-hidden">
                {/* Soft gold glow backdrop */}
                <div
                  className="absolute inset-0 opacity-[0.07]"
                  style={{ background: 'radial-gradient(circle at 50% 40%, #c9a96e 0%, transparent 60%)' }}
                />
                <div className="relative">
                  <div className="text-center mb-2">
                    <p className="text-[#c9a96e] text-[11px] font-bold tracking-[0.3em] uppercase">As Seen On Your Feed</p>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2 text-center">Content That Stops The Scroll</h2>
                  <p className="text-white/40 text-sm mb-10 text-center max-w-lg mx-auto">
                    Scroll-ready reels and posts — delivered exactly how they&apos;ll look on Instagram &amp; TikTok.
                  </p>
                  <div className="flex justify-center gap-4 md:gap-10">
                    {influencer.gallery.slice(0, 3).map((photo: string, idx: number) => (
                      <IPhoneMockup
                        key={idx}
                        image={photo}
                        title={`${influencer.name} content ${idx + 1}`}
                        className={`${idx === 0 ? '' : idx === 1 ? 'hidden sm:block md:-translate-y-6' : 'hidden md:block'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Brand Partnerships Marquee */}
            {influencer.pastBrands && influencer.pastBrands.length > 0 && (
              <div className="relative -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-10 overflow-hidden border-y border-white/[0.04]">
                <div className="text-center mb-6">
                  <p className="text-[#c9a96e] text-[10px] font-bold tracking-[0.3em] uppercase mb-2">Trusted By</p>
                  <h2 className="text-xl font-bold text-white">Brand Partnerships</h2>
                </div>
                <BrandLogoMarquee brands={influencer.pastBrands} speed={40} />
              </div>
            )}

            {/* Photo Gallery */}
            {influencer.gallery && (
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-1 h-8 bg-[#c9a96e]" />
                  <h2 className="text-2xl font-bold text-white">Portfolio</h2>
                </div>
                <p className="text-white/40 text-sm mb-6 ml-4">Recent work &amp; campaigns</p>
                <div className="grid grid-cols-2 gap-2">
                  {influencer.gallery.map((photo: string, idx: number) => (
                    <div 
                      key={idx} 
                      className="relative overflow-hidden border border-white/10"
                      style={{ height: '140px' }}
                    >
                      <img
                        src={photo}
                        alt={`${influencer.name} - Photo ${idx + 1}`}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* UGC Content Formats */}
            {influencer.ugcFormats && influencer.ugcFormats.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Content Formats</h2>
                <p className="text-white/35 text-sm mb-4">Types of content she creates for brands</p>
                <div className="flex flex-wrap gap-2">
                  {influencer.ugcFormats.map((fmt: string) => (
                    <span key={fmt} className="px-4 py-2 text-xs font-bold tracking-widest uppercase border border-[#c9a96e]/30 bg-[#c9a96e]/5" style={{ color: '#c9a96e' }}>
                      {fmt}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Brand Niches */}
            {influencer.niches && influencer.niches.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Brand Niches</h2>
                <p className="text-white/35 text-sm mb-4">Industries &amp; verticals she works in</p>
                <div className="flex flex-wrap gap-2">
                  {influencer.niches.map((niche: string) => (
                    <span key={niche} className="px-4 py-2 text-xs font-semibold tracking-wider border border-white/10 bg-white/[0.03] text-white/70">
                      {niche}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {influencer.contentTypes && influencer.contentTypes.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Content Specialties</h2>
                <div className="grid grid-cols-2 gap-4">
                  {influencer.contentTypes.map((type: string) => (
                    <div key={type} className="flex items-center space-x-3 bg-zinc-900 p-4 border border-white/10">
                      <Check className="h-5 w-5 text-[#c9a96e]" />
                      <span className="text-white">{type}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {influencer.pastBrands && influencer.pastBrands.length > 0 && (
              influencer.celebrityCredits ? (
                <LuxuryBrandBanner brands={influencer.pastBrands} />
              ) : (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">Past Collaborations</h2>
                  <div className="flex flex-wrap gap-3">
                    {influencer.pastBrands.map((brand: string) => (
                      <div key={brand} className="bg-zinc-900 px-6 py-3 border border-white/10">
                        <span className="text-white/80 font-medium">{brand}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}

            {/* Book This Model — All Services */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Book {influencer.name}</h2>
              <p className="text-white/40 text-sm mb-6">Choose a service below — {influencer.name} is available for all of them.</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { svc: 'reaction', label: 'Music Reactions', desc: 'React to your songs on camera' },
                  { svc: 'ugc', label: 'UGC & Reels', desc: 'Branded skits, promos & short-form content' },
                  { svc: 'business', label: 'Business Content', desc: 'Influencer visits your business, creates reels' },
                  { svc: 'shoot', label: 'Shoots & Videos', desc: 'On-location for your production' },
                  { svc: 'event', label: 'Events & Hosting', desc: 'Model hosts or attends your event' },
                ].map(({ svc, label, desc }) => (
                  <Link
                    key={svc}
                    href={`/model-booking?service=${svc}&model=${encodeURIComponent(influencer.name)}`}
                    className="p-5 border border-white/[0.08] hover:border-[#c9a96e]/30 hover:bg-white/[0.02] transition-all group"
                  >
                    <h3 className="text-white font-bold text-sm group-hover:text-[#c9a96e] transition-colors mb-2">{label}</h3>
                    <p className="text-white/35 text-xs">{desc}</p>
                  </Link>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Link href={`/model-booking?model=${encodeURIComponent(influencer.name)}`} className="text-[#c9a96e]/60 hover:text-[#c9a96e] text-xs tracking-widest uppercase font-semibold transition-colors">
                  Browse All Packages →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
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
                  <li><Link href="/services/shoots" className="text-white/40 hover:text-white transition-colors text-sm">Shoots &amp; Videos</Link></li>
                  <li><Link href="/services/commercials" className="text-white/40 hover:text-white transition-colors text-sm">Commercials</Link></li>
                  <li><Link href="/services/events" className="text-white/40 hover:text-white transition-colors text-sm">Event Models</Link></li>
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
