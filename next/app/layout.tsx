import type { Metadata } from 'next';
import { Heebo, Assistant } from 'next/font/google';
import './globals.css';

const heebo = Heebo({ subsets: ['hebrew', 'latin'], weight: ['400', '600', '800', '900'], variable: '--font-heebo' });
const assistant = Assistant({ subsets: ['hebrew', 'latin'], weight: ['400', '600', '700'], variable: '--font-assistant' });

export const metadata: Metadata = {
  title: { default: 'אתרי לקוחות · SEO Leads', template: '%s' },
  robots: { index: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} ${assistant.variable}`}>
      <body>{children}</body>
    </html>
  );
}
