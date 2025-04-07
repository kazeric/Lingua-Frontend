
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Home, 
  Languages, 
  History, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Globe,
  Moon,
  Sun
} from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const DashboardSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { theme, setTheme } = useTheme();
  
  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Languages, label: "Translate", path: "/dashboard", active: true },
    { icon: History, label: "History", path: "/history" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <aside 
      className={cn(
        "bg-card border-r border-border transition-all duration-300 flex flex-col relative",
        collapsed ? "w-[70px]" : "w-[240px]"
      )}
    >
      <div className="p-4 flex items-center justify-between border-b border-border">
        <div className={cn("flex items-center", collapsed && "justify-center w-full")}>
          <Globe className="h-6 w-6 text-lingua-500" />
          {!collapsed && <span className="ml-2 font-bold text-lg">Lingua Connect</span>}
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
          className={cn("rounded-full", collapsed && "absolute -right-3 top-4 bg-card border border-border shadow-md")}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      
      <nav className="flex-1 py-6">
        <TooltipProvider delayDuration={0}>
          <ul className="space-y-2 px-2">
            {navItems.map((item, index) => (
              <li key={index}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to={item.path}
                      className={cn(
                        "flex items-center px-3 py-2 rounded-md transition-colors",
                        item.active 
                          ? "bg-lingua-100 text-lingua-700 dark:bg-lingua-900/30 dark:text-lingua-300"
                          : "hover:bg-muted"
                      )}
                    >
                      <item.icon className={cn("h-5 w-5", item.active ? "text-lingua-500" : "")} />
                      {!collapsed && <span className="ml-3">{item.label}</span>}
                    </Link>
                  </TooltipTrigger>
                  {collapsed && <TooltipContent side="right">{item.label}</TooltipContent>}
                </Tooltip>
              </li>
            ))}
          </ul>
        </TooltipProvider>
      </nav>
      
      <div className="border-t border-border p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-full w-full flex justify-center"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
      </div>
    </aside>
  );
};
