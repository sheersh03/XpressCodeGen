"use client";
import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "@/lib/utils";

export const Select = SelectPrimitive.Root;
export const SelectTrigger = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>>(
  ({ className, ...props }, ref) => (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn("w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-left", className)}
      {...props}
    />
  )
);
SelectTrigger.displayName = "SelectTrigger";

export const SelectValue = SelectPrimitive.Value;
export const SelectContent = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>>(
  ({ className, ...props }, ref) => (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={cn("z-50 min-w-[8rem] overflow-hidden rounded-xl border border-white/10 bg-black/80 backdrop-blur p-1", className)}
        {...props}
      >
        <SelectPrimitive.Viewport />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
);
SelectContent.displayName = "SelectContent";

export const SelectItem = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>>(
  ({ className, children, ...props }, ref) => (
    <SelectPrimitive.Item
      ref={ref}
      className={cn("relative flex w-full cursor-pointer select-none items-center rounded-md px-3 py-2 text-sm text-white hover:bg-white/10", className)}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
);
SelectItem.displayName = "SelectItem";
