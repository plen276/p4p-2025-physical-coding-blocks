import { fetchRobots } from "@/lib/database"
import { wait } from "@/lib/utils"
import { Bot } from "lucide-react"
import Filters from "./_components/filters"
import RobotCard from "./_components/robot-card"

export default async function Robots() {
  const robots = await fetchRobots()

  await wait(2000)

  return (
    <div className="space-y-6">
      <div className="flex flex-row items-center gap-2">
        <Bot className="size-10" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Robot Controllers</h1>
          <p className="text-muted-foreground">Monitor and manage all Robots in the system</p>
        </div>
      </div>

      {/* <Filters /> */}
      <Filters />

      {/* Robot Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {robots.map((robot) => (
          <RobotCard key={robot.macAddress} robot={robot} />
        ))}
      </div>
    </div>
  )
}
