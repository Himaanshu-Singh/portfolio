"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Mail, Github, Linkedin } from "lucide-react";
import { profile } from "@/data/profile";

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section id="contact" ref={ref} className="relative py-20 md:py-32 px-5 sm:px-6 md:px-10 section-fade">
      <div className="max-w-7xl mx-auto">
        <motion.div style={{ scale, opacity }} className="text-center max-w-2xl mx-auto">
          {/* Heading */}
          <div className="overflow-hidden mb-3">
            <motion.h2
              initial={{ y: "110%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter"
            >
              Let&apos;s work together
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-text-muted mb-10 leading-relaxed text-sm md:text-base"
          >
            Looking for a QA Automation Engineer who builds intelligent test systems?
            Let&apos;s discuss test strategy, automation architecture, or how I can help your team ship with confidence.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10"
          >
            <motion.a
              href={`mailto:${profile.email}`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group px-8 py-4 rounded-full bg-primary text-white font-medium text-sm hover:bg-primary-dark transition-colors inline-flex items-center gap-2 shadow-lg shadow-primary/15"
            >
              <Mail size={15} />
              Get in touch
              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.a>
            <motion.a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 rounded-full border border-surface-border text-text-muted text-sm hover:text-text hover:border-primary/30 transition-all inline-flex items-center gap-2"
            >
              <Linkedin size={14} />
              LinkedIn
            </motion.a>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-xs text-text-muted space-y-1"
          >
            <p>{profile.email}</p>
            <p>{profile.location}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
