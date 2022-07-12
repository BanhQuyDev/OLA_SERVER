'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('units', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      video_url: {
        type: Sequelize.STRING
      },
      file_url: {
        type: Sequelize.STRING
      },
      order: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      estimateTime: {
        type: Sequelize.STRING
      },
      id_course: {
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
    await queryInterface.dropTable('units');
  }
};