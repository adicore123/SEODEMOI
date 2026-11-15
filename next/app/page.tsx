import Dashboard from '@/components/Dashboard';
import { leads } from '@/lib/leads';

export default function Home() {
  const cities = [...new Set(leads.map((l) => l.city))].sort();
  const catCounts: Record<string, number> = {};
  leads.forEach((l) => { catCounts[l.category] = (catCounts[l.category] || 0) + 1; });
  const cats = Object.keys(catCounts).sort((a, b) => catCounts[b] - catCounts[a]);

  return (
    <Dashboard
      leads={leads.map((l) => ({
        id: l.id, slug: l.slug, name: l.name, shortName: l.shortName,
        category: l.category, city: l.city, rating: l.rating, reviews: l.reviews,
        whatsapp: l.whatsapp, phoneIntl: l.phoneIntl,
      }))}
      cities={cities}
      cats={cats.map((c) => ({ name: c, count: catCounts[c] }))}
    />
  );
}
