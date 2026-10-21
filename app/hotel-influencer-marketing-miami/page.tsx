import type { Metadata } from 'next';
import GeoLanding, { type GeoPageProps } from '../components/GeoLanding';

export const metadata: Metadata = {
  title: { absolute: "Hotel & Resort Influencer Content in Miami | Influence" },
  description: "Creator content for Miami and South Florida hotels: on-site content visits from $300, photo and video shoots, and event creators for hotel events.",
  alternates: { canonical: 'https://influencecreators.marketing/hotel-influencer-marketing-miami' },
};

const props: GeoPageProps = {
  "path": "/hotel-influencer-marketing-miami",
  "eyebrow": "Hotels \u00b7 Miami Beach to Palm Beach",
  "h1": "Influencer Content for Miami Hotels and Resorts",
  "intro": "Creators film your rooms, pool, rooftop and restaurant for content you can post, or appear at hotel events.",
  "serviceName": "Hotel influencer content, Miami",
  "serviceType": "Influencer content for hotels",
  "serviceDescription": "On-site creator content and event creators for hotels and resorts in Miami and South Florida.",
  "cta": {
    "label": "Plan a hotel shoot",
    "href": "/start?service=business"
  },
  "crumbs": [
    {
      "label": "Services",
      "href": "/services"
    },
    {
      "label": "Hotels",
      "href": "/hotel-influencer-marketing-miami"
    }
  ],
  "sections": [
    {
      "heading": "What do hotels book?",
      "answer": "Mostly on-site content visits: a creator films the property for reels and stories. For bigger campaigns, a photo and video shoot. For hotel events, event creators."
    },
    {
      "heading": "What to plan",
      "answer": "Which spaces to feature, the best time for light, guest privacy rules, and whether the creator posts."
    },
    {
      "heading": "Areas",
      "answer": "Hotels across Miami (Brickell, Wynwood, Downtown, Design District), Miami Beach and South Beach, Fort Lauderdale, Boca Raton, West Palm Beach and Palm Beach."
    }
  ],
  "prices": [
    {
      "name": "Content visit",
      "price": "From $300",
      "desc": "Solo Visit: 1 model, 2 hours, 3-5 reels and stories."
    },
    {
      "name": "Photo & video shoots",
      "price": "From $300",
      "desc": "Shoots for brand and property content."
    },
    {
      "name": "Event creators",
      "price": "$400 per creator",
      "desc": "Hotel parties and launches."
    }
  ],
  "faqs": [
    {
      "q": "How much does hotel influencer content cost?",
      "a": "Content visits and shoots start from $300."
    },
    {
      "q": "Can you work around guests?",
      "a": "Yes. Tell us the rules and the times that work."
    }
  ],
  "related": [
    {
      "label": "Shoots & videos",
      "href": "/services/shoots"
    },
    {
      "label": "Restaurants",
      "href": "/restaurant-influencer-marketing-miami"
    },
    {
      "label": "Brand ambassadors",
      "href": "/brand-ambassadors-miami"
    }
  ]
};

export default function Page() {
  return (
    <div className="bg-[#080808]">
      <GeoLanding {...props} />
    </div>
  );
}
