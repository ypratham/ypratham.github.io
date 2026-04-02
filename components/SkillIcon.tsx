"use client";

import StackIcon from "tech-stack-icons";
import type { IconName } from "tech-stack-icons";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

interface SkillIconProps {
  icon: string;
  name: string;
  size?: number;
}

export default function SkillIcon({ icon, name, size = 40 }: SkillIconProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const variant = mounted && resolvedTheme === "light" ? "light" : "dark";

  return (
    <span
      role="img"
      aria-label={name}
      style={{ width: size, height: size, display: "inline-flex" }}
    >
      <StackIcon
        name={icon as IconName}
        variant={variant}
        className="w-full h-full"
      />
    </span>
  );
}
