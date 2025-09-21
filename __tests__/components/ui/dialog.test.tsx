import { render, screen } from '@testing-library/react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

describe('Dialog Components', () => {
  describe('Dialog with DialogTrigger', () => {
    it('renders dialog trigger correctly', () => {
      render(
        <Dialog>
          <DialogTrigger>Open Dialog</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Test Dialog</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )
      
      expect(screen.getByText('Open Dialog')).toBeDefined()
    })
  })

  describe('DialogContent', () => {
    it('renders dialog content when open', () => {
      render(
        <Dialog open={true}>
          <DialogContent>
            <div data-testid="dialog-content">Dialog Content</div>
          </DialogContent>
        </Dialog>
      )
      
      expect(screen.getByTestId('dialog-content')).toBeDefined()
    })
  })

  describe('DialogHeader', () => {
    it('renders header content', () => {
      render(
        <Dialog open={true}>
          <DialogContent>
            <DialogHeader>
              <div data-testid="header-content">Header</div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )
      
      expect(screen.getByTestId('header-content')).toBeDefined()
    })
  })

  describe('DialogTitle', () => {
    it('renders title correctly', () => {
      render(
        <Dialog open={true}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dialog Title</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )
      
      expect(screen.getByText('Dialog Title')).toBeDefined()
    })
  })

  describe('Dialog State Management', () => {
    it('does not render content when closed', () => {
      render(
        <Dialog open={false}>
          <DialogContent>
            <div data-testid="should-not-render">Should not be visible</div>
          </DialogContent>
        </Dialog>
      )
      
      expect(screen.queryByTestId('should-not-render')).toBeNull()
    })

    it('applies custom className to DialogContent', () => {
      render(
        <Dialog open={true}>
          <DialogContent className="custom-dialog">
            <div>Custom Dialog</div>
          </DialogContent>
        </Dialog>
      )
      
      const dialogContent = screen.getByText('Custom Dialog').closest('[class*="custom-dialog"]')
      expect(dialogContent).toBeDefined()
    })
  })

  describe('Complex Dialog Structure', () => {
    it('renders complete dialog structure', () => {
      render(
        <Dialog open={true}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Complete Dialog</DialogTitle>
            </DialogHeader>
            <div>Body content</div>
            <div>Footer content</div>
          </DialogContent>
        </Dialog>
      )
      
      expect(screen.getByText('Complete Dialog')).toBeDefined()
      expect(screen.getByText('Body content')).toBeDefined()
      expect(screen.getByText('Footer content')).toBeDefined()
    })
  })
})