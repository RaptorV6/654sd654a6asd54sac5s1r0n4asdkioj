import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var _localdbPrisma: PrismaClient | undefined;
}

export const prisma = global._localdbPrisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global._localdbPrisma = prisma;
}
