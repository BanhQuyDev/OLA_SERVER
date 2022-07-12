'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class classes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({one_one_class}) {
      // define association here
      this.hasMany(one_one_class,{foreignKey:"id"})
    }
  }
  classes.init({
    starting_time: DataTypes.STRING,
    end_time: DataTypes.STRING,
    status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'classes',
  });
  return classes;
};