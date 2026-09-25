'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * The confidence gate, playable, inside the reference's floating panel.
 *
 * Drag the threshold and watch the highest-scoring risk of the four be the
 * first one held back. That is the argument the whole product rests on, and it
 * is far easier to believe when you can push it yourself than when it is
 * asserted in a paragraph.
 */

const RISKS = [
  { domain: 'Pest', score: 68, confidence: 0.86, why: 'Four stations agree, readings minutes old' },
  { domain: 'Irrigation', score: 74, confidence: 0.71, why: 'Under the stage floor, three stations' },
  { domain: 'Nutrient', score: 59, confidence: 0.48, why: 'One working probe only' },
  { domain: 'Climate risk', score: 81, confidence: 0.34, why: 'Last reading is nine hours old' },
];

export default function GatePanel() {
  const [threshold, setThreshold] = useState(0.6);
  const sent = RISKS.filter((r) => r.confidence >= threshold).length;

  return (
    <div className="flex flex-col gap-8 p-8">
      <div>
        <div className="flex items-baseline justify-between">
          <label htmlFor="gate" className="text-[10px] tracking-wider text-primary/50 uppercase">
            Confidence threshold
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
          <span>Tell me everything</span>
          <span>Only when certain</span>
        </div>
      </div>

      <dl className="divide-y divide-primary/10 border-y border-primary/10">
        {RISKS.map((r) => {
          const passes = r.confidence >= threshold;
          return (
            <div
              key={r.domain}
              className={cn(
                'flex items-center gap-4 py-3.5 transition-opacity duration-500',
                !passes && 'opacity-35',
              )}
            >
              <dt className="w-28 shrink-0">
                <span className="block text-sm font-medium text-primary">{r.domain}</span>
                <span className="block text-[10px] tracking-wider text-primary/50 uppercase">
                  {passes ? 'Sent' : 'Held back'}
                </span>
              </dt>
              <dd className="flex-1">
                <p className="mb-2 text-[11px] leading-snug text-secondary">{r.why}</p>
                <div className="grid grid-cols-2 gap-3">
                  <Meter label="Bad" value={r.score / 100} />
                  <Meter label="Sure" value={r.confidence} />
                </div>
              </dd>
            </div>
          );
        })}
      </dl>

      <p className="text-[11px] leading-relaxed text-secondary">
        <span className="text-primary">{sent} of 4 sent.</span> Climate risk scores the highest
        of the four at 81, and is the first to be dropped — the forecast says hail, but the last
        reading from the field is nine hours old.
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
