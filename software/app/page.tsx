import { Command, CommandRegistry } from "@/lib/types/command"
import { PicoRegistry } from "@/lib/types/pico"
import { RobotRegistry } from "@/lib/types/robot"
import ApiDocumentation from "./_components/api-documentation"
import CommandList from "./_components/command-list"
import PicoList from "./_components/pico-list"
import RobotList from "./_components/robot-list"

export default async function Home() {
  // const [queueStatus, setQueueStatus] = useState<QueueStatus | null>(null);
  // const [commands, setCommands] = useState<Command[]>([]);
  // const [loading, setLoading] = useState(true)
  // const [connectedPicos, setConnectedPicos] = useState<Pico[]>([])
  // const [connectedRobots, setConnectedRobots] = useState<Robot[]>([])

  const defaultUrl = process.env.NEXT_PUBLIC_DEFAULT_URL
    ? process.env.NEXT_PUBLIC_DEFAULT_URL
    : "http://localhost:3000"

  const loading: boolean = false
  // const connectedPicos: Pico[] = []
  // const connectedRobots: Robot[] = []
  console.log("deafult url:", defaultUrl)

  // const picoResponse = await fetch(`${defaultUrl}/api/pico/register`, { cache: "no-store" })
  const picoResponse = await fetch("http://localhost:3000/api/pico/register", { cache: "no-store" })
  // const {connectedPicos: Pico[],totalPicos:number} = await picoResponse.json()
  const picoData = (await picoResponse.json()) as PicoRegistry
  console.log("The API returned:", picoData)
  console.log(`Total connected [${picoData.connectedPicos.length}]:`, picoData.connectedPicos)

  const robotResponse = await fetch("http://localhost:3000/api/robot/register", {
    cache: "no-store",
  })
  const robotData = (await robotResponse.json()) as RobotRegistry
  console.log("The API returned:", robotData)
  console.log(`Total connected [${robotData.connectedRobots.length}]:`, robotData.connectedRobots)

  const commandResponse = await fetch("http://localhost:3000/api/pico/commands", {
    cache: "no-store",
  })
  const commandData = (await commandResponse.json()) as CommandRegistry
  console.log("The API returned:", commandData)
  const commandList: Command[] = commandData.commandList.map((cmd) => ({
    id: cmd.id,
    macAddress: cmd.macAddress,
    read: cmd.read,
    createdAt: new Date(cmd.createdAt),
    data: JSON.parse(cmd.data),
  }))
  console.log("Formatted commands:", commandList)
  // const fetchQueueData = async () => {
  //   try {
  //     const [picoRes, robotRes] = await Promise.all([
  //       fetch("/api/pico/register"),
  //       fetch("/api/robot/register"),
  //     ])

  //     const picoData = await picoRes.json()

  //     if (picoData.success) {
  //       setConnectedPicos(picoData.connectedPicos)
  //     }
  //   } catch (error) {
  //     console.error("Error fetching queue data:", error)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  // useEffect(() => {
  //   fetchQueueData()
  //   const interval = setInterval(fetchQueueData, 2000) // Poll every 2 seconds
  //   return () => clearInterval(interval)
  // }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Status Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Connected Picos */}
        <PicoList
          connectedPicos={picoData.connectedPicos}
          totalPicos={picoData.connectedPicos.length}
        />

        {/* Connected Robots */}
        <RobotList connectedRobots={robotData.connectedRobots} />
      </div>

      {/* Commands List */}
      <CommandList commands={commandList} />

      {/* API Documentation */}
      <ApiDocumentation />
    </div>
  )
}
