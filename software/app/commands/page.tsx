import { fetchCommands } from "@/lib/database"
import { wait } from "@/lib/utils"
import { columns } from "./_components/columns"
import { DataTable } from "./_components/data-table"

export default async function Commands() {
  const commands = await fetchCommands()

  await wait(2000)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Command Queue</h1>
        <p className="text-muted-foreground">View all commands saved in the system</p>
      </div>

      {/* Pico Grid */}
      <DataTable columns={columns} data={commands} />
    </div>
  )
}
