"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class chats extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ users }) {
      // define association here
      this.belongsTo(users, { foreignKey: "idSender" });
      this.belongsTo(users, { foreignKey: "idReceiver" });
    }
  }
  chats.init(
    {
      content: DataTypes.STRING,
      idSender: DataTypes.INTEGER,
      idReceiver: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "chats",
    }
  );
  return chats;
};
