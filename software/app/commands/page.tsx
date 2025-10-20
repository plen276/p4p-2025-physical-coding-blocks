import { prisma } from "@/lib/prisma"
import CommandList from "../_components/command-list"

export default async function Commands() {
  // const commandResponse = await fetch("http://localhost:3000/api/pico/commands", {
  //   cache: "no-store",
  // })
  // const commandData = (await commandResponse.json()) as CommandRegistry
  // console.log("The API returned:", commandData)
  // const commandList: Command[] = commandData.commandList.map((cmd) => ({
  //   id: cmd.id,
  //   macAddress: cmd.macAddress,
  //   read: cmd.read,
  //   createdAt: new Date(cmd.createdAt),
  //   data: JSON.parse(cmd.data),
  // }))
  // console.log("Formatted commands:", commandList)
  const commands = await prisma.commands.findMany()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Command Queue</h1>
        <p className="text-muted-foreground">Monitor and manage all Robots in the system</p>
      </div>
      {/* <Filters /> */}

      {/* Pico Grid */}
      <CommandList commands={commands} />
    </div>
  )
}
