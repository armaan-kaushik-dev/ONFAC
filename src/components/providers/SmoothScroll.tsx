'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useReducedMotion } from '@/lib/hooks';

let lenisRef: Lenis | null = null;

/** Anchor navigation has to go through Lenis, or the two fight over scrollTop. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenisRef) lenisRef.scrollTo(el, { offset: -8, duration: 1.4 });
  else el.scrollIntoView({ behavior: 'smooth' });
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.8,
    });
    lenisRef = lenis;

    // Drive Lenis from GSAP's ticker so scrub tweens and scroll never desync.
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef = null;
    };
  }, [reduced]);

  return <>{children}</>;
}
