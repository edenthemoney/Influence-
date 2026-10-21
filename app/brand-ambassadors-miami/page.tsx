import type { Metadata } from 'next';
import GeoLanding, { type GeoPageProps } from '../components/GeoLanding';

export const metadata: Metadata = {
  title: { absolute: "Brand Ambassadors in Miami & South Florida | Influence" },
  description: "Book brand ambassadors in Miami for business content visits (from $350) and event appearances ($380 per model, 4 hours at $95/hr). How it works, packages and FAQs.",
  alternates: { canonical: 'https://influencecreators.marketing/brand-ambassadors-miami' },
};

const props: GeoPageProps = {
  "path": "/brand-ambassadors-miami",
  "eyebrow": "Brand Ambassadors \u00b7 South Florida",
  "h1": "Brand Ambassadors for Miami Businesses and Events",
  "intro": "Influence books brand ambassadors who visit your business to make content, or appear at your event to represent your brand. Content visits start from $350; event appearances are $380 per model (4 hours at $95/hr).",
  "serviceName": "Brand Ambassadors, Miami & South Florida",
  "serviceType": "Brand ambassador booking",
  "serviceDescription": "Brand ambassadors for on-site business content (from $350) and event appearances ($380 per model, 4 hours at $95/hr) in Miami and South Florida.",
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
      "price": "From $350",
      "desc": "1 creator, 2-hour session, 1 Reel + 3 Stories posted."
    },
    {
      "name": "Half-Day Visit",
      "price": "$600",
      "desc": "1 creator, 4-hour session, multiple setups, 1 Reel + 3 Stories posted plus raw clips."
    },
    {
      "name": "Opening Night",
      "price": "$1,500",
      "desc": "3 creators, up to 4 hours, each posts 1 Reel + 3 Stories."
    },
    {
      "name": "Event appearance",
      "price": "$380 per model (4 hours at $95/hr)",
      "desc": "Promo model or ambassador at your event."
    }
  ],
  "pricesNote": "Monthly campaigns start at $2,500/mo (2 creators, 5 visits a month).",
  "faqs": [
    {
      "q": "How much does a brand ambassador cost in Miami?",
      "a": "Content visits start from $350. Event appearances are $380 per model (4 hours at $95/hr)."
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
