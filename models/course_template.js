'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class course_template extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({managecoursedetail,feedback,units,studentregistercourses,internalmember,group_course}) {
      // define association here
      this.hasMany(managecoursedetail,{foreignKey:"id_course"});
      this.hasMany(feedback,{foreignKey:"id_course"});
      this.hasMany(units,{foreignKey:"id_course"});
      this.hasMany(studentregistercourses,{foreignKey:"id_course"});
      this.hasMany(group_course,{foreignKey:"id_course"});
      this.belongsTo(internalmember,{foreignKey:"id_internal_member"});
    }
  }
  course_template.init({
    name: DataTypes.STRING,
    exp: DataTypes.INTEGER,
    description: DataTypes.STRING,
    numofreg: DataTypes.INTEGER,
    image: DataTypes.STRING,
    level: DataTypes.INTEGER,
    type: DataTypes.STRING,
    isFree: DataTypes.BOOLEAN,
    extraProp: DataTypes.STRING,
    id_internal_member: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'course_template',
  });
  return course_template;
};