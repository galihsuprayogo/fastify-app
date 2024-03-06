import Fastify from 'fastify'
import fastifyMysql from '@fastify/mysql'

const fastify = Fastify({
  logger: true,
})

fastify.register(fastifyMysql, {
  connectionLimit: 10000,
  waitForConnections: true,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  maxIdle: 10,
})

export default { fastifyDB: fastify }
