'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('feedbacks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      rating: {
        type: Sequelize.INTEGER
      },
      timeshape: {
        type: Sequelize.DATE
      },
      content: {
        type: Sequelize.STRING
      },
      id_course: {
        type: Sequelize.INTEGER,
        references:{
          model:"course_templates",
          key:"id"
        }
      },
      id_student: {
        type: Sequelize.INTEGER,
        references:{
          model:"students",
          key:"id"
        }
      },
      id_teacher: {
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
    await queryInterface.dropTable('feedbacks');
  }
};