'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useHasFinePointer } from '@/lib/hooks';

/**
 * Two-part cursor: a hard dot that tracks exactly, and a lagging ring that
 * swells over anything marked `data-cursor="..."`.
 */
export default function Cursor() {
  const fine = useHasFinePointer();
  const [label, setLabel] = useState<string | null>(null);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 30, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 320, damping: 30, mass: 0.5 });

  useEffect(() => {
    if (!fine) return;

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);

      const target = (e.target as Element | null)?.closest?.('[data-cursor]');
      if (target) {
        const value = target.getAttribute('data-cursor') || '';
        setHovering(true);
        setLabel(value.length > 0 ? value : null);
      } else {
        setHovering(false);
        setLabel(null);
      }
    };

    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [fine, x, y]);

  if (!fine) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[70] hidden lg:block">
      <motion.div
        className="absolute -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-blood"
        style={{ x, y }}
      />
      <motion.div
        className="absolute flex items-center justify-center rounded-full border border-bone/35 backdrop-invert-[0.06]"
        style={{ x: ringX, y: ringY }}
        animate={{
          width: label ? 84 : hovering ? 56 : 30,
          height: label ? 84 : hovering ? 56 : 30,
          marginLeft: label ? -42 : hovering ? -28 : -15,
          marginTop: label ? -42 : hovering ? -28 : -15,
          borderColor: hovering ? 'rgba(255,45,32,0.95)' : 'rgba(244,242,236,0.35)',
          backgroundColor: label ? 'rgba(255,45,32,0.15)' : 'rgba(255,45,32,0)',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
      >
        {label ? (
          <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-blood">
            {label}
          </span>
        ) : null}
      </motion.div>
    </div>
  );
}
