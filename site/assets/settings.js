// settings.js — הגדרות גלובליות. את השדות כאן אפשר לשנות במקום אחד.
window.CONFIG = {
  // בסיס כתובת לקישורים בהודעות וואטסאפ. ריק = מחושב אוטומטית מכתובת העמוד.
  // אחרי פריסה אפשר להציב כאן ידנית, למשל: "https://example.zcode.site/"
  baseUrl: "",

  // מיתוג השולח — מופיע בהודעה ובפוטר של אתרי ההדגמה.
  sender: {
    name: "מחלקת קידום אתרים",
    whatsapp: "", // מספר בפורמט בינלאומי ללא + (למשל 972501234567). ריק = בלי כפתור יצירת קשר אישי
  },
};

// מחזיר בסיס כתובת עבודה: ידני מהקונפיג, או מנוסח מכתובת העמוד הנוכחית
window.baseSiteUrl = function () {
  if (window.CONFIG.baseUrl) return window.CONFIG.baseUrl;
  if (location.protocol.startsWith('http')) {
    return location.href.replace(/[^/]*$/, '');
  }
  return ''; // file:// מקומי — אין כתובת ציבורית
};

// הודעת הוואטסאפ שנשלחת לעסק
window.waMessage = function (lead) {
  const link = window.baseSiteUrl() + 'demo.html?id=' + lead.id;
  const keyword = lead.category + ' ב' + lead.city;
  return (
    'היי ' + lead.shortName + ' 👋\n' +
    'בדקנו את העסק שלכם וראינו שאין עדיין אתר — בזמן שלקוחות מחפשים בגוגל "' + keyword + '" כל יום 📊\n' +
    'בנינו לכם *אתר לדוגמא* בחינם, שמראה איך העסק יכול להופיע ראשון בגוגל ולהביא לקוחות חדשים 👇\n' +
    link + '\n' +
    'זו הדגמה בלבד, בלי שום התחייבות 🙂'
  );
};
