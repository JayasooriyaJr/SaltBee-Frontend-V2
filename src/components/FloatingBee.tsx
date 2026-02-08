/**
 * Animated floating bee built with SVG.
 * Honey-colored body, charcoal stripes, translucent wings, figure-8 flight path.
 */
const FloatingBee = ({
  className = "",
  size = 24,
  delay = 0,
}: {
  className?: string;
  size?: number;
  delay?: number;
}) => (
  <div
    className={`absolute pointer-events-none hidden md:block ${className}`}
    style={{
      width: size,
      height: size,
      animation: `bee-fly 8s ease-in-out ${delay}s infinite`,
    }}
  >
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left wing */}
      <ellipse
        cx="22"
        cy="22"
        rx="10"
        ry="6"
        transform="rotate(-30 22 22)"
        fill="hsl(42 90% 55% / 0.3)"
        style={{ animation: "bee-wing 0.1s infinite" }}
      />
      {/* Right wing */}
      <ellipse
        cx="42"
        cy="22"
        rx="10"
        ry="6"
        transform="rotate(30 42 22)"
        fill="hsl(42 90% 55% / 0.3)"
        style={{ animation: "bee-wing 0.1s infinite" }}
      />
      {/* Body */}
      <ellipse cx="32" cy="34" rx="11" ry="14" fill="hsl(42 90% 55%)" />
      {/* Stripes */}
      <rect x="21" y="28" width="22" height="3" rx="1" fill="hsl(30 10% 6%)" />
      <rect x="21" y="34" width="22" height="3" rx="1" fill="hsl(30 10% 6%)" />
      <rect x="21" y="40" width="22" height="3" rx="1" fill="hsl(30 10% 6%)" />
      {/* Eyes */}
      <circle cx="28" cy="24" r="2" fill="hsl(30 10% 6%)" />
      <circle cx="36" cy="24" r="2" fill="hsl(30 10% 6%)" />
      {/* Antennae */}
      <line x1="28" y1="20" x2="24" y2="10" stroke="hsl(30 10% 6%)" strokeWidth="1.5" />
      <circle cx="24" cy="10" r="2" fill="hsl(30 10% 6%)" />
      <line x1="36" y1="20" x2="40" y2="10" stroke="hsl(30 10% 6%)" strokeWidth="1.5" />
      <circle cx="40" cy="10" r="2" fill="hsl(30 10% 6%)" />
    </svg>
  </div>
);

export default FloatingBee;
