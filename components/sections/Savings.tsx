'use client';

import { useState } from 'react';
import Reveal from '@/components/ui/Reveal';
import { COST_MODEL, COST_ROWS } from '@/lib/site';
import { useT } from '@/lib/i18n';
import { inr } from '@/lib/utils';
import { rich } from '@/lib/rich';

/**
 * The cost comparison, trimmed to the one thing worth showing: four rows of
 * before-and-after and a slider for your own acreage. The drone-link table and
 * the long limits list that used to sit under it were true and useful, but
 * they made this the longest section on a page that needed to get shorter.
 */

const sum = (o: Record<string, number>) => Object.values(o).reduce((a, b) => a + b, 0);
const MAX = 1200;

export default function Savings() {
  const { t } = useT();
  const [acres, setAcres] = useState(2.7);

  const perAcre = sum(COST_MODEL.conventional) - sum(COST_MODEL.withDrikr);
  const perYear = perAcre * acres * 2;
  const subscription = COST_MODEL.subscriptionPerMonth * 12;
  const net = perYear - subscription;

  return (
    <section id="save" className="px-[20px] pt-[72px] pb-[96px]">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <span className="label">{t.save.label}</span>
          <h2 className="mt-4 max-w-[20ch] text-[30px] leading-tight font-light text-primary md:text-[40px]">
            {t.save.title}
          </h2>
          <p className="mt-5 max-w-[52ch] text-[16px] leading-relaxed font-light text-secondary">
            {rich(t.save.text)}
          </p>
        </Reveal>

        <div className="mt-14 flex flex-col gap-12 lg:flex-row lg:gap-16">
          <Reveal className="lg:w-3/5">
            <div className="flex items-baseline justify-between border-b border-primary pb-3">
              <h3 className="text-[17px] font-medium text-primary">{t.save.perAcre}</h3>
              <div className="flex items-center gap-4 text-[11px] text-secondary">
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 bg-surface-container-highest" /> {t.save.usual}
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 bg-primary" /> {t.save.withApp}
                </span>
              </div>
            </div>

            <dl>
              {COST_ROWS.map((r, i) => {
                const before = COST_MODEL.conventional[r.key];
                const after = COST_MODEL.withDrikr[r.key];
                return (
                  <div key={r.key} className="border-b border-outline-variant py-5">
                    <div className="flex items-baseline justify-between gap-6">
                      <dt className="text-[16px] text-primary">{t.save.rows[i]}</dt>
                      <dd className="text-[14px] text-secondary">
                        {inr(before)} &rarr; <span className="text-primary">{inr(after)}</span>
                      </dd>
                    </div>
                    <dd className="mt-3 space-y-1.5">
                      <div
                        className="h-2 bg-surface-container-highest"
                        style={{ width: `${(before / MAX) * 100}%` }}
                      />
                      <div className="h-2 bg-primary" style={{ width: `${(after / MAX) * 100}%` }} />
                    </dd>
                  </div>
                );
              })}
            </dl>
          </Reveal>

          <Reveal delay={0.08} className="lg:w-2/5">
            <label htmlFor="acres" className="label">
              {t.save.yourField}
            </label>
            <div className="mt-3 flex items-baseline gap-3">
              <span className="font-headline text-[52px] leading-none font-light text-primary">
                {acres.toFixed(1)}
              </span>
              <span className="text-[16px] text-secondary">{t.save.acres}</span>
            </div>
            <input
              id="acres"
              type="range"
              min={0.5}
              max={20}
              step={0.1}
              value={acres}
              onChange={(e) => setAcres(parseFloat(e.target.value))}
              className="mt-5 h-1 w-full cursor-pointer appearance-none bg-surface-container-highest accent-primary"
            />

            <dl className="mt-8">
              {[
                [t.save.saved, inr(perYear)],
                [t.save.subscription, `− ${inr(subscription)}`],
              ].map(([l, v]) => (
                <div
                  key={l}
                  className="flex items-baseline justify-between gap-4 border-t border-outline-variant py-4"
                >
                  <dt className="text-[15px] text-secondary">{l}</dt>
                  <dd className="text-[17px] text-primary">{v}</dd>
                </div>
              ))}
              <div className="flex items-baseline justify-between gap-4 border-t border-primary pt-5">
                <dt className="text-[16px] text-primary">{t.save.net}</dt>
                <dd
                  className={`font-headline text-[30px] leading-none ${
                    net > 0 ? 'text-primary' : 'text-secondary'
                  }`}
                >
                  {inr(net)}
                </dd>
              </div>
            </dl>

            <p className="mt-7 border-l border-primary pl-5 text-[15px] leading-relaxed font-light text-secondary">
              {rich(t.save.note)}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
