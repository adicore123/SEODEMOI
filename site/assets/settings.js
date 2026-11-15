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

// הודעת הוואטסאפ שנשלחת לעסק — קצרה ואנושית. הפרטים המלאים בעמוד הדוגמה.
window.waMessage = function (lead) {
  const link = window.baseSiteUrl() + 'demo.html?id=' + lead.id;
  return (
    'היי ' + lead.shortName + ' 👋\n' +
    'ראיתי שאין לכם עדיין אתר, אז הכנתי לכם דוגמה אישית — תנו מבט:\n' +
    link + '\n' +
    'אצל לקוחות שלנו זה כבר מביא לקוחות חדשים מגוגל כל חודש (yairdrive.co.il למשל).\n' +
    'מתי נוח לכם שיחה קצרה? כמה דקות ותדעו אם זה בשבילכם 📞'
  );
};
