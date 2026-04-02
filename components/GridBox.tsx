import { cn } from "@/lib/utils";

interface GridBoxProps {
  children: React.ReactNode;
  className?: string;
}

function Cross({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "pointer-events-none absolute z-30 flex size-5 items-center justify-center",
        className
      )}
      aria-hidden="true"
    >
      <svg
        className="size-5 shrink-0 stroke-muted-foreground/40"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M5 12h14" />
        <path d="M12 5v14" />
      </svg>
    </span>
  );
}

export { Cross };

export default function GridBox({ children, className }: GridBoxProps) {
  return (
    <div className={cn("relative", className)}>
      <Cross className="top-0 left-0 -translate-x-[calc(50%-0.5px)] -translate-y-[calc(50%-0.5px)]" />
      <Cross className="top-0 right-0 translate-x-[calc(50%-0.5px)] -translate-y-[calc(50%-0.5px)]" />
      <Cross className="bottom-0 left-0 -translate-x-[calc(50%-0.5px)] translate-y-[calc(50%-0.5px)]" />
      <Cross className="bottom-0 right-0 translate-x-[calc(50%-0.5px)] translate-y-[calc(50%-0.5px)]" />
      <div className="border border-dashed border-border">{children}</div>
    </div>
  );
}
