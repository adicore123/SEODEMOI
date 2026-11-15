// app.js — לוגיקת הדשבורד: רינדור כרטיסים, סינון, כפתורי צפייה/שליחה/העתקה, זכירת נשלחו
'use strict';
(function () {
  const LS_KEY = 'seoleads-sent-v1';
  const sent = new Set(JSON.parse(localStorage.getItem(LS_KEY) || '[]'));
  const grid = document.getElementById('grid');
  const searchEl = document.getElementById('search');
  const cityEl = document.getElementById('city');
  const catEl = document.getElementById('cat');
  const countEl = document.getElementById('count');
  const emptyEl = document.getElementById('empty');
  const statTotal = document.getElementById('stat-total');
  const statSent = document.getElementById('stat-sent');

  function catOf(lead) { return window.getCategory(lead.category); }
  function heroOf(lead) {
    const im = window.IMAGES[catOf(lead).slug];
    return im ? im.hero : '';
  }

  // אכלוס סינון הערים והקטגוריות מהנתונים
  const cities = [...new Set(window.LEADS.map((l) => l.city))].sort();
  const cats = [...new Set(window.LEADS.map((l) => l.category))].sort((a, b) =>
    window.LEADS.filter((l) => l.category === b).length - window.LEADS.filter((l) => l.category === a).length);
  for (const c of cities) cityEl.insertAdjacentHTML('beforeend', `<option>${c}</option>`);
  for (const c of cats) {
    const n = window.LEADS.filter((l) => l.category === c).length;
    catEl.insertAdjacentHTML('beforeend', `<option>${c} (${n})</option>`);
  }

  function cardHtml(l) {
    const img = heroOf(l);
    const rating = l.rating
      ? `<span class="stars">${window.icon('star', 13)} ${l.rating}</span><span>(${l.reviews} ביקורות)</span>` : '';
    return `
    <article class="card" data-id="${l.id}" data-sent="${sent.has(l.id) ? 1 : 0}">
      <div class="thumb">
        ${img ? `<img src="${img}" alt="" loading="lazy">` : ''}
        <span class="badge">${l.category}</span>
        ${sent.has(l.id) ? `<span class="sentflag">${window.icon('check', 12)} נשלח</span>` : ''}
      </div>
      <div class="card-body">
        <h3>${l.name}</h3>
        <div class="meta">
          <span class="meta-city">${window.icon('pin', 13)}${l.city}</span>
          ${rating}
        </div>
      </div>
      <div class="card-actions">
        <a class="btn btn-view" href="demo.html?id=${l.id}" target="_blank" rel="noopener">${window.icon('eye', 15)} צפייה באתר</a>
        <button class="btn btn-wa" type="button">${window.icon('whatsapp', 15)} שליחה</button>
        <button class="btn btn-copy" type="button" title="העתקת ההודעה">${window.icon('copy', 15)}</button>
      </div>
    </article>`;
  }

  function render() {
    const q = searchEl.value.trim();
    const city = cityEl.value;
    const cat = catEl.value.replace(/ \(\d+\)$/, '');
    const list = window.LEADS.filter((l) => {
      if (city && l.city !== city) return false;
      if (cat && l.category !== cat) return false;
      if (q) {
        const hay = (l.name + ' ' + l.category + ' ' + l.city + ' ' + (l.street || '')).toLowerCase();
        if (!hay.includes(q.toLowerCase())) return false;
      }
      return true;
    });
    grid.innerHTML = list.map(cardHtml).join('');
    countEl.textContent = `${list.length} מתוך ${window.LEADS.length}`;
    emptyEl.hidden = list.length > 0;
  }

  function markSent(id) {
    sent.add(id);
    localStorage.setItem(LS_KEY, JSON.stringify([...sent]));
    statSent.textContent = sent.size;
    const card = grid.querySelector(`.card[data-id="${id}"]`);
    if (card) {
      card.dataset.sent = '1';
      const thumb = card.querySelector('.thumb');
      if (!thumb.querySelector('.sentflag')) thumb.insertAdjacentHTML('beforeend', `<span class="sentflag">${window.icon('check', 12)} נשלח</span>`);
    }
  }

  let toastTimer = null;
  function toast(msg) {
    let el = document.querySelector('.toast');
    if (!el) { el = document.createElement('div'); el.className = 'toast'; document.body.appendChild(el); }
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
  }

  async function copyText(text) {
    try { await navigator.clipboard.writeText(text); }
    catch {
      const ta = document.createElement('textarea');
      ta.value = text; document.body.appendChild(ta); ta.select();
      document.execCommand('copy'); ta.remove();
    }
  }

  grid.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (!card) return;
    const lead = window.LEADS.find((l) => l.id === Number(card.dataset.id));
    if (!lead) return;

    if (e.target.closest('.btn-wa')) {
      const msg = window.waMessage(lead);
      const num = lead.whatsapp || (lead.phoneIntl || '').replace('+', '');
      window.open(`https://wa.me/${num}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
      markSent(lead.id);
    } else if (e.target.closest('.btn-copy')) {
      copyText(window.waMessage(lead)).then(() => toast('ההודעה הועתקה — הדביקו איפה שתרצו ✓'));
    }
  });

  [searchEl, cityEl, catEl].forEach((el) => el.addEventListener('input', render));

  statTotal.textContent = window.LEADS.length;
  statSent.textContent = sent.size;
  render();
})();
