'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { onIntroDone } from '@/lib/intro';
import { heroProgress } from '@/lib/hero-progress';
import { useIsMobile, useReducedMotion } from '@/lib/hooks';
import { IMAGES } from '@/data/images';
import { SITE } from '@/lib/site';
import MagneticButton from '@/components/ui/MagneticButton';
import { scrollToId } from '@/components/providers/SmoothScroll';

// three + the GLB never enter the mobile bundle: the import only resolves
// once the desktop branch actually renders.
const GarmentScene = dynamic(() => import('@/components/hero/GarmentScene'), {
  ssr: false,
});

const WORD = 'ONFACMEN';

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const scope = root.current;
      if (!scope) return;

      // Resolve to real elements up front. The intro timeline is built inside an
      // async callback, where GSAP's context scoping no longer applies and bare
      // selector strings would silently match nothing.
      const letters = scope.querySelectorAll('[data-hero-letter]');
      const fades = scope.querySelectorAll('[data-hero-fade]');
      const canvas = scope.querySelector('[data-hero-canvas]');
      const parallax = scope.querySelectorAll('[data-hero-parallax]');
      const headline = scope.querySelector('[data-hero-headline]');
      const glow = scope.querySelectorAll('[data-hero-glow]');

      if (reduced) {
        gsap.set([...letters, ...fades], { opacity: 1, y: 0, yPercent: 0 });
        if (canvas) gsap.set(canvas, { opacity: 1, scale: 1 });
        return;
      }

      gsap.set(letters, { yPercent: 118 });
      gsap.set(fades, { opacity: 0, y: 26 });

      const mm = gsap.matchMedia();

      /**
       * Built only once the intro has finished. A scrubbed `to` tween captures
       * its start values the first time it renders — wiring it up mid-intro
       * would latch onto opacity:0 and permanently hide the copy.
       */
      const setupScrollChoreography = () => {
        // Desktop: pin the hero and fly the camera into the garment while the
        // wordmark scales past the viewer.
        mm.add('(min-width: 1024px)', () => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: scope,
              // The section is 250svh with a 100svh sticky stage, so this range
              // is exactly the stage's travel — no pin, no pin-spacer.
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.9,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                heroProgress.value = self.progress;
              },
            },
          });

          // Type rushes toward the viewer and blows past the frame.
          tl.to(headline, { scale: 3.1, opacity: 0, ease: 'power2.in' }, 0)
            // Supporting copy clears out early so the frame empties as we dive.
            .to(
              fades,
              { opacity: 0, y: -34, ease: 'power1.in', duration: 0.45 },
              0,
            )
            // Ambient glow swells as the camera closes in.
            .to(glow, { scale: 2.1, opacity: 0.55, ease: 'none' }, 0);

          if (canvas) {
            // Dissolve the WebGL layer just before the pin releases, so the
            // handoff to the next section is a fade, not a cut.
            tl.to(
              canvas,
              { opacity: 0, ease: 'power2.in', duration: 0.18 },
              0.82,
            );
          }

          return () => {
            heroProgress.value = 0;
          };
        });

        // Below lg there is no WebGL, so just drift the poster away.
        mm.add('(max-width: 1023px)', () => {
          gsap.to(parallax, {
            yPercent: 18,
            opacity: 0.25,
            ease: 'none',
            scrollTrigger: {
              trigger: scope,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.6,
            },
          });
        });

        // Fonts and hero imagery settle after mount; without this the pin
        // measures against a stale layout.
        ScrollTrigger.refresh();
      };

      // Reveals must not wait on the GLB, or the copy sits invisible behind it.
      const stop = onIntroDone(() => {
        const tl = gsap.timeline({
          defaults: { ease: 'expo.out' },
          onComplete: setupScrollChoreography,
        });
        tl.to(letters, { yPercent: 0, duration: 1.15, stagger: 0.055 }).to(
          fades,
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.11 },
          '-=0.6',
        );
        if (canvas) {
          tl.to(
            canvas,
            { opacity: 1, scale: 1, duration: 1.6, ease: 'power2.out' },
            '-=1.3',
          );
        }
      });

      return () => {
        stop();
        mm.revert();
      };
    },
    { scope: root, dependencies: [reduced, isMobile] },
  );

  return (
    // The tall outer section is the scroll runway; the sticky stage inside is
    // what stays on screen. CSS sticky rather than a ScrollTrigger pin — the
    // pin-spacer fought Lenis and translated the hero instead of reserving room.
    <section ref={root} id="top" className="relative lg:h-[250svh]">
      <div
        data-hero-stage
        className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-24 lg:sticky lg:top-0 lg:h-[100svh] lg:min-h-0"
      >
        {/* Ambient blood glow behind the product. A radial-gradient, not a
            blurred circle: the scroll scales this layer, and re-rasterising a
            110px gaussian blur every frame was the most expensive paint on the
            page. A gradient costs nothing to scale. */}
        <div
          data-hero-glow
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,45,32,0.20),rgba(255,45,32,0.06)_45%,transparent_70%)]"
        />
        <div
          data-hero-glow
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_120%,rgba(179,18,11,0.20),transparent_60%)]"
        />

        {/* ── 3D product, desktop only ─────────────────── */}
        {!isMobile && !reduced ? (
          <div
            data-hero-canvas
            data-hero-parallax
            className="pointer-events-none absolute inset-0 z-0 scale-90 opacity-0"
          >
            <GarmentScene />
          </div>
        ) : (
          <div
            data-hero-parallax
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-1/2 z-0 mx-auto h-[58vmin] w-[58vmin] -translate-y-1/2"
          >
            <Image
              src={IMAGES.leather.src}
              alt=""
              fill
              priority
              sizes="60vmin"
              placeholder="blur"
              blurDataURL={IMAGES.leather.blur}
              className="rounded-full object-cover opacity-40 [mask-image:radial-gradient(circle,#000_45%,transparent_72%)]"
            />
          </div>
        )}

        {/* ── Headline ─────────────────────────────────── */}
        <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-center px-5 md:px-10">
          <p data-hero-fade className="eyebrow mb-6 flex items-center gap-3">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-blood" />
            Thrift &amp; Streetwear · Est. Kharar
          </p>

          <h1
            data-hero-headline
            aria-label={SITE.name}
            className="flex justify-between font-display text-[19vw] leading-[0.8] text-bone md:text-[15.5vw]"
          >
            {WORD.split('').map((c, i) => (
              <span key={i} className="overflow-hidden" aria-hidden>
                <span data-hero-letter className="inline-block">
                  {c}
                </span>
              </span>
            ))}
          </h1>

          <div className="mt-8 flex flex-col gap-8 md:mt-10 md:flex-row md:items-end md:justify-between">
            <p
              data-hero-fade
              className="max-w-md text-balance text-lg leading-snug text-ash md:text-xl"
            >
              Where you can find{' '}
              <span className="text-bone">affordable stuff</span> &amp;{' '}
              <span className="text-bone">trendy articles</span>{' '}
              <span aria-hidden>⚡️</span>
            </p>

            <div data-hero-fade className="flex flex-wrap items-center gap-3">
              <MagneticButton href="#drop" cursor="Browse">
                Shop the Drop
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M1 13L13 1M13 1H4M13 1v9"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </MagneticButton>
              <MagneticButton href="#visit" variant="ghost" cursor="Map">
                Visit Store
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* ── Bottom rail ──────────────────────────────── */}
        <div
          data-hero-fade
          className="relative z-10 mx-auto flex w-full max-w-[1600px] items-end justify-between gap-6 px-5 pb-8 md:px-10 md:pb-10"
        >
          <button
            onClick={() => scrollToId('story')}
            className="group flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-dim transition-colors hover:text-bone"
          >
            <span className="relative flex h-9 w-5 items-start justify-center rounded-full border border-line pt-1.5">
              <span className="h-1.5 w-px animate-bounce bg-blood" />
            </span>
            Scroll
          </button>

          <div className="hidden text-right text-[11px] uppercase leading-relaxed tracking-[0.16em] text-dim sm:block">
            <div>{SITE.hours}</div>
            <div className="text-ash">Sunny Enclave · Kharar</div>
          </div>
        </div>
      </div>
    </section>
  );
}
