/**
 * Contrast and mobile type check.
 * Fails when visible text is under 4.5:1, or under 13px at a 390px viewport.
 * Usage: NODE_PATH=/workspace/node_modules node scripts/contrast.cjs http://127.0.0.1:3456
 */
const fs = require('fs');
const path = require('path');
const { webkit } = require('playwright');
const sharp = require('sharp');

const base = process.argv[2] || 'http://127.0.0.1:3456';
const outDir = '/tmp/contrast';
fs.mkdirSync(outDir, { recursive: true });

function routes() {
  const root = path.join(process.cwd(), 'app');
  const found = [];
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (['admin', 'api', 'outreach'].includes(entry.name)) continue;
        walk(full);
      } else if (entry.name === 'page.tsx') {
        let route = '/' + path.relative(root, dir).replace(/\\/g, '/');
        if (route === '/.') route = '/';
        if (route.includes('[')) continue;
        if (route.startsWith('/proposal') || route.startsWith('/booking/success') || route.startsWith('/shop/success')) continue;
        found.push(route === '/' ? '/' : route.replace(/\/$/, ''));
      }
    }
  }
  walk(root);
  found.push('/influencer/des-001');
  return [...new Set(found)];
}

function parseCss(color) {
  const match = String(color).match(/rgba?\(([^)]+)\)/);
  if (!match) return null;
  const parts = match[1].split(',').map((part) => parseFloat(part.trim()));
  return { r: parts[0], g: parts[1], b: parts[2], a: parts.length > 3 ? parts[3] : 1 };
}

function linear(channel) {
  const value = channel / 255;
  return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

function luminance(rgb) {
  return 0.2126 * linear(rgb.r) + 0.7152 * linear(rgb.g) + 0.0722 * linear(rgb.b);
}

function contrast(a, b) {
  const l1 = luminance(a);
  const l2 = luminance(b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function composite(fg, bg) {
  const alpha = fg.a == null ? 1 : fg.a;
  return {
    r: fg.r * alpha + bg.r * (1 - alpha),
    g: fg.g * alpha + bg.g * (1 - alpha),
    b: fg.b * alpha + bg.b * (1 - alpha),
  };
}

async function collect(page, checkSize) {
  return page.evaluate((checkSizeFlag) => {
    const nodes = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let current;
    while ((current = walker.nextNode())) {
      const raw = (current.textContent || '').replace(/\s+/g, ' ').trim();
      if (!raw) continue;
      const el = current.parentElement;
      if (!el) continue;
      const tag = el.tagName;
      if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA', 'OPTION'].includes(tag)) continue;
      if (el.closest('[data-claim-hidden], [aria-hidden="true"]')) continue;
      const style = getComputedStyle(el);
      if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0) continue;
      const rect = el.getBoundingClientRect();
      if (rect.width < 4 || rect.height < 4) continue;
      const fontSize = parseFloat(style.fontSize);
      nodes.push({
        text: raw.slice(0, 90),
        color: style.color,
        fontSize,
        x: Math.max(0, rect.left + Math.min(8, rect.width / 2)),
        y: Math.max(0, rect.top + window.scrollY + rect.height / 2),
        small: checkSizeFlag && fontSize < 12.5,
      });
    }
    return nodes;
  }, checkSize);
}

async function scanViewport(browser, width, height, checkSize) {
  const failures = [];
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  await page.addInitScript(() => {
    sessionStorage.setItem('lead_popup_seen', '1');
    sessionStorage.setItem('lead_popup_dismissed', '1');
    sessionStorage.setItem('lead_popup_submitted', '1');
  });
  for (const route of routes()) {
    const url = base + route;
    let response;
    try {
      response = await page.goto(url, { waitUntil: 'load', timeout: 45000 });
    } catch (error) {
      failures.push({ route, width, kind: 'load', text: String(error).slice(0, 160) });
      continue;
    }
    if (!response || response.status() >= 400) {
      failures.push({ route, width, kind: 'status', text: String(response ? response.status() : 'no response') });
      continue;
    }
    await page.waitForTimeout(400);
    const nodes = await collect(page, checkSize);
    await page.addStyleTag({
      content: 'body * { color: transparent !important; text-shadow: none !important; -webkit-text-fill-color: transparent !important; }',
    });
    const file = path.join(outDir, `${width}-${route.replace(/[^a-z0-9]+/gi, '_') || 'home'}.png`);
    await page.screenshot({ path: file, fullPage: true });
    const image = sharp(file);
    const meta = await image.metadata();
    const buffer = await image.raw().toBuffer();
    const seen = new Set();
    for (const node of nodes) {
      if (node.small) {
        const key = `size:${route}:${node.text}`;
        if (!seen.has(key)) {
          seen.add(key);
          failures.push({ route, width, kind: 'size', text: node.text, detail: `${node.fontSize}px` });
        }
      }
      const x = Math.min(meta.width - 1, Math.max(0, Math.round(node.x)));
      const y = Math.min(meta.height - 1, Math.max(0, Math.round(node.y)));
      const index = (y * meta.width + x) * meta.channels;
      const bg = { r: buffer[index], g: buffer[index + 1], b: buffer[index + 2] };
      const fg = parseCss(node.color);
      if (!fg || !bg || Number.isNaN(bg.r)) continue;
      const ratio = contrast(composite(fg, bg), bg);
      if (ratio < 4.5) {
        const key = `contrast:${route}:${node.text}:${Math.round(ratio * 10)}`;
        if (seen.has(key)) continue;
        seen.add(key);
        failures.push({
          route,
          width,
          kind: 'contrast',
          text: node.text,
          detail: `${ratio.toFixed(2)}:1 ${node.color}`,
        });
      }
    }
  }
  await page.close();
  return failures;
}

(async () => {
  const browser = await webkit.launch();
  const mobile = await scanViewport(browser, 390, 844, true);
  const desktop = await scanViewport(browser, 1440, 900, false);
  await browser.close();
  const failures = [...mobile, ...desktop];
  const report = {
    checkedAt: new Date().toISOString(),
    base,
    failureCount: failures.length,
    failures: failures.slice(0, 200),
  };
  fs.writeFileSync('/tmp/contrast-report.json', JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ failureCount: failures.length, sample: failures.slice(0, 40) }, null, 2));
  if (failures.length) process.exit(1);
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
