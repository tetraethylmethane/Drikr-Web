'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

/**
 * Fade and a short rise. That is the entire motion vocabulary on this site.
 *
 * No blur, no scale, no long stagger — the page has to look finished with
 * animation switched off, so nothing may depend on movement to make sense.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px -8% 0px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
