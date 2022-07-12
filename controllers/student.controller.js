const { users, students, sequelize } = require("../models");
const { Op } = require("sequelize");
const { QueryTypes } = require("sequelize");
const bycryptjs = require("bcryptjs");
const findAllStudent = async (req, res) => {
  try {
    const studentList = await users.findAll({
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
      where: {
        role: "student",
      },
    });
    res.status(200).send(studentList);
  } catch (error) {
    res.status(500).send(error);
  }
};
const findAllUser = async (req, res) => {
  try {
    const userList = await users.findAll({
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });
    res.status(200).send(userList);
  } catch (error) {
    res.status(500).send(error);
  }
};
const findDetailStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await users.findOne({
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
      where: {
        id,
        role: "student",
      },
    });
    if (user != null) {
      const student = await students.findOne({ where: { id } });
      res.status(200).send([user, student]);
    } else {
      res.status(404).send({ message: "Role isn't student" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
const createStudent = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      password,
      userName,
      email,
    } = req.body;
    const salt = bycryptjs.genSaltSync(10);
    const hashPassword = bycryptjs.hashSync(password, salt);
    const newUser = await users.create({
      firstName,
      lastName,
      role: "student",
      password:hashPassword,
      level: 0,
      userName,
      email,
      birthday: null,
      image: null,
      desc:null,
      nationality:"Viet Nam",
    });
    await students.create({
      id: newUser.id,
      memberShip: "free",
    });
    res.status(201).send({ message: "Create successfully !!!" });
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, userName, email, image, desc, nationality } =
      req.body;
    const studentUser = await users.findByPk(id);
    if (studentUser.userName != userName) {
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
              [Op.and]: [{ id }, { role: "student" }],
            },
          }
        );
        const updateUser = await users.findByPk(id);
        res.status(200).send({ updateUser });
      }
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
            [Op.and]: [{ id }, { role: "student" }],
          },
        }
      );
      const updateUser = await users.findByPk(id);
      res.status(200).send({ updateUser });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
const changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;
    const getUser = await users.findByPk(id);
    const isAuth = bycryptjs.compareSync(currentPassword, getUser.password);
    if (isAuth) {
      const salt = bycryptjs.genSaltSync(10);
      const hashPassword = bycryptjs.hashSync(newPassword, salt);
      await users.update(
        {
          password: hashPassword,
        },
        {
          where: {
            id,
          },
        }
      );
      res.status(200).send({ message: "Password updated" });
    } else {
      res.status(400).send({ message: "CurrentPassword incorrect" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const getNumberOfClass = async (req, res) => {
  try {
    const { type } = req.query;
    const sql = `
    SELECT s.id, s.numOfClass,s.memberShip
    FROM students s
    WHERE s.memberShip = :type
    `;
    const getNumber = await sequelize.query(sql, {
      replacements: { type },
      type: QueryTypes.SELECT,
    });
    res.status(200).send(getNumber);
  } catch (error) {
    res.status(500).send(error);
  }
};
const checkClassUsedOfStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await students.findOne({ where: { id } });
    res.status(200).send({classUsed:student.numOfClass});
  } catch (error) {
    res.status(500).send(error);
  }
};
const checkMemberShip = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await students.findOne({ where: { id } });
    res.status(200).send({membershipType: student.memberShip, validMembership: student.validMembership, classInWeek: student.classInWeek});
  } catch (error) {
    res.status(500).send(error);
  }
};
const statisticalMembership = async (req, res) => {
  try {
    const { type } = req.query;
    const countType = await students.count({
      where: {
        memberShip: type,
      },
    });
    const countAll = await students.count();
    const radioTypeAndAll = countType / countAll;
    res.status(200).send({ radioTypeAndAll });
  } catch (error) {
    res.status(500).send(error);
  }
};
const countTypeMemberShip = async (req, res) => {
  try {
    const { type } = req.query;
    const countType = await students.count({
      where: {
        memberShip: type,
      },
    });
    res.status(200).send({ countType });
  } catch (error) {
    res.status(500).send(error);
  }
};
const updateMemberShip = async (req, res) => {
  try {
    const { idStudent, memberShip, classInWeek, validMembership } = req.body;
    const checkExistStudent = await students.findByPk(idStudent);
    if (checkExistStudent) {
      await students.update(
        { memberShip, classInWeek, validMembership },
        { where: { id: idStudent } }
      );
      const newStudent = await students.findByPk(idStudent);
      res.status(200).send({ message: "Update Successfully!!", newStudent });
    } else {
      res.status(404).send({ message: "Id don't exist" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateMemberShipWithUrl = async (idStudent, memberShip, classInWeek, validMembership) => {
  try {
    // const { idStudent, memberShip, classInWeek, validMembership } = req.query;
    const checkExistStudent = await students.findByPk(idStudent);
    if (checkExistStudent) {
      await students.update(
        { memberShip, classInWeek, validMembership },
        { where: { id: idStudent } }
      );
      const newStudent = await students.findByPk(idStudent);
      // res.status(200).send({ message: "Update Successfully!!", newStudent });
      return "Update Successfully!!"
    } else {
      // res.status(404).send({ message: "Id don't exist" });
      return "Id don't exist"
    }
  } catch (error) {
    // res.status(500).send(error);
    return error
  }
};
module.exports = {
  findAllUser,
  createStudent,
  updateStudent,
  findAllStudent,
  findDetailStudent,
  changePassword,
  getNumberOfClass,
  checkClassUsedOfStudent,
  checkMemberShip,
  statisticalMembership,
  countTypeMemberShip,
  updateMemberShip,
  updateMemberShipWithUrl,
};
