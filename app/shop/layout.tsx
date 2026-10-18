import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Shop — Influence Merch | Official Apparel & Accessories",
  description: "Shop official Influence merch — premium apparel and accessories. Limited drops, fast shipping.",
  openGraph: {
    title: "Shop — Influence Merch",
    description: "Official Influence apparel and accessories. Limited drops.",
    url: "https://influencecreators.marketing/shop",
  },
  alternates: { canonical: "https://influencecreators.marketing/shop" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
