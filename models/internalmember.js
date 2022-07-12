'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class internalmember extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate({teachers,course_template}) {
      // define association here
      this.belongsTo(teachers,{foreignKey:"id"});
      this.hasMany(course_template,{foreignKey:"id_internal_member"});
    }
  }
  internalmember.init({
  }, {
    sequelize,
    modelName: 'internalmember',
  });
  return internalmember;
};