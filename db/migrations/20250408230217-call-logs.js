'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('call-logs', {
      user: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      scammerName: {
        type: Sequelize.STRING
      },
      scammerDeal: {
        type: Sequelize.STRING
      },
      specialNotes: {
        type: Sequelize.STRING
      },
      callStart: {
        type: Sequelize.DATE
      },
      callEnd: {
        type: Sequelize.DATE
      },
      fullTranscript: {
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      },
  });
  },

async down(queryInterface, Sequelize) {
  await queryInterface.dropTable('call-logs');
},
};
