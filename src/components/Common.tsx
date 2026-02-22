import React from "react";
import { cn } from "@/utils/cn";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className, animate = true }) => {
  return (
    <div
      className={cn(
        "bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl overflow-hidden",
        "transition-all duration-300 ease-out",
        animate && "hover:bg-white/15 hover:border-white/30",
        className
      )}
    >
      {children}
    </div>
  );
};

export const GlassBadge: React.FC<{ children: React.ReactNode; color?: string }> = ({
  children,
  color = "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
}) => (
  <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium border", color)}>
    {children}
  </span>
);

export const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-xl font-semibold text-white/90 mb-4 ml-1">{children}</h2>
);
