
import React from "react";
import { useLocation } from "react-router-dom";
import { Globe, History, Settings, Menu, Sun, Moon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

type SectionConfig = {
  icon: React.ReactNode;
  title: string;
};

const sectionMap: Record<string, SectionConfig> = {
  "/dashboard": {
    icon: React.createElement(Globe, { className: "h-6 w-6 text-lingua-500" }),
    title: "Translation Dashboard",
  },
  "/history": {
    icon: React.createElement(History, { className: "h-6 w-6 text-lingua-500" }),
    title: "Translation History",
  },
  "/settings": {
    icon: React.createElement(Settings, { className: "h-6 w-6 text-lingua-500" }),
    title: "Settings",
  },
};

export const SectionTitleBar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const { theme, setTheme } = useTheme();
  
  // find which route is active
  const path =
    location.pathname === "/" ? "/dashboard" : // fallback, handle root as dashboard
    Object.keys(sectionMap).find(key => location.pathname.startsWith(key)) || "/dashboard";
  const config = sectionMap[path];

  return (
    <div className="flex items-center justify-between gap-3 px-4 md:px-8 py-3 border-b border-border bg-card/90 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        {config.icon}
        <h1 className="font-bold text-lg md:text-2xl">{config.title}</h1>
      </div>
      
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-full"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
      )}
    </div>
  );
};
