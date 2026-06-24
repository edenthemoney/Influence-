const sharp = require('sharp');
const fs = require('fs');

(async () => {
  // Stripe-optimized: 512x512 PNG with black bg, Stripe-friendly
  await sharp('public/concepts/monogram-stripe.svg', { density: 300 })
    .resize(512, 512)
    .png({ quality: 100, compressionLevel: 9 })
    .toFile('public/logo_stripe.png');
  console.log('logo_stripe.png:', fs.statSync('public/logo_stripe.png').size, 'bytes');

  // Square monogram PNG (transparent bg) for favicon/social
  await sharp('public/concepts/monogram.svg', { density: 300 })
    .resize(512, 512)
    .png({ quality: 100 })
    .toFile('public/logo_mark.png');
  console.log('logo_mark.png:', fs.statSync('public/logo_mark.png').size, 'bytes');

  // Wide wordmark PNG (for fallback / email signatures)
  await sharp('public/concepts/wordmark.svg', { density: 300 })
    .resize(1600, 400)
    .png({ quality: 100 })
    .toFile('public/logo.png');
  console.log('logo.png:', fs.statSync('public/logo.png').size, 'bytes');

  // Favicons (16, 32, 180, 512)
  for (const size of [16, 32, 180]) {
    await sharp('public/concepts/monogram.svg', { density: 300 })
      .resize(size, size)
      .png()
      .toFile(`public/favicon-${size}.png`);
  }
  fs.copyFileSync('public/favicon-32.png', 'public/favicon.png');
  console.log('favicon PNGs generated (16/32/180)');

  console.log('DONE');
})().catch(e => { console.error(e); process.exit(1); });
