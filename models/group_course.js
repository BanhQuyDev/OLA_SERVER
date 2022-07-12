'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class group_course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate({course_template,course_path}) {
      // define association here
      this.belongsTo(course_path,{foreignKey:"id_course_path"});
      this.belongsTo(course_template,{foreignKey:"id_course"})
    }
  }
  group_course.init({
    id_course:DataTypes.INTEGER,
    id_course_path:DataTypes.INTEGER,
    order:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'group_course',
  });
  return group_course;
};