import { rootController } from '../controllers/index.js'

async function rootRoute(fastify, options) {
  return fastify.get('/', rootController)
}

export default rootRoute
