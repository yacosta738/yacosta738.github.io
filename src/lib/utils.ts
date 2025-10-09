import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * A utility function to conditionally join class names and merge Tailwind CSS classes
 * without style conflicts.
 *
 * @param {...ClassValue[]} inputs - A list of class values to be combined.
 *   This can include strings, objects with boolean keys, and arrays.
 * @returns {string} The merged and optimized class name string.
 * @example
 * cn("p-4", "font-bold", { "bg-red-500": hasError });
 */
export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}
