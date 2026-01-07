import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from './../generated/prisma/default.js'


const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
const prismaClient = new PrismaClient({ adapter })

export default prismaClient 