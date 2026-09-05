'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import { gsap, SplitText } from '@/lib/gsap';
import { IMAGES } from '@/data/images';

const COPY =
  'ONFACMEN started as one rack in Kharar with a simple idea — good clothes should not cost a month of pocket money. We hunt down overruns, surplus and pre-loved pieces, then price them so anyone can walk out styled. No gendered aisles. No dead stock. Just one honest floor of streetwear that moves as fast as you do.';

export default function Story() {
  const root = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      // Split after fonts settle, or word boxes are measured against a fallback.
      let split: SplitText | null = null;

      document.fonts.ready.then(() => {
        if (!copyRef.current) return;
        split = new SplitText(copyRef.current, { type: 'words', wordsClass: 'story-word' });

        // gsap.matchMedia (ScrollTrigger.matchMedia was removed in 3.12) and it
        // auto-reverts everything created inside each callback.
        const mm = gsap.matchMedia();

        mm.add('(min-width: 1024px)', () => {
          gsap.fromTo(
            split!.words,
            { opacity: 0.14 },
            {
              opacity: 1,
              ease: 'none',
              stagger: 0.5,
              scrollTrigger: {
                trigger: root.current,
                start: 'top top',
                end: '+=150%',
                scrub: 0.5,
                pin: true,
                anticipatePin: 1,
              },
            },
          );
        });

        mm.add('(max-width: 1023px)', () => {
          // No pin on small screens — pinning plus momentum scroll reads jittery.
          gsap.fromTo(
            split!.words,
            { opacity: 0.16 },
            {
              opacity: 1,
              ease: 'none',
              stagger: 0.06,
              scrollTrigger: { trigger: copyRef.current, start: 'top 80%', end: 'bottom 55%', scrub: 0.4 },
            },
          );
        });
      });

      return () => split?.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="story"
      className="relative flex min-h-[100svh] items-center overflow-hidden border-t border-line bg-ink-800 py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/2 h-[60vmin] w-[60vmin] -translate-y-1/2 rounded-full bg-ember/10 blur-[130px]"
      />

      <div className="mx-auto grid w-full max-w-[1600px] items-center gap-14 px-5 md:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.62fr)] lg:gap-20">
        <div>
          <p className="eyebrow mb-8 flex items-center gap-3">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-blood" />
            01 — The Store
          </p>

          <h2 className="mb-10 font-display text-[13vw] leading-[0.82] text-bone sm:text-[9vw] lg:text-[5.6vw]">
            One rack,
            <br />
            <span className="text-stroke">a whole</span> city.
          </h2>

          <p
            ref={copyRef}
            className="max-w-[54ch] text-xl leading-[1.45] text-bone md:text-2xl lg:text-[1.75rem]"
          >
            {COPY}
          </p>

          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-8">
            {[
              ['₹299', 'Starting price'],
              ['Weekly', 'New arrivals'],
              ['1 of 1', 'Most pieces'],
            ].map(([big, small]) => (
              <div key={small}>
                <dt className="font-display text-3xl text-blood md:text-4xl">{big}</dt>
                <dd className="mt-2 text-[11px] uppercase tracking-[0.14em] text-dim">{small}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative hidden aspect-[3/4] overflow-hidden rounded-sm lg:block">
          <Image
            src={IMAGES.story.src}
            alt={IMAGES.story.alt}
            fill
            sizes="(max-width: 1024px) 0px, 38vw"
            placeholder="blur"
            blurDataURL={IMAGES.story.blur}
            className="object-cover grayscale transition-all duration-700 hover:grayscale-0"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
            <span className="font-display text-2xl text-bone">Sunny Enclave</span>
            <span className="text-[11px] uppercase tracking-[0.14em] text-blood">Open till 10PM</span>
          </div>
        </div>
      </div>
    </section>
  );
}
