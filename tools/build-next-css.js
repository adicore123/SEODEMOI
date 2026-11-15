#!/usr/bin/env node
/**
 * build-next-css.js — מאחד את demo.css (אתר לקוח) ו-style.css (דשבורד) ל-globals.css
 * של פרויקט ה-Next.js, עם משתני פונטים של next/font.
 * הרצה: node tools/build-next-css.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

function read(p) { return fs.readFileSync(path.join(ROOT, p), 'utf8'); }

let demoCss = read('site/assets/demo.css');
let dashCss = read('site/assets/style.css');

// פונטים דרך next/font (מוזרקים כמשתני CSS ב-layout)
demoCss = demoCss.replace(
  /--font-d:[^;]+;/, '--font-d:var(--font-heebo),system-ui,sans-serif;'
).replace(
  /--font-b:[^;]+;/, '--font-b:var(--font-assistant),system-ui,sans-serif;'
);

// מהדשבורד לוקחים רק סגנונות ייחודיים (בלי body/:root כפולים ובלי הגדרות פונט כפולות)
dashCss = dashCss
  .replace(/\/\* style\.css[^]*?\n:root\{[^}]*\}\n/, '')
  .replace(/^body\{[^}]*\}\n/m, '')
  .replace(/^h1,h2,h3\{[^}]*\}\n/m, '')
  .replace(/^\.icn\{[^}]*\}\n/m, '');

const out = `/* globals.css — נוצר אוטומטית על ידי tools/build-next-css.js (demo.css + style.css) */
${demoCss}

/* ── סגנונות דשבורד (מ-style.css) ── */
${dashCss}

/* ── תהליך הלקוח (רצועת 3 השלבים בסקשן ה-SEO) ── */.seo-process{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:30px}
.proc-step{display:flex;gap:13px;align-items:flex-start;background:rgba(255,255,255,.09);border:1px solid rgba(255,255,255,.22);border-radius:16px;padding:16px 18px;position:relative}
.proc-step .pr-ico{width:40px;height:40px;border-radius:12px;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.25);display:grid;place-items:center;flex:none;color:var(--gold)}
.proc-step b{display:block;font-family:var(--font-d);font-size:14.5px;font-weight:800;margin-bottom:2px}
.proc-step span{font-size:13px;opacity:.85;line-height:1.45}
.proc-arrow{position:absolute;top:50%;inset-inline-start:-15px;translate:0 -50%;color:rgba(255,255,255,.5);z-index:1}
@media(max-width:800px){.seo-process{grid-template-columns:1fr}.proc-arrow{display:none}}

/* ── חבילות תמחור ו-ROI (סקשן הפיץ') ── */
.pitch-title{margin:0 0 8px;font-size:clamp(1.45rem,3vw,2.1rem);font-weight:900;letter-spacing:-.025em}
.pkgs{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:24px 0 18px}
.pkg{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.18);border-radius:20px;padding:24px}
.pkg-head{display:flex;gap:12px;align-items:center;margin-bottom:12px}
.pkg-ico{width:44px;height:44px;border-radius:13px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.25);display:grid;place-items:center;color:var(--gold);flex:none}
.pkg-head b{display:block;font-family:var(--font-d);font-size:17px;font-weight:800}
.pkg-sub{font-size:12.5px;opacity:.75}
.pkg-price{font-family:var(--font-d);font-size:30px;font-weight:900;color:var(--gold);letter-spacing:-.02em;margin-bottom:14px;line-height:1.1}
.pkg-price small{font-size:14px;font-weight:700;opacity:.85}
.pkg-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:9px}
.pkg-list li{display:flex;gap:9px;align-items:flex-start;font-size:14px;opacity:.92;line-height:1.5}
.pkg-list li .icn{color:var(--gold);margin-top:3px}
.roi-strip{display:flex;gap:12px;align-items:center;background:rgba(244,182,63,.12);border:1px solid rgba(244,182,63,.35);border-radius:16px;padding:14px 18px;font-size:14.5px;margin-bottom:22px;line-height:1.6}
.roi-strip .icn{color:var(--gold);flex:none}
.pitch .pitch-cta{justify-content:flex-start}
@media(max-width:800px){.pkgs{grid-template-columns:1fr}}
`;

fs.mkdirSync(path.join(ROOT, 'next', 'app'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'next', 'app', 'globals.css'), out, 'utf8');
console.log('globals.css נכתב:', Math.round(out.length / 1024), 'KB');
