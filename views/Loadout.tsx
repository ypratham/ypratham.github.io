import React from "react";
import Image from "next/image";

import { Zap, Shield, Database, Layout } from "lucide-react";
import { SKILLS } from "@/constants";

const Loadout: React.FC = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case "Primary":
        return <Zap className="text-[#FF4655]" size={24} />;
      case "Sidearm":
        return <Database className="text-[#FF4655]" size={24} />;
      case "Tactical":
        return <Shield className="text-[#FF4655]" size={24} />;
      default:
        return <Layout className="text-[#FF4655]" size={24} />;
    }
  };

  // Map skill level (0-100) to Valorant-style Ranks and Prices
  const getTier = (level: number) => {
    if (level >= 95)
      return {
        name: "RADIANT",
        color: "text-[#FFFFaa] drop-shadow-[0_0_5px_rgba(255,255,170,0.8)]",
        price: "4,500",
        icon: "/rank_png/Radiant_Rank.png",
      };
    if (level >= 90)
      return {
        name: "IMMORTAL",
        color: "text-[#FF4655] drop-shadow-[0_0_5px_rgba(255,70,85,0.8)]",
        price: "2,900",
        icon: "/rank_png/Immortal_3_Rank.png",
      };
    if (level >= 85)
      return {
        name: "ASCENDANT",
        color: "text-[#4ade80] drop-shadow-[0_0_5px_rgba(74,222,128,0.8)]",
        price: "2,100",
        icon: "/rank_png/Ascendant_3_Rank.png",
      };
    if (level >= 75)
      return {
        name: "DIAMOND",
        color: "text-[#c084fc] drop-shadow-[0_0_5px_rgba(192,132,252,0.8)]",
        price: "1,600",
        icon: "/rank_png/Diamond_3_Rank.png",
      };
    return {
      name: "PLATINUM",
      color: "text-[#22d3ee]",
      price: "800",
      icon: "/rank_png/Platinum_3_Rank.png",
    };
  };

  return (
    <div className="grow flex flex-col p-6 md:p-12 h-full overflow-hidden bg-[#0F1923]">
      {/* Header */}
      <div className="mb-8 pb-4 border-b border-[#ECE8E1]/10 flex justify-between items-end">
        <div>
          <h2 className="text-6xl font-header font-bold uppercase text-white tracking-tighter">
            Loadout
          </h2>
          <p className="text-[#ECE8E1]/50 uppercase tracking-widest text-sm">
            Technical Arsenal
          </p>
        </div>
        <div className="hidden md:block text-right">
          <div className="text-[#ECE8E1]/40 text-xs uppercase tracking-widest">
            Total Value
          </div>
          <div className="text-3xl font-header font-bold text-[#FF4655]">
            9,000 ¤
          </div>
        </div>
      </div>

      {/* Skills Grid - Styled like Buy Menu */}
      <div className="grow overflow-y-auto custom-scrollbar pr-2 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SKILLS.map((category, idx) => (
            <div key={idx} className="space-y-4">
              {/* Category Header */}
              <div className="flex items-center justify-between bg-[#ECE8E1]/5 p-3 border-l-4 border-[#FF4655]">
                <div className="flex items-center gap-3">
                  {getIcon(category.type)}
                  <h3 className="text-xl font-header font-bold text-white uppercase tracking-wider">
                    {category.name}
                  </h3>
                </div>
                <span className="text-xs text-[#ECE8E1]/30 font-bold uppercase">
                  {category.type} CLASS
                </span>
              </div>

              {/* Skills List */}
              <div className="space-y-2">
                {category.skills.map((skill, sIdx) => {
                  const tier = getTier(skill.level);
                  return (
                    <div
                      key={sIdx}
                      className="group relative bg-[#0F1923] border border-[#ECE8E1]/10 hover:border-[#FF4655] transition-all duration-200 p-4 flex flex-col justify-between h-28 overflow-hidden cursor-default"
                    >
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-[#FF4655]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                      {/* Top Row: Name & Price */}
                      <div className="flex justify-between items-start relative z-10">
                        <span className="font-header font-bold text-2xl text-white uppercase tracking-wide group-hover:translate-x-1 transition-transform">
                          {skill.name}
                        </span>
                        <span className="flex items-center gap-1 text-[#ECE8E1] font-mono font-bold text-lg">
                          <span className="text-[#ECE8E1]/50 text-sm">¤</span>
                          {tier.price}
                        </span>
                      </div>

                      {/* Bottom Row: Rank & Details */}
                      <div className="flex justify-between items-end relative z-10">
                        <div className="flex items-center gap-2">
                          <Image
                            src={tier.icon}
                            alt={tier.name}
                            width={24}
                            height={24}
                            className="object-contain"
                          />
                          <span
                            className={`text-sm font-bold tracking-widest uppercase ${tier.color}`}
                          >
                            {tier.name}
                          </span>
                        </div>

                        {/* Decorative 'Ammo' indicators */}
                        <div className="flex gap-0.5 opacity-50">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-8 h-3 ${
                                i < Math.floor(skill.level / 20)
                                  ? "bg-[#FF4655]"
                                  : "bg-[#ECE8E1]/20"
                              }`}
                            ></div>
                          ))}
                        </div>
                      </div>

                      {/* Corner Accents */}
                      <div className="absolute top-0 right-0 w-0 h-0 border-t-10 border-r-10 border-t-transparent border-r-[#ECE8E1]/20 group-hover:border-r-[#FF4655] transition-colors"></div>
                      <div className="absolute bottom-0 left-0 w-0 h-0 border-b-10 border-l-10 border-b-transparent border-l-[#ECE8E1]/20 group-hover:border-l-[#FF4655] transition-colors"></div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Buy Menu Footer Legend */}
        <div className="mt-12 border-t border-[#ECE8E1]/10 pt-6 flex flex-wrap gap-8 text-[#ECE8E1]/40 text-xs uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 border border-[#ECE8E1]/40"></span>
            <span>Owned</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#FF4655]"></span>
            <span>Equipped</span>
          </div>
          <div className="ml-auto flex gap-4">
            <span>RMB: Request</span>
            <span>B: Close Shop</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loadout;
