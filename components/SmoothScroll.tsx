'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Lenis on its own requestAnimationFrame loop.
 *
 * It used to tick inside GSAP's ticker so ScrollTrigger could stay in sync; with
 * the pinned sections gone, GSAP went too and Lenis drives itself.
 *
 * The easing is gentle and the duration short. Scrolling that glides for a full
 * second reads as a demonstration of smooth scrolling, which is not the point —
 * it is here so the page settles rather than snaps.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 0.9,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // In-page links must go through Lenis or they jump while it is animating.
    // The offset clears the fixed 72px header.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -88, duration: 1.1 });
    };
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
