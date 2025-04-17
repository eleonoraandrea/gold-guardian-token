
import React from "react";
import { Languages } from "lucide-react";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Toggle } from "./ui/toggle";

export function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Toggle variant="outline" aria-label={t("change_language")}>
          <Languages size={18} className={language === "en" ? "text-navy-800" : "text-navy-800"} />
          <span className="ml-2 text-xs font-medium hidden md:inline">
            {language.toUpperCase()}
          </span>
        </Toggle>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleLanguageChange("en")}>
          <span className={`mr-2 ${language === "en" ? "font-bold" : ""}`}>English</span>
          {language === "en" && <span>✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange("ru")}>
          <span className={`mr-2 ${language === "ru" ? "font-bold" : ""}`}>Русский</span>
          {language === "ru" && <span>✓</span>}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
