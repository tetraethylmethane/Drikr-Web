'use client';

import {
  AppWindow,
  BrainCircuit,
  Camera,
  Cpu,
  Gauge,
  Image as ImageIcon,
  ListChecks,
  Map,
  Navigation,
  Plane,
  Satellite,
  Thermometer,
  Workflow,
} from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import SectionHead from '@/components/ui/SectionHead';
import { useT } from '@/lib/i18n';

const HW = [Gauge, Cpu, Camera, Satellite, Thermometer];
const SW = [Navigation, ImageIcon, BrainCircuit, Map, ListChecks, AppWindow];

/** Hardware, software, and the whole chain from field to advice. */
export default function System() {
  const { t } = useT();

  return (
    <section id="system" className="px-[20px] pt-[72px] pb-[88px]">
      <div className="mx-auto max-w-[1200px]">
        <SectionHead label={t.system.label} title={t.system.title} />

        <Reveal className="mt-8 flex max-w-[72ch] items-start gap-3 border-s-2 border-primary ps-5">
          <Plane className="mt-1 h-5 w-5 shrink-0 text-primary" strokeWidth={1.5} aria-hidden />
          <p className="text-[16px] leading-relaxed text-secondary">{t.system.today}</p>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Column title={t.system.hwTitle} items={t.system.hw} icons={HW} />
          <Column title={t.system.swTitle} items={t.system.sw} icons={SW} />
        </div>

        <Reveal className="mt-10 flex items-start gap-3 rounded-xl bg-surface-container-low p-5">
          <Workflow className="mt-0.5 h-5 w-5 shrink-0 text-primary" strokeWidth={1.5} aria-hidden />
          <p className="text-[15px] leading-relaxed text-primary">{t.system.built}</p>
        </Reveal>

        <Reveal className="mt-16">
          <h3 className="label">{t.system.flowTitle}</h3>
          <ol className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-media border border-outline-variant bg-outline-variant sm:grid-cols-5">
            {t.system.flow.map((step, i) => (
              <li key={step} className="flex min-h-[112px] flex-col justify-between bg-background p-4">
                <span className="font-headline text-[13px] text-secondary">{String(i + 1).padStart(2, '0')}</span>
                <span className="mt-4 text-[15px] leading-snug text-primary">{step}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}

function Column({
  title,
  items,
  icons,
}: {
  title: string;
  items: { name: string; text: string }[];
  icons: typeof HW;
}) {
  return (
    <Reveal>
      <h3 className="border-b border-primary pb-3 text-[17px] font-medium text-primary">{title}</h3>
      <dl>
        {items.map((it, i) => {
          const Icon = icons[i];
          return (
            <div key={it.name} className="flex gap-4 border-b border-outline-variant py-5">
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" strokeWidth={1.5} aria-hidden />
              <div>
                <dt className="text-[17px] font-semibold text-primary">{it.name}</dt>
                <dd className="mt-1 text-[15px] leading-relaxed text-secondary">{it.text}</dd>
              </div>
            </div>
          );
        })}
      </dl>
    </Reveal>
  );
}
