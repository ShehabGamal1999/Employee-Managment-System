
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('adminpassword', 10); // Replace with a secure password

    await queryInterface.bulkInsert('Users', [
      {
        Username: 'admin',
        Password: hashedPassword,
        Role: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', { Username: 'admin' }, {});
  }
};