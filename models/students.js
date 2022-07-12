'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class students extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate({users,learninglog,feedback,one_one_class,studentstudyunit,studentregistercourses,class_report}) {
      // define association here
      this.belongsTo(users,{foreignKey:"id"});
      this.hasMany(learninglog,{foreignKey:"studentID"});
      this.hasMany(feedback,{foreignKey:"id_student"});
      this.hasMany(one_one_class,{foreignKey:"id_student"});
      this.hasMany(studentstudyunit,{foreignKey:"id_student"});
      this.hasMany(studentregistercourses,{foreignKey:"id_student"});
      this.hasMany(class_report,{foreignKey:"id_student"});
    }
  }
  students.init({
    memberShip: DataTypes.STRING,
    numOfClass: DataTypes.INTEGER,
    exp:DataTypes.INTEGER,
    classInWeek:DataTypes.INTEGER,
    validMembership:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'students',
  });
  return students;
};