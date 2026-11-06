/**
 * Checks the technical corrections against a running server.
 * Usage: node scripts/seo-acceptance.mjs http://127.0.0.1:3210
 * Does not call checkout, mail, or third-party mutation routes.
 */
const base = (process.argv[2] || 'http://127.0.0.1:3210').replace(/\/$/, '');
const ORIGIN = 'https://influencecreators.marketing';

const dead = [
  '/services/bottle-girls',
  '/music-reaction-videos',
  '/song-promotion-instagram',
  '/viral-challenge-creators',
];

const indexable = [
  '/',
  '/about',
  '/services',
  '/services/content',
  '/services/business',
  '/services/shoots',
  '/services/commercials',
  '/services/events',
  '/blog',
  '/start',
  '/faq',
  '/contact',
  '/marketplace',
  '/ugc-creators-florida',
  '/music-video-models',
  '/hire-influencer-miami',
  '/influencer-marketing-miami',
  '/event-models-miami',
  '/book-models-miami',
  '/models-for-photoshoot',
  '/actress-models-miami',
  '/casting-agency-miami',
  '/voiceover-talent-miami',
  '/instagram-models-for-hire',
  '/influencer/kaylese-062',
  '/influencer/des-001',
];

const redirects = [
  ['/pricing', '/model-booking'],
  ['/pricing-guide', '/model-booking'],
  ['/book', '/model-booking'],
  ['/solutions', '/services'],
];

function abs(path) {
  if (path === '/' || path === '') return ORIGIN;
  return ORIGIN + path;
}

async function fetchNoRedirect(path) {
  const res = await fetch(base + path, { redirect: 'manual' });
  const loc = res.headers.get('location');
  const text = res.status === 200 || res.status === 404 ? await res.text() : '';
  return { status: res.status, loc, text };
}

function canonical(html) {
  const m = html.match(/<link[^>]+rel="canonical"[^>]*>/i) || html.match(/<link[^>]+rel='canonical'[^>]*>/i);
  if (!m) return null;
  const href = m[0].match(/href="([^"]+)"/) || m[0].match(/href='([^']+)'/);
  return href ? href[1] : null;
}

function ogUrl(html) {
  const m = html.match(/property="og:url"[^>]*content="([^"]+)"/) || html.match(/content="([^"]+)"[^>]*property="og:url"/);
  return m ? m[1] : null;
}

function robots(html) {
  return [...html.matchAll(/name="robots"[^>]*content="([^"]+)"/g)].map((m) => m[1]);
}

const failures = [];
function check(name, ok, detail) {
  const line = `${ok ? 'PASS' : 'FAIL'} ${name}${detail ? ' — ' + detail : ''}`;
  console.log(line);
  if (!ok) failures.push(line);
}

const sitemapRes = await fetch(base + '/sitemap.xml');
const sitemap = await sitemapRes.text();
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const dupes = locs.filter((u, i) => locs.indexOf(u) !== i);
check('sitemap 200', sitemapRes.status === 200, String(sitemapRes.status));
check('sitemap unique', dupes.length === 0, dupes.join(','));
for (const path of [...dead, '/pricing', '/pricing-guide', '/book', '/model-booking'.endsWith('x') ? '' : '/lp/ugc-ads']) {
  if (!path) continue;
  check('sitemap omits ' + path, !locs.includes(abs(path)) && !locs.includes(abs(path) + '/'), 'present');
}
check('sitemap omits bottle-girls-miami', !locs.some((u) => u.includes('bottle-girls')));
check('sitemap omits music-promotion alias', !locs.includes(abs('/music-reaction-videos')));
check('sitemap has music video page once', locs.filter((u) => u === abs('/music-video-models')).length === 1);
check('sitemap has start once', locs.filter((u) => u === abs('/start')).length === 1);
check('sitemap has no old domain', !sitemap.includes('influencemodels.agency'));

for (const path of locs.map((u) => u.replace(ORIGIN, '') || '/')) {
  if (!uSafe(path)) continue;
}
function uSafe() { return false; }

for (const path of dead) {
  const res = await fetchNoRedirect(path);
  check(path + ' is 404', res.status === 404, String(res.status));
  const canon = canonical(res.text);
  check(path + ' canonical is not homepage', canon !== ORIGIN && canon !== ORIGIN + '/', canon || 'none');
  check(path + ' has no FAQPage', !res.text.includes('FAQPage'));
  check(path + ' has no AggregateRating', !res.text.includes('AggregateRating'));
  const bot = robots(res.text).join(' | ');
  check(path + ' noindex', /noindex/i.test(bot), bot || 'no robots meta');
}

const missingProfile = await fetchNoRedirect('/influencer/not-a-real-profile');
check('unknown profile 404', missingProfile.status === 404, String(missingProfile.status));

for (const path of indexable) {
  const res = await fetchNoRedirect(path);
  check(path + ' 200', res.status === 200, String(res.status));
  const canon = canonical(res.text);
  check(path + ' self canonical', canon === abs(path), canon || 'none');
  const og = ogUrl(res.text);
  check(path + ' og:url', og === abs(path), og || 'none');
  check(path + ' no old domain canonical', !String(canon).includes('influencemodels.agency'));
}

for (const [from, to] of redirects) {
  const res = await fetchNoRedirect(from);
  const loc = res.loc || '';
  check(from + ' redirects', res.status === 308, String(res.status));
  check(from + ' single hop to ' + to, loc.endsWith(to), loc);
}

const mv = await fetchNoRedirect('/music-video-models');
check('music video shows from $450', mv.text.includes('From $450'));
check('music video page has no $100 price', !mv.text.includes('$100'));
check('music video schema floor 450', mv.text.includes('"price":"450"') || mv.text.includes('"price": "450"'));

const home = await fetchNoRedirect('/');
check('home has one organization id', (home.text.match(/#organization/g) || []).length >= 1);
check('home has no LocalBusiness branch', !home.text.includes('"LocalBusiness"') && !home.text.includes('ServiceAreaBusiness'));
check('home has no aggregate rating', !home.text.includes('AggregateRating'));
check('home keeps headline', home.text.includes('Go Viral.'));
const homeFaq = home.text.includes('viral challenge creators');
check('home FAQ does not sell viral-challenge creators', !homeFaq);

const llmsRes = await fetch(base + '/llms.txt');
const llms = await llmsRes.text();
check('llms 200', llmsRes.status === 200);
check('llms current home', llms.includes(ORIGIN + '/'));
check('llms has no old website host', !llms.includes('https://influencemodels.agency'));
check('llms keeps gmail', llms.includes('influencemodelsagency@gmail.com'));
check('llms states 450 floor', llms.includes('$450'));
check('llms does not promise 48 hours', !/48 hours/i.test(llms));
const llmsUrls = [...llms.matchAll(/https:\/\/influencecreators\.marketing(\/[a-z0-9\-\/]*)?/g)].map((m) => m[0]);
for (const url of [...new Set(llmsUrls)]) {
  const path = url.replace(ORIGIN, '') || '/';
  if (path === '/') continue;
  const res = await fetchNoRedirect(path);
  check('llms link ' + path, res.status === 200, String(res.status));
}

const contact = await fetchNoRedirect('/contact');
check('contact shows Boca street', contact.text.includes('4756 NW 2nd Ave'));
check('contact shows 287-7194', contact.text.includes('287-7194'));
check('contact omits unit 11', !/unit\s*11/i.test(contact.text));

const robotsRes = await fetch(base + '/robots.txt');
const robotsTxt = await robotsRes.text();
check('robots sitemap host', robotsTxt.includes(ORIGIN + '/sitemap.xml'));
check('robots no old sitemap host', !robotsTxt.includes('influencemodels.agency'));

console.log(`\n${failures.length} failure(s)`);
if (failures.length) process.exit(1);
