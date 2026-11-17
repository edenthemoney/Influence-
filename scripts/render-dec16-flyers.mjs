/**
 * Regenerates Dec 16 Instagram story (1080x1920) and feed (1080x1350) flyers.
 * Usage: node scripts/render-dec16-flyers.mjs
 * Requires: puppeteer (devDep), fonts + images staged under /tmp/dec16-flyers (see scripts/dec16-flyers/).
 */
import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dir = process.env.DEC16_FLYER_DIR || '/tmp/dec16-flyers';
const outDir = path.join(root, 'public/dec16-assets');

async function shot(page, file, w, h, out) {
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
  await page.goto(`file://${path.join(dir, file)}`, { waitUntil: 'networkidle0', timeout: 90000 });
  await page.evaluate(async () => { await document.fonts.ready; });
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: out, type: 'png', clip: { x: 0, y: 0, width: w, height: h } });
  console.log('wrote', out);
}

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files'],
});
const page = await browser.newPage();
await shot(page, 'story.html', 1080, 1920, path.join(outDir, 'dec16-story-flyer.png'));
await shot(page, 'feed.html', 1080, 1350, path.join(outDir, 'dec16-feed-flyer.png'));
await browser.close();
console.log('Done. Convert JPG/WebP previews with Pillow if needed.');
