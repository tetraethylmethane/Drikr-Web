'use client';

import { Bug, CloudRain, Droplets, Layers, Microscope, Thermometer } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import SectionHead, { STATE_STYLE } from '@/components/ui/SectionHead';
import { useT } from '@/lib/i18n';
import { rich } from '@/lib/rich';

const ICONS = [CloudRain, Layers, Droplets, Bug, Microscope, Thermometer];

/** A 5-acre field as 50 tenth-acre squares; eight of them are the real problem. */
const COLS = 10;
const ROWS = 5;
const AFFECTED = new Set([16, 17, 26, 27, 28, 36, 37, 38]);

export default function Problem() {
  const { t } = useT();

  return (
    <section id="problem" className="px-[20px] pt-[96px] pb-[72px]">
      <div className="mx-auto max-w-[1200px]">
        <SectionHead label={t.problem.label} title={t.problem.title} text={t.problem.text} />

        <Reveal>
        <ul className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-media border border-outline-variant bg-outline-variant md:grid-cols-3">
          {t.problem.causes.map((c, i) => {
            const Icon = ICONS[i];
            return (
              <li key={c.name} className="bg-background p-6 md:p-8">
                <Icon className="h-6 w-6 text-primary" strokeWidth={1.5} aria-hidden />
                <h3 className="mt-5 text-[18px] font-semibold text-primary">{c.name}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-secondary">{c.text}</p>
              </li>
            );
          })}
        </ul>
        </Reveal>

        <Reveal className="mt-16 grid items-center gap-10 lg:grid-cols-5 lg:gap-14">
          <div className="lg:col-span-2">
            <span className="label">{t.problem.exampleTitle}</span>
            <p className="mt-4 text-[18px] leading-relaxed text-secondary">{rich(t.problem.example)}</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-3">
            <MiniField title={t.problem.sprayed} value={`5 ${t.problem.acres}`} all />
            <MiniField title={t.problem.affected} value={`0.8 ${t.problem.acres}`} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function MiniField({ title, value, all = false }: { title: string; value: string; all?: boolean }) {
  return (
    <figure>
      <div
        className="grid gap-[3px] rounded-xl border border-outline-variant bg-surface-container-lowest p-3"
        style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}
        aria-hidden
      >
        {Array.from({ length: COLS * ROWS }).map((_, k) => (
          <span
            key={k}
            className="aspect-square rounded-[2px]"
            style={all || AFFECTED.has(k) ? STATE_STYLE.problem : STATE_STYLE.healthy}
          />
        ))}
      </div>
      <figcaption className="mt-3 flex items-baseline justify-between gap-3">
        <span className="text-[14px] text-secondary">{title}</span>
        <span className="font-headline text-[22px] font-bold text-primary">{value}</span>
      </figcaption>
    </figure>
  );
}
