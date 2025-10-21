import { prisma } from "@/lib/prisma"
import ApiDocumentation from "./_components/api-documentation"
import CommandList from "./_components/command-list"
import PicoList from "./_components/pico-list"
import RobotList from "./_components/robot-list"
import { Commands, Pico, Robot } from "./generated/prisma"

export default async function Home() {
  const picos: Pico[] = await prisma.pico.findMany()
  const robots: Robot[] = await prisma.robot.findMany()
  const commands: Commands[] = await prisma.commands.findMany()

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
