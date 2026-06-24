import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Bebas_Neue } from "next/font/google";
import { Suspense } from "react";
import PostHogProvider, { PostHogPageView } from "./components/PostHogProvider";
import ChatFunnel from './components/ChatFunnel';
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
});
const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-heading",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://influencemodels.agency"),
  title: {
    default: "Influence — South Florida Influencer Marketing Agency | UGC, Music Promo, Events",
    template: "%s | Influence",
  },
  description: "South Florida influencer marketing agency. Book verified influencers for UGC content, music promotion, brand campaigns, event hosting & model bookings. Trusted by artists, brands & record labels. Based in Miami.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
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
    "TikTok viral challenge marketing",
    "Instagram reels for music promotion",
    "UGC creators Miami",
    "social media trend creation",
    "influencer agency South Florida",
    "music video models Miami",
    "song promotion agency",
  ],
  verification: {
    google: "S8edkciJVfvUt7rZ_TIuu0UEZ9Im8lGKbh3Ix2qq0tE",
  },
  alternates: {
    canonical: "https://influencemodels.agency",
  },
  openGraph: {
    title: "Influence — South Florida Influencer Marketing Agency",
    description: "Book verified influencers for UGC content, music promotion, brand campaigns & event hosting. Based in South Florida / Miami.",
    url: "https://influencemodels.agency",
    siteName: "Influence",
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
    card: "summary_large_image",
    title: "Influence — South Florida Influencer Marketing Agency",
    description: "Book verified influencers for UGC, music promo, brand campaigns & events. Miami / South Florida.",
    images: ["/og-image.jpg"],
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
      description: "South Florida's premier influencer marketing agency. Book verified models and influencers for music videos, UGC content, events, brand campaigns, and business promotions. Celebrity-connected talent with credits including Sean Paul, Bryson Tiller, Kai Cenat, Forbes, and Fenty Beauty. Starting at $300.",
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
        { "@type": "City", name: "Miami" },
        { "@type": "City", name: "Boca Raton" },
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
        availableLanguage: "English",
      },
      numberOfEmployees: { "@type": "QuantitativeValue", minValue: 20, maxValue: 30 },
      keywords: "hire model Miami, book influencer, UGC agency, music video models, influencer for hire, model booking agency, event models Miami",
    },
    {
      "@type": "LocalBusiness",
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
      areaServed: [
        { "@type": "City", name: "Miami" },
        { "@type": "City", name: "Fort Lauderdale" },
        { "@type": "City", name: "Hollywood" },
        { "@type": "City", name: "Orlando" },
        { "@type": "City", name: "Boca Raton" },
        { "@type": "State", name: "Florida" },
      ],
      priceRange: "$100 - $5000",
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
      sameAs: [
        "https://www.instagram.com/influencemodels.agency",
        "https://www.tiktok.com/@influencemodelsagency",
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
        </PostHogProvider>
      </body>
    </html>
  );
}
