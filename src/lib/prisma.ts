import { PrismaClient } from "@prisma/client";

declare global {
  var __PRISMA__: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  globalThis.__PRISMA__ ||= new PrismaClient();
  prisma = globalThis.__PRISMA__;
}

export default prisma;
