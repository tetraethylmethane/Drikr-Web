'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useT } from '@/lib/i18n';

/**
 * The confidence gate, playable, inside the reference's floating panel.
 *
 * Drag the threshold and watch the highest-scoring risk of the four be the
 * first one held back. That is the argument the whole product rests on, and it
 * is far easier to believe when you can push it yourself than when it is
 * asserted in a paragraph.
 */

// Scores and confidences are fixed; the names come from the dictionary so they
// match what the app puts on screen in each language.
const RISKS = [
  { i: 0, score: 68, confidence: 0.86 },
  { i: 1, score: 74, confidence: 0.71 },
  { i: 2, score: 59, confidence: 0.48 },
  { i: 3, score: 81, confidence: 0.34 },
];

export default function GatePanel() {
  const { t } = useT();
  const [threshold, setThreshold] = useState(0.6);
  const sent = RISKS.filter((r) => r.confidence >= threshold).length;

  return (
    <div className="flex flex-col gap-8 p-8">
      <div>
        <div className="flex items-baseline justify-between">
          <label htmlFor="gate" className="text-[10px] tracking-wider text-primary/50 uppercase">
            {t.demo.threshold}
          </label>
          <span className="text-xl font-light text-primary">{Math.round(threshold * 100)}%</span>
        </div>
        <input
          id="gate"
          type="range"
          min={0.2}
          max={0.95}
          step={0.01}
          value={threshold}
          onChange={(e) => setThreshold(parseFloat(e.target.value))}
          className="mt-4 h-1 w-full cursor-pointer appearance-none bg-primary/10 accent-primary"
        />
        <div className="mt-2 flex justify-between text-[10px] text-primary/50">
          <span>{t.demo.low}</span>
          <span>{t.demo.high}</span>
        </div>
      </div>

      <dl className="divide-y divide-primary/10 border-y border-primary/10">
        {RISKS.map((r) => {
          const name = t.watch.items[r.i].name;
          const passes = r.confidence >= threshold;
          return (
            <div
              key={r.i}
              className={cn(
                'flex items-center gap-4 py-3.5 transition-opacity duration-500',
                !passes && 'opacity-35',
              )}
            >
              <dt className="w-28 shrink-0">
                <span className="block text-sm font-medium text-primary">{name}</span>
                <span className="block text-[10px] tracking-wider text-primary/50 uppercase">
                  {passes ? t.demo.sent : t.demo.held}
                </span>
              </dt>
              <dd className="flex-1">
                <div className="grid grid-cols-2 gap-3">
                  <Meter label={t.demo.bad} value={r.score / 100} />
                  <Meter label={t.demo.sure} value={r.confidence} />
                </div>
              </dd>
            </div>
          );
        })}
      </dl>

      <p className="text-[11px] leading-relaxed text-secondary">
        <span className="text-primary">
          {sent} / {RISKS.length} {t.demo.sent}
        </span>
      </p>
    </div>
  );
}

function Meter({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex justify-between text-[9px] tracking-wider text-primary/40 uppercase">
        <span>{label}</span>
        <span>{Math.round(value * 100)}</span>
      </div>
      <div className="mt-1 h-px w-full bg-primary/15">
        <div
          className="h-px bg-primary transition-[width] duration-500"
          style={{ width: `${value * 100}%` }}
        />
      </div>
    </div>
  );
}
