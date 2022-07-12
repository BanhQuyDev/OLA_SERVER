const {
  users,
  teachers,
  externalmember,
  internalmember,
  course_template,
  sequelize,
} = require("../models");
const bycryptjs = require("bcryptjs");
const { Op } = require("sequelize");
const { QueryTypes } = require("sequelize");
const findDetailTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await users.findOne({
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
      where: {
        id,
        role: "teacher",
      },
    });
    const teacher = await teachers.findOne({ where: { id, active: true } });
    if (teacher) {
      res.status(200).send([user, teacher]);
    } else {
      res.status(200).send({ message: "Don't have teacher" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const findAllTeacherExternal = async (req, res) => {
  try {
    const querySql = `
    SELECT  u.id, u.firstName, u.lastName,u.role,u.level,u.userName,u.email,u.birthday,u.image,u.desc,t.type,t.major,u.nationality,t.degree
    FROM users u ,teachers t
    WHERE u.id = t.id AND t.type = "external" AND t.active = true
    `;
    const feedbackQuery = `
    SELECT t.id, SUM(rating)/COUNT(rating) as rating
    FROM  teachers t, feedbacks f 
    WHERE f.id_teacher = t.id
    GROUP BY t.id 
    `;
    const teacherList = await sequelize.query(querySql, {
      type: QueryTypes.SELECT,
    });
    const feedbackList = await sequelize.query(feedbackQuery, {
      type: QueryTypes.SELECT,
    });
    res.status(200).send({ teacherList, feedbackList });
  } catch (error) {
    res.status(500).send(error);
  }
};
const findAllTeacherInternal = async (req, res) => {
  try {
    const querySql = `
    SELECT  u.id, u.firstName, u.lastName,u.role,u.level,u.userName,u.email,u.birthday,u.image,u.desc,t.type,t.major,u.nationality,t.degree
    FROM users u ,teachers t
    WHERE u.id = t.id AND t.type = "internal" AND t.active = true
    `;
    const teacherList = await sequelize.query(querySql, {
      type: QueryTypes.SELECT,
    });
    res.status(200).send(teacherList);
  } catch (error) {
    res.status(500).send(error);
  }
};

const findAllTeacher = async (req, res) => {
  try {
    const querySql = `
    SELECT  u.id, u.firstName, u.lastName,u.role,u.level,u.userName,u.email,u.birthday,u.image,u.desc,t.type,t.major,u.nationality,t.active,t.degree
    FROM users u ,teachers t
    WHERE u.id = t.id
    `;
    const teacherList = await sequelize.query(querySql, {
      type: QueryTypes.SELECT,
    });
    res.status(200).send(teacherList);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createTeacher = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      password,
      userName,
      email,
      type,
      desc,
      major,
      nationality,
      degree
    } = req.body;
    const salt = bycryptjs.genSaltSync(10);
    const hashPassword = bycryptjs.hashSync(password, salt);
    const newUser = await users.create({
      firstName,
      lastName,
      role: "teacher",
      password:hashPassword,
      level: 0,
      userName,
      email,
      birthday: null,
      image: null,
      desc,
      nationality,
    });
    const newTeacher = await teachers.create({
      id: newUser.id,
      type,
      active: true,
      major,
      degree
    });
    if (newTeacher.type === "external") {
      await externalmember.create({
        id: newUser.id,
      });
    } else if (newTeacher.type === "internal") {
      await internalmember.create({
        id: newUser.id,
      });
    }
    res.status(201).send({ message: "Create successfully !!!" });
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      userName,
      email,
      image,
      desc,
      major,
      nationality,
      degree
    } = req.body;
    const teacherUser = await users.findByPk(id);
    if (teacherUser.userName != userName) {
      const detail = await users.findOne({
        where: {
          userName,
        },
      });
      if (detail) {
        res.status(404).send({
          messages: "Username existed",
        });
      } else {
        await users.update(
          {
            firstName,
            lastName,
            userName,
            email,
            image,
            desc,
            nationality,
          },
          {
            where: {
              [Op.and]: [{ id }, { role: "teacher" }],
            },
          }
        );
        await teachers.update({ major,degree }, { where: { id } });
        const updateUser = await users.findByPk(id);
        const updateTeacher = await teachers.findByPk(id);
        res.status(200).send({ updateUser, updateTeacher });
      }
    } else {
      const user_update_teacher = await users.update(
        {
          firstName,
          lastName,
          userName,
          email,
          image,
          desc,
          nationality,
        },
        {
          where: {
            [Op.and]: [{ id }, { role: "teacher" }],
          },
        }
      );
      await teachers.update({ major,degree }, { where: { id } });
      if (user_update_teacher != 0) {
        const updateUser = await users.findByPk(id);
        const updateTeacher = await teachers.findByPk(id);
        res.status(200).send({ updateUser, updateTeacher });
      } else {
        res.status(400).send({ message: "Role isn't teacher" });
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
const disableExternalTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = `
    SELECT c.id
    FROM one_one_classes o, classes c, externalmembers e
    WHERE e.id = o.id_teacher AND o.id = c.id AND e.id = :id AND c.status = "inComing"
    `;
    const checkClass = await sequelize.query(sql, {
      replacements: { id },
      type: QueryTypes.SELECT,
    });
    if (checkClass.length == 0) {
      await teachers.update(
        { active: false },
        {
          where: { id },
        }
      );
      res.status(200).send({ message: "Delete Successfully!!" });
    } else {
      res.status(200).send({ message: "Can't delete teacher have class inComing" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
const disableInternalTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const checkCourse = await course_template.findAll({where:{id_internal_member:id}})
    if (checkCourse.length == 0) {
      await teachers.update(
        { active: false },
        {
          where: { id },
        }
      );
      res.status(200).send({ message: "Delete Successfully!!" });
    } else {
      res.status(200).send({ message: "Can't delete teacher have assign course" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
const updateActive = async (req, res) => {
  try {
    const { id } = req.params;
    await teachers.update(
      {
        active: true,
      },
      {
        where: { id },
      }
    );
    res.status(200).send({ message: "Update Successfully!!" });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createTeacher,
  updateTeacher,
  findDetailTeacher,
  findAllTeacherExternal,
  findAllTeacherInternal,
  findAllTeacher,
  disableExternalTeacher,
  disableInternalTeacher,
  updateActive,
};
