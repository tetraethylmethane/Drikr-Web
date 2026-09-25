'use client';

import DarkPlate from '@/components/DarkPlate';

/**
 * The interstitial: one wide media block carrying a single sentence. It exists
 * to give the eye a rest between two dense split sections, so it holds exactly
 * one idea and no controls.
 */
export default function Statement({ children }: { children: React.ReactNode }) {
  return (
    <section className="px-[20px] pt-12 pb-12">
      <div className="mx-auto max-w-[1200px]">
        <DarkPlate
          image="paddy-aerial"
          className="flex h-[400px] w-full items-center justify-center rounded-media md:h-[500px]"
          innerClassName="w-full"
        >
          <p className="mx-auto max-w-2xl px-8 text-center text-3xl leading-tight font-light tracking-tight text-on-primary md:text-5xl">
            {children}
          </p>
        </DarkPlate>
      </div>
    </section>
  );
}
