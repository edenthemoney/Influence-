'use client';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// Project API key (phc_...). Set NEXT_PUBLIC_POSTHOG_KEY to enable analytics.
// The value previously hard-coded here was a personal API key (phx_), which PostHog rejects in the browser.
const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY || '';
const POSTHOG_ENABLED = POSTHOG_KEY.startsWith('phc_');
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';

export function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (POSTHOG_ENABLED && pathname && posthog) {
      let url = window.origin + pathname;
      if (searchParams.toString()) url += '?' + searchParams.toString();
      posthog.capture('$pageview', { $current_url: url });
    }
  }, [pathname, searchParams]);

  return null;
}

export default function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (!POSTHOG_ENABLED) return;
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      capture_pageview: false, // we handle manually above
      capture_pageleave: true,
      autocapture: true,
    });
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
