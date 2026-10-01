'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Globe, X } from 'lucide-react';
import { LANGS, useT, type Lang } from '@/lib/i18n';
import { cn } from '@/lib/utils';

const STORAGE_KEY = 'drikr-lang';

/**
 * First visit only: "which language?", as the app asks on its first screen.
 *
 * Optional by design - the site has already guessed from the browser, and
 * "Continue" keeps that guess. Either answer is saved, so the question never
 * comes back; the switcher in the nav and footer still changes it later. The
 * title is in the guessed language with English beneath, and every choice is
 * written in its own script.
 */
export default function LangPrompt() {
  const { lang, setLang, t } = useT();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let saved: string | null = 'unknown';
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch {
      // Storage blocked: asking every visit would be worse than not asking.
    }
    if (saved !== null) return;
    const id = setTimeout(() => setOpen(true), 900);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && choose(lang);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, lang]);

  const choose = (l: Lang) => {
    setLang(l); // saves the choice
    setOpen(false);
  };

  const current = LANGS.find((l) => l.code === lang)?.name ?? 'English';

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[90] flex items-end justify-center bg-black/45 p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => choose(lang)}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="lang-prompt-title"
            className="w-full max-w-[560px] rounded-t-media bg-background p-6 sm:rounded-media sm:p-8"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <Globe className="h-6 w-6 text-primary" strokeWidth={1.5} aria-hidden />
                <div>
                  <h2 id="lang-prompt-title" className="text-[22px] leading-tight font-bold text-primary">
                    {t.nav.langTitle}
                  </h2>
                  {lang !== 'en' ? <p className="text-[13px] text-secondary">Choose your language</p> : null}
                </div>
              </div>
              <button
                onClick={() => choose(lang)}
                className="rounded p-1 text-secondary hover:text-primary"
                aria-label={`${t.nav.langKeep} — ${current}`}
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>

            <ul className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {LANGS.map((l) => (
                <li key={l.code}>
                  <button
                    lang={l.code}
                    dir={l.rtl ? 'rtl' : undefined}
                    onClick={() => choose(l.code)}
                    className={cn(
                      'w-full rounded-lg border px-3 py-3 text-[17px] font-semibold transition-colors',
                      l.code === lang
                        ? 'border-primary bg-primary text-on-primary'
                        : 'border-outline-variant bg-surface-container-lowest text-primary hover:border-primary',
                    )}
                  >
                    {l.name}
                  </button>
                </li>
              ))}
            </ul>

            <button
              onClick={() => choose(lang)}
              className="mt-6 w-full rounded-[100px] bg-primary px-6 py-3 text-[14px] font-medium text-on-primary transition-opacity hover:opacity-85"
            >
              {t.nav.langKeep} — {current}
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
