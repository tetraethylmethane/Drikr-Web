'use client';

import { useState } from 'react';
import Reveal from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';
import DarkPlate from '@/components/DarkPlate';

/**
 * The reference's split feature block: 2/5 of copy with an interactive reveal
 * list, and 3/5 of media carrying a floating panel.
 *
 * Two deliberate departures from the reference *implementation*, both taken
 * from DESIGN.md, which is the system of record:
 *
 *  - `shadow-2xl` becomes the ambient shadow DESIGN.md specifies —
 *    0 10px 40px rgba(0,0,0,0.04) — under "avoids heavy shadows".
 *  - the panel takes `rounded-xl` (12px). The reference writes `rounded-full`,
 *    which only works because its own config redefines `full` as 0.75rem;
 *    with DESIGN.md's `full: 9999px` that class would round the panel into a
 *    pill. Same rendered result, stated honestly.
 */

export type RevealItem = { title: string; body: string };

export default function Capability({
  eyebrow,
  heading,
  icon,
  title,
  lead,
  items,
  reverse = false,
  /** Lets the page vary the gap above each block rather than repeating one
      value down the whole document — DESIGN.md asks for 128px+ separation with
      rhythm, and identical spacing everywhere reads as a template. */
  topPad = 'pt-[128px]',
  children,
}: {
  eyebrow: string;
  heading: React.ReactNode;
  icon: string;
  title: string;
  lead: string;
  items: RevealItem[];
  reverse?: boolean;
  topPad?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <section className={cn('px-[20px] pb-12', topPad)}>
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <span className="label">{eyebrow}</span>
            <h2 className="mt-4 text-[32px] leading-tight font-light text-primary md:text-[42px]">
              {heading}
            </h2>
          </Reveal>
        </div>
      </section>

      <section className="px-[20px] pt-8 pb-12">
        <div className="mx-auto max-w-[1200px]">
          <div
            className={cn(
              'flex w-full flex-col lg:min-h-[700px] lg:flex-row',
              reverse && 'lg:flex-row-reverse',
            )}
          >
            {/* copy */}
            <div className="flex h-full w-full flex-col justify-between py-5 lg:w-2/5">
              <div className="h-full w-full max-w-md">
                <div className="flex h-full flex-col">
                  <div>
                    <div className="mb-6 flex items-center gap-3">
                      <span className="material-symbols-outlined text-2xl text-primary" aria-hidden>
                        {icon}
                      </span>
                      <h3 className="text-[32px] font-light tracking-tight text-primary md:text-[42px]">
                        {title}
                      </h3>
                    </div>
                    <p className="mb-10 text-sm leading-relaxed font-light text-secondary">
                      {lead}
                    </p>
                  </div>

                  <RevealList items={items} />
                </div>
              </div>
            </div>

            {/* media + panel */}
            <div className="group relative flex w-full items-center justify-center self-stretch p-5 lg:w-3/5">
              <DarkPlate
                image="paddy-aerial"
                className="absolute inset-5 rounded-media"
              />

              <div
                className="relative z-10 mx-4 w-full overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest/80 backdrop-blur-xl transition-transform duration-500 group-hover:-translate-y-1"
                style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.04)' }}
              >
                {children}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/**
 * The reveal list, driven by state rather than `:hover`.
 *
 * The reference opens these on hover alone, which on a touch screen leaves item
 * one permanently open and items two and three permanently shut — a third of
 * the copy simply unreachable on a phone. Here a real `<button>` toggles the
 * open item: pointer users still get it on hover, touch and keyboard users get
 * it on tap or Enter, and `aria-expanded` reports the state.
 */
function RevealList({ items }: { items: RevealItem[] }) {
  const [open, setOpen] = useState(0);

  return (
    <dl className="mt-auto space-y-2">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div
            key={it.title}
            className="group relative overflow-hidden border-t border-outline-variant"
            onMouseEnter={() => setOpen(i)}
          >
            <div
              className={cn(
                'absolute top-0 left-0 h-[2px] bg-primary transition-all duration-500',
                isOpen ? 'w-full' : 'w-0',
              )}
            />
            <dt>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                onFocus={() => setOpen(i)}
                aria-expanded={isOpen}
                className={cn(
                  'w-full rounded pt-6 pb-2 text-left text-lg font-medium transition-colors',
                  isOpen ? 'text-primary' : 'text-secondary hover:text-primary',
                )}
              >
                {it.title}
              </button>
            </dt>
            {/* 0fr → 1fr animates height without committing to a pixel value. */}
            <dd
              className={cn(
                'grid transition-[grid-template-rows] duration-300 ease-in-out',
                isOpen ? 'grid-rows-[1fr] pb-4' : 'grid-rows-[0fr]',
              )}
            >
              <p className="overflow-hidden pr-4 text-sm leading-relaxed font-light text-secondary">
                {it.body}
              </p>
            </dd>
          </div>
        );
      })}
    </dl>
  );
}

/** The panel chrome from the reference: a label bar with two dots. */
export function PanelHeader({ name }: { name: string }) {
  return (
    <div className="flex items-center justify-between border-b border-primary/10 bg-surface-container-lowest/40 p-4">
      <div className="flex items-center gap-4">
        <span className="h-2 w-2 rounded-full bg-primary/20" />
        <span className="h-2 w-2 rounded-full bg-primary/20" />
      </div>
      <span className="text-[10px] font-semibold tracking-widest text-primary/50 uppercase">
        {name}
      </span>
    </div>
  );
}
