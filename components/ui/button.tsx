import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const base = "inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium transition";
    const styles = variant === "secondary"
      ? "bg-white/10 hover:bg-white/20 text-white border border-white/10"
      : "bg-indigo-600 hover:bg-indigo-500 text-white";
    return (
      <button ref={ref} className={cn(base, styles, className)} {...props} />
    );
  }
);
Button.displayName = "Button";
