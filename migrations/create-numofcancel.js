'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('numofcancels', {
      id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      one_one_class_cancel: {
        type: Sequelize.INTEGER,
      },
      course_cancel: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('numofcancels');
  }
};