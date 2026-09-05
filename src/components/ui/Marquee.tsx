type Props = {
  children: React.ReactNode;
  /** Seconds for one full loop — larger is slower. */
  speed?: number;
  reverse?: boolean;
  className?: string;
  pauseOnHover?: boolean;
};

/**
 * CSS-only infinite marquee: the track holds two identical copies and slides
 * exactly -50%, so the seam never shows and nothing runs on the JS frame.
 */
export default function Marquee({
  children,
  speed = 38,
  reverse = false,
  className = '',
  pauseOnHover = false,
}: Props) {
  return (
    <div className={`marquee-host relative overflow-hidden ${className}`}>
      <div
        className="marquee-track"
        data-reverse={reverse ? 'true' : undefined}
        data-pause={pauseOnHover ? 'true' : undefined}
        style={{ '--marquee-speed': `${speed}s` } as React.CSSProperties}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
