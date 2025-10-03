import { clsx, type ClassValue } from "clsx"
import { JSX } from "react"
import { twMerge } from "tailwind-merge"
import { moveIcons, moveMap } from "./moves"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseMoves(data: string[]): { move: string; count: number }[] {
  return data.map((item: string) => {
    const letter = item[0]
    const count = item.length
    return { move: moveMap[letter] ?? letter, count }
  })
}

export function parseMoveIcons(
  data: string[]
): { move: string; count: number; icon: JSX.Element }[] {
  return data.map((item: string) => {
    const letter = item[0]
    const count = item.length
    return {
      move: moveMap[letter] ?? letter, // e.g., "Forward"
      count, // e.g., 2
      icon: moveIcons[letter], // JSX icon
    }
  })
}
