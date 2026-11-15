#!/usr/bin/env node
/**
 * export-clients.js — אופה קובץ HTML סטטי ועצמאי לכל אחד מהעסקים.
 * הפלט: site/clients/<id>.html — תוכן מלא אפוי (דירוג, מחירון, FAQ, FABs),
 * ללא תלות ב-JS לרינדור. הנכסים (CSS/תמונות) מקושרים יחסית: ../assets/
 * הרצה: node tools/export-clients.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const SITE = path.join(ROOT, 'site');
const OUT = path.join(SITE, 'clients');

// טעינת כל ה"חלונות" שלנו לתוך sandbox אחד
const sandbox = { window: {}, console };
vm.createContext(sandbox);
for (const f of ['settings.js', 'leads.js', 'categories.js', 'extras.js', 'images.js', 'icons.js']) {
  vm.runInContext(fs.readFileSync(path.join(SITE, 'assets', f), 'utf8'), sandbox, { filename: f });
}
const { LEADS, getCategory, getExtras, IMAGES, icon } = sandbox.window;

const ASSET = '../assets'; // יחסי מתוך site/clients/

function starsHtml(rating, size) {
  const full = Math.round(Number(rating) || 5);
  let out = '';
  for (let i = 0; i < 5; i++) out += icon(i < full ? 'star' : 'star-line', size || 15);
  return out;
}

function esc(s) {
  return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function buildPage(lead) {
  const cat = getCategory(lead.category);
  const imgs = IMAGES[cat.slug] || { hero: '', gallery: [] };
  const seo = cat.seo;
  const extras = getExtras(lead.category);
  const kw = (t) => t.replace(/\{city\}/g, lead.city).replace(/\{category\}/g, lead.category);
  const mainKw = kw(seo.keyword);
  const phoneHref = 'tel:' + (lead.phoneIntl || '');
  const waHref = lead.whatsapp
    ? `https://wa.me/${lead.whatsapp}?text=${encodeURIComponent('היי ' + lead.shortName + '! אשמח לקבל פרטים 🙏')}`
    : phoneHref;
  const addr = lead.street ? `${lead.street}, ${lead.city}` : lead.city;
  const sender = sandbox.window.CONFIG.sender;
  const maps = lead.mapsUrl || '#';

  const ratingBlock = lead.rating ? `
      <div class="hero-rating">
        <span class="hr-stars">${starsHtml(lead.rating)}</span>
        <b>${lead.rating}</b><span>${lead.reviews ? `· ${lead.reviews} ביקורות בגוגל` : ''}</span>
      </div>` : '';

  const mqItems = seo.keywords.map(kw).concat([mainKw]);
  const seq = mqItems.map((t) => `<span class="mq-item">${t} ${icon('star', 12)}</span>`).join('');

  const services = cat.services.map((s) => `
      <div class="svc">
        <span class="svc-ico">${icon(s.icon, 28)}</span>
        <b>${s.title}</b>
        <p>${s.desc}</p>
      </div>`).join('');

  const gallery = imgs.gallery.map((g) =>
    `<div class="gal"><img src="${ASSET}/${g.replace(/^assets\//, '')}" alt="${esc(lead.category)}" loading="lazy"></div>`).join('');

  const trust = [
    [lead.rating ? 'star' : 'shield-check', lead.rating ? `<b>${lead.rating} מתוך 5</b> בגוגל${lead.reviews ? ` · ${lead.reviews} ביקורות` : ''}` : 'עסק פעיל ומנוסה'],
    ['shield-check', 'אחריות ואמינות'],
    ['pin', `<b>${esc(lead.city)}</b> והסביבה`],
    ['clock', 'תיאום מהיר בטלפון ובוואטסאפ'],
  ].map(([i, t]) => `<span class="t-item">${icon(i, 17)}<span>${t}</span></span>`).join('');

  const reviews = `
    <div class="rv-score">
      <span class="rv-num">${lead.rating || '—'}<small> / 5</small></span>
      <span class="rv-stars">${starsHtml(lead.rating, 20)}</span>
      <span class="rv-count">${lead.reviews ? `${lead.reviews} ביקורות של לקוחות אמיתיים בגוגל` : 'עסק פעיל עם לקוחות חוזרים'}</span>
      <div class="rv-cta-row"><a class="cta cta-solid" style="padding:10px 20px;font-size:14.5px" href="${maps}" target="_blank" rel="noopener">${icon('star', 16)}לקריאת הביקורות בגוגל</a></div>
    </div>
    <div class="rv-themes">
      <span class="rv-themes-title">מה מציינים הלקוחות שוב ושוב</span>
      ${[['spark', 'שירות ברמה גבוהה', 'לקוחות מספרים על יחס אישי ומקצועיות'],
        ['clock', 'זמינות ומהירות', 'תיאום קל ומענה מהיר בטלפון ובוואטסאפ'],
        ['wallet', 'יחס הוגן למחיר', 'תמורה מלאה — הלקוחות חוזרים וממליצים']]
      .map(([i, t, d]) => `<div class="rv-theme"><span class="rt-ico">${icon(i, 19)}</span><div><b>${t}</b><span>${d}</span></div></div>`).join('')}
    </div>`;

  const prices = extras.prices.map(([item, price], i) => `
      <div class="p-row">
        <span class="p-item">${icon(cat.services[i] ? cat.services[i].icon : 'check', 19)}${item}</span>
        <span class="p-price">${price}</span>
      </div>`).join('');

  const faq = extras.faq.map(([q, a]) => `
      <details>
        <summary><span>${q}</span><span class="f-plus">${icon('chev-down', 16)}</span></summary>
        <div class="f-body">${a.replace(/\{city\}/g, esc(lead.city))}</div>
      </details>`).join('');

  const why = [
    ['award', 'מוניטין מוכח', lead.rating ? `ציון ${lead.rating} בגוגל${lead.reviews ? ` מתוך ${lead.reviews} ביקורות` : ''} — הלקוחות כבר סמכו עלינו.` : 'עסק ותיק ומנוסה שלקוחות חוזרים אליו שוב ושוב.'],
    ['pin', 'מקומי וזמין', `נמצאים בלב ${esc(lead.city)}, קרוב אליכם — ואפשר לתאם בטלפון או בוואטסאפ בכל רגע.`],
    ['chat', 'יחס אישי', 'לא פס ייצור: מקשיבים, מייעצים בהתאמה אישית ודואגים שתצאו מרוצים.'],
  ].map(([i, t, d]) => `<div class="why-card"><span class="w-ico">${icon(i, 26)}</span><b>${t}</b><p>${d}</p></div>`).join('');

  const pitchCta = sender.whatsapp
    ? `<a class="cta cta-wa" href="https://wa.me/${sender.whatsapp}?text=${encodeURIComponent(`היי ${sender.name}! ראיתי את אתר ההדגמה שבניתם עבור ${lead.shortName} ואשמח לשמוע עוד 🙏`)}" target="_blank" rel="noopener">${icon('whatsapp', 18)}דברו איתנו בוואטסאפ</a>`
    : `<span class="pitch-note">${icon('spark', 18)}הדגמה ללא עלות וללא התחייבות — חזרו אל מי ששלח לכם את הקישור</span>`;

  const heroBg = imgs.hero ? ` style="background-image:url('${ASSET}/${imgs.hero.replace(/^assets\//, '')}')"` : '';

  return `<!doctype html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(lead.shortName)} | ${esc(lead.category)} ב${esc(lead.city)}</title>
<meta name="robots" content="noindex">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='${encodeURIComponent(cat.accent)}'/%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Assistant:wght@400;600;700&family=Heebo:wght@400;600;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${ASSET}/demo.css?v=wp5">
<style>:root{--accent:${cat.accent};--accent-dark:${cat.accentDark};--chip:${cat.chip}}</style>
</head>
<body>
<header class="topbar">
  <div class="wrap topbar-inner">
    <div class="tb-brand"><span class="tb-logo">${icon('star-line', 19)}</span><strong>${esc(lead.shortName)}</strong></div>
    <nav class="tb-nav" aria-label="ניווט מהיר">
      <a href="#services">שירותים</a>
      <a href="#gallery">גלריה</a>
      <a href="#reviews">המלצות</a>
      <a href="#prices">מחירון</a>
      <a href="#faq">שאלות</a>
      <a href="#contact" class="tb-nav-cta">צור קשר</a>
    </nav>
    <div class="tb-actions">
      <a class="tb-btn tb-call" href="${phoneHref}">${icon('phone', 16)}<span class="tb-call-label">התקשרו</span></a>
      <a class="tb-btn tb-wa" href="${waHref}" target="_blank" rel="noopener">${icon('whatsapp', 16)}<span class="tb-wa-label">וואטסאפ</span></a>
    </div>
  </div>
</header>

<section class="hero" id="top">
  <div class="hero-bg"${heroBg}></div>
  <div class="hero-scrim"></div>
  <div class="wrap hero-grid">
    <div class="hero-copy">
      ${ratingBlock}
      <h1>${esc(lead.shortName)}</h1>
      <p class="hero-sub">${esc(lead.category)} ב${esc(lead.city)}</p>
      <p class="hero-tag">${esc(cat.tagline)}</p>
      <div class="hero-cta">
        <a class="cta cta-solid" href="${phoneHref}">${icon('phone', 18)}התקשרו עכשיו</a>
        <a class="cta cta-wa" href="${waHref}" target="_blank" rel="noopener">${icon('whatsapp', 18)}כתבו בוואטסאפ</a>
        <a class="cta cta-ghost" href="#services"><span class="cg-label">לכל השירותים</span>${icon('chev-down', 16)}</a>
      </div>
      <div class="hero-kw">${cat.services.slice(0, 3).map((s) => `<span>${esc(s.title)}</span>`).join('')}</div>
    </div>
  </div>
</section>

<div class="trustbar"><div class="wrap trustbar-inner">${trust}</div></div>
<div class="marquee" aria-hidden="true"><div class="marquee-track">${seq}${seq}</div></div>

<main>
  <section class="wrap sect rv in" id="services">
    <div class="kicker"><i>01</i><span>השירותים שלנו</span></div>
    <h2 class="sect-title">מה תמצאו אצלנו</h2>
    <p class="sect-sub">כל מה ש${esc(lead.shortName)} מציעים ללקוחות ב${esc(lead.city)} ובסביבה — במקום אחד:</p>
    <div class="services">${services}</div>
  </section>

  <section class="wrap sect rv in" id="gallery">
    <div class="kicker"><i>02</i><span>הרושם הראשוני</span></div>
    <h2 class="sect-title">תראו בעצמכם</h2>
    <p class="sect-sub">תמונות מהעולם של ${esc(lead.shortName)}</p>
    <div class="gallery">${gallery}</div>
  </section>

  <section class="wrap sect rv in" id="reviews">
    <div class="kicker"><i>03</i><span>המלצות מגוגל</span></div>
    <h2 class="sect-title">מה הלקוחות אומרים</h2>
    <div class="reviews">${reviews}</div>
  </section>

  <section class="seo rv in">
    <div class="wrap">
      <div class="seo-head">
        <div class="kicker kicker-light"><i>•</i><span>קידום אורגני בגוגל</span></div>
        <h2>לקוחות מחפשים אתכם בגוגל — ומוצאים את המתחרים</h2>
        <p>בכל חודש מחפשים תושבי ${esc(lead.city)} והסביבה אחר "${esc(mainKw)}" וחיפושים דומים. בלי אתר — הלקוחות האלה מגיעים למתחרים. עם אתר מקודם אורגנית, ${esc(lead.shortName)} יכול לעמוד בראש התוצאות בדיוק כשמחפשים אתכם.</p>
      </div>
      <div class="seo-stats">
        <div class="stat"><b>${seo.searches}</b><span>חיפושים בחודש באזור העיר*</span></div>
        <div class="stat"><b>${seo.clicks}</b><span>כניסות פוטנציאליות לאתר*</span></div>
        <div class="stat"><b>${seo.leads}</b><span>לקוחות חדשים בחודש*</span></div>
        <div class="stat"><b>${seo.revenue}</b><span>הכנסה חודשית פוטנציאלית*</span></div>
      </div>
      <div class="seo-kw">
        <b>דוגמאות לחיפושים שמגיעים לעסק עם אתר מקודם:</b>
        <div class="kw-chips">${seo.keywords.map((k) => `<span class="kw">${icon('search', 14)}${esc(kw(k))}</span>`).join('')}</div>
      </div>
      <p class="seo-note">* הנתונים הם הערכה להמחשת הפוטנציאל העסקי בתחום ובאזור, ואינם התחייבות.</p>
    </div>
  </section>

  <section class="wrap sect rv in">
    <div class="kicker"><i>04</i><span>על העסק</span></div>
    <h2 class="sect-title">למה הלקוחות בוחרים דווקא בנו</h2>
    <div class="why">${why}</div>
  </section>

  <section class="wrap sect rv in" id="prices">
    <div class="kicker"><i>05</i><span>מחירון להמחשה</span></div>
    <h2 class="sect-title">כמה זה עולה?</h2>
    <p class="sect-sub">טווחי מחירים נפוצים בתחום — ליצירת ציפייה נכונה. להצעה מדויקת צרו קשר.</p>
    <div class="pricelist">${prices}</div>
    <p class="price-note">* המחירים להמחשה בלבד ואינם מחייבים — ההצעה הסופית ניתנת לאחר בדיקה.</p>
  </section>

  <section class="wrap sect rv in" id="faq">
    <div class="kicker"><i>06</i><span>שאלות נפוצות</span></div>
    <h2 class="sect-title">שאלות שלקוחות שואלים</h2>
    <div class="faq">${faq}</div>
  </section>

  <section class="wrap sect contact rv in" id="contact">
    <div class="kicker"><i>07</i><span>יצירת קשר</span></div>
    <h2 class="sect-title">דברו איתנו</h2>
    <p class="sect-sub">${esc(lead.shortName)} — ${esc(addr)}. צרו קשר ונחזור אליכם מהר.</p>
    <div class="contact-cards">
      <a class="ccard" href="${phoneHref}"><span class="cc-ico">${icon('phone', 22)}</span><b>טלפון</b><span dir="ltr">${esc(lead.phoneDisplay || lead.phoneIntl || '')}</span><em class="cc-arrow">${icon('arrow-left', 16)}</em></a>
      <a class="ccard" href="${waHref}" target="_blank" rel="noopener"><span class="cc-ico">${icon('whatsapp', 22)}</span><b>וואטסאפ</b><span>שלחו הודעה עכשיו</span><em class="cc-arrow">${icon('arrow-left', 16)}</em></a>
      <a class="ccard" href="${maps}" target="_blank" rel="noopener"><span class="cc-ico">${icon('pin', 22)}</span><b>כתובת</b><span>${esc(addr)}</span><em class="cc-arrow">${icon('arrow-left', 16)}</em></a>
    </div>
  </section>
</main>

<section class="pitch rv in">
  <div class="wrap pitch-inner">
    <div>
      <div class="pitch-eyebrow">האתר הזה הוא הדגמה</div>
      <h2>האתר הזה יכול להיות של ${esc(lead.shortName)} — תוך שבועות</h2>
      <p>בנינו את עמוד ההדגמה הזה בחינם כדי להראות לכם איך אתר מקצועי, מהיר ומקודם בגוגל מביא לקוחות חדשים בדיוק ברגע שהם מחפשים את השירות שלכם. רוצים לשמוע איך זה עובד?</p>
    </div>
    <div class="pitch-cta">${pitchCta}</div>
  </div>
</section>

<footer class="dfoot">
  <div class="wrap dfoot-inner">
    <div>אתר הדגמה שנבנה עבור <b>${esc(lead.shortName)}</b> · הפוטנציאל המוצג להמחשה בלבד</div>
    <div class="dfoot-note">פרטי הקשר אמיתיים ונלקחו ממקורות ציבוריים. התוכן להמחשת יכולות קידום אורגני.</div>
    <div class="dfoot-access">${icon('users', 14)}מונגש לבעלי מוגבלות · שירות ומידע ניתנים גם בטלפון ובוואטסאפ ללא אתר</div>
  </div>
</footer>

<a class="fab fab-wa" href="${waHref}" target="_blank" rel="noopener" aria-label="וואטסאפ">${icon('whatsapp', 26)}<i class="fab-dot">1</i></a>
<a class="fab fab-call" href="${phoneHref}" aria-label="התקשרו">${icon('phone', 24)}</a>
</body>
</html>`;
}

// יצירת הקבצים
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
let okCount = 0;
for (const lead of LEADS) {
  const html = buildPage(lead);
  fs.writeFileSync(path.join(OUT, `${lead.id}.html`), html, 'utf8');
  okCount++;
}
console.log(`נכתבו ${okCount} קבצי HTML ל-site/clients/`);

/* ── גלריית כל הלקוחות: clients/index.html ── */
function buildGalleryIndex() {
  const cities = [...new Set(LEADS.map((l) => l.city))].sort();
  const cats = {};
  LEADS.forEach((l) => { cats[l.category] = (cats[l.category] || 0) + 1; });
  const catNames = Object.keys(cats).sort((a, b) => cats[b] - cats[a]);

  const cards = LEADS.map((l) => {
    const im = IMAGES[getCategory(l.category).slug];
    const hero = im ? `../${im.hero.replace(/^assets\//, 'assets/')}` : '';
    const rating = l.rating
      ? `<span class="stars">${icon('star', 13)} ${l.rating}</span><span>(${l.reviews} ביקורות)</span>` : '';
    return `
    <article class="card" data-city="${esc(l.city)}" data-cat="${esc(l.category)}">
      <div class="thumb">
        ${hero ? `<img src="${hero}" alt="" loading="lazy">` : ''}
        <span class="badge">${esc(l.category)}</span>
      </div>
      <div class="card-body">
        <h3>${esc(l.name)}</h3>
        <div class="meta"><span class="meta-city">${icon('pin', 13)}${esc(l.city)}</span>${rating}</div>
      </div>
      <div class="card-actions">
        <a class="btn btn-view" href="./${l.id}.html" target="_blank" rel="noopener">${icon('eye', 15)} צפייה באתר</a>
      </div>
    </article>`;
  }).join('');

  return `<!doctype html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>אתרי לקוחות · כל ה-${LEADS.length} העסקים</title>
<meta name="robots" content="noindex">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='14' fill='%2318543f'/%3E%3Ccircle cx='16' cy='16' r='5' fill='%23fff'/%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Assistant:wght@400;600;700&family=Heebo:wght@400;600;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../assets/style.css?v=wp5">
</head>
<body>
<header class="topbar">
  <div class="wrap topbar-inner">
    <div class="brand"><span class="mark"></span>
      <div><strong>אתרי לקוחות</strong><small>כל ${LEADS.length} העסקים · אתר לדוגמה לכל אחד</small></div>
    </div>
    <div class="topbar-stats"><span>${LEADS.length}</span> אתרים · <span>${catNames.length}</span> תחומים</div>
  </div>
</header>

<section class="wrap">
  <div class="intro">
    <h1>כל אתרי הלקוחות במקום אחד</h1>
    <p>לכל אחד מהעסקים נבנה אתר הדגמה מלא ואישי — כולל הדירוג האמיתי שלו בגוגל, מחירון, שאלות נפוצות וכפתורי יצירת קשר. לחצו על כרטיס כדי לצפות באתר של אותו עסק.</p>
  </div>

  <div class="controls">
    <input id="search" type="search" placeholder="חיפוש לפי שם, תחום או עיר…" autocomplete="off">
    <select id="city" aria-label="סינון לפי עיר"><option value="">כל הערים</option>${cities.map((c) => `<option>${c}</option>`).join('')}</select>
    <select id="cat" aria-label="סינון לפי קטגוריה"><option value="">כל התחומים</option>${catNames.map((c) => `<option>${c} (${cats[c]})</option>`).join('')}</select>
    <span id="count" class="count" role="status"></span>
  </div>

  <div id="grid" class="grid">${cards}</div>
  <div id="empty" class="empty" hidden>לא נמצאו עסקים מתאימים לסינון.</div>
</section>

<footer class="foot">אתרי הדגמה שנבנו אוטומטית · ההערכות המוצגות להמחשה בלבד</footer>

<script>
(function () {
  var cards = [].slice.call(document.querySelectorAll('.card'));
  var search = document.getElementById('search');
  var city = document.getElementById('city');
  var cat = document.getElementById('cat');
  var count = document.getElementById('count');
  var empty = document.getElementById('empty');
  function render() {
    var q = search.value.trim().toLowerCase();
    var cv = city.value;
    var ct = cat.value.replace(/ \\(\\d+\\)$/, '');
    var n = 0;
    cards.forEach(function (c) {
      var hay = c.textContent.toLowerCase();
      var show = (!cv || c.dataset.city === cv) && (!ct || c.dataset.cat === ct) && (!q || hay.indexOf(q) > -1);
      c.style.display = show ? '' : 'none';
      if (show) n++;
    });
    count.textContent = n + ' מתוך ${LEADS.length}';
    empty.hidden = n > 0;
  }
  [search, city, cat].forEach(function (el) { el.addEventListener('input', render); });
  render();
})();
</script>
</body>
</html>`;
}

fs.writeFileSync(path.join(OUT, 'index.html'), buildGalleryIndex(), 'utf8');
console.log('נכתב clients/index.html — גלריית כל הלקוחות');
