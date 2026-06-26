'use client';

import { usePathname } from 'next/navigation';
import LeadCapturePopup from './LeadCapturePopup';

// Pages where an auto-popup would interrupt an active conversion flow.
const EXCLUDED = [
  '/model-booking',
  '/music-video-booking',
  '/quote',
  '/book',
  '/booking/success',
  '/shop/success',
  '/admin',
];

export default function GlobalLeadPopup() {
  const pathname = usePathname();
  if (!pathname) return null;
  if (EXCLUDED.some((p) => pathname === p || pathname.startsWith(`${p}/`))) return null;
  return <LeadCapturePopup />;
}
