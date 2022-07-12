'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('externalmembers', {
      id: {
        type: Sequelize.INTEGER,
        references:{
          model:"teachers",
          key:"id"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('externalmembers');
  }
};