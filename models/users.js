'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({teachers,students,notification,admin,comment,chats}) {
      this.hasMany(teachers,{foreignKey:"id"});
      this.hasMany(students,{foreignKey:"id"});
      this.hasMany(notification,{foreignKey:"id_user"});
      this.hasMany(admin,{foreignKey:"id"});
      this.hasMany(comment,{foreignKey:"id_user"});
      this.hasMany(chats,{foreignKey:"idSender"});
      this.hasMany(chats,{foreignKey:"idReceiver"});
    }
  }
  users.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    role: DataTypes.STRING,
    password: DataTypes.STRING,
    level: DataTypes.INTEGER,
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    birthday: DataTypes.DATE,
    image: DataTypes.STRING,
    desc: DataTypes.STRING,
    nationality: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};