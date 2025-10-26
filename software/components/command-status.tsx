import { Badge } from "./ui/badge"

interface CommandStatusProps {
  status: boolean
}

export function CommandStatus({ status }: CommandStatusProps) {
  return (
    <Badge className="select-none" variant={status ? "secondary" : "default"}>
      {status ? "Completed" : "Queued"}
    </Badge>
  )
}
