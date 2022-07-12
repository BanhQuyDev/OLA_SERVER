const {
  one_one_class,
  students,
  externalmember,
  classes,
  users,
  sequelize,
} = require("../models");
const { QueryTypes } = require("sequelize");
const bookClass = async (req, res) => {
  try {
    const { idStudent, idTeacher, startTime, endTime } = req.body;
    const checkIdStudent = await students.findOne({ where: { id: idStudent } });
    const checkIdTeacher = await externalmember.findOne({
      where: { id: idTeacher },
    });
    const newNumOfClass = checkIdStudent.numOfClass + 1;
    if (checkIdStudent && checkIdTeacher) {
      const createClass = await classes.create({
        starting_time: startTime,
        end_time: endTime,
        status: "inComing",
      });
      const createOneOne = await one_one_class.create({
        id: createClass.id,
        id_teacher: idTeacher,
        id_student: idStudent,
      });
      await students.update(
        { numOfClass: newNumOfClass },
        { where: { id: idStudent } }
      );
      res.status(201).send(createOneOne);
    } else {
      res.status(404).send({ message: "Id don't exist" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await classes.update({ status }, { where: { id } });
    res.status(200).send({ message: "Update Successfully !!!" });
  } catch (error) {
    res.status(500).send(error);
  }
};
const getExternalTeacherBusyTime = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = `
    SELECT t.id , c.starting_time, c.end_time
FROM classes c, one_one_classes o ,teachers t
WHERE t.id = o.id_teacher AND o.id = c.id AND t.id = :id
    `;
    const result = await sequelize.query(sql, {
      replacements: { id },
      type: QueryTypes.SELECT,
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};
const getAllClassOneOneOfTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = `
    SELECT o.id,o.id_teacher,o.id_student,u.firstName as studentFirstName,u.lastName as studentLastName,c.starting_time,c.end_time,c.status
    FROM one_one_classes o, students s, users u ,classes c
    WHERE o.id_student = s.id AND s.id = u.id AND c.id = o.id AND id_teacher = :id
    `;
    const classList = await sequelize.query(sql, {
      replacements: { id },
      type: QueryTypes.SELECT,
    });
    if (classList != 0) {
      res.status(200).send({ classList });
    } else {
      res.status(200).send({ message: "Don't have class one one" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
const getAllClassOneOneOfStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = `
    SELECT o.id,o.id_teacher,o.id_student,u.firstName,u.lastName,c.starting_time,c.end_time,c.status
    FROM one_one_classes o, externalmembers e,teachers t, users u ,classes c
    WHERE o.id_teacher = e.id AND e.id = t.id AND t.id = u.id AND o.id = c.id AND id_student = :id
    `;
    const classList = await sequelize.query(sql, {
      replacements: { id },
      type: QueryTypes.SELECT,
    });
    if (classList != 0) {
      res.status(200).send(classList);
    } else {
      res.status(200).send({ message: "Don't have class one one" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
const getAllClassOneOne = async (req, res) => {
  try {
    const sql = `
    SELECT o.id,o.id_teacher,o.id_student,(SELECT u.firstName FROM externalmembers e,teachers t, users u 
      WHERE  e.id = t.id AND t.id = u.id AND u.id = o.id_teacher) AS teacherFirstName,(SELECT u.lastName FROM externalmembers e,teachers t, users u 
      WHERE  e.id = t.id AND t.id = u.id AND u.id = o.id_teacher) AS teacherLastName,(SELECT u.firstName FROM students s,users u 
      WHERE  s.id = u.id AND u.id = o.id_student) AS studentFirstName,(SELECT u.lastName FROM students s,users u
      WHERE  s.id = u.id AND u.id = o.id_student) AS studentLastName,c.starting_time,c.end_time,c.status 
      FROM one_one_classes o,classes c WHERE o.id = c.id  GROUP BY o.id;
    `;
    const classList = await sequelize.query(sql, {
      type: QueryTypes.SELECT,
    });
    if (classList != 0) {
      res.status(200).send(classList);
    } else {
      res.status(200).send({ message: "Don't have class one one" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = {
  bookClass,
  updateStatus,
  getExternalTeacherBusyTime,
  getAllClassOneOneOfTeacher,
  getAllClassOneOneOfStudent,
  getAllClassOneOne,
};
