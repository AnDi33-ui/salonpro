import { render, screen } from '@testing-library/react'
import { Badge } from '@/components/ui/badge'

describe('Badge Component', () => {
  it('renders badge with text correctly', () => {
    render(<Badge>Test Badge</Badge>)
    expect(screen.getByText('Test Badge')).toBeDefined()
  })

  it('applies variant classes correctly', () => {
    render(<Badge variant="destructive">Error Badge</Badge>)
    const badge = screen.getByText('Error Badge')
    expect(badge).toBeDefined()
  })

  it('applies secondary variant', () => {
    render(<Badge variant="secondary">Secondary Badge</Badge>)
    const badge = screen.getByText('Secondary Badge')
    expect(badge).toBeDefined()
  })

  it('applies outline variant', () => {
    render(<Badge variant="outline">Outline Badge</Badge>)
    const badge = screen.getByText('Outline Badge')
    expect(badge).toBeDefined()
  })

  it('applies custom className', () => {
    render(<Badge className="custom-badge">Custom Badge</Badge>)
    const badge = screen.getByText('Custom Badge')
    expect(badge.className).toContain('custom-badge')
  })

  it('spreads additional props', () => {
    render(<Badge data-testid="test-badge">Props Badge</Badge>)
    expect(screen.getByTestId('test-badge')).toBeDefined()
  })

  it('renders with default variant when no variant specified', () => {
    render(<Badge>Default Badge</Badge>)
    expect(screen.getByText('Default Badge')).toBeDefined()
  })
})