"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/profile";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="py-10 px-5 sm:px-6 md:px-10 border-t border-surface-border">
      <div className="max-w-7xl mx-auto">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
          <div>
            <p className="text-sm font-semibold mb-1">{profile.name}</p>
            <p className="text-xs text-text-muted">{profile.title}</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-surface-border flex items-center justify-center text-text-muted hover:text-text hover:border-primary/30 transition-all"
              aria-label="GitHub"
            >
              <Github size={15} />
            </a>
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-surface-border flex items-center justify-center text-text-muted hover:text-text hover:border-primary/30 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin size={15} />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="w-9 h-9 rounded-full border border-surface-border flex items-center justify-center text-text-muted hover:text-text hover:border-primary/30 transition-all"
              aria-label="Email"
            >
              <Mail size={15} />
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-surface-border/50">
          <p className="text-[11px] text-text-muted">
            © {year} {profile.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#home" className="text-[11px] text-text-muted hover:text-text transition-colors">Home</a>
            <a href="#projects" className="text-[11px] text-text-muted hover:text-text transition-colors">Work</a>
            <a href="#skills" className="text-[11px] text-text-muted hover:text-text transition-colors">Skills</a>
            <a href="#experience" className="text-[11px] text-text-muted hover:text-text transition-colors">Experience</a>
            <a href="#contact" className="text-[11px] text-text-muted hover:text-text transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
