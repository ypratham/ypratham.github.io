import { Handle, Position, type NodeProps } from "@xyflow/react";

const typeColors: Record<string, string> = {
  job: "border-highlight bg-highlight-bg",
  project: "border-highlight/80 bg-highlight-bg",
  education: "border-highlight/80 bg-highlight-bg",
  milestone: "border-highlight bg-highlight-bg",
};

const handleClass = "!bg-highlight !border-highlight !w-1.5 !h-1.5";

export default function JourneyMilestoneNode({ data }: NodeProps) {
  const { title, description, period, type, current, connectedHandles = [] } = data as {
    title: string;
    description: string;
    period?: string;
    type: string;
    current?: boolean;
    connectedHandles?: string[];
  };

  const colorClass = typeColors[type] || "border-muted-foreground/40 bg-card";
  const has = (id: string) => connectedHandles.includes(id);

  const labelMap: Record<string, string> = {
    job: "ROLE",
    project: "PROJECT",
    education: "EDUCATION",
    milestone: "MILESTONE",
  };

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
        className={`border border-dashed ${colorClass} px-6 py-5 font-mono min-w-[230px] max-w-[270px] hover:border-highlight transition-colors ${
          current ? "ring-1 ring-highlight/40" : ""
        }`}
        style={{ boxShadow: "var(--node-shadow)" }}
      >
        <div className="flex items-center gap-2 mb-2.5">
          <span className="size-2 rounded-full bg-highlight shrink-0" />
          <span className="text-[9px] text-highlight uppercase tracking-[0.15em] font-bold">
            {labelMap[type] || "PROJECT"}
          </span>
          {current && (
            <span className="text-[8px] bg-highlight/20 text-highlight px-1.5 py-0.5 rounded-sm uppercase tracking-wider ml-auto">
              Current
            </span>
          )}
        </div>
        <p className="text-xs font-bold text-foreground leading-snug">{title}</p>
        <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">
          {description}
        </p>
        {period && (
          <p className="text-[10px] text-muted-foreground mt-2.5 font-mono">
            {period}
          </p>
        )}
      </div>
    </div>
  );
}
