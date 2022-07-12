'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users,units}) {
      // define association here
      this.belongsTo(users,{foreignKey:"id_user"});
      this.belongsTo(units,{foreignKey:"id_unit"});
    }
  }
  comment.init({
    content: DataTypes.STRING,
    timestamp: DataTypes.DATE,
    id_unit: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'comment',
  });
  return comment;
};