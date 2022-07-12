'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class one_one_class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({students,externalmember,classes,class_report}) {
      // define association here
      this.belongsTo(students,{foreignKey:"id_student"});
      this.belongsTo(externalmember,{foreignKey:"id_teacher"});
      this.belongsTo(classes,{foreignKey:"id"});
      this.hasMany(class_report,{foreignKey:"id_class"});
    }
  }
  one_one_class.init({
    id_teacher: DataTypes.INTEGER,
    id_student: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'one_one_class',
  });
  return one_one_class;
};