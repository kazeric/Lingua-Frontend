
import React from "react";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react"; // Changed from 'history' to 'Clock'
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface SectionTitleBarProps {
  title: string;
  showBackButton?: boolean;
  className?: string;
}

export const SectionTitleBar = ({
  title,
  showBackButton = false,
  className,
}: SectionTitleBarProps) => {
  const navigate = useNavigate();

  return (
    <div className={cn("flex items-center gap-2 mb-4", className)}>
      {showBackButton && (
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full"
          onClick={() => navigate(-1)}
        >
          <Clock className="h-4 w-4" /> {/* Changed from 'history' to 'Clock' */}
        </Button>
      )}
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
  );
};
