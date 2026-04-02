import { Badge } from "@/components/ui/badge";
import GridSection from "@/components/GridSection";
import GridBox from "@/components/GridBox";
import { CERTIFICATES } from "@/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Achievements — Pratham Yadav",
  description: "Certificates, workshops, and hackathon participation.",
};

const CATEGORIES = [
  { id: "workshop", label: "SPEAKER AT" },
  { id: "hackathon", label: "Hackathons" },
  { id: "course", label: "Courses" },
] as const;

export default function AchievementsPage() {
  return (
    <>
      <section className="px-6">
        <div className="max-w-5xl mx-auto pt-24 pb-8">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-3">
            Achievements
          </h1>
          <p className="text-muted-foreground leading-relaxed max-w-2xl">
            Workshops conducted, hackathons participated in, and{" "}
            <span className="text-highlight bg-highlight/10 px-1">
              certifications earned
            </span>
            .
          </p>
        </div>
      </section>

      {CATEGORIES.map((category) => {
        const certs = CERTIFICATES.filter((c) => c.category === category.id);
        if (certs.length === 0) return null;

        return (
          <GridSection key={category.id}>
            <p className="text-xs text-muted-foreground uppercase tracking-[0.2em] mb-10">
              {category.label.toUpperCase()}
            </p>

            <GridBox>
              <div className="grid grid-cols-1 md:grid-cols-2">
                {certs.map((cert, i) => (
                  <div
                    key={cert.id}
                    className={`p-6 md:p-8 border-dashed ${
                      i % 2 === 0 ? "md:border-r border-border" : ""
                    } ${i < certs.length - 1 ? "border-b border-border" : ""}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-bold mb-1">{cert.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {cert.issuer}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className="text-[10px] rounded-sm shrink-0"
                      >
                        {cert.date}
                      </Badge>
                    </div>
                  </div>
                ))}
                {certs.length % 2 !== 0 && <div className="hidden md:block" />}
              </div>
            </GridBox>
          </GridSection>
        );
      })}

      {/* Summary */}
      <GridSection>
        <GridBox>
          <div className="grid grid-cols-3">
            <div className="p-6 text-center border-r border-dashed border-border">
              <span className="text-3xl font-bold">
                {CERTIFICATES.filter((c) => c.category === "workshop").length}
              </span>
              <p className="text-xs text-muted-foreground mt-1">Workshops</p>
            </div>
            <div className="p-6 text-center border-r border-dashed border-border">
              <span className="text-3xl font-bold">
                {CERTIFICATES.filter((c) => c.category === "hackathon").length}
              </span>
              <p className="text-xs text-muted-foreground mt-1">Hackathons</p>
            </div>
            <div className="p-6 text-center">
              <span className="text-3xl font-bold">
                {CERTIFICATES.filter((c) => c.category === "course").length}
              </span>
              <p className="text-xs text-muted-foreground mt-1">Courses</p>
            </div>
          </div>
        </GridBox>
      </GridSection>
    </>
  );
}
