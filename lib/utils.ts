import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: any[]) {
  // We don't import tailwind-merge to keep deps lean; fallback to clsx only.
  return clsx(inputs);
}
