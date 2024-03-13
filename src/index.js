import 'dotenv/config'

import path from 'path'
import Fastify from 'fastify'
import fastifyStatic from '@fastify/static'
import { fileURLToPath } from 'url'
import { userRoutes } from './routes/index.js'
import db from './models/index.js'

const fastify = Fastify({
  logger: true,
})

const { join, dirname } = path

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

fastify.register(fastifyStatic, {
  root: join(__dirname, 'html'),
  prefix: '/html/', // optional: default '/'
  constraints: { host: 'example.com' }, // optional: default {}
})

fastify.register(userRoutes)
fastify.get('/', function root(req, reply) {
  reply.sendFile('index.html') // serving path.join(__dirname, 'public', 'myHtml.html') directly
})

// Run the server!
try {
  db.sequelize.sync()
  await fastify.listen({ port: 3002, host: '127.0.0.1' })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
