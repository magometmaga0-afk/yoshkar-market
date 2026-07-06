import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// Neon (free tier) suspends its compute after a few minutes of inactivity;
// the next query then pays a ~1s cold-start to resume it. A long-running
// server (unlike Vercel's serverless functions) can just keep it warm.
const globalForKeepAlive = globalThis as unknown as { prismaKeepAlive: NodeJS.Timeout | undefined };
if (!globalForKeepAlive.prismaKeepAlive) {
  globalForKeepAlive.prismaKeepAlive = setInterval(() => {
    prisma.$queryRaw`SELECT 1`.catch(() => {});
  }, 4 * 60 * 1000);
}
