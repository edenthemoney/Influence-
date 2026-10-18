import { NextResponse } from 'next/server';

const content = `# Influence Models Agency
> South Florida's premier influencer marketing and model booking agency. Miami, FL. Founded 2024.

## What We Do
Influence Models Agency connects brands, artists, and businesses with verified models and influencers in South Florida. Services include UGC content creation, music video models, music reactions, business content, event models, bottle girls, photo shoots, and commercial productions. Pricing starts at $300. Book online at influencecreators.marketing/model-booking.

## Services
- UGC & Branded Reels: Remote, from $300. Branded short-form video for brands and products.
- Music Video Models: In-person, from $500. Talent with credits including Sean Paul, Bryson Tiller, DaBaby, Trippie Redd, Kodak Black.
- Music Reactions: Remote, from $300. Models react to your songs for TikTok/Instagram promotion.
- Business Content: In-person, from $300. Model visits your business, creates reels on-site.
- Photo & Video Shoots: In-person, from $300. 1-8 models for brand shoots and editorials.
- Event Models & Hosting: In-person, from $400/girl. South Florida events and brand activations.
- Bottle Girls / VIP Hostesses: In-person, from $400/girl. Miami clubs and lounges.
- Commercial Productions: In-person, from $599. Scripted commercials and testimonial videos.

## Key Facts
- Location: Miami / South Florida (serves Miami, Boca Raton, Fort Lauderdale, Orlando)
- Talent roster: 30+ verified models and influencers
- Celebrity credits: Sean Paul, Bryson Tiller, DaBaby, Trippie Redd, Kodak Black, Kai Cenat, Forbes, Fenty Beauty, Love & Hip Hop, VH1
- Booking: Online self-serve at influencecreators.marketing/model-booking or call (561) 287-7194
- Lead talent: Deseray Marie (Co-Founder, 66K followers, Forbes, IMDB: nm13223076), Ty Nadia (124K followers, 17M+ views)
- Founder: Eden Roy

## Pricing
- Single model, 2-4hr: $300-$500
- Multi-model packages: $500-$3,500+
- Monthly retainers: available for UGC and music reactions
- All packages bookable online with Stripe checkout

## Contact
- Website: https://influencecreators.marketing
- Email: influencemodelsagency@gmail.com
- Phone: (561) 287-7194
- Instagram: @influencemodelsagency
- TikTok: @influencemodelsagency

## Pages
- Homepage: https://influencecreators.marketing
- Book Now: https://influencecreators.marketing/model-booking
- Marketplace: https://influencecreators.marketing/marketplace
- Services: https://influencecreators.marketing/services
- Pricing: https://influencecreators.marketing/pricing
- FAQ: https://influencecreators.marketing/faq
- Blog: https://influencecreators.marketing/blog
- Contact: https://influencecreators.marketing/contact
`;

export async function GET() {
  return new NextResponse(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
