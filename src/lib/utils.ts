import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import truncate from "html-truncate";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string){
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export function truncateHTML(html: string, maxLength: number): string {
  return truncate(html, maxLength, { ellipsis: "…" });
};