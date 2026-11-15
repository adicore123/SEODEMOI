// הגדרות מיתוג והודעות — נקודה אחת לשינויים.
export const CONFIG = {
  sender: {
    name: 'מחלקת קידום אתרים',
    whatsapp: '', // מספר בינלאומי ללא + (למשל 972501234567). ריק = בלי כפתור אישי
  },
};

export function waMessage(lead: { shortName: string; category: string; city: string; slug: string }, origin: string) {
  const link = `${origin}/${lead.slug}`;
  const keyword = `${lead.category} ב${lead.city}`;
  return (
    `היי ${lead.shortName} 👋\n` +
    `ראינו שאין לכם עדיין אתר — ולקוחות מחפשים בגוגל "${keyword}" כל יום.\n` +
    `בנינו לכם *אתר לדוגמה* בחינם, כדי שתראו איך העסק יכול להיראות באינטרנט 👇\n` +
    `${link}\n` +
    `למה כדאי לכם? התהליך פשוט: בערך תוך 3 חודשים גוגל מזהה ומדרג את האתר, ומשם הוא מתחיל להביא בין 5 ל-10 לקוחות חדשים בכל חודש — לקוחות שהיום מגיעים למתחרים.\n` +
    `זו הדגמה בלבד, בלי שום התחייבות 🙂`
  );
}
