import type { Metadata, Viewport } from 'next';
import { Montserrat, Karla } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/lib/i18n';

// DESIGN.md specifies Noto Serif + Manrope; Montserrat + Karla is the pairing
// chosen instead. Montserrat is set bold for headings — it is a wide geometric
// face, so the display sizes carry negative tracking in globals.css or the
// words drift apart. Karla is narrower and quieter underneath it.
//
// Both are variable fonts. Passing an explicit weight array makes next/font
// look for static instances Google no longer serves, which fails the build
// with a null deref inside the loader rather than a useful message.
const display = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

const body = Karla({
  subsets: ['latin'],
  variable: '--font-karla',
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
    <html lang="en" className={`${display.variable} ${body.variable}`}>
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
        <LanguageProvider>
          <SmoothScroll>
            <Nav />
            <main id="main" className="w-full">
              {children}
            </main>
            <Footer />
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
