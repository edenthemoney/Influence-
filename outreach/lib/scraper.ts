import * as cheerio from 'cheerio';

const EMAIL_REGEX = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g;

// Common junk emails to ignore
const JUNK = new Set([
  'example@example.com', 'email@example.com', 'name@domain.com',
  'support@spotify.com', 'info@spotify.com', 'noreply@spotify.com',
  'contact@linktree.com', 'help@instagram.com', 'support@apple.com',
  'privacy@spotify.com', 'support@distrokid.com',
  'error-lite@duckduckgo.com', 'noreply@duckduckgo.com',
]);

function cleanEmails(raw: string[]): string[] {
  return [...new Set(
    raw
      .map(e => e.toLowerCase().trim())
      .filter(e => !JUNK.has(e))
      .filter(e => !e.endsWith('.png') && !e.endsWith('.jpg') && !e.endsWith('.svg'))
      .filter(e => !e.includes('sentry') && !e.includes('webpack') && !e.includes('wix') && !e.includes('duckduckgo') && !e.includes('cloudflare'))
  )];
}

export async function scrapeWebsite(url: string): Promise<{ emails: string[]; socials: Record<string, string> }> {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36' },
      signal: AbortSignal.timeout(10000),
    });
    const html = await res.text();
    const $ = cheerio.load(html);

    // Extract emails from page content
    const bodyText = $('body').text();
    const hrefEmails = $('a[href^="mailto:"]').map((_, el) => $(el).attr('href')?.replace('mailto:', '') || '').get();
    const pageEmails = bodyText.match(EMAIL_REGEX) || [];
    const emails = cleanEmails([...pageEmails, ...hrefEmails]);

    // Extract social links
    const socials: Record<string, string> = {};
    $('a[href]').each((_, el) => {
      const href = $(el).attr('href') || '';
      if (href.includes('instagram.com/') && !socials.instagram) socials.instagram = href;
      if (href.includes('twitter.com/') && !socials.twitter) socials.twitter = href;
      if (href.includes('x.com/') && !socials.twitter) socials.twitter = href;
      if (href.includes('tiktok.com/') && !socials.tiktok) socials.tiktok = href;
      if (href.includes('youtube.com/') && !socials.youtube) socials.youtube = href;
      if (href.includes('facebook.com/') && !socials.facebook) socials.facebook = href;
      if (href.includes('soundcloud.com/') && !socials.soundcloud) socials.soundcloud = href;
    });

    return { emails, socials };
  } catch {
    return { emails: [], socials: {} };
  }
}

export async function scrapeLinktree(username: string): Promise<{ emails: string[]; links: string[] }> {
  try {
    const res = await fetch(`https://linktr.ee/${username}`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36' },
      signal: AbortSignal.timeout(10000),
    });
    const html = await res.text();
    const emails = cleanEmails(html.match(EMAIL_REGEX) || []);
    const $ = cheerio.load(html);
    const links = $('a[href]').map((_, el) => $(el).attr('href') || '').get().filter(l => l.startsWith('http'));
    return { emails, links };
  } catch {
    return { emails: [], links: [] };
  }
}

export async function findContactInfo(artistName: string, spotifyUrl?: string): Promise<{
  emails: string[];
  instagram?: string;
  website?: string;
}> {
  const results: string[] = [];
  let instagram: string | undefined;
  let website: string | undefined;

  // 1. Try scraping the Spotify artist page for linked website/socials
  if (spotifyUrl) {
    try {
      const res = await fetch(spotifyUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36' },
        signal: AbortSignal.timeout(8000),
      });
      const html = await res.text();
      const $ = cheerio.load(html);
      // Spotify pages sometimes have links to artist's external sites
      $('a[href]').each((_, el) => {
        const href = $(el).attr('href') || '';
        if (href.includes('instagram.com/') && !instagram) instagram = href;
        if (href.startsWith('http') && !href.includes('spotify.com') && !href.includes('facebook.com/login') && !href.includes('apple.com') && !website) {
          website = href;
        }
      });
      // Look for emails in the page
      const pageEmails = html.match(EMAIL_REGEX) || [];
      results.push(...pageEmails);
    } catch {}
  }

  // 2. If we found a website from Spotify, scrape it for emails
  if (website) {
    const scraped = await scrapeWebsite(website);
    results.push(...scraped.emails);
    if (scraped.socials.instagram && !instagram) instagram = scraped.socials.instagram;
  }

  // 3. Try DuckDuckGo search
  try {
    const query = encodeURIComponent(`"${artistName}" email contact booking`);
    const res = await fetch(`https://lite.duckduckgo.com/lite/?q=${query}`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36' },
      signal: AbortSignal.timeout(8000),
    });
    const html = await res.text();
    const $ = cheerio.load(html);

    // Extract emails directly from search results text
    const searchEmails = html.match(EMAIL_REGEX) || [];
    results.push(...searchEmails);

    // Get result URLs - DDG lite uses various link structures
    const urls: string[] = [];
    $('a[href]').each((_, el) => {
      const href = $(el).attr('href') || '';
      if (href.startsWith('http') && !href.includes('duckduckgo') && !href.includes('google.com') && !href.includes('bing.com')) {
        urls.push(href);
        if (href.includes('instagram.com/') && !instagram) instagram = href;
      }
    });

    // Scrape top 3 unique results for emails
    const scraped = new Set<string>();
    for (const url of urls) {
      if (scraped.size >= 3) break;
      const domain = new URL(url).hostname;
      if (scraped.has(domain)) continue;
      if (domain.includes('instagram.com') || domain.includes('spotify.com') || domain.includes('youtube.com') || domain.includes('tiktok.com') || domain.includes('twitter.com') || domain.includes('x.com')) continue;
      scraped.add(domain);
      if (!website) website = url;
      const result = await scrapeWebsite(url);
      results.push(...result.emails);
      if (result.socials.instagram && !instagram) instagram = result.socials.instagram;
    }
  } catch {}

  // 4. Try common artist website patterns
  if (results.length === 0) {
    const slugs = [
      artistName.toLowerCase().replace(/\s+/g, ''),
      artistName.toLowerCase().replace(/\s+/g, '-'),
    ];
    for (const slug of slugs) {
      for (const domain of ['linktr.ee', `${slug}.com`]) {
        try {
          const url = domain.startsWith('linktr') ? `https://linktr.ee/${slug}` : `https://${domain}`;
          const scraped = await scrapeWebsite(url);
          if (scraped.emails.length > 0) {
            results.push(...scraped.emails);
            if (!website) website = url;
            if (scraped.socials.instagram && !instagram) instagram = scraped.socials.instagram;
            break;
          }
        } catch {}
      }
      if (results.length > 0) break;
    }
  }

  return { emails: cleanEmails(results), instagram, website };
}
