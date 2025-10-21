import { fetchCommands } from "@/lib/database"
import CommandList from "../_components/command-list"

export default async function Commands() {
  const commands = await fetchCommands()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Command Queue</h1>
        <p className="text-muted-foreground">Monitor and manage all Robots in the system</p>
      </div>
      {/* <Filters /> */}

      {/* Pico Grid */}
      <CommandList commands={commands} />
    </div>
  )
}
