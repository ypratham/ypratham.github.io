"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Globe,
  User,
  Crosshair,
  Award,
  Gamepad2,
  Briefcase,
  LayoutGrid,
} from "lucide-react";
import Image from "next/image";
import { useSounds } from "@/hooks/useSounds";

interface NavItemProps {
  href: string;
  label: string;
  icon: React.ElementType;
  currentPath: string;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({
  href,
  label,
  icon: Icon,
  currentPath,
  onClick,
}) => {
  const { playHover, stopHover } = useSounds();

  // Check if the current path matches the nav item, OR if it's a child page (e.g. /projects/123 belongs to /projects)
  const isActive =
    currentPath === href ||
    (href === "/projects" && currentPath.startsWith("/projects/"));

  return (
    <Link
      href={href}
      onClick={onClick}
      onMouseEnter={playHover}
      onMouseLeave={stopHover}
      className={`flex items-center gap-2 px-6 py-4 font-header text-lg tracking-widest uppercase border-b-2 transition-all duration-300 ${
        isActive
          ? "text-[#FF4655] border-[#FF4655] bg-[#FF4655]/10"
          : "text-[#ECE8E1]/60 border-transparent hover:text-[#ECE8E1] hover:bg-[#ECE8E1]/5"
      }`}
    >
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <Icon size={18} />
      {label}
    </Link>
  );
};

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Lobby", icon: Globe },
    { href: "/agent", label: "Agent", icon: User },
    { href: "/projects", label: "Projects", icon: LayoutGrid },
    { href: "/career", label: "Career", icon: Crosshair },
    { href: "/loadout", label: "Loadout", icon: Briefcase },
    { href: "/awards", label: "Awards", icon: Award },
    { href: "/training", label: "Training", icon: Gamepad2 },
  ];

  return (
    <>
      <header className="relative z-10 flex items-center justify-between px-6 border-b border-[#ECE8E1]/10 bg-[#0F1923]/90 backdrop-blur-md h-20">
        <Link href="/" className="flex items-center gap-4 cursor-pointer">
          <Image src="/logo.png" alt="Logo" width={32} height={32} />
          <div className="hidden md:block">
            <h1 className="text-xl font-bold tracking-widest leading-none">
              PRATHAM
            </h1>
            <span className="text-xs font-header text-[#FF4655] font-bold">
              JoyfulNomad#YP20
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center h-full">
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              currentPath={pathname}
            />
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="xl:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu />
        </button>
      </header>

      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0F1923] pt-24 px-6 xl:hidden overflow-y-auto">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
                currentPath={pathname}
                onClick={() => setMobileMenuOpen(false)}
              />
            ))}
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
