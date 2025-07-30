

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

// Extend the Session and User types to include 'id'
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    password?: string | null;
  }
}

const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) return null;

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isPasswordCorrect) return null;

        return { id: user.id, name: user.name, email: user.email };
      },
    }),
    // [...nextauth].ts
GoogleProvider({
  clientId: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  profile(profile) {
    return {
      id:      profile.sub,
      name:    profile.name,
      email:   profile.email,
      image:   profile.picture,    // <-- grab Google’s avatar URL
    };
  }
}),

    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  // Add the callbacks to pass user ID into token and session
  callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.id      = user.id;
      token.picture = user.image ?? undefined;  // <-- persist `image` (ensure no null)
    }
    return token;
  },
  // …

     async session({ session, token }) {
    if (token.id) {
      session.user.id    = token.id;
      session.user.image = token.picture as string;  // <-- expose to client
    }
    return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/LoginPage",
  },
});

export { handler as GET, handler as POST };
