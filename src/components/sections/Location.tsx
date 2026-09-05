'use client';

import { SITE, mapsDirectionsUrl, mapsEmbedUrl } from '@/lib/site';
import Reveal from '@/components/ui/Reveal';
import MagneticButton from '@/components/ui/MagneticButton';

const DETAILS = [
  { label: 'Address', value: SITE.address },
  { label: 'Hours', value: SITE.hours },
  { label: 'Phone', value: SITE.phoneDisplay, href: `tel:${SITE.phoneDisplay.replace(/\s/g, '')}` },
];

export default function Location() {
  return (
    <section id="visit" className="relative border-t border-line bg-ink-800 py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1600px] px-5 md:px-10">
        <Reveal className="mb-14">
          <p className="eyebrow mb-6 flex items-center gap-3">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-blood" />
            05 — Visit Us
          </p>
          <h2 className="font-display text-[13vw] leading-[0.82] text-bone sm:text-[9vw] lg:text-[6vw]">
            Opposite
            <br />
            <span className="text-stroke">Jalvayu</span> Tower
          </h2>
        </Reveal>

        <div className="grid gap-px overflow-hidden rounded-sm bg-line lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <Reveal className="flex flex-col justify-between gap-10 bg-ink-800 p-8 md:p-10">
            <dl className="space-y-8">
              {DETAILS.map((d) => (
                <div key={d.label}>
                  <dt className="mb-2 text-[10px] uppercase tracking-[0.2em] text-dim">{d.label}</dt>
                  <dd className="max-w-sm text-lg leading-snug text-bone">
                    {d.href ? (
                      <a href={d.href} className="transition-colors hover:text-blood">
                        {d.value}
                      </a>
                    ) : (
                      d.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="flex flex-wrap gap-3">
              <MagneticButton href={mapsDirectionsUrl} external cursor="Open">
                Get Directions
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path
                    d="M1 13L13 1M13 1H4M13 1v9"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </MagneticButton>
              <MagneticButton
                href={`tel:${SITE.phoneDisplay.replace(/\s/g, '')}`}
                variant="ghost"
                cursor="Call"
              >
                Call the Store
              </MagneticButton>
            </div>
          </Reveal>

          <Reveal className="relative min-h-[22rem] bg-ink-800 lg:min-h-[32rem]">
            {/* Google's embed has no dark theme, so invert + rotate hue to match. */}
            <iframe
              title={`Map to ${SITE.name}, ${SITE.city}`}
              src={mapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="absolute inset-0 h-full w-full grayscale-[0.35] invert-[0.92] hue-rotate-180 contrast-[0.92]"
            />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-line" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
