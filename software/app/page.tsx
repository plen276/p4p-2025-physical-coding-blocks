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

  const picoResponse = await fetch(`${defaultUrl}/api/pico/register`, { cache: "no-store" })
  // const {connectedPicos: Pico[],totalPicos:number} = await picoResponse.json()
  const picoData = (await picoResponse.json()) as PicoRegistry
  console.log("The API returned:", picoData)
  console.log(`Total connected [${picoData.totalPicos}]:`, picoData.connectedPicos)

  const robotResponse = await fetch(`${defaultUrl}/api/robot/register`, { cache: "no-store" })
  const robotData = (await robotResponse.json()) as RobotRegistry
  console.log("The API returned:", robotData)
  console.log(`Total connected [${robotData.totalRobots}]:`, robotData.connectedRobots)

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
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">
          Pico W & mBot2 Command Queue Dashboard
        </h1>

        {/* Connected Picos */}
        <PicoList connectedPicos={picoData.connectedPicos} totalPicos={picoData.totalPicos} />

        {/* Connected Robots */}
        <RobotList connectedRobots={robotData.connectedRobots} />

        {/* Commands List */}
        <CommandList />

        {/* API Documentation */}
        <ApiDocumentation />
      </div>
    </div>
  )
}
