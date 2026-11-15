import Dashboard from '@/components/Dashboard';
import { leads } from '@/lib/leads';
import { TEST_LEAD } from '@/lib/test-lead';

export default function Home() {
  const all = [TEST_LEAD, ...leads];
  const cities = [...new Set(all.map((l) => l.city))].sort();
  const catCounts: Record<string, number> = {};
  all.forEach((l) => { catCounts[l.category] = (catCounts[l.category] || 0) + 1; });
  const cats = Object.keys(catCounts).sort((a, b) => catCounts[b] - catCounts[a]);

  return (
    <Dashboard
      leads={all.map((l) => ({
        id: l.id, slug: l.slug, name: l.name, shortName: l.shortName,
        category: l.category, city: l.city, rating: l.rating, reviews: l.reviews,
        whatsapp: l.whatsapp, phoneIntl: l.phoneIntl, isTest: l.id === TEST_LEAD.id,
      }))}
      cities={cities}
      cats={cats.map((c) => ({ name: c, count: catCounts[c] }))}
    />
  );
}
