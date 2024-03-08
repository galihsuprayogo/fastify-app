/** @type {import('sequelize-cli').Migration} */

const bcrypt = require('bcrypt')

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          fullname: 'John Doe',
          username: 'johndoe',
          email: 'johndoe@gmail.com',
          password: bcrypt.hashSync('123456', Number(process.env.SALT_ROUNDS)),
          createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
          updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        },
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  },
}
