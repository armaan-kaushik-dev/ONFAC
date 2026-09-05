'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useHasFinePointer } from '@/lib/hooks';

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: 'solid' | 'ghost';
  strength?: number;
  className?: string;
  cursor?: string;
  external?: boolean;
};

/** Pulls toward the pointer while hovered, springs home on leave. */
export default function MagneticButton({
  href,
  children,
  variant = 'solid',
  strength = 0.35,
  className = '',
  cursor = '',
  external = false,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const fine = useHasFinePointer();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 });

  const onMove = (e: React.PointerEvent) => {
    if (!fine || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    'group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-colors duration-300 will-change-transform';
  const skin =
    variant === 'solid'
      ? 'bg-blood text-ink hover:bg-bone'
      : 'border border-bone/25 text-bone hover:border-blood hover:text-blood';

  return (
    <motion.a
      ref={ref}
      href={href}
      data-cursor={cursor}
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      whileTap={{ scale: 0.96 }}
      className={`${base} ${skin} ${className}`}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <span className="relative z-10 flex items-center gap-3">{children}</span>
    </motion.a>
  );
}
