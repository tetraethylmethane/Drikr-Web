import Reveal from '@/components/ui/Reveal';
import { rich } from '@/lib/rich';
import { cn } from '@/lib/utils';

/** Label, title and an optional lead paragraph: the opening of every section. */
export default function SectionHead({
  label,
  title,
  text,
  className,
  invert = false,
}: {
  label: string;
  title: string;
  text?: string;
  className?: string;
  invert?: boolean;
}) {
  return (
    <Reveal className={className}>
      <span className={cn('label', invert && 'text-inverse-on-surface/70')}>{label}</span>
      <h2
        className={cn(
          'mt-4 max-w-[20ch] text-[30px] leading-tight font-bold text-balance md:text-[40px]',
          invert ? 'text-on-primary' : 'text-primary',
        )}
      >
        {title}
      </h2>
      {text ? (
        <p
          className={cn(
            'mt-5 max-w-[56ch] text-[16px] leading-relaxed',
            invert ? 'text-inverse-on-surface/85' : 'text-secondary',
          )}
        >
          {rich(text)}
        </p>
      ) : null}
    </Reveal>
  );
}

/** Tonal fills for the three field states. Hatching, not hue: see globals.css. */
export const STATE_STYLE = {
  healthy: { background: 'rgba(0,0,0,0.05)' },
  atRisk: {
    background:
      'repeating-linear-gradient(135deg, rgba(0,0,0,0.38) 0 2px, rgba(0,0,0,0.08) 2px 6px)',
  },
  problem: { background: 'rgba(0,0,0,0.82)' },
} as const;
