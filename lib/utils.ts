import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatWpDate(
  wpDate: string,
  options: Intl.DateTimeFormatOptions = {},
  locale: string = 'en-US',
): string {
  if (!wpDate) return '';

  const date = new Date(wpDate);
  if (isNaN(date.getTime())) return '';

  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return date.toLocaleDateString(locale, { ...defaultOptions, ...options });
}
