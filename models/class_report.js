'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class class_report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate({students,one_one_class,externalmember}) {
      // define association here
      this.belongsTo(students,{foreignKey:"id_student"});
      this.belongsTo(one_one_class,{foreignKey:"id_class"});
      this.belongsTo(externalmember,{foreignKey:"id_teacher"});
    }
  }
  class_report.init({
    name:DataTypes.STRING,
    desc:DataTypes.STRING,
    report_url:DataTypes.STRING,
    id_student:DataTypes.INTEGER,
    id_class:DataTypes.INTEGER,
    id_teacher:DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'class_report',
  });
  return class_report;
};