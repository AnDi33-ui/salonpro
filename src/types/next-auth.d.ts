import { DefaultSession } from "next-auth"
import { StaffRole } from "../generated/prisma"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: StaffRole
      salonId: string
      salonName: string
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    role: StaffRole
    salonId: string
    salonName: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: StaffRole
    salonId: string
    salonName: string
  }
}