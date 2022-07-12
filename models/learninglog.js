'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class learninglog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({students}) {
      // define association here
      this.belongsTo(students,{foreignKey:"studentID"});
    }
  }
  learninglog.init({
    unitDone: DataTypes.INTEGER,
    courseID:DataTypes.INTEGER,
    isLasted:DataTypes.BOOLEAN,
    studentID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'learninglog',
  });
  return learninglog;
};