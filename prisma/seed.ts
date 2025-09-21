import { PrismaClient, ServiceCategory, Gender, StaffRole, PlanType } from '../src/generated/prisma'

const prisma = new PrismaClient()

async function main() {
  // Create demo salon
  const demoSalon = await prisma.salon.create({
    data: {
      name: "Salone Bellezza Demo",
      email: "demo@salonpro.it",
      phone: "+39 02 1234567",
      address: "Via Roma 123",
      city: "Milano",
      postalCode: "20100",
      country: "Italy",
      plan: "PRO" as PlanType,
      isActive: true,
    }
  })

  console.log('✅ Created demo salon:', demoSalon.name)

  // Create demo staff members
  const demoOwner = await prisma.staff.create({
    data: {
      email: "demo@salonpro.it",
      firstName: "Mario",
      lastName: "Rossi",
      phone: "+39 333 1234567",
      role: "OWNER" as StaffRole,
      salonId: demoSalon.id,
      isActive: true,
    }
  })

  const demoStylist = await prisma.staff.create({
    data: {
      email: "anna@salonpro.it",
      firstName: "Anna",
      lastName: "Bianchi",
      phone: "+39 333 7654321",
      role: "STYLIST" as StaffRole,
      salonId: demoSalon.id,
      isActive: true,
    }
  })

  console.log('✅ Created demo staff members')

  // Create demo services
  const services = [
    {
      name: "Taglio Donna",
      description: "Taglio e piega per capelli femminili",
      duration: 60,
      price: 35.0,
      category: "HAIRCUT" as ServiceCategory,
      salonId: demoSalon.id,
    },
    {
      name: "Taglio Uomo",
      description: "Taglio classico maschile",
      duration: 30,
      price: 20.0,
      category: "HAIRCUT" as ServiceCategory,
      salonId: demoSalon.id,
    },
    {
      name: "Colore",
      description: "Colorazione completa",
      duration: 120,
      price: 80.0,
      category: "COLOR" as ServiceCategory,
      salonId: demoSalon.id,
    },
    {
      name: "Meches",
      description: "Colpi di sole",
      duration: 90,
      price: 60.0,
      category: "COLOR" as ServiceCategory,
      salonId: demoSalon.id,
    },
    {
      name: "Trattamento Cheratina",
      description: "Trattamento ristrutturante alla cheratina",
      duration: 180,
      price: 120.0,
      category: "TREATMENT" as ServiceCategory,
      salonId: demoSalon.id,
    },
  ]

  for (const service of services) {
    await prisma.service.create({ data: service })
  }

  console.log('✅ Created demo services')

  // Create demo clients
  const clients = [
    {
      firstName: "Laura",
      lastName: "Verdi",
      email: "laura.verdi@email.com",
      phone: "+39 335 1111111",
      dateOfBirth: new Date("1985-03-15"),
      gender: "FEMALE" as Gender,
      notes: "Allergia ai coloranti con ammoniaca",
      preferences: "Preferisce tagli scalati",
      salonId: demoSalon.id,
    },
    {
      firstName: "Marco",
      lastName: "Neri",
      email: "marco.neri@email.com",
      phone: "+39 335 2222222",
      dateOfBirth: new Date("1990-07-22"),
      gender: "MALE" as Gender,
      notes: "Cliente fedele da 2 anni",
      salonId: demoSalon.id,
    },
    {
      firstName: "Sofia",
      lastName: "Russo",
      email: "sofia.russo@email.com",
      phone: "+39 335 3333333",
      dateOfBirth: new Date("1992-11-08"),
      gender: "FEMALE" as Gender,
      allergies: "Sensibile ai prodotti con parabeni",
      preferences: "Ama i colori naturali",
      salonId: demoSalon.id,
    },
  ]

  for (const client of clients) {
    await prisma.client.create({ data: client })
  }

  console.log('✅ Created demo clients')

  // Create some demo appointments for today and next week
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(10, 0, 0, 0)

  const nextWeek = new Date()
  nextWeek.setDate(nextWeek.getDate() + 7)
  nextWeek.setHours(14, 0, 0, 0)

  const demoClients = await prisma.client.findMany({
    where: { salonId: demoSalon.id }
  })

  const demoServices = await prisma.service.findMany({
    where: { salonId: demoSalon.id }
  })

  // Appointment 1 - Tomorrow
  const appointment1 = await prisma.appointment.create({
    data: {
      date: tomorrow,
      startTime: tomorrow,
      endTime: new Date(tomorrow.getTime() + 60 * 60 * 1000), // +1 hour
      status: "SCHEDULED",
      notes: "Prima volta, fare consulenza colore",
      totalPrice: 35.0,
      salonId: demoSalon.id,
      clientId: demoClients[0].id,
      staffId: demoStylist.id,
    }
  })

  // Link service to appointment
  await prisma.appointmentService.create({
    data: {
      appointmentId: appointment1.id,
      serviceId: demoServices[0].id, // Taglio Donna
      price: 35.0,
    }
  })

  console.log('✅ Created demo appointments')
  console.log('\n🎉 Seeding completed successfully!')
  console.log('\n📧 Demo Login Credentials:')
  console.log('Email: demo@salonpro.it')
  console.log('Password: demo123')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })