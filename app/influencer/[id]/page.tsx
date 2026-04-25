import Link from 'next/link';
import { Star, Instagram, TrendingUp, Crown, Sparkles, ChevronLeft, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookingButton } from '@/components/BookingButton';

const influencers: Record<string, any> = {
  'des-001': {
    name: 'Deseray Marie',
    bio: 'Beauty & Health Brand Owner | Fashion & Luxury Creator',
    avatar: '/images/influencers/des-1.jpg',
    followers: 56900,
    rating: 5.0,
    categories: ['Beauty', 'Health', 'Fashion', 'Luxury'],
    instagram: '@itsdezmarie',
    location: 'Miami, FL',
    contentTypes: ['Beauty Tutorials', 'Fashion Content', 'Luxury Lifestyle', 'Health & Wellness', 'Brand Partnerships', 'Product Reviews'],
    pastBrands: ['DezBeauty', 'Fashion Nova', 'PrettyLittleThing', 'SHEIN'],
    description: 'Owner of DezBeauty brand and elite content creator specializing in beauty, health, fashion, and luxury lifestyle content. Known for stunning visuals, luxury aesthetics, and authentic brand partnerships that drive real engagement and conversions.',
    gallery: [
      '/images/influencers/des-1.jpg',
      '/images/influencers/des-2.jpg',
      '/images/influencers/des-3.jpg',
      '/images/influencers/des-4.jpg',
      '/images/influencers/des-5.jpg',
    ],
  },
};

const packages = [
  { tier: 'SAMPLE', name: 'Sample', price: 85, description: '1x 15-second Instagram Reel' },
  { tier: 'STARTER', name: 'Starter', price: 250, description: '2x 30-second reels (TikTok + IG)', popular: true },
  { tier: 'GROWTH', name: 'Growth', price: 500, description: '4x 30-second reels', popular: true },
  { tier: 'PRO', name: 'Pro', price: 850, description: '6x 30-second premium reels', popular: true },
];

export default function InfluencerProfilePage({ params }: { params: { id: string } }) {
  const influencer = influencers[params.id];

  if (!influencer) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Creator Not Found</h1>
          <Link href="/marketplace">
            <Button className="gold-gradient text-black">Browse All Talent</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <nav className="border-b border-white/10 bg-black/80 backdrop-blur-xl fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center space-x-3">
              <Crown className="h-10 w-10 text-yellow-500" />
              <span className="text-3xl font-bold gradient-text tracking-tight">INFLUENCE</span>
            </Link>
            <Link href="/marketplace">
              <Button variant="ghost" className="text-white/80 hover:text-yellow-500">
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to Marketplace
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-900 border border-white/10 p-8 sticky top-32">
              <div className="relative mb-6">
                <img
                  src={influencer.avatar}
                  alt={influencer.name}
                  className="w-48 h-48 rounded-full object-cover border-4 border-yellow-500/30 mx-auto"
                />
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-10 h-10 gold-gradient rounded-full flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-black" />
                </div>
              </div>

              <h1 className="text-3xl font-bold text-white text-center mb-2">{influencer.name}</h1>
              <p className="text-white/60 text-center mb-6">{influencer.location}</p>

              <div className="grid grid-cols-2 gap-4 mb-6 text-center max-w-xs mx-auto">
                <div>
                  <p className="text-2xl font-bold text-white">{(influencer.followers / 1000).toFixed(0)}K</p>
                  <p className="text-xs text-white/40 uppercase tracking-wider">Followers</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">★★★★★</p>
                  <p className="text-xs text-white/40 uppercase tracking-wider">5 Stars</p>
                </div>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6 text-center">
                <p className="text-sm text-white/60 uppercase tracking-wider mb-2">Performance Guarantee</p>
                <p className="text-lg font-black text-yellow-400">10K+ Views Per Reel</p>
              </div>

              <a href={`https://instagram.com/${influencer.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-2 mb-6 hover:opacity-80 transition-opacity">
                <Instagram className="h-5 w-5 text-yellow-500" />
                <span className="text-yellow-500 font-medium hover:underline">{influencer.instagram}</span>
              </a>

              <div className="flex flex-wrap gap-2 justify-center">
                {influencer.categories.map((cat: string) => (
                  <Badge key={cat} className="bg-yellow-500/10 text-yellow-500 border-yellow-500/30">
                    {cat}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">About</h2>
              <p className="text-white/70 text-lg leading-relaxed">{influencer.description}</p>
            </div>

            {/* Photo Gallery */}
            {influencer.gallery && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Portfolio</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {influencer.gallery.map((photo: string, idx: number) => (
                    <div key={idx} className="aspect-square overflow-hidden border border-white/10">
                      <img
                        src={photo}
                        alt={`${influencer.name} - Photo ${idx + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Content Specialties</h2>
              <div className="grid grid-cols-2 gap-4">
                {influencer.contentTypes.map((type: string) => (
                  <div key={type} className="flex items-center space-x-3 bg-zinc-900 p-4 border border-white/10">
                    <Check className="h-5 w-5 text-yellow-500" />
                    <span className="text-white">{type}</span>
                  </div>
                ))}
              </div>
            </div>

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

            {/* Booking Packages */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Book {influencer.name}</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {packages.map((pkg) => (
                  <Card key={pkg.tier} className="bg-zinc-900 border-white/10 hover:border-yellow-500/50 transition-all">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
                          <p className="text-white/60 text-sm">{pkg.description}</p>
                        </div>
                        {pkg.popular && (
                          <Badge className="bg-yellow-500 text-black">Popular</Badge>
                        )}
                      </div>
                      <p className="text-3xl font-black gradient-text mb-4">${pkg.price}</p>
                      <BookingButton
                        packageTier={pkg.tier}
                        influencerId={params.id}
                        className="w-full gold-gradient text-black font-bold tracking-wider uppercase"
                      >
                        Select Package
                      </BookingButton>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <p className="text-white/40 text-sm mt-4 text-center">
                Or <Link href="/pricing" className="text-yellow-500 hover:underline">view all packages</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
