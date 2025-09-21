"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  Home, 
  Calendar, 
  Users, 
  Settings, 
  BarChart3, 
  CreditCard,
  Scissors,
  Package
} from "lucide-react"

const navigationItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Prenotazioni",
    href: "/dashboard/bookings",
    icon: Calendar,
  },
  {
    name: "Clienti",
    href: "/dashboard/clients",
    icon: Users,
  },
  {
    name: "Servizi",
    href: "/dashboard/services",
    icon: Scissors,
  },
  {
    name: "Staff",
    href: "/dashboard/staff",
    icon: Package,
  },
  {
    name: "Pagamenti",
    href: "/dashboard/payments",
    icon: CreditCard,
  },
  {
    name: "Report",
    href: "/dashboard/reports",
    icon: BarChart3,
  },
  {
    name: "Impostazioni",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4 mb-8">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <Scissors className="w-5 h-5 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">SalonPro</span>
            </div>
          </div>
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-purple-100 text-purple-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <item.icon
                    className={cn(
                      "mr-3 flex-shrink-0 h-5 w-5",
                      isActive ? "text-purple-600" : "text-gray-400 group-hover:text-gray-500"
                    )}
                  />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </div>
  )
}