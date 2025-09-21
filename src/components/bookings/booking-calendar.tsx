"use client"

import { useState, useEffect } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Calendar, Clock, User } from "lucide-react"

interface Appointment {
  id: string
  title: string
  start: string
  end: string
  clientName: string
  clientPhone: string
  service: string
  staffName: string
  status: "confirmed" | "pending" | "completed" | "cancelled"
  notes?: string
}

interface BookingCalendarProps {
  selectedDate: Date
  onDateSelect: (date: Date) => void
  onAppointmentSelect: (appointment: any) => void
}

export default function BookingCalendar({
  selectedDate,
  onDateSelect,
  onAppointmentSelect
}: BookingCalendarProps) {
  const [view, setView] = useState("dayGridMonth")
  const [appointments, setAppointments] = useState<Appointment[]>([])

  // Dati di esempio per gli appuntamenti
  useEffect(() => {
    const sampleAppointments: Appointment[] = [
      {
        id: "1",
        title: "Maria Rossi - Taglio",
        start: "2024-12-28T09:00:00",
        end: "2024-12-28T10:00:00",
        clientName: "Maria Rossi",
        clientPhone: "+39 333 123 4567",
        service: "Taglio e Piega",
        staffName: "Anna",
        status: "confirmed"
      },
      {
        id: "2",
        title: "Giulia Bianchi - Colore",
        start: "2024-12-28T10:30:00",
        end: "2024-12-28T12:30:00",
        clientName: "Giulia Bianchi",
        clientPhone: "+39 333 765 4321",
        service: "Colore Completo",
        staffName: "Laura",
        status: "pending"
      },
      {
        id: "3",
        title: "Francesca Verdi - Permanente",
        start: "2024-12-28T14:00:00",
        end: "2024-12-28T16:00:00",
        clientName: "Francesca Verdi",
        clientPhone: "+39 333 987 6543",
        service: "Permanente",
        staffName: "Anna",
        status: "confirmed"
      },
      {
        id: "4",
        title: "Elena Blu - Messa in Piega",
        start: "2024-12-29T09:30:00",
        end: "2024-12-29T10:30:00",
        clientName: "Elena Blu",
        clientPhone: "+39 333 456 7890",
        service: "Messa in Piega",
        staffName: "Laura",
        status: "confirmed"
      },
      {
        id: "5",
        title: "Carla Neri - Taglio",
        start: "2024-12-29T11:00:00",
        end: "2024-12-29T12:00:00",
        clientName: "Carla Neri",
        clientPhone: "+39 333 111 2222",
        service: "Taglio Uomo",
        staffName: "Anna",
        status: "pending"
      }
    ]
    setAppointments(sampleAppointments)
  }, [])

  const getEventColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "#10b981" // verde
      case "pending":
        return "#f59e0b" // giallo
      case "completed":
        return "#3b82f6" // blu
      case "cancelled":
        return "#ef4444" // rosso
      default:
        return "#6b7280" // grigio
    }
  }

  const handleDateClick = (dateInfo: any) => {
    onDateSelect(new Date(dateInfo.date))
  }

  const handleEventClick = (eventInfo: any) => {
    const appointment = appointments.find(apt => apt.id === eventInfo.event.id)
    if (appointment) {
      onAppointmentSelect(appointment)
    }
  }

  const renderEventContent = (eventInfo: any) => {
    const appointment = appointments.find(apt => apt.id === eventInfo.event.id)
    if (!appointment) return null

    return (
      <div className="p-1">
        <div className="text-xs font-medium truncate">
          {appointment.clientName}
        </div>
        <div className="text-xs text-gray-200 truncate">
          {appointment.service}
        </div>
        <div className="text-xs text-gray-200 flex items-center gap-1">
          <User className="w-3 h-3" />
          {appointment.staffName}
        </div>
      </div>
    )
  }

  const events = appointments.map(apt => ({
    id: apt.id,
    title: apt.title,
    start: apt.start,
    end: apt.end,
    backgroundColor: getEventColor(apt.status),
    borderColor: getEventColor(apt.status),
    textColor: "white"
  }))

  return (
    <Card className="p-6">
      {/* Header del calendario */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-gray-900">Calendario Appuntamenti</h2>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-green-600 border-green-600">
              <div className="w-2 h-2 bg-green-600 rounded-full mr-1"></div>
              Confermato
            </Badge>
            <Badge variant="outline" className="text-yellow-600 border-yellow-600">
              <div className="w-2 h-2 bg-yellow-600 rounded-full mr-1"></div>
              In Attesa
            </Badge>
            <Badge variant="outline" className="text-blue-600 border-blue-600">
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-1"></div>
              Completato
            </Badge>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant={view === "dayGridMonth" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("dayGridMonth")}
          >
            Mese
          </Button>
          <Button
            variant={view === "timeGridWeek" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("timeGridWeek")}
          >
            Settimana
          </Button>
          <Button
            variant={view === "timeGridDay" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("timeGridDay")}
          >
            Giorno
          </Button>
        </div>
      </div>

      {/* Calendario */}
      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={view}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: ""
          }}
          events={events}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          eventContent={renderEventContent}
          height="auto"
          locale="it"
          buttonText={{
            today: "Oggi",
            month: "Mese",
            week: "Settimana",
            day: "Giorno"
          }}
          slotMinTime="08:00:00"
          slotMaxTime="20:00:00"
          businessHours={{
            daysOfWeek: [1, 2, 3, 4, 5, 6], // Lunedì-Sabato
            startTime: "09:00",
            endTime: "19:00"
          }}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          eventDisplay="block"
          displayEventTime={true}
        />
      </div>

      <style jsx global>{`
        .fc-theme-standard td, .fc-theme-standard th {
          border: 1px solid #e5e7eb;
        }
        .fc-daygrid-event {
          border-radius: 4px;
          font-size: 12px;
        }
        .fc-event-title {
          font-weight: 500;
        }
        .fc-toolbar-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1f2937;
        }
        .fc-button-primary {
          background-color: #3b82f6;
          border-color: #3b82f6;
        }
        .fc-button-primary:hover {
          background-color: #2563eb;
          border-color: #2563eb;
        }
        .fc-today-button {
          background-color: #6b7280;
          border-color: #6b7280;
        }
      `}</style>
    </Card>
  )
}