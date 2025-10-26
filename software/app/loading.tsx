import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function Loading() {
  return (
    <div className="space-y-6">
      {/* Status Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* PicoList Skeleton */}
        <Card>
          <CardHeader>
            <div className="flex items-baseline justify-between">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-5 w-20" />
            </div>
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-56" />
              <Skeleton className="h-4 w-24" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3 px-2">
                  <Skeleton className="h-3 w-3 rounded-full" />
                  <div>
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="mt-1 h-4 w-32" />
                    <Skeleton className="mt-1 h-4 w-40" />
                  </div>
                </div>
                <Skeleton className="h-6 w-16" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* RobotList Skeleton */}
        <Card>
          <CardHeader>
            <div className="flex items-baseline justify-between">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-5 w-20" />
            </div>
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-56" />
              <Skeleton className="h-4 w-24" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3 px-2">
                  <Skeleton className="h-3 w-3 rounded-full" />
                  <div>
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="mt-1 h-4 w-32" />
                    <Skeleton className="mt-1 h-4 w-40" />
                  </div>
                </div>
                <Skeleton className="h-6 w-16" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* CommandList Skeleton */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Skeleton className="h-5 w-10" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-5 w-20" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-5 w-32" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-5 w-24" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-5 w-24" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-5 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-full" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* ApiDocumentation Skeleton */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i}>
              <Skeleton className="h-5 w-32" />
              <Skeleton className="mt-1 h-8 w-full" />
              <Skeleton className="mt-1 h-4 w-1/2" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
