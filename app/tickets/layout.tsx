import type { Viewport } from 'next';
import { Bodoni_Moda } from 'next/font/google';
import TicketBodyColor from './body-color';
import './soiree.css';

// Same type system as the Nov 18 flyer: Bodoni Moda for headlines, Satoshi for labels and UI.
const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  axes: ['opsz'],
  variable: '--font-display',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
};

export default function TicketsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${bodoni.variable} ic-tickets min-h-dvh bg-black text-[#f4efe6]`}>
      {/* Satoshi is served by Fontshare (ITF Free Font License allows web use via the Fontshare API). */}
      <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="" />
      <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="" />
      <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=satoshi@500,700,900&display=swap" />
      <TicketBodyColor />
      {children}
    </div>
  );
}
