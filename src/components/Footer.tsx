import { profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="py-10 px-5 sm:px-6 md:px-10 border-t border-surface-border">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-text-muted">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <div className="flex gap-6">
          {Object.entries(profile.socials).map(([name, url]) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-text-muted hover:text-text transition-colors capitalize"
            >
              {name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
