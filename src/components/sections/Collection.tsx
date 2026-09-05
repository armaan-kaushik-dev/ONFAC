'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { PRODUCTS, type Product } from '@/lib/site';
import { useHasFinePointer } from '@/lib/hooks';

function ProductCard({ product, index }: { product: Product; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const fine = useHasFinePointer();

  // Normalised pointer position within the card, -0.5 … 0.5
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 200, damping: 20 });
  const sy = useSpring(py, { stiffness: 200, damping: 20 });
  const rotateY = useTransform(sx, [-0.5, 0.5], ['-9deg', '9deg']);
  const rotateX = useTransform(sy, [-0.5, 0.5], ['7deg', '-7deg']);

  const onMove = (e: React.PointerEvent) => {
    if (!fine || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };

  const reset = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.article
      ref={ref}
      data-card
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 1100 }}
      className="group relative w-[76vw] shrink-0 sm:w-[52vw] md:w-[38vw] lg:w-[26vw] xl:w-[22vw]"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-ink-700">
        <Image
          src={product.img.src}
          alt={product.img.alt}
          fill
          sizes="(max-width: 640px) 76vw, (max-width: 1024px) 52vw, 26vw"
          placeholder="blur"
          blurDataURL={product.img.blur}
          className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-70" />

        <span className="absolute left-4 top-4 rounded-full border border-bone/20 bg-ink/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-bone backdrop-blur-md">
          {product.tag}
        </span>

        <span className="absolute right-4 top-4 font-display text-lg text-bone/25 transition-colors group-hover:text-blood">
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Slides up on hover */}
        <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100">
          <div className="rounded-sm bg-blood px-4 py-3 text-center text-[11px] font-bold uppercase tracking-[0.16em] text-ink">
            In store now
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="text-[15px] font-medium leading-tight text-bone">{product.name}</h3>
        <div className="shrink-0 text-right">
          <span className="font-display text-xl text-blood">₹{product.price}</span>
          {product.was ? (
            <span className="ml-2 text-xs text-dim line-through">₹{product.was}</span>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}

export default function Collection() {
  const root = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop: pin the section and translate the track sideways with scroll.
      mm.add('(min-width: 768px)', () => {
        const track = trackRef.current;
        if (!track) return;

        const distance = () => track.scrollWidth - window.innerWidth + 80;

        gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      });

      // Mobile: no pin — the track is a native swipe rail, cards just fade in.
      mm.add('(max-width: 767px)', () => {
        gsap.fromTo(
          '[data-card]',
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'expo.out',
            stagger: 0.08,
            scrollTrigger: { trigger: root.current, start: 'top 75%', once: true },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="drop"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden border-t border-line py-20 md:py-0"
    >
      <div className="mx-auto mb-12 flex w-full max-w-[1600px] flex-col gap-6 px-5 md:mb-16 md:flex-row md:items-end md:justify-between md:px-10">
        <div>
          <p className="eyebrow mb-6 flex items-center gap-3">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-blood" />
            02 — This Week&apos;s Drop
          </p>
          <h2 className="font-display text-[13vw] leading-[0.82] text-bone sm:text-[9vw] lg:text-[6vw]">
            On the floor
          </h2>
        </div>
        <p className="max-w-xs text-sm leading-relaxed text-ash md:text-right">
          Most pieces are single stock. Seen something? Come through before it walks.
        </p>
      </div>

      <div
        ref={trackRef}
        className="no-scrollbar flex gap-5 overflow-x-auto px-5 pb-4 md:overflow-visible md:px-10"
      >
        {PRODUCTS.map((p, i) => (
          <ProductCard key={p.name} product={p} index={i} />
        ))}

        {/* Rail end-cap doubles as the CTA */}
        <div className="flex w-[70vw] shrink-0 items-center sm:w-[40vw] md:w-[24vw]">
          <div className="border-l border-line pl-8">
            <p className="font-display text-4xl leading-none text-bone">
              + 200<span className="text-blood">more</span>
            </p>
            <p className="mt-4 max-w-[24ch] text-sm leading-relaxed text-ash">
              The full rack lives in store. Racks are restocked every week.
            </p>
          </div>
        </div>
      </div>

      <p className="mx-auto mt-8 w-full max-w-[1600px] px-5 text-[11px] uppercase tracking-[0.2em] text-dim md:px-10">
        <span className="hidden md:inline">Scroll to browse →</span>
        <span className="md:hidden">Swipe to browse →</span>
      </p>
    </section>
  );
}
