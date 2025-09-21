"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar, Clock, User, Phone, Mail, CreditCard, Save } from "lucide-react"

interface QuickBookingProps {
  isOpen: boolean
  onClose: () => void
  selectedDate: Date
}

interface FormData {
  clientName: string
  clientPhone: string
  clientEmail: string
  service: string
  staff: string
  date: string
  time: string
  duration: number
  price: number
  notes: string
}

export default function QuickBooking({
  isOpen,
  onClose,
  selectedDate
}: QuickBookingProps) {
  const [formData, setFormData] = useState<FormData>({
    clientName: "",
    clientPhone: "",
    clientEmail: "",
    service: "",
    staff: "",
    date: selectedDate.toISOString().split('T')[0],
    time: "",
    duration: 60,
    price: 0,
    notes: ""
  })

  const [isLoading, setIsLoading] = useState(false)

  // Dati di esempio per i servizi
  const services = [
    { id: "taglio", name: "Taglio", duration: 45, price: 35 },
    { id: "taglio-piega", name: "Taglio e Piega", duration: 60, price: 45 },
    { id: "colore", name: "Colore", duration: 90, price: 65 },
    { id: "colore-completo", name: "Colore Completo", duration: 120, price: 85 },
    { id: "meches", name: "Mèches", duration: 120, price: 75 },
    { id: "permanente", name: "Permanente", duration: 120, price: 70 },
    { id: "messa-piega", name: "Messa in Piega", duration: 45, price: 35 },
    { id: "trattamento", name: "Trattamento", duration: 30, price: 25 }
  ]

  // Staff disponibile
  const staff = [
    { id: "anna", name: "Anna Rossi", speciality: "Taglio e Colore" },
    { id: "laura", name: "Laura Bianchi", speciality: "Permanenti e Trattamenti" },
    { id: "sofia", name: "Sofia Verdi", speciality: "Styling" }
  ]

  // Orari disponibili (in ore militari)
  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30", "18:00", "18:30"
  ]

  const handleServiceChange = (serviceId: string) => {
    const service = services.find(s => s.id === serviceId)
    if (service) {
      setFormData(prev => ({
        ...prev,
        service: serviceId,
        duration: service.duration,
        price: service.price
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Qui implementeresti la logica per salvare l'appuntamento
      console.log("Nuovo appuntamento:", formData)
      
      // Simula una chiamata API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Reset form e chiudi modal
      setFormData({
        clientName: "",
        clientPhone: "",
        clientEmail: "",
        service: "",
        staff: "",
        date: selectedDate.toISOString().split('T')[0],
        time: "",
        duration: 60,
        price: 0,
        notes: ""
      })
      
      onClose()
    } catch (error) {
      console.error("Errore nel salvare l'appuntamento:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Nuovo Appuntamento
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informazioni Cliente */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User className="w-5 h-5" />
              Informazioni Cliente
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="clientName">Nome Cliente *</Label>
                <Input
                  id="clientName"
                  value={formData.clientName}
                  onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
                  placeholder="Mario Rossi"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="clientPhone">Telefono *</Label>
                <Input
                  id="clientPhone"
                  value={formData.clientPhone}
                  onChange={(e) => setFormData(prev => ({ ...prev, clientPhone: e.target.value }))}
                  placeholder="+39 333 123 4567"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="clientEmail">Email</Label>
              <Input
                id="clientEmail"
                type="email"
                value={formData.clientEmail}
                onChange={(e) => setFormData(prev => ({ ...prev, clientEmail: e.target.value }))}
                placeholder="mario.rossi@email.com"
              />
            </div>
          </div>

          {/* Dettagli Appuntamento */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Dettagli Appuntamento
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="service">Servizio *</Label>
                <Select 
                  value={formData.service} 
                  onValueChange={handleServiceChange}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona servizio" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service.id} value={service.id}>
                        {service.name} - €{service.price} ({service.duration} min)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="staff">Staff *</Label>
                <Select 
                  value={formData.staff} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, staff: value }))}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona operatore" />
                  </SelectTrigger>
                  <SelectContent>
                    {staff.map((person) => (
                      <SelectItem key={person.id} value={person.id}>
                        {person.name} - {person.speciality}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="date">Data *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="time">Orario *</Label>
                <Select 
                  value={formData.time} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, time: value }))}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Orario" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="price">Prezzo €</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
          </div>

          {/* Note */}
          <div>
            <Label htmlFor="notes">Note Aggiuntive</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Note speciali, allergie, preferenze cliente..."
              rows={3}
            />
          </div>

          {/* Riepilogo */}
          {formData.service && formData.staff && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Riepilogo Appuntamento</h4>
              <div className="text-sm space-y-1">
                <p><strong>Cliente:</strong> {formData.clientName}</p>
                <p><strong>Servizio:</strong> {services.find(s => s.id === formData.service)?.name}</p>
                <p><strong>Operatore:</strong> {staff.find(s => s.id === formData.staff)?.name}</p>
                <p><strong>Data e Ora:</strong> {new Date(formData.date).toLocaleDateString('it-IT')} alle {formData.time}</p>
                <p><strong>Durata:</strong> {formData.duration} minuti</p>
                <p><strong>Prezzo:</strong> €{formData.price}</p>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Annulla
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Salva Appuntamento
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}