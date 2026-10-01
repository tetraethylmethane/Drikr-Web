'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import Reveal from '@/components/ui/Reveal';
import SectionHead from '@/components/ui/SectionHead';
import { COST_MODEL, SCAN_PER_ACRE } from '@/lib/site';
import { useT } from '@/lib/i18n';
import { rich } from '@/lib/rich';
import { inr } from '@/lib/utils';

/**
 * Whole-field spraying against spraying only the problem, for the reader's own
 * field. Spraying cost scales with the area sprayed; the targeted side also
 * pays for a scan of the whole field, so a field with almost everything
 * affected shows almost no saving - which is true, and stays visible.
 */
export default function Treat() {
  const { t } = useT();
  const [field, setField] = useState(10);
  const [affected, setAffected] = useState(1);
  const hit = Math.min(affected, field);

  const sprayRate = COST_MODEL.conventional.spray;
  const whole = field * sprayRate;
  const targeted = hit * sprayRate + field * SCAN_PER_ACRE;
  const saved = whole - targeted;
  const less = Math.round((1 - hit / field) * 100);

  return (
    <section id="treat" className="px-[20px] pt-[72px] pb-[96px]">
      <div className="mx-auto max-w-[1200px]">
        <SectionHead label={t.treat.label} title={t.treat.title} text={t.treat.text} />

        <div className="mt-14 flex flex-col gap-12 lg:flex-row lg:gap-16">
          <Reveal className="space-y-9 lg:w-2/5">
            <Slider
              id="field"
              label={t.treat.field}
              unit={t.treat.acres}
              value={field}
              min={1}
              max={20}
              step={0.5}
              onChange={(v) => {
                setField(v);
                if (affected > v) setAffected(v);
              }}
            />
            <Slider
              id="affected"
              label={t.treat.affected}
              unit={t.treat.acres}
              value={hit}
              min={0.1}
              max={field}
              step={0.1}
              onChange={setAffected}
            />
            <p className="border-s border-primary ps-5 text-[14px] leading-relaxed text-secondary">{rich(t.treat.note)}</p>
          </Reveal>

          <Reveal delay={0.08} className="lg:w-3/5">
            <Bar title={t.treat.whole} sprayed={field} field={field} cost={whole} label={t.treat.sprayed} acres={t.treat.acres} lines={[[t.treat.spray, whole]]} />
            <Bar
              title={t.treat.targeted}
              sprayed={hit}
              field={field}
              cost={targeted}
              label={t.treat.sprayed}
              acres={t.treat.acres}
              dark
              lines={[
                [t.treat.spray, hit * sprayRate],
                [t.treat.scan, field * SCAN_PER_ACRE],
              ]}
            />

            <div className="mt-8 grid grid-cols-2 gap-6 border-t border-primary pt-6">
              <div>
                <div className="text-[14px] text-secondary">{t.treat.saved}</div>
                <div className="mt-1 font-headline text-[34px] leading-none font-bold text-primary">{inr(Math.max(0, saved))}</div>
              </div>
              <div>
                <div className="text-[14px] text-secondary">{t.treat.less}</div>
                <div className="mt-1 font-headline text-[34px] leading-none font-bold text-primary">{less}%</div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Slider({
  id,
  label,
  unit,
  value,
  min,
  max,
  step,
  onChange,
}: {
  id: string;
  label: string;
  unit: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="label">
        {label}
      </label>
      <div className="mt-3 flex items-baseline gap-3">
        <span className="font-headline text-[48px] leading-none font-bold text-primary">{value.toFixed(1)}</span>
        <span className="text-[16px] text-secondary">{unit}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="mt-4 h-1 w-full cursor-pointer appearance-none bg-surface-container-highest accent-primary"
      />
    </div>
  );
}

function Bar({
  title,
  sprayed,
  field,
  cost,
  label,
  acres,
  lines,
  dark = false,
}: {
  title: string;
  sprayed: number;
  field: number;
  cost: number;
  label: string;
  acres: string;
  lines: [string, number][];
  dark?: boolean;
}) {
  return (
    <div className="border-b border-outline-variant py-6 first:pt-0">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-[18px] font-semibold text-primary">{title}</h3>
        <span className="font-headline text-[22px] font-bold text-primary">{inr(cost)}</span>
      </div>
      <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-surface-container-highest">
        <motion.div
          className={dark ? 'h-full bg-primary' : 'h-full bg-secondary/60'}
          animate={{ width: `${(sprayed / field) * 100}%` }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <div className="mt-3 flex flex-wrap justify-between gap-x-6 gap-y-1 text-[13px] text-secondary">
        <span>
          {label}: {sprayed.toFixed(1)} / {field.toFixed(1)} {acres}
        </span>
        <span>{lines.map(([k, v]) => `${k} ${inr(v)}`).join(' · ')}</span>
      </div>
    </div>
  );
}
