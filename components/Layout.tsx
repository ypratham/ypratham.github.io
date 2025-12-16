import React from "react";
import Header from "./Header";
import Image from "next/image";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#0F1923] text-[#ECE8E1] flex flex-col relative ">
      <Image
        src="/bg-light.jpg"
        alt="background"
        fill
        className="object-cover"
      />
      {/* Background Overlay */}
      <div className="fixed inset-0 bg-[#0F1923] opacity-95 z-0 pointer-events-none"></div>
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[50px_50px] z-0 pointer-events-none opacity-20"></div>

      {/* Top Navigation */}
      <Header />

      {/* Main Content */}
      <main className="relative z-10 grow flex flex-col overflow-hidden">
        {children}
      </main>

      {/* Bottom Bar / Status */}
      <footer className="relative z-50 h-12 border-t border-[#ECE8E1]/10 bg-[#0F1923] flex items-center justify-between px-6 text-xs text-[#ECE8E1]/40 uppercase tracking-widest">
        <div className="flex items-center gap-4">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span>System Online</span>
        </div>
        <div>V 2.0.0 // REGION: IND</div>
      </footer>
    </div>
  );
};

export default Layout;
