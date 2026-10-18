'use client';

import { usePathname } from 'next/navigation';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

const EXCLUDED = ['/tickets', '/nov18', '/admin', '/proposal', '/logo-preview'];

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '/';
  const bare = pathname === '/' || EXCLUDED.some((path) => pathname === path || pathname.startsWith(`${path}/`));

  if (bare) return <>{children}</>;

  return (
    <div className="site-page min-h-screen bg-[#f6f1e7] text-[#0c0c0c]">
      <SiteHeader />
      <div className="site-page-body">{children}</div>
      <SiteFooter />
    </div>
  );
}
