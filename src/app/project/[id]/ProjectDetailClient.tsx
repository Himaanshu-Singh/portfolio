"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Youtube,
  FileText,
  Calendar,
  Users,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import type { Project } from "@/data/projects";
import ScrollProgress from "@/components/ScrollProgress";

const iconMap = { github: Github, external: ExternalLink, youtube: Youtube, docs: FileText };

export default function ProjectDetailClient({ project }: { project: Project }) {
  return (
    <div className="min-h-screen grain">
      <ScrollProgress />

      <header className="pt-24 pb-16 px-6 md:px-10 hero-bg">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <Link href="/#projects" className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-text transition-colors mb-10">
              <ArrowLeft size={12} /> Back
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className="text-[11px] text-primary/80 bg-primary/[0.06] px-2.5 py-1 rounded-full border border-primary/10">
                {project.category}
              </span>
              <span className="text-[11px] text-text-muted flex items-center gap-1">
                <Calendar size={10} /> {project.startDate} — {project.endDate || "Present"}
              </span>
              {project.teamSize && (
                <span className="text-[11px] text-text-muted flex items-center gap-1">
                  <Users size={10} /> {project.teamSize} people
                </span>
              )}
              <span className="text-[11px] text-text-muted">{project.role}</span>
            </div>

            <div className="overflow-hidden mb-3">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-3xl md:text-5xl font-bold tracking-tight"
              >
                {project.title}
              </motion.h1>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-text-muted/70 mb-8"
            >
              {project.tagline}
            </motion.p>

            <div className="flex flex-wrap gap-2">
              {project.links.map((link) => {
                const Icon = iconMap[link.icon];
                return (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 px-4 py-2 text-xs rounded-full border border-white/[0.06] bg-surface-light/60 hover:border-primary/20 transition-all"
                  >
                    <Icon size={12} /> {link.label}
                    <ArrowUpRight size={9} className="opacity-0 group-hover:opacity-100 text-primary transition-opacity" />
                  </a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 md:px-10 py-16 space-y-16">
        {/* Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          {project.metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="card p-5 text-center"
            >
              <div className="text-xl font-bold gradient-text">{m.value}</div>
              <div className="text-[11px] text-text-muted mt-1">{m.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Overview */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-xl font-semibold mb-4 tracking-tight">Overview</h2>
          <p className="text-[15px] text-text-muted/70 leading-relaxed">{project.longDescription}</p>
        </motion.div>

        {/* Tech */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-xl font-semibold mb-4 tracking-tight">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((t) => (
              <span key={t} className="text-[12px] px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.05] text-text-muted/80">
                {t}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Features */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-xl font-semibold mb-5 tracking-tight">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {project.features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="card p-5"
              >
                <h3 className="text-sm font-medium mb-1.5">{f.title}</h3>
                <p className="text-xs text-text-muted/60 leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Challenges + Learnings */}
        <div className="grid md:grid-cols-2 gap-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-xl font-semibold mb-4 tracking-tight">Challenges</h2>
            <ul className="space-y-3">
              {project.challenges.map((c, i) => (
                <li key={i} className="flex gap-2.5 text-sm text-text-muted/70 leading-relaxed">
                  <span className="text-accent shrink-0">→</span> {c}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-xl font-semibold mb-4 tracking-tight">Learnings</h2>
            <ul className="space-y-3">
              {project.learnings.map((l, i) => (
                <li key={i} className="flex gap-2.5 text-sm text-text-muted/70 leading-relaxed">
                  <span className="text-primary shrink-0">→</span> {l}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="pt-8 border-t border-white/[0.04]">
          <Link href="/#projects" className="text-xs text-text-muted hover:text-text transition-colors inline-flex items-center gap-1.5">
            <ArrowLeft size={12} /> All projects
          </Link>
        </div>
      </div>
    </div>
  );
}
