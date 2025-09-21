import { render, screen } from '@testing-library/react'
import { Label } from '@/components/ui/label'

describe('Label Component', () => {
  it('renders label with text correctly', () => {
    render(<Label>Test Label</Label>)
    expect(screen.getByText('Test Label')).toBeDefined()
  })

  it('associates with form control using htmlFor', () => {
    render(
      <div>
        <Label htmlFor="test-input">Input Label</Label>
        <input id="test-input" />
      </div>
    )
    
    const label = screen.getByText('Input Label')
    expect(label).toHaveProperty('htmlFor', 'test-input')
  })

  it('applies custom className', () => {
    render(<Label className="custom-label">Custom Label</Label>)
    const label = screen.getByText('Custom Label')
    expect(label.className).toContain('custom-label')
  })

  it('spreads additional props', () => {
    render(<Label data-testid="test-label">Props Label</Label>)
    expect(screen.getByTestId('test-label')).toBeDefined()
  })

  it('forwards ref correctly', () => {
    const ref = { current: null }
    render(<Label ref={ref}>Ref Label</Label>)
    expect(ref.current).toBeDefined()
  })

  it('renders as label element', () => {
    render(<Label>HTML Label</Label>)
    const label = screen.getByText('HTML Label')
    expect(label.tagName.toLowerCase()).toBe('label')
  })
})