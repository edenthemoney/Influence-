import type { Metadata } from 'next';
import GeoLanding, { type GeoPageProps } from '../components/GeoLanding';

export const metadata: Metadata = {
  title: { absolute: "Nightclub & Lounge Influencer Marketing in Miami | Influence" },
  description: "Promote your Miami nightclub or lounge with event creators and VIP hostesses ($95/hr each, 4-hour minimum), story reposts and collab posts.",
  alternates: { canonical: 'https://influencecreators.marketing/nightclub-influencer-marketing-miami' },
};

const props: GeoPageProps = {
  "path": "/nightclub-influencer-marketing-miami",
  "eyebrow": "Nightlife \u00b7 Clubs & Lounges",
  "h1": "Influencer Marketing for Miami Nightclubs and Lounges",
  "intro": "Fill the room and the feed: creators appear on the night, VIP hostesses work the tables, and creators share the night to their stories.",
  "serviceName": "Nightclub and lounge influencer marketing, Miami",
  "serviceType": "Nightlife influencer marketing",
  "serviceDescription": "Event creators, VIP hostesses and Instagram reposts for nightclubs and lounges in Miami and South Florida.",
  "cta": {
    "label": "Plan a club night",
    "href": "/start?service=event"
  },
  "crumbs": [
    {
      "label": "Services",
      "href": "/services"
    },
    {
      "label": "Nightlife",
      "href": "/nightclub-influencer-marketing-miami"
    }
  ],
  "sections": [
    {
      "heading": "What works for a club or lounge?",
      "answer": "Three pieces work together: creators in the room, VIP hostesses at the tables, and story reposts before or during the night."
    },
    {
      "heading": "Planning a night",
      "answer": "Send the date, music and dress code, how many creators or hostesses, and whether you want posts."
    },
    {
      "heading": "Areas",
      "answer": "Venues across Miami (Brickell, Wynwood, Downtown, Design District), Miami Beach and South Beach, Fort Lauderdale, Boca Raton, West Palm Beach and Palm Beach."
    }
  ],
  "prices": [
    {
      "name": "Event creators",
      "price": "from $760 (2 creators × 4 hours at $95/hr)",
      "desc": "Appearance at your night."
    },
    {
      "name": "VIP hostesses",
      "price": "from $760 (2 hostesses × 4 hours at $95/hr)",
      "desc": "4-hour shift."
    },
    {
      "name": "Story reposts",
      "price": "From $600",
      "desc": "24-hour story frames."
    },
    {
      "name": "Collab posts",
      "price": "From $500",
      "desc": "One post on both feeds."
    }
  ],
  "faqs": [
    {
      "q": "How much does it cost to have creators at my club?",
      "a": "from $760 (2 creators × 4 hours at $95/hr)."
    },
    {
      "q": "Can creators post from the venue?",
      "a": "Yes, if posting is part of the booking."
    }
  ],
  "related": [
    {
      "label": "Bottle girls",
      "href": "/bottle-girls-miami"
    },
    {
      "label": "Event creators",
      "href": "/event-creators-miami"
    },
    {
      "label": "How to book event models",
      "href": "/blog/how-to-book-event-models-miami"
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
