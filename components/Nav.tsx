'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import Logo from '@/components/Logo';

/**
 * The reference puts only a centred wordmark inside the hero and leaves the top
 * bar out. That reads well but leaves a long page with no way back, so the bar
 * here stays hidden until you have scrolled past the hero and then fades in —
 * the hero composition is preserved, and the page stays navigable.
 */
const ITEMS = [
  { href: '#sensing', label: 'Sensing' },
  { href: '#judgement', label: 'Judgement' },
  { href: '#capabilities', label: 'Capabilities' },
];

export default function Nav() {
  const [shown, setShown] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 620);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-all duration-500',
        shown
          ? 'translate-y-0 border-outline-variant bg-background/95 opacity-100 backdrop-blur-sm'
          : 'pointer-events-none -translate-y-full border-transparent opacity-0',
      )}
    >
      <nav className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-8 px-[20px]">
        <a href="#top" aria-label="Drikr Systems — top of page" className="text-primary">
          <Logo className="text-[15px]" />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {ITEMS.map((it) => (
            <li key={it.href}>
              <a
                href={it.href}
                className="rounded text-sm text-secondary transition-colors hover:text-primary"
              >
                {it.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <a
            href="#download"
            className="rounded-[100px] bg-primary px-5 py-2 text-xs font-medium tracking-wide text-on-primary transition-opacity duration-300 hover:opacity-80"
          >
            Get the app
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-8 w-8 flex-col items-center justify-center gap-[5px] rounded md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span
              className={cn(
                'h-px w-4 bg-primary transition-transform duration-300',
                open && 'translate-y-[3px] rotate-45',
              )}
            />
            <span
              className={cn(
                'h-px w-4 bg-primary transition-transform duration-300',
                open && '-translate-y-[3px] -rotate-45',
              )}
            />
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-outline-variant bg-background md:hidden">
          <ul className="mx-auto max-w-[1200px] px-[20px] py-2">
            {ITEMS.map((it) => (
              <li key={it.href} className="border-b border-outline-variant last:border-0">
                <a
                  href={it.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 text-base text-primary"
                >
                  {it.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
