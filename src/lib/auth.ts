import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "@/lib/prisma"

export const authOptions: NextAuthOptions = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    // Email/Password provider
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Find staff member by email
        const staff = await prisma.staff.findUnique({
          where: { email: credentials.email },
          include: { salon: true }
        })

        if (!staff || !staff.isActive) {
          return null
        }

        // For now, we'll implement a simple password check
        // In production, you'd hash passwords properly
        if (credentials.password !== "demo123") {
          return null
        }

        return {
          id: staff.id,
          email: staff.email,
          name: `${staff.firstName} ${staff.lastName}`,
          role: staff.role,
          salonId: staff.salonId,
          salonName: staff.salon.name
        }
      }
    }),

    // Google OAuth provider (for future use)
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    })
  ],

  session: {
    strategy: "jwt"
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.salonId = user.salonId
        token.salonName = user.salonName
      }
      return token
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub!
        session.user.role = token.role
        session.user.salonId = token.salonId
        session.user.salonName = token.salonName
      }
      return session
    }
  },

  pages: {
    signIn: "/auth/signin",
    error: "/auth/error"
  }
}