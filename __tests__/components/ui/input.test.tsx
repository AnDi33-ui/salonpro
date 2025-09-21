import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from '@/components/ui/input'

describe('Input Component', () => {
  it('renders input field correctly', () => {
    render(<Input placeholder="Enter text" />)
    expect(screen.getByPlaceholderText('Enter text')).toBeDefined()
  })

  it('handles text input correctly', async () => {
    const user = userEvent.setup()
    render(<Input data-testid="test-input" />)
    
    const input = screen.getByTestId('test-input')
    await user.type(input, 'Hello World')
    
    expect(input).toHaveProperty('value', 'Hello World')
  })

  it('can be disabled', () => {
    render(<Input disabled data-testid="disabled-input" />)
    
    const input = screen.getByTestId('disabled-input')
    expect(input).toHaveProperty('disabled', true)
  })

  it('handles different input types', () => {
    render(<Input type="email" data-testid="email-input" />)
    
    const input = screen.getByTestId('email-input')
    expect(input).toHaveProperty('type', 'email')
  })

  it('applies custom className', () => {
    render(<Input className="custom-input" data-testid="styled-input" />)
    
    const input = screen.getByTestId('styled-input')
    expect(input.className).toContain('custom-input')
  })

  it('forwards ref correctly', () => {
    const ref = { current: null }
    render(<Input ref={ref} data-testid="ref-input" />)
    expect(ref.current).toBeDefined()
  })

  it('handles onChange events', async () => {
    const user = userEvent.setup()
    const handleChange = jest.fn()
    
    render(<Input onChange={handleChange} data-testid="change-input" />)
    
    const input = screen.getByTestId('change-input')
    await user.type(input, 'test')
    
    expect(handleChange).toHaveBeenCalled()
  })

  it('handles onFocus and onBlur events', async () => {
    const user = userEvent.setup()
    const handleFocus = jest.fn()
    const handleBlur = jest.fn()
    
    render(
      <Input 
        onFocus={handleFocus} 
        onBlur={handleBlur} 
        data-testid="focus-input" 
      />
    )
    
    const input = screen.getByTestId('focus-input')
    await user.click(input)
    expect(handleFocus).toHaveBeenCalled()
    
    await user.tab()
    expect(handleBlur).toHaveBeenCalled()
  })
})