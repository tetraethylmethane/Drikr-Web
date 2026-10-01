'use client';

import { HandCoins, Plane, Smartphone } from 'lucide-react';
import DarkPlate from '@/components/DarkPlate';
import Reveal from '@/components/ui/Reveal';
import SectionHead from '@/components/ui/SectionHead';
import { useT } from '@/lib/i18n';

const ICONS = [Smartphone, Plane, HandCoins];

/** Drone as a service: the farmer books, a local operator flies, pay per acre. */
export default function Service() {
  const { t } = useT();

  return (
    <section id="service" className="px-[20px] py-[72px]">
      <div className="mx-auto max-w-[1200px]">
        {/* The paddy photo is bright green edge to edge, so this block carries
            a full wash on top of the plate's own scrim to keep the type legible. */}
        <DarkPlate image="paddy-aerial" scrim="bottom" className="rounded-media" innerClassName="bg-black/55 p-8 md:p-14">
          <SectionHead invert label={t.service.label} title={t.service.title} text={t.service.text} />

          <ol className="mt-12 grid gap-4 md:grid-cols-3">
            {t.service.steps.map((s, i) => {
              const Icon = ICONS[i];
              return (
                <Reveal key={s.name} delay={i * 0.06}>
                  <li className="h-full rounded-xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur-md">
                    <div className="flex items-center justify-between">
                      <Icon className="h-6 w-6 text-on-primary" strokeWidth={1.5} aria-hidden />
                      <span className="font-headline text-[14px] text-inverse-on-surface/60">0{i + 1}</span>
                    </div>
                    <h3 className="mt-6 text-[19px] font-semibold text-on-primary">{s.name}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-inverse-on-surface/80">{s.text}</p>
                  </li>
                </Reveal>
              );
            })}
          </ol>

          <dl className="mt-12 grid gap-8 border-t border-white/15 pt-10 md:grid-cols-3">
            {t.service.figures.map((f, i) => (
              <Reveal key={f.label} delay={i * 0.06}>
                <dt className="font-headline text-[36px] leading-none font-bold text-on-primary md:text-[44px]">{f.value}</dt>
                <dd className="mt-3 text-[15px] text-inverse-on-surface/90">{f.label}</dd>
                <dd className="mt-1 text-[13px] text-inverse-on-surface/60">{f.sub}</dd>
              </Reveal>
            ))}
          </dl>

          <p className="mt-10 max-w-[64ch] text-[13px] leading-relaxed text-inverse-on-surface/70">{t.service.note}</p>
        </DarkPlate>
      </div>
    </section>
  );
}
