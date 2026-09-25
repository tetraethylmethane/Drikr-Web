'use client';

import { motion } from 'motion/react';
import DarkPlate from '@/components/DarkPlate';
import Logo from '@/components/Logo';
import { useT } from '@/lib/i18n';

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const { t } = useT();

  return (
    <section className="relative flex w-full flex-col items-center overflow-hidden px-[20px] pt-[20px] pb-[56px]">
      <div className="flex w-full max-w-[1200px] justify-center py-7 sm:py-9">
        <a href="#top" aria-label="Drikr Systems">
          <Logo className="text-[17px] text-primary" />
        </a>
      </div>

      <DarkPlate
        image="field-aerial"
        priority
        className="mx-auto flex min-h-[560px] w-full max-w-[1200px] items-center justify-center rounded-media py-20"
        innerClassName="w-full"
      >
        <div className="mx-auto w-full max-w-3xl px-8 py-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
            className="mb-6 text-4xl leading-tight font-bold tracking-tight text-balance text-on-primary md:text-6xl"
          >
            {t.hero.headline}
          </motion.h1>

          {/* The headline gives the idea; this says what the thing is. Nobody
              should have to scroll to find that out. */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.16, ease }}
            className="mx-auto mb-9 max-w-[52ch] text-[16px] leading-relaxed text-pretty text-inverse-on-surface/85 md:text-[18px]"
          >
            {t.hero.what}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.26, ease }}
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
          >
            <a
              href="#get"
              className="rounded-[100px] bg-surface-container-lowest px-6 py-2.5 text-xs font-medium tracking-wide text-primary transition-opacity duration-300 hover:opacity-80"
            >
              {t.hero.cta}
            </a>
            <a
              href="#how"
              className="rounded border-b border-inverse-on-surface/40 pb-0.5 text-xs font-medium tracking-wide text-on-primary transition-colors duration-300 hover:border-inverse-on-surface"
            >
              {t.hero.alt}
            </a>
          </motion.div>
        </div>
      </DarkPlate>
    </section>
  );
}
