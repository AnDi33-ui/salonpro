"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import BookingCalendar from "@/components/bookings/booking-calendar"
import AppointmentSidebar from "@/components/bookings/appointment-sidebar"
import QuickBooking from "@/components/bookings/quick-booking"
import BookingStats from "@/components/bookings/booking-stats"
import { Button } from "@/components/ui/button"
import { Calendar, Plus, Filter, Download } from "lucide-react"

export default function BookingsPage() {
  const { data: session, status } = useSession()
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showQuickBooking, setShowQuickBooking] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState(null)

  if (status === "loading") {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  }

  if (!session) {
    return <div>Accesso negato</div>
  }

  return (
    <>
      {/* Header della pagina */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Sistema Prenotazioni</h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filtri
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Esporta
            </Button>
            <Button 
              onClick={() => setShowQuickBooking(true)}
              size="sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nuovo Appuntamento
            </Button>
          </div>
        </div>
      </div>

      {/* Statistiche rapide */}
      <div className="p-6">
        <BookingStats />
      </div>

      {/* Contenuto principale */}
      <div className="flex-1 flex">
        {/* Calendario principale */}
        <div className="flex-1 p-6">
          <BookingCalendar
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            onAppointmentSelect={setSelectedAppointment}
          />
        </div>

        {/* Sidebar degli appuntamenti */}
        <div className="w-80 bg-white border-l border-gray-200">
          <AppointmentSidebar
            selectedDate={selectedDate}
            selectedAppointment={selectedAppointment}
            onAppointmentSelect={setSelectedAppointment}
          />
        </div>
      </div>

      {/* Modal per prenotazione rapida */}
      {showQuickBooking && (
        <QuickBooking
          isOpen={showQuickBooking}
          onClose={() => setShowQuickBooking(false)}
          selectedDate={selectedDate}
        />
      )}
    </>
  )
}