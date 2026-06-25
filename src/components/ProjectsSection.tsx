"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, LayoutGroup, useScroll, useTransform } from "framer-motion";
import { projects, categories } from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function ProjectsSection() {
  const [active, setActive] = useState("All");
  const cats = ["All", ...categories];
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "start center"] });
  const headingX = useTransform(scrollYProgress, [0, 1], [-60, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="projects" ref={sectionRef} className="relative py-20 md:py-32 px-5 sm:px-6 md:px-10 section-fade">
      <div className="max-w-7xl mx-auto">
        {/* Heading with horizontal slide */}
        <motion.div style={{ x: headingX, opacity: headingOpacity }} className="mb-10 md:mb-14">
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl md:text-6xl font-bold tracking-tighter"
            >
              Selected work
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-text-muted mt-2 md:mt-3 text-sm max-w-md"
          >
            Test frameworks, automation platforms, and infrastructure that ensure quality ships at scale.
          </motion.p>
        </motion.div>

        {/* Filter */}
        <LayoutGroup>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {cats.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`relative px-4 py-2 text-xs rounded-full transition-colors duration-300 ${active === cat ? "text-white" : "text-text-muted hover:text-text"}`}
              >
                {active === cat && (
                  <motion.span layoutId="filter-bg" className="absolute inset-0 rounded-full bg-primary" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </motion.div>
        </LayoutGroup>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {filtered.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
