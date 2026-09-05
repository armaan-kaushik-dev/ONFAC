'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { markIntroDone } from '@/lib/intro';
import { useReducedMotion } from '@/lib/hooks';

const WORD = 'ONFACMEN';
const COLUMNS = 6;

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [gone, setGone] = useState(false);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      // Reduced motion: no theatre, just hand off immediately.
      if (reduced) {
        setGone(true);
        markIntroDone();
        return;
      }

      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);

      const finish = () => {
        window.clearTimeout(failsafe);
        document.body.style.overflow = '';
        setGone(true);
        markIntroDone();
      };

      // The intro holds the page's scroll lock, so it must never be able to
      // strand a visitor. If the timeline stalls — a backgrounded tab throttling
      // rAF, a thrown callback — hand control back anyway.
      const failsafe = window.setTimeout(finish, 5000);

      const counter = { v: 0 };
      const tl = gsap.timeline({ onComplete: finish });

      tl.to(counter, {
        v: 100,
        duration: 1.25,
        ease: 'power2.inOut',
        onUpdate: () => setCount(Math.round(counter.v)),
      })
        .from(
          '[data-pre-letter]',
          { yPercent: 115, duration: 0.9, ease: 'expo.out', stagger: 0.035 },
          0.15,
        )
        .to('[data-pre-bar]', { scaleX: 1, duration: 1.25, ease: 'power2.inOut' }, 0)
        .to('[data-pre-fade]', { opacity: 0, duration: 0.4, ease: 'power2.in' }, '>-0.1')
        .to(
          '[data-pre-col]',
          { yPercent: -100, duration: 1, ease: 'expo.inOut', stagger: 0.055 },
          '>-0.2',
        );

      // Never leave the lock behind if this unmounts mid-intro.
      return () => {
        window.clearTimeout(failsafe);
        document.body.style.overflow = '';
      };
    },
    { scope: root, dependencies: [reduced] },
  );

  if (gone) return null;

  return (
    <div ref={root} className="pointer-events-none fixed inset-0 z-[80]">
      {/* The panel splits into columns that lift away, revealing the hero behind. */}
      <div className="absolute inset-0 flex">
        {Array.from({ length: COLUMNS }).map((_, i) => (
          <div key={i} data-pre-col className="h-full flex-1 bg-ink" />
        ))}
      </div>

      <div data-pre-fade className="absolute inset-0 flex flex-col items-center justify-center">
        <h1
          aria-label={WORD}
          className="flex overflow-hidden font-display text-[13vw] leading-none text-bone md:text-[9vw]"
        >
          {WORD.split('').map((c, i) => (
            <span key={i} data-pre-letter aria-hidden className="inline-block">
              {c}
            </span>
          ))}
        </h1>
        <div className="mt-6 h-px w-[52vw] max-w-md bg-bone/15">
          <div data-pre-bar className="h-px origin-left scale-x-0 bg-blood" />
        </div>
      </div>

      <div
        data-pre-fade
        className="absolute bottom-8 right-6 font-display text-5xl tabular-nums text-blood md:right-12 md:text-7xl"
      >
        {count}
      </div>
      <div data-pre-fade className="eyebrow absolute bottom-10 left-6 md:left-12">
        Kharar · Punjab
      </div>
    </div>
  );
}
