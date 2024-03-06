import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { fastifyDB } from '../../configs/index.js'

const { sign } = jwt
const { hashSync, compareSync } = bcrypt

export const registerUserHandler = (req, reply) => {
  const { username, email, password } = req.body
  const encryptedPassword = hashSync(password, Number(process.env.SALT_ROUNDS))

  fastifyDB.fastifyDB.mysql.query(
    'INSERT INTO USERS (username, email, password, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)',
    [username, email, encryptedPassword, new Date(), new Date()],
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
    'SELECT * FROM USERS WHERE username=?',
    [username],
    function onResult(err, result) {
      if (result.length !== 0 && result) {
        const comparePwd = compareSync(password, result[0].password)
        if (comparePwd) {
          delete result[0].password
          const token = sign({ username }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })
          const arr = [{ ...result[0], token }]
          reply.send(arr)
        } else {
          reply.send({ message: 'Invalid password' })
        }
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
