import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, Clock, TrendingUp, DollarSign, CheckCircle } from "lucide-react"

interface StatCard {
  title: string
  value: string | number
  change?: string
  icon: React.ComponentType<any>
  color: string
}

export default function BookingStats() {
  const stats: StatCard[] = [
    {
      title: "Appuntamenti Oggi",
      value: "12",
      change: "+2",
      icon: Calendar,
      color: "text-blue-600"
    },
    {
      title: "Clienti Serviti",
      value: "8",
      change: "+1",
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "Tempo Medio Attesa",
      value: "15min",
      change: "-5min",
      icon: Clock,
      color: "text-orange-600"
    },
    {
      title: "Tasso Completamento",
      value: "92%",
      change: "+3%",
      icon: CheckCircle,
      color: "text-purple-600"
    },
    {
      title: "Fatturato Giornaliero",
      value: "€485",
      change: "+€65",
      icon: DollarSign,
      color: "text-emerald-600"
    },
    {
      title: "Prenotazioni Settimana",
      value: "67",
      change: "+12",
      icon: TrendingUp,
      color: "text-indigo-600"
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              {stat.change && (
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-600 font-medium">{stat.change}</span> da ieri
                </p>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}