'use client';

import { useState } from 'react';
import Reveal from '@/components/ui/Reveal';
import DarkPlate from '@/components/DarkPlate';
import { rich } from '@/lib/rich';
import { cn } from '@/lib/utils';

export type Point = { title: string; body: string };

/**
 * Copy and an expanding list on one side, a working demo on the other.
 *
 * The list is driven by state rather than `:hover`. Opening on hover alone —
 * which is what the reference implementation does — leaves the first item
 * permanently open and the other two permanently shut on a touch screen, so a
 * phone reader simply never sees two thirds of it. Here a real `<button>`
 * toggles: pointer users still get it on hover, touch and keyboard users get it
 * on tap or Enter, and `aria-expanded` reports the state to a screen reader.
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
  points: Point[];
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
            <h2 className="mt-4 max-w-[18ch] text-[28px] leading-tight font-bold text-primary md:text-[36px]">
              {title}
            </h2>
            <p className="mt-6 max-w-[52ch] text-[16px] leading-relaxed text-secondary">
              {rich(text)}
            </p>

            <PointList points={points} />
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

function PointList({ points }: { points: Point[] }) {
  const [open, setOpen] = useState(0);

  return (
    <dl className="mt-9">
      {points.map((p, i) => {
        const isOpen = open === i;
        return (
          <div
            key={p.title}
            className="relative overflow-hidden border-t border-outline-variant last:border-b"
            onMouseEnter={() => setOpen(i)}
          >
            {/* The rule fills as the item opens — the only motion in the block,
                and it reads as progress rather than decoration. */}
            <span
              aria-hidden
              className={cn(
                'absolute top-0 start-0 h-[2px] bg-primary transition-all duration-500',
                isOpen ? 'w-full' : 'w-0',
              )}
            />
            <dt>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                onFocus={() => setOpen(i)}
                aria-expanded={isOpen}
                className="flex w-full items-baseline justify-between gap-4 rounded py-5 text-start"
              >
                <span
                  className={cn(
                    'text-[17px] leading-snug transition-colors',
                    isOpen ? 'font-semibold text-primary' : 'font-medium text-secondary',
                  )}
                >
                  {p.title}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    'mt-1 shrink-0 text-[14px] leading-none text-secondary transition-transform duration-300',
                    isOpen && 'rotate-45',
                  )}
                >
                  +
                </span>
              </button>
            </dt>
            <dd
              className={cn(
                'grid transition-[grid-template-rows] duration-300 ease-in-out',
                isOpen ? 'grid-rows-[1fr] pb-5' : 'grid-rows-[0fr]',
              )}
            >
              <p className="overflow-hidden pe-6 text-[15px] leading-relaxed text-secondary">
                {rich(p.body)}
              </p>
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
