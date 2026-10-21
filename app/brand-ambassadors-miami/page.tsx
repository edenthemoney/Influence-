import type { Metadata } from 'next';
import GeoLanding, { type GeoPageProps } from '../components/GeoLanding';

export const metadata: Metadata = {
  title: { absolute: "Brand Ambassadors in Miami & South Florida | Influence" },
  description: "Book brand ambassadors in Miami for business content visits (from $300) and event appearances ($400 per model). How it works, packages and FAQs.",
  alternates: { canonical: 'https://influencecreators.marketing/brand-ambassadors-miami' },
};

const props: GeoPageProps = {
  "path": "/brand-ambassadors-miami",
  "eyebrow": "Brand Ambassadors \u00b7 South Florida",
  "h1": "Brand Ambassadors for Miami Businesses and Events",
  "intro": "Influence books brand ambassadors who visit your business to make content, or appear at your event to represent your brand. Content visits start from $300; event appearances are $400 per model.",
  "serviceName": "Brand Ambassadors, Miami & South Florida",
  "serviceType": "Brand ambassador booking",
  "serviceDescription": "Brand ambassadors for on-site business content (from $300) and event appearances ($400 per model) in Miami and South Florida.",
  "cta": {
    "label": "Book a brand ambassador",
    "href": "/start?service=business"
  },
  "crumbs": [
    {
      "label": "Services",
      "href": "/services"
    },
    {
      "label": "Brand Ambassadors",
      "href": "/brand-ambassadors-miami"
    }
  ],
  "sections": [
    {
      "heading": "What does a brand ambassador do?",
      "answer": "There are two kinds of booking. A content visit: the ambassador comes to your business and films reels and stories. An event appearance: the ambassador represents your brand at a launch, activation or club night."
    },
    {
      "heading": "How booking works",
      "answer": "Pick a package, choose a date, and tell us what to feature. We confirm the ambassador and details in writing.",
      "bullets": [
        "Choose content visit or event appearance",
        "Send the date, address and what to feature",
        "We match an ambassador and confirm",
        "The visit or appearance happens; content is delivered for content visits"
      ]
    },
    {
      "heading": "Where we work",
      "answer": "In person across South Florida: Miami (Brickell, Wynwood, Downtown, Design District), Miami Beach and South Beach, Fort Lauderdale, Boca Raton, West Palm Beach and Palm Beach."
    }
  ],
  "prices": [
    {
      "name": "Solo Visit",
      "price": "From $300",
      "desc": "1 model, 2-hour session, 3-5 reels and stories."
    },
    {
      "name": "Content Day",
      "price": "Package",
      "desc": "1 model, 4-hour session, 8-12 content pieces."
    },
    {
      "name": "Full Production",
      "price": "Package",
      "desc": "2 models, 4-hour session, 12-20 content pieces."
    },
    {
      "name": "Event appearance",
      "price": "$400 per model",
      "desc": "Promo model or ambassador at your event."
    }
  ],
  "pricesNote": "Content Day and Full Production prices are shown when you book on the business content page.",
  "faqs": [
    {
      "q": "How much does a brand ambassador cost in Miami?",
      "a": "Content visits start from $300. Event appearances are $400 per model."
    },
    {
      "q": "Is a brand ambassador the same as an influencer?",
      "a": "Not always. An ambassador represents your brand in person or makes content for you; an influencer posts to their own audience."
    },
    {
      "q": "Do you cover Fort Lauderdale and Boca Raton?",
      "a": "Yes, all of South Florida."
    }
  ],
  "related": [
    {
      "label": "Business content packages",
      "href": "/services/business"
    },
    {
      "label": "Event creators",
      "href": "/event-creators-miami"
    },
    {
      "label": "Restaurant influencer marketing",
      "href": "/restaurant-influencer-marketing-miami"
    },
    {
      "label": "Nightlife & lounges",
      "href": "/nightclub-influencer-marketing-miami"
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
