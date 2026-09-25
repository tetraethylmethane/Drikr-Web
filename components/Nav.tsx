'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import Logo from '@/components/Logo';
import LangSwitch from '@/components/LangSwitch';
import { useT } from '@/lib/i18n';

/**
 * Hidden until you have scrolled past the hero, then it fades in. The hero
 * carries its own masthead, so a bar on top of it would be the mark twice.
 */
export default function Nav() {
  const { t } = useT();
  const [shown, setShown] = useState(false);
  const [open, setOpen] = useState(false);

  const items = [
    { href: '#how', label: t.nav.how },
    { href: '#trust', label: t.nav.trust },
    { href: '#watch', label: t.nav.watch },
  ];

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 560);
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
      <nav className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-6 px-[20px]">
        <a href="#top" aria-label="Drikr Systems" className="text-primary">
          <Logo className="text-[15px]" />
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {items.map((it) => (
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

        <div className="flex items-center gap-3">
          <LangSwitch />
          <a
            href="#get"
            className="hidden rounded-[100px] bg-primary px-5 py-2 text-xs font-medium tracking-wide text-on-primary transition-opacity duration-300 hover:opacity-80 sm:inline-block"
          >
            {t.nav.get}
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-8 w-8 flex-col items-center justify-center gap-[5px] rounded lg:hidden"
            aria-label={t.nav.how}
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
        <div className="border-t border-outline-variant bg-background lg:hidden">
          <ul className="mx-auto max-w-[1200px] px-[20px] py-2">
            {items.map((it) => (
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
