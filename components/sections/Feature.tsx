'use client';

import Reveal from '@/components/ui/Reveal';
import DarkPlate from '@/components/DarkPlate';
import { cn } from '@/lib/utils';

/**
 * Copy on one side, a working demo on the other.
 *
 * The earlier version of this block carried a three-item reveal list under the
 * copy, which repeated what the five steps already say. It went: the demo is
 * the argument here, and a second explanation next to it only competes.
 */
export default function Feature({
  id,
  label,
  title,
  text,
  points,
  caption,
  panel,
  reverse = false,
  children,
}: {
  id: string;
  label: string;
  title: string;
  text: string;
  points: string[];
  caption: string;
  panel: string;
  reverse?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="px-[20px] py-[72px]">
      <div className="mx-auto max-w-[1200px]">
        <div
          className={cn(
            'flex w-full flex-col items-center gap-10 lg:flex-row lg:gap-14',
            reverse && 'lg:flex-row-reverse',
          )}
        >
          <Reveal className="w-full lg:w-2/5">
            <span className="label">{label}</span>
            <h2 className="mt-4 max-w-[18ch] text-[28px] leading-tight font-light text-primary md:text-[36px]">
              {title}
            </h2>
            <p className="mt-6 max-w-[52ch] text-[16px] leading-relaxed font-light text-secondary">
              {text}
            </p>

            {/* The same point three ways is worse than once — these are the
                takeaways, for a reader who is scanning rather than reading. */}
            <ul className="mt-7 space-y-3">
              {points.map((p) => (
                <li key={p} className="flex gap-3.5 text-[15px] leading-relaxed text-primary">
                  <span aria-hidden className="mt-[0.62em] h-px w-4 shrink-0 bg-primary/40" />
                  <span className="max-w-[46ch]">{p}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08} className="w-full lg:w-3/5">
            <div className="group relative flex items-center justify-center p-5">
              <DarkPlate image="paddy-aerial" className="absolute inset-0 rounded-media" />

              <figure className="relative z-10 w-full">
                <div
                  className="overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest/85 backdrop-blur-xl"
                  style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.04)' }}
                >
                  <div className="flex items-center justify-between border-b border-primary/10 px-4 py-3">
                    <span className="flex gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-primary/20" />
                      <span className="h-2 w-2 rounded-full bg-primary/20" />
                    </span>
                    <span className="text-[10px] font-semibold tracking-widest text-primary/50 uppercase">
                      {panel}
                    </span>
                  </div>
                  {children}
                </div>

                {/* A demo nobody realises is interactive is just a picture. */}
                <figcaption className="mt-4 px-2 text-center text-[13px] leading-relaxed text-inverse-on-surface/90">
                  {caption}
                </figcaption>
              </figure>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
