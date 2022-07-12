const {
  course_template,
  units,
  internalmember,
  feedback,
  managecoursedetail,
  studentregistercourses,
  group_course,
  sequelize,
} = require("../models");
const { Op } = require("sequelize");
const { QueryTypes } = require("sequelize");
const findAllShortCourseInfo = async (req, res) => {
  try {
    const courseList = await course_template.findAll({
      attributes: {
        exclude: ["exp", "numofreg", "createdAt", "updatedAt"],
      },
    });
    res.status(200).send(courseList);
  } catch (error) {
    res.status(500).send(error);
  }
};
const findAllCourseInfo = async (req, res) => {
  try {
    const querySql = `
    SELECT c.id,c.name,c.exp,c.description,c.numofreg,c.image,c.level,c.type,c.isFree,c.extraProp,c.id_internal_member,u.firstName,u.lastName
    FROM users u , teachers t , internalmembers i , course_templates c
    WHERE u.id = t.id AND t.id=i.id AND i.id = c.id_internal_member
    `;
    const feedbackQuery = `
    SELECT c.id, SUM(rating)/COUNT(rating) as rating
    FROM  course_templates c, feedbacks f 
    WHERE c.id = f.id_course 
    GROUP BY c.id 
    `;
    const courseList = await sequelize.query(querySql, {
      type: QueryTypes.SELECT,
    });
    const feedbackCourseList = await sequelize.query(feedbackQuery, {
      type: QueryTypes.SELECT,
    });
    res.status(200).send({ courseList, feedbackCourseList });
  } catch (error) {
    res.status(500).send(error);
  }
};
const getCourseBaseQuery = async (req, res) => {
  try {
    const { teacherId, courseLevel, courseName } = req.query;
    const querySql = `
    SELECT c.id,c.name,c.exp,c.description,c.numofreg,c.image,c.level,c.type,c.isFree,c.extraProp,c.id_internal_member,u.firstName,u.lastName
    FROM users u , teachers t , internalmembers i , course_templates c
    WHERE u.id = t.id AND t.id=i.id AND i.id = c.id_internal_member AND c.id_internal_member like :idTeacher AND c.level like :level AND c.name like :name
    `;
    const courseList = await sequelize.query(querySql, {
      replacements: {
        idTeacher: "%" + teacherId + "%",
        level: "%" + courseLevel + "%",
        name: "%" + courseName + "%",
      },
      type: QueryTypes.SELECT,
    });
    res.status(200).send(courseList);
  } catch (error) {
    res.status(500).send(error);
  }
};
const findDetailCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await course_template.findOne({
      include: [{ model: units }],
      where: { id },
    });
    res.status(200).send(course);
  } catch (error) {
    res.status(500).send(error);
  }
};
const searchCourseByName = async (req, res) => {
  try {
    const { keyword } = req.query;
    const courseList = await course_template.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      where: {
        name: {
          [Op.like]: "%" + keyword + "%",
        },
      },
    });
    res.status(200).send(courseList);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getTop3Course = async (req, res) => {
  try {
    const querySql = `
    SELECT c.id, c.name,c.exp,c.description,c.numofreg,c.image,c.level,SUM(rating)/COUNT(rating) AS rating
    FROM feedbacks f ,course_templates c
    WHERE f.id_course = c.id
    GROUP BY c.id ORDER BY SUM(rating)/COUNT(rating) DESC LIMIT 3
        `;
    const result = await sequelize.query(querySql, {
      type: QueryTypes.SELECT,
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getTop10CourseBaseReg = async (req, res) => {
  try {
    const querySql = `
    SELECT c.id, c.name,c.numofreg
    FROM course_templates c
    GROUP BY c.id ORDER BY c.numofreg DESC LIMIT 10
        `;
    const result = await sequelize.query(querySql, {
      type: QueryTypes.SELECT,
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getTop10CourseBaseRating = async (req, res) => {
  try {
    const querySql = `
    SELECT c.id, c.name,c.numofreg,SUM(rating)/COUNT(rating) AS rating
    FROM feedbacks f ,course_templates c
    WHERE f.id_course = c.id
    GROUP BY c.id ORDER BY SUM(rating)/COUNT(rating) DESC LIMIT 10
        `;
    const result = await sequelize.query(querySql, {
      type: QueryTypes.SELECT,
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getTop3CourseEachCourse = async (req, res) => {
  try {
    const { type } = req.query;
    const querySql = `
    SELECT id_course,c.type , c.name,c.exp,c.description,c.numofreg,c.image,c.level,SUM(rating)/COUNT(rating) AS Rating
    FROM feedbacks f ,course_templates c
    WHERE f.id_course = c.id AND c.type = :type
    GROUP BY id_course  ORDER BY SUM(rating)/COUNT(rating) DESC LIMIT 3
        `;
    const result = await sequelize.query(querySql, {
      replacements: { type: type },
      type: QueryTypes.SELECT,
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};
const getInfoInternalMemberCourse = async (req, res) => {
  try {
    const { id_course } = req.query;
    const querySql = `
    SELECT u.id, u.firstName,u.lastName,u.role,u.level,u.userName,u.email,u.birthday,u.image,u.desc
    FROM users u ,course_templates c
    WHERE u.id = c.id_internal_member AND c.id =:id
    GROUP BY u.id
        `;
    const result = await sequelize.query(querySql, {
      replacements: { id: id_course },
      type: QueryTypes.SELECT,
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};
const createCourse = async (req, res) => {
  try {
    const {
      courseName,
      courseExp,
      courseLevel,
      courseDesc,
      courseTeacher,
      courseImageUrl,
      courseType,
      courseIsFree,
    } = req.body;
    const checkIdTeacher = await internalmember.findOne({
      where: { id: courseTeacher },
    });
    if (checkIdTeacher != null) {
      const checkName = await course_template.findOne({
        where: {
          name: courseName,
        },
      });
      if (checkName) {
        res.status(404).send({
          messages: "Name Course existed",
        });
      } else {
        const newCourse = await course_template.create({
          name: courseName,
          exp: courseExp,
          description: courseDesc,
          numofreg: 0,
          image: courseImageUrl,
          level: courseLevel,
          type: courseType,
          isFree: courseIsFree,
          id_internal_member: courseTeacher,
        });
        res.status(201).send({ newCourse, message: "create successfully" });
      }
    } else {
      res.status(404).send({ message: "Id don't exist" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      courseName,
      courseExp,
      courseLevel,
      courseDesc,
      courseTeacher,
      courseImageUrl,
      courseType,
      courseIsFree,
    } = req.body;
    const checkIdTeacher = await internalmember.findOne({
      where: { id: courseTeacher },
    });
    if (checkIdTeacher != null) {
      const currentName = await course_template.findByPk(id);
      if (currentName.name != courseName) {
        const checkName = await course_template.findOne({
          where: {
            name: courseName,
          },
        });
        if (checkName) {
          res.status(404).send({
            messages: "Name Course existed",
          });
        } else {
          await course_template.update(
            {
              name: courseName,
              exp: courseExp,
              description: courseDesc,
              image: courseImageUrl,
              level: courseLevel,
              type: courseType,
              isFree: courseIsFree,
              id_internal_member: courseTeacher,
            },
            { where: { id } }
          );
          const newCourseUpdate = await course_template.findByPk(id);
          res
            .status(200)
            .send({ newCourseUpdate, message: "update successfully" });
        }
      } else {
        await course_template.update(
          {
            name: courseName,
            exp: courseExp,
            description: courseDesc,
            image: courseImageUrl,
            level: courseLevel,
            type: courseType,
            isFree: courseIsFree,
            id_internal_member: courseTeacher,
          },
          { where: { id } }
        );
        const newCourseUpdate = await course_template.findByPk(id);
        res
          .status(200)
          .send({ newCourseUpdate, message: "update successfully" });
      }
    } else {
      res.status(404).send({ message: "Id don't exist" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteFeedback = await feedback.findAll({
      where: { id_course: id },
    });
    const deleteCourseManageByAdmin = await managecoursedetail.findAll({
      where: { id_course: id },
    });
    const deleteUnit = await units.findAll({
      where: { id_course: id },
    });
    const deleteCourseRegistedByStudent = await studentregistercourses.findAll({
      where: { id_course: id },
    });
    const getCourseInCoursePath = await group_course.findAll({
      where: { id_course: id },
    });
    if (deleteFeedback != null) {
      await feedback.destroy({
        where: { id_course: id },
      });
    }
    if (deleteCourseManageByAdmin != null) {
      await managecoursedetail.destroy({
        where: { id_course: id },
      });
    }
    if (deleteUnit != null) {
      await units.destroy({
        where: { id_course: id },
      });
    }
    if (deleteCourseRegistedByStudent != null) {
      await studentregistercourses.destroy({
        where: { id_course: id },
      });
    }
    if (getCourseInCoursePath.length != 0) {
      getCourseInCoursePath.map(async (getCourseInCoursePath) => {
        const updateOrderQuery =
          "UPDATE `group_courses` SET `order` = `order` - 1 WHERE `id_course_path` = :id_course_path AND `order` > :order";
        await sequelize.query(updateOrderQuery, {
          replacements: {
            id_course_path: getCourseInCoursePath.id_course_path,
            order: getCourseInCoursePath.order,
          },
        });
      });
      await group_course.destroy({
        where: { id_course: id },
      });
    }
    await course_template.destroy({
      where: { id },
    });
    res.status(200).send({ message: "Delete Successfully!!" });
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = {
  findAllShortCourseInfo,
  findAllCourseInfo,
  findDetailCourse,
  searchCourseByName,
  getTop3Course,
  getTop3CourseEachCourse,
  getInfoInternalMemberCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  getTop10CourseBaseReg,
  getTop10CourseBaseRating,
  getCourseBaseQuery,
};
