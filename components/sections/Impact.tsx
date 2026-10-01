'use client';

import { Building2, Droplet, Footprints, HeartHandshake, Languages, Leaf, ShieldCheck, Sprout, Users, Wallet } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import SectionHead from '@/components/ui/SectionHead';
import { useT } from '@/lib/i18n';

const BENEFITS = [Droplet, Footprints, ShieldCheck, Wallet, Languages];
const GROUPS = [Sprout, Leaf, Building2, Users];

/** The five benefits, then who gains from them. */
export default function Impact() {
  const { t } = useT();

  return (
    <section id="impact" className="px-[20px] pt-[72px] pb-[88px]">
      <div className="mx-auto max-w-[1200px]">
        <SectionHead label={t.impact.label} title={t.impact.title} />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {t.impact.benefits.map((b, i) => {
            const Icon = BENEFITS[i];
            return (
              <Reveal key={b.name} delay={i * 0.04}>
                <li className="flex h-full flex-col rounded-xl border border-outline-variant bg-surface-container-lowest p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary">
                    <Icon className="h-5 w-5 text-on-primary" strokeWidth={1.75} aria-hidden />
                  </span>
                  <h3 className="mt-6 text-[18px] font-semibold text-primary">{b.name}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-secondary">{b.text}</p>
                </li>
              </Reveal>
            );
          })}
        </ul>

        <Reveal className="mt-16">
          <h3 className="flex items-center gap-2 label">
            <HeartHandshake className="h-4 w-4" strokeWidth={1.75} aria-hidden />
            {t.impact.groupsTitle}
          </h3>
        </Reveal>
        <dl className="mt-6 grid gap-x-12 sm:grid-cols-2">
          {t.impact.groups.map((g, i) => {
            const Icon = GROUPS[i];
            return (
              <Reveal key={g.name} delay={i * 0.04}>
                <div className="flex gap-4 border-t border-outline-variant py-6">
                  <Icon className="mt-1 h-5 w-5 shrink-0 text-primary" strokeWidth={1.5} aria-hidden />
                  <div>
                    <dt className="text-[19px] text-primary">{g.name}</dt>
                    <dd className="mt-1.5 max-w-[48ch] text-[15px] leading-relaxed text-secondary">{g.text}</dd>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
