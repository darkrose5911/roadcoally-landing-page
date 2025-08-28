"use client";

import { cn } from "@/lib/utils";

export const ComponentSeparator = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center py-8 my-8",
        className
      )}
      {...props}
    >
      {/* Main horizontal line */}
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-border/60"></div>
      </div>
      
      {/* Center decorative element */}
      <div className="relative flex items-center justify-center bg-background px-4">
        <div className="flex items-center space-x-2">
          {/* Left decorative elements */}
          <div className="w-2 h-2 rounded-full bg-primary/20"></div>
          <div className="w-1 h-1 rounded-full bg-primary/40"></div>
          
          {/* Center circle */}
          <div className="w-3 h-3 rounded-full border-2 border-primary/60 bg-background"></div>
          
          {/* Right decorative elements */}
          <div className="w-1 h-1 rounded-full bg-primary/40"></div>
          <div className="w-2 h-2 rounded-full bg-primary/20"></div>
        </div>
      </div>
      
      {/* Side accent lines */}
      <div className="absolute left-8 top-1/2 w-12 h-px bg-gradient-to-r from-primary/30 to-transparent -translate-y-1/2"></div>
      <div className="absolute right-8 top-1/2 w-12 h-px bg-gradient-to-l from-primary/30 to-transparent -translate-y-1/2"></div>
    </div>
  );
};