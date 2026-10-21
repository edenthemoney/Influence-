import { NextResponse } from 'next/server';

const content = `# Influence Models Agency
> South Florida's premier influencer marketing and model booking agency. Miami, FL. Founded 2024.

## What We Do
Influence Models Agency connects brands, artists, and businesses with verified models and influencers in South Florida. Services include UGC content creation, music video models, music reactions, business content, event models, bottle girls, photo shoots, and commercial productions. Pricing starts at $300. Book online at influencecreators.marketing/model-booking.

## Services
- UGC & Branded Reels: Remote, from $300. Branded short-form video for brands and products.
- Music Video Models: In-person, from $199 (Cameo $199, Featured $450, Lead $950, Ensemble from $1,950). Talent with credits including Sean Paul, Bryson Tiller, DaBaby, Trippie Redd, Kodak Black.
- Music Reactions: Remote, from $300. Models react to your songs for TikTok/Instagram promotion.
- Business Content: In-person, from $300. Model visits your business, creates reels on-site.
- Photo & Video Shoots: In-person, from $300. 1-8 models for brand shoots and editorials.
- Event Models & Hosting: In-person, from $95/hr. South Florida events and brand activations.
- Bottle Girls / VIP Hostesses: In-person, from $95/hr. Miami clubs and lounges.
- Commercial Productions: actors from $750, voiceover from $250. Scripted commercials and testimonial videos.
- Brand Ambassadors: content visits from $350, event appearances $380 per model (4 hours at $95/hr). https://influencecreators.marketing/brand-ambassadors-miami
- Music Promotion: reactions from $300, story reposts from $150, collab posts from $500. Real creators, no bots. https://influencecreators.marketing/music-promotion
- Niche pages: restaurants https://influencecreators.marketing/restaurant-influencer-marketing-miami ; nightclubs and lounges https://influencecreators.marketing/nightclub-influencer-marketing-miami ; hotels https://influencecreators.marketing/hotel-influencer-marketing-miami ; bottle girls https://influencecreators.marketing/bottle-girls-miami
- Cost guide: https://influencecreators.marketing/influencer-cost-guide

## Key Facts
- Location: Miami / South Florida (serves Miami, Boca Raton, Fort Lauderdale, Orlando)
- Talent roster: 30+ verified models and influencers
- Celebrity credits: Sean Paul, Bryson Tiller, DaBaby, Trippie Redd, Kodak Black, Kai Cenat, Forbes, Fenty Beauty, Love & Hip Hop, VH1
- Booking: Online self-serve at influencecreators.marketing/model-booking or call (561) 287-7194
- Lead talent: Deseray Marie (Co-Founder, 66K followers, Forbes, IMDB: nm13223076), Ty Nadia (124K followers, 17M+ views)
- Founder: Eden Roy

## Pricing
- Music video models: Cameo $199 (≤2 hrs), Featured $450 (half day), Lead $950 (full day), Ensemble from $1,950 (+$550/extra model)
- Commercial & print models: $600 half day, $1,200 full day
- Event hosts / bottle girls: $95/hr per person, 4-hour minimum
- Brand ambassador visits: from $350; opening night $1,500 (3 creators); monthly campaigns from $2,500/mo
- UGC: $300 single, $750 for 3, $2,250 for 10; paid-ad rights +30%
- Music: reactions from $300 ($500 high-reach), story reposts from $150, collab posts from $500, Launch bundle $750, Push bundle $1,750
- Actors: $750 half day, $1,250 full day; voiceover from $250 (web) / $450 (broadcast, 13 weeks)
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
