"use client"

import { useSession } from "next-auth/react"
import Sidebar from "@/components/dashboard/sidebar"
import DashboardHeader from "@/components/dashboard/header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="md:pl-64">
        <DashboardHeader user={session?.user || { name: "", email: "" }} />
        {children}
      </div>
    </div>
  )
}