#!/usr/bin/env node
/**
 * download-images.js — מוריד את תמונות הקטגוריות שנבחרו ממניפסט החיפוש,
 * מאמת שכל קובץ הוא תמונה אמיתית (חתימת בתים + גודל), וכותב assets/images.js.
 * הרצה: node tools/download-images.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = path.join(__dirname, '..');
const IMG_DIR = path.join(ROOT, 'site', 'assets', 'images');
const BASE = 'https://image-search-mcp-cn-beijing.oss-cn-beijing.aliyuncs.com/image-search-mcp/images-ppt/';

// slug → רשימת [שם קובץ מקומי, מזהה מרוחק]. hero ראשון.
const MANIFEST = {
  barbershop: [['hero', '34bfb4da84e8.jpg'], ['1', '2081609efd6a.jpg'], ['2', 'da744c97e747.jpeg'], ['3', '2fe599569dc8.jpg'], ['4', 'ddc6b9424c83.jpg']],
  salon: [['hero', '372d306eb4f0.jpg'], ['1', '1ec2d12313e3.jpg'], ['2', 'a4c74b604bf1.jpg'], ['3', 'a59dcce82b69.jpg']],
  'phone-repair': [['hero', '606db8cba4c9.jpg'], ['1', '70a3be09e050.jpg'], ['2', 'c59361d636ec.jpg'], ['3', '82a781b8b452.jpg']],
  'computer-repair': [['hero', '117a73dd1672.png'], ['1', '113913ad62aa.jpg'], ['2', 'd0f058a8e9e5.jpg'], ['3', 'a3005b201b18.jpg']],
  cosmetics: [['hero', '7c0fdfa33843.jpg'], ['1', 'fadf71517340.jpg'], ['2', 'b025e9294d52.jpg'], ['3', 'f18e12495db7.jpg']],
  nails: [['hero', 'e4ef2e81fa8a.jpg'], ['1', '306caf8920a4.png'], ['2', '0afc195d975d.jpg'], ['3', '92958e587a55.png']],
  'pet-grooming': [['hero', '896a272582ed.jpeg'], ['1', '20c7fe4feb2b.jpg'], ['2', '4cd31f56ff58.jpg'], ['3', '38a62d2933a7.png'], ['4', 'dd33762586bc.jpg']],
  tires: [['hero', 'bcd7e6c3bb9b.jpg'], ['1', '35aea1033f01.jpg'], ['2', 'caaa88802f15.jpg'], ['3', '1d5b4e6e28b0.jpeg']],
  garage: [['hero', '6e19e8f2d434.jpg'], ['1', 'a0166743e97a.jpg'], ['2', '1bcbf2690491.jpg'], ['3', '36ffa4531a29.jpg']],
  'car-wash': [['hero', '547f38912b9c.webp'], ['1', '820edf020419.jpg'], ['2', 'f8d6f3b89cf0.jpg'], ['3', 'daa1cbd67738.jpg']],
  'body-shop': [['hero', 'baf3158f1443.jpg'], ['1', 'd86e1afb4a60.jpg'], ['2', '98b13fdcebb5.jpg'], ['3', '2e6c0dba0625.png']],
  'driving-school': [['hero', '7c961623f711.jpg'], ['1', 'e3beeec93115.png'], ['2', '053477f3ede2.png'], ['3', 'f4ed772df747.jpg']],
  electrician: [['hero', '3ac0d56fb3eb.jpeg'], ['1', 'e54e992a11dc.jpeg'], ['2', '9a7d703bc0fb.png'], ['3', '6a4bfe4fc366.jpg']],
  dj: [['hero', '5d13748ec478.jpg'], ['1', '85dc65d30242.jpg'], ['2', 'c415112f8c50.jpg'], ['3', 'b7a76465258d.jpg']],
  photography: [['hero', 'e2215e7c6aa4.jpeg'], ['1', 'ce82cd47f889.jpg'], ['2', 'd64a234a0beb.jpg'], ['3', '439a47566b76.jpg']],
  gardening: [['hero', 'd1d7530a46e6.jpg'], ['1', '3794703d918a.jpg'], ['2', 'f8111b9fe52a.jpg'], ['3', 'd9220187a5a1.jpeg']],
  makeup: [['hero', 'cce7e1032e23.jpg'], ['1', '4ae6674f38af.jpeg'], ['2', 'd8ee9f077112.jpg'], ['3', 'caede5080fa2.jpeg']],
  plumbing: [['hero', 'b9e380874cf8.jpg'], ['1', '518ff843ff01.jpg'], ['2', '744dfb47d796.jpg'], ['3', 'f6afe6b4fc8d.jpg']],
};

const extOf = (id) => '.' + id.split('.').pop();
const isImage = (buf) =>
  (buf[0] === 0xff && buf[1] === 0xd8) || // JPEG
  (buf[0] === 0x89 && buf[1] === 0x50) || // PNG
  (buf.toString('ascii', 0, 4) === 'RIFF'); // WEBP

function fetchBuf(url, redirects) {
  redirects = redirects || 0;
  return new Promise((resolve, reject) => {
    if (redirects > 4) return reject(new Error('too many redirects'));
    https.get(url, { timeout: 30000, headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        return resolve(fetchBuf(new URL(res.headers.location, url).href, redirects + 1));
      }
      if (res.statusCode !== 200) { res.resume(); return reject(new Error('HTTP ' + res.statusCode)); }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject).on('timeout', function () { this.destroy(new Error('timeout')); });
  });
}

async function main() {
  const images = {};
  let ok = 0, fail = 0;
  for (const [slug, files] of Object.entries(MANIFEST)) {
    const dir = path.join(IMG_DIR, slug);
    fs.mkdirSync(dir, { recursive: true });
    images[slug] = { hero: '', gallery: [] };
    for (const [name, id] of files) {
      const rel = `assets/images/${slug}/${name}${extOf(id)}`;
      const dest = path.join(ROOT, 'site', rel);
      let buf = null;
      for (let attempt = 1; attempt <= 3 && !buf; attempt++) {
        try {
          const b = await fetchBuf(BASE + id);
          if (b.length < 25000) throw new Error('קטן מדי: ' + b.length + 'B');
          if (!isImage(b)) throw new Error('לא תמונה תקינה');
          buf = b;
        } catch (e) {
          if (attempt === 3) console.error(`✗ ${slug}/${name}: ${e.message}`);
        }
      }
      if (buf) {
        fs.writeFileSync(dest, buf);
        if (name === 'hero') images[slug].hero = rel; else images[slug].gallery.push(rel);
        ok++;
      } else { fail++; }
    }
  }
  fs.writeFileSync(path.join(ROOT, 'site', 'assets', 'images.js'),
    '// נוצר אוטומטית על ידי tools/download-images.js\nwindow.IMAGES = ' +
    JSON.stringify(images, null, 1) + ';\n', 'utf8');
  console.log(`הורדו ${ok} תמונות, נכשלו ${fail}`);
  process.exit(fail ? 2 : 0);
}
main();
