import 'dotenv/config'

import Fastify from 'fastify'
import { userRoutes } from './routes/index.js'
import db from './models/index.js'

const fastify = Fastify({
  logger: true,
})

fastify.register(userRoutes)

// Run the server!
try {
  db.sequelize.sync()
  await fastify.listen({ port: 3002 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
