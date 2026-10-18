import type { Metadata } from "next";
import { Inter, Bodoni_Moda, Bebas_Neue } from "next/font/google";
import { Suspense } from "react";
import PostHogProvider, { PostHogPageView } from "./components/PostHogProvider";
import ChatFunnel from './components/ChatFunnel';
import GlobalLeadPopup from './components/GlobalLeadPopup';
import SiteChrome from './components/SiteChrome';
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: 'swap' });
const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
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
  metadataBase: new URL("https://influencecreators.marketing"),
  title: {
    default: "Influence Marketing — Boca Raton Marketing Agency & Creator Marketplace",
    template: "%s | Influence Marketing",
  },
  description: "Influence Marketing is a Boca Raton, Florida-based marketing agency and creator marketplace. Connect with independent creators and influencers for UGC content, music promotion, brand campaigns, and event content. Open 24 hours.",
  keywords: ["marketing agency Boca Raton", "creator marketplace", "UGC content creation", "music promotion", "brand campaigns", "Boca Raton marketing", "South Florida creators", "social media marketing", "influencer campaigns"],
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
    siteName: 'Influence Marketing',
    title: "Influence Marketing \u2014 Boca Raton Marketing Agency & Creator Marketplace",
    description: "Connect with independent creators and influencers for UGC, music promotion, brand campaigns & events. Based in Boca Raton, FL. Open 24 hours.",
    url: "https://influencecreators.marketing",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Influence Marketing \u2014 Creator Marketplace",
      },
    ],
    type: "website",
  },
  twitter: {
    creator: '@influencemodelsagency',
    site: '@influencemodelsagency',
    card: "summary_large_image",
    title: "Influence Marketing \u2014 Boca Raton Marketing Agency & Creator Marketplace",
    description: "Connect with creators for UGC, music promo, brand campaigns & events. Boca Raton, FL. Open 24 hours.",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "S8edkciJVfvUt7rZ_TIuu0UEZ9Im8lGKbh3Ix2qq0tE",
  },
  alternates: {
    canonical: "https://influencecreators.marketing",
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
      "@id": "https://influencecreators.marketing/#organization",
      "wikidata": "https://www.wikidata.org/wiki/Q140179528",
      "name": "Influence Marketing",
      "alternateName": [
        "Influence",
        "Influence Marketplace"
      ],
      "url": "https://influencecreators.marketing",
      "logo": "https://influencecreators.marketing/favicon.svg",
      "description": "Influence Marketing is a Boca Raton, Florida-based marketing agency and creator marketplace. Connect with independent creators and influencers for music video content, UGC, events, brand campaigns, and business promotions. Celebrity-connected creators including Sean Paul, Bryson Tiller, Kai Cenat, Forbes, and Fenty Beauty.",
      "knowsAbout": [
        "creator marketing",
        "UGC content creation",
        "music video production",
        "event content",
        "brand ambassadors",
        "Instagram marketing",
        "TikTok marketing",
        "music promotion",
        "content creation"
      ],
      "foundingDate": "2024",
      "founders": [
        {
          "@type": "Person",
          "@id": "https://www.wikidata.org/wiki/Q140179042",
          "name": "Eden Roy",
          "jobTitle": "Founder & CEO",
          "sameAs": [
            "https://www.wikidata.org/wiki/Q140179042"
          ]
        },
        {
          "@type": "Person",
          "@id": "https://influencecreators.marketing/influencer/des-001",
          "name": "Deseray Marie",
          "jobTitle": "Co-Founder, Lead Creator & Creative Director",
          "sameAs": [
            "https://www.wikidata.org/wiki/Q140177827",
            "https://www.imdb.com/name/nm13223076/",
            "https://www.instagram.com/itsdezmarie"
          ]
        }
      ],
      "areaServed": [
        {
          "@type": "City",
          "name": "Miami",
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 25.7617,
            "longitude": -80.1918
          }
        },
        {
          "@type": "City",
          "name": "Boca Raton",
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 26.3683,
            "longitude": -80.1379
          }
        },
        {
          "@type": "City",
          "name": "Fort Lauderdale",
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 26.1224,
            "longitude": -80.1373
          }
        },
        {
          "@type": "City",
          "name": "Palm Beach",
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 26.7056,
            "longitude": -80.0364
          }
        },
        {
          "@type": "City",
          "name": "West Palm Beach",
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 26.7153,
            "longitude": -80.0534
          }
        },
        {
          "@type": "City",
          "name": "Delray Beach",
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 26.4615,
            "longitude": -80.0796
          }
        },
        {
          "@type": "City",
          "name": "Hollywood",
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 26.012,
            "longitude": -80.1494
          }
        },
        {
          "@type": "City",
          "name": "Wynwood",
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 25.8136,
            "longitude": -80.2019
          }
        },
        {
          "@type": "City",
          "name": "South Beach",
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 25.7907,
            "longitude": -80.13
          }
        },
        {
          "@type": "City",
          "name": "Brickell",
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 25.7649,
            "longitude": -80.1916
          }
        },
        {
          "@type": "City",
          "name": "Coral Gables",
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 25.7215,
            "longitude": -80.2684
          }
        },
        {
          "@type": "State",
          "name": "Florida"
        },
        {
          "@type": "Country",
          "name": "United States"
        }
      ],
      "slogan": "Go Viral. Make an Influence.",
      "sameAs": [
        "https://www.wikidata.org/wiki/Q140179528",
        "https://www.instagram.com/influencecreators.marketing",
        "https://www.tiktok.com/@influencemodelsagency"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "influencemodelsagency@gmail.com",
        "telephone": "+15612877194",
        "contactType": "customer service",
        "availableLanguage": [
          "English",
          "Spanish"
        ],
        "areaServed": [
          "US",
          "FL"
        ]
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "4756 NW 2nd Ave",
        "addressLocality": "Boca Raton",
        "addressRegion": "FL",
        "postalCode": "33431",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 26.3543,
        "longitude": -80.0853
      },
      "openingHours": "Mo-Su 00:00-23:59",
      "numberOfEmployees": {
        "@type": "QuantitativeValue",
        "minValue": 20,
        "maxValue": 30
      },
      "keywords": "hire creators Miami, order content, UGC creators, music video content, influencer for hire, content creator marketplace, event content Miami",
      "subOrganization": [
        {
          "@type": "LocalBusiness",
          "@id": "https://influencecreators.marketing/#miami",
          "name": "Influence - Miami",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Miami",
            "addressRegion": "FL",
            "addressCountry": "US"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 25.7617,
            "longitude": -80.1918
          },
          "openingHours": "Mo-Su 00:00-23:59"
        },
        {
          "@type": "LocalBusiness",
          "@id": "https://influencecreators.marketing/#fort-lauderdale",
          "name": "Influence - Fort Lauderdale",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Fort Lauderdale",
            "addressRegion": "FL",
            "addressCountry": "US"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 26.1224,
            "longitude": -80.1373
          },
          "openingHours": "Mo-Su 00:00-23:59"
        },
        {
          "@type": "LocalBusiness",
          "@id": "https://influencecreators.marketing/#boca-raton",
          "name": "Influence - Boca Raton",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Boca Raton",
            "addressRegion": "FL",
            "addressCountry": "US"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 26.3683,
            "longitude": -80.1379
          },
          "openingHours": "Mo-Su 00:00-23:59"
        },
        {
          "@type": "LocalBusiness",
          "@id": "https://influencecreators.marketing/#palm-beach",
          "name": "Influence - Palm Beach",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Palm Beach",
            "addressRegion": "FL",
            "addressCountry": "US"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 26.7056,
            "longitude": -80.0364
          },
          "openingHours": "Mo-Su 00:00-23:59"
        },
        {
          "@type": "LocalBusiness",
          "@id": "https://influencecreators.marketing/#west-palm-beach",
          "name": "Influence - West Palm Beach",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "West Palm Beach",
            "addressRegion": "FL",
            "addressCountry": "US"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 26.7153,
            "longitude": -80.0534
          },
          "openingHours": "Mo-Su 00:00-23:59"
        },
        {
          "@type": "LocalBusiness",
          "@id": "https://influencecreators.marketing/#delray-beach",
          "name": "Influence - Delray Beach",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Delray Beach",
            "addressRegion": "FL",
            "addressCountry": "US"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 26.4615,
            "longitude": -80.0796
          },
          "openingHours": "Mo-Su 00:00-23:59"
        },
        {
          "@type": "LocalBusiness",
          "@id": "https://influencecreators.marketing/#hollywood",
          "name": "Influence - Hollywood",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Hollywood",
            "addressRegion": "FL",
            "addressCountry": "US"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 26.012,
            "longitude": -80.1494
          },
          "openingHours": "Mo-Su 00:00-23:59"
        },
        {
          "@type": "LocalBusiness",
          "@id": "https://influencecreators.marketing/#wynwood",
          "name": "Influence - Wynwood",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Wynwood",
            "addressRegion": "FL",
            "addressCountry": "US"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 25.8136,
            "longitude": -80.2019
          },
          "openingHours": "Mo-Su 00:00-23:59"
        },
        {
          "@type": "LocalBusiness",
          "@id": "https://influencecreators.marketing/#south-beach",
          "name": "Influence - South Beach",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "South Beach",
            "addressRegion": "FL",
            "addressCountry": "US"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 25.7907,
            "longitude": -80.13
          },
          "openingHours": "Mo-Su 00:00-23:59"
        },
        {
          "@type": "LocalBusiness",
          "@id": "https://influencecreators.marketing/#brickell",
          "name": "Influence - Brickell",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Brickell",
            "addressRegion": "FL",
            "addressCountry": "US"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 25.7649,
            "longitude": -80.1916
          },
          "openingHours": "Mo-Su 00:00-23:59"
        },
        {
          "@type": "LocalBusiness",
          "@id": "https://influencecreators.marketing/#coral-gables",
          "name": "Influence - Coral Gables",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Coral Gables",
            "addressRegion": "FL",
            "addressCountry": "US"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 25.7215,
            "longitude": -80.2684
          },
          "openingHours": "Mo-Su 00:00-23:59"
        }
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "bestRating": "5",
        "worstRating": "1",
        "ratingCount": "47",
        "reviewCount": "47"
      },
      "review": [
        {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "Marcus T."
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "reviewBody": "Booked 3 creators for my music video shoot in Miami. The whole process took under 10 minutes online and the creators showed up professional and ready. My video has been performing great.",
          "datePublished": "2026-04-12"
        },
        {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "Priya S."
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "reviewBody": "Used the Business Content service for our salon. The model came in, created 8 reels in one session, and they got 10x the engagement of anything we had posted before. Worth every penny.",
          "datePublished": "2026-03-28"
        },
        {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "DJ Lucid"
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "reviewBody": "Ordered the Triple Pack for my new single. Got 3 reaction videos back within 5 days. Each one felt genuine and got solid engagement. Will definitely book again for my next drop.",
          "datePublished": "2026-05-01"
        },
        {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "Sarah K."
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "reviewBody": "Hired models for our restaurant launch event in Wynwood. The creators were professional, engaging with guests, and created amazing content for our social media. Highly recommend!",
          "datePublished": "2026-06-15"
        },
        {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "Michael R."
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "reviewBody": "Booked a UGC creator for our e-commerce brand. The content quality was exceptional and conversion rates increased by 40%. Best investment we made this quarter.",
          "datePublished": "2026-07-22"
        }
      ],
      "offers": [
        {
          "@type": "Offer",
          "name": "UGC Content Creation",
          "price": "300",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "url": "https://influencecreators.marketing/services/content"
        },
        {
          "@type": "Offer",
          "name": "Business Content & Brand Ambassadors",
          "price": "300",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "url": "https://influencecreators.marketing/services/business"
        },
        {
          "@type": "Offer",
          "name": "Event Creators & Hosting",
          "price": "400",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "url": "https://influencecreators.marketing/services/events"
        },
        {
          "@type": "Offer",
          "name": "Music Video Creators",
          "price": "500",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "url": "https://influencecreators.marketing/services/shoots"
        }
      ]
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://influencecreators.marketing/#localbusiness",
      "name": "Influence",
      "description": "Miami's premier creator marketing marketplace. Book verified influencers for UGC content creation, music promotion, brand campaigns, event hosting, and content orderings in South Florida and Miami.",
      "url": "https://influencecreators.marketing",
      "telephone": "+15612877194",
      "email": "influencemodelsagency@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Miami",
        "addressRegion": "FL",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 25.76168,
        "longitude": -80.19178
      },
      "areaServed": [
        {
          "@type": "City",
          "name": "Miami"
        },
        {
          "@type": "City",
          "name": "Fort Lauderdale"
        },
        {
          "@type": "City",
          "name": "Hollywood"
        },
        {
          "@type": "City",
          "name": "Orlando"
        },
        {
          "@type": "City",
          "name": "Boca Raton"
        },
        {
          "@type": "City",
          "name": "Palm Beach"
        },
        {
          "@type": "City",
          "name": "West Palm Beach"
        },
        {
          "@type": "City",
          "name": "Delray Beach"
        },
        {
          "@type": "City",
          "name": "Pompano Beach"
        },
        {
          "@type": "City",
          "name": "Hallandale Beach"
        },
        {
          "@type": "City",
          "name": "Aventura"
        },
        {
          "@type": "City",
          "name": "Sunny Isles Beach"
        },
        {
          "@type": "City",
          "name": "Miami Beach"
        },
        {
          "@type": "City",
          "name": "Coral Gables"
        },
        {
          "@type": "City",
          "name": "Key Biscayne"
        },
        {
          "@type": "State",
          "name": "Florida"
        }
      ],
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "00:00",
        "closes": "23:59"
      },
      "priceRange": "$300-$5,000",
      "paymentAccepted": [
        "Credit Card",
        "Debit Card",
        "Stripe"
      ],
      "currenciesAccepted": "USD",
      "foundingDate": "2024",
      "logo": "https://influencecreators.marketing/logo.png",
      "sameAs": [
        "https://www.instagram.com/influencecreators.marketing",
        "https://www.tiktok.com/@influencemodelsagency",
        "https://www.wikidata.org/wiki/Q140179528"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Creator Marketing Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "UGC Content Creation",
              "description": "User-generated content videos, Instagram reels, TikToks, and brand promotional content created by verified influencers."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Music Promotion",
              "description": "Song reaction videos, album livestreams, and music content promotion across TikTok and Instagram by influencers."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Event Hosting & Content Ordering",
              "description": "Book professional creators for event hosting, party promotions, club appearances, and brand activations in South Florida."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Business Content Creation",
              "description": "Professional creators visit your business location to create reels, stories, and promotional content on-site. Perfect for restaurants, salons, gyms, and retail."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Commercial Production",
              "description": "Professional creators and actresses for scripted commercial productions, national campaigns, and broadcast-quality content."
            }
          }
        ]
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://influencecreators.marketing/#website",
      "url": "https://influencecreators.marketing",
      "name": "Influence",
      "publisher": {
        "@id": "https://influencecreators.marketing/#organization"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much does it cost to hire an influencer?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Influencer pricing varies based on the service type, influencer following, and deliverables. Services include UGC content creation, music promotion, business content visits, event hosting, and commercial production. Contact us for a custom quote based on your specific needs."
          }
        },
        {
          "@type": "Question",
          "name": "How do I book an influencer for my business?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can book influencers through our online booking system. Select your service type (UGC, business content, events, etc.), choose your budget, and complete the booking in under 2 minutes. We also offer phone consultations for custom campaigns."
          }
        },
        {
          "@type": "Question",
          "name": "What services do you offer?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We offer UGC content creation, music reaction videos, business content visits (models at your location), event hosting and content ordering, music video creators, commercial production with speaking roles, and brand ambassador services."
          }
        },
        {
          "@type": "Question",
          "name": "Do you serve areas outside Miami?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we serve all of South Florida including Miami, Fort Lauderdale, Boca Raton, Palm Beach, and Orlando. For remote services like UGC and music reactions, we work nationwide."
          }
        },
        {
          "@type": "Question",
          "name": "How fast can I get content delivered?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "UGC and music reaction content is typically delivered within 3-5 days. Business content visits deliver same-day or within 24 hours. Event hosting is scheduled based on your event date. Rush delivery is available for urgent projects."
          }
        }
      ]
    }
  ]
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
      <body className={`${inter.variable} ${bodoni.variable} ${bebas.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <PostHogProvider>
          <Suspense fallback={null}><PostHogPageView /></Suspense>
          <SiteChrome>{children}</SiteChrome>
          <ChatFunnel />
          <GlobalLeadPopup />
        </PostHogProvider>
      </body>
    </html>
  );
}
