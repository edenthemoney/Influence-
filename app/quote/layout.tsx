import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Get a Custom Quote — Influencer Campaigns, Music Videos & Events",
  description: "Request a custom quote for influencer campaigns, music videos, event hosting, UGC content, or commercial productions. Tell us your project and budget — we'll respond with a tailored proposal.",
  openGraph: {
    title: "Get a Custom Quote — Influence",
    description: "Custom quotes for influencer campaigns, music videos, events, UGC, and commercial productions. Fast, tailored proposals.",
    url: "https://influencecreators.marketing/quote",
  },
  alternates: { canonical: "https://influencecreators.marketing/quote" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
