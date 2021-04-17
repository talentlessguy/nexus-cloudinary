import { makeSchema } from 'nexus'
import { nexusCloudinary } from 'nexus-cloudinary'
import { ApolloServer } from 'apollo-server'
import * as path from 'path'
import { context } from './context'

const schema = makeSchema({
  types: [],
  outputs: {
    schema: path.join(process.cwd(), 'api.graphql'),
    typegen: path.join(process.cwd().replace(/\/dist$/, '/src'), 'typegen.ts')
  },
  plugins: [nexusCloudinary()],
  contextType: {
    module: path.join(process.cwd(), 'context.ts'),
    export: 'Context'
  }
})

const server = new ApolloServer({
  schema,
  context
})

server.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`))
