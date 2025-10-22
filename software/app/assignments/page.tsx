import { wait } from "@/lib/utils"
import AssignmentView from "./_components/assignment-view"

export default async function Assignments() {
  await wait(2000)
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Assignments</h1>
        <p className="text-muted-foreground">
          Manage Pico-Robot assignments and monitor connection status
        </p>
      </div>
      <AssignmentView />
    </div>
  )
}
