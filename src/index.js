const fs = require('fs')
const { createServer } = require('node:http')
const { createSchema } = require('graphql-yoga')
const { createYoga } = require('graphql-yoga')
const resolvers = require('./dados_mock.resolvers')
const path = require('path')

const schema = createSchema({
    typeDefs: fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf-8'),
    resolvers
})

const yoga = createYoga({
    schema,
    graphqlEndpoint: '/',
})

const server = createServer(yoga)

server.listen(4000, () => {
    console.info('Server running on :4000/graphql')
})