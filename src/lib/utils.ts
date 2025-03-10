import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatToCurrency(value: number){
  if(isNaN(value)) return 'R$ --';
  return `${value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
}