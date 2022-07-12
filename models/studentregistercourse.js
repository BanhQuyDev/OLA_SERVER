"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class studentregistercourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({students, course_template }) {
      // define association here
      this.belongsTo(students, { foreignKey: "id_student" });
      this.belongsTo(course_template, { foreignKey: "id_course" });
    }
  }
  studentregistercourse.init(
    {
      id_student: DataTypes.INTEGER,
      id_course: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "studentregistercourses",
    }
  );
  return studentregistercourse;
};
