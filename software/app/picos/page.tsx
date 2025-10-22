import { fetchPicos } from "@/lib/database"
import { wait } from "@/lib/utils"
import { Cpu } from "lucide-react"
import Filters from "./_components/filters"
import PicoCard from "./_components/pico-card"

export default async function Picos() {
  const picos = await fetchPicos()

  await wait(2000)

  return (
    <div className="space-y-6">
      <div className="flex flex-row items-center gap-2">
        <Cpu className="size-10" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pico Controllers</h1>
          <p className="text-muted-foreground">
            Monitor and manage all Pico controllers in the system
          </p>
        </div>
      </div>
      {/* <Filters /> */}
      <Filters />

      {/* Pico Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {picos.map((pico) => (
          <PicoCard key={pico.macAddress} pico={pico} />
        ))}
      </div>
    </div>
  )
}
