// הגדרות מיתוג והודעות — נקודה אחת לשינויים.
export const CONFIG = {
  sender: {
    name: 'מחלקת קידום אתרים',
    whatsapp: '', // מספר בינלאומי ללא + (למשל 972501234567). ריק = בלי כפתור אישי
  },
};

// לקוחות קיימים שכבר מרוויחים — מוצגים בהודעה כהוכחה חברתית
export const PROOF_CLIENTS = ['https://yairdrive.co.il', 'https://yb-clean.co.il'];

export function waMessage(lead: { shortName: string; category: string; city: string; slug: string }, origin: string) {
  const link = `${origin}/${lead.slug}`;
  const keyword = `${lead.category} ב${lead.city}`;
  const proof = PROOF_CLIENTS.join(' ו-');
  return (
    `היי ${lead.shortName} 👋\n` +
    `ראינו שאין לכם עדיין אתר — ולקוחות מחפשים בגוגל "${keyword}" כל יום.\n` +
    `בנינו לכם *אתר לדוגמה* בחינם, כדי שתראו איך העסק יכול להיראות באינטרנט 👇\n` +
    `${link}\n` +
    `אצלנו זה כבר עובד: לקוחות כמו ${proof} כבר מדורגים בגוגל, מביאים לקוחות חדשים כל חודש ומרוויחים מהאתר.\n` +
    `התהליך פשוט: בערך תוך 3 חודשים גוגל מזהה ומדרג את האתר, ומשם הוא מביא בין 5 ל-10 לקוחות חדשים בכל חודש — לקוחות שהיום מגיעים למתחרים.\n` +
    `זו הדגמה בלבד, בלי שום התחייבות 🙂`
  );
}
