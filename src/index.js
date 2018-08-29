const {GraphQLServer} = require('graphql-yoga')
const {Prisma} = require('prisma-binding')

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: (root, args, context, info) => {
            return context.db.query.links({}, info)
        },
        // link: (root, args) => {
        //     for (let i = 0; i< links.length; i++) {
        //         if (args.id === links[i].id) {
        //             return links[i]
        //         }
        //     }
        // }
    },
    Mutation: {
        post: (root, args, context, info) => {
            return context.db.mutation.createLink({
                data: {
                    url: args.url,
                    description: args.description,
                },
            }, info)
        },
        // updateLink: (root, args) => {
        //     const link = {
        //         id: args.id,
        //         description: args.description,
        //         url: args.url,
        //     }
        //
        //     for (let i = 0; i< links.length; i++) {
        //         if (args.id === links[i].id) {
        //             links[i] = link
        //             break;
        //         }
        //     }
        // },
        // deleteLink: (root, args) => {
        //     for (let i = 0; i< links.length; i++) {
        //         if (args.id === links[i].id) {
        //             links.splice(i, 1)
        //             break;
        //         }
        //     }
        // }
    }
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: req => ({
        ...req,
        db: new Prisma({
            typeDefs: 'src/generated/prisma.graphql',
            endpoint: 'https://us1.prisma.sh/frank-oh-71a520/database/dev\n',
            secret: 'mysecret123',
            debug: true,
        }),
    }),
});
server.start(() => console.log(`Server is running on http://localhost:4000`));