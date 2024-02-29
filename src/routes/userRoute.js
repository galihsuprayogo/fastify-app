import { userController } from '../controllers/index.js'

async function userRoute(fastify, options, done) {
  fastify.get('/user', userController)

  done()
}

export default userRoute
