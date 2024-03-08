import jwt from 'jsonwebtoken'

const { verify, decode } = jwt

export const verifyToken = async (req, reply) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    reply.send({ message: 'No token provided' })
  }

  verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      reply.send({ message: 'Invalid token' })
    }
    // true
    decode(token)
  })
}
