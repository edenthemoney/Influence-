import type { Viewport } from 'next';
import TicketBodyColor from './body-color';

export const viewport: Viewport = {
  themeColor: '#050505',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
};

export default function TicketsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-[#050505] text-[#f7f1e4]">
      <TicketBodyColor />
      {children}
    </div>
  );
}
