"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import { profile } from "@/data/profile";

function TypingEffect({ words }: { words: string[] }) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = words[idx];
    const timer = setTimeout(() => {
      if (!del) { setText(word.slice(0, text.length + 1)); if (text.length === word.length) setTimeout(() => setDel(true), 2500); }
      else { setText(word.slice(0, text.length - 1)); if (text.length === 0) { setDel(false); setIdx((i) => (i + 1) % words.length); } }
    }, del ? 30 : 55);
    return () => clearTimeout(timer);
  }, [text, del, idx, words]);
  return <>{text}<span className="cursor-blink text-primary/50">|</span></>;
}

function InteractiveGlow() {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const handleMove = useCallback((e: MouseEvent) => {
    setPos({ x: (e.clientX / window.innerWidth) * 100, y: (e.clientY / window.innerHeight) * 100 });
  }, []);
  useEffect(() => { window.addEventListener("mousemove", handleMove); return () => window.removeEventListener("mousemove", handleMove); }, [handleMove]);
  return (
    <div className="absolute inset-0 pointer-events-none transition-all duration-[3000ms] ease-out" style={{
      background: `radial-gradient(ellipse 500px 350px at ${pos.x}% ${pos.y}%, rgba(59,130,246,0.04) 0%, transparent 70%),
                   radial-gradient(ellipse 80% 50% at 50% -10%, rgba(59,130,246,0.05) 0%, transparent 50%),
                   radial-gradient(ellipse 40% 30% at 85% 80%, rgba(59,130,246,0.02) 0%, transparent 50%)`,
    }} />
  );
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.35], [0, 100]);
  const scale = useTransform(scrollYProgress, [0, 0.35], [1, 0.95]);

  return (
    <section id="home" ref={ref} className="relative min-h-[100dvh] flex items-center overflow-hidden">
      <InteractiveGlow />

      <motion.div style={{ opacity, y, scale }} className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 md:px-10 py-24 md:py-32 w-full">
        {/* Status */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 md:mb-8"
        >
          <span className="inline-flex items-center gap-2 text-xs text-text-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            {profile.availability}
          </span>
        </motion.div>

        {/* Headline — staggered line reveal */}
        <div className="space-y-0 md:space-y-1 mb-6 md:mb-8">
          {["Quality-first", "engineering."].map((line, i) => (
            <div key={line} className="overflow-hidden">
              <motion.h1
                initial={{ y: "110%", rotateX: -30 }}
                animate={{ y: 0, rotateX: 0 }}
                transition={{ duration: 0.9, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className={`text-[clamp(2.2rem,8vw,6.5rem)] font-bold leading-[1] md:leading-[0.95] tracking-tighter ${i === 1 ? "gradient-text" : ""}`}
              >
                {line}
              </motion.h1>
            </div>
          ))}
        </div>

        {/* Typing */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-base md:text-xl text-text-muted mb-5 md:mb-6 h-7"
        >
          <TypingEffect words={[profile.title, "Shift-left quality advocate", "Test infrastructure at scale", "Performance & reliability engineer"]} />
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 1 }}
          className="text-sm md:text-[15px] text-text-muted/70 max-w-lg leading-relaxed mb-8 md:mb-12"
        >
          {profile.bio}
        </motion.p>

        {/* Stats — stagger from left */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-8 md:gap-x-12 gap-y-4 mb-8 md:mb-12"
        >
          {profile.stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.3 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="text-2xl md:text-4xl font-bold tracking-tight">{s.value}</div>
              <div className="text-[11px] md:text-xs text-text-muted mt-0.5">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <a href="#projects" className="group px-6 py-3 text-sm font-medium rounded-full bg-primary text-white hover:bg-primary-dark transition-colors inline-flex items-center justify-center gap-2 shadow-lg shadow-primary/15">
            View work <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a href="#contact" className="px-6 py-3 text-sm font-medium rounded-full border border-surface-border text-text-muted hover:text-text hover:border-primary/30 transition-all text-center">
            Contact
          </a>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-surface to-transparent pointer-events-none" />
    </section>
  );
}
