import Link from "next/link";
import { PROFILE } from "@/constants";

export default function Footer() {
  return (
    <footer className="px-6 border-t border-dashed border-border">
      <div className="max-w-5xl mx-auto py-12 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8">
        <div className="space-y-3">
          <Link href="/" className="font-mono font-bold text-lg text-foreground">
            Pratham
          </Link>
          <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
            {PROFILE.bio}
          </p>
          <div className="flex gap-3 pt-1">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              GitHub
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${PROFILE.email}`}
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Email
            </a>
          </div>
        </div>

        <nav className="space-y-2">
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">
            Pages
          </p>
          <div className="flex flex-col gap-1">
            <Link
              href="/projects"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Projects
            </Link>
            <Link
              href="/experience"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Experience
            </Link>
            <Link
              href="/achievements"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Achievements
            </Link>
          </div>
        </nav>
      </div>
      <div className="max-w-5xl mx-auto border-t border-dashed border-border py-6 text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
      </div>
    </footer>
  );
}
