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
