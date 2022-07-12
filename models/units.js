'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class units extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({comment,course_template,studentstudyunit}) {
      // define association here
      this.hasMany(studentstudyunit,{foreignKey:"id_unit"});
      this.hasMany(comment,{foreignKey:"id_unit"});
      this.belongsTo(course_template,{foreignKey:"id_course"});
    }
  }
  units.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    video_url: DataTypes.STRING,
    file_url: DataTypes.STRING,
    order: DataTypes.STRING,
    description: DataTypes.STRING,
    estimateTime: DataTypes.STRING,
    id_course: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'units',
  });
  return units;
};