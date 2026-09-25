'use client';

import Reveal from '@/components/ui/Reveal';
import { useT } from '@/lib/i18n';
import { cn } from '@/lib/utils';

const ICONS = ['pest_control', 'water_drop', 'science', 'air', 'eco'];

/**
 * The five things scored, one line each. The names are the ones the app itself
 * puts on screen, so the site and the product agree.
 */
export default function Watches() {
  const { t } = useT();

  return (
    <section id="watch" className="px-[20px] pt-[72px] pb-[96px]">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <span className="label">{t.watch.label}</span>
          <h2 className="mt-4 max-w-[20ch] text-[30px] leading-tight font-bold text-primary md:text-[40px]">
            {t.watch.title}
          </h2>
        </Reveal>

        <dl className="mt-12">
          {t.watch.items.map((it, i) => (
            <Reveal key={it.name} delay={i * 0.04}>
              <div
                className={cn(
                  'grid items-baseline gap-x-8 gap-y-2 border-t border-outline-variant py-6 sm:grid-cols-12',
                  i === t.watch.items.length - 1 && 'border-b',
                )}
              >
                <dt className="flex items-center gap-3.5 sm:col-span-4">
                  <span className="material-symbols-outlined text-[20px] text-primary" aria-hidden>
                    {ICONS[i]}
                  </span>
                  <span className="text-[20px] font-normal text-primary">{it.name}</span>
                </dt>
                <dd className="max-w-[60ch] text-[16px] leading-relaxed text-secondary sm:col-span-8">
                  {it.text}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
