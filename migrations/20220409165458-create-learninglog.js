'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('learninglogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      unitDone: {
        type: Sequelize.INTEGER
      },
      courseID: {
        type: Sequelize.INTEGER
      },
      isLasted: {
        type: Sequelize.BOOLEAN
      },
      studentID: {
        type: Sequelize.INTEGER,
        references:{
          model:"students",
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
    await queryInterface.dropTable('learninglogs');
  }
};