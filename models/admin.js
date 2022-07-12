'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate({users,managecoursedetail,course_path}) {
      // define association here
      this.belongsTo(users,{foreignKey:"id"});
      this.hasMany(managecoursedetail,{foreignKey:"id_admin"});
      this.hasMany(course_path,{foreignKey:"id_admin"});
    }
  }
  admin.init({
    active:DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'admin',
  });
  return admin;
};