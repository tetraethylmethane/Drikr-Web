'use client';

import { LANGS, useT } from '@/lib/i18n';
import { cn } from '@/lib/utils';

/**
 * Thirteen languages, as a native `<select>`.
 *
 * A row of buttons worked at three and would be unreadable at thirteen. A
 * custom dropdown would mean rebuilding focus trapping, type-ahead and touch
 * behaviour that the platform already ships — and on a low-end Android phone,
 * which is the device that matters here, the native picker is a full-screen
 * list that is far easier to hit than anything drawn in the page.
 *
 * Each option is written in its own script. A speaker of Odia can always read
 * ଓଡ଼ିଆ; "Odia" in Latin script is a label for somebody who already reads
 * English, which is the wrong person to design this control for.
 */
export default function LangSwitch({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const { lang, setLang, t, loading } = useT();
  const dark = tone === 'dark';

  return (
    <label
      className={cn(
        'relative inline-flex items-center rounded border transition-colors',
        dark ? 'border-inverse-on-surface/30' : 'border-outline-variant',
        loading && 'opacity-60',
      )}
    >
      <span className="sr-only">{t.nav.lang}</span>

      <select
        value={lang}
        onChange={(e) => setLang(e.target.value as typeof lang)}
        disabled={loading}
        className={cn(
          'cursor-pointer appearance-none bg-transparent py-1.5 ps-3 pe-7 text-[13px] leading-none font-medium outline-none',
          dark ? 'text-on-primary' : 'text-primary',
        )}
      >
        {LANGS.map((l) => (
          // The option list is rendered by the OS, which will not honour our
          // colours — so they are set explicitly rather than inherited into
          // white-on-white.
          <option key={l.code} value={l.code} style={{ color: '#000', background: '#fff' }}>
            {l.name}
          </option>
        ))}
      </select>

      <span
        aria-hidden
        className={cn(
          'pointer-events-none absolute end-2.5 text-[9px] leading-none',
          dark ? 'text-inverse-on-surface/70' : 'text-secondary',
        )}
      >
        ▼
      </span>
    </label>
  );
}
