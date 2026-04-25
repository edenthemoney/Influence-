import Link from 'next/link';
import { Search, Filter, Star, Instagram, TrendingUp, Crown, Sparkles, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { BookingButton } from '@/components/BookingButton';

const influencers = [
  {
    id: 'des-001',
    name: 'Deseray Marie',
    bio: 'Beauty & Health Brand Owner | Fashion & Luxury Creator',
    avatar: '/images/influencers/des-1.jpg',
    followers: 56900,
    rating: 5.0,
    categories: ['Beauty', 'Health', 'Fashion', 'Luxury'],
    hourlyRate: 350,
    instagram: '@itsdezmarie',
    location: 'Miami, FL',
  },
];

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-black">
      <nav className="border-b border-white/10 bg-black/80 backdrop-blur-xl fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center space-x-3">
              <Crown className="h-10 w-10 text-yellow-500" />
              <span className="text-3xl font-bold gradient-text tracking-tight">INFLUENCE</span>
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/pricing">
                <Button variant="ghost" className="text-white/80 hover:text-yellow-500">Packages</Button>
              </Link>
              <Link href="/pricing">
                <Button className="px-8 py-3 gold-gradient text-black rounded-none font-bold text-sm tracking-wider uppercase">Book Now</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center space-x-2 px-4 py-2 border border-yellow-500/30 rounded-full">
            <Star className="h-4 w-4 text-yellow-500" />
            <span className="text-yellow-500 text-sm font-medium tracking-wider uppercase">Elite Talent Network</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-black text-white mb-6">Premium <span className="gradient-text text-shadow-luxury">Creators</span></h1>
          <p className="text-white/60 text-xl max-w-2xl mx-auto mb-4">Hand-selected influencers with verified metrics and proven campaign success</p>
          <p className="text-white/50 text-base max-w-xl mx-auto">Perfect for promoting <span className="text-yellow-400 font-semibold">products, services, brands, music, artists, businesses</span> and more</p>
        </div>

        <div className="mb-16 flex flex-col md:flex-row gap-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/40" />
            <Input
              placeholder="Search by name, category, or niche..."
              className="pl-12 h-14 bg-zinc-900 border-white/10 text-white placeholder:text-white/40 focus:border-yellow-500"
            />
          </div>
          <Button className="md:w-auto h-14 px-8 bg-zinc-900 border border-white/10 text-white hover:border-yellow-500 hover:text-yellow-500">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {influencers.length === 0 ? (
          <div className="col-span-full text-center py-20">
            <div className="max-w-md mx-auto">
              <Crown className="h-20 w-20 text-yellow-500/20 mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-white mb-4">Elite Talent Coming Soon</h3>
              <p className="text-white/60 text-lg">We're curating our exclusive roster of premium creators. Check back soon.</p>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {influencers.map((influencer: any) => (
            <Card key={influencer.id} className="group bg-zinc-900 border-white/10 hover-lift hover:border-yellow-500/50 transition-all overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <img
                      src={influencer.avatar}
                      alt={influencer.name}
                      className="w-20 h-20 rounded-full object-cover border-2 border-yellow-500/30"
                    />
                    <div className="absolute -bottom-1 -right-1 w-7 h-7 gold-gradient rounded-full flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-black" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl text-white font-bold">{influencer.name}</CardTitle>
                    <CardDescription className="text-white/60">{influencer.bio}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <Instagram className="h-4 w-4 text-yellow-500" />
                    <span className="font-bold text-white">{(influencer.followers / 1000).toFixed(0)}K</span>
                    <span className="text-white/40">followers</span>
                  </div>
                  <a href={`https://instagram.com/${influencer.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:text-yellow-400 font-medium text-sm transition-colors">
                    {influencer.instagram}
                  </a>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    <span className="ml-1 font-bold text-white">{influencer.rating}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-sm">
                  <TrendingUp className="h-4 w-4 text-yellow-500" />
                  <span className="text-white/80 font-semibold">Guaranteed 10K+ Views per reel</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {influencer.categories.slice(0, 3).map((category: string) => (
                    <Badge key={category} className="bg-yellow-500/10 text-yellow-500 border-yellow-500/30">
                      {category}
                    </Badge>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/10">
                  <p className="text-sm text-white/40 uppercase tracking-wider mb-1">Packages from</p>
                  <p className="text-3xl font-black gradient-text">$85</p>
                </div>
              </CardContent>
              <CardFooter className="pt-0 flex flex-col gap-2">
                <Link href={`/influencer/${influencer.id}`} className="w-full">
                  <Button className="w-full h-12 bg-zinc-800 border border-white/10 text-white font-bold tracking-wider uppercase hover:border-yellow-500 hover:text-yellow-500 transition-all group">
                    <span>View Profile</span>
                    <ChevronRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <BookingButton
                  influencerId={influencer.id}
                  packageTier="STARTER"
                  className="w-full h-12 gold-gradient text-black font-bold tracking-wider uppercase hover:shadow-xl hover:shadow-yellow-500/30 transition-all"
                >
                  Book Now
                </BookingButton>
              </CardFooter>
            </Card>
          ))}
          </div>
        )}

        {influencers.length > 0 && (
          <div className="mt-16 text-center">
            <Button className="px-12 py-6 bg-zinc-900 border-2 border-white/10 text-white font-bold text-lg tracking-wider uppercase hover:border-yellow-500 hover:text-yellow-500 transition-all">
              Load More Talent
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
