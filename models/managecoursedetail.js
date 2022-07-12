'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class managecoursedetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({admin,course_template}) {
      // define association here
      this.belongsTo(admin,{foreignKey:"id_admin"});
      this.belongsTo(course_template,{foreignKey:"id_course"})
    }
  }
  managecoursedetail.init({
    id_admin: DataTypes.INTEGER,
    id_course: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'managecoursedetail',
  });
  return managecoursedetail;
};