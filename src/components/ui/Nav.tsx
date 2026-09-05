'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { scrollToId } from '@/components/providers/SmoothScroll';
import { SITE, whatsappUrl } from '@/lib/site';

const LINKS = [
  { label: 'Story', id: 'story' },
  { label: 'Drop', id: 'drop' },
  { label: 'Why Us', id: 'why' },
  { label: 'Visit', id: 'visit' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      // Hide going down, reveal going up — but never while the menu is open.
      setHidden(y > 320 && y > lastY.current && !open);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [open]);

  const go = (id: string) => {
    const wasOpen = open;
    setOpen(false);
    // Let the menu finish closing before Lenis takes over the scroll.
    setTimeout(() => scrollToId(id), wasOpen ? 380 : 0);
  };

  return (
    <>
      <motion.header
        animate={{ y: hidden ? '-110%' : '0%' }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled
            ? 'border-b border-line bg-ink/70 backdrop-blur-xl'
            : 'border-b border-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 md:px-10">
          <button
            onClick={() => scrollToId('top')}
            className="font-display text-xl tracking-tight text-bone transition-colors hover:text-blood md:text-2xl"
          >
            {SITE.name}
            <span className="text-blood">.</span>
          </button>

          <div className="hidden items-center gap-9 md:flex">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="group relative text-[12px] font-medium uppercase tracking-[0.18em] text-ash transition-colors hover:text-bone"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-blood transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Chat"
              className="hidden rounded-full border border-blood/40 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-blood transition-colors hover:bg-blood hover:text-ink sm:block"
            >
              WhatsApp
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="relative z-[61] flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full border border-line md:hidden"
            >
              <motion.span
                animate={open ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
                className="block h-px w-4 bg-bone"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
                className="block h-px w-4 bg-bone"
              />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[55] flex flex-col justify-center bg-ink px-6 md:hidden"
          >
            {LINKS.map((l, i) => (
              <motion.button
                key={l.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => go(l.id)}
                className="border-b border-line py-5 text-left font-display text-5xl text-bone"
              >
                {l.label}
              </motion.button>
            ))}
            <a
              href={`tel:${SITE.phoneDisplay.replace(/\s/g, '')}`}
              className="mt-10 text-sm tracking-[0.16em] text-blood"
            >
              {SITE.phoneDisplay}
            </a>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
