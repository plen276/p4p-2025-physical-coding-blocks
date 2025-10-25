import { fetchAssignments, fetchPicos, fetchRobots } from "@/lib/database"
import { wait } from "@/lib/utils"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import AssignmentView from "./_components/assignment-view"

export default async function Assignments() {
  const picos = await fetchPicos()
  const robots = await fetchRobots()
  const assignments = await fetchAssignments()

  await wait(2000)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Assignments</h1>
        <p className="text-muted-foreground">
          Manage Pico-Robot assignments and monitor connection status
        </p>
      </div>
      <AssignmentView
        picos={picos}
        robots={robots}
        assignments={assignments}
        onAssignment={async () => {
          "use server"

          revalidatePath("/assignments")
          redirect("/assignments")
        }}
      />
    </div>
  )
}
