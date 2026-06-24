import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Influence Outreach Dashboard',
  description: 'Cold outreach tool for Influence agency',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0a] text-white min-h-screen">{children}</body>
    </html>
  );
}
