import 'dotenv/config'

import { fastifyDB } from './configs/index.js'
import { userRoutes } from './routes/index.js'

fastifyDB.fastifyDB.register(userRoutes)

// Run the server!
try {
  await fastifyDB.fastifyDB.listen({ port: 3002 })
} catch (err) {
  fastifyDB.fastifyDB.log.error(err)
  process.exit(1)
}
