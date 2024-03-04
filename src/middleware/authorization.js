import jwt from 'jsonwebtoken'

const { verify } = jwt

export const verifyToken = (req, reply) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    reply.send({ message: 'No token provided' })
  }

  verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      reply.send({ message: 'Invalid token' })
    }

    reply.send({ message: 'Berhasil login' })
  })
}
