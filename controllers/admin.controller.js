const { users, admin, managecoursedetail, sequelize,notification } = require("../models");
const { Op } = require("sequelize");
const { QueryTypes } = require("sequelize");
const bycryptjs = require("bcryptjs");
const findDetailAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await users.findOne({
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
      where: {
        id,
        role: "admin",
      },
    });
    const admin1 = await admin.findOne({ where: { id, active: true } });
    if (admin1) {
      res.status(200).send([user, admin1]);
    }else{
      res.status(404).send({ message: "Admin isn't active" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
const getAllAdmin = async (req, res) => {
  try {
    const sql = `
    SELECT u.id, u.firstName,u.lastName,u.role,u.level,u.userName,u.email,u.birthday,u.image,u.desc,a.active,u.nationality,a.active
    FROM users u , admins a
    WHERE u.id = a.id
    `;
    const listAdmin = await sequelize.query(sql, {
      type: QueryTypes.SELECT,
    });
    res.status(200).send(listAdmin);
  } catch (error) {
    res.status(500).send(error);
  }
};
const createAdmin = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      password,
      level,
      userName,
      email,
      desc,
      nationality
    } = req.body;
    const salt = bycryptjs.genSaltSync(10);
    const hashPassword = bycryptjs.hashSync(password, salt);
    const newUser = await users.create({
      firstName,
      lastName,
      role: "admin",
      password:hashPassword,
      level,
      userName,
      email,
      birthday:null,
      image:null,
      desc,
      nationality
    });
    await admin.create({
      id: newUser.id,
      active: true,
    });
    res.status(201).send({message:"Create successfully !!!"});
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      userName,
      email,
      image,
      desc,
      nationality
    } = req.body;
    const adminUser = await users.findByPk(id);
    if (adminUser.userName != userName) {
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
        const user_update_admin = await users.update(
          {
            firstName,
            lastName,
            userName,
            email,
            image,
            desc,
            nationality
          },
          {
            where: {
              [Op.and]: [{ id }, { role: "admin" }, {}],
            },
          }
        );
        if (user_update_admin != 0) {
          const updateUser = await users.findByPk(id);
          res.status(200).send({updateUser});
        } else {
          res.status(400).send({ message: "Role isn't admin" });
        }
      }
    } else {
      const user_update_admin = await users.update(
        {
          firstName,
          lastName,
          userName,
          email,
          image,
          desc,
          nationality
        },
        {
          where: {
            [Op.and]: [{ id }, { role: "admin" }],
          },
        }
      );
      if (user_update_admin != 0) {
        const updateUser = await users.findByPk(id);
        res.status(200).send({updateUser});
      } else {
        res.status(400).send({ message: "Role isn't admin" });
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
const disableAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteAdminManageCourse = await managecoursedetail.findAll({
      where: { id_admin: id },
    });
    console.log(deleteAdminManageCourse);
    if (deleteAdminManageCourse.length == 0) {
      await admin.update(
        {
          active:false,
        },
        {
          where: { id },
        }
      );
      res.status(200).send({ message: "Delete Successfully!!" });
    }else{
      res.status(200).send({ message: "Can't delete admin have manage course" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
const updateActive = async (req, res) => {
  try {
    const {id} = req.params;
    await admin.update(
      {
        active:true,
      },
      {
        where: { id },
      }
    );
    res.status(200).send({message: 'Update Successfully!!'});
  } catch (error) {
    res.status(500).send(error);
  }
}
module.exports = {
  createAdmin,
  updateAdmin,
  findDetailAdmin,
  disableAdmin,
  getAllAdmin,
  updateActive
};
