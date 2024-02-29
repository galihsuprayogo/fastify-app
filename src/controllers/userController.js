import { fastifyDB } from '../configs/index.js'

export default function userController(req, reply) {
  fastifyDB.fastifyDB.mysql.query('SELECT * FROM users', function onResult(err, result) {
    reply.send(err || result)
  })
}
