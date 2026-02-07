import { motion } from "framer-motion";

/**
 * Beehive-shaped loading animation — 7 hexagons in a honeycomb cluster
 * that light up sequentially like honey filling cells.
 */
const hexPositions = [
  { x: 0, y: 0 },       // center
  { x: 30, y: -17 },    // top-right
  { x: 30, y: 17 },     // bottom-right
  { x: 0, y: 34 },      // bottom
  { x: -30, y: 17 },    // bottom-left
  { x: -30, y: -17 },   // top-left
  { x: 0, y: -34 },     // top
];

const HexCell = ({ x, y, delay }: { x: number; y: number; delay: number }) => (
  <motion.g transform={`translate(${x}, ${y})`}>
    <motion.polygon
      points="15,0 7.5,-13 -7.5,-13 -15,0 -7.5,13 7.5,13"
      fill="hsl(var(--primary))"
      stroke="hsl(var(--primary))"
      strokeWidth="1.5"
      initial={{ opacity: 0.1, scale: 0.8 }}
      animate={{
        opacity: [0.1, 0.9, 0.1],
        scale: [0.8, 1, 0.8],
      }}
      transition={{
        duration: 1.4,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  </motion.g>
);

interface BeeLoaderProps {
  size?: number;
  text?: string;
  className?: string;
}

const BeeLoader = ({ size = 120, text, className = "" }: BeeLoaderProps) => {
  return (
    <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
      <div className="relative" style={{ width: size, height: size }}>
        {/* Spinning outer ring */}
        <motion.svg
          className="absolute inset-0"
          viewBox="-50 -50 100 100"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <polygon
            points="45,0 22.5,-39 -22.5,-39 -45,0 -22.5,39 22.5,39"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="0.8"
            opacity="0.2"
          />
        </motion.svg>

        {/* Honeycomb cluster */}
        <svg className="absolute inset-0" viewBox="-50 -50 100 100">
          {hexPositions.map((pos, i) => (
            <HexCell key={i} x={pos.x} y={pos.y} delay={i * 0.15} />
          ))}
        </svg>

        {/* Animated bee icon in center */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-lg">🐝</span>
        </motion.div>
      </div>

      {text && (
        <motion.p
          className="text-sm text-muted-foreground tracking-wider"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

export default BeeLoader;
