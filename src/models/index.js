import sq from 'sequelize'
import fs, { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import process from 'process'
const { Sequelize } = sq
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const env = process.env.NODE_ENV || 'development'
// import conf from '../config/config.json' assert { type: 'json' }
const confUrl = new URL('../config/config.json', import.meta.url)
const conf = JSON.parse(readFileSync(confUrl))
const config = conf[env]
const db = {}

let sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config)
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== __dirname &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    )
  })
  .forEach((file) => {
    // const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    // const model = join(__dirname, file).concat(sequelize, Sequelize.DataTypes)
    const model = join(__dirname, file)
    db[model.name] = model
  })

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db
