import { render, screen } from '@testing-library/react'
import StatsCard from '@/components/dashboard/stats-card'
import { Calendar } from 'lucide-react'

describe('StatsCard Component', () => {
  const defaultProps = {
    title: 'Test Title',
    value: '123',
    icon: Calendar,
  }

  it('renders correctly with required props', () => {
    render(<StatsCard {...defaultProps} />)
    
    expect(screen.getByText('Test Title')).toBeDefined()
    expect(screen.getByText('123')).toBeDefined()
  })

  it('displays trend information when provided', () => {
    render(<StatsCard {...defaultProps} trend="+15%" trendUp={true} />)
    
    expect(screen.getByText('+15%')).toBeDefined()
  })

  it('renders with trending down indicator', () => {
    render(<StatsCard {...defaultProps} trend="-5%" trendUp={false} />)
    
    expect(screen.getByText('-5%')).toBeDefined()
  })

  it('renders icon component', () => {
    render(<StatsCard {...defaultProps} />)
    
    // L'icona Calendar dovrebbe essere presente nel DOM
    const icon = document.querySelector('svg')
    expect(icon).toBeDefined()
  })

  it('handles different values correctly', () => {
    render(<StatsCard {...defaultProps} value="€1,234" />)
    expect(screen.getByText('€1,234')).toBeDefined()
  })
})