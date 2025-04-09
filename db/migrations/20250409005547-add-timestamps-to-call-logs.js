'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('call-logs', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });
    
    await queryInterface.addColumn('call-logs', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('call-logs', 'createdAt');
    await queryInterface.removeColumn('call-logs', 'updatedAt');
  }
};
