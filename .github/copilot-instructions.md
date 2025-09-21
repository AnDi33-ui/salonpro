# SalonPro - CRM per Parrucchieri

## Contesto del Progetto
SalonPro è un CRM SaaS specificamente progettato per saloni di parrucchieri e centri estetici. L'obiettivo è fornire uno strumento completo per la gestione di appuntamenti, clienti, staff e analytics di business.

## Stack Tecnologico
- **Frontend**: Next.js 15 + TypeScript + Tailwind CSS
- **Backend**: Next.js API Routes + Prisma ORM  
- **Database**: PostgreSQL
- **Autenticazione**: NextAuth.js
- **UI**: Radix UI + Lucide Icons
- **Deployment**: Vercel

## Architettura Database

### Modelli Principali
- **Salon**: Dati del salone, piano di abbonamento, configurazioni
- **Staff**: Membri del team con ruoli (OWNER, MANAGER, STYLIST, ASSISTANT)
- **Client**: Database clienti con preferenze, allergie, storico
- **Service**: Servizi offerti (taglio, colore, trattamenti) con prezzi
- **Appointment**: Appuntamenti con stati e servizi associati

### Business Logic
- Multi-tenancy: ogni salone ha i propri dati isolati
- Piani subscription: BASIC (€29), PRO (€79), PREMIUM (€149)
- Stati appuntamenti: SCHEDULED, CONFIRMED, IN_PROGRESS, COMPLETED, CANCELLED, NO_SHOW

## Convenzioni di Codice

### File Structure
```
src/
├── app/                 # Next.js App Router
├── components/          # React components
│   ├── ui/             # Base UI components
│   └── features/       # Feature-specific components
├── lib/                # Utilities e configurazioni
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
└── generated/          # Prisma generated client
```

### Naming Conventions
- **Components**: PascalCase (es. `ClientForm.tsx`)
- **Files**: kebab-case (es. `appointment-calendar.tsx`)
- **Variables**: camelCase (es. `clientData`)
- **Types**: PascalCase con suffisso Type (es. `AppointmentType`)

### Code Style
- Usa TypeScript strict mode
- Preferisci named exports
- Usa Tailwind CSS per styling
- Componenti funzionali con hooks
- Error boundaries per gestione errori
- Validazione con Zod schemas

## Funzionalità Principali

### 1. Gestione Appuntamenti
- Calendario drag & drop
- Reminder automatici SMS/Email
- Gestione ricorrenze
- Check-in/check-out clienti
- Note e preferenze per appointment

### 2. Database Clienti
- Schede clienti complete
- Storico trattamenti
- Preferenze colori/stili
- Allergie e controindicazioni
- Foto prima/dopo
- Sistema feedback e recensioni

### 3. Business Analytics
- Dashboard KPI (fatturato, clienti, retention)
- Performance staff
- Analisi servizi più richiesti
- Trend stagionali
- Report finanziari

### 4. Marketing Automation
- Email personalizzate compleanni
- Campagne promozionali
- Follow-up post trattamento
- Loyalty program
- Referral tracking

## Target Utenti

### Tipologie Saloni
- **Piccoli saloni** (1-3 operatori): Focus semplicità e prezzo
- **Saloni medi** (4-8 operatori): Gestione team e analytics
- **Catene** (9+ operatori): Multi-location e reporting avanzato

### User Personas
- **Owner/Manager**: Dashboard business, report, configurazioni
- **Stylist**: Calendario personale, schede clienti, note trattamenti
- **Reception**: Booking, check-in, pagamenti, customer service

## Security & Privacy
- GDPR compliance per dati clienti
- Autenticazione forte (2FA optional)
- Audit log per modifiche dati
- Backup automatici
- Crittografia dati sensibili

## Performance Requirements
- Caricamento < 2 secondi
- Real-time updates calendario
- Mobile-first responsive
- Offline-first per app mobile
- Scalabilità fino a 1000 saloni

## Integrations Roadmap
- **Pagamenti**: Stripe, PayPal, SumUp
- **SMS**: Twilio, AWS SNS
- **Email**: SendGrid, Mailchimp
- **Calendar**: Google Calendar, Apple Calendar
- **POS**: Square, Shopify POS
- **Social**: Instagram Business, Facebook

## Testing Strategy
- Unit tests: Jest + React Testing Library
- E2E tests: Playwright
- API tests: Supertest
- Performance: Lighthouse CI
- Database: Test containers PostgreSQL

## Deployment & DevOps
- **Staging**: Vercel preview deployments
- **Production**: Vercel con custom domain
- **Database**: Supabase o Railway PostgreSQL
- **Monitoring**: Vercel Analytics + Sentry
- **CI/CD**: GitHub Actions

Quando sviluppi nuove funzionalità, tieni sempre presente il contesto business e l'esperienza utente dei professionisti del settore beauty.