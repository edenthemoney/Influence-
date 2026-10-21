import type { Metadata } from 'next';
import GeoLanding, { type GeoPageProps } from '../components/GeoLanding';

export const metadata: Metadata = {
  title: { absolute: "Influencer Marketing for Restaurants in Miami | Influence" },
  description: "Restaurant influencer marketing in Miami: creator content visits from $300, opening-night event creators at $400 each, story reposts and collab posts.",
  alternates: { canonical: 'https://influencecreators.marketing/restaurant-influencer-marketing-miami' },
};

const props: GeoPageProps = {
  "path": "/restaurant-influencer-marketing-miami",
  "eyebrow": "Restaurants \u00b7 Miami & South Florida",
  "h1": "Influencer Marketing for Miami Restaurants",
  "intro": "Creators visit your restaurant to film reels and stories you can post, appear at your opening, or share your spot to their stories.",
  "serviceName": "Restaurant influencer marketing, Miami",
  "serviceType": "Influencer marketing for restaurants",
  "serviceDescription": "Creator content visits, opening events and Instagram reposts for restaurants in Miami and South Florida.",
  "cta": {
    "label": "Plan a restaurant visit",
    "href": "/start?service=business"
  },
  "crumbs": [
    {
      "label": "Services",
      "href": "/services"
    },
    {
      "label": "Restaurants",
      "href": "/restaurant-influencer-marketing-miami"
    }
  ],
  "sections": [
    {
      "heading": "How does influencer marketing work for a restaurant?",
      "answer": "Most restaurants start with a content visit: a creator comes in, films dishes, drinks and the room, and you get reels and stories to post. For openings, creators can appear on the night."
    },
    {
      "heading": "What to plan",
      "answer": "Pick dishes and drinks to feature, a time with good light, and whether you want the creator to post or just deliver content.",
      "bullets": [
        "Menu items to feature",
        "Date and time",
        "Content only, or posting too",
        "Any must-say points (hours, address, reservation link)"
      ]
    },
    {
      "heading": "Disclosure",
      "answer": "If a creator posts about a comped or paid visit, the post must be disclosed (for example #ad)."
    },
    {
      "heading": "Areas",
      "answer": "In person across Miami (Brickell, Wynwood, Downtown, Design District), Miami Beach and South Beach, Fort Lauderdale, Boca Raton, West Palm Beach and Palm Beach."
    }
  ],
  "prices": [
    {
      "name": "Content visit",
      "price": "From $300",
      "desc": "Solo Visit: 1 model, 2 hours, 3-5 reels and stories."
    },
    {
      "name": "Opening night creators",
      "price": "$400 per creator",
      "desc": "Event appearance."
    },
    {
      "name": "Story reposts",
      "price": "From $150",
      "desc": "Story frames with your link."
    },
    {
      "name": "Collab posts",
      "price": "From $500",
      "desc": "One post on both feeds."
    }
  ],
  "faqs": [
    {
      "q": "How much does restaurant influencer marketing cost?",
      "a": "Content visits start from $300; opening-night creators are $400 each."
    },
    {
      "q": "Do creators have to post?",
      "a": "Only if posting is part of the booking. Otherwise you get the content to post yourself."
    }
  ],
  "sources": [
    {
      "label": "FTC: Disclosures 101 for Social Media Influencers",
      "url": "https://www.ftc.gov/business-guidance/resources/disclosures-101-social-media-influencers"
    }
  ],
  "related": [
    {
      "label": "Business content packages",
      "href": "/services/business"
    },
    {
      "label": "Brand ambassadors",
      "href": "/brand-ambassadors-miami"
    },
    {
      "label": "Hotels",
      "href": "/hotel-influencer-marketing-miami"
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
