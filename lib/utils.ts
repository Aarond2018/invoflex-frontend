import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { setCookie } from 'cookies-next';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function setAuthCookie(token:string|undefined, email:string):void {
  setCookie('dToken', token, {
    expires: new Date(Date.now() + 60 * 60 * 24 * 1000)
  });
  setCookie('dEmail', email, {
    expires: new Date(Date.now() + 60 * 60 * 24 * 1000)
  });
}

export const readableDate = (date: string | undefined) => {
  const formattedDate = date && new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return formattedDate
};

export const shortDate = (date: string) => {
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const year = d.getFullYear();
  
  return `${month}/${day}/${year}`;
}