import Marquee from '@/components/ui/Marquee';

const ITEMS = [
  'Affordable Stuff',
  'Trendy Articles',
  'Unisex Friendly',
  'New Drop Weekly',
  'Kharar · Punjab',
  'Single Piece Stock',
];

export default function Ticker() {
  return (
    <div className="border-y border-blood/25 bg-blood py-3.5">
      <Marquee speed={30}>
        {ITEMS.map((t, i) => (
          <span key={`${t}-${i}`} className="flex items-center">
            <span className="whitespace-nowrap px-7 font-display text-lg tracking-wide text-ink md:text-xl">
              {t}
            </span>
            <span className="text-ink/45" aria-hidden>
              ✳
            </span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
