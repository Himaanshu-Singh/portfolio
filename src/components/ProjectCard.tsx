"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/data/projects";

interface Props {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0, -1]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <Link href={`/project/${project.id}`} className="group block">
        <motion.article
          style={{ y, rotateX: rotate }}
          className="card p-7 shine will-change-transform"
        >
          {/* Top */}
          <div className="flex items-center justify-between mb-5">
            <span className="text-[11px] text-primary bg-primary/[0.06] px-2.5 py-1 rounded-full border border-primary/10">
              {project.category}
            </span>
            <div className="w-8 h-8 rounded-full border border-surface-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:border-primary/30 group-hover:scale-110">
              <ArrowUpRight size={13} className="text-primary" />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-2 group-hover:text-primary-light transition-colors duration-500">
            {project.title}
          </h3>
          <p className="text-sm text-text-muted/60 leading-relaxed mb-6">{project.tagline}</p>

          {/* Metrics with stagger */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            {project.metrics.slice(0, 4).map((m) => (
              <div key={m.label} className="rounded-xl bg-surface-lighter/50 border border-surface-border px-3 py-2.5 group-hover:border-primary/20 transition-colors duration-500">
                <div className="text-base font-semibold">{m.value}</div>
                <div className="text-[10px] text-text-muted">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Tech */}
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 5).map((t, i) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.03 }}
                className="text-[11px] px-2.5 py-0.5 rounded-full bg-surface-lighter/50 text-text-muted group-hover:text-text transition-colors duration-300"
              >
                {t}
              </motion.span>
            ))}
            {project.techStack.length > 5 && (
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-surface-lighter/50 text-text-muted">
                +{project.techStack.length - 5}
              </span>
            )}
          </div>
        </motion.article>
      </Link>
    </motion.div>
  );
}
