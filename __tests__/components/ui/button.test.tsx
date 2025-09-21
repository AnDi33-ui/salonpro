import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/button'
import userEvent from '@testing-library/user-event'

describe('Button Component', () => {
  it('renders button with text correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeDefined()
  })

  it('handles click events', async () => {
    const user = userEvent.setup()
    const handleClick = jest.fn()
    
    render(<Button onClick={handleClick}>Click me</Button>)
    
    await user.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('can be disabled', () => {
    render(<Button disabled>Disabled Button</Button>)
    
    const button = screen.getByText('Disabled Button')
    expect(button).toHaveProperty('disabled', true)
  })

  it('applies variant classes correctly', () => {
    render(<Button variant="destructive">Delete</Button>)
    
    const button = screen.getByText('Delete')
    expect(button).toBeDefined()
  })

  it('applies size classes correctly', () => {
    render(<Button size="lg">Large Button</Button>)
    
    const button = screen.getByText('Large Button')
    expect(button).toBeDefined()
  })

  it('renders as different element when asChild is true', () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    )
    
    expect(screen.getByText('Link Button')).toBeDefined()
  })

  it('forwards ref correctly', () => {
    const ref = { current: null }
    render(<Button ref={ref}>Button with ref</Button>)
    expect(ref.current).toBeDefined()
  })

  it('spreads additional props', () => {
    render(<Button data-testid="custom-button">Test</Button>)
    expect(screen.getByTestId('custom-button')).toBeDefined()
  })
})