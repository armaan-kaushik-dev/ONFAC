import type { Metadata, Viewport } from 'next';
import { Anton, Inter } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/providers/SmoothScroll';
import Cursor from '@/components/ui/Cursor';
import Preloader from '@/components/ui/Preloader';
import Nav from '@/components/ui/Nav';
import { SITE } from '@/lib/site';

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${SITE.name} — Thrift & Streetwear in Kharar, Punjab`,
  description:
    'ONFACMEN is a thrift and streetwear store in Sunny Enclave, Kharar. Affordable stuff and trendy articles — unisex friendly, new drops every week, open until 10 PM.',
  keywords: [
    'thrift store Kharar',
    'streetwear Punjab',
    'affordable clothes Kharar',
    'ONFACMEN',
    'Sunny Enclave shopping',
  ],
  openGraph: {
    title: `${SITE.name} — ${SITE.tagline}`,
    description:
      'Thrift and streetwear from Kharar, Punjab. Affordable stuff, trendy articles, unisex friendly.',
    type: 'website',
    locale: 'en_IN',
  },
};

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  colorScheme: 'dark',
};

// Rich result for a physical shop — worth having on a local business site.
const storeJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ClothingStore',
  name: SITE.name,
  description: SITE.tagline,
  telephone: `+${SITE.phoneE164}`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '3, Jandpur Rd, opposite Jalvayu Tower, Sector 125, Sunny Enclave',
    addressLocality: 'Kharar',
    addressRegion: 'Punjab',
    postalCode: '140301',
    addressCountry: 'IN',
  },
  openingHours: 'Mo-Su 11:00-22:00',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${anton.variable} ${inter.variable}`}>
      <body className="grain antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(storeJsonLd) }}
        />
        <Preloader />
        <Cursor />
        <Nav />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
