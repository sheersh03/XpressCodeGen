import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn("w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 outline-none", className)}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";
