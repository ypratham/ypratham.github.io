import { type NodeProps } from "@xyflow/react";

export default function SectionLabelNode({ data }: NodeProps) {
  const { label } = data as { label: string };

  return (
    <div className="font-mono select-none pointer-events-none">
      <p className="text-xs text-muted-foreground uppercase tracking-[0.25em] font-bold">
        {label}
      </p>
      <div className="mt-2 w-12 h-px bg-highlight/50" />
    </div>
  );
}
