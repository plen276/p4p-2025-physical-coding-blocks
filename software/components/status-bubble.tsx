"use client"

type StatusBubbleProps = {
  status: "online" | "offline"
}

export const StatusBubble = ({ status }: StatusBubbleProps) => {
  if (status === "online") {
    return (
      <div className="relative inline-flex">
        <div className="mr-2 inline-block h-[8px] w-[8px] rounded-full bg-green-400"></div>
        <div className="absolute mr-2 h-[8px] w-[8px] animate-ping rounded-full bg-green-400"></div>
      </div>
    )
  }

  return <div className="h-[8px] w-[8px] animate-pulse rounded-full bg-gray-500" />
}
