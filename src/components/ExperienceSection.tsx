"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { profile } from "@/data/profile";

export default function ExperienceSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const headingScale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const headingOp = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section id="experience" ref={ref} className="relative py-20 md:py-32 px-5 sm:px-6 md:px-10 section-fade">
      <div className="max-w-7xl mx-auto">
        <motion.div style={{ scale: headingScale, opacity: headingOp }} className="mb-10 md:mb-14">
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl md:text-6xl font-bold tracking-tighter"
            >
              Experience
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-text-muted mt-2 md:mt-3 text-sm"
          >
            Where I&apos;ve built quality culture and shipped automation infrastructure.
          </motion.p>
        </motion.div>

        <div className="space-y-4">
          {profile.experience.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="card p-5 md:p-7"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 mb-2">
                <div>
                  <h3 className="text-base md:text-lg font-semibold tracking-tight">{exp.role}</h3>
                  <p className="text-sm text-primary/70">{exp.company}, {exp.location}</p>
                </div>
                <span className="text-xs text-text-muted">{exp.period}</span>
              </div>
              <p className="text-sm text-text-muted/70 leading-relaxed mb-3">{exp.description}</p>

              {/* Highlights */}
              {exp.highlights && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {exp.highlights.map((h, j) => (
                    <motion.span
                      key={h}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + j * 0.05 }}
                      className="text-[11px] px-2.5 py-1 rounded-full bg-primary/[0.06] text-primary border border-primary/10"
                    >
                      {h}
                    </motion.span>
                  ))}
                </div>
              )}

              {/* Bullets */}
              {exp.bullets && (
                <ul className="space-y-1.5">
                  {exp.bullets.map((b, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + j * 0.04 }}
                      className="flex gap-2 text-xs text-text-muted/80 leading-relaxed"
                    >
                      <span className="text-primary shrink-0 mt-0.5">→</span>
                      {b}
                    </motion.li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10"
        >
          <p className="text-xs text-text-muted mb-3">Education</p>
          <div className="card p-5">
            <h3 className="text-sm font-semibold">{profile.education.degree}</h3>
            <p className="text-xs text-text-muted">{profile.education.institution}</p>
            <p className="text-xs text-text-muted mt-1">CGPA: {profile.education.cgpa} · {profile.education.year}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
