import AssignmentView from "./_components/assignment-view"

export default async function Assignments() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Assignments</h1>
        <p className="text-muted-foreground">
          Manage Pico-Robot assignments and monitor connection status
        </p>
      </div>
      <AssignmentView />
    </div>
  )
}
