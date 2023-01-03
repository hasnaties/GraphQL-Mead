import { GraphQLServer } from 'graphql-yoga'


// typeDefs
const typeDefs = `

    type Query {
        add(a: Float!, b: Float!): Float!
        post: Post
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }
`

// Resolvers
const resolvers = {
    Query: {
        post() {
            return {
                id: '20011',
                title: 'My Blog',
                body: 'I donn wann nobody',
                published: false
            };
        },
        add(parent, args, ctx, info) {

            return (args.a + args.b);
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log("Server is up!");
})