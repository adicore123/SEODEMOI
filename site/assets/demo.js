// demo.js — רינדור אתר ההדגמה לפי ?id= מה-URL. גרסת Premium 2026: אייקונים, glass card, marquee, reveal.
'use strict';
(function () {
  const id = Number(new URLSearchParams(location.search).get('id'));
  const lead = window.LEADS.find((l) => l.id === id);

  if (!lead) {
    document.body.innerHTML = '<div style="padding:60px;text-align:center;font-family:sans-serif;direction:rtl">' +
      '<h1>עסק לא נמצא</h1></div>';
    return;
  }

  const cat = window.getCategory(lead.category);
  const imgs = window.IMAGES[cat.slug] || { hero: '', gallery: [] };
  const seo = cat.seo;
  const icon = window.icon;
  const kw = (tpl) => tpl.replace(/\{city\}/g, lead.city).replace(/\{category\}/g, lead.category);
  const mainKw = kw(seo.keyword);
  const phoneHref = 'tel:' + (lead.phoneIntl || '');
  const waHref = lead.whatsapp
    ? `https://wa.me/${lead.whatsapp}?text=${encodeURIComponent('היי ' + lead.shortName + '! אשמח לקבל פרטים 🙏')}`
    : phoneHref;

  // צבעוניות הקטגוריה
  document.documentElement.style.setProperty('--accent', cat.accent);
  document.documentElement.style.setProperty('--accent-dark', cat.accentDark);
  document.documentElement.style.setProperty('--chip', cat.chip);

  document.title = `${lead.shortName} | ${lead.category} ב${lead.city}`;

  const $ = (sel) => document.querySelector(sel);

  // כוכבים לפי דירוג
  function starsHtml(n, size) {
    const full = Math.round(Number(lead.rating) || 5);
    let out = '';
    for (let i = 0; i < 5; i++) out += icon(i < full ? 'star' : 'star-line', size || 15);
    return out;
  }

  // פס עליון
  $('#d-tb-name').textContent = lead.shortName;
  $('#d-tb-call').href = phoneHref;
  $('#d-tb-wa').href = waHref;
  $('#d-logo').innerHTML = icon('star-line', 19);

  // Hero + כרטיס זכוכית
  $('#d-hero-bg').style.backgroundImage = imgs.hero ? `url("${imgs.hero}")` : 'none';
  $('#d-name').textContent = lead.shortName;
  $('#d-sub').textContent = `${lead.category} ב${lead.city}`;
  $('#d-tag').textContent = cat.tagline;
  $('#d-cta-call').href = phoneHref;
  $('#d-cta-wa').href = waHref;

  if (lead.rating) {
    $('#d-rating').hidden = false;
    $('#d-stars').innerHTML = starsHtml(lead.rating);
    $('#d-rating-num').textContent = lead.rating;
    $('#d-rating-rev').textContent = lead.reviews ? `· ${lead.reviews} ביקורות בגוגל` : '';
  }

  const addr = lead.street ? `${lead.street}, ${lead.city}` : lead.city;
  $('#d-addr2').textContent = addr;

  // Marquee — מילות מפתח עם כוכבים
  const mqItems = seo.keywords.map(kw).concat([mainKw]);
  const seq = mqItems.map((t) => `<span class="mq-item">${t} ${icon('star', 12)}</span>`).join('');
  $('#d-marquee').innerHTML = seq + seq; // שני עותקים ללופ רציף

  // מילות מפתח מתחת ל-CTA ב-hero (דפוס SEO של דפי נחיתה)
  $('#d-hero-kw').innerHTML = cat.services.slice(0, 3).map((s) => `<span>${s.title}</span>`).join('');

  // שורת אמון מתחת ל-hero
  $('#d-trustbar').innerHTML = [
    [lead.rating ? 'star' : 'shield-check', lead.rating ? `<b>${lead.rating} מתוך 5</b> בגוגל${lead.reviews ? ` · ${lead.reviews} ביקורות` : ''}` : 'עסק פעיל ומנוסה'],
    ['shield-check', 'אחריות ואמינות'],
    ['pin', `<b>${lead.city}</b> והסביבה`],
    ['clock', 'תיאום מהיר בטלפון ובוואטסאפ'],
  ].map(([i, t]) => `<span class="t-item">${icon(i, 17)}<span>${t}</span></span>`).join('');

  // המלצות — נתוני גוגל האמיתיים של העסק
  const revStars = starsHtml(lead.rating, 20);
  $('#d-reviews').innerHTML = `
    <div class="rv-score">
      <span class="rv-num">${lead.rating || '—'}<small> / 5</small></span>
      <span class="rv-stars">${revStars}</span>
      <span class="rv-count">${lead.reviews ? `${lead.reviews} ביקורות של לקוחות אמיתיים בגוגל` : 'עסק פעיל עם לקוחות חוזרים'}</span>
      <div class="rv-cta-row">${lead.mapsUrl ? `<a class="cta cta-solid" style="padding:10px 20px;font-size:14.5px" href="${lead.mapsUrl}" target="_blank" rel="noopener">${icon('star', 16)}לקריאת הביקורות בגוגל</a>` : ''}</div>
    </div>
    <div class="rv-themes">
      <span class="rv-themes-title">מה מציינים הלקוחות שוב ושוב</span>
      ${[['spark', 'שירות ברמה גבוהה', 'לקוחות מספרים על יחס אישי ומקצועיות'],
        ['clock', 'זמינות ומהירות', 'תיאום קל ומענה מהיר בטלפון ובוואטסאפ'],
        ['wallet', 'יחס הוגן למחיר', 'תמורה מלאה — הלקוחות חוזרים וממליצים']]
        .map(([i, t, d]) => `<div class="rv-theme"><span class="rt-ico">${icon(i, 19)}</span><div><b>${t}</b><span>${d}</span></div></div>`).join('')}
    </div>`;

  // מחירון להמחשה
  const extras = window.getExtras(lead.category);
  $('#d-prices').innerHTML = extras.prices.map(([item, price], i) => `
    <div class="p-row">
      <span class="p-item">${icon(cat.services[i] ? cat.services[i].icon : 'check', 19)}${item}</span>
      <span class="p-price">${price}</span>
    </div>`).join('');

  // שאלות נפוצות
  $('#d-faq').innerHTML = extras.faq.map(([q, a]) => `
    <details>
      <summary><span>${q}</span><span class="f-plus">${icon('chev-down', 16)}</span></summary>
      <div class="f-body">${a.replace(/\{city\}/g, lead.city)}</div>
    </details>`).join('');

  // FABs צפים
  $('#d-fab-wa').href = waHref;
  $('#d-fab-call').href = phoneHref;

  // שירותים
  $('#d-services-sub').textContent = `כל מה ש${lead.shortName} מציעים ללקוחות ב${lead.city} ובסביבה — במקום אחד:`;
  $('#d-services').innerHTML = cat.services.map((s) => `
    <div class="svc">
      <span class="svc-ico">${icon(s.icon, 28)}</span>
      <b>${s.title}</b>
      <p>${s.desc}</p>
    </div>`).join('');
  $('#d-cat-inline').textContent = lead.shortName;

  // גלריה
  $('#d-gallery').innerHTML = imgs.gallery.map((g) =>
    `<div class="gal"><img src="${g}" alt="${lead.category}" loading="lazy"></div>`).join('');

  // מקטח SEO
  $('#d-seo-intro').textContent =
    `בכל חודש מחפשים תושבי ${lead.city} והסביבה אחר "${mainKw}" וחיפושים דומים. ` +
    `בלי אתר — הלקוחות האלה מגיעים למתחרים. עם אתר מקודם אורגנית, ${lead.shortName} יכול לעמוד בראש התוצאות בדיוק כשמחפשים אתכם.`;
  $('#d-seo-stats').innerHTML = [
    [seo.searches, 'חיפושים בחודש באזור העיר*'],
    [seo.clicks, 'כניסות פוטנציאליות לאתר*'],
    [seo.leads, 'לקוחות חדשים בחודש*'],
    [seo.revenue, 'הכנסה חודשית פוטנציאלית*'],
  ].map(([v, label]) => `<div class="stat"><b>${v}</b><span>${label}</span></div>`).join('');
  $('#d-seo-kw').innerHTML = seo.keywords.map((k) => `<span class="kw">${icon('search', 14)}${kw(k)}</span>`).join('');

  // למה אנחנו
  $('#d-why').innerHTML = [
    ['award', 'מוניטין מוכח', lead.rating ? `ציון ${lead.rating} בגוגל${lead.reviews ? ` מתוך ${lead.reviews} ביקורות` : ''} — הלקוחות כבר סמכו עלינו.` : 'עסק ותיק ומנוסה שלקוחות חוזרים אליו שוב ושוב.'],
    ['pin', 'מקומי וזמין', `נמצאים בלב ${lead.city}, קרוב אליכם — ואפשר לתאם בטלפון או בוואטסאפ בכל רגע.`],
    ['chat', 'יחס אישי', 'לא פס ייצור: מקשיבים, מייעצים בהתאמה אישית ודואגים שתצאו מרוצים.'],
  ].map(([i, t, d]) => `<div class="why-card"><span class="w-ico">${icon(i, 26)}</span><b>${t}</b><p>${d}</p></div>`).join('');

  // יצירת קשר
  $('#d-contact-sub').textContent = `${lead.shortName} — ${lead.street ? lead.street + ', ' : ''}${lead.city}. צרו קשר ונחזור אליכם מהר.`;
  $('#d-c-call').href = phoneHref;
  $('#d-c-wa').href = waHref;
  if (lead.mapsUrl) $('#d-c-maps').href = lead.mapsUrl;
  $('#d-phone').textContent = lead.phoneDisplay || lead.phoneIntl || '';

  // פיץ' לבעל העסק
  $('#d-pitch-title').textContent = `האתר הזה יכול להיות של ${lead.shortName} — תוך שבועות`;
  $('#d-pitch-text').textContent =
    'בנינו את עמוד ההדגמה הזה בחינם כדי להראות לכם איך אתר מקצועי, מהיר ומקודם בגוגל מביא לקוחות חדשים בדיוק ברגע שהם מחפשים את השירות שלכם. רוצים לשמוע איך זה עובד?';
  const sender = window.CONFIG.sender;
  const pitchCta = $('#d-pitch-cta');
  if (sender.whatsapp) {
    const msg = encodeURIComponent(`היי ${sender.name}! ראיתי את אתר ההדגמה שבניתם עבור ${lead.shortName} ואשמח לשמוע עוד 🙏`);
    pitchCta.innerHTML = `<a class="cta cta-wa" href="https://wa.me/${sender.whatsapp}?text=${msg}" target="_blank" rel="noopener">${icon('whatsapp', 18)}דברו איתנו בוואטסאפ</a>`;
  } else {
    pitchCta.innerHTML = `<span class="pitch-note">${icon('spark', 18)}הדגמה ללא עלות וללא התחייבות — חזרו אל מי ששלח לכם את הקישור</span>`;
  }

  // פוטר
  $('#d-foot-name').textContent = lead.shortName;

  // אייקונים סטטיים מה-markup
  window.hydrateIcons();

  // Reveal בגלילה
  const rv = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    rv.forEach((el) => io.observe(el));
  } else {
    rv.forEach((el) => el.classList.add('in'));
  }

  // סטייט פעיל ב-nav לפי הסקשן הנראה
  const navLinks = [...document.querySelectorAll('.tb-nav a')];
  const watched = navLinks.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window && watched.length) {
    const navIo = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id));
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    watched.forEach((s) => navIo.observe(s));
  }
})();
