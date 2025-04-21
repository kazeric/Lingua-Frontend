
import React, { useState } from "react";
import { TranslationPanel } from "@/components/dashboard/TranslationPanel";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { Toaster } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { SectionTitleBar } from "@/components/SectionTitleBar";

const Dashboard = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useIsMobile();
  
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <DashboardSidebar />
      
      <main className={`flex-1 flex flex-col overflow-y-auto ${isMobile ? 'w-full' : ''}`}>
        <div className="h-full flex flex-col">
          {isMobile && (
            <div className="p-4">
              <SectionTitleBar title="Translation Dashboard" />
            </div>
          )}
          <TranslationPanel isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
        </div>
      </main>
      
      <Toaster position="top-right" />
    </div>
  );
};

export default Dashboard;
