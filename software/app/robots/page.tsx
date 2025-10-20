import { prisma } from "@/lib/prisma"
import RobotCard from "./_components/robot-card"

export default async function Robots() {
  const robots = await prisma.robot.findMany()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Robot Controllers</h1>
        <p className="text-muted-foreground">Monitor and manage all Robots in the system</p>
      </div>
      {/* <Filters /> */}

      {/* Robot Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {robots.map((robot) => (
          <RobotCard key={robot.macAddress} robot={robot} />
        ))}
      </div>
    </div>
  )
}
