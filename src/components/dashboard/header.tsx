"use client"

import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Scissors, Bell, Settings, LogOut, User } from "lucide-react"

interface DashboardHeaderProps {
  user: {
    name?: string | null
    email?: string | null
    salonName?: string
  }
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <Scissors className="h-8 w-8 text-purple-600" />
              <div>
                <span className="text-xl font-bold text-gray-900">SalonPro</span>
                <p className="text-xs text-gray-500">{user.salonName}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="/dashboard" className="text-purple-600 hover:text-purple-500 px-3 py-2 text-sm font-medium">
              Dashboard
            </a>
            <a href="/dashboard/appointments" className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium">
              Appuntamenti
            </a>
            <a href="/dashboard/clients" className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium">
              Clienti
            </a>
            <a href="/dashboard/services" className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium">
              Servizi
            </a>
            <a href="/dashboard/reports" className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium">
              Report
            </a>
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="h-5 w-5" />
            </Button>
            
            <div className="relative group">
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span className="hidden sm:block">{user.name}</span>
              </Button>
              
              {/* Dropdown menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <a href="/dashboard/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Profilo
                </a>
                <a href="/dashboard/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <Settings className="h-4 w-4 inline mr-2" />
                  Impostazioni
                </a>
                <hr className="my-1" />
                <button
                  onClick={() => signOut()}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <LogOut className="h-4 w-4 inline mr-2" />
                  Esci
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}