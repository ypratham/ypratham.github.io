import { Handle, Position, type NodeProps } from "@xyflow/react";

const typeStyles: Record<string, { dot: string; label: string }> = {
  education: { dot: "bg-blue-400", label: "EDUCATION" },
  course: { dot: "bg-purple-400", label: "COURSE" },
  achievement: { dot: "bg-amber-400", label: "ACHIEVEMENT" },
  project: { dot: "bg-highlight", label: "PROJECT" },
  milestone: { dot: "bg-highlight", label: "MILESTONE" },
};

const handleClass = "!bg-muted-foreground/50 !border-muted-foreground/50 !w-1.5 !h-1.5";

export default function JourneyEventNode({ data }: NodeProps) {
  const { title, description, type, connectedHandles = [] } = data as {
    title: string;
    description: string;
    type: string;
    connectedHandles?: string[];
  };

  const style = typeStyles[type] || typeStyles.milestone;
  const has = (id: string) => connectedHandles.includes(id);

  return (
    <div className="relative">
      {has("top") && <Handle type="target" position={Position.Top} id="top" className={handleClass} />}
      {has("bottom") && <Handle type="target" position={Position.Bottom} id="bottom" className={handleClass} />}
      {has("left") && <Handle type="target" position={Position.Left} id="left" className={handleClass} />}
      {has("right") && <Handle type="target" position={Position.Right} id="right" className={handleClass} />}

      {has("top-src") && <Handle type="source" position={Position.Top} id="top-src" className={handleClass} />}
      {has("bottom-src") && <Handle type="source" position={Position.Bottom} id="bottom-src" className={handleClass} />}
      {has("left-src") && <Handle type="source" position={Position.Left} id="left-src" className={handleClass} />}
      {has("right-src") && <Handle type="source" position={Position.Right} id="right-src" className={handleClass} />}

      <div
        className="border border-dashed border-muted-foreground/40 bg-card px-6 py-5 font-mono min-w-[210px] max-w-[250px] hover:border-muted-foreground/60 transition-colors"
        style={{ boxShadow: "var(--node-shadow)" }}
      >
        <div className="flex items-center gap-2 mb-2.5">
          <span className={`size-1.5 rounded-full ${style.dot} shrink-0`} />
          <span className="text-[9px] text-muted-foreground uppercase tracking-[0.15em]">
            {style.label}
          </span>
        </div>
        <p className="text-xs font-bold text-foreground leading-snug">{title}</p>
        <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
