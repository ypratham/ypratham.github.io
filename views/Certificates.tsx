"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { CERTIFICATES, CERTIFICATE_CATEGORIES } from "../constants";
import {
  Award,
  Trophy,
  GraduationCap,
  Presentation,
  BookOpen,
} from "lucide-react";
import { Certificate } from "@/types";

// Dynamic import for 3D viewer to avoid SSR issues
const CertificateViewer3D = dynamic(
  () => import("@/components/CertificateViewer3D"),
  { ssr: false }
);

const Certificates: React.FC = () => {
  const [viewing3D, setViewing3D] = useState<Certificate | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case "course":
        return <BookOpen size={16} />;
      case "workshop":
        return <Presentation size={16} />;
      case "hackathon":
        return <Trophy size={16} />;
      case "school":
        return <GraduationCap size={16} />;
      default:
        return <Award size={16} />;
    }
  };

  const filteredCerts =
    activeCategory === "all"
      ? CERTIFICATES
      : CERTIFICATES.filter((cert) => cert.category === activeCategory);

  // Group school certificates together
  const schoolCerts = CERTIFICATES.filter((c) => c.category === "school");
  const otherCerts = CERTIFICATES.filter((c) => c.category !== "school");

  const getAccentColor = (category: string) => {
    switch (category) {
      case "course":
        return "#a855f7";
      case "workshop":
        return "#FF4655";
      case "hackathon":
        return "#fbbf24";
      case "school":
        return "#22d3ee";
      default:
        return "#FF4655";
    }
  };

  return (
    <>
      {/* 3D Certificate Viewer Modal */}
      {viewing3D && (
        <CertificateViewer3D
          certificate={viewing3D}
          onClose={() => setViewing3D(null)}
          accentColor={getAccentColor(viewing3D.category)}
        />
      )}

      <div className="grow flex flex-col p-6 md:p-12 h-full overflow-hidden bg-[#0F1923]">
        {/* Header */}
        <div className="mb-6 pb-4 border-b border-[#ECE8E1]/10 flex justify-between items-end">
          <div>
            <h2 className="text-6xl font-header font-bold uppercase text-white tracking-tighter">
              Awards
            </h2>
            <p className="text-[#ECE8E1]/50 uppercase tracking-widest text-sm flex items-center gap-2">
              <Award size={14} /> Official Commendations & Certifications
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-[#ECE8E1]/40 text-xs uppercase tracking-widest">
            <span className="text-[#FF4655] font-bold">
              {CERTIFICATES.length}
            </span>{" "}
            Total Awards
          </div>
        </div>

        {/* Category Filter Tabs - Valorant Style */}
        <div className="flex gap-1 mb-6 bg-[#0F1923] border border-[#ECE8E1]/10 p-1 w-fit">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 text-xs uppercase tracking-widest font-bold transition-all duration-200 ${
              activeCategory === "all"
                ? "bg-[#FF4655] text-white"
                : "text-[#ECE8E1]/60 hover:text-white hover:bg-[#ECE8E1]/5"
            }`}
          >
            All
          </button>
          {CERTIFICATE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs uppercase tracking-widest font-bold transition-all duration-200 flex items-center gap-2 ${
                activeCategory === cat.id
                  ? "bg-[#FF4655] text-white"
                  : "text-[#ECE8E1]/60 hover:text-white hover:bg-[#ECE8E1]/5"
              }`}
            >
              {getCategoryIcon(cat.id)}
              {cat.name}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="grow flex flex-col overflow-hidden">
          {/* Certificate Grid - Valorant Agent Select Style */}
          <div className="grow overflow-y-auto custom-scrollbar pb-20">
            {activeCategory === "all" ? (
              <>
                {/* Workshop & Hackathon Certificates */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-px grow bg-linear-to-r from-[#FF4655] to-transparent"></div>
                    <span className="text-[#ECE8E1]/40 text-xs uppercase tracking-widest">
                      Professional Achievements
                    </span>
                    <div className="h-px w-8 bg-[#ECE8E1]/20"></div>
                  </div>
                  <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2">
                    {otherCerts.map((cert, index) => (
                      <CertificateCard
                        key={cert.id}
                        cert={cert}
                        isSelected={viewing3D?.id === cert.id}
                        onClick={() => setViewing3D(cert)}
                        index={index}
                        getCategoryIcon={getCategoryIcon}
                      />
                    ))}
                  </div>
                </div>

                {/* School Certificates - Grouped */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-px grow bg-linear-to-r from-[#22d3ee] to-transparent"></div>
                    <span className="text-[#ECE8E1]/40 text-xs uppercase tracking-widest flex items-center gap-2">
                      <GraduationCap size={12} /> School Achievements
                    </span>
                    <div className="h-px w-8 bg-[#ECE8E1]/20"></div>
                  </div>
                  <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2">
                    {schoolCerts.map((cert, index) => (
                      <CertificateCard
                        key={cert.id}
                        cert={cert}
                        isSelected={viewing3D?.id === cert.id}
                        onClick={() => setViewing3D(cert)}
                        index={index}
                        getCategoryIcon={getCategoryIcon}
                        accentColor="#22d3ee"
                      />
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2">
                {filteredCerts.map((cert, index) => (
                  <CertificateCard
                    key={cert.id}
                    cert={cert}
                    isSelected={viewing3D?.id === cert.id}
                    onClick={() => setViewing3D(cert)}
                    index={index}
                    getCategoryIcon={getCategoryIcon}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Bottom Bar - Similar to Valorant Lock In */}
          <div className="mt-auto border-t border-[#ECE8E1]/10 pt-4 flex items-center justify-between">
            <div className="flex gap-6 text-[#ECE8E1]/40 text-xs uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <BookOpen size={14} className="text-[#a855f7]" />
                <span>
                  {CERTIFICATES.filter((c) => c.category === "course").length}{" "}
                  Courses
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Presentation size={14} className="text-[#FF4655]" />
                <span>
                  {CERTIFICATES.filter((c) => c.category === "workshop").length}{" "}
                  Workshops
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy size={14} className="text-[#fbbf24]" />
                <span>
                  {
                    CERTIFICATES.filter((c) => c.category === "hackathon")
                      .length
                  }{" "}
                  Hackathons
                </span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap size={14} className="text-[#22d3ee]" />
                <span>
                  {CERTIFICATES.filter((c) => c.category === "school").length}{" "}
                  School
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Individual Certificate Card Component
interface CertificateCardProps {
  cert: Certificate;
  isSelected: boolean;
  onClick: () => void;
  index: number;
  getCategoryIcon: (categoryId: string) => React.ReactNode;
  accentColor?: string;
}

const CertificateCard: React.FC<CertificateCardProps> = ({
  cert,
  isSelected,
  onClick,
  index,
  getCategoryIcon,
  accentColor = "#FF4655",
}) => {
  return (
    <div
      onClick={onClick}
      className={`group relative cursor-pointer animate-in zoom-in-50 duration-300`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Card Container */}
      <div
        className={`relative aspect-[3/4] overflow-hidden transition-all duration-200 ${
          isSelected
            ? `scale-105 shadow-lg`
            : "hover:scale-105 border border-[#ECE8E1]/10 hover:border-[#ECE8E1]/30"
        }`}
        style={{
          outline: isSelected ? `2px solid ${accentColor}` : undefined,
          outlineOffset: isSelected ? "2px" : undefined,
          boxShadow: isSelected ? `0 0 20px ${accentColor}40` : undefined,
        }}
      >
        {/* Background Image */}
        <Image
          src={cert.image}
          alt={cert.title}
          fill
          className={`object-cover transition-all duration-300 ${
            isSelected
              ? "grayscale-0 brightness-110"
              : "grayscale group-hover:grayscale-0"
          }`}
        />

        {/* Overlay Gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-[#0F1923] via-[#0F1923]/50 to-transparent transition-opacity duration-200 ${
            isSelected ? "opacity-60" : "opacity-80 group-hover:opacity-60"
          }`}
        ></div>

        {/* Category Badge */}
        <div
          className={`absolute top-1 right-1 p-1 bg-[#0F1923]/80 backdrop-blur-sm transition-colors duration-200`}
          style={{ color: accentColor }}
        >
          {getCategoryIcon(cert.category)}
        </div>

        {/* Selected Indicator - Lock In Style */}
        {isSelected && (
          <div
            className="absolute bottom-0 left-0 right-0 py-1 text-center text-[10px] font-bold uppercase tracking-widest text-white animate-pulse"
            style={{ backgroundColor: accentColor }}
          >
            Selected
          </div>
        )}
      </div>

      {/* Title Below Card */}
      <div className="mt-2 text-center">
        <p
          className={`text-[10px] md:text-xs font-bold uppercase tracking-wider truncate transition-colors duration-200 ${
            isSelected
              ? "text-white"
              : "text-[#ECE8E1]/60 group-hover:text-white"
          }`}
          style={{ color: isSelected ? accentColor : undefined }}
        >
          {cert.title}
        </p>
        <p className="text-[8px] md:text-[10px] text-[#ECE8E1]/30 uppercase tracking-widest truncate">
          {cert.date}
        </p>
      </div>
    </div>
  );
};

export default Certificates;
