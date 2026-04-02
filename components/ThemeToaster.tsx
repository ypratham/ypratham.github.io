"use client";

import { Toaster } from "sonner";
import { useTheme } from "next-themes";

export default function ThemeToaster() {
  const { resolvedTheme } = useTheme();

  return (
    <Toaster
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      position="bottom-right"
      toastOptions={{
        className:
          "!font-mono !border !border-dashed !border-border !bg-card !text-foreground !rounded-none",
        style: {
          boxShadow: "var(--node-shadow)",
        },
      }}
    />
  );
}
