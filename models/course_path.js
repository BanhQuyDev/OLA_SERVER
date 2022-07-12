'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class course_path extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate({admin,group_course}) {
      // define association here
      this.belongsTo(admin,{foreignKey:"id_admin"});
      this.hasMany(group_course,{foreignKey:"id_course_path"});
    }
  }
  course_path.init({
    name:DataTypes.STRING,
    desc:DataTypes.STRING,
    image_url:DataTypes.STRING,
    id_admin: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'course_path',
  });
  return course_path;
};