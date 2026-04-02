import { Badge } from "@/components/ui/badge";
import SkillIcon from "@/components/SkillIcon";
import GridSection from "@/components/GridSection";
import GridBox from "@/components/GridBox";
import { EXPERIENCE, SKILLS, PROFILE } from "@/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience — Pratham Yadav",
  description: "Professional experience, projects, and technical expertise.",
};

export default function ExperiencePage() {
  return (
    <>
      <section className="px-6">
        <div className="max-w-5xl mx-auto pt-24 pb-8">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-3">
            Experience
          </h1>
          <p className="text-muted-foreground leading-relaxed max-w-2xl">
            Professional experience, projects, and{" "}
            <span className="text-highlight bg-highlight/10 px-1">
              technical expertise
            </span>
            .
          </p>
        </div>
      </section>

      {/* Work Experience */}
      <GridSection>
        <p className="text-xs text-muted-foreground uppercase tracking-[0.2em] mb-10">
          WORK HISTORY
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
              <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 md:gap-8">
                <div>
                  <span className="text-xs text-muted-foreground font-mono">
                    {exp.period}
                  </span>
                  <div className="text-xs text-muted-foreground mt-1">
                    {exp.location}
                  </div>
                </div>
                <div>
                  <div className="flex items-baseline gap-2 flex-wrap mb-2">
                    <h3 className="font-bold">{exp.role}</h3>
                    <span className="text-muted-foreground text-sm">
                      at {exp.company}
                    </span>
                    <Badge
                      variant="outline"
                      className="text-[10px] rounded-sm"
                    >
                      {exp.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                    {exp.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </GridBox>
      </GridSection>

      {/* Skills with Icons */}
      <GridSection>
        <p className="text-xs text-muted-foreground uppercase tracking-[0.2em] mb-10">
          TECHNICAL SKILLS
        </p>

        <GridBox>
          <div className="grid grid-cols-1 md:grid-cols-3">
            {SKILLS.map((category, ci) => (
              <div
                key={ci}
                className={`p-6 md:p-8 border-dashed ${
                  ci < SKILLS.length - 1
                    ? "border-b md:border-b-0 md:border-r border-border"
                    : ""
                }`}
              >
                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-5">
                  {category.name}
                </h3>
                <div className="space-y-3">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center gap-3 text-sm"
                    >
                      {skill.icon && (
                        <SkillIcon icon={skill.icon} name={skill.name} size={20} />
                      )}
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </GridBox>

        <p className="text-muted-foreground mt-8 leading-relaxed max-w-2xl">
          Not loyal to tools &mdash; only to good outcomes. If something feels
          repetitive or inefficient, I&apos;ll experiment until it doesn&apos;t.
        </p>
      </GridSection>

      {/* Stats */}
      <GridSection>
        <GridBox>
          <div className="grid grid-cols-2 md:grid-cols-4">
            <div className="p-6 text-center border-r border-dashed border-border">
              <span className="text-3xl font-bold">{PROFILE.yearsOfExperience}+</span>
              <p className="text-xs text-muted-foreground mt-1">Years Experience</p>
            </div>
            <div className="p-6 text-center md:border-r border-dashed border-border">
              <span className="text-3xl font-bold">50+</span>
              <p className="text-xs text-muted-foreground mt-1">Projects</p>
            </div>
            <div className="p-6 text-center border-r border-t md:border-t-0 border-dashed border-border">
              <span className="text-3xl font-bold">3</span>
              <p className="text-xs text-muted-foreground mt-1">Companies</p>
            </div>
            <div className="p-6 text-center border-t md:border-t-0 border-dashed border-border">
              <span className="text-3xl font-bold">1M+</span>
              <p className="text-xs text-muted-foreground mt-1">Daily Impressions</p>
            </div>
          </div>
        </GridBox>
      </GridSection>
    </>
  );
}
