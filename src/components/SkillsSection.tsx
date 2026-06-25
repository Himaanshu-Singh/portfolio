"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { profile } from "@/data/profile";

const labels: Record<string, string> = {
  languages: "Languages",
  mobileTesting: "Mobile Testing",
  automation: "Automation",
  apiTesting: "API Testing",
  cicd: "CI/CD",
  performance: "Performance",
  databases: "Databases",
  tools: "Tools",
};

export default function SkillsSection() {
  const keys = Object.keys(profile.skills) as (keyof typeof profile.skills)[];
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const headingX = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const headingOp = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  return (
    <section id="skills" ref={ref} className="relative py-20 md:py-32 px-5 sm:px-6 md:px-10 section-fade">
      <div className="max-w-7xl mx-auto">
        <motion.div style={{ x: headingX, opacity: headingOp }} className="mb-10 md:mb-14">
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl md:text-6xl font-bold tracking-tighter"
            >
              Skills & arsenal
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-text-muted mt-2 md:mt-3 text-sm max-w-md"
          >
            The tools and technologies I use to build quality infrastructure.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {keys.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.06, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className="card p-5"
            >
              <h3 className="text-[12px] text-text-muted mb-3 font-medium">{labels[key]}</h3>
              <div className="flex flex-wrap gap-1.5">
                {profile.skills[key].map((skill, j) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.03 + j * 0.02, type: "spring", stiffness: 300, damping: 20 }}
                    className="text-[11px] px-2.5 py-1 rounded-full bg-surface-lighter/50 border border-surface-border text-text-muted hover:text-primary-light hover:border-primary/20 transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
