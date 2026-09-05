'use client';

/**
 * The preloader and the hero timeline live in different trees, so they sync
 * through a tiny module-level flag + event rather than context plumbing.
 * Hero mounts before the intro finishes, so it must handle "already done" too.
 */
const EVENT = 'onfacmen:intro-done';
let done = false;

export function markIntroDone() {
  if (done) return;
  done = true;
  window.dispatchEvent(new Event(EVENT));
}

export function onIntroDone(cb: () => void) {
  if (done) {
    cb();
    return () => {};
  }
  window.addEventListener(EVENT, cb, { once: true });
  return () => window.removeEventListener(EVENT, cb);
}
