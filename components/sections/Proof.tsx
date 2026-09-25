'use client';

import { useState } from 'react';
import Reveal from '@/components/ui/Reveal';
import { COST_MODEL, COST_ROWS, DRONE_LINKS, LIMITS } from '@/lib/site';
import { inr } from '@/lib/utils';
import { cn } from '@/lib/utils';

/**
 * The evidence block: what it saves, what actually flies, and what it refuses
 * to do.
 *
 * This is the material a judge remembers, and it is the material most likely to
 * be quietly dropped in a visual rebuild because none of it is decorative. The
 * bars are CSS — eight rectangles do not need a charting library, and a canvas
 * widget would read as a dashboard pasted into an editorial page.
 */

const sum = (o: Record<string, number>) => Object.values(o).reduce((a, b) => a + b, 0);
const MAX = 1200;

export default function Proof() {
  const [acres, setAcres] = useState(2.7);

  const perAcre = sum(COST_MODEL.conventional) - sum(COST_MODEL.withDrikr);
  const perYear = perAcre * acres * 2;
  const subscription = COST_MODEL.subscriptionPerMonth * 12;
  const net = perYear - subscription;

  return (
    <section id="proof" className="px-[20px] pt-[128px] pb-[96px]">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <span className="label">The evidence</span>
          <h2 className="mt-4 max-w-[18ch] text-[32px] leading-tight font-light text-primary md:text-[42px]">
            Treat a seventh of the field, not all of it
          </h2>
        </Reveal>

        {/* ---------------------------------------------------- cost ------ */}
        <div className="mt-16 flex flex-col gap-12 lg:flex-row lg:gap-16">
          <Reveal className="lg:w-3/5">
            <div className="flex items-baseline justify-between border-b border-primary pb-3">
              <h3 className="text-[18px] font-medium text-primary">
                Cost per acre, per season
              </h3>
              <div className="flex items-center gap-5 text-[11px] text-secondary">
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 bg-surface-container-highest" /> Usual
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 bg-primary" /> With Drikr
                </span>
              </div>
            </div>

            <dl>
              {COST_ROWS.map((r) => {
                const before = COST_MODEL.conventional[r.key];
                const after = COST_MODEL.withDrikr[r.key];
                return (
                  <div key={r.key} className="border-b border-outline-variant py-6">
                    <div className="flex items-baseline justify-between gap-6">
                      <dt className="text-[17px] text-primary">{r.label}</dt>
                      <dd className="text-[14px] text-secondary">
                        {inr(before)} &rarr; <span className="text-primary">{inr(after)}</span>
                      </dd>
                    </div>
                    <dd className="mt-4 space-y-1.5">
                      <div
                        className="h-2.5 bg-surface-container-highest"
                        style={{ width: `${(before / MAX) * 100}%` }}
                      />
                      <div className="h-2.5 bg-primary" style={{ width: `${(after / MAX) * 100}%` }} />
                    </dd>
                    <dd className="mt-3 text-[14px] leading-relaxed font-light text-secondary">
                      {r.plain}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </Reveal>

          <Reveal delay={0.08} className="lg:w-2/5">
            <label htmlFor="acres" className="label">
              Your field
            </label>
            <div className="mt-3 flex items-baseline gap-3">
              <span className="font-headline text-[56px] leading-none font-light text-primary">
                {acres.toFixed(1)}
              </span>
              <span className="text-[16px] text-secondary">acres</span>
            </div>
            <input
              id="acres"
              type="range"
              min={0.5}
              max={20}
              step={0.1}
              value={acres}
              onChange={(e) => setAcres(parseFloat(e.target.value))}
              className="mt-6 h-1 w-full cursor-pointer appearance-none bg-surface-container-highest accent-primary"
            />
            <p className="mt-3 text-[13px] font-light text-secondary">
              India&rsquo;s average operational holding is about 2.7 acres
            </p>

            <dl className="mt-10">
              {[
                ['Saved on inputs, per year', 'across two seasons', inr(perYear)],
                ['Drikr subscription', '₹399 a month', `− ${inr(subscription)}`],
              ].map(([l, s, v]) => (
                <div
                  key={l}
                  className="flex items-baseline justify-between gap-4 border-t border-outline-variant py-5"
                >
                  <div>
                    <dt className="text-[15px] text-on-surface-variant">{l}</dt>
                    <p className="text-[12px] font-light text-secondary">{s}</p>
                  </div>
                  <dd className="text-[18px] text-primary">{v}</dd>
                </div>
              ))}
              <div className="flex items-baseline justify-between gap-4 border-t border-primary pt-6">
                <dt className="text-[17px] text-primary">Left in your pocket</dt>
                <dd
                  className={cn(
                    'font-headline text-[32px] leading-none',
                    net > 0 ? 'text-primary' : 'text-secondary',
                  )}
                >
                  {inr(net)}
                </dd>
              </div>
            </dl>

            <p className="mt-8 border-l border-primary pl-5 text-[15px] leading-relaxed font-light text-secondary">
              On input savings alone the subscription only pays for itself above roughly{' '}
              <span className="text-primary">1.7 acres</span>. Drag below that and the number
              goes negative — we have not hidden it. For a small field the real gain is the
              harvest you do not lose.
            </p>
          </Reveal>
        </div>

        {/* -------------------------------------------------- aircraft ---- */}
        <Reveal>
          <div className="mt-[128px]">
            <h3 className="text-[26px] leading-tight font-light text-primary md:text-[32px]">
              What actually flies today
            </h3>
            <p className="mt-4 max-w-[56ch] text-[16px] leading-relaxed font-light text-secondary">
              Three ways the app can reach an aircraft. Two work; one is not written yet.
              Listed because a demo video is not the same thing as a status.
            </p>

            <table className="mt-10 w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-primary">
                  <th scope="col" className="label py-3 pr-6">
                    Aircraft
                  </th>
                  <th scope="col" className="label hidden py-3 pr-6 sm:table-cell">
                    Status
                  </th>
                  <th scope="col" className="label py-3">
                    What that means
                  </th>
                </tr>
              </thead>
              <tbody>
                {DRONE_LINKS.map((d) => (
                  <tr key={d.aircraft} className="border-b border-outline-variant align-top">
                    <th scope="row" className="py-6 pr-6 font-normal">
                      <span className="block text-[16px] text-primary">{d.aircraft}</span>
                      <span className="mt-1 block text-[12px] text-secondary">{d.link}</span>
                      <span
                        className={cn(
                          'mt-2 block text-[11px] tracking-[0.1em] uppercase sm:hidden',
                          d.status === 'working' ? 'text-primary' : 'text-secondary',
                        )}
                      >
                        {d.status}
                      </span>
                    </th>
                    <td className="hidden py-6 pr-6 sm:table-cell">
                      <span
                        className={cn(
                          'text-[12px] tracking-[0.1em] uppercase',
                          d.status === 'working' ? 'text-primary' : 'text-secondary',
                        )}
                      >
                        {d.status}
                      </span>
                    </td>
                    <td className="max-w-[56ch] py-6 text-[15px] leading-relaxed font-light text-secondary">
                      {d.plain}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="mt-10 max-w-[68ch] border-l border-primary pl-6 text-[16px] leading-relaxed font-light text-secondary">
              <span className="text-primary">Worth saying plainly:</span> the drone on our bench
              weighs 249 grams and has no tank. It can look, not spray. Spray missions are
              planned and costed correctly, and flying one needs a proper agricultural drone —
              usually a rented one, which is how most smallholders in India get a drone at all.
            </p>
          </div>
        </Reveal>

        {/* ---------------------------------------------------- limits ---- */}
        <Reveal>
          <div className="mt-[128px] flex flex-col gap-10 lg:flex-row lg:gap-16">
            <div className="lg:w-1/3">
              <h3 className="text-[26px] leading-tight font-light text-primary md:text-[32px]">
                What it will not do
              </h3>
              <p className="mt-5 max-w-[34ch] text-[16px] leading-relaxed font-light text-secondary">
                Every product page lists what a thing does. These are the edges, written just
                as plainly, because a tool you farm with has to be honest about where it stops.
              </p>
            </div>

            <dl className="lg:w-2/3">
              {LIMITS.map((l, i) => (
                <div
                  key={l.title}
                  className={cn(
                    'border-t border-outline-variant py-6',
                    i === LIMITS.length - 1 && 'border-b',
                  )}
                >
                  <dt className="text-[18px] leading-snug text-primary">{l.title}</dt>
                  <dd className="mt-2.5 max-w-[60ch] text-[15px] leading-relaxed font-light text-secondary">
                    {l.plain}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
