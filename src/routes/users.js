import {
  registerUserSchema,
  registerUserHandler,
  loginUserHandler,
  getAllUsers,
} from '../controllers/index.js'
import { verifyToken } from '../middleware/authorization.js'

export const userRoutes = (fastify, options, done) => {
  fastify.post('/user/register', { schema: registerUserSchema, handler: registerUserHandler })

  fastify.post('/user/login', { handler: loginUserHandler })

  // middleware with jwt
  fastify.get('/user/all', { preHandler: verifyToken, handler: getAllUsers })

  done()
}
