import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BookingStats from '@/components/bookings/booking-stats'

// Mock dei moduli esterni
jest.mock('@/components/ui/card', () => ({
  Card: ({ children, className }: any) => <div className={className}>{children}</div>,
  CardContent: ({ children }: any) => <div>{children}</div>,
  CardHeader: ({ children }: any) => <div>{children}</div>,
  CardTitle: ({ children }: any) => <h3>{children}</h3>,
}))

describe('BookingStats Component', () => {
  it('renders all statistic cards', () => {
    render(<BookingStats />)
    
    // Verifica che tutte le statistiche siano presenti
    expect(screen.getByText('Appuntamenti Oggi')).toBeDefined()
    expect(screen.getByText('Clienti Serviti')).toBeDefined()
    expect(screen.getByText('Tempo Medio Attesa')).toBeDefined()
    expect(screen.getByText('Tasso Completamento')).toBeDefined()
    expect(screen.getByText('Fatturato Giornaliero')).toBeDefined()
    expect(screen.getByText('Prenotazioni Settimana')).toBeDefined()
  })

  it('displays correct values for each metric', () => {
    render(<BookingStats />)
    
    expect(screen.getByText('12')).toBeDefined() // Appuntamenti oggi
    expect(screen.getByText('8')).toBeDefined()  // Clienti serviti
    expect(screen.getByText('15min')).toBeDefined() // Tempo attesa
    expect(screen.getByText('92%')).toBeDefined() // Tasso completamento
    expect(screen.getByText('€485')).toBeDefined() // Fatturato
    expect(screen.getByText('67')).toBeDefined() // Prenotazioni settimana
  })

  it('shows trend changes for metrics', () => {
    render(<BookingStats />)
    
    // Verifica che i trend siano visualizzati
    expect(screen.getByText('+2')).toBeDefined()
    expect(screen.getByText('+1')).toBeDefined()
    expect(screen.getByText('-5min')).toBeDefined()
    expect(screen.getByText('+3%')).toBeDefined()
    expect(screen.getByText('+€65')).toBeDefined()
    expect(screen.getByText('+12')).toBeDefined()
  })

  it('applies responsive grid layout', () => {
    const { container } = render(<BookingStats />)
    
    const gridContainer = container.firstChild as HTMLElement
    expect(gridContainer?.className).toContain('grid')
    expect(gridContainer?.className).toContain('grid-cols-1')
    expect(gridContainer?.className).toContain('md:grid-cols-2')
    expect(gridContainer?.className).toContain('lg:grid-cols-3')
    expect(gridContainer?.className).toContain('xl:grid-cols-6')
  })
})