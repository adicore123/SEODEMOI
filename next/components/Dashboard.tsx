'use client';
import { useMemo, useState } from 'react';
import Icon from '@/components/Icon';
import { IMAGES } from '@/lib/images';
import { getCategory } from '@/lib/categories';
import { waMessage } from '@/lib/settings';

type CardLead = {
  id: number; slug: string; name: string; shortName: string;
  category: string; city: string; rating: string | null; reviews: number | null;
  whatsapp: string | null; phoneIntl: string | null;
};

const SENT_KEY = 'seoleads-sent-v1';

export default function Dashboard({ leads, cities, cats }: {
  leads: CardLead[];
  cities: string[];
  cats: { name: string; count: number }[];
}) {
  const [q, setQ] = useState('');
  const [city, setCity] = useState('');
  const [cat, setCat] = useState('');
  const [sent, setSent] = useState<Set<number>>(() => {
    if (typeof window === 'undefined') return new Set();
    try { return new Set(JSON.parse(localStorage.getItem(SENT_KEY) || '[]')); } catch { return new Set(); }
  });
  const [toast, setToast] = useState('');

  const list = useMemo(() => leads.filter((l) => {
    if (city && l.city !== city) return false;
    if (cat && l.category !== cat) return false;
    if (q) {
      const hay = `${l.name} ${l.category} ${l.city}`.toLowerCase();
      if (!hay.includes(q.toLowerCase())) return false;
    }
    return true;
  }), [leads, q, city, cat]);

  function markSent(id: number) {
    setSent((prev) => {
      const next = new Set(prev);
      next.add(id);
      try { localStorage.setItem(SENT_KEY, JSON.stringify([...next])); } catch {}
      return next;
    });
    setToast('נפתח צ׳אט וואטסאפ עם הקישור של העסק ✓');
    setTimeout(() => setToast(''), 2400);
  }

  function openWa(l: CardLead) {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const msg = waMessage(l, origin);
    const num = (l.whatsapp || (l.phoneIntl || '').replace('+', ''));
    window.open(`https://wa.me/${num}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
    markSent(l.id);
  }

  async function copyMsg(l: CardLead) {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const msg = waMessage(l, origin);
    try { await navigator.clipboard.writeText(msg); } catch {
      const ta = document.createElement('textarea');
      ta.value = msg; document.body.appendChild(ta); ta.select();
      document.execCommand('copy'); ta.remove();
    }
    setToast('ההודעה הועתקה — הדביקו איפה שתרצו ✓');
    setTimeout(() => setToast(''), 2400);
  }

  return (
    <>
      <header className="topbar" style={{ background: '#18543f' }}>
        <div className="wrap topbar-inner">
          <div className="brand">
            <span className="mark"></span>
            <div>
              <strong>מרכז הדגמות אתרים</strong>
              <small>לקוחות פוטנציאליים לקידום אורגני</small>
            </div>
          </div>
          <div className="topbar-stats"><span>{leads.length}</span> עסקים · <span>{sent.size}</span> נשלחו</div>
        </div>
      </header>

      <section className="wrap">
        <div className="intro">
          <h1>כל לקוח עם קישור משלו — מוכן לשליחה</h1>
          <p>
            כל עסק מקבל עמוד אישי (למשל <code dir="ltr">/barbershop-hod-hasharon</code>) עם הדירוג האמיתי שלו,
            מחירון, שאלות והסבר על התהליך: בערך תוך 3 חודשים גוגל מזהה את האתר ומביא 5–10 לקוחות בחודש.
            לחצו <b>שליחה</b> כדי לפתוח וואטסאפ עם הקישור שלו וההסבר, או <b>צפייה</b> כדי לראות את האתר.
          </p>
        </div>

        <div className="controls">
          <input id="search" type="search" placeholder="חיפוש לפי שם, תחום או עיר…" value={q} onChange={(e) => setQ(e.target.value)} autoComplete="off" />
          <select id="city" aria-label="סינון לפי עיר" value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="">כל הערים</option>
            {cities.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select id="cat" aria-label="סינון לפי קטגוריה" value={cat} onChange={(e) => setCat(e.target.value)}>
            <option value="">כל התחומים</option>
            {cats.map((c) => <option key={c.name} value={c.name}>{c.name} ({c.count})</option>)}
          </select>
          <span id="count" className="count" role="status">{list.length} מתוך {leads.length}</span>
        </div>

        <div id="grid" className="grid">
          {list.map((l) => {
            const hero = IMAGES[getCategory(l.category).slug]?.hero || '';
            return (
              <article className="card" key={l.id} data-sent={sent.has(l.id) ? 1 : 0}>
                <div className="thumb">
                  {hero && <img src={hero} alt="" loading="lazy" />}
                  <span className="badge">{l.category}</span>
                  {sent.has(l.id) && <span className="sentflag"><Icon name="check" size={12} /> נשלח</span>}
                </div>
                <div className="card-body">
                  <h3>{l.name}</h3>
                  <div className="meta">
                    <span className="meta-city"><Icon name="pin" size={13} />{l.city}</span>
                    {l.rating && (
                      <span className="stars"><Icon name="star" size={13} /> {l.rating}</span>
                    )}
                    {l.reviews != null && <span>({l.reviews} ביקורות)</span>}
                  </div>
                </div>
                <div className="card-actions">
                  <a className="btn btn-view" href={`/${l.slug}`} target="_blank" rel="noopener">
                    <Icon name="eye" size={15} /> צפייה באתר
                  </a>
                  <button className="btn btn-wa" type="button" onClick={() => openWa(l)}>
                    <Icon name="whatsapp" size={15} /> שליחה
                  </button>
                  <button className="btn btn-copy" type="button" title="העתקת ההודעה" onClick={() => copyMsg(l)}>
                    <Icon name="copy" size={15} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
        {list.length === 0 && <div className="empty">לא נמצאו עסקים מתאימים לסינון.</div>}
      </section>

      <footer className="foot">נבנה ב-Next.js · ההערכות באתרי ההדגמה הן להמחשה בלבד</footer>

      {toast && <div className="toast show">{toast}</div>}
    </>
  );
}
