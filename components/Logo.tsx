'use client';

import { useId } from 'react';
import { cn } from '@/lib/utils';

/**
 * The Drikr Systems mark, drawn rather than scaled.
 *
 * The mark inside assets/drikr-logo.png is only 189×189 px on the page, so any
 * crop of it is a heavy enlargement with soft concave curves and stepped lobes.
 * It is not a photograph though — it is a rounded square with four discs biting
 * into the middle of each edge, and assets/source/make-icons.py carries the
 * parameters fitted to the original by hill-climbing on IoU (0.981, with the
 * remaining disagreement inside the original's anti-aliasing band).
 *
 * Those same three numbers are reproduced here as an SVG mask, so this is the
 * identical construction the app icons are generated from — exact at any size,
 * and it inherits currentColor, which the monochrome system needs.
 *
 *   rc    0.1468  rounded-corner radius
 *   rb    0.2768  edge-bite disc radius
 *   waist 0.1825  inset of the deepest point of each concave side
 *
 * Bite centres sit at waist − rb = −0.0943, i.e. outside the square, which is
 * what makes them cut inward and leaves the four lobes tangent to the corners.
 */

const RC = 14.68;
const RB = 27.68;
const CB = -9.43; // (waist − rb) × 100

export function Mark({ className }: { className?: string }) {
  const id = useId();
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden focusable="false">
      <mask id={id} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
        <rect width="100" height="100" rx={RC} ry={RC} fill="#fff" />
        <circle cx={CB} cy="50" r={RB} fill="#000" />
        <circle cx={100 - CB} cy="50" r={RB} fill="#000" />
        <circle cx="50" cy={CB} r={RB} fill="#000" />
        <circle cx="50" cy={100 - CB} r={RB} fill="#000" />
      </mask>
      <rect width="100" height="100" fill="currentColor" mask={`url(#${id})`} />
    </svg>
  );
}

/**
 * The full lockup: mark, then DRIKR SYSTEMS with the trademark.
 *
 * The wordmark is live text rather than cropped artwork — it stays crisp at any
 * size, scales with the user's font settings, and is selectable and readable by
 * a screen reader. Montserrat is the closer match of the two faces here — the
 * original wordmark is a geometric grotesque, which is what Montserrat is and
 * Karla is not. Swap in the real artwork if exact letterforms matter more than
 * staying crisp and selectable.
 */
export default function Logo({
  variant = 'lockup',
  className,
  markClassName,
}: {
  variant?: 'lockup' | 'mark';
  className?: string;
  markClassName?: string;
}) {
  if (variant === 'mark') {
    return (
      <span className={cn('inline-flex', className)}>
        <Mark className={cn('h-5 w-5', markClassName)} />
        <span className="sr-only">Drikr Systems</span>
      </span>
    );
  }

  return (
    <span className={cn('inline-flex items-center gap-[0.55em]', className)}>
      <Mark className={cn('h-[1.05em] w-[1.05em] shrink-0', markClassName)} />
      <span className="font-headline font-bold tracking-[-0.01em] whitespace-nowrap uppercase">
        Drikr Systems
        <sup className="ms-[0.15em] align-super text-[0.42em] font-medium tracking-normal">
          &trade;
        </sup>
      </span>
    </span>
  );
}
