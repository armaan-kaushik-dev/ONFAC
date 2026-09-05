'use client';

/**
 * Scroll progress (0 → 1) through the pinned hero.
 *
 * ScrollTrigger writes it from the DOM side; the R3F render loop reads it in
 * useFrame. A plain mutable box rather than state on purpose — this updates
 * every frame and must never trigger a React render.
 */
export const heroProgress = { value: 0 };
