import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Textarea } from '@/components/ui/textarea'

describe('Textarea Component', () => {
  it('renders textarea with placeholder correctly', () => {
    render(<Textarea placeholder="Enter your message" />)
    expect(screen.getByPlaceholderText('Enter your message')).toBeDefined()
  })

  it('handles text input correctly', async () => {
    const user = userEvent.setup()
    render(<Textarea data-testid="test-textarea" />)
    
    const textarea = screen.getByTestId('test-textarea')
    await user.type(textarea, 'Hello World\nMultiple lines')
    
    expect(textarea).toHaveProperty('value', 'Hello World\nMultiple lines')
  })

  it('can be disabled', () => {
    render(<Textarea disabled data-testid="disabled-textarea" />)
    
    const textarea = screen.getByTestId('disabled-textarea')
    expect(textarea).toHaveProperty('disabled', true)
  })

  it('applies custom className', () => {
    render(<Textarea className="custom-textarea" data-testid="styled-textarea" />)
    
    const textarea = screen.getByTestId('styled-textarea')
    expect(textarea.className).toContain('custom-textarea')
  })

  it('forwards ref correctly', () => {
    const ref = { current: null }
    render(<Textarea ref={ref} data-testid="ref-textarea" />)
    expect(ref.current).toBeDefined()
  })

  it('handles onChange events', async () => {
    const user = userEvent.setup()
    const handleChange = jest.fn()
    
    render(<Textarea onChange={handleChange} data-testid="change-textarea" />)
    
    const textarea = screen.getByTestId('change-textarea')
    await user.type(textarea, 'test')
    
    expect(handleChange).toHaveBeenCalled()
  })

  it('handles rows prop', () => {
    render(<Textarea rows={5} data-testid="rows-textarea" />)
    
    const textarea = screen.getByTestId('rows-textarea')
    expect(textarea).toHaveProperty('rows', 5)
  })

  it('handles maxLength prop', () => {
    render(<Textarea maxLength={100} data-testid="maxlength-textarea" />)
    
    const textarea = screen.getByTestId('maxlength-textarea')
    expect(textarea).toHaveProperty('maxLength', 100)
  })

  it('renders as textarea element', () => {
    render(<Textarea data-testid="textarea-element">Content</Textarea>)
    const textarea = screen.getByTestId('textarea-element')
    expect(textarea.tagName.toLowerCase()).toBe('textarea')
  })
})