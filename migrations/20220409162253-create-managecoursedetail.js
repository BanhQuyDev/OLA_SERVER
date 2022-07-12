'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('managecoursedetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_admin: {
        type: Sequelize.INTEGER,
        references:{
          model:"admins",
          key:"id"
        }
      },
      id_course: {
        type: Sequelize.INTEGER,
        references:{
          model:"course_templates",
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
    await queryInterface.dropTable('managecoursedetails');
  }
};