// כרטיס בדיקה אישי של המשתמש — עמוד דוגמה מלא שכל ערוצי הקשר בו מכוונים אליו,
// לצורך בדיקות מקצה לקצה של הזרימה (דשבורד → הודעת וואטסאפ → עמוד הלקוח).
import { leads, type Lead } from './leads';

export const TEST_LEAD: Lead = {
  id: 999,
  slug: 'naor-demo',
  name: 'אתר בדיקה — נאור (מספרת גברים בהוד השרון)',
  shortName: 'אתר בדיקה — נאור',
  category: 'מספרת גברים',
  city: 'הוד השרון',
  street: '',
  rating: null,
  reviews: null,
  phoneIntl: '+97250061808',
  phoneDisplay: '050-061-1808',
  whatsapp: '97250061808',
  mapsUrl: null,
  sourceUrl: null,
};

/** כל הלידים כולל כרטיס הבדיקה בסוף */
export const ALL_LEADS: Lead[] = [...leads, TEST_LEAD];
