'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class busytime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate({externalmember}) {
      // define association here
      this.belongsTo(externalmember,{foreignKey:"id_teacher"});
    }
  }
  busytime.init({
    starting_time: DataTypes.STRING,
    end_time: DataTypes.STRING,
    id_teacher: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'busytime',
  });
  return busytime;
};