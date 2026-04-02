"use client";

import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  useReactFlow,
  type Node,
  type Edge,
  type Connection,
  useNodesState,
  useEdgesState,
  type NodeTypes,
  ConnectionLineType,
  reconnectEdge,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useTheme } from "next-themes";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Square,
  RotateCcw,
} from "lucide-react";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import JourneyYearNode from "./nodes/JourneyYearNode";
import JourneyEventNode from "./nodes/JourneyEventNode";
import JourneyMilestoneNode from "./nodes/JourneyMilestoneNode";
import SectionLabelNode from "./nodes/SectionLabelNode";

const nodeTypes: NodeTypes = {
  journeyYear: JourneyYearNode,
  journeyEvent: JourneyEventNode,
  journeyMilestone: JourneyMilestoneNode,
  sectionLabel: SectionLabelNode,
};

/* ─── Tour stops ─── */
const TOUR_STOPS = [
  { yearId: "y-2019", label: "2019", events: ["j-10th"] },
  { yearId: "y-2020", label: "2020", events: ["j-diploma-start"] },
  { yearId: "y-2021", label: "2021", events: ["j-bootcamp"] },
  { yearId: "y-2022", label: "2022", events: ["j-innovacio"] },
  {
    yearId: "y-2023",
    label: "2023",
    events: ["j-diploma-done", "j-btech-start", "j-sih-23"],
  },
  {
    yearId: "y-2024",
    label: "2024",
    events: ["j-workshops", "j-sih-24", "j-hack-org", "j-oss", "j-altarium"],
  },
  {
    yearId: "y-2025",
    label: "2025",
    events: [
      "j-btech-done",
      "j-surfaced",
      "j-moonshot",
      "j-agency-dir",
      "j-jobboard",
      "j-product-dir",
    ],
  },
  { yearId: "y-now", label: "NOW", events: ["j-now"] },
];

/* ─── Default nodes (positions baked from layout editor) ─── */

const defaultNodes: Node[] = [
  {
    id: "label",
    type: "sectionLabel",
    position: { x: -10, y: 340 },
    data: { label: "THE JOURNEY" },
  },

  // 2019
  {
    id: "y-2019",
    type: "journeyYear",
    position: { x: 0, y: 400 },
    data: { year: "2019" },
  },
  {
    id: "j-10th",
    type: "journeyEvent",
    position: { x: 100, y: 540 },
    data: {
      title: "Completed 10th",
      description: "Finished secondary school education",
      type: "education",
    },
  },

  // 2020
  {
    id: "y-2020",
    type: "journeyYear",
    position: { x: 550, y: 400 },
    data: { year: "2020" },
  },
  {
    id: "j-diploma-start",
    type: "journeyMilestone",
    position: { x: 700, y: 220 },
    data: {
      title: "Diploma in Computer Science",
      description:
        "Started 3-year diploma at Pillai College of Engineering and Polytechnic",
      type: "education",
    },
  },

  // 2021
  {
    id: "y-2021",
    type: "journeyYear",
    position: { x: 1100, y: 400 },
    data: { year: "2021" },
  },
  {
    id: "j-bootcamp",
    type: "journeyEvent",
    position: { x: 1080, y: 520 },
    data: {
      title: "Web Development Bootcamp",
      description: "Udemy — First deep-dive into full-stack web development",
      type: "course",
    },
  },

  // 2022
  {
    id: "y-2022",
    type: "journeyYear",
    position: { x: 1650, y: 400 },
    data: { year: "2022" },
  },
  {
    id: "j-innovacio",
    type: "journeyMilestone",
    position: { x: 1560, y: 140 },
    data: {
      title: "Innovacio Technologies",
      description:
        "Frontend Developer — Kolkata, IN. Built client projects end-to-end as sole frontend dev.",
      period: "Feb 2022 – Oct 2025",
      type: "job",
    },
  },

  // 2023
  {
    id: "y-2023",
    type: "journeyYear",
    position: { x: 2200, y: 400 },
    data: { year: "2023" },
  },
  {
    id: "j-diploma-done",
    type: "journeyEvent",
    position: { x: 2120, y: 160 },
    data: {
      title: "Diploma Completed",
      description: "3-year diploma in Computer Science — Pillai Polytechnic",
      type: "education",
    },
  },
  {
    id: "j-btech-start",
    type: "journeyMilestone",
    position: { x: 2360, y: 540 },
    data: {
      title: "B.Tech in Computer Science",
      description: "Started at Pillai College of Engineering (lateral entry)",
      type: "education",
    },
  },
  {
    id: "j-sih-23",
    type: "journeyEvent",
    position: { x: 1980, y: 640 },
    data: {
      title: "Smart India Hackathon",
      description: "Participated — National-level hackathon",
      type: "achievement",
    },
  },

  // 2024
  {
    id: "y-2024",
    type: "journeyYear",
    position: { x: 2750, y: 400 },
    data: { year: "2024" },
  },
  {
    id: "j-workshops",
    type: "journeyEvent",
    position: { x: 2820, y: 980 },
    data: {
      title: "4 Workshops Attended",
      description: "AR/VR with JS, Backend, Git & Github, Prompt Engineering",
      type: "course",
    },
  },
  {
    id: "j-sih-24",
    type: "journeyEvent",
    position: { x: 2580, y: 880 },
    data: {
      title: "Smart India Hackathon",
      description: "Participated — Second year",
      type: "achievement",
    },
  },
  {
    id: "j-hack-org",
    type: "journeyEvent",
    position: { x: 2520, y: 160 },
    data: {
      title: "Hackathon Organizer",
      description: "Organized a hackathon at Pillai College of Engineering",
      type: "achievement",
    },
  },
  {
    id: "j-oss",
    type: "journeyEvent",
    position: { x: 2740, y: 0 },
    data: {
      title: "Open Source Projects",
      description:
        "NexaSub — subscription manager. Invoice Generator for Hacktoberfest 2024.",
      type: "project",
    },
  },
  {
    id: "j-altarium",
    type: "journeyMilestone",
    position: { x: 3020, y: 160 },
    data: {
      title: "Altarium Technologies",
      description:
        "Software Engineer (Contract) — Delhi, IN. Clients: Amazon, MortgageFinder.",
      period: "Dec 2024 – Apr 2025",
      type: "job",
    },
  },

  // 2025
  {
    id: "y-2025",
    type: "journeyYear",
    position: { x: 3300, y: 400 },
    data: { year: "2025" },
  },
  {
    id: "j-btech-done",
    type: "journeyEvent",
    position: { x: 3000, y: 520 },
    data: {
      title: "B.Tech Completed",
      description:
        "Final year project: Unbabel — speech-to-speech translation app with React Native",
      type: "education",
    },
  },
  {
    id: "j-surfaced",
    type: "journeyEvent",
    position: { x: 3380, y: 560 },
    data: {
      title: "Built Surfaced",
      description:
        "AI-powered SEO engine for ChatGPT, Perplexity & AI Overviews.",
      type: "project",
    },
  },
  {
    id: "j-moonshot",
    type: "journeyMilestone",
    position: { x: 3140, y: 740 },
    data: {
      title: "Moonshot Technologies",
      description:
        "Full Stack Developer — Goa, IN. Directories, ad systems, and shipping fast.",
      period: "June 2025 – Present",
      type: "job",
      current: true,
    },
  },
  {
    id: "j-agency-dir",
    type: "journeyEvent",
    position: { x: 3380, y: -80 },
    data: {
      title: "Agency Directory",
      description:
        "40k+ pages of marketing agencies — scraped, structured, and served at scale.",
      type: "project",
    },
  },
  {
    id: "j-jobboard",
    type: "journeyEvent",
    position: { x: 3380, y: 80 },
    data: {
      title: "Job Board",
      description:
        "40k+ page marketing job board — programmatic SEO meets clean UX.",
      type: "project",
    },
  },
  {
    id: "j-product-dir",
    type: "journeyEvent",
    position: { x: 3380, y: 220 },
    data: {
      title: "Product Directory",
      description:
        "Curated directory of marketing tools — filterable, searchable, SEO-ready.",
      type: "project",
    },
  },

  // NOW
  {
    id: "y-now",
    type: "journeyYear",
    position: { x: 4200, y: 400 },
    data: { year: "NOW", current: true },
  },
  {
    id: "j-now",
    type: "journeyMilestone",
    position: { x: 4180, y: 180 },
    data: {
      title: "Building & Shipping",
      description:
        "Directories, ad systems, and features at scale. Planning, measuring, iterating.",
      type: "milestone",
      current: true,
    },
  },
];

/* ─── Default edges ─── */

const spineStyle = {
  stroke: "var(--foreground)",
  strokeWidth: 2,
  opacity: 0.4,
};
const branch = {
  stroke: "var(--foreground)",
  strokeWidth: 1.5,
  strokeDasharray: "5 4",
  opacity: 0.25,
};
const accentStyle = {
  stroke: "var(--highlight)",
  strokeWidth: 2,
  opacity: 0.9,
};
const accentAnim = { stroke: "var(--highlight)", strokeWidth: 2 };

const defaultEdges: Edge[] = [
  // Spine
  {
    id: "s-19-20",
    source: "y-2019",
    sourceHandle: "right",
    target: "y-2020",
    targetHandle: "left",
    type: "smoothstep",
    style: spineStyle,
  },
  {
    id: "s-20-21",
    source: "y-2020",
    sourceHandle: "right",
    target: "y-2021",
    targetHandle: "left",
    type: "smoothstep",
    style: spineStyle,
  },
  {
    id: "s-21-22",
    source: "y-2021",
    sourceHandle: "right",
    target: "y-2022",
    targetHandle: "left",
    type: "smoothstep",
    style: spineStyle,
  },
  {
    id: "s-22-23",
    source: "y-2022",
    sourceHandle: "right",
    target: "y-2023",
    targetHandle: "left",
    type: "smoothstep",
    style: spineStyle,
  },
  {
    id: "s-23-24",
    source: "y-2023",
    sourceHandle: "right",
    target: "y-2024",
    targetHandle: "left",
    type: "smoothstep",
    style: spineStyle,
  },
  {
    id: "s-24-25",
    source: "y-2024",
    sourceHandle: "right",
    target: "y-2025",
    targetHandle: "left",
    type: "smoothstep",
    style: spineStyle,
  },
  {
    id: "s-25-now",
    source: "y-2025",
    sourceHandle: "right",
    target: "y-now",
    targetHandle: "left",
    type: "smoothstep",
    animated: true,
    style: accentAnim,
  },

  // 2019 branches
  {
    id: "b-19-10th",
    source: "y-2019",
    sourceHandle: "bottom",
    target: "j-10th",
    targetHandle: "top",
    type: "smoothstep",
    style: branch,
  },

  // 2020 branches
  {
    id: "b-20-dip",
    source: "y-2020",
    sourceHandle: "top",
    target: "j-diploma-start",
    targetHandle: "left",
    type: "smoothstep",
    style: branch,
  },

  // 2021 branches
  {
    id: "b-21-boot",
    source: "y-2021",
    sourceHandle: "bottom",
    target: "j-bootcamp",
    targetHandle: "top",
    type: "smoothstep",
    style: branch,
  },

  // 2022 branches
  {
    id: "b-22-inno",
    source: "y-2022",
    sourceHandle: "top",
    target: "j-innovacio",
    targetHandle: "bottom",
    type: "smoothstep",
    style: accentAnim,
  },

  // 2023 branches
  {
    id: "b-23-dipdone",
    source: "y-2023",
    sourceHandle: "top",
    target: "j-diploma-done",
    targetHandle: "bottom",
    type: "smoothstep",
    style: accentAnim,
  },
  {
    id: "b-23-btech",
    source: "y-2023",
    sourceHandle: "bottom",
    target: "j-btech-start",
    targetHandle: "top",
    type: "smoothstep",
    style: branch,
  },
  {
    id: "b-23-sih",
    source: "y-2023",
    sourceHandle: "bottom",
    target: "j-sih-23",
    targetHandle: "top",
    type: "smoothstep",
    style: branch,
  },

  // 2024 branches
  {
    id: "b-24-ws",
    source: "y-2024",
    sourceHandle: "bottom",
    target: "j-workshops",
    targetHandle: "top",
    type: "smoothstep",
    style: branch,
  },
  {
    id: "b-24-sih",
    source: "y-2024",
    sourceHandle: "bottom",
    target: "j-sih-24",
    targetHandle: "top",
    type: "smoothstep",
    style: branch,
  },
  {
    id: "b-24-org",
    source: "y-2024",
    sourceHandle: "top",
    target: "j-hack-org",
    targetHandle: "bottom",
    type: "smoothstep",
    style: branch,
  },
  {
    id: "b-24-oss",
    source: "y-2024",
    sourceHandle: "top",
    target: "j-oss",
    targetHandle: "bottom",
    type: "smoothstep",
    style: branch,
  },
  {
    id: "b-24-alt",
    source: "y-2024",
    sourceHandle: "top",
    target: "j-altarium",
    targetHandle: "bottom",
    type: "smoothstep",
    style: accentStyle,
  },

  // 2025 branches
  {
    id: "b-25-btech",
    source: "y-2025",
    sourceHandle: "bottom",
    target: "j-btech-done",
    targetHandle: "top",
    type: "smoothstep",
    style: branch,
  },
  {
    id: "b-25-surf",
    source: "y-2025",
    sourceHandle: "bottom",
    target: "j-surfaced",
    targetHandle: "top",
    type: "smoothstep",
    style: branch,
  },
  {
    id: "b-25-moon",
    source: "y-2025",
    sourceHandle: "bottom",
    target: "j-moonshot",
    targetHandle: "top",
    type: "smoothstep",
    animated: true,
    style: accentAnim,
  },
  {
    id: "b-25-agency",
    source: "y-2025",
    sourceHandle: "top",
    target: "j-agency-dir",
    targetHandle: "bottom",
    type: "smoothstep",
    style: branch,
  },
  {
    id: "b-25-jobboard",
    source: "y-2025",
    sourceHandle: "top",
    target: "j-jobboard",
    targetHandle: "bottom",
    type: "smoothstep",
    style: branch,
  },
  {
    id: "b-25-proddir",
    source: "y-2025",
    sourceHandle: "top",
    target: "j-product-dir",
    targetHandle: "bottom",
    type: "smoothstep",
    style: branch,
  },

  // NOW
  {
    id: "b-now",
    source: "y-now",
    sourceHandle: "top",
    target: "j-now",
    targetHandle: "bottom",
    type: "smoothstep",
    animated: true,
    style: accentAnim,
  },
];

/* ─── Saved data types ─── */

type SavedPositions = Record<string, { x: number; y: number }>;
type SavedEdge = {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string | null;
  targetHandle?: string | null;
  type?: string;
  animated?: boolean;
  style?: Record<string, unknown>;
};
type SavedData = { positions: SavedPositions; edges: SavedEdge[] | null };

function applyPositions(nodes: Node[], saved: SavedPositions): Node[] {
  return nodes.map((node) => {
    const pos = saved[node.id];
    return pos ? { ...node, position: pos } : node;
  });
}

/** Build a map of nodeId → Set of connected handle IDs from edges */
function buildConnectedHandles(edges: Edge[]): Record<string, Set<string>> {
  const map: Record<string, Set<string>> = {};
  for (const e of edges) {
    if (e.sourceHandle) {
      if (!map[e.source]) map[e.source] = new Set();
      map[e.source].add(e.sourceHandle);
    }
    if (e.targetHandle) {
      if (!map[e.target]) map[e.target] = new Set();
      map[e.target].add(e.targetHandle);
    }
  }
  return map;
}

function applyConnectedHandles(nodes: Node[], edges: Edge[]): Node[] {
  const handleMap = buildConnectedHandles(edges);
  return nodes.map((node) => ({
    ...node,
    data: {
      ...node.data,
      connectedHandles: handleMap[node.id] ? [...handleMap[node.id]] : [],
    },
  }));
}

/* ═══════════════════════════════════════════
   FLOW INNER
   ═══════════════════════════════════════════ */

function FlowInner() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted ? resolvedTheme === "dark" : false;
  const colorMode = useMemo(
    () => (isDark ? ("dark" as const) : ("light" as const)),
    [isDark],
  );
  const { fitBounds, getNode, getNodes, getEdges } = useReactFlow();

  const [nodes, setNodes, onNodesChange] = useNodesState(
    applyConnectedHandles(defaultNodes, defaultEdges),
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(defaultEdges);

  const [editMode, setEditMode] = useState(false);
  const [tourIndex, setTourIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">(
    "idle",
  );
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const edgeReconnectSuccessful = useRef(true);

  // Load saved layout on mount
  useEffect(() => {
    fetch("/api/save-positions")
      .then((res) => res.json())
      .then((saved: SavedData) => {
        const savedEdges =
          saved.edges && saved.edges.length > 0
            ? (saved.edges as Edge[])
            : defaultEdges;
        if (saved.positions && Object.keys(saved.positions).length > 0) {
          setNodes((nds) =>
            applyConnectedHandles(
              applyPositions(nds, saved.positions),
              savedEdges,
            ),
          );
        }
        if (saved.edges && saved.edges.length > 0) {
          setEdges(savedEdges);
        }
      })
      .catch(() => {});
  }, [setNodes, setEdges]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Nodes are always draggable; edit mode only gates edge/connection editing

  // ── Edge editing (only active in edit mode) ──
  const onReconnectStart = useCallback(() => {
    edgeReconnectSuccessful.current = false;
  }, []);

  const onReconnect = useCallback(
    (oldEdge: Edge, newConnection: Connection) => {
      edgeReconnectSuccessful.current = true;
      setEdges((els) => reconnectEdge(oldEdge, newConnection, els));
    },
    [setEdges],
  );

  const onReconnectEnd = useCallback(
    (_: unknown, edge: Edge) => {
      if (!edgeReconnectSuccessful.current) {
        setEdges((els) => els.filter((e) => e.id !== edge.id));
      }
      edgeReconnectSuccessful.current = true;
    },
    [setEdges],
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) =>
        addEdge({ ...connection, type: "smoothstep", style: branch }, eds),
      );
    },
    [setEdges],
  );

  // ── Save ──
  const saveLayout = useCallback(async () => {
    setSaveStatus("saving");
    const currentNodes = getNodes();
    const currentEdges = getEdges();

    const positions: SavedPositions = {};
    for (const node of currentNodes) {
      positions[node.id] = {
        x: Math.round(node.position.x),
        y: Math.round(node.position.y),
      };
    }

    const edgeData: SavedEdge[] = currentEdges.map((e) => ({
      id: e.id,
      source: e.source,
      target: e.target,
      sourceHandle: e.sourceHandle ?? null,
      targetHandle: e.targetHandle ?? null,
      type: e.type,
      animated: e.animated,
      style: e.style as Record<string, unknown> | undefined,
    }));

    try {
      await fetch("/api/save-positions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ positions, edges: edgeData }),
      });
      setSaveStatus("saved");
      toast.success("Layout saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch {
      setSaveStatus("idle");
      toast.error("Failed to save layout");
    }
  }, [getNodes, getEdges]);

  // ── Reset to defaults ──
  const resetLayout = useCallback(async () => {
    setNodes(applyConnectedHandles(defaultNodes, defaultEdges));
    setEdges(defaultEdges);
    try {
      await fetch("/api/save-positions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ positions: {}, edges: null }),
      });
    } catch {}
    toast("Layout reset to default", {
      description: "Drag nodes to rearrange.",
    });
  }, [setNodes, setEdges]);

  // ── Tour ──
  const panToStop = useCallback(
    (index: number) => {
      const stop = TOUR_STOPS[index];
      if (!stop) return;
      const allIds = [stop.yearId, ...stop.events];
      let minX = Infinity,
        minY = Infinity,
        maxX = -Infinity,
        maxY = -Infinity;
      for (const id of allIds) {
        const node = getNode(id);
        if (!node) continue;
        const w = node.measured?.width ?? 250;
        const h = node.measured?.height ?? 140;
        minX = Math.min(minX, node.position.x);
        minY = Math.min(minY, node.position.y);
        maxX = Math.max(maxX, node.position.x + w);
        maxY = Math.max(maxY, node.position.y + h);
      }
      const pad = 100;
      fitBounds(
        {
          x: minX - pad,
          y: minY - pad,
          width: maxX - minX + pad * 2,
          height: maxY - minY + pad * 2,
        },
        { duration: 800 },
      );
    },
    [fitBounds, getNode],
  );

  const goToStop = useCallback(
    (index: number) => {
      if (index < 0 || index >= TOUR_STOPS.length) return;
      setTourIndex(index);
      panToStop(index);
    },
    [panToStop],
  );

  const goNext = useCallback(() => {
    if (tourIndex < TOUR_STOPS.length - 1) goToStop(tourIndex + 1);
  }, [tourIndex, goToStop]);

  const goPrev = useCallback(() => {
    if (tourIndex > 0) goToStop(tourIndex - 1);
  }, [tourIndex, goToStop]);

  const fitAll = useCallback(() => {
    const allNodes = getNodes();
    let minX = Infinity,
      minY = Infinity,
      maxX = -Infinity,
      maxY = -Infinity;
    for (const node of allNodes) {
      const w = node.measured?.width ?? 250;
      const h = node.measured?.height ?? 140;
      minX = Math.min(minX, node.position.x);
      minY = Math.min(minY, node.position.y);
      maxX = Math.max(maxX, node.position.x + w);
      maxY = Math.max(maxY, node.position.y + h);
    }
    fitBounds(
      {
        x: minX - 40,
        y: minY - 40,
        width: maxX - minX + 80,
        height: maxY - minY + 80,
      },
      { duration: 800 },
    );
  }, [fitBounds, getNodes]);

  const stopAutoPlay = useCallback(() => {
    setIsPlaying(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startAutoPlay = useCallback(() => {
    stopAutoPlay();
    setIsPlaying(true);
    setTourIndex(0);
    panToStop(0);
    let current = 0;
    function scheduleNext() {
      timerRef.current = setTimeout(() => {
        current++;
        if (current >= TOUR_STOPS.length) {
          setIsPlaying(false);
          timerRef.current = null;
          return;
        }
        setTourIndex(current);
        panToStop(current);
        scheduleNext();
      }, 2500);
    }
    scheduleNext();
  }, [panToStop, stopAutoPlay]);

  const resetToOverview = useCallback(() => {
    stopAutoPlay();
    setTourIndex(-1);
    fitAll();
  }, [stopAutoPlay, fitAll]);

  const currentLabel =
    tourIndex >= 0 ? TOUR_STOPS[tourIndex].label : "Overview";

  return (
    <div
      className="relative flex flex-col"
      style={{ height: "calc(100vh - 56px)" }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={editMode ? onEdgesChange : undefined}
        onConnect={editMode ? onConnect : undefined}
        onReconnectStart={editMode ? onReconnectStart : undefined}
        onReconnect={editMode ? onReconnect : undefined}
        onReconnectEnd={editMode ? onReconnectEnd : undefined}
        nodeTypes={nodeTypes}
        nodesDraggable
        nodesConnectable={editMode}
        edgesReconnectable={editMode}
        elementsSelectable={editMode}
        connectionLineType={ConnectionLineType.SmoothStep}
        connectionLineStyle={{
          stroke: "var(--highlight)",
          strokeWidth: 1.5,
          strokeDasharray: "5 5",
        }}
        snapToGrid={editMode}
        snapGrid={[20, 20]}
        colorMode={colorMode}
        fitView
        fitViewOptions={{ padding: 0.08 }}
        minZoom={0.1}
        maxZoom={1.5}
        proOptions={{ hideAttribution: true }}
        defaultEdgeOptions={{ type: "smoothstep", style: branch }}
        className="!bg-background"
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={2}
          color={isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.12)"}
        />
        {editMode && (
          <MiniMap
            nodeStrokeWidth={2}
            nodeColor={(n) => {
              if (n.type === "journeyMilestone") return "var(--highlight)";
              if (n.type === "journeyYear") return "var(--foreground)";
              return "var(--border)";
            }}
            maskColor={isDark ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.7)"}
            className="!bg-background/80 !border-border !border-dashed !rounded-none"
            pannable
            zoomable
          />
        )}
        <Controls
          showInteractive={false}
          className="!bg-background !border-border !border-dashed !rounded-none !shadow-none [&>button]:!bg-background [&>button]:!border-border [&>button]:!border-dashed [&>button]:!text-muted-foreground [&>button:hover]:!text-foreground [&>button]:!rounded-none [&>button>svg]:!fill-current"
        />
      </ReactFlow>

      {/* ── Control bar ── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 border border-dashed border-muted-foreground/30 bg-card/95 backdrop-blur-md px-5 py-3 font-mono">
        {/* Play / Stop */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={isPlaying ? stopAutoPlay : startAutoPlay}
              className={`p-1.5 rounded-sm transition-colors ${
                isPlaying
                  ? "text-highlight bg-highlight/10"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {isPlaying ? (
                <Square className="size-3.5" />
              ) : (
                <Play className="size-3.5" />
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent side="top" sideOffset={8}>
            {isPlaying ? "Stop tour" : "Play tour"}
          </TooltipContent>
        </Tooltip>

        <div className="w-px h-5 bg-border" />

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={goPrev}
              disabled={tourIndex <= 0 || isPlaying}
              className="p-1.5 text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="size-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="top" sideOffset={8}>
            Previous
          </TooltipContent>
        </Tooltip>

        <span className="text-xs font-bold tracking-widest min-w-[72px] text-center text-foreground">
          {currentLabel}
        </span>

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={goNext}
              disabled={tourIndex >= TOUR_STOPS.length - 1 || isPlaying}
              className="p-1.5 text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="size-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="top" sideOffset={8}>
            Next
          </TooltipContent>
        </Tooltip>

        <div className="w-px h-5 bg-border" />

        <div className="flex items-center gap-1.5">
          {TOUR_STOPS.map((stop, i) => (
            <Tooltip key={stop.yearId}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => {
                    if (!isPlaying) goToStop(i);
                  }}
                  disabled={isPlaying}
                  className={`size-2 rounded-full transition-all ${
                    i === tourIndex
                      ? "bg-highlight scale-125"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
                  } disabled:cursor-not-allowed`}
                />
              </TooltipTrigger>
              <TooltipContent side="top" sideOffset={8}>
                {stop.label}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        <div className="w-px h-5 bg-border" />

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={resetToOverview}
              className="text-[10px] text-muted-foreground hover:text-foreground uppercase tracking-widest transition-colors px-1.5"
            >
              Overview
            </button>
          </TooltipTrigger>
          <TooltipContent side="top" sideOffset={8}>
            Fit all nodes
          </TooltipContent>
        </Tooltip>

        <div className="w-px h-5 bg-border" />

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={resetLayout}
              className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
            >
              <RotateCcw className="size-3.5" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="top" sideOffset={8}>
            Reset layout
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */

export default function TimelinePage() {
  return (
    <ReactFlowProvider>
      <FlowInner />
    </ReactFlowProvider>
  );
}
