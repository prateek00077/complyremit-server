import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client'

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is required");
}

const adapter = new PrismaPg({
  connectionString,
  max: parseInt(process.env.DB_POOL_MAX || '20', 10),
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 15000,
})

const prisma = new PrismaClient({
  adapter,
  log: process.env.NODE_ENV !== 'production'
    ? ['query', 'warn', 'error']
    : ['warn', 'error'],
})

export { prisma }
