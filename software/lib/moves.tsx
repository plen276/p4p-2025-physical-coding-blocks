import { ArrowDown, ArrowRight, ArrowUp } from "lucide-react"
import { JSX } from "react"

export const moveMap: Record<string, string> = {
  A: "Forward",
  B: "Backward",
  D: "Turn Right",
}

export const moveIcons: Record<string, JSX.Element> = {
  A: <ArrowUp className="h-4 w-4" />,
  B: <ArrowDown className="h-4 w-4" />,
  D: <ArrowRight className="h-4 w-4" />,
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
