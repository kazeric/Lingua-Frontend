import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Languages, 
  History, 
  Settings,
  Moon,
  Sun,
  X,
  Menu,
  Globe
} from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

export const DashboardSidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const isMobile = useIsMobile();
  const location = useLocation();
  
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
    { icon: Languages, label: "Translation Dashboard", path: "/dashboard" },
    { icon: History, label: "History", path: "/history" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Top Bar */}
      {isMobile && (
        <div className="bg-card border-b border-border py-3 px-4 flex items-center justify-between fixed top-0 left-0 right-0 z-30">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen(true)}
            className="rounded-full"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-lingua-500" />
            <span className="font-medium">Translation Dashboard</span>
          </div>
          
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
          "bg-card fixed lg:static h-full transition-all duration-300 flex flex-col z-50",
          "lg:w-64",
          isMobile ? (
            mobileOpen ? "w-64 translate-x-0" : "-translate-x-full w-64"
          ) : "w-64"
        )}
      >
        <div className="p-4 flex items-center justify-between border-b border-border">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-lingua-500" />
            <span className="font-medium">Lingua Connect</span>
          </div>
          
          {isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setMobileOpen(false)}
              className="rounded-full ml-auto"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <nav className="flex-1 py-6">
          <ul className="space-y-2 px-2">
            {navItems.map((item) => (
              <li key={item.label}>
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
                  <span className="ml-3">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
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
      
      {/* Page Content Spacer for Mobile */}
      {isMobile && <div className="h-14" />}
    </>
  );
};
