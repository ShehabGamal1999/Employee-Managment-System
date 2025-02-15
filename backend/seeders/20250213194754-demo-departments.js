'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Departments', [
      { Name: 'Human Resources', createdAt: new Date(), updatedAt: new Date() },
      { Name: 'Engineering', createdAt: new Date(), updatedAt: new Date() },
      { Name: 'Marketing', createdAt: new Date(), updatedAt: new Date() },
      { Name: 'Sales', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Departments', null, {});
  }
};