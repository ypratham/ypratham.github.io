import React from "react";
import Link from "next/link";
import { ValButton } from "../components/UI";
import { Play, Mail, Linkedin, Github } from "lucide-react";
import Image from "next/image";

const Lobby: React.FC = () => {
  return (
    <div className="grow flex flex-col md:flex-row items-center justify-center p-6 md:p-12 gap-12 max-w-7xl mx-auto w-full h-full relative">
      {/* Character / Hero Visual */}
      <div className="order-2 md:order-1 flex-1 relative flex items-center justify-center">
        {/* Placeholder for "Agent" Model */}
        <div className="relative w-full max-w-[500px] aspect-3/4 group">
          <div className="absolute inset-0 bg-[#FF4655] opacity-20 transform translate-x-4 translate-y-4"></div>
          <Image
            src="/pratham.jpg"
            alt="Agent Pratham"
            width={500}
            height={667}
            className="w-full h-full object-cover filter grayscale contrast-125 brightness-75 group-hover:grayscale-0 transition-all duration-500"
          />
          {/* Scanning Line Animation */}
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#FF4655]/20 to-transparent h-[10%] w-full animate-[scan_3s_ease-in-out_infinite] pointer-events-none opacity-50"></div>

          <div className="absolute bottom-0 left-0 p-4 bg-linear-to-t from-black/80 to-transparent w-full">
            <h2 className="text-4xl md:text-6xl font-header font-bold text-white uppercase tracking-tighter">
              PRATHAM
            </h2>
            <div className="flex gap-2 text-[#FF4655] font-bold tracking-widest text-sm">
              <span>// DUELIST</span>
              <span>// ENGINEER</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Actions */}
      <div className="order-1 md:order-2 flex-1 flex flex-col items-start gap-8 z-10">
        <div className="space-y-2">
          <h3 className="text-[#ECE8E1]/60 font-bold tracking-widest uppercase">
            Latest Patch Notes
          </h3>
          <h1 className="text-5xl md:text-7xl font-header font-bold text-white uppercase leading-[0.9]">
            READY TO <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FF4655] to-white">
              DEPLOY
            </span>
          </h1>
          <p className="max-w-md text-[#ECE8E1]/80 text-lg leading-relaxed border-l-2 border-[#FF4655] pl-4 mt-4">
            Specialized in high-velocity frontend development. Equipped with the
            latest React tech stack. Ready for contract or full-time deployment.
          </p>
        </div>

        <div className="flex flex-col gap-4 w-full max-w-xs">
          <Link href="/career">
            <ValButton fullWidth>
              <div className="flex items-center justify-center gap-2">
                <Play fill="currentColor" size={16} />
                VIEW ARSENAL
              </div>
            </ValButton>
          </Link>
          <Link href="/agent">
            <ValButton variant="outline" fullWidth>
              INSPECT AGENT
            </ValButton>
          </Link>
        </div>

        {/* Contact Card */}
        <div className="mt-8 p-4 border border-[#ECE8E1]/10 bg-[#0F1923]/50 w-full max-w-sm">
          <div className="flex justify-between items-center text-xs text-[#ECE8E1]/50 uppercase tracking-widest mb-4">
            <span>Friend Request</span>
            <span className="text-green-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              Available
            </span>
          </div>
          <div className="space-y-3">
            <a
              href="mailto:ypratham0014@gmail.com"
              className="flex items-center gap-3 text-[#ECE8E1] hover:text-[#FF4655] transition-colors group"
            >
              <div className="w-8 h-8 border border-[#ECE8E1]/20 group-hover:border-[#FF4655] flex items-center justify-center transition-colors">
                <Mail size={16} />
              </div>
              <span className="text-sm font-mono">ypratham0014@gmail.com</span>
            </a>
            <a
              href="https://linkedin.com/in/ypratham"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-[#ECE8E1] hover:text-[#FF4655] transition-colors group"
            >
              <div className="w-8 h-8 border border-[#ECE8E1]/20 group-hover:border-[#FF4655] flex items-center justify-center transition-colors">
                <Linkedin size={16} />
              </div>
              <span className="text-sm font-mono">/in/ypratham</span>
            </a>
            <a
              href="https://github.com/ypratham"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-[#ECE8E1] hover:text-[#FF4655] transition-colors group"
            >
              <div className="w-8 h-8 border border-[#ECE8E1]/20 group-hover:border-[#FF4655] flex items-center justify-center transition-colors">
                <Github size={16} />
              </div>
              <span className="text-sm font-mono">/ypratham</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lobby;
