# 🚀 GUIDA AL DEPLOY SU VERCEL

## Variabili Ambiente Necessarie per il Deploy

### 1. Database PostgreSQL (Vercel Postgres o Supabase)
```
DATABASE_URL="postgresql://username:password@hostname:5432/database_name"
```

### 2. NextAuth Configuration
```
NEXTAUTH_URL="https://your-app.vercel.app"
NEXTAUTH_SECRET="random-secret-32-chars-minimum"
```

### 3. App Configuration
```
APP_NAME="SalonPro"
APP_URL="https://your-app.vercel.app"
```

## Setup Vercel Deploy

### 1. Installa Vercel CLI
```bash
npm i -g vercel
```

### 2. Login e Deploy
```bash
vercel login
vercel
```

### 3. Configura Database PostgreSQL
- Vai su vercel.com/dashboard/stores
- Crea un database PostgreSQL
- Copia la connection string in DATABASE_URL

### 4. Configura Environment Variables
```bash
vercel env add NEXTAUTH_SECRET
vercel env add DATABASE_URL
vercel env add NEXTAUTH_URL
```

### 5. Esegui Migration Database
```bash
# Dopo il primo deploy
vercel env pull .env.local
npx prisma migrate deploy
npx prisma db seed
```

## Script Post-Deploy
```bash
# Prisma migration per produzione
npx prisma migrate deploy

# Seed database
npx prisma db seed
```

## Checklist Pre-Deploy ✅
- [x] Build passa senza errori
- [x] Test completati (66 test passati)
- [x] ESLint configurato per produzione
- [x] Environment variables configurate
- [ ] Database PostgreSQL configurato
- [ ] NEXTAUTH_SECRET generato
- [ ] Domain configurato in NEXTAUTH_URL

## Note Importanti 📝
1. Cambia NEXTAUTH_SECRET con un valore sicuro
2. Configura PostgreSQL prima del deploy
3. Esegui le migration dopo il primo deploy
4. Testa tutte le funzionalità in produzione