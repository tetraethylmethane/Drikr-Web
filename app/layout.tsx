import type { Metadata, Viewport } from 'next';
import { Roboto_Slab, Roboto } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

// DESIGN.md specifies Noto Serif + Manrope; Roboto Slab + Roboto is the
// pairing chosen instead. Same roles — slab for headlines, sans for body —
// and because both share one skeleton, the slab reads as emphasis rather than
// as a second voice.
//
// Both are variable fonts. Passing an explicit weight array makes next/font
// look for static instances Google no longer serves, which fails the build
// with a null deref inside the loader rather than a useful message.
const serif = Roboto_Slab({
  subsets: ['latin'],
  variable: '--font-roboto-slab',
  display: 'swap',
});

const sans = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Drikr — knowing which corner of the field has the problem',
  description:
    'Sensors in the soil, the reasoning on the farmer’s phone, and a drone that treats the affected patch instead of the whole field. Built for Smart India Hackathon 2026.',
  icons: { icon: '/favicon.png' },
};

export const viewport: Viewport = {
  themeColor: '#f9f9f9',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <head>
        {/* Material Symbols, as the reference implementation uses for the
            capabilities grid. Loaded with the outlined, unfilled axis only. */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary focus:px-4 focus:py-2 focus:text-on-primary"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <Nav />
          <main id="main" className="w-full">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
