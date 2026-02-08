import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── hex math ─── */
const HEX_W = 52;
const HEX_H = 60;
const COL_OFFSET = HEX_W * 0.75;
const ROW_OFFSET = HEX_H;
const COLS = 18;
const ROWS = 14;

const hexPoints = (s: number) => {
  const a = Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    return `${(s * Math.cos(angle)).toFixed(2)},${(s * Math.sin(angle)).toFixed(2)}`;
  });
  return a.join(" ");
};

type HexInfo = {
  cx: number;
  cy: number;
  dist: number;
  filled: boolean;
  glowTier: number;
  delay: number;
};

function buildGrid(): HexInfo[] {
  const midX = ((COLS - 1) * COL_OFFSET) / 2;
  const midY = ((ROWS - 1) * ROW_OFFSET) / 2;
  const maxDist = Math.hypot(midX, midY);

  const cells: HexInfo[] = [];

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const cx = c * COL_OFFSET;
      const cy = r * ROW_OFFSET + (c % 2 === 1 ? ROW_OFFSET / 2 : 0);
      const dist = Math.hypot(cx - midX, cy - midY) / maxDist;

      const rng = pseudoRand(r * COLS + c);
      let glowTier = 0;
      const fillChance = dist < 0.3 ? 0.6 : dist < 0.55 ? 0.35 : 0.12;
      const filled = rng < fillChance;
      if (filled) glowTier = dist < 0.35 ? 2 : 1;

      cells.push({
        cx,
        cy,
        dist,
        filled,
        glowTier,
        delay: dist * 2.5 + rng * 0.8,
      });
    }
  }
  return cells;
}

function pseudoRand(seed: number) {
  let x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

/* ─── CSS keyframes injected once ─── */
const STYLE_ID = "bee-loader-kf";
function ensureKeyframes() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
@keyframes hex-breathe {
  0%,100%{ opacity:.25; transform:scale(.95) }
  50%{ opacity:.85; transform:scale(1) }
}
@keyframes hex-glow {
  0%,100%{ opacity:.4; filter:brightness(1) }
  50%{ opacity:.9; filter:brightness(1.35) }
}
@keyframes hex-pulse {
  0%,100%{ opacity:.15; transform:scale(.92) }
  50%{ opacity:.55; transform:scale(1.02) }
}
@keyframes hex-fade-in {
  from { opacity:0; transform:scale(.85) }
  to   { opacity:1; transform:scale(1) }
}
`;
  document.head.appendChild(style);
}

/* ─── Component ─── */
interface BeeLoaderProps {
  visible?: boolean;
  text?: string;
  onDone?: () => void;
  className?: string;
}

const BeeLoader = ({
  visible = true,
  text,
  onDone,
  className = "",
}: BeeLoaderProps) => {
  const [show, setShow] = useState(visible);

  useEffect(() => {
    ensureKeyframes();
  }, []);

  useEffect(() => {
    if (!visible && show) {
      const t = setTimeout(() => {
        setShow(false);
        onDone?.();
      }, 600);
      return () => clearTimeout(t);
    }
    if (visible) setShow(true);
  }, [visible]);

  const grid = useMemo(buildGrid, []);

  const svgW = (COLS - 1) * COL_OFFSET + HEX_W;
  const svgH = (ROWS - 1) * ROW_OFFSET + HEX_H;

  if (!show && !visible) return null;

  return (
    <AnimatePresence>
      {(show || visible) && (
        <motion.div
          key="bee-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden ${className}`}
          style={{ background: "hsl(30 15% 8%)" }}
        >
          {/* Ambient warm spots */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse 50% 45% at 50% 50%, hsla(42,80%,40%,.14) 0%, transparent 100%),
                radial-gradient(circle 35% at 30% 60%, hsla(32,70%,35%,.10) 0%, transparent 100%),
                radial-gradient(circle 30% at 72% 35%, hsla(45,85%,50%,.08) 0%, transparent 100%)
              `,
            }}
          />

          {/* Vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 65% at 50% 50%, transparent 40%, hsla(30,15%,4%,.85) 100%)",
            }}
          />

          {/* Hex grid */}
          <svg
            viewBox={`-${HEX_W / 2} -${HEX_H / 2} ${svgW + HEX_W} ${svgH + HEX_H}`}
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="hex-fill-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(42 90% 50%)" />
                <stop offset="100%" stopColor="hsl(32 80% 35%)" />
              </linearGradient>
              <filter id="hex-blur">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
              </filter>
              <filter id="hex-blur-strong">
                <feGaussianBlur in="SourceGraphic" stdDeviation="6" />
              </filter>
            </defs>

            {grid.map((h, i) => {
              const pts = hexPoints(HEX_W * 0.38);
              const anim =
                h.glowTier === 2
                  ? "hex-glow"
                  : h.glowTier === 1
                  ? "hex-breathe"
                  : "hex-pulse";
              const dur = 4 + h.dist * 2;

              return (
                <g
                  key={i}
                  transform={`translate(${h.cx},${h.cy})`}
                  style={{
                    animation: `hex-fade-in .8s ease-out ${h.delay}s both`,
                  }}
                >
                  {h.filled && (
                    <polygon
                      points={pts}
                      fill={
                        h.glowTier === 2
                          ? "hsl(45 95% 65%)"
                          : "hsl(42 75% 45%)"
                      }
                      filter={
                        h.glowTier === 2
                          ? "url(#hex-blur-strong)"
                          : "url(#hex-blur)"
                      }
                      style={{
                        animation: `${anim} ${dur}s ease-in-out ${h.delay}s infinite`,
                        transformOrigin: "center",
                      }}
                    />
                  )}

                  <polygon
                    points={pts}
                    fill={h.filled ? "url(#hex-fill-grad)" : "none"}
                    stroke="hsl(42 75% 45%)"
                    strokeWidth={h.filled ? "0.6" : "0.4"}
                    opacity={h.filled ? undefined : 0.18}
                    style={{
                      animation: `${anim} ${dur}s ease-in-out ${h.delay}s infinite`,
                      transformOrigin: "center",
                    }}
                  />
                </g>
              );
            })}
          </svg>

          {/* Optional loading text */}
          {text && (
            <motion.p
              className="relative z-10 text-sm tracking-[.2em] uppercase"
              style={{ color: "hsl(42 60% 60%)" }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              {text}
            </motion.p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BeeLoader;
