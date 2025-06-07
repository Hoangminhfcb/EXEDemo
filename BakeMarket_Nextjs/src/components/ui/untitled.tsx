// src/lib/utils.ts

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes conditionally.
 * Example: cn('btn', isActive && 'bg-blue-500') 
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
