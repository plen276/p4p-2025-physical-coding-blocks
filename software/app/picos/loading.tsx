import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Cpu, Search } from "lucide-react"

export default function Loading() {
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

      {/* Filter Bar */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1 cursor-progress">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
          <Input className="pl-10" disabled />
        </div>
        <Select disabled>
          <SelectTrigger className="w-full !cursor-progress sm:w-[180px]">
            <SelectValue />
          </SelectTrigger>
        </Select>
      </div>

      {/* Pico Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(21)].map((_, i) => (
          <Card key={i} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="size-4 rounded-full" />
                  <div className="space-y-1">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Skeleton className="h-5 w-12" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-row justify-between gap-3 md:flex">
              <Skeleton className="h-10 flex-1" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
