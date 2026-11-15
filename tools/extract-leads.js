#!/usr/bin/env node
/**
 * extract-leads.js — מפרסר את seo-leads.html ומוציא את כל העסקים לקובץ JS לשימוש האתר.
 * הפלט: site/assets/leads.js  (window.LEADS = [...])  ו־site/assets/leads.json (לנוחות).
 * הרצה: node tools/extract-leads.js
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const src = fs.readFileSync(path.join(ROOT, 'seo-leads.html'), 'utf8');

// ניקוי סימני כיווניות בלתי נראים שמסתתרים בשמות
const clean = (s) => String(s || '')
  .replace(/[\u200e\u200f\u202a-\u202e\u2066-\u2069]/g, '')
  .replace(/\s+/g, ' ')
  .trim();

// שם קצר לכותרות: חיתוך במפרידים מילוליים (| או " - ")
function shortName(full) {
  let s = clean(full);
  const parts = s.split(/\s+[|·]\s*|\s+-\s+/).filter(Boolean);
  if (parts.length > 1 && parts[0].length >= 3) s = parts[0];
  if (s.length > 46) s = s.slice(0, 46).replace(/\s+\S*$/, '');
  return s;
}

const blocks = src.split('<li class="lead"').slice(1);
const leads = [];

blocks.forEach((raw, idx) => {
  const b = raw.split('</li>')[0];

  const city = clean((b.match(/data-city="([^"]*)"/) || [])[1]);
  const name = clean((b.match(/<h3><bdi>([\s\S]*?)<\/bdi><\/h3>/) || [])[1]);
  const category = clean((b.match(/class="category">([^<]+)</) || [])[1]);

  // כתובת: "רחוב 12 · עיר" — העיר עשויה להיות חסרה בתגית
  const addrRaw = clean((b.match(/<div class="identity">[\s\S]*?<p>([\s\S]*?)<\/p>/) || [])[1]);
  let street = '';
  if (addrRaw) {
    const segs = addrRaw.split('·').map(clean).filter(Boolean);
    street = segs.length > 1 ? segs.slice(0, -1).join(' · ') : (segs[0] !== city ? segs[0] : '');
  }

  const rating = clean((b.match(/<div class="score">[\s\S]*?<strong>([\d.]+)<\/strong>/) || [])[1]) || null;
  const reviews = (b.match(/(\d+)\s*ביקורות/) || [])[1] ? Number(RegExp.$1) : null;

  const phoneIntl = clean((b.match(/href="tel:([^"]+)"/) || [])[1]).replace(/\s+/g, '') || null;
  const phoneDisplay = clean((b.match(/<a dir="ltr" href="tel:[^"]+">([^<]+)<\/a>/) || [])[1]) || null;
  const whatsapp = (b.match(/wa\.me\/(\d+)/) || [])[1] || null;
  const mapsUrl = (b.match(/href="(https:\/\/www\.google\.com\/maps\?cid=\d+)"/) || [])[1] || null;
  const sourceUrl = (b.match(/href="(https:\/\/(?:www\.)?(?:welp|easy)\.co\.il[^"]*)"/) || [])[1] || null;

  leads.push({
    id: idx + 1,
    name,
    shortName: shortName(name),
    category,
    city,
    street,
    rating,
    reviews,
    phoneIntl,
    phoneDisplay,
    whatsapp,
    mapsUrl,
    sourceUrl,
  });
});

// בדיקות תקינות
const problems = leads.filter((l) => !l.name || !l.category || !l.city || !l.phoneIntl);
if (problems.length) {
  console.error('רשומות חסרות שדות חובה:', problems);
  process.exit(1);
}

const cats = {};
leads.forEach((l) => { cats[l.category] = (cats[l.category] || 0) + 1; });
const noWa = leads.filter((l) => !l.whatsapp).length;

// כתיבה
const outDir = path.join(ROOT, 'site', 'assets');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'leads.js'),
  '// נוצר אוטומטית על ידי tools/extract-leads.js — לא לערוך ידנית\nwindow.LEADS = ' +
  JSON.stringify(leads, null, 1) + ';\n', 'utf8');
fs.writeFileSync(path.join(outDir, 'leads.json'), JSON.stringify(leads, null, 1), 'utf8');

console.log(`נחלצו ${leads.length} עסקים`);
console.log(`ללא וואטסאפ: ${noWa}`);
console.log('קטגוריות:', JSON.stringify(cats, null, 1));
