'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('one_one_classes', {
      id: {
        type: Sequelize.INTEGER,
        references:{
          model:"classes",
          key:"id"
        }
      },
      id_teacher: {
        type: Sequelize.INTEGER,
        references:{
          model:"externalmembers",
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
    await queryInterface.dropTable('one_one_classes');
  }
};