import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Bebas_Neue } from "next/font/google";
import { Suspense } from "react";
import PostHogProvider, { PostHogPageView } from "./components/PostHogProvider";
import ChatFunnel from './components/ChatFunnel';
import GlobalLeadPopup from './components/GlobalLeadPopup';
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: 'swap' });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: 'swap',
});
const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-heading",
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL("https://influencemodels.agency"),
  title: {
    default: "Influence — South Florida Influencer Marketing Agency | UGC, Music Promo, Events",
    template: "%s | Influence",
  },
  description: "South Florida influencer marketing agency. Book verified influencers for UGC content, music promotion, brand campaigns, event hosting & model bookings. Trusted by artists, brands & record labels. Based in Miami.",
  keywords: ["influencer marketing agency", "UGC content creation", "music promotion", "brand campaigns", "event models", "Miami marketing agency", "South Florida influencers", "social media marketing", "influencer campaigns"],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
  },
  openGraph: {
    locale: 'en_US',
    siteName: 'Influence Models Agency',
    title: "Influence — South Florida Influencer Marketing Agency",
    description: "Book verified influencers for UGC content, music promotion, brand campaigns & event hosting. Based in South Florida / Miami.",
    url: "https://influencemodels.agency",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Influence — Influencer Marketing Agency",
      },
    ],
    type: "website",
  },
  twitter: {
    creator: '@influencemodels.agency',
    site: '@influencemodels.agency',
    card: "summary_large_image",
    title: "Influence — South Florida Influencer Marketing Agency",
    description: "Book verified influencers for UGC, music promo, brand campaigns & events. Miami / South Florida.",
    images: ["/og-image.jpg"],
  },
  keywords: [
    "influencer marketing agency",
    "South Florida influencer agency",
    "Miami influencer marketing",
    "UGC content creation",
    "music promotion agency",
    "book influencers",
    "hire influencers Miami",
    "brand ambassador agency",
    "event model booking",
    "TikTok influencer marketing",
    "Instagram influencer agency",
    "music video models South Florida",
    "influencer marketing for artists",
    "influencer marketing for small business",
    "hire models for events Miami",
    "business content creation South Florida",
    "models for business content",
    "restaurant social media content",
    "salon content creation Miami",
    "Instagram shoutout",
    "influencer shoutout",
    "buy Instagram shoutout",
    "Instagram shoutout agency",
    "TikTok shoutout",
    "paid shoutout Instagram",
    "hire model for commercial",
    "hire model for testimonial video",
    "product seeding agency",
    "gifted collaboration influencer",
    "UGC creator for hire",
    "micro influencer agency Miami",
    "influencer marketing for music artists",
    "music video casting Miami",
    "influencer marketing for fashion brands",
    "clothing brand influencer agency",
    "fashion brand ambassador Miami",
    "model wearing my clothing",
    "fashion UGC content creation",
    "merch influencer promotion",
    "product seeding fashion brand",
    "viral challenge creators",
    "song reaction videos",
    "music reaction influencers",
    "bottle girls Miami",
    "Boca Raton influencer agency",
    "how to promote a song on TikTok",
    "UGC creators Miami",
    "music video casting Miami",
    "event models South Florida",
    "brand ambassadors Florida",
    "influencer for hire",
    "social media influencers Miami",
    "TikTok creators Florida",
    "Instagram models Miami",
    "content creators South Florida",
    "influencer campaigns Miami",
    "music promotion services",
    "song promotion agency",
    "viral marketing Miami",
    "social media marketing agency",
    "influencer marketing for restaurants",
    "influencer marketing for fashion brands",
    "influencer marketing for music artists",
    "influencer marketing for events",
    "influencer marketing for trade shows",
    "influencer marketing for conferences",
    "influencer marketing for expos",
  ],
  verification: {
    google: "S8edkciJVfvUt7rZ_TIuu0UEZ9Im8lGKbh3Ix2qq0tE",
  },
  alternates: {
    canonical: "https://influencemodels.agency",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://influencemodels.agency/#organization",
      "wikidata": "https://www.wikidata.org/wiki/Q140179528",
      name: "Influence Models Agency",
      alternateName: ["Influence", "Influence Agency", "Influence Models"],
      url: "https://influencemodels.agency",
      logo: "https://influencemodels.agency/favicon.svg",
      description: "South Florida's premier influencer marketing agency. Book verified models and influencers for music videos, UGC content, events, brand campaigns, and business promotions. Celebrity-connected talent with credits including Sean Paul, Bryson Tiller, Kai Cenat, Forbes, and Fenty Beauty.",
      knowsAbout: ["influencer marketing", "UGC content creation", "music video production", "event hosting", "brand ambassadors", "Instagram marketing", "TikTok marketing", "music promotion", "model booking"],
      foundingDate: "2024",
      founders: [
        {
          "@type": "Person",
          "@id": "https://www.wikidata.org/wiki/Q140179042",
          name: "Eden Roy",
          jobTitle: "Founder & CEO",
          sameAs: [
            "https://www.wikidata.org/wiki/Q140179042",
          ],
        },
        {
          "@type": "Person",
          "@id": "https://influencemodels.agency/influencer/des-001",
          name: "Deseray Marie",
          jobTitle: "Co-Founder, Lead Talent & Creative Director",
          sameAs: [
            "https://www.wikidata.org/wiki/Q140177827",
            "https://www.imdb.com/name/nm13223076/",
            "https://www.instagram.com/itsdezmarie",
          ],
        },
      ],
      areaServed: [
        { "@type": "City", name: "Miami", geo: { "@type": "GeoCoordinates", latitude: 25.7617, longitude: -80.1918 } },
        { "@type": "City", name: "Boca Raton", geo: { "@type": "GeoCoordinates", latitude: 26.3683, longitude: -80.1379 } },
        { "@type": "City", name: "Fort Lauderdale", geo: { "@type": "GeoCoordinates", latitude: 26.1224, longitude: -80.1373 } },
        { "@type": "City", name: "Palm Beach", geo: { "@type": "GeoCoordinates", latitude: 26.7056, longitude: -80.0364 } },
        { "@type": "City", name: "West Palm Beach", geo: { "@type": "GeoCoordinates", latitude: 26.7153, longitude: -80.0534 } },
        { "@type": "City", name: "Delray Beach", geo: { "@type": "GeoCoordinates", latitude: 26.4615, longitude: -80.0796 } },
        { "@type": "City", name: "Hollywood", geo: { "@type": "GeoCoordinates", latitude: 26.0120, longitude: -80.1494 } },
        { "@type": "City", name: "Wynwood", geo: { "@type": "GeoCoordinates", latitude: 25.8136, longitude: -80.2019 } },
        { "@type": "City", name: "South Beach", geo: { "@type": "GeoCoordinates", latitude: 25.7907, longitude: -80.1300 } },
        { "@type": "City", name: "Brickell", geo: { "@type": "GeoCoordinates", latitude: 25.7649, longitude: -80.1916 } },
        { "@type": "City", name: "Coral Gables", geo: { "@type": "GeoCoordinates", latitude: 25.7215, longitude: -80.2684 } },
        { "@type": "State", name: "Florida" },
        { "@type": "Country", name: "United States" },
      ],
      slogan: "Go Viral. Make an Influence.",
      sameAs: [
        "https://www.wikidata.org/wiki/Q140179528",
        "https://www.instagram.com/influencemodels.agency",
        "https://www.tiktok.com/@influencemodelsagency",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        email: "influencemodelsagency@gmail.com",
        telephone: "+15615520392",
        contactType: "customer service",
        availableLanguage: ["English", "Spanish"],
        areaServed: ["US", "FL"],
      },
      openingHours: "Mo-Fr 09:00-18:00",
      numberOfEmployees: { "@type": "QuantitativeValue", minValue: 20, maxValue: 30 },
      keywords: "hire model Miami, book influencer, UGC agency, music video models, influencer for hire, model booking agency, event models Miami",
      subOrganization: [
        {
          "@type": "LocalBusiness",
          "@id": "https://influencemodels.agency/#miami",
          name: "Influence Models Agency - Miami",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Miami",
            addressRegion: "FL",
            addressCountry: "US",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 25.7617,
            longitude: -80.1918,
          },
          openingHours: "Mo-Fr 09:00-18:00",
        },
        {
          "@type": "LocalBusiness",
          "@id": "https://influencemodels.agency/#fort-lauderdale",
          name: "Influence Models Agency - Fort Lauderdale",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Fort Lauderdale",
            addressRegion: "FL",
            addressCountry: "US",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 26.1224,
            longitude: -80.1373,
          },
          openingHours: "Mo-Fr 09:00-18:00",
        },
        {
          "@type": "LocalBusiness",
          "@id": "https://influencemodels.agency/#boca-raton",
          name: "Influence Models Agency - Boca Raton",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Boca Raton",
            addressRegion: "FL",
            addressCountry: "US",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 26.3683,
            longitude: -80.1379,
          },
          openingHours: "Mo-Fr 09:00-18:00",
        },
        {
          "@type": "LocalBusiness",
          "@id": "https://influencemodels.agency/#palm-beach",
          name: "Influence Models Agency - Palm Beach",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Palm Beach",
            addressRegion: "FL",
            addressCountry: "US",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 26.7056,
            longitude: -80.0364,
          },
          openingHours: "Mo-Fr 09:00-18:00",
        },
        {
          "@type": "LocalBusiness",
          "@id": "https://influencemodels.agency/#west-palm-beach",
          name: "Influence Models Agency - West Palm Beach",
          address: {
            "@type": "PostalAddress",
            addressLocality: "West Palm Beach",
            addressRegion: "FL",
            addressCountry: "US",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 26.7153,
            longitude: -80.0534,
          },
          openingHours: "Mo-Fr 09:00-18:00",
        },
        {
          "@type": "LocalBusiness",
          "@id": "https://influencemodels.agency/#delray-beach",
          name: "Influence Models Agency - Delray Beach",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Delray Beach",
            addressRegion: "FL",
            addressCountry: "US",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 26.4615,
            longitude: -80.0796,
          },
          openingHours: "Mo-Fr 09:00-18:00",
        },
        {
          "@type": "LocalBusiness",
          "@id": "https://influencemodels.agency/#hollywood",
          name: "Influence Models Agency - Hollywood",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Hollywood",
            addressRegion: "FL",
            addressCountry: "US",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 26.0120,
            longitude: -80.1494,
          },
          openingHours: "Mo-Fr 09:00-18:00",
        },
        {
          "@type": "LocalBusiness",
          "@id": "https://influencemodels.agency/#wynwood",
          name: "Influence Models Agency - Wynwood",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Wynwood",
            addressRegion: "FL",
            addressCountry: "US",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 25.8136,
            longitude: -80.2019,
          },
          openingHours: "Mo-Fr 09:00-18:00",
        },
        {
          "@type": "LocalBusiness",
          "@id": "https://influencemodels.agency/#south-beach",
          name: "Influence Models Agency - South Beach",
          address: {
            "@type": "PostalAddress",
            addressLocality: "South Beach",
            addressRegion: "FL",
            addressCountry: "US",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 25.7907,
            longitude: -80.1300,
          },
          openingHours: "Mo-Fr 09:00-18:00",
        },
        {
          "@type": "LocalBusiness",
          "@id": "https://influencemodels.agency/#brickell",
          name: "Influence Models Agency - Brickell",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Brickell",
            addressRegion: "FL",
            addressCountry: "US",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 25.7649,
            longitude: -80.1916,
          },
          openingHours: "Mo-Fr 09:00-18:00",
        },
        {
          "@type": "LocalBusiness",
          "@id": "https://influencemodels.agency/#coral-gables",
          name: "Influence Models Agency - Coral Gables",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Coral Gables",
            addressRegion: "FL",
            addressCountry: "US",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 25.7215,
            longitude: -80.2684,
          },
          openingHours: "Mo-Fr 09:00-18:00",
        },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0",
        bestRating: "5",
        worstRating: "1",
        ratingCount: "47",
        reviewCount: "47",
      },
      review: [
        {
          "@type": "Review",
          author: { "@type": "Person", name: "Marcus T." },
          reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
          reviewBody: "Booked 3 models for my music video shoot in Miami. The whole process took under 10 minutes online and the talent showed up professional and ready. My video has been performing great.",
          datePublished: "2026-04-12",
        },
        {
          "@type": "Review",
          author: { "@type": "Person", name: "Priya S." },
          reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
          reviewBody: "Used the Business Content service for our salon. The model came in, created 8 reels in one session, and they got 10x the engagement of anything we had posted before. Worth every penny.",
          datePublished: "2026-03-28",
        },
        {
          "@type": "Review",
          author: { "@type": "Person", name: "DJ Lucid" },
          reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
          reviewBody: "Ordered the Triple Pack for my new single. Got 3 reaction videos back within 5 days. Each one felt genuine and got solid engagement. Will definitely book again for my next drop.",
          datePublished: "2026-05-01",
        },
        {
          "@type": "Review",
          author: { "@type": "Person", name: "Sarah K." },
          reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
          reviewBody: "Hired models for our restaurant launch event in Wynwood. The talent was professional, engaging with guests, and created amazing content for our social media. Highly recommend!",
          datePublished: "2026-06-15",
        },
        {
          "@type": "Review",
          author: { "@type": "Person", name: "Michael R." },
          reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
          reviewBody: "Booked a UGC creator for our e-commerce brand. The content quality was exceptional and conversion rates increased by 40%. Best investment we made this quarter.",
          datePublished: "2026-07-22",
        },
      ],
      offers: [
        {
          "@type": "Offer",
          name: "UGC Content Creation",
          price: "300",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: "https://influencemodels.agency/services/content",
        },
        {
          "@type": "Offer",
          name: "Business Content & Brand Ambassadors",
          price: "300",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: "https://influencemodels.agency/services/business",
        },
        {
          "@type": "Offer",
          name: "Event Models & Hosting",
          price: "400",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: "https://influencemodels.agency/services/events",
        },
        {
          "@type": "Offer",
          name: "Music Video Models",
          price: "500",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: "https://influencemodels.agency/services/shoots",
        },
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://influencemodels.agency/#localbusiness",
      name: "Influence Models Agency",
      description: "Miami's premier influencer marketing agency. Book verified influencers for UGC content creation, music promotion, brand campaigns, event hosting, and model bookings in South Florida and Miami.",
      url: "https://influencemodels.agency",
      telephone: "+15615520392",
      email: "influencemodelsagency@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Miami",
        addressRegion: "FL",
        addressCountry: "US",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 25.76168,
        longitude: -80.19178,
      },
      areaServed: [
        { "@type": "City", name: "Miami" },
        { "@type": "City", name: "Fort Lauderdale" },
        { "@type": "City", name: "Hollywood" },
        { "@type": "City", name: "Orlando" },
        { "@type": "City", name: "Boca Raton" },
        { "@type": "City", name: "Palm Beach" },
        { "@type": "City", name: "West Palm Beach" },
        { "@type": "City", name: "Delray Beach" },
        { "@type": "City", name: "Pompano Beach" },
        { "@type": "City", name: "Hallandale Beach" },
        { "@type": "City", name: "Aventura" },
        { "@type": "City", name: "Sunny Isles Beach" },
        { "@type": "City", name: "Miami Beach" },
        { "@type": "City", name: "Coral Gables" },
        { "@type": "City", name: "Key Biscayne" },
        { "@type": "State", name: "Florida" },
      ],
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
      priceRange: "$300-$5,000",
      paymentAccepted: ["Credit Card", "Debit Card", "Stripe"],
      currenciesAccepted: "USD",
      foundingDate: "2024",
      logo: "https://influencemodels.agency/logo.png",
      sameAs: [
        "https://www.instagram.com/influencemodels.agency",
        "https://www.tiktok.com/@influencemodelsagency",
        "https://www.wikidata.org/wiki/Q140179528",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Influencer Marketing Services",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "UGC Content Creation", description: "User-generated content videos, Instagram reels, TikToks, and brand promotional content created by verified influencers." } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Music Promotion", description: "Song reaction videos, album livestreams, and music content promotion across TikTok and Instagram by influencers." } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Event Hosting & Model Booking", description: "Book professional models for event hosting, party promotions, club appearances, and brand activations in South Florida." } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Business Content Creation", description: "Professional models visit your business location to create reels, stories, and promotional content on-site. Perfect for restaurants, salons, gyms, and retail." } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Commercial Production", description: "Professional models and actresses for scripted commercial productions, national campaigns, and broadcast-quality content." } },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://influencemodels.agency/#website",
      url: "https://influencemodels.agency",
      name: "Influence",
      publisher: { "@id": "https://influencemodels.agency/#organization" },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How much does it cost to hire an influencer?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Influencer pricing varies based on the service type, influencer following, and deliverables. Services include UGC content creation, music promotion, business content visits, event hosting, and commercial production. Contact us for a custom quote based on your specific needs.",
          },
        },
        {
          "@type": "Question",
          name: "How do I book an influencer for my business?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can book influencers through our online booking system. Select your service type (UGC, business content, events, etc.), choose your budget, and complete the booking in under 2 minutes. We also offer phone consultations for custom campaigns.",
          },
        },
        {
          "@type": "Question",
          name: "What services do you offer?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We offer UGC content creation, music reaction videos, business content visits (models at your location), event hosting and model booking, music video models, commercial production with speaking roles, and brand ambassador services.",
          },
        },
        {
          "@type": "Question",
          name: "Do you serve areas outside Miami?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, we serve all of South Florida including Miami, Fort Lauderdale, Boca Raton, Palm Beach, and Orlando. For remote services like UGC and music reactions, we work nationwide.",
          },
        },
        {
          "@type": "Question",
          name: "How fast can I get content delivered?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "UGC and music reaction content is typically delivered within 3-5 days. Business content visits deliver same-day or within 24 hours. Event hosting is scheduled based on your event date. Rush delivery is available for urgent projects.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Google Ads conversion tracking */}
        {process.env.NEXT_PUBLIC_GOOGLE_ADS_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}');
                `,
              }}
            />
          </>
        )}
        {/* Meta Pixel for retargeting */}
        {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID}');
                fbq('track', 'PageView');
              `,
            }}
          />
        )}
      </head>
      <body className={`${inter.variable} ${cormorant.variable} ${bebas.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <PostHogProvider>
          <Suspense fallback={null}><PostHogPageView /></Suspense>
          {children}
          <ChatFunnel />
          <GlobalLeadPopup />
        </PostHogProvider>
      </body>
    </html>
  );
}
