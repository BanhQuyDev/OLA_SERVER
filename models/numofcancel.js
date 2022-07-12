'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class numofcancel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate() {
      // define association here
    }
  }
  numofcancel.init({
    one_one_class_cancel: DataTypes.INTEGER,
    course_cancel: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'numofcancel',
  });
  return numofcancel;
};