import { fetchCommands, fetchPicos, fetchRobots } from "@/lib/database"
import { Command, Pico, Robot } from "@/lib/types"
import ApiDocumentation from "./_components/api-documentation"
import CommandList from "./_components/command-list"
import PicoList from "./_components/pico-list"
import RobotList from "./_components/robot-list"

export default async function Home() {
  const picos: Pico[] = await fetchPicos()
  const robots: Robot[] = await fetchRobots()
  const commands: Command[] = await fetchCommands()

  return (
    <div className="space-y-6">
      {/* Status Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Connected Picos */}
        <PicoList connectedPicos={picos} totalPicos={picos.length} />

        {/* Connected Robots */}
        <RobotList connectedRobots={robots} />
      </div>

      {/* Commands List */}
      <CommandList commands={commands} />

      {/* API Documentation */}
      <ApiDocumentation />
    </div>
  )
}
