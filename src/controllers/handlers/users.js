import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import sq from 'sequelize'
import fp from 'fastify-plugin'
import db from '../../models/index.js'

const { sign } = jwt
const { QueryTypes } = sq
const { hashSync, compareSync } = bcrypt
const { fastifyPlugin } = fp

export const registerUserHandler = fastifyPlugin(async (req, reply) => {
  const { username, email, password } = req.body
  const encryptedPassword = hashSync(password, Number(process.env.SALT_ROUNDS))

  const currentDate = new Date()
  const convertDate = currentDate.toISOString().slice(0, 19).replace('T', ' ')

  try {
    await db.sequelize.query(
      `INSERT INTO USERS (username, email, password, createdAt, updatedAt) VALUES ('${username}', '${email}', '${encryptedPassword}', '${convertDate}', '${convertDate}')`,
      {
        type: QueryTypes.INSERT,
      }
    )
    reply.send({ message: 'Successfully created new user' })
  } catch (error) {
    reply.send(error)
  }
})

export const loginUserHandler = async (req, reply) => {
  const { username, password } = req.body

  try {
    const res = await db.sequelize.query('SELECT * FROM USERS WHERE username = :username', {
      type: QueryTypes.SELECT,
      replacements: { username },
    })
    if (res && res.length !== 0) {
      const comparePwd = compareSync(password, res[0].password)
      if (comparePwd) {
        delete res[0].password
        const token = sign({ username }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })
        reply.send({
          message: 'Berhasil login',
          token,
        })
      } else {
        reply.send({ message: 'Invalid password' })
      }
    } else {
      reply.send({ message: 'User not found' })
    }
  } catch (error) {
    reply.send(error)
  }
}

export async function getAllUsers(req, reply) {
  let res
  try {
    res = await db.sequelize.query('SELECT * FROM users', QueryTypes.SELECT)
  } catch (err) {
    res = err
  }
  reply.send(res[0] ?? res)
}
