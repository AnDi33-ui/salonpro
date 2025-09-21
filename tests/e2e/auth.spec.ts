import { test, expect } from '@playwright/test'

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should redirect to login when accessing protected routes', async ({ page }) => {
    await page.goto('/dashboard')
    
    // Dovrebbe essere reindirizzato al login
    await expect(page).toHaveURL(/.*signin.*/)
  })

  test('should login successfully with valid credentials', async ({ page }) => {
    await page.goto('/auth/signin')
    
    // Inserisci le credenziali
    await page.fill('input[name="email"]', 'demo@salonpro.it')
    await page.fill('input[name="password"]', 'demo123')
    
    // Clicca sul pulsante di login
    await page.click('button[type="submit"]')
    
    // Verifica che sia reindirizzato al dashboard
    await expect(page).toHaveURL('/dashboard')
    
    // Verifica che il nome utente sia presente
    await expect(page.locator('text=Buongiorno')).toBeVisible()
  })

  test('should show error with invalid credentials', async ({ page }) => {
    await page.goto('/auth/signin')
    
    // Inserisci credenziali errate
    await page.fill('input[name="email"]', 'wrong@email.com')
    await page.fill('input[name="password"]', 'wrongpassword')
    
    // Clicca sul pulsante di login
    await page.click('button[type="submit"]')
    
    // Verifica che sia mostrato un errore
    await expect(page.locator('text=Credenziali non valide')).toBeVisible()
  })

  test('should logout successfully', async ({ page }) => {
    // Prima fai login
    await page.goto('/auth/signin')
    await page.fill('input[name="email"]', 'demo@salonpro.it')
    await page.fill('input[name="password"]', 'demo123')
    await page.click('button[type="submit"]')
    
    // Aspetta di essere nel dashboard
    await expect(page).toHaveURL('/dashboard')
    
    // Fai logout
    await page.click('[data-testid="user-menu"]')
    await page.click('text=Logout')
    
    // Verifica di essere tornato alla home
    await expect(page).toHaveURL('/')
  })
})