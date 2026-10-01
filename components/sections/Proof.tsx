'use client';

import { Clock, Cog, IndianRupee, Maximize, Scale, Scaling, SprayCan, Tractor } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import SectionHead from '@/components/ui/SectionHead';
import { useT } from '@/lib/i18n';

const METRICS = [Maximize, SprayCan, IndianRupee, Clock];
const FEAS = [Cog, Tractor, Scale, Scaling];

/** What will be measured in field trials, and whether it can be built and run. */
export default function Proof() {
  const { t } = useT();

  return (
    <section id="proof" className="px-[20px] pt-[72px] pb-[88px]">
      <div className="mx-auto max-w-[1200px]">
        <SectionHead label={t.proof.label} title={t.proof.title} text={t.proof.text} />

        <ol className="mt-12 grid gap-px overflow-hidden rounded-media border border-outline-variant bg-outline-variant sm:grid-cols-2 lg:grid-cols-4">
          {t.proof.metrics.map((m, i) => {
            const Icon = METRICS[i];
            return (
              <li key={m.name} className="bg-background p-6 md:p-7">
                <Reveal delay={i * 0.04}>
                  <div className="flex items-center justify-between">
                    <Icon className="h-6 w-6 text-primary" strokeWidth={1.5} aria-hidden />
                    <span className="font-headline text-[13px] text-secondary">0{i + 1}</span>
                  </div>
                  <h3 className="mt-6 text-[18px] font-semibold text-primary">{m.name}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-secondary">{m.text}</p>
                </Reveal>
              </li>
            );
          })}
        </ol>

        <Reveal className="mt-16">
          <h3 className="text-[24px] font-bold text-primary">{t.proof.feasTitle}</h3>
        </Reveal>
        <dl className="mt-6">
          {t.proof.feas.map((f, i) => {
            const Icon = FEAS[i];
            return (
              <Reveal key={f.name} delay={i * 0.04}>
                <div className="grid items-baseline gap-x-8 gap-y-2 border-t border-outline-variant py-6 last:border-b sm:grid-cols-12">
                  <dt className="flex items-center gap-3 sm:col-span-4">
                    <Icon className="h-5 w-5 text-primary" strokeWidth={1.5} aria-hidden />
                    <span className="text-[20px] text-primary">{f.name}</span>
                  </dt>
                  <dd className="max-w-[62ch] text-[16px] leading-relaxed text-secondary sm:col-span-8">{f.text}</dd>
                </div>
              </Reveal>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
