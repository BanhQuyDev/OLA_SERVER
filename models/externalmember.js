'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class externalmember extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({teachers,one_one_class,feedback,class_report,busytime}) {
      // define association here
      this.belongsTo(teachers,{foreignKey:"id"});
      this.hasMany(one_one_class,{foreignKey:"id_teacher"});
      this.hasMany(feedback,{foreignKey:"id_teacher"});
      this.hasMany(class_report,{foreignKey:"id_teacher"});
      this.hasMany(busytime,{foreignKey:"id_teacher"});
    }
  }
  externalmember.init({
  }, {
    sequelize,
    modelName: 'externalmember',
  });
  return externalmember;
};