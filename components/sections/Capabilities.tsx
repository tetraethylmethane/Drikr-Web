'use client';

import Reveal from '@/components/ui/Reveal';

/**
 * The four-column capabilities grid from the reference: a hairline above each
 * column, one Material Symbol, a title and two lines of copy.
 *
 * The reference sets the titles 100px below the icon, which is what produces
 * the long empty column the screenshot shows. That is deliberate in the
 * original — whitespace as a functional element — so it is kept.
 */

const ITEMS = [
  {
    icon: 'sensors',
    title: 'Sparse sensing',
    body: 'Four stations and the arithmetic between them describe a whole field, so treatment can follow the patch rather than the boundary.',
  },
  {
    icon: 'rule',
    title: 'Evidence gating',
    body: 'Every risk carries its confidence separately from its score. Thin evidence is held back, and the app shows you what it held.',
  },
  {
    icon: 'flight',
    title: 'Proposed missions',
    body: 'Routes are planned to individual cells and stay proposals until a person confirms. Abort remains live for the whole flight.',
  },
  {
    icon: 'cloud_off',
    title: 'Offline reasoning',
    body: 'Scoring, interpolation and mission planning all run on the phone, so the field works with no signal at all.',
  },
];

export default function Capabilities() {
  return (
    <section className="px-[20px] pt-[96px] pb-[112px]">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <div className="mb-16">
            <span className="label">The capabilities</span>
            <h2 className="mt-4 text-[32px] leading-tight font-light text-primary md:text-[42px]">
              Four ideas the whole
              <br />
              system rests on
            </h2>
          </div>
        </Reveal>

        <dl className="grid grid-cols-1 gap-x-8 gap-y-14 pt-14 md:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.06}>
              <div className="relative flex h-full flex-col">
                <div className="w-full border-t border-outline-variant" />
                <span className="material-symbols-outlined mt-6 text-2xl text-primary" aria-hidden>
                  {it.icon}
                </span>
                <dt className="mb-3 pt-10 text-[20px] font-medium tracking-tight text-primary">
                  {it.title}
                </dt>
                <dd className="text-[16px] leading-relaxed font-light text-secondary">{it.body}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
