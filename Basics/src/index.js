import { GraphQLServer } from 'graphql-yoga'
import { users, posts, comments } from './tempData';


// typeDefs
const typeDefs = `

    type Query {

        users(query: Int): [Post!]!
        posts(query: Int): [Post!]!
        comments: [Comment!]!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        comments: [Comment!]!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
    }
`

// Resolvers
const resolvers = {
    Query: {
        users(parent, args, ctx, info) {
            if (!args.query) {
                return users;
            }

            return users.filter((user) => {
                return user.id.includes(args.query)
            });
        },
        posts(parent, args, ctx, info){

            if (!args.query) {
                return posts;
            }

            return posts.filter((post) => {
                return post.id.includes(args.query)
            });
        },
        comments(parent, args, ctx, info) {

            return comments;
        }
    },
    User: {
        comments (parent, args, ctx, info){
            return comments.filter((comment) => {
                return comment.author === parent.id
            })
        }
    },
    Post: {
        comments (parent, args, ctx, info){
            return comments.filter((comment) => {
                return comment.post === parent.id
            })
        }
    },
    Comment: {
        author (parent, args, ctx, info){
            return users.find((user) => {
                return parent.author === user.id
            })
        },
        post (parent, args, ctx, info){
            return posts.find((post) => {
                return parent.post === post.id
            })
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