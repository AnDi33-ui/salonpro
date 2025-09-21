import { Button } from "@/components/ui/button"
import { Clock, User, MoreVertical } from "lucide-react"

interface Appointment {
  id: string
  time: string
  client: string
  service: string
  duration: string
  status: "scheduled" | "confirmed" | "in_progress" | "completed" | "cancelled"
}

interface TodayScheduleProps {
  appointments: Appointment[]
}

const getStatusColor = (status: Appointment["status"]) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800"
    case "in_progress":
      return "bg-blue-100 text-blue-800"
    case "confirmed":
      return "bg-purple-100 text-purple-800"
    case "scheduled":
      return "bg-yellow-100 text-yellow-800"
    case "cancelled":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getStatusText = (status: Appointment["status"]) => {
  switch (status) {
    case "completed":
      return "Completato"
    case "in_progress":
      return "In corso"
    case "confirmed":
      return "Confermato"
    case "scheduled":
      return "Programmato"
    case "cancelled":
      return "Annullato"
    default:
      return status
  }
}

export default function TodaySchedule({ appointments }: TodayScheduleProps) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Agenda di Oggi
          </h3>
          <Button variant="outline" size="sm">
            Visualizza Calendario
          </Button>
        </div>
      </div>
      
      <div className="divide-y divide-gray-200">
        {appointments.length === 0 ? (
          <div className="px-6 py-8 text-center">
            <Clock className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Nessun appuntamento</h3>
            <p className="mt-1 text-sm text-gray-500">
              Non ci sono appuntamenti programmati per oggi.
            </p>
            <Button className="mt-4">
              Prenota Appuntamento
            </Button>
          </div>
        ) : (
          appointments.map((appointment) => (
            <div key={appointment.id} className="px-6 py-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <User className="h-5 w-5 text-purple-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {appointment.client}
                      </p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                        {getStatusText(appointment.status)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>{appointment.time}</span>
                      <span>•</span>
                      <span>{appointment.service}</span>
                      <span>•</span>
                      <span>{appointment.duration}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {appointment.status === "scheduled" && (
                    <>
                      <Button size="sm" variant="outline">
                        Conferma
                      </Button>
                      <Button size="sm">
                        Inizia
                      </Button>
                    </>
                  )}
                  {appointment.status === "confirmed" && (
                    <Button size="sm">
                      Inizia
                    </Button>
                  )}
                  {appointment.status === "in_progress" && (
                    <Button size="sm">
                      Completa
                    </Button>
                  )}
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}