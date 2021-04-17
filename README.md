<p align="center">
  <img src="logo.png" width="200px" />
</p>
  <h1 align="center">cloudinary-nexus</h1>

![Top language][top-lang-image]
![Vulnerabilities][snyk-image]
[![Version][npm-v-image]][npm-url]
[![Node Version][node-version-image]][node-version-url]
![Last commit][last-commit-image]

Nexus plugin for [Cloudinary](https://cloudinary.com). Useful for uploading files with GraphQL.

## Install

```sh
pnpm i nexus-cloudinary cloudinary # cloudinary SDK is a peer dep
```

## Setup

To make this plugin work you need to pass it to the `makeSchema` function and create a `context.ts` file with initializing cloudinary (so the plugin can use it internally).

```ts
// server.ts

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
```

Next, create a file with GraphQL context where you need to initialize cloudinary SDK.

```ts
// context.ts

import * as dotenv from '@tinyhttp/dotenv'
import { v2 as cloudinary } from 'cloudinary'

dotenv.config()

export type Context = {
  cloudinary: typeof cloudinary
}

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

export const context = {
  cloudinary
}
```

## Usage

This plugin adds new types for interacting with Cloudinary using GraphQL.

For example, you can upload an image using `uploadImage` mutation:

```ts
mutation {
  uploadImage(file: "./pic.jpg") {
    height
    width
    url
  }
}
```

[node-version-image]: https://img.shields.io/node/v/nexus-cloudinary.svg?style=flat-square
[node-version-url]: https://nodejs.org
[top-lang-image]: https://img.shields.io/github/languages/top/talentlessguy/nexus-cloudinary.svg?style=flat-square
[snyk-image]: https://img.shields.io/snyk/vulnerabilities/npm/nexus-cloudinary.svg?style=flat-square
[npm-v-image]: https://img.shields.io/npm/v/nexus-cloudinary.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/nexus-cloudinary
[last-commit-image]: https://img.shields.io/github/last-commit/talentlessguy/nexus-cloudinary.svg?style=flat-square
