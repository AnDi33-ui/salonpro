# 💈 SalonPro - CRM per Parrucchieri

**Il software gestionale completo per saloni di bellezza**

## 🚀 Caratteristiche Principali

- **Gestione Appuntamenti**: Calendario intelligente con reminder automatici
- **Database Clienti**: Schede complete con storico trattamenti e preferenze  
- **Analytics Avanzati**: Dashboard con metriche di business in tempo reale
- **Marketing Automatico**: Email personalizzate e campagne promozionali
- **Multi-Utente**: Gestione staff con ruoli e permessi
- **Responsive**: Ottimizzato per desktop, tablet e mobile

## 🛠️ Stack Tecnologico

- **Frontend**: Next.js 15 + TypeScript + Tailwind CSS
- **Backend**: Next.js API Routes + Prisma ORM
- **Database**: PostgreSQL
- **Autenticazione**: NextAuth.js
- **UI Components**: Radix UI + Lucide Icons
- **Deployment**: Vercel

## 📋 Setup Progetto

### Prerequisiti
- Node.js 18+ 
- PostgreSQL database
- Git

### Installazione

```bash
# Clona il repository
git clone <repo-url>
cd salonpro

# Installa dipendenze
npm install

# Configura variabili ambiente
cp .env.local.example .env.local
# Modifica .env.local con i tuoi dati

# Setup database
npx prisma migrate dev
npx prisma db seed

# Avvia il server di sviluppo
npm run dev
```

L'applicazione sarà disponibile su [http://localhost:3000](http://localhost:3000)

## 📊 Database Schema

### Modelli Principali

- **Salon**: Informazioni del salone e piano di abbonamento
- **Staff**: Membri del team con ruoli (Owner, Manager, Stylist, Assistant)  
- **Client**: Database clienti con preferenze e storico
- **Service**: Servizi offerti con prezzi e durata
- **Appointment**: Appuntamenti con stato e servizi associati

### Piani di Abbonamento

- **BASIC** (€29/mese): Fino a 1 operatore, funzionalità base
- **PRO** (€79/mese): Fino a 5 operatori, analytics avanzati
- **PREMIUM** (€149/mese): Operatori illimitati, automazioni complete

## 🎯 Roadmap MVP

### ✅ Fase 1: Foundation (Completata)
- [x] Setup progetto Next.js + TypeScript
- [x] Database schema con Prisma
- [x] Landing page marketing
- [x] Stack tecnologico completo

### 🚧 Fase 2: Core Features (In sviluppo)
- [ ] Sistema autenticazione e registrazione
- [ ] Dashboard principale con metrics
- [ ] CRUD gestione clienti
- [ ] Sistema prenotazioni con calendario
- [ ] Gestione servizi e prezzi

### 📅 Fase 3: Advanced Features
- [ ] Sistema pagamenti (Stripe)
- [ ] Email marketing automation
- [ ] App mobile (React Native)
- [ ] API per integrazioni terze
- [ ] Multi-lingua (EN, ES, FR)

## 🎨 Design System

### Colori Principali
- **Primary**: Purple 600 (#7C3AED)
- **Secondary**: Pink 50 (#FDF2F8) 
- **Background**: Gradient purple-pink
- **Text**: Gray 900/600

### Componenti UI
- Utilizziamo Radix UI per accessibility
- Tailwind CSS per styling
- Lucide React per icons
- Design system modulare e scalabile

## 📈 Business Model

### Revenue Streams
1. **SaaS Subscriptions**: €29-149/mese per salone
2. **Transaction Fees**: 2% sui pagamenti processati
3. **Premium Add-ons**: SMS, integrations, advanced analytics
4. **Setup/Training**: €200-500 per implementazione

### Target Market
- Saloni di parrucchieri (2-10 operatori)
- Centri estetici multi-servizio
- Barbieri moderni
- Spa e centri benessere

### Go-to-Market
1. **Local Outreach**: Email marketing ai saloni locali
2. **Social Media**: Instagram/TikTok per beauty professionals
3. **Partnership**: Distributori prodotti per capelli
4. **Referral Program**: Incentivi per clienti che portano nuovi saloni

## 🤝 Contribuire

Questo è un progetto in fase MVP. Contributi benvenuti per:

- Bug fixes e ottimizzazioni
- Nuove funzionalità
- Testing e feedback
- Documentazione
- Traduzioni

## 📄 Licenza

Proprietario - SalonPro 2025

## 📞 Contatti

- **Email**: info@salonpro.it
- **Website**: https://salonpro.vercel.app
- **Support**: support@salonpro.it

---

**SalonPro** - *Il futuro della gestione salon è qui* 💈✨
