import { Badge } from "./ui/badge"

interface StatusBadgeProps {
  status: "online" | "offline"
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return <Badge variant={status === "online" ? "default" : "secondary"}>{status}</Badge>
}
