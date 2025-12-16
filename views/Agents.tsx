"use client";
import React, { useState } from "react";

import { ValBadge } from "../components/UI";
import { Crosshair, Activity, Zap, Eye, Hexagon } from "lucide-react";
import { MY_STATS } from "@/constants";

const Agents: React.FC = () => {
  const [activeAbility, setActiveAbility] = useState(0);

  const getIcon = (name: string) => {
    switch (name) {
      case "Crosshair":
        return <Crosshair size={32} />;
      case "Activity":
        return <Activity size={32} />;
      case "Zap":
        return <Zap size={32} />;
      default:
        return <Eye size={32} />;
    }
  };

  return (
    <div className="grow flex flex-col items-center justify-center p-6 md:p-12 overflow-y-auto">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Agent Visual & Abilities */}
        <div className="space-y-8">
          <div className="relative">
            <h1 className="text-6xl md:text-8xl font-header font-bold text-transparent bg-clip-text bg-linear-to-br from-white to-[#ECE8E1]/10 uppercase opacity-20 absolute -top-10 -left-10 select-none">
              AGENT
            </h1>
            <h2 className="text-4xl md:text-5xl font-header font-bold text-white uppercase mb-2">
              PRATHAM
            </h2>
            <div className="flex items-center gap-4 text-[#FF4655] font-bold tracking-widest mb-6">
              <Hexagon size={16} fill="currentColor" />
              <span>{MY_STATS.role}</span>
            </div>

            <p className="text-[#ECE8E1]/80 text-lg leading-relaxed mb-8 max-w-lg">
              {MY_STATS.biography}
            </p>
          </div>

          {/* Abilities Selector */}
          <div className="space-y-4">
            <h3 className="text-[#ECE8E1]/50 text-sm uppercase tracking-widest">
              Special Abilities
            </h3>
            <div className="flex gap-4">
              {MY_STATS.abilities.map((ability, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveAbility(idx)}
                  className={`w-16 h-16 border border-[#ECE8E1]/20 flex items-center justify-center transition-all duration-200 hover:bg-[#FF4655]/20 ${
                    activeAbility === idx
                      ? "bg-[#FF4655] border-[#FF4655] text-white"
                      : "bg-[#0F1923] text-[#ECE8E1]/50"
                  }`}
                >
                  {getIcon(ability.icon)}
                </button>
              ))}
            </div>

            {/* Ability Description */}
            <div className="bg-[#ECE8E1]/5 border border-[#ECE8E1]/10 p-4 min-h-[100px] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-1 bg-[#ECE8E1]/10 text-xs font-mono text-[#ECE8E1]/50">
                {activeAbility === 3 ? "ULTIMATE" : "BASIC"}
              </div>
              <h4 className="font-header text-xl uppercase font-bold text-white mb-1">
                {MY_STATS.abilities[activeAbility].name}
              </h4>
              <p className="text-[#ECE8E1]/70 text-sm">
                {MY_STATS.abilities[activeAbility].desc}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Stats & Experience Graph (Visual Only) */}
        <div className="relative h-[500px] bg-[#0F1923]/50 border border-[#ECE8E1]/10 p-8 flex flex-col">
          <div className="absolute top-4 right-4 text-[#FF4655] font-header text-2xl">
            COMBAT RECORD
          </div>

          <div className="mt-12 space-y-6">
            {[
              "Frontend Arch",
              "UI/UX Design",
              "Performance",
              "Team Leadership",
            ].map((skill, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm uppercase tracking-wider font-bold text-[#ECE8E1]/80">
                  <span>{skill}</span>
                  <span>{85 + i * 4}%</span>
                </div>
                <div className="h-2 w-full bg-[#ECE8E1]/10">
                  <div
                    className="h-full bg-[#FF4655]"
                    style={{ width: `${85 + i * 4}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-auto grid grid-cols-2 gap-4">
            <div className="bg-[#ECE8E1]/5 p-4 border border-[#ECE8E1]/10">
              <div className="text-2xl font-header font-bold text-white">
                {`${Math.abs(
                  new Date("20 Feb,2021").getFullYear() -
                    new Date().getFullYear()
                )}+`}
              </div>
              <div className="text-xs text-[#ECE8E1]/50 uppercase">
                Years Exp
              </div>
            </div>
            <div className="bg-[#ECE8E1]/5 p-4 border border-[#ECE8E1]/10">
              <div className="text-2xl font-header font-bold text-white">
                50+
              </div>
              <div className="text-xs text-[#ECE8E1]/50 uppercase">
                Projects
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agents;
