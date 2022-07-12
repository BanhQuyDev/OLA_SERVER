'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('studentstudyunits', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_student: {
        type: Sequelize.INTEGER,
        references:{
          model:"students",
          key:"id"
        }
      },
      id_unit: {
        type: Sequelize.INTEGER,
        references:{
          model:"units",
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
    await queryInterface.dropTable('studentstudyunits');
  }
};