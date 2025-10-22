import { Badge } from "./ui/badge"

interface DeviceStatusProps {
  status: "online" | "offline"
}

export function DeviceStatus({ status }: DeviceStatusProps) {
  return (
    <Badge className="select-none" variant={status === "online" ? "default" : "secondary"}>
      {status}
    </Badge>
  )
}
