const HoneycombPattern = ({ className = "" }: { className?: string }) => {
  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <defs>
        <pattern
          id="honeycomb"
          width="56"
          height="100"
          patternUnits="userSpaceOnUse"
          patternTransform="scale(1.5)"
        >
          <path
            d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
            opacity="0.15"
          />
          <path
            d="M28 100L0 84L0 50L28 34L56 50L56 84L28 100Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
            opacity="0.15"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#honeycomb)" />
    </svg>
  );
};

export default HoneycombPattern;
