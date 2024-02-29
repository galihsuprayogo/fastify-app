import 'dotenv/config'
import { fastifyDB } from './configs/index.js'
import rootRoute from './routes/rootRoute.js'
import userRoute from './routes/userRoute.js'

fastifyDB.fastifyDB.register(rootRoute)
fastifyDB.fastifyDB.register(userRoute)

// Run the server!
try {
  await fastifyDB.fastifyDB.listen({ port: 3002 })
} catch (err) {
  fastifyDB.fastifyDB.log.error(err)
  process.exit(1)
}
