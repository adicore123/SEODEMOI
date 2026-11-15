import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import Reveal from '@/components/Reveal';
import { ALL_LEADS } from '@/lib/test-lead';
import { getCategory } from '@/lib/categories';
import { getExtras } from '@/lib/extras';
import { IMAGES } from '@/lib/images';
import { CONFIG } from '@/lib/settings';

export function generateStaticParams() {
  return ALL_LEADS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const lead = ALL_LEADS.find((l) => l.slug === slug);
  return { title: lead ? `${lead.shortName} | ${lead.category} ב${lead.city}` : 'אתר לקוח' };
}

function stars(rating: string | null, size = 15) {
  const full = Math.round(Number(rating) || 5);
  return (
    <>
      {[0, 1, 2, 3, 4].map((i) => (
        <Icon key={i} name={i < full ? 'star' : 'star-line'} size={size} />
      ))}
    </>
  );
}

export default async function ClientPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lead = ALL_LEADS.find((l) => l.slug === slug);
  if (!lead) return <div style={{ padding: 80, textAlign: 'center' }}>האתר המבוקש לא נמצא</div>;

  const cat = getCategory(lead.category);
  const imgs = IMAGES[cat.slug] || { hero: '', gallery: [] as string[] };
  const seo = cat.seo;
  const extras = getExtras(lead.category);
  const kw = (t: string) => t.replace(/\{city\}/g, lead.city).replace(/\{category\}/g, lead.category);
  const mainKw = kw(seo.keyword);
  const phoneHref = `tel:${lead.phoneIntl || ''}`;
  const waHref = lead.whatsapp
    ? `https://wa.me/${lead.whatsapp}?text=${encodeURIComponent(`היי ${lead.shortName}! אשמח לקבל פרטים 🙏`)}`
    : phoneHref;
  const addr = lead.street ? `${lead.street}, ${lead.city}` : lead.city;
  const phoneDisplay = lead.phoneDisplay || lead.phoneIntl || '';
  const maps = lead.mapsUrl || '#';

  const cssVars: React.CSSProperties & Record<string, string> = {
    ['--accent' as string]: cat.accent,
    ['--accent-dark' as string]: cat.accentDark,
    ['--chip' as string]: cat.chip,
  };

  const trust = [
    { icon: lead.rating ? 'star' : 'shield-check', html: lead.rating ? `<b>${lead.rating} מתוך 5</b> בגוגל${lead.reviews ? ` · ${lead.reviews} ביקורות` : ''}` : 'עסק פעיל ומנוסה' },
    { icon: 'shield-check', html: 'אחריות ואמינות' },
    { icon: 'pin', html: `<b>${lead.city}</b> והסביבה` },
    { icon: 'clock', html: 'תיאום מהיר בטלפון ובוואטסאפ' },
  ];

  const why = [
    ['award', 'מוניטין מוכח', lead.rating
      ? `ציון ${lead.rating} בגוגל${lead.reviews ? ` מתוך ${lead.reviews} ביקורות` : ''} — הלקוחות כבר סמכו עלינו.`
      : 'עסק ותיק ומנוסה שלקוחות חוזרים אליו שוב ושוב.'],
    ['pin', 'מקומי וזמין', `נמצאים בלב ${lead.city}, קרוב אליכם — ואפשר לתאם בטלפון או בוואטסאפ בכל רגע.`],
    ['chat', 'יחס אישי', 'לא פס ייצור: מקשיבים, מייעצים בהתאמה אישית ודואגים שתצאו מרוצים.'],
  ] as const;

  const mqItems = [...seo.keywords.map(kw), mainKw];
  const marquee = [...mqItems, ...mqItems];

  return (
    <div style={cssVars}>
      <header className="topbar">
        <div className="wrap topbar-inner">
          <div className="tb-brand">
            <span className="tb-logo"><Icon name="star-line" size={19} /></span>
            <strong>{lead.shortName}</strong>
          </div>
          <nav className="tb-nav" aria-label="ניווט מהיר">
            <a href="#services">שירותים</a>
            <a href="#gallery">גלריה</a>
            <a href="#reviews">המלצות</a>
            <a href="#prices">מחירון</a>
            <a href="#faq">שאלות</a>
            <a href="#contact" className="tb-nav-cta">צור קשר</a>
          </nav>
          <div className="tb-actions">
            <a className="tb-btn tb-call" href={phoneHref}><Icon name="phone" size={16} /><span className="tb-call-label">התקשרו</span></a>
            <a className="tb-btn tb-wa" href={waHref} target="_blank" rel="noopener"><Icon name="whatsapp" size={16} /><span className="tb-wa-label">וואטסאפ</span></a>
          </div>
        </div>
      </header>

      <section className="hero" id="top">
        {imgs.hero && <div className="hero-bg" style={{ backgroundImage: `url('${imgs.hero}')` }} />}
        <div className="hero-scrim" />
        <div className="wrap hero-grid">
          <div className="hero-copy">
            {lead.rating && (
              <div className="hero-rating">
                <span className="hr-stars">{stars(lead.rating)}</span>
                <b>{lead.rating}</b>
                <span>{lead.reviews ? `· ${lead.reviews} ביקורות בגוגל` : ''}</span>
              </div>
            )}
            <h1>{lead.shortName}</h1>
            <p className="hero-sub">{lead.category} ב{lead.city}</p>
            <p className="hero-tag">{cat.tagline}</p>
            <div className="hero-cta">
              <a className="cta cta-solid" href={phoneHref}><Icon name="phone" size={18} />התקשרו עכשיו</a>
              <a className="cta cta-wa" href={waHref} target="_blank" rel="noopener"><Icon name="whatsapp" size={18} />כתבו בוואטסאפ</a>
              <a className="cta cta-ghost" href="#services"><span className="cg-label">לכל השירותים</span><Icon name="chev-down" size={16} /></a>
            </div>
            <div className="hero-kw">
              {cat.services.slice(0, 3).map((s: { title: string }) => <span key={s.title}>{s.title}</span>)}
            </div>
          </div>
        </div>
      </section>

      <div className="trustbar">
        <div className="wrap trustbar-inner">
          {trust.map((t, i) => (
            <span className="t-item" key={i}>
              <Icon name={t.icon} size={17} />
              <span dangerouslySetInnerHTML={{ __html: t.html }} />
            </span>
          ))}
        </div>
      </div>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {marquee.map((t, i) => (
            <span className="mq-item" key={i}>{t} <Icon name="star" size={12} /></span>
          ))}
        </div>
      </div>

      <main>
        <Reveal className="wrap sect">
          <section id="services">
            <div className="kicker"><i>01</i><span>השירותים שלנו</span></div>
            <h2 className="sect-title">מה תמצאו אצלנו</h2>
            <p className="sect-sub">כל מה ש{lead.shortName} מציעים ללקוחות ב{lead.city} ובסביבה — במקום אחד:</p>
            <div className="services">
              {cat.services.map((s: { icon: string; title: string; desc: string }) => (
                <div className="svc" key={s.title}>
                  <span className="svc-ico"><Icon name={s.icon} size={28} /></span>
                  <b>{s.title}</b>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal className="wrap sect">
          <section id="gallery">
            <div className="kicker"><i>02</i><span>הרושם הראשוני</span></div>
            <h2 className="sect-title">תראו בעצמכם</h2>
            <p className="sect-sub">תמונות מהעולם של {lead.shortName}</p>
            <div className="gallery">
              {imgs.gallery.map((g, i) => (
                <div className="gal" key={i}><img src={g} alt={lead.category} loading="lazy" /></div>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal className="wrap sect">
          <section id="reviews">
            <div className="kicker"><i>03</i><span>המלצות מגוגל</span></div>
            <h2 className="sect-title">מה הלקוחות אומרים</h2>
            <div className="reviews">
              <div className="rv-score">
                <span className="rv-num">{lead.rating || '—'}<small> / 5</small></span>
                <span className="rv-stars">{stars(lead.rating, 20)}</span>
                <span className="rv-count">{lead.reviews ? `${lead.reviews} ביקורות של לקוחות אמיתיים בגוגל` : 'עסק פעיל עם לקוחות חוזרים'}</span>
                <div className="rv-cta-row">
                  <a className="cta cta-solid" style={{ padding: '10px 20px', fontSize: '14.5px' }} href={maps} target="_blank" rel="noopener">
                    <Icon name="star" size={16} />לקריאת הביקורות בגוגל
                  </a>
                </div>
              </div>
              <div className="rv-themes">
                <span className="rv-themes-title">מה מציינים הלקוחות שוב ושוב</span>
                {([['spark', 'שירות ברמה גבוהה', 'לקוחות מספרים על יחס אישי ומקצועיות'],
                  ['clock', 'זמינות ומהירות', 'תיאום קל ומענה מהיר בטלפון ובוואטסאפ'],
                  ['wallet', 'יחס הוגן למחיר', 'תמורה מלאה — הלקוחות חוזרים וממליצים']] as const).map(([i, t, d]) => (
                  <div className="rv-theme" key={t}>
                    <span className="rt-ico"><Icon name={i} size={19} /></span>
                    <div><b>{t}</b><span>{d}</span></div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        <section className="seo">
          <div className="wrap">
            <div className="seo-head">
              <div className="kicker kicker-light"><i>•</i><span>קידום אורגני בגוגל</span></div>
              <h2>לקוחות מחפשים אתכם בגוגל — ומוצאים את המתחרים</h2>
              <p>
                בכל חודש מחפשים תושבי {lead.city} והסביבה אחר &quot;{mainKw}&quot; וחיפושים דומים.
                בלי אתר — הלקוחות האלה מגיעים למתחרים. עם אתר מקודם אורגנית, {lead.shortName} יכול לעמוד בראש התוצאות בדיוק כשמחפשים אתכם.
              </p>
            </div>
            <div className="seo-stats">
              <div className="stat"><b>{seo.searches}</b><span>חיפושים בחודש באזור העיר*</span></div>
              <div className="stat"><b>{seo.clicks}</b><span>כניסות פוטנציאליות לאתר*</span></div>
              <div className="stat"><b>{seo.leads}</b><span>לקוחות חדשים בחודש*</span></div>
              <div className="stat"><b>{seo.revenue}</b><span>הכנסה חודשית פוטנציאלית*</span></div>
            </div>
            <div className="seo-process">
              <div className="proc-step">
                <span className="pr-ico"><Icon name="calendar" size={20} /></span>
                <div><b>חודשים 1–2</b><span>האתר נבנה, נסרק ונכנס לאינדקס של גוגל</span></div>
              </div>
              <div className="proc-step">
                <span className="pr-ico"><Icon name="chart" size={20} /></span>
                <div><b>בערך תוך 3 חודשים</b><span>גוגל מזהה ומדרג את האתר בחיפושים המקומיים</span></div>
              </div>
              <div className="proc-step">
                <span className="pr-ico"><Icon name="users" size={20} /></span>
                <div><b>משם והלאה</b><span>האתר מביא בין 5 ל-10 לקוחות חדשים בכל חודש</span></div>
              </div>
            </div>
            <div className="seo-kw">
              <b>דוגמאות לחיפושים שמגיעים לעסק עם אתר מקודם:</b>
              <div className="kw-chips">
                {seo.keywords.map((k: string) => (
                  <span className="kw" key={k}><Icon name="search" size={14} />{kw(k)}</span>
                ))}
              </div>
            </div>
            <p className="seo-note">* הנתונים הם הערכה להמחשת הפוטנציאל העסקי בתחום ובאזור, ואינם התחייבות.</p>
          </div>
        </section>

        <Reveal className="wrap sect">
          <div className="kicker"><i>04</i><span>על העסק</span></div>
          <h2 className="sect-title">למה הלקוחות בוחרים דווקא בנו</h2>
          <div className="why">
            {why.map(([i, t, d]) => (
              <div className="why-card" key={t}>
                <span className="w-ico"><Icon name={i} size={26} /></span>
                <b>{t}</b>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="wrap sect">
          <section id="prices">
            <div className="kicker"><i>05</i><span>מחירון להמחשה</span></div>
            <h2 className="sect-title">כמה זה עולה?</h2>
            <p className="sect-sub">טווחי מחירים נפוצים בתחום — ליצירת ציפייה נכונה. להצעה מדויקת צרו קשר.</p>
            <div className="pricelist">
              {extras.prices.map(([item, price]: [string, string], i: number) => (
                <div className="p-row" key={item}>
                  <span className="p-item"><Icon name={cat.services[i]?.icon || 'check'} size={19} />{item}</span>
                  <span className="p-price">{price}</span>
                </div>
              ))}
            </div>
            <p className="price-note">* המחירים להמחשה בלבד ואינם מחייבים — ההצעה הסופית ניתנת לאחר בדיקה.</p>
          </section>
        </Reveal>

        <Reveal className="wrap sect">
          <section id="faq">
            <div className="kicker"><i>06</i><span>שאלות נפוצות</span></div>
            <h2 className="sect-title">שאלות שלקוחות שואלים</h2>
            <div className="faq">
              {extras.faq.map(([q, a]: [string, string]) => (
                <details key={q}>
                  <summary><span>{q}</span><span className="f-plus"><Icon name="chev-down" size={16} /></span></summary>
                  <div className="f-body">{a.replace(/\{city\}/g, lead.city)}</div>
                </details>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal className="wrap sect">
          <section className="contact" id="contact">
            <div className="kicker"><i>07</i><span>יצירת קשר</span></div>
            <h2 className="sect-title">דברו איתנו</h2>
            <p className="sect-sub">{lead.shortName} — {addr}. צרו קשר ונחזור אליכם מהר.</p>
            <div className="contact-cards">
              <a className="ccard" href={phoneHref}>
                <span className="cc-ico"><Icon name="phone" size={22} /></span>
                <b>טלפון</b><span dir="ltr">{phoneDisplay}</span>
                <em className="cc-arrow"><Icon name="arrow-left" size={16} /></em>
              </a>
              <a className="ccard" href={waHref} target="_blank" rel="noopener">
                <span className="cc-ico"><Icon name="whatsapp" size={22} /></span>
                <b>וואטסאפ</b><span>שלחו הודעה עכשיו</span>
                <em className="cc-arrow"><Icon name="arrow-left" size={16} /></em>
              </a>
              <a className="ccard" href={maps} target="_blank" rel="noopener">
                <span className="cc-ico"><Icon name="pin" size={22} /></span>
                <b>כתובת</b><span>{addr}</span>
                <em className="cc-arrow"><Icon name="arrow-left" size={16} /></em>
              </a>
            </div>
          </section>
        </Reveal>
      </main>

      <section className="pitch">
        <div className="wrap pitch-inner">
          <div>
            <div className="pitch-eyebrow">האתר הזה הוא הדגמה</div>
            <h2>האתר הזה יכול להיות של {lead.shortName} — תוך שבועות</h2>
            <p>
              בנינו את עמוד ההדגמה הזה בחינם כדי להראות לכם איך אתר מקצועי, מהיר ומקודם בגוגל מביא לקוחות חדשים בדיוק ברגע שהם מחפשים את השירות שלכם.
              בערך תוך 3 חודשים גוגל מזהה את האתר — ומשם הוא עובד בשבילכם: 5–10 לקוחות חדשים בכל חודש.
            </p>
          </div>
          <div className="pitch-cta">
            {CONFIG.sender.whatsapp ? (
              <a className="cta cta-wa" href={`https://wa.me/${CONFIG.sender.whatsapp}?text=${encodeURIComponent(`היי ${CONFIG.sender.name}! ראיתי את אתר ההדגמה שבניתם עבור ${lead.shortName} ואשמח לשמוע עוד 🙏`)}`} target="_blank" rel="noopener">
                <Icon name="whatsapp" size={18} />דברו איתנו בוואטסאפ
              </a>
            ) : (
              <span className="pitch-note"><Icon name="spark" size={18} />הדגמה ללא עלות וללא התחייבות — חזרו אל מי ששלח לכם את הקישור</span>
            )}
          </div>
        </div>
      </section>

      <footer className="dfoot">
        <div className="wrap dfoot-inner">
          <div>אתר הדגמה שנבנה עבור <b>{lead.shortName}</b> · הפוטנציאל המוצג להמחשה בלבד</div>
          <div className="dfoot-note">פרטי הקשר אמיתיים ונלקחו ממקורות ציבוריים. התוכן להמחשת יכולות קידום אורגני.</div>
          <div className="dfoot-access"><Icon name="users" size={14} />מונגש לבעלי מוגבלות · שירות ומידע ניתנים גם בטלפון ובוואטסאפ ללא אתר</div>
        </div>
      </footer>

      <a className="fab fab-wa" href={waHref} target="_blank" rel="noopener" aria-label="וואטסאפ">
        <Icon name="whatsapp" size={26} /><i className="fab-dot">1</i>
      </a>
      <a className="fab fab-call" href={phoneHref} aria-label="התקשרו">
        <Icon name="phone" size={24} />
      </a>
    </div>
  );
}
