import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

// 1. Spinner Loader (Default)
export const Loader = ({ size = "md"}) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  };

  return (
    <Loader2
      className={cn(
        "animate-spin text-indigo-600",
        size,
      )}
    />
  );
};
