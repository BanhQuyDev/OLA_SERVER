'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class feedback extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({students,externalmember,course_template}) {
      // define association here
      this.belongsTo(students,{foreignKey:"id_student"});
      this.belongsTo(externalmember,{foreignKey:"id_teacher"});
      this.belongsTo(course_template,{foreignKey:"id_course"});
    }
  }
  feedback.init({
    rating: DataTypes.INTEGER,
    content: DataTypes.STRING,
    id_course: DataTypes.INTEGER,
    id_student: DataTypes.INTEGER,
    id_teacher: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'feedback',
  });
  return feedback;
};