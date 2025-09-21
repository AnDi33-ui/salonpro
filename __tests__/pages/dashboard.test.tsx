import { render, screen } from '@testing-library/react'
import { useSession } from 'next-auth/react'
import Dashboard from '@/app/dashboard/page'

// Mock delle dipendenze
jest.mock('next-auth/react')

jest.mock('@/components/dashboard/stats-card', () => {
  return function MockStatsCard({ title, value }: any) {
    return <div data-testid="stats-card">{title}: {value}</div>
  }
})

jest.mock('@/components/dashboard/today-schedule', () => {
  return function MockTodaySchedule() {
    return <div data-testid="today-schedule">Today Schedule</div>
  }
})

const mockUseSession = useSession as jest.MockedFunction<typeof useSession>

describe('Dashboard Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('shows loading state when session is loading', () => {
    mockUseSession.mockReturnValue({
      data: null,
      status: 'loading',
      update: jest.fn(),
    })

    render(<Dashboard />)
    
    expect(screen.getByText('Caricamento dashboard...')).toBeDefined()
  })

  it('renders dashboard when user is authenticated', () => {
    const mockSession = {
      user: {
        name: 'Mario Rossi',
        email: 'mario@salonpro.it',
        salonName: 'Salone Test'
      },
      expires: '2025-12-31'
    }

    mockUseSession.mockReturnValue({
      data: mockSession,
      status: 'authenticated',
      update: jest.fn(),
    })

    render(<Dashboard />)
    
    // Verifica che gli elementi principali siano presenti
    expect(screen.getByText('Buongiorno, Mario Rossi! 👋')).toBeDefined()
    
    // Verifica che le stats cards siano presenti
    const statsCards = screen.getAllByTestId('stats-card')
    expect(statsCards).toHaveLength(4)
    
    // Verifica che lo schedule sia presente
    expect(screen.getByTestId('today-schedule')).toBeDefined()
  })

  it('displays correct stats values', () => {
    const mockSession = {
      user: {
        name: 'Mario Rossi',
        email: 'mario@salonpro.it',
        salonName: 'Salone Test'
      },
      expires: '2025-12-31'
    }

    mockUseSession.mockReturnValue({
      data: mockSession,
      status: 'authenticated',
      update: jest.fn(),
    })

    render(<Dashboard />)
    
    // Verifica i valori delle statistiche
    expect(screen.getByText('Appuntamenti Oggi: 8')).toBeDefined()
    expect(screen.getByText('Incasso Oggi: €450')).toBeDefined()
    expect(screen.getByText('Incasso Mensile: €12.500')).toBeDefined()
    expect(screen.getByText('Clienti Attivi: 156')).toBeDefined()
  })

  it('shows salon name in welcome message', () => {
    const mockSession = {
      user: {
        name: 'Mario Rossi',
        email: 'mario@salonpro.it',
        salonName: 'Salone Bellezza'
      },
      expires: '2025-12-31'
    }

    mockUseSession.mockReturnValue({
      data: mockSession,
      status: 'authenticated',
      update: jest.fn(),
    })

    render(<Dashboard />)
    
    expect(screen.getByText(/Salone Bellezza/)).toBeDefined()
  })
})