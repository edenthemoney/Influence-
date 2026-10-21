import type { Metadata } from 'next';
import GeoLanding, { type GeoPageProps } from '../components/GeoLanding';

export const metadata: Metadata = {
  title: { absolute: "Bottle Girls & VIP Hostesses in Miami | Influence" },
  description: "Book bottle girls and VIP hostesses for Miami nightclubs and lounges: $400 per hostess for a 4-hour shift.",
  alternates: { canonical: 'https://influencecreators.marketing/bottle-girls-miami' },
};

const props: GeoPageProps = {
  "path": "/bottle-girls-miami",
  "eyebrow": "Nightlife \u00b7 VIP Hostesses",
  "h1": "Bottle Girls and VIP Hostesses for Miami Venues",
  "intro": "Influence books bottle girls and VIP hostesses for nightclubs, lounges and private events in South Florida. $400 per hostess for a 4-hour shift.",
  "serviceName": "Bottle girls and VIP hostesses",
  "serviceType": "VIP hostess booking",
  "serviceDescription": "Bottle girls and VIP hostesses for nightclubs, lounges and events in Miami and South Florida. $400 per hostess, 4-hour shift.",
  "cta": {
    "label": "Book VIP hostesses",
    "href": "/start?service=bottle"
  },
  "crumbs": [
    {
      "label": "Services",
      "href": "/services"
    },
    {
      "label": "Bottle Girls",
      "href": "/bottle-girls-miami"
    }
  ],
  "sections": [
    {
      "heading": "What do bottle girls and VIP hostesses do?",
      "answer": "They run bottle presentations and look after VIP tables during a 4-hour shift."
    },
    {
      "heading": "How to book",
      "answer": "Send the venue, date, start time and number of hostesses. We confirm the team in writing."
    },
    {
      "heading": "Where",
      "answer": "Venues across Miami (Brickell, Wynwood, Downtown, Design District), Miami Beach and South Beach, Fort Lauderdale, Boca Raton, West Palm Beach and Palm Beach."
    }
  ],
  "prices": [
    {
      "name": "1 hostess",
      "price": "$400",
      "desc": "4-hour shift."
    },
    {
      "name": "3 hostesses",
      "price": "$1,200",
      "desc": "4-hour shift."
    },
    {
      "name": "5 hostesses",
      "price": "$2,000",
      "desc": "4-hour shift."
    },
    {
      "name": "8 hostesses",
      "price": "$3,200",
      "desc": "4-hour shift."
    }
  ],
  "faqs": [
    {
      "q": "How much are bottle girls in Miami?",
      "a": "$400 per hostess for a 4-hour shift."
    },
    {
      "q": "Can I book for a private event?",
      "a": "Yes, send the details and we confirm availability."
    }
  ],
  "related": [
    {
      "label": "Nightclub & lounge marketing",
      "href": "/nightclub-influencer-marketing-miami"
    },
    {
      "label": "Event creators",
      "href": "/event-creators-miami"
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
