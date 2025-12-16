import React from "react";
import Link from "next/link";
import { ValButton } from "../components/UI";
import {
  ArrowLeft,
  ExternalLink,
  Trophy,
  Code,
  Target,
  Clock,
  User,
  CheckCircle2,
  Activity,
} from "lucide-react";
import { Project } from "@/types";

interface ProjectDetailProps {
  project: Project;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project }) => {
  return (
    <div className="grow flex flex-col h-full overflow-hidden bg-[#0F1923] animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Top Bar Navigation */}
      <div className="h-16 border-b border-[#ECE8E1]/10 flex items-center px-6 bg-[#0F1923]/95 backdrop-blur z-20 sticky top-0">
        <Link
          href="/projects"
          className="flex items-center gap-2 text-[#ECE8E1]/60 hover:text-[#FF4655] transition-colors uppercase font-bold tracking-widest text-sm group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Abort Mission / Return to Database
        </Link>
      </div>

      <div className="grow overflow-y-auto custom-scrollbar relative">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[100px_100px] pointer-events-none"></div>

        {/* Hero Section */}
        <div className="relative h-[400px] w-full border-b border-[#FF4655]/20">
          <div className="absolute inset-0 bg-linear-to-t from-[#0F1923] via-[#0F1923]/50 to-transparent z-10"></div>
          <div className="relative w-full h-full overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-center opacity-60 scale-105"
            />
          </div>

          <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-20 max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-4 animate-in slide-in-from-left-4 duration-700 delay-100">
              <span className="bg-[#FF4655] text-white px-2 py-0.5 text-xs font-bold uppercase tracking-wider">
                {project.category} CLASS
              </span>
              <span className="text-[#ECE8E1]/60 text-xs font-mono uppercase">
                // ID: {project.id.toUpperCase()}
              </span>
            </div>
            <h1 className="text-5xl md:text-8xl font-header font-bold text-white uppercase tracking-tight leading-none mb-4 animate-in slide-in-from-left-4 duration-700 delay-200">
              {project.title}
            </h1>
          </div>
        </div>

        {/* Content Layout */}
        <div className="max-w-7xl mx-auto p-6 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8 animate-in slide-in-from-bottom-8 duration-700 delay-300">
            {/* Mission Briefing */}
            <div className="bg-[#ECE8E1]/5 border border-[#ECE8E1]/10 p-8 relative">
              <div className="absolute top-0 right-0 p-2">
                <Target className="text-[#ECE8E1]/10" size={48} />
              </div>

              <h3 className="text-2xl font-header font-bold text-[#FF4655] uppercase mb-4">
                Mission Briefing
              </h3>
              <p className="text-[#ECE8E1]/80 text-lg leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Role & Duration */}
              <div className="flex flex-wrap gap-6 mb-6 py-4 border-y border-[#ECE8E1]/10">
                <div className="flex items-center gap-2 text-[#ECE8E1]/60">
                  <User size={16} className="text-[#FF4655]" />
                  <span className="text-sm uppercase tracking-widest">
                    {project.role}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[#ECE8E1]/60">
                  <Clock size={16} className="text-[#FF4655]" />
                  <span className="text-sm uppercase tracking-widest">
                    {project.duration}
                  </span>
                </div>
              </div>

              {/* Key Highlights */}
              <h4 className="text-xl font-header font-bold text-white uppercase mb-4">
                Key Objectives Achieved
              </h4>
              <ul className="space-y-3">
                {project.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2
                      size={18}
                      className="text-[#4ade80] mt-0.5 shrink-0"
                    />
                    <span className="text-[#ECE8E1]/80">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 animate-in slide-in-from-right-8 duration-700 delay-500">
            {/* Tech Stack Box */}
            <div className="bg-[#0F1923] border border-[#FF4655] p-6 relative shadow-[0_0_20px_rgba(255,70,85,0.1)]">
              <div className="absolute -top-3 -right-3 p-1 bg-[#FF4655] text-[10px] font-bold text-white px-3 shadow-lg">
                STATUS: DEPLOYED
              </div>
              <h3 className="text-xl font-header font-bold text-white uppercase mb-6 flex items-center gap-2">
                <Activity size={18} className="text-[#FF4655]" /> Arsenal
              </h3>

              <div className="mb-6">
                <div className="text-[10px] text-[#ECE8E1]/50 uppercase tracking-widest mb-2">
                  Tech Stack
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-1 bg-[#ECE8E1]/10 border border-[#ECE8E1]/20 text-xs text-[#ECE8E1] hover:bg-[#FF4655] hover:text-white hover:border-[#FF4655] transition-colors cursor-default"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ValButton fullWidth>
                    <span className="flex items-center gap-2 justify-center">
                      LAUNCH PROTOCOL <ExternalLink size={14} />
                    </span>
                  </ValButton>
                </a>
              )}
            </div>

            {/* Achievements */}
            <div className="bg-[#ECE8E1]/5 border border-[#ECE8E1]/10 p-6">
              <h3 className="text-lg font-header font-bold text-white uppercase mb-4 flex items-center gap-2">
                <Trophy size={16} className="text-yellow-400" /> Commendations
              </h3>
              <div className="flex gap-3">
                <div
                  className="w-12 h-12 bg-[#FF4655]/10 border border-[#FF4655]/50 flex items-center justify-center text-[#FF4655]"
                  title="High Performance"
                >
                  <Activity size={20} />
                </div>
                <div
                  className="w-12 h-12 bg-[#ECE8E1]/10 border border-[#ECE8E1]/20 flex items-center justify-center text-[#ECE8E1]/50"
                  title="Clean Code"
                >
                  <Code size={20} />
                </div>
                <div
                  className="w-12 h-12 bg-[#ECE8E1]/10 border border-[#ECE8E1]/20 flex items-center justify-center text-[#ECE8E1]/50"
                  title="User Centric"
                >
                  <Target size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
