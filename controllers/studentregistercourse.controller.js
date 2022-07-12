const {
  studentregistercourses,
  students,
  course_template,
  numofcancel,
  learninglog,
  course_path,
  group_course,
  sequelize,
} = require("../models");
const { QueryTypes } = require("sequelize");
const createInfoRegister = async (req, res) => {
  try {
    const { id_student, id_course, status } = req.body;
    const checkIdStudent = await students.findOne({
      where: { id: id_student },
    });
    const checkIdCourse = await course_template.findOne({
      where: { id: id_course },
    });
    if (checkIdStudent != null && checkIdCourse != null) {
      const newRegisterCourse = await studentregistercourses.create({
        id_student,
        id_course,
        status,
      });
      const newNumOfReg = checkIdCourse.numofreg + 1;
      await course_template.update(
        {
          numofreg: newNumOfReg,
        },
        {
          where: {
            id: id_course,
          },
        }
      );
      res.status(201).send(newRegisterCourse);
    } else {
      res.status(201).send({ messages: "Id don't exist" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
const bulkRegister = async (req, res) => {
  try {
    const { idCoursePath, id_student, status } = req.body;
    const checkIdCoursePath = await course_path.findByPk(idCoursePath);
    if (checkIdCoursePath) {
      const listCourse = await group_course.findAll({
        where: { id_course_path: idCoursePath },
      });
      listCourse.map(async (listCourse) => {
        const checkIdCourse = await course_template.findOne({
          where: { id: listCourse.id_course },
        });
        await studentregistercourses.create({
          id_student,
          id_course: listCourse.id_course,
          status,
        });
        const newNumOfReg = checkIdCourse.numofreg + 1;
        await course_template.update(
          {
            numofreg: newNumOfReg,
          },
          {
            where: {
              id: listCourse.id_course,
            },
          }
        );
      });
      res.status(201).send({ messages: "Registed Successfully !!!" });
    } else {
      res.status(404).send({ messages: "Id don't exist" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const unregisterCourse = async (req, res) => {
  try {
    const { studentID, courseID } = req.query;
    const checkExistCourse = await course_template.findOne({
      where: { id: courseID },
    });
    const checkExistStudent = await students.findOne({
      where: { id: studentID },
    });
    if (checkExistStudent && checkExistCourse) {
      await studentregistercourses.destroy({
        where: {
          id_student: studentID,
          id_course: courseID,
        },
      });
      await learninglog.destroy({
        where: {
          studentID: studentID,
          courseID: courseID,
        },
      });
    }
    const updateCourseCancel = await numofcancel.findByPk(1);
    const newCourseCancle = updateCourseCancel.course_cancel + 1;
    await numofcancel.update(
      {
        course_cancel: newCourseCancle,
      },
      { where: { id: 1 } }
    );
    res.status(200).send({ messages: "Unregisted Successfully!!!" });
  } catch (error) {
    res.status(500).send(error);
  }
};
const getStudentRegisterStatus = async (req, res) => {
  try {
    const { studentID, courseID } = req.query;
    let isReg = true;
    const getStudent = await studentregistercourses.findOne({
      attributes: {
        exclude: ["id", "createdAt", "updatedAt"],
      },
      where: { id_student: studentID, id_course: courseID },
    });
    if (getStudent === null) {
      isReg = false;
      res.status(200).send(isReg);
    } else {
      res.status(200).send({ getStudent, isReg });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
const getAllCourseRegistedByStudent = async (req, res) => {
  try {
    const { studentID } = req.query;
    const querySql = `
    SELECT c.id, c.name,c.level,c.type,st.createdAt,st.status,count(u.id_course) as numOfUnit
    FROM students s ,course_templates c ,studentregistercourses st,units u
    WHERE s.id = st.id_student AND st.id_course = c.id AND s.id = :id  AND u.id_course = c.id
    GROUP BY c.id
        `;
    const result = await sequelize.query(querySql, {
      replacements: { id: studentID },
      type: QueryTypes.SELECT,
    });
    if(result.length == 0 ){
      const querySql = `
      SELECT c.id, c.name,c.level,c.type,st.createdAt,st.status,0 as numOfUnit
      FROM students s ,course_templates c ,studentregistercourses st
      WHERE s.id = st.id_student AND st.id_course = c.id AND s.id = :id
      GROUP BY c.id
          `;
      const result2 = await sequelize.query(querySql, {
        replacements: { id: studentID },
        type: QueryTypes.SELECT,
      });
      res.status(200).send(result2);
    }else{
      res.status(200).send(result);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = {
  createInfoRegister,
  unregisterCourse,
  getStudentRegisterStatus,
  getAllCourseRegistedByStudent,
  bulkRegister
};
