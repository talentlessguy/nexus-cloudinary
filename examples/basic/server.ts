import { makeSchema, queryType, mutationType, arg } from 'nexus'
import { nexusCloudinary, Image } from 'nexus-cloudinary/dist/index.js'
import { ApolloServer, ForbiddenError } from 'apollo-server'
import * as path from 'path'

const Query = queryType({
  definition(t) {
    t.string('image')
  }
})

const Mutation = mutationType({
  definition(t) {
    t.field('image', {
      type: 'Image',
      args: {
        image: arg({ type: 'String' })
      },
      resolve: async (root, args, ctx) => {
        return Promise.resolve({ name: args.image })
      }
    })
  }
})

const schema = makeSchema({
  types: [Query, Image, Mutation],
  outputs: {
    schema: path.join(process.cwd(), 'api.graphql'),
    typegen: path.join(process.cwd().replace(/\/dist$/, '/src'), 'typegen.ts')
  },
  plugins: [nexusCloudinary()]
})

const server = new ApolloServer({
  schema
})

server.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`))
