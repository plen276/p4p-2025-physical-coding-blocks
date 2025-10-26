"use client"

import { useEffect } from "react"

export default function NotificationController() {
  useEffect(() => {
    const eventSource = new EventSource("api/notification")

    eventSource.onopen = () => {
      console.log("SSE connection opened")
    }

    const markAsRead = async (notificationId: number) => {
      const response = await fetch(`/api/notification/${notificationId}/read`, {
        method: "POST",
      })
    }
  })
}
