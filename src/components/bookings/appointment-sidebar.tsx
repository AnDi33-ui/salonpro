"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Calendar, Clock, User, Phone, Mail, MapPin, MoreVertical, Edit, Trash2, CheckCircle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Appointment {
  id: string
  time: string
  clientName: string
  clientPhone: string
  clientEmail: string
  service: string
  duration: number
  price: number
  staffName: string
  status: "confirmed" | "pending" | "completed" | "cancelled"
  notes?: string
}

interface AppointmentSidebarProps {
  selectedDate: Date
  selectedAppointment: any
  onAppointmentSelect: (appointment: any) => void
}

export default function AppointmentSidebar({
  selectedDate,
  selectedAppointment,
  onAppointmentSelect
}: AppointmentSidebarProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      time: "09:00",
      clientName: "Maria Rossi",
      clientPhone: "+39 333 123 4567",
      clientEmail: "maria.rossi@email.com",
      service: "Taglio e Piega",
      duration: 60,
      price: 45,
      staffName: "Anna",
      status: "confirmed",
      notes: "Cliente abituale, preferisce taglio corto"
    },
    {
      id: "2",
      time: "10:30",
      clientName: "Giulia Bianchi",
      clientPhone: "+39 333 765 4321",
      clientEmail: "giulia.bianchi@email.com",
      service: "Colore Completo",
      duration: 120,
      price: 85,
      staffName: "Laura",
      status: "pending",
      notes: "Prima volta, allergia alla tinta ammoniaca"
    },
    {
      id: "3",
      time: "14:00",
      clientName: "Francesca Verdi",
      clientPhone: "+39 333 987 6543",
      clientEmail: "francesca.verdi@email.com",
      service: "Permanente",
      duration: 120,
      price: 70,
      staffName: "Anna",
      status: "confirmed"
    },
    {
      id: "4",
      time: "16:00",
      clientName: "Elena Blu",
      clientPhone: "+39 333 456 7890",
      clientEmail: "elena.blu@email.com",
      service: "Messa in Piega",
      duration: 45,
      price: 35,
      staffName: "Laura",
      status: "completed"
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Confermato"
      case "pending":
        return "In Attesa"
      case "completed":
        return "Completato"
      case "cancelled":
        return "Annullato"
      default:
        return status
    }
  }

  const handleStatusChange = (appointmentId: string, newStatus: string) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === appointmentId 
          ? { ...apt, status: newStatus as any }
          : apt
      )
    )
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          {selectedDate.toLocaleDateString('it-IT', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          {appointments.length} appuntamenti programmati
        </p>
      </div>

      {/* Lista appuntamenti */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          {appointments.map((appointment) => (
            <Card 
              key={appointment.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedAppointment?.id === appointment.id 
                  ? 'ring-2 ring-blue-500 border-blue-200' 
                  : ''
              }`}
              onClick={() => onAppointmentSelect(appointment)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="font-semibold text-gray-900">
                      {appointment.time}
                    </span>
                    <Badge className={getStatusColor(appointment.status)}>
                      {getStatusText(appointment.status)}
                    </Badge>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        Modifica
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleStatusChange(appointment.id, "completed")}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Segna Completato
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Elimina
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">
                    {appointment.clientName}
                  </h4>
                  
                  <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {appointment.clientPhone}
                    </div>
                    <div className="flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {appointment.clientEmail}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-100">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{appointment.service}</span>
                      <span className="text-green-600 font-semibold">€{appointment.price}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {appointment.staffName}
                      </div>
                      <span>{appointment.duration} min</span>
                    </div>
                  </div>

                  {appointment.notes && (
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-xs text-gray-600 italic">
                        📝 {appointment.notes}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          {appointments.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>Nessun appuntamento per questa data</p>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Footer con totali */}
      {appointments.length > 0 && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Totale appuntamenti:</span>
              <span className="font-semibold">{appointments.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Fatturato previsto:</span>
              <span className="font-semibold text-green-600">
                €{appointments.reduce((sum, apt) => sum + apt.price, 0)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tempo totale:</span>
              <span className="font-semibold">
                {Math.floor(appointments.reduce((sum, apt) => sum + apt.duration, 0) / 60)}h {appointments.reduce((sum, apt) => sum + apt.duration, 0) % 60}m
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}