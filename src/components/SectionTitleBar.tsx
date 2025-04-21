
import React from "react";
import { useLocation } from "react-router-dom";
import { translate, history, settings } from "lucide-react";

type SectionConfig = {
  icon: React.ReactNode;
  title: string;
};

const sectionMap: Record<string, SectionConfig> = {
  "/dashboard": {
    icon: React.createElement(translate, { className: "h-6 w-6 text-lingua-500" }),
    title: "Translation Dashboard",
  },
  "/history": {
    icon: React.createElement(history, { className: "h-6 w-6 text-lingua-500" }),
    title: "Translation History",
  },
  "/settings": {
    icon: React.createElement(settings, { className: "h-6 w-6 text-lingua-500" }),
    title: "Settings",
  },
};

export const SectionTitleBar = () => {
  const location = useLocation();
  // find which route is active
  const path =
    location.pathname === "/" ? "/dashboard" : // fallback, handle root as dashboard
    Object.keys(sectionMap).find(key => location.pathname.startsWith(key)) || "/dashboard";
  const config = sectionMap[path];

  return (
    <div className="flex items-center gap-3 px-4 md:px-8 py-3 border-b border-border bg-card/90 sticky top-0 z-30">
      {config.icon}
      <h1 className="font-bold text-lg md:text-2xl">{config.title}</h1>
    </div>
  );
};
