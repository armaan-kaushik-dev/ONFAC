'use client';

import { VALUES } from '@/lib/site';
import Reveal from '@/components/ui/Reveal';

const ICONS: Record<string, React.ReactNode> = {
  tag: (
    <>
      <path d="M3 11.5V4a1 1 0 0 1 1-1h7.5a1 1 0 0 1 .7.3l8.5 8.5a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 12.2a1 1 0 0 1-.3-.7Z" />
      <circle cx="7.5" cy="7.5" r="1.6" />
    </>
  ),
  bolt: <path d="M13.5 2 4 13.5h6.5L10 22l9.5-11.5H13L13.5 2Z" />,
  users: (
    <>
      <circle cx="9" cy="8" r="3.4" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
      <path d="M16 5.2a3.4 3.4 0 0 1 0 5.6M17.5 14.4A6.5 6.5 0 0 1 21.5 20" />
    </>
  ),
  pin: (
    <>
      <path d="M12 22s7-6.3 7-11.5A7 7 0 0 0 5 10.5C5 15.7 12 22 12 22Z" />
      <circle cx="12" cy="10.3" r="2.6" />
    </>
  ),
};

export default function Why() {
  return (
    <section id="why" className="relative border-t border-line bg-ink-800 py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1600px] px-5 md:px-10">
        <Reveal className="mb-16 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-6 flex items-center gap-3">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-blood" />
              03 — Why ONFACMEN
            </p>
            <h2 className="font-display text-[13vw] leading-[0.82] text-bone sm:text-[9vw] lg:text-[6vw]">
              Built different
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-ash md:text-right">
            Four reasons the racks in Sunny Enclave keep emptying out.
          </p>
        </Reveal>

        <Reveal stagger={0.12} className="grid gap-px overflow-hidden rounded-sm bg-line sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v) => (
            <article
              key={v.n}
              data-reveal
              className="group relative flex min-h-[19rem] flex-col justify-between bg-ink-800 p-8 transition-colors duration-500 hover:bg-ink-700"
            >
              {/* Accent wipe on hover */}
              <span className="absolute inset-x-0 top-0 h-px w-0 bg-blood transition-all duration-500 group-hover:w-full" />

              <div className="flex items-start justify-between">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blood transition-transform duration-500 group-hover:-translate-y-1"
                  aria-hidden
                >
                  {ICONS[v.icon]}
                </svg>
                <span className="font-display text-2xl text-bone/15 transition-colors group-hover:text-bone/40">
                  {v.n}
                </span>
              </div>

              <div>
                <h3 className="mb-3 font-display text-2xl leading-none text-bone md:text-3xl">
                  {v.title}
                </h3>
                <p className="text-sm leading-relaxed text-ash">{v.body}</p>
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
