'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';

type Props = {
  children: React.ReactNode;
  className?: string;
  /** When set, staggers `[data-reveal]` descendants instead of the wrapper. */
  stagger?: number;
  y?: number;
  delay?: number;
  start?: string;
};

export default function Reveal({
  children,
  className = '',
  stagger,
  y = 44,
  delay = 0,
  start = 'top 88%',
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const targets = stagger
        ? gsap.utils.toArray<HTMLElement>('[data-reveal]', ref.current)
        : [ref.current as HTMLElement];
      if (!targets.length) return;

      // CSS only sets opacity:0 — the tween owns Y, or a stylesheet translate
      // would silently survive and the element never slides.
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay,
          ease: 'expo.out',
          stagger: stagger ?? 0,
          scrollTrigger: { trigger: ref.current, start, once: true },
        },
      );
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={`${stagger ? '' : 'reveal'} ${className}`}>
      {children}
    </div>
  );
}
