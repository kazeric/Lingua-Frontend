
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Languages, 
  History, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Globe,
  Moon,
  Sun,
  X,
  Menu
} from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";

export const DashboardSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Automatically collapse sidebar on mobile
  useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
      setMobileOpen(false);
    }
  }, [isMobile]);

  // Handle clicking outside to close mobile sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.getElementById('dashboard-sidebar');
      if (mobileOpen && sidebar && !sidebar.contains(event.target) && isMobile) {
        setMobileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileOpen, isMobile]);
  
  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Languages, label: "Translate", path: "/dashboard" },
    { icon: History, label: "History", path: "/history" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Top Bar */}
      {isMobile && (
        <div className="bg-card border-b border-border py-3 px-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-lingua-500" />
            <span className="font-bold">Lingua Connect</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileOpen(true)}
              className="rounded-full md:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
    
      {/* Mobile Overlay */}
      {isMobile && mobileOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        id="dashboard-sidebar"
        className={cn(
          "bg-card border-r border-border transition-all duration-300 flex flex-col z-50",
          collapsed ? "w-[70px]" : "w-[240px]",
          isMobile && "fixed h-full",
          isMobile && !mobileOpen && "transform -translate-x-full",
          isMobile && mobileOpen && "transform translate-x-0"
        )}
      >
        <div className="p-4 flex items-center justify-between border-b border-border">
          <div className={cn("flex items-center", collapsed && "justify-center w-full")}>
            <Globe className="h-6 w-6 text-lingua-500" />
            {!collapsed && <span className="ml-2 font-bold text-lg">Lingua Connect</span>}
          </div>
          
          {isMobile ? (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setMobileOpen(false)}
              className="rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          ) : (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setCollapsed(!collapsed)}
              className={cn("rounded-full", collapsed && "absolute -right-3 top-4 bg-card border border-border shadow-md")}
            >
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          )}
        </div>
        
        <nav className="flex-1 py-6">
          <TooltipProvider delayDuration={0}>
            <ul className="space-y-2 px-2">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        to={item.path}
                        className={cn(
                          "flex items-center px-3 py-2 rounded-md transition-colors",
                          isActive(item.path) 
                            ? "bg-lingua-100 text-lingua-700 dark:bg-lingua-900/30 dark:text-lingua-300"
                            : "hover:bg-muted"
                        )}
                        onClick={() => isMobile && setMobileOpen(false)}
                      >
                        <item.icon className={cn("h-5 w-5", isActive(item.path) ? "text-lingua-500" : "")} />
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
        
        {!isMobile && (
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
        )}
      </aside>
    </>
  );
};
