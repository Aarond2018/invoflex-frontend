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