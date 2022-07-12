'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('course_templates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      exp: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      numofreg: {
        type: Sequelize.INTEGER
      },
      image: {
        type: Sequelize.STRING
      },
      level: {
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      isFree: {
        type: Sequelize.BOOLEAN
      },
      extraProp: {
        type: Sequelize.STRING
      },
      id_internal_member: {
        type: Sequelize.INTEGER,
        references:{
          model:"internalmembers",
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
    await queryInterface.dropTable('course_templates');
  }
};