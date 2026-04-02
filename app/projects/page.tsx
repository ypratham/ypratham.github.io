import { Badge } from "@/components/ui/badge";
import GridSection from "@/components/GridSection";
import GridBox from "@/components/GridBox";
import { PROJECTS } from "@/constants";
import { ArrowUpRight, Github } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects — Pratham Yadav",
  description: "Things I've built — real products, open-source tools, and client work.",
};

export default function ProjectsPage() {
  return (
    <>
      <section className="px-6">
        <div className="max-w-5xl mx-auto pt-24 pb-8">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-3">
            Projects
          </h1>
          <p className="text-muted-foreground leading-relaxed max-w-2xl">
            A mix of{" "}
            <span className="text-highlight bg-highlight/10 px-1">
              real products, open-source tools, and client work
            </span>
            .
          </p>
        </div>
      </section>

      <GridSection>
        <GridBox>
          <div className="grid grid-cols-1 md:grid-cols-2">
            {PROJECTS.map((project, i) => {
              const Wrapper = project.link ? "a" : "div";
              const linkProps = project.link
                ? { href: project.link, target: "_blank" as const, rel: "noopener noreferrer" }
                : {};

              return (
                <Wrapper
                  key={project.id}
                  {...linkProps}
                  className={`group block p-6 md:p-8 border-dashed transition-colors hover:bg-muted/50 ${
                    i % 2 === 0 ? "md:border-r border-border" : ""
                  } ${i < PROJECTS.length - 1 ? "border-b border-border" : ""}`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-lg">{project.title}</h3>
                    {project.link && (
                      <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 duration-200" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.map((t) => (
                      <Badge
                        key={t}
                        variant="outline"
                        className="text-[10px] font-normal rounded-sm"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{project.role}</span>
                    <span>&middot;</span>
                    <span>{project.duration}</span>
                  </div>
                  {project.link && (
                    <div className="flex gap-2 mt-4 pointer-events-none">
                      <span className="inline-flex items-center gap-1.5 border border-dashed border-border px-2.5 py-1 text-xs text-muted-foreground group-hover:text-foreground group-hover:border-foreground/30 transition-colors">
                        {project.link.includes("github") ? (
                          <>
                            <Github className="size-3" />
                            GitHub
                          </>
                        ) : (
                          <>
                            <ArrowUpRight className="size-3" />
                            View
                          </>
                        )}
                      </span>
                    </div>
                  )}
                </Wrapper>
              );
            })}
            {PROJECTS.length % 2 !== 0 && (
              <div className="hidden md:block" />
            )}
          </div>
        </GridBox>
      </GridSection>
    </>
  );
}
