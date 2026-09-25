'use client';

import Reveal from '@/components/ui/Reveal';
import { useT } from '@/lib/i18n';
import { cn } from '@/lib/utils';

/**
 * The five steps, one sentence each.
 *
 * This is the section that makes the rest of the page legible — without it
 * every other block quietly assumes the reader already knows what the system
 * is. One sentence per step is the whole budget; anything that needs a
 * paragraph belongs in the app, not on a landing page.
 */
export default function Steps() {
  const { t } = useT();

  return (
    <section id="how" className="px-[20px] pt-[96px] pb-[88px]">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <span className="label">{t.how.label}</span>
          <h2 className="mt-4 max-w-[16ch] text-[30px] leading-tight font-light text-primary md:text-[40px]">
            {t.how.title}
          </h2>
        </Reveal>

        <ol className="mt-14">
          {t.how.steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.04}>
              <li
                className={cn(
                  'grid items-baseline gap-x-8 gap-y-2 border-t border-outline-variant py-6 sm:grid-cols-12',
                  i === t.how.steps.length - 1 && 'border-b',
                )}
              >
                <span className="font-headline text-[16px] leading-none text-secondary sm:col-span-1">
                  {s.n}
                </span>
                <h3 className="text-[20px] leading-snug font-normal text-primary sm:col-span-4">
                  {s.title}
                </h3>
                <p className="max-w-[58ch] text-[16px] leading-relaxed font-light text-secondary sm:col-span-7">
                  {s.text}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
