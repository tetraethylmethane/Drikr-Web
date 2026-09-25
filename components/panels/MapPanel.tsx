'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useT } from '@/lib/i18n';

/**
 * The health map, playable, inside the reference's floating panel.
 *
 * The interpolation is the same inverse-distance weighting the app runs in
 * healthMap.ts — drag a station and every cell re-scores. Severity is carried
 * by tone alone, which the monochrome system requires and which happens to be
 * the more honest encoding anyway: a red cell asserts danger, a dark cell
 * asserts magnitude.
 */

const CELLS = 12;

type Station = { id: string; x: number; y: number; stress: number };

const INITIAL: Station[] = [
  { id: 'S1', x: 0.23, y: 0.25, stress: 14 },
  { id: 'S2', x: 0.77, y: 0.21, stress: 19 },
  { id: 'S3', x: 0.2, y: 0.78, stress: 26 },
  { id: 'S4', x: 0.75, y: 0.73, stress: 88 },
];

function idw(x: number, y: number, ns: Station[]) {
  let num = 0;
  let den = 0;
  for (const n of ns) {
    const d2 = (x - n.x) ** 2 + (y - n.y) ** 2;
    if (d2 < 1e-6) return n.stress;
    const w = 1 / (d2 * 1.4);
    num += w * n.stress;
    den += w;
  }
  return num / den;
}

export default function MapPanel() {
  const { t } = useT();
  const [stations, setStations] = useState<Station[]>(INITIAL);
  const [dragging, setDragging] = useState<string | null>(null);
  const board = useRef<HTMLDivElement>(null);

  const affected = (() => {
    let bad = 0;
    for (let i = 0; i < CELLS; i++)
      for (let j = 0; j < CELLS; j++)
        if (idw((i + 0.5) / CELLS, (j + 0.5) / CELLS, stations) > 55) bad++;
    return Math.round((bad / (CELLS * CELLS)) * 100);
  })();

  const move = useCallback(
    (cx: number, cy: number) => {
      const el = board.current;
      if (!el || !dragging) return;
      const r = el.getBoundingClientRect();
      const x = Math.max(0.07, Math.min(0.93, (cx - r.left) / r.width));
      const y = Math.max(0.07, Math.min(0.93, (cy - r.top) / r.height));
      setStations((ss) => ss.map((s) => (s.id === dragging ? { ...s, x, y } : s)));
    },
    [dragging],
  );

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: PointerEvent) => move(e.clientX, e.clientY);
    const onUp = () => setDragging(null);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, [dragging, move]);

  const nudge = (id: string, dx: number, dy: number) =>
    setStations((ss) =>
      ss.map((s) =>
        s.id === id
          ? {
              ...s,
              x: Math.max(0.07, Math.min(0.93, s.x + dx)),
              y: Math.max(0.07, Math.min(0.93, s.y + dy)),
            }
          : s,
      ),
    );

  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="grid grid-cols-3 gap-4">
        {[
          [t.save.label, `${affected}%`, affected],
          ['S1 – S4', '4', 100],
          [`${CELLS} × ${CELLS}`, String(CELLS * CELLS), 100],
        ].map(([k, v, pct]) => (
          <div key={k as string} className="space-y-1">
            <div className="text-[10px] tracking-wider text-primary/50 uppercase">{k}</div>
            <div className="text-xl font-light text-primary">{v}</div>
            <div className="h-1 w-full overflow-hidden rounded-full bg-primary/5">
              <div className="h-full bg-primary/40" style={{ width: `${pct}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div
        ref={board}
        className="relative aspect-square w-full touch-none border border-primary/10 select-none"
      >
        <div
          className="absolute inset-0 grid"
          style={{
            gridTemplateColumns: `repeat(${CELLS}, 1fr)`,
            gridTemplateRows: `repeat(${CELLS}, 1fr)`,
          }}
        >
          {Array.from({ length: CELLS * CELLS }).map((_, k) => {
            const i = k % CELLS;
            const j = Math.floor(k / CELLS);
            const v = idw((i + 0.5) / CELLS, (j + 0.5) / CELLS, stations);
            return (
              <div
                key={k}
                style={{ background: `rgba(0,0,0,${0.04 + (v / 100) * 0.72})` }}
                className="border-[0.5px] border-surface-container-lowest/40 transition-colors duration-200"
              />
            );
          })}
        </div>

        {stations.map((s) => (
          <button
            key={s.id}
            onPointerDown={(e) => {
              e.preventDefault();
              setDragging(s.id);
            }}
            onKeyDown={(e) => {
              const d = 0.05;
              if (e.key === 'ArrowLeft') nudge(s.id, -d, 0);
              else if (e.key === 'ArrowRight') nudge(s.id, d, 0);
              else if (e.key === 'ArrowUp') nudge(s.id, 0, -d);
              else if (e.key === 'ArrowDown') nudge(s.id, 0, d);
              else return;
              e.preventDefault();
            }}
            style={{ left: `${s.x * 100}%`, top: `${s.y * 100}%` }}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-grab p-2.5 active:cursor-grabbing"
            aria-label={`Sensor ${s.id}. Drag, or use the arrow keys to move it.`}
          >
            <span className="block h-3 w-3 border-2 border-primary bg-surface-container-lowest" />
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-[10px] text-primary/50">{t.demo.drag}</span>
        <button
          onClick={() => setStations(INITIAL)}
          className="rounded text-[10px] tracking-wider text-primary/60 uppercase hover:text-primary"
        >
          {t.demo.reset}
        </button>
      </div>
    </div>
  );
}
