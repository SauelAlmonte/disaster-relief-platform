"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const themes = [
  { key: "system" as const, icon: Monitor, label: "Use system theme" },
  { key: "light" as const, icon: Sun, label: "Use light theme" },
  { key: "dark" as const, icon: Moon, label: "Use dark theme" },
];

export type ThemeSwitcherProps = {
  className?: string;
};

export function ThemeSwitcher({ className }: ThemeSwitcherProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeClick = useCallback(
    (themeKey: "light" | "dark" | "system") => {
      setTheme(themeKey);
    },
    [setTheme]
  );

  if (!mounted) {
    return (
      <div
        className={cn(
          "relative isolate flex h-8 w-30 rounded-full bg-muted p-1 ring-1 ring-border",
          className
        )}
        aria-hidden
      >
        <span className="sr-only">Loading theme options</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative isolate flex h-8 w-30 shrink-0 rounded-full bg-muted p-1 ring-1 ring-border",
        className
      )}
      role="group"
      aria-label="Theme selection"
    >
      {themes.map(({ key, icon: Icon, label }) => {
        const isActive = theme === key;
        return (
          <button
            key={key}
            type="button"
            aria-label={label}
            aria-pressed={isActive}
            className="relative flex h-6 flex-1 rounded-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            onClick={() => handleThemeClick(key)}
          >
            {isActive && (
              <motion.div
                className="absolute inset-0 rounded-full bg-secondary"
                layoutId="activeTheme"
                transition={
                  reducedMotion
                    ? { duration: 0 }
                    : { type: "spring", duration: 0.5 }
                }
              />
            )}
            <Icon
              className={cn(
                "relative z-10 m-auto h-4 w-4",
                isActive ? "text-secondary-foreground" : "text-muted-foreground"
              )}
              aria-hidden
            />
          </button>
        );
      })}
    </div>
  );
}
