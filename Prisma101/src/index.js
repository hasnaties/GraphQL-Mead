// const { PrismaClient } = require('@prisma/client')
import { GraphQLServer, PubSub } from 'graphql-yoga'
import db from './db'
import Query from './resolvers/Query.js'
import Mutation from './resolvers/Mutation.js'
import Subscription from './resolvers/Subscription'
import User from './resolvers/User'
import Post from './resolvers/Post'
import Comment from './resolvers/Comment'


const pubsub = new PubSub();

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: {
        Query,
        Mutation,
        Subscription,
        User,
        Post,
        Comment
    },
    context: {
        db,
        pubsub
    }
})

server.start(4000, () => {
    console.log("Server is running on http://localhost:4000/graphql");
})


// const prisma = new PrismaClient()

// async function main() {
    
//     const getUser = await prisma.comment.findMany({
//         select: {
//             text: true,
//             author: {
//                 select: {
//                     name: true
//                 }
//             }
//         }
//     })
//     console.log(getUser);
// }

// // calling the Main-Function
// main().then(async () => {
//     await prisma.$disconnect();
// }).catch(async (e) => {
//     console.log(e);
//     await prisma.$disconnect();
//     process.exit(1)
// })