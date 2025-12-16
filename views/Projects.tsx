import { PROJECTS } from "@/constants";
import Link from "next/link";
import React, { useState } from "react";
import { ValBadge, ValButton, ValCard } from "../components/UI";

const Projects: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="grow flex flex-col p-6 md:p-12 h-full overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 pb-4 border-b border-[#ECE8E1]/10 gap-4">
        <div>
          <h2 className="text-5xl font-header font-bold uppercase text-white">
            Missions
          </h2>
          <p className="text-[#ECE8E1]/50 uppercase tracking-widest text-sm">
            Deployed Projects Database
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-y-auto pb-20 pr-2 custom-scrollbar">
        {PROJECTS.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.id}`}
            onMouseEnter={() => setHoveredId(project.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer group relative transition-all duration-300 hover:-translate-y-2"
          >
            <ValCard
              active={hoveredId === project.id}
              className="h-full flex flex-col"
            >
              {/* Image Area */}
              <div className="relative aspect-video bg-black mb-4 overflow-hidden border border-[#ECE8E1]/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-300 scale-100 group-hover:scale-110"
                />
                <div className="absolute top-2 left-2 bg-[#0F1923]/80 px-2 py-1 text-[10px] font-bold text-[#FF4655] border border-[#FF4655]/50">
                  {project.category} CLASS
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-header font-bold text-white uppercase mb-1 truncate">
                {project.title}
              </h3>
              <p className="text-xs text-[#ECE8E1]/60 mb-4 line-clamp-2">
                {project.description}
              </p>

              <div className="mt-auto">
                <div className="flex flex-wrap mb-4 h-12 overflow-hidden gap-1">
                  {project.tech.slice(0, 3).map((t) => (
                    <ValBadge key={t}>{t}</ValBadge>
                  ))}
                </div>

                {/* Hover Reveal Button */}
                <div
                  className={`transition-all duration-300 ${
                    hoveredId === project.id
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2"
                  }`}
                >
                  <ValButton
                    fullWidth
                    variant="primary"
                    className="text-xs py-2"
                  >
                    VIEW REPORT
                  </ValButton>
                </div>
              </div>
            </ValCard>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Projects;
