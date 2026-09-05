import Image from 'next/image';
import Marquee from '@/components/ui/Marquee';
import { LIFESTYLE, SITE } from '@/lib/site';
import type { Img } from '@/data/images';

function Tile({ img, tall = false }: { img: Img; tall?: boolean }) {
  return (
    <figure
      className={`relative mx-2 shrink-0 overflow-hidden rounded-sm bg-ink-700 ${
        tall ? 'h-[26rem] w-[19rem]' : 'h-[19rem] w-[26rem]'
      }`}
    >
      <Image
        src={img.src}
        alt={img.alt}
        fill
        sizes="26rem"
        placeholder="blur"
        blurDataURL={img.blur}
        className="object-cover grayscale-[0.55] transition-all duration-700 hover:scale-105 hover:grayscale-0"
      />
      <div className="pointer-events-none absolute inset-0 bg-ink/25" />
    </figure>
  );
}

export default function SocialStrip() {
  const rowA = LIFESTYLE.slice(0, 4);
  const rowB = LIFESTYLE.slice(4);

  return (
    <section className="relative overflow-hidden border-t border-line py-24 md:py-32">
      <div className="mx-auto mb-14 w-full max-w-[1600px] px-5 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-6 flex items-center gap-3">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-blood" />
              04 — On The Feed
            </p>
            <h2 className="font-display text-[13vw] leading-[0.82] text-bone sm:text-[9vw] lg:text-[6vw]">
              Fits from
              <br />
              the floor
            </h2>
          </div>
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="Follow"
            className="group inline-flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-bone transition-colors hover:text-blood"
          >
            @onfacmen
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line transition-colors group-hover:border-blood">
              →
            </span>
          </a>
        </div>
      </div>

      {/* Two rows drifting against each other reads livelier than one. */}
      <div className="edge-fade-x space-y-4">
        <Marquee speed={52} pauseOnHover>
          {rowA.map((img, i) => (
            <Tile key={`a-${i}`} img={img} />
          ))}
        </Marquee>
        <Marquee speed={62} reverse pauseOnHover>
          {rowB.map((img, i) => (
            <Tile key={`b-${i}`} img={img} tall />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
