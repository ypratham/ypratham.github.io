import { Handle, Position, type NodeProps } from "@xyflow/react";

const hSpine = "!bg-muted-foreground !border-muted-foreground !w-2 !h-2";
const hBranch = "!bg-muted-foreground !border-muted-foreground !w-1.5 !h-1.5";

export default function JourneyYearNode({ data }: NodeProps) {
  const { year, current, connectedHandles = [] } = data as {
    year: string;
    current?: boolean;
    connectedHandles?: string[];
  };

  const has = (id: string) => connectedHandles.includes(id);

  return (
    <div className="relative">
      {has("left") && <Handle type="target" position={Position.Left} id="left" className={hSpine} />}
      {has("right") && <Handle type="source" position={Position.Right} id="right" className={hSpine} />}
      {has("top") && <Handle type="source" position={Position.Top} id="top" className={hBranch} />}
      {has("bottom") && <Handle type="source" position={Position.Bottom} id="bottom" className={hBranch} />}

      <div
        className={`font-mono text-center px-6 py-3 border border-dashed select-none transition-colors ${
          current
            ? "border-highlight bg-highlight-bg text-highlight"
            : "border-muted-foreground/40 bg-card text-foreground"
        }`}
        style={{ boxShadow: "var(--node-shadow)" }}
      >
        <span className="text-sm font-bold tracking-widest">{year}</span>
      </div>
    </div>
  );
}
