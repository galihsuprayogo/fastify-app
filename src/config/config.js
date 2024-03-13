import 'dotenv/config'

const configs = {
  development: {
    database: 'database_development',
    username: 'root',
    password: '123456',
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
  },
  test: {
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'mysql',
  },
  production: {
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'mysql',
  },
}

export default configs
