/**
 * The chat button must not cover a link or text.
 * WebKit at 390 and 1440. Fails if a visible button intersects either.
 * Usage: NODE_PATH=/workspace/node_modules node scripts/overlap.cjs http://127.0.0.1:3456
 */
const { webkit } = require('playwright');

const base = process.argv[2] || 'http://127.0.0.1:3456';
const routes = ['/', '/marketplace', '/about', '/services', '/join', '/contact'];

async function scan(page) {
  return page.evaluate(() => {
    const button = document.querySelector('[data-chat-button]');
    if (!button) return { visible: false, hits: [] };
    const style = getComputedStyle(button);
    const box = button.getBoundingClientRect();
    const visible = style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity) > 0 && box.width > 1 && box.height > 1;
    if (!visible) return { visible: false, hits: [] };
    const hits = [];
    const seen = new Set();
    const consider = (label, rect) => {
      if (!rect || rect.width < 1 || rect.height < 1) return;
      const hit = box.left < rect.right && box.right > rect.left && box.top < rect.bottom && box.bottom > rect.top;
      if (!hit) return;
      const key = `${label}:${Math.round(rect.top)}`;
      if (seen.has(key)) return;
      seen.add(key);
      hits.push(label.slice(0, 80));
    };
    document.querySelectorAll('a, button').forEach((el) => {
      if (el.closest('[data-chat-root]')) return;
      const elStyle = getComputedStyle(el);
      if (elStyle.display === 'none' || elStyle.visibility === 'hidden') return;
      consider(el.innerText || el.getAttribute('aria-label') || el.tagName, el.getBoundingClientRect());
    });
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node = walker.nextNode();
    while (node) {
      const value = (node.textContent || '').trim();
      const parent = node.parentElement;
      if (value && parent && !parent.closest('[data-chat-root]') && !['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parent.tagName)) {
        const range = document.createRange();
        range.selectNodeContents(node);
        const rects = range.getClientRects();
        for (let i = 0; i < rects.length; i++) consider(value, rects[i]);
      }
      node = walker.nextNode();
    }
    return { visible: true, hits };
  });
}

(async () => {
  const browser = await webkit.launch();
  const failures = [];
  for (const width of [390, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: width === 390 ? 844 : 900 }, deviceScaleFactor: 1 });
    await page.addInitScript(() => {
      sessionStorage.setItem('lead_popup_seen', '1');
      sessionStorage.setItem('lead_popup_dismissed', '1');
    });
    for (const route of routes) {
      await page.goto(base + route, { waitUntil: 'load', timeout: 45000 });
      await page.waitForTimeout(400);
      const height = await page.evaluate(() => document.documentElement.scrollHeight);
      const step = Math.max(200, Math.floor((width === 390 ? 844 : 900) / 2));
      for (let y = 0; y < height; y += step) {
        await page.evaluate((top) => window.scrollTo(0, top), y);
        await page.waitForTimeout(40);
        const result = await scan(page);
        if (result.visible && result.hits.length) {
          failures.push({ width, route, y, hits: result.hits.slice(0, 6) });
        }
      }
      if (route === '/') {
        const link = page.getByRole('link', { name: 'View the roster' }).first();
        const box = await link.boundingBox();
        if (width === 390 && box && box.x > 80) {
          failures.push({ width, route, y: 'layout', hits: [`View the roster starts at x ${Math.round(box.x)}`] });
        }
      }
    }
    await page.close();
  }
  await browser.close();
  console.log(JSON.stringify({ failureCount: failures.length, failures: failures.slice(0, 30) }, null, 2));
  if (failures.length) process.exit(1);
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
