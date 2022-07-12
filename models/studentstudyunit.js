'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class studentstudyunit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({students,units}) {
      // define association here
      this.belongsTo(students,{foreignKey:"id_student"});
      this.belongsTo(units,{foreignKey:"id_unit"});
    }
  }
  studentstudyunit.init({
    id_student: DataTypes.INTEGER,
    id_unit: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'studentstudyunit',
  });
  return studentstudyunit;
};