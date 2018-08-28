const {GraphQLServer} = require('graphql-yoga');

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]

let idCount = links.length
const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links,
        link: (root, args) => {
            for (let i = 0; i< links.length; i++) {
                if (args.id === links[i].id) {
                    return links[i]
                }
            }
        }
    },
    Mutation: {
        post: (root, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url,
            }
            links.push(link)
            return link
        },
        updateLink: (root, args) => {
            const link = {
                id: args.id,
                description: args.description,
                url: args.url,
            }

            for (let i = 0; i< links.length; i++) {
                if (args.id === links[i].id) {
                    links[i] = link
                    break;
                }
            }
        },
        deleteLink: (root, args) => {
            for (let i = 0; i< links.length; i++) {
                if (args.id === links[i].id) {
                    links.splice(i, 1)
                    break;
                }
            }
        }
    }
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
});
server.start(() => console.log(`Server is running on http://localhost:4000`));