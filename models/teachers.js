'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class teachers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users,externalmember,internalmember}) {
      // define association here
      this.belongsTo(users,{foreignKey:"id"})
      this.hasMany(externalmember,{foreignKey:"id"})
      this.hasMany(internalmember,{foreignKey:"id"})
    }
  }
  teachers.init({
    type: DataTypes.STRING,
    active:DataTypes.BOOLEAN,
    major:DataTypes.STRING,
    degree:DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'teachers',
  });
  return teachers;
};