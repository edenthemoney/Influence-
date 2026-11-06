import type { Metadata, Viewport } from "next";
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
  metadataBase: new URL("https://influencecreators.marketing"),
  title: {
    default: "Influence — South Florida Influencer Marketing Agency | UGC, Music Promo, Events",
    template: "%s | Influence",
  },
  description: "South Florida influencer marketing agency. Office in Boca Raton. Book creators for UGC, music videos, brand campaigns, and events across Miami and South Florida.",
  keywords: ["influencer marketing agency", "UGC content creation", "music promotion", "brand campaigns", "event models", "Miami marketing agency", "South Florida influencers", "social media marketing", "influencer campaigns"],
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
    siteName: 'Influence',
    title: "Influence — South Florida Influencer Marketing Agency",
    description: "Book creators for UGC, music videos, brand campaigns, and events. Office in Boca Raton. Serving Miami and South Florida.",
    url: "./",
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
  verification: {
    google: "S8edkciJVfvUt7rZ_TIuu0UEZ9Im8lGKbh3Ix2qq0tE",
  },
  alternates: {
    canonical: "./",
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
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
