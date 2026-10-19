/**
 * Side-by-side homepage shots: live site on the left, this branch on the right.
 * Usage: NODE_PATH=/workspace/node_modules node scripts/compare-home.cjs http://127.0.0.1:3456
 */
const fs = require('fs');
const path = require('path');
const { webkit } = require('playwright');
const sharp = require('sharp');

const local = process.argv[2] || 'http://127.0.0.1:3456';
const live = 'https://influencecreators.marketing';
const outDir = '/opt/cursor/artifacts';
fs.mkdirSync(outDir, { recursive: true });

async function shot(page, url, file, fullPage) {
  await page.goto(url, { waitUntil: 'load', timeout: 60000 });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: file, fullPage });
}

async function pad(file, height) {
  const image = sharp(file);
  const meta = await image.metadata();
  if (meta.height >= height) return image.png().toBuffer();
  return image.extend({ bottom: height - meta.height, background: { r: 8, g: 8, b: 8 } }).png().toBuffer();
}

async function pair(leftFile, rightFile, dest) {
  const leftMeta = await sharp(leftFile).metadata();
  const rightMeta = await sharp(rightFile).metadata();
  const height = Math.max(leftMeta.height, rightMeta.height);
  const leftBuf = await pad(leftFile, height);
  const rightBuf = await pad(rightFile, height);
  await sharp({
    create: {
      width: leftMeta.width + rightMeta.width + 16,
      height,
      channels: 3,
      background: { r: 20, g: 20, b: 20 },
    },
  })
    .composite([
      { input: leftBuf, left: 0, top: 0 },
      { input: rightBuf, left: leftMeta.width + 16, top: 0 },
    ])
    .png()
    .toFile(dest);
}

(async () => {
  const browser = await webkit.launch();
  const jobs = [
    { width: 390, height: 844, name: '390' },
    { width: 1440, height: 900, name: '1440' },
  ];
  for (const job of jobs) {
    const page = await browser.newPage({ viewport: { width: job.width, height: job.height }, deviceScaleFactor: 1 });
    await page.addInitScript(() => {
      sessionStorage.setItem('lead_popup_seen', '1');
      sessionStorage.setItem('lead_popup_dismissed', '1');
    });
    const liveHero = path.join(outDir, `live-${job.name}-hero.png`);
    const localHero = path.join(outDir, `local-${job.name}-hero.png`);
    const liveFull = path.join(outDir, `live-${job.name}-full.png`);
    const localFull = path.join(outDir, `local-${job.name}-full.png`);
    await shot(page, live, liveHero, false);
    await shot(page, live, liveFull, true);
    await shot(page, local, localHero, false);
    await shot(page, local, localFull, true);
    await pair(liveHero, localHero, path.join(outDir, `compare-home-${job.name}-hero.png`));
    await pair(liveFull, localFull, path.join(outDir, `compare-home-${job.name}-full.png`));
    await page.close();
    console.log('saved', job.name);
  }
  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
