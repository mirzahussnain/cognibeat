/** Tactile noise texture overlay using SVG feTurbulence. Covers the entire viewport. */
export function NoiseOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-100"
    >
      {/* Dark mode — overlay blend */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        className="hidden dark:block h-full w-full mix-blend-overlay opacity-[0.12]"
      >
        <filter id="cb-noise-dark">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves={4}
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#cb-noise-dark)" />
      </svg>

      {/* Light mode — soft-light blend */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        className="block dark:hidden h-full w-full mix-blend-soft-light opacity-[0.35]"
      >
        <filter id="cb-noise-light">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves={4}
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#cb-noise-light)" />
      </svg>
    </div>
  );
}
