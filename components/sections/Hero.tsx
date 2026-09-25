'use client';

import { motion } from 'motion/react';
import DarkPlate from '@/components/DarkPlate';
import Logo from '@/components/Logo';

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * The reference hero: one 20px-radius media container, the wordmark centred at
 * the top of it, a light headline and a single pill button over a dark ground.
 *
 * DESIGN.md reserves the 20px radius for media and content-heavy containers,
 * which is exactly this; the button below it takes the small UI radius instead.
 */
export default function Hero() {
  return (
    <section className="relative flex w-full flex-col items-center overflow-hidden px-[20px] pt-[20px] pb-[60px]">
      {/* Masthead, above the image rather than inside it.
          It used to sit in the plate at `top-10`, but the plate's children are
          wrapped in a centred, vertically-flexed content div — so the offset
          was measured from that wrapper, not from the top of the picture, and
          the mark floated wherever the headline happened to push it. */}
      <div className="flex w-full max-w-[1200px] justify-center py-7 sm:py-9">
        <a href="#top" aria-label="Drikr Systems — home">
          <Logo className="text-[17px] text-primary" />
        </a>
      </div>

      <DarkPlate
        image="field-aerial"
        priority
        className="mx-auto flex min-h-[600px] w-full max-w-[1200px] items-center justify-center rounded-media py-24"
        innerClassName="w-full"
      >
        <div className="mx-auto w-full max-w-4xl px-8 py-12 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
            className="mb-8 text-4xl leading-tight font-light tracking-tight text-on-primary md:text-6xl"
          >
            A field does not fail all
            <br />
            at once. It starts in a corner.
          </motion.h1>

          {/* Two actions, weighted. Not everyone arriving here is ready to
              install an APK, and a single pill gives them nothing to do but
              leave. */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease }}
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
          >
            <a
              href="#download"
              className="inline-block rounded-[100px] bg-surface-container-lowest px-6 py-2.5 text-xs font-medium tracking-wide text-primary transition-opacity duration-300 hover:opacity-80"
            >
              Get the Android app
            </a>
            <a
              href="#sensing"
              className="rounded border-b border-inverse-on-surface/40 pb-0.5 text-xs font-medium tracking-wide text-on-primary transition-colors duration-300 hover:border-inverse-on-surface"
            >
              See how it works
            </a>
          </motion.div>
        </div>
      </DarkPlate>
    </section>
  );
}
