import { test, expect } from '@playwright/test'

test.describe('Booking System', () => {
  test.beforeEach(async ({ page }) => {
    // Login prima di ogni test
    await page.goto('/auth/signin')
    await page.fill('input[name="email"]', 'demo@salonpro.it')
    await page.fill('input[name="password"]', 'demo123')
    await page.click('button[type="submit"]')
    await expect(page).toHaveURL('/dashboard')
  })

  test('should navigate to bookings page', async ({ page }) => {
    await page.click('text=Prenotazioni')
    await expect(page).toHaveURL('/dashboard/bookings')
    await expect(page.locator('h1:has-text("Sistema Prenotazioni")')).toBeVisible()
  })

  test('should display booking calendar', async ({ page }) => {
    await page.goto('/dashboard/bookings')
    
    // Verifica che il calendario sia presente
    await expect(page.locator('.fc-toolbar')).toBeVisible()
    await expect(page.locator('.fc-daygrid')).toBeVisible()
  })

  test('should show booking statistics', async ({ page }) => {
    await page.goto('/dashboard/bookings')
    
    // Verifica che le statistiche siano presenti
    await expect(page.locator('text=Appuntamenti Oggi')).toBeVisible()
    await expect(page.locator('text=Clienti Serviti')).toBeVisible()
    await expect(page.locator('text=Fatturato Giornaliero')).toBeVisible()
  })

  test('should open quick booking modal', async ({ page }) => {
    await page.goto('/dashboard/bookings')
    
    // Clicca sul pulsante "Nuovo Appuntamento"
    await page.click('text=Nuovo Appuntamento')
    
    // Verifica che il modal sia aperto
    await expect(page.locator('text=Nuovo Appuntamento')).toBeVisible()
    await expect(page.locator('text=Informazioni Cliente')).toBeVisible()
  })

  test('should create new appointment through quick booking', async ({ page }) => {
    await page.goto('/dashboard/bookings')
    
    // Apri il modal di prenotazione
    await page.click('text=Nuovo Appuntamento')
    
    // Compila il form
    await page.fill('input[name="clientName"]', 'Mario Rossi')
    await page.fill('input[name="clientPhone"]', '+39 333 123 4567')
    await page.fill('input[name="clientEmail"]', 'mario.rossi@email.com')
    
    // Seleziona servizio
    await page.click('[data-testid="service-select"]')
    await page.click('text=Taglio e Piega')
    
    // Seleziona staff
    await page.click('[data-testid="staff-select"]')
    await page.click('text=Anna Rossi')
    
    // Seleziona orario
    await page.click('[data-testid="time-select"]')
    await page.click('text=10:00')
    
    // Salva appuntamento
    await page.click('text=Salva Appuntamento')
    
    // Verifica che il modal si chiuda e l'appuntamento sia creato
    await expect(page.locator('text=Nuovo Appuntamento')).not.toBeVisible()
  })

  test('should switch calendar views', async ({ page }) => {
    await page.goto('/dashboard/bookings')
    
    // Testa vista settimana
    await page.click('text=Settimana')
    await expect(page.locator('.fc-timeGridWeek-view')).toBeVisible()
    
    // Testa vista giorno
    await page.click('text=Giorno')
    await expect(page.locator('.fc-timeGridDay-view')).toBeVisible()
    
    // Torna alla vista mese
    await page.click('text=Mese')
    await expect(page.locator('.fc-dayGridMonth-view')).toBeVisible()
  })

  test('should display appointment sidebar', async ({ page }) => {
    await page.goto('/dashboard/bookings')
    
    // Verifica che la sidebar sia presente
    await expect(page.locator('[data-testid="appointment-sidebar"]')).toBeVisible()
    
    // Verifica che mostri la data selezionata
    await expect(page.locator('text=appuntamenti programmati')).toBeVisible()
  })
})