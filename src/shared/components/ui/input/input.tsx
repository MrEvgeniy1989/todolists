import { cn } from "@/shared/lib/utils/merge-cn";
import { ComponentProps, forwardRef } from "react";

export const Input = forwardRef<HTMLInputElement, ComponentProps<"input">>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        `border-border file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring 
        flex h-10 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-md 
        transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium 
        focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`,
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";
