'use client';

import { LANGS, useT } from '@/lib/i18n';
import { cn } from '@/lib/utils';

/**
 * Three languages, shown as three words rather than hidden behind a globe icon
 * and a dropdown. A reader who needs Tamil should be able to see that Tamil is
 * available without first working out what the icon means.
 *
 * Each option is labelled in its own script, which is the one label a speaker
 * of that language can always read.
 */
export default function LangSwitch({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const { lang, setLang, t } = useT();

  return (
    <div
      role="group"
      aria-label={t.nav.lang}
      className={cn(
        'flex items-center rounded border',
        tone === 'dark' ? 'border-inverse-on-surface/30' : 'border-outline-variant',
      )}
    >
      {LANGS.map((l) => {
        const on = l.code === lang;
        return (
          <button
            key={l.code}
            type="button"
            onClick={() => setLang(l.code)}
            aria-pressed={on}
            title={l.full}
            className={cn(
              'px-2.5 py-1.5 text-[12px] leading-none font-medium transition-colors first:rounded-l last:rounded-r',
              on
                ? tone === 'dark'
                  ? 'bg-surface-container-lowest text-primary'
                  : 'bg-primary text-on-primary'
                : tone === 'dark'
                  ? 'text-inverse-on-surface/70 hover:text-on-primary'
                  : 'text-secondary hover:text-primary',
            )}
          >
            {l.label}
          </button>
        );
      })}
    </div>
  );
}
