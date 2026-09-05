'use client';

import { useCallback, useSyncExternalStore } from 'react';

/**
 * Media queries are external state, so read them through useSyncExternalStore
 * rather than an effect — no cascading render, and the server snapshot is
 * always `false` so the markup hydrates consistently.
 */
function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

/** True below the `lg` breakpoint — the cue to drop WebGL and parallax. */
export const useIsMobile = () => useMediaQuery('(max-width: 1023px)');

export const useReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)');

/** Coarse pointers get no custom cursor and no magnetic hover. */
export const useHasFinePointer = () => useMediaQuery('(hover: hover) and (pointer: fine)');
