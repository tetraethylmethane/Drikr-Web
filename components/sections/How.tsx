'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Plane, Radio } from 'lucide-react';
import SectionHead from '@/components/ui/SectionHead';
import { useT } from '@/lib/i18n';
import { cn } from '@/lib/utils';

/**
 * The two ways in: a drone scan on request, or sensors that stay in the field
 * and call for one. Tabs, because a reader wants one path at a time, and both
 * paths end at the same place — treating only the patch.
 */
export default function How() {
  const { t } = useT();
  const [tab, setTab] = useState<0 | 1>(0);
  const steps = tab === 0 ? t.how.drone : t.how.sensor;
  const icons = [Plane, Radio];

  return (
    <section id="how" className="px-[20px] pt-[72px] pb-[88px]">
      <div className="mx-auto max-w-[1200px]">
        <SectionHead label={t.how.label} title={t.how.title} />

        <div role="tablist" aria-label={t.how.title} className="mt-10 inline-flex rounded-[100px] border border-outline-variant p-1">
          {t.how.tabs.map((name, i) => {
            const Icon = icons[i];
            const on = tab === i;
            return (
              <button
                key={name}
                role="tab"
                aria-selected={on}
                onClick={() => setTab(i as 0 | 1)}
                className={cn(
                  'flex items-center gap-2 rounded-[100px] px-4 py-2 text-[13px] font-medium transition-colors duration-300 sm:px-5',
                  on ? 'bg-primary text-on-primary' : 'text-secondary hover:text-primary',
                )}
              >
                <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                {name}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.ol
            key={tab}
            role="tabpanel"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10"
          >
            {steps.map((s, i) => (
              <li
                key={s.n}
                className={cn(
                  'grid items-baseline gap-x-8 gap-y-2 border-t border-outline-variant py-6 sm:grid-cols-12',
                  i === steps.length - 1 && 'border-b',
                )}
              >
                <span className="font-headline text-[16px] leading-none text-secondary sm:col-span-1">{s.n}</span>
                <h3 className="text-[20px] leading-snug font-normal text-primary sm:col-span-4">{s.title}</h3>
                <p className="max-w-[58ch] text-[16px] leading-relaxed text-secondary sm:col-span-7">{s.text}</p>
              </li>
            ))}
          </motion.ol>
        </AnimatePresence>
      </div>
    </section>
  );
}
