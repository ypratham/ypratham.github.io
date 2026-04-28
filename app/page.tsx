import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import GridSection from "@/components/GridSection";
import GridBox from "@/components/GridBox";
import { PROFILE, SKILLS, PROJECTS, EXPERIENCE } from "@/constants";
import SkillIcon from "@/components/SkillIcon";
import { ArrowUpRight, FileText, Mail } from "lucide-react";

export default function Home() {
  const topSkills = SKILLS.flatMap((cat) => cat.skills)
    .sort((a, b) => b.level - a.level)
    .slice(0, 8);

  return (
    <>
      {/* Hero */}
      <section className="px-6">
        <div className="max-w-5xl mx-auto pt-24 pb-16">
          <p className="text-xs text-muted-foreground uppercase tracking-[0.2em] mb-6">
            WHO AM I?
          </p>

          <GridBox className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-center">
              <div className="p-8 md:p-10 order-2 md:order-1">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-3">
                  {PROFILE.name}
                </h1>
                <p className="text-muted-foreground text-lg mb-4">
                  {PROFILE.role}
                </p>
                <p className="text-muted-foreground leading-relaxed max-w-xl mb-6">
                  I build{" "}
                  <span className="text-highlight bg-highlight/10 px-1">
                    pixel-perfect interfaces, scalable applications, and
                    full-stack products
                  </span>{" "}
                  &mdash; shipping fast without cutting corners.
                </p>

                <div className="flex gap-3">
                  <Button variant="outline" size="sm" asChild>
                    <a href={`mailto:${PROFILE.email}`}>
                      <Mail data-icon="inline-start" className="size-4" />
                      Contact
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/experience">
                      <FileText data-icon="inline-start" className="size-4" />
                      Resume
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="relative order-1 md:order-2 overflow-hidden border-b md:border-b-0 md:border-l border-dashed border-border">
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 65%, color-mix(in oklab, var(--highlight) 12%, transparent) 0%, transparent 60%)",
                  }}
                />
                <div className="relative w-full aspect-square md:w-72 lg:w-80 mx-auto">
                  <Image
                    src="/Pratham 3D.png"
                    alt="Pratham Yadav 3D avatar"
                    fill
                    sizes="(min-width: 1024px) 320px, (min-width: 768px) 288px, 100vw"
                    className="object-contain p-6"
                    priority
                  />
                </div>
              </div>
            </div>
          </GridBox>
        </div>
      </section>

      {/* Skills / Ecosystem */}
      <GridSection>
        <p className="text-xs text-muted-foreground uppercase tracking-[0.2em] mb-10">
          ECOSYSTEM
        </p>

        <GridBox>
          <div className="grid grid-cols-2 md:grid-cols-4">
            {topSkills.map((skill, i) => (
              <div
                key={skill.name}
                className={`p-6 flex flex-col items-center gap-3 border-dashed ${
                  i % 4 !== 3 ? "border-r border-border" : ""
                } ${i < 4 ? "border-b border-border" : ""}`}
              >
                {skill.icon && (
                  <SkillIcon icon={skill.icon} name={skill.name} size={40} />
                )}
                <span className="text-xs text-muted-foreground text-center">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </GridBox>

        <p className="text-muted-foreground mt-8 leading-relaxed max-w-2xl">
          Not loyal to tools &mdash; only to good outcomes. If something feels
          repetitive or inefficient, I&apos;ll experiment until it doesn&apos;t.
        </p>
      </GridSection>

      {/* Projects Preview */}
      <GridSection>
        <p className="text-xs text-muted-foreground uppercase tracking-[0.2em] mb-4">
          THINGS I&apos;VE BUILT
        </p>
        <p className="text-muted-foreground mb-10 leading-relaxed max-w-2xl">
          A mix of{" "}
          <span className="text-highlight bg-highlight/10 px-1">
            real products, open-source tools, and client work
          </span>
          .
        </p>

        <GridBox>
          <div className="grid grid-cols-1 md:grid-cols-2">
            {PROJECTS.slice(0, 4).map((project, i) => {
              const Wrapper = project.link ? "a" : "div";
              const linkProps = project.link
                ? {
                    href: project.link,
                    target: "_blank" as const,
                    rel: "noopener noreferrer",
                  }
                : {};

              return (
                <Wrapper
                  key={project.id}
                  {...linkProps}
                  className={`group block p-6 md:p-8 border-dashed transition-colors hover:bg-muted/50 ${
                    i % 2 === 0 ? "md:border-r border-border" : ""
                  } ${i < 2 ? "border-b border-border" : ""}`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold">{project.title}</h3>
                    {project.link && (
                      <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 duration-200" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
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
                </Wrapper>
              );
            })}
          </div>
        </GridBox>

        <div className="flex justify-center mt-8">
          <Button variant="outline" size="sm" asChild>
            <Link href="/projects">
              View all projects
              <ArrowUpRight data-icon="inline-end" className="size-3" />
            </Link>
          </Button>
        </div>
      </GridSection>

      {/* Experience Preview */}
      <GridSection>
        <p className="text-xs text-muted-foreground uppercase tracking-[0.2em] mb-4">
          WHERE I&apos;VE WORKED
        </p>

        <GridBox>
          {EXPERIENCE.map((exp, i) => (
            <div
              key={exp.id}
              className={`p-6 md:p-8 ${
                i < EXPERIENCE.length - 1
                  ? "border-b border-dashed border-border"
                  : ""
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 mb-2">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <h3 className="font-bold">{exp.role}</h3>
                  <span className="text-muted-foreground text-sm">
                    at {exp.company}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground font-mono shrink-0">
                  {exp.period}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
                {exp.description}
              </p>
            </div>
          ))}
        </GridBox>

        <div className="flex justify-center mt-8">
          <Button variant="outline" size="sm" asChild>
            <Link href="/experience">
              View full experience
              <ArrowUpRight data-icon="inline-end" className="size-3" />
            </Link>
          </Button>
        </div>
      </GridSection>

      {/* Contact */}
      <GridSection>
        <p className="text-xs text-muted-foreground uppercase tracking-[0.2em] mb-4">
          CONTACT
        </p>

        <GridBox>
          <div className="p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Let&apos;s Build Something
            </h2>
            <p className="text-muted-foreground max-w-xl leading-relaxed mb-6">
              If you&apos;re working on something ambitious and need a frontend
              engineer who prefers{" "}
              <span className="text-highlight bg-highlight/10 px-1">
                clarity over chaos
              </span>
              , we&apos;ll probably get along.
            </p>
            <p className="text-muted-foreground text-sm mb-6">
              Open to full-time roles, contracts, and collaborations.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" asChild>
                <a href={`mailto:${PROFILE.email}`}>
                  <Mail data-icon="inline-start" className="size-4" />
                  {PROFILE.email}
                </a>
              </Button>
            </div>
          </div>
        </GridBox>
      </GridSection>
    </>
  );
}
