import { Skeleton } from "@/components/ui/skeleton"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
      <div>
        <Skeleton className="h-9 w-64" />
        <Skeleton className="mt-2 h-5 w-96" />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        {/* Search Input Skeleton */}
        <Skeleton className="h-10 flex-1" />
        {/* Select Filter Skeleton */}
        <Skeleton className="h-10 w-full sm:w-[180px]" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-7 w-48" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* AssignmentTable Skeleton */}
          <div className="overflow-hidden rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  {Array.from({ length: 4 }).map((_, i) => (
                    <TableHead key={i}>
                      <Skeleton className="h-6 w-full" />
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 4 }).map((__, j) => (
                      <TableCell key={j}>
                        <Skeleton className="h-6 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}