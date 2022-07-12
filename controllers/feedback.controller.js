const { QueryTypes } = require("sequelize");
const {
  feedback,
  students,
  course_template,
  teachers,
  sequelize,
} = require("../models");
const createFeedBackOnCourse = async (req, res) => {
  try {
    const { id_student, id_course, id_teacher, content, rating } = req.body;
    const checkIdStudent = await students.findOne({
      where: { id: id_student },
    });
    const checkIdCourse = await course_template.findOne({
      where: { id: id_course },
    });
    const checkIdTeacher = await teachers.findOne({
      where: { id: id_teacher },
    });
    if (checkIdStudent != null && checkIdCourse != null) {
      const checkFeedback = await feedback.findOne({
        where: { id_course, id_student },
      });
      if (checkFeedback == null) {
        const newFeedback = await feedback.create({
          id_student,
          id_course,
          content,
          rating,
        });
        res.status(201).send(newFeedback);
      } else {
        res
          .status(400)
          .send({ message: "Student already given feedback on course" });
      }
    } else if (checkIdStudent != null && checkIdTeacher != null) {
      if (checkIdTeacher.type === "external") {
        const checkFeedback = await feedback.findOne({
          where: { id_teacher, id_student },
        });
        if (checkFeedback == null) {
          const newFeedback = await feedback.create({
            id_student,
            id_teacher,
            content,
            rating,
          });
          res.status(201).send(newFeedback);
        } else {
          res
            .status(400)
            .send({ message: "Student already given feedback on teacher" });
        }
      } else {
        res.status(400).send({ message: "teacher role is not external!!" });
      }
    } else {
      res.status(404).send({ messages: "Id don't exist" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
const getAllFeedbackOnCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = `
    SELECT f.id,f.rating,f.createdAt,f.content,f.id_course,f.id_teacher,
    f.id_student,u.firstName,u.lastName,u.role,u.password,u.level,u.userName,
    u.email,u.birthday,u.image
    FROM feedbacks f , students s, users u
    WHERE f.id_student = s.id AND s.id=u.id AND f.id_course = :id
    `;
    const listFeedback = await sequelize.query(sql, {
      replacements: { id },
      type: QueryTypes.SELECT,
    });
    res.status(200).send(listFeedback);
  } catch (error) {
    res.status(500).send(error);
  }
};
const getAllFeedbackOnTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = `
    SELECT f.id,f.rating,f.createdAt,f.content,f.id_course,f.id_teacher,
    f.id_student,u.firstName,u.lastName,u.role,u.password,u.level,u.userName,
    u.email,u.birthday,u.image
    FROM feedbacks f , students s, users u
    WHERE f.id_student = s.id AND s.id=u.id AND f.id_teacher = :id
    `;
    const listFeedback = await sequelize.query(sql, {
      replacements: { id },
      type: QueryTypes.SELECT,
    });
    res.status(200).send(listFeedback);
  } catch (error) {
    res.status(500).send(error);
  }
};
const getRatingOnTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = `
    SELECT f.rating
    FROM feedbacks f , teachers t
    WHERE f.id_teacher = t.id AND t.id = :id AND t.type  = "external"
    `;
    const ratingTeacher = await sequelize.query(sql, {
      replacements: { id },
      type: QueryTypes.SELECT,
    });
    res.status(200).send(ratingTeacher);
  } catch (error) {
    res.status(500).send(error);
  }
};
const getRatingAndContentOnTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = `
    SELECT f.rating,f.content
    FROM feedbacks f , teachers t
    WHERE f.id_teacher = t.id AND t.id = :id AND t.type  = "external"
    `;
    const ratingTeacher = await sequelize.query(sql, {
      replacements: { id },
      type: QueryTypes.SELECT,
    });
    res.status(200).send(ratingTeacher);
  } catch (error) {
    res.status(500).send(error);
  }
};
const updateFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, rating } = req.body;
    await feedback.update({ rating, content }, { where: { id } });
    const newFeedback = await feedback.findByPk(id);
    res.status(200).send({ message: "Update Successfully", newFeedback });
  } catch (error) {
    res.status(500).send(error);
  }
};
const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    await feedback.destroy({ where: { id } });
    res.status(200).send({ message: "Delete Successfully!!" });
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = {
  createFeedBackOnCourse,
  getAllFeedbackOnCourse,
  getAllFeedbackOnTeacher,
  getRatingOnTeacher,
  getRatingAndContentOnTeacher,
  updateFeedback,
  deleteFeedback,
};
