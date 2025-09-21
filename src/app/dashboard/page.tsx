"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import { Calendar, Users, DollarSign, TrendingUp, Clock, Phone, Mail, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import DashboardHeader from "@/components/dashboard/header"
import StatsCard from "@/components/dashboard/stats-card"
import RecentAppointments from "@/components/dashboard/recent-appointments"
import TodaySchedule from "@/components/dashboard/today-schedule"

export default function Dashboard() {
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === "loading") return
    
    if (!session) {
      redirect("/auth/signin")
    }
    
    setIsLoading(false)
  }, [session, status])

  if (isLoading || status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Caricamento dashboard...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  // Mock data for demo - in real app this would come from API
  const stats = {
    todayAppointments: 8,
    todayRevenue: 450,
    monthlyRevenue: 12500,
    activeClients: 156
  }

  const todaySchedule = [
    {
      id: "1",
      time: "09:00",
      client: "Laura Verdi", 
      service: "Taglio + Piega",
      duration: "1h",
      status: "completed" as const
    },
    {
      id: "2", 
      time: "10:30",
      client: "Marco Neri",
      service: "Taglio Uomo", 
      duration: "30min",
      status: "in_progress" as const
    },
    {
      id: "3",
      time: "11:30", 
      client: "Sofia Russo",
      service: "Colore",
      duration: "2h", 
      status: "scheduled" as const
    },
    {
      id: "4",
      time: "14:00",
      client: "Anna Bianchi", 
      service: "Meches",
      duration: "1.5h",
      status: "scheduled" as const
    }
  ]

  const recentClients = [
    {
      id: "1",
      name: "Laura Verdi",
      lastVisit: "Oggi",
      phone: "+39 335 1111111",
      totalVisits: 12
    },
    {
      id: "2", 
      name: "Marco Neri",
      lastVisit: "2 giorni fa",
      phone: "+39 335 2222222", 
      totalVisits: 8
    },
    {
      id: "3",
      name: "Sofia Russo", 
      lastVisit: "1 settimana fa",
      phone: "+39 335 3333333",
      totalVisits: 15
    }
  ]

  return (
    <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Buongiorno, {session.user.name}! 👋
          </h1>
          <p className="text-gray-600">
            Ecco una panoramica della tua giornata al {(session.user as any).salonName}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Appuntamenti Oggi"
            value={stats.todayAppointments.toString()}
            icon={Calendar}
            trend="+2 vs ieri"
            trendUp={true}
          />
          <StatsCard
            title="Incasso Oggi"
            value={`€${stats.todayRevenue}`}
            icon={DollarSign}
            trend="+15% vs ieri"
            trendUp={true}
          />
          <StatsCard
            title="Incasso Mensile"
            value={`€${stats.monthlyRevenue.toLocaleString()}`}
            icon={TrendingUp}
            trend="+8% vs mese scorso"
            trendUp={true}
          />
          <StatsCard
            title="Clienti Attivi"
            value={stats.activeClients.toString()}
            icon={Users}
            trend="+12 questo mese"
            trendUp={true}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Schedule */}
          <div className="lg:col-span-2">
            <TodaySchedule appointments={todaySchedule} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Clients */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Clienti Recenti</h3>
              <div className="space-y-4">
                {recentClients.map((client) => (
                  <div key={client.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{client.name}</p>
                      <p className="text-sm text-gray-500">{client.lastVisit} • {client.totalVisits} visite</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                Vedi Tutti i Clienti
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Azioni Rapide</h3>
              <div className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Nuovo Appuntamento
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Aggiungi Cliente
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Registra Pagamento
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Star className="h-4 w-4 mr-2" />
                  Invia Recensione
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
  )
}