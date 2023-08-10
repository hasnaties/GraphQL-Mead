import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/schema.graphql',
    endpoint: 'localhost::4000'
})