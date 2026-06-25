"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

function GeometricCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let animId: number;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const line = (x1: number, y1: number, x2: number, y2: number, a: number, w = 0.5) => {
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
      ctx.strokeStyle = `rgba(59,130,246,${a})`; ctx.lineWidth = w; ctx.stroke();
    };

    const circle = (cx: number, cy: number, r: number, a: number, dash = false) => {
      ctx.beginPath();
      if (dash) ctx.setLineDash([1.5, 3]); else ctx.setLineDash([]);
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(59,130,246,${a})`; ctx.lineWidth = 0.5; ctx.stroke();
      ctx.setLineDash([]);
    };

    const arc = (cx: number, cy: number, r: number, start: number, end: number, a: number) => {
      ctx.beginPath(); ctx.arc(cx, cy, r, start, end);
      ctx.strokeStyle = `rgba(59,130,246,${a})`; ctx.lineWidth = 0.5; ctx.stroke();
    };

    const draw = () => {
      const w = canvas.width, h = canvas.height;
      const cx = w / 2, cy = h / 2;
      ctx.clearRect(0, 0, w, h);

      const t = Math.min(frame / 80, 1);
      const e = 1 - Math.pow(1 - t, 4); // ease out quart
      const rot = frame * 0.002; // slow rotation

      // Outer rotating arcs
      const outerR = Math.min(w, h) * 0.4 * e;
      for (let i = 0; i < 6; i++) {
        const angle = rot + (i * Math.PI) / 3;
        arc(cx, cy, outerR, angle, angle + 0.8, 0.04 * e);
      }

      // Large X
      const spread = Math.min(w, h) * 0.42 * e;
      for (let i = -3; i <= 3; i++) {
        const off = i * 3;
        line(cx - spread + off, cy - spread, cx + spread + off, cy + spread, 0.04 * e);
        line(cx + spread + off, cy - spread, cx - spread + off, cy + spread, 0.04 * e);
      }

      // Horizontal bands
      for (let j = -1; j <= 1; j += 2) {
        const bandY = cy + j * h * 0.1;
        for (let i = 0; i < 5; i++) {
          line(0, bandY + i * 2.5, w * e, bandY + i * 2.5, 0.06);
        }
      }

      // Vertical columns
      for (let j = -1; j <= 1; j += 2) {
        const colX = cx + j * w * 0.18;
        for (let i = 0; i < 4; i++) {
          line(colX + i * 2.5, 0, colX + i * 2.5, h * e, 0.04);
        }
      }

      // Circles
      circle(cx, cy, outerR * 0.75, 0.05 * e, true);
      circle(cx, cy, outerR * 0.5, 0.04 * e, false);
      circle(cx, cy, outerR * 0.25, 0.03 * e, true);

      // Inner triangle
      const triR = outerR * 0.5 * e;
      for (let i = 0; i < 3; i++) {
        const a1 = rot * 0.5 + (i * 2 * Math.PI) / 3 - Math.PI / 2;
        const a2 = rot * 0.5 + ((i + 1) * 2 * Math.PI) / 3 - Math.PI / 2;
        line(cx + Math.cos(a1) * triR, cy + Math.sin(a1) * triR, cx + Math.cos(a2) * triR, cy + Math.sin(a2) * triR, 0.06 * e);
      }

      // Diamond
      const dR = outerR * 0.35 * e;
      const dPts = [[cx, cy - dR], [cx + dR, cy], [cx, cy + dR], [cx - dR, cy]];
      for (let i = 0; i < 4; i++) {
        const [x1, y1] = dPts[i];
        const [x2, y2] = dPts[(i + 1) % 4];
        line(x1, y1, x2, y2, 0.04 * e);
      }

      // Corner brackets
      const bSize = 40 * e;
      const bAlpha = 0.08 * e;
      // top-left
      line(30, 30, 30 + bSize, 30, bAlpha, 0.8);
      line(30, 30, 30, 30 + bSize, bAlpha, 0.8);
      // top-right
      line(w - 30, 30, w - 30 - bSize, 30, bAlpha, 0.8);
      line(w - 30, 30, w - 30, 30 + bSize, bAlpha, 0.8);
      // bottom-left
      line(30, h - 30, 30 + bSize, h - 30, bAlpha, 0.8);
      line(30, h - 30, 30, h - 30 - bSize, bAlpha, 0.8);
      // bottom-right
      line(w - 30, h - 30, w - 30 - bSize, h - 30, bAlpha, 0.8);
      line(w - 30, h - 30, w - 30, h - 30 - bSize, bAlpha, 0.8);

      // Crosshairs at intersections
      const crossPts = [[cx, cy], [cx - spread * 0.4, cy], [cx + spread * 0.4, cy], [cx, cy - spread * 0.4], [cx, cy + spread * 0.4]];
      crossPts.forEach(([x, y]) => {
        line(x - 5, y, x + 5, y, 0.1 * e, 0.5);
        line(x, y - 5, x, y + 5, 0.1 * e, 0.5);
      });

      // Dots along circle
      const dotCount = 24;
      for (let i = 0; i < dotCount * e; i++) {
        const angle = (i / dotCount) * Math.PI * 2 + rot;
        const dx = cx + Math.cos(angle) * outerR * 0.75;
        const dy = cy + Math.sin(angle) * outerR * 0.75;
        ctx.beginPath(); ctx.arc(dx, dy, 1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59,130,246,${0.15 * e})`;
        ctx.fill();
      }

      frame++;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"geo" | "welcome" | "done">("geo");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("welcome"), 2200);
    const t2 = setTimeout(() => setPhase("done"), 4500);
    const t3 = setTimeout(onComplete, 5200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  if (phase === "done") {
    return (
      <motion.div
        className="fixed inset-0 z-[9999] bg-[#0a0a0f]"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-[#0a0a0f] flex items-center justify-center overflow-hidden">
      <GeometricCanvas />

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center">
        <AnimatePresence mode="wait">
          {phase === "geo" && (
            <motion.div
              key="geo"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: "blur(8px)", scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-6"
            >
              {/* Pulsing center dot */}
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-primary/60"
              />
              {/* Loading bar */}
              <div className="w-56 h-[1px] bg-white/[0.06] rounded-full overflow-hidden">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  transition={{ duration: 1.5, repeat: 2, ease: "easeInOut" }}
                  className="w-1/3 h-full bg-gradient-to-r from-transparent via-primary/40 to-transparent"
                />
              </div>
              <motion.p
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-[10px] text-white/30 tracking-[0.4em] uppercase font-mono"
              >
                Loading
              </motion.p>
            </motion.div>
          )}

          {phase === "welcome" && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center px-6"
            >
              {/* Line reveal */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="w-16 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent mb-8 origin-center"
              />

              {/* Welcome text with stagger */}
              <div className="overflow-hidden mb-2">
                <motion.h1
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="text-3xl md:text-5xl font-bold tracking-tight text-white"
                >
                  Welcome
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-sm text-white/30 mb-6 max-w-xs"
              >
                Quality-first engineering portfolio
              </motion.p>

              {/* Animated dots */}
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.1, type: "spring", stiffness: 300 }}
                    className="w-1.5 h-1.5 rounded-full bg-primary/40"
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom keywords */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-8 left-0 right-0 text-center"
      >
        <p className="text-[9px] text-white/15 tracking-[0.25em] uppercase font-mono">
          SDET · Automation · Testing · Performance · CI/CD · Quality
        </p>
      </motion.div>

      {/* Top-left version */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute top-6 left-6"
      >
        <p className="text-[9px] text-white/15 font-mono">v1.0</p>
      </motion.div>
    </div>
  );
}
