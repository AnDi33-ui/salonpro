import { render, screen } from '@testing-library/react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

describe('Card Components', () => {
  describe('Card', () => {
    it('renders card with children', () => {
      render(
        <Card>
          <div data-testid="card-content">Card content</div>
        </Card>
      )
      
      expect(screen.getByTestId('card-content')).toBeDefined()
    })

    it('applies custom className', () => {
      render(
        <Card className="custom-class">
          <div>Content</div>
        </Card>
      )
      
      const card = screen.getByText('Content').parentElement
      expect(card).toHaveClass('custom-class')
    })
  })

  describe('CardHeader', () => {
    it('renders header content', () => {
      render(
        <CardHeader>
          <div data-testid="header-content">Header</div>
        </CardHeader>
      )
      
      expect(screen.getByTestId('header-content')).toBeDefined()
    })
  })

  describe('CardTitle', () => {
    it('renders title text', () => {
      render(<CardTitle>Test Title</CardTitle>)
      expect(screen.getByText('Test Title')).toBeDefined()
    })
  })

  describe('CardDescription', () => {
    it('renders description text', () => {
      render(<CardDescription>Test Description</CardDescription>)
      expect(screen.getByText('Test Description')).toBeDefined()
    })
  })

  describe('CardContent', () => {
    it('renders content', () => {
      render(
        <CardContent>
          <p data-testid="content">Card content</p>
        </CardContent>
      )
      
      expect(screen.getByTestId('content')).toBeDefined()
    })
  })

  describe('CardFooter', () => {
    it('renders footer content', () => {
      render(
        <CardFooter>
          <button data-testid="footer-button">Action</button>
        </CardFooter>
      )
      
      expect(screen.getByTestId('footer-button')).toBeDefined()
    })
  })

  describe('Complete Card', () => {
    it('renders full card structure', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card content goes here</p>
          </CardContent>
          <CardFooter>
            <button>Action Button</button>
          </CardFooter>
        </Card>
      )
      
      expect(screen.getByText('Card Title')).toBeDefined()
      expect(screen.getByText('Card Description')).toBeDefined()
      expect(screen.getByText('Card content goes here')).toBeDefined()
      expect(screen.getByText('Action Button')).toBeDefined()
    })
  })
})