import { cn } from "@/lib/utils";

interface GridSectionProps {
  children: React.ReactNode;
  className?: string;
}

export default function GridSection({ children, className }: GridSectionProps) {
  return (
    <section className="relative px-6">
      {/* Top dashed divider with cross marks */}
      <div className="section-divider" />

      <div className={cn("max-w-5xl mx-auto py-16 relative", className)}>
        {children}
      </div>
    </section>
  );
}
