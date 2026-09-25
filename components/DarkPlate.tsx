'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

/**
 * A media block: a photograph, a scrim, and type on top. Nothing else.
 *
 * Earlier versions layered a survey drawing and a grid over the picture, which
 * fought it — a photograph with a diagram printed across it is neither. The
 * drawing belongs where it can be read, not as texture.
 *
 * The scrim is two gradients rather than one flat wash. A flat scrim has to be
 * dark enough for the worst case everywhere, which drains the whole image to
 * protect type in one place; these pool darkness under the text and let the
 * corners keep their colour. On this photograph that matters — the straw plots
 * are bright and the crop blocks are deep green, and flattening that contrast
 * is exactly what made the old blocks look dead.
 */

export type PlateImage = 'field-aerial' | 'paddy-aerial';

const IMAGES: Record<PlateImage, { src: string; alt: string; position: string }> = {
  'field-aerial': {
    src: '/img/field-aerial.jpg',
    alt: 'Aerial view of farmland divided into many small parcels — most harvested to pale straw, with one block still under deep green crop.',
    // Biased right so the green block sits off-centre rather than dead behind
    // the headline.
    position: '62% 50%',
  },
  'paddy-aerial': {
    src: '/img/paddy-aerial.jpg',
    alt: 'Aerial view of a paddy landscape divided into small plots by raised bunds.',
    position: '50% 50%',
  },
};

/** Pooled under the centre, open at the corners. */
const SCRIM_CENTRE =
  'radial-gradient(ellipse 74% 64% at 50% 50%, rgba(8,10,10,0.72) 0%, rgba(8,10,10,0.52) 46%, rgba(8,10,10,0.26) 78%, rgba(8,10,10,0.14) 100%)';

/** Weighted to the lower half, for blocks whose type sits low. */
const SCRIM_BOTTOM =
  'linear-gradient(to top, rgba(8,10,10,0.78) 0%, rgba(8,10,10,0.46) 38%, rgba(8,10,10,0.16) 72%, rgba(8,10,10,0.08) 100%)';

export default function DarkPlate({
  image = 'field-aerial',
  scrim = 'centre',
  priority = false,
  className,
  innerClassName,
  children,
}: {
  image?: PlateImage;
  scrim?: 'centre' | 'bottom';
  priority?: boolean;
  className?: string;
  innerClassName?: string;
  children?: React.ReactNode;
}) {
  const img = IMAGES[image];

  return (
    <div className={cn('relative overflow-hidden bg-[#141514]', className)}>
      <Image
        src={img.src}
        alt={img.alt}
        fill
        priority={priority}
        sizes="(max-width: 1024px) 100vw, 1200px"
        style={{ objectPosition: img.position }}
        className="object-cover contrast-[1.04] saturate-[1.06]"
      />

      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: scrim === 'bottom' ? SCRIM_BOTTOM : SCRIM_CENTRE }}
      />

      {/* A hairline inside the radius stops the photograph meeting the page on a
          raw edge. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/10"
      />

      <div className={cn('relative z-10', innerClassName)}>{children}</div>
    </div>
  );
}
