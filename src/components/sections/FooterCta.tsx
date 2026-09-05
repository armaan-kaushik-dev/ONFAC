'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { SITE, whatsappUrl, mapsDirectionsUrl } from '@/lib/site';
import MagneticButton from '@/components/ui/MagneticButton';

const HEADLINE = ['Come', 'Find', 'Your', 'Fit'];

const SOCIALS = [
  {
    label: 'Instagram',
    href: SITE.instagram,
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    label: 'WhatsApp',
    href: whatsappUrl,
    icon: (
      <path d="M3.5 20.5 5 16.4A8 8 0 1 1 8 19.3l-4.5 1.2Zm5.9-5.6c1.3 1.4 2.9 2.3 4.4 2.4.8 0 1.6-.5 1.8-1.2.1-.4.1-.8 0-.9l-1.7-.8c-.2-.1-.4 0-.6.2l-.5.7c-.9-.4-1.7-1.2-2.2-2.1l.6-.5c.2-.2.2-.4.2-.6l-.7-1.7c-.1-.2-.4-.2-.9-.1-.7.2-1.2 1-1.2 1.8 0 1 .6 2 1.6 3.1Z" />
    ),
  },
  { label: 'Directions', href: mapsDirectionsUrl, icon: <><path d="M12 22s7-6.3 7-11.5A7 7 0 0 0 5 10.5C5 15.7 12 22 12 22Z" /><circle cx="12" cy="10.3" r="2.6" /></> },
];

export default function FooterCta() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '[data-cta-word]',
        { yPercent: 108, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'expo.out',
          stagger: 0.09,
          scrollTrigger: { trigger: root.current, start: 'top 72%', once: true },
        },
      );
    },
    { scope: root },
  );

  return (
    <footer ref={root} className="relative overflow-hidden border-t border-line pt-24 md:pt-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/2 h-[70vmin] w-[110vmin] -translate-x-1/2 rounded-[50%] bg-blood/12 blur-[130px]"
      />

      <div className="relative mx-auto w-full max-w-[1600px] px-5 md:px-10">
        <h2
          aria-label="Come Find Your Fit"
          className="font-display text-[17vw] leading-[0.82] text-bone lg:text-[11vw]"
        >
          {HEADLINE.map((w, i) => (
            <span key={w} className="block overflow-hidden" aria-hidden>
              <span data-cta-word className="inline-block">
                {i === 3 ? <span className="text-blood">{w}</span> : w}
              </span>
            </span>
          ))}
        </h2>

        <div className="mt-14 flex flex-col gap-10 border-t border-line pt-10 md:flex-row md:items-center md:justify-between">
          <p className="max-w-md text-lg leading-snug text-ash">
            Walk in, dig through the racks, walk out with something nobody else has.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <MagneticButton href={whatsappUrl} external cursor="Chat">
              Message on WhatsApp
            </MagneticButton>
            <div className="flex items-center gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  data-cursor=""
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-ash transition-colors hover:border-blood hover:text-blood"
                >
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    {s.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 border-t border-line py-10 text-[11px] uppercase leading-relaxed tracking-[0.14em] text-dim md:flex-row md:justify-between">
          <div className="max-w-sm">
            <div className="mb-2 font-display text-base tracking-normal text-bone">
              {SITE.name}
              <span className="text-blood">.</span>
            </div>
            {SITE.address}
          </div>
          <div className="space-y-2 md:text-right">
            <div>
              <a
                href={`tel:${SITE.phoneDisplay.replace(/\s/g, '')}`}
                className="transition-colors hover:text-blood"
              >
                {SITE.phoneDisplay}
              </a>
            </div>
            <div>{SITE.hours}</div>
            <div className="text-dim/70">
              © {new Date().getFullYear()} {SITE.name} · Kharar, Punjab
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
