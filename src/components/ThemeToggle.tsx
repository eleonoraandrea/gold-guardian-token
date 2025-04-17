
import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "./ui/button";
import { Toggle } from "./ui/toggle";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Toggle 
          variant="outline" 
          aria-label={t("toggle_theme")} 
          onClick={toggleTheme}
        >
          {theme === "dark" ? (
            <Sun size={18} className="text-navy-200" />
          ) : (
            <Moon size={18} className="text-navy-800" />
          )}
          <span className="sr-only">{t("toggle_theme")}</span>
        </Toggle>
      </TooltipTrigger>
      <TooltipContent>
        <p>{theme === "dark" ? t("light_mode") : t("dark_mode")}</p>
      </TooltipContent>
    </Tooltip>
  );
}
