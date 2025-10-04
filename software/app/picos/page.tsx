import PicoCard from "./_components/pico-card"

export default async function Picos() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Pico Controllers</h1>
        <p className="text-muted-foreground">
          Monitor and manage all Pico controllers in the system
        </p>
      </div>
      {/* <Filters /> */}

      {/* Pico Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <PicoCard />
      </div>
    </div>
  )
}
