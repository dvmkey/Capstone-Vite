'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.changeColumn('call-logs', 'fullTranscript', {
      type: Sequelize.STRING,
    });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.changeColumn('call-logs', 'fullTranscript', {
      type: Sequelize.DATE,
    });
  }
};
