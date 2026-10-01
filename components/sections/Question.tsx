'use client';

import { motion } from 'motion/react';
import Reveal from '@/components/ui/Reveal';
import { useT } from '@/lib/i18n';

/** The whole project in two questions: the one farming asks, and the better one. */
export default function Question() {
  const { t } = useT();

  return (
    <section id="question" className="px-[20px] pt-[64px] pb-[96px]">
      <div className="mx-auto max-w-[1000px] text-center">
        <Reveal>
          <span className="label block">{t.question.before}</span>
          <p className="relative mx-auto mt-4 inline-block font-headline text-[24px] leading-snug text-secondary md:text-[32px]">
            {t.question.q1}
            <motion.span
              aria-hidden
              className="absolute top-1/2 start-0 h-[2px] bg-primary"
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true, margin: '-20%' }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-14">
          <span className="label block">{t.question.after}</span>
          <p className="mt-5 font-headline text-[30px] leading-tight font-bold tracking-[-0.03em] text-balance text-primary md:text-[48px]">{t.question.q2}</p>
        </Reveal>
      </div>
    </section>
  );
}
