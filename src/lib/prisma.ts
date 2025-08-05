import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  (globalThis as any).__PRISMA__ ||= new PrismaClient();
  prisma = (globalThis as any).__PRISMA__;
}

export default prisma;
