import jwt from 'jsonwebtoken'
import { fastifyDB } from '../../configs/index.js'

const { sign } = jwt

export const registerUserHandler = (req, reply) => {
  const { username, email, password } = req.body

  fastifyDB.fastifyDB.mysql.query(
    'INSERT INTO USERS (username, email, password) VALUES (?, ?, ?)',
    [username, email, password],
    function onResult(err, result) {
      reply.send(
        err || {
          message: 'Successfully created new user',
        }
      )
    }
  )
}

export const loginUserHandler = (req, reply) => {
  const { username, password } = req.body

  fastifyDB.fastifyDB.mysql.query(
    'SELECT * FROM USERS WHERE username=? AND password=?',
    [username, password],
    function onResult(err, result) {
      if (result.length !== 0 && result) {
        const token = sign({ username }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })
        const arr = [{ ...result[0], token }]
        reply.send(arr)
      } else {
        reply.send({ message: 'User not found' })
      }
    }
  )
}

export const getAllUsers = (req, reply) => {
  fastifyDB.fastifyDB.mysql.query('SELECT * FROM users', function onResult(err, result) {
    reply.send(err || result)
  })
}
