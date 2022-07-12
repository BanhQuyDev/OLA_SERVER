const { comment, users, units, teachers, sequelize } = require("../models");
const createComment = async (req, res) => {
  try {
    const { id_user, id_unit, content } = req.body;
    const checkIdUser = await users.findOne({
      where: { id: id_user },
    });
    const checkIdUnit = await units.findOne({
      where: { id: id_unit },
    });
    if (checkIdUser != null && checkIdUnit != null) {
      if (checkIdUser.role === "teacher") {
        const checkTypeTeacher = await teachers.findOne({
          where: {
            id: id_user,
            type: "internal",
          },
        });
        if (checkTypeTeacher != null) {
          const newComment = await comment.create({
            id_user,
            id_unit,
            content,
          });
          res.status(201).send(newComment);
        } else {
          res.status(400).send({ message: "teacher role is not internal!!" });
        }
      } else {
        const newComment = await comment.create({
          id_user,
          id_unit,
          content,
        });
        res.status(201).send(newComment);
      }
    } else {
      res.status(404).send({ messages: "Id don't exist" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAllCommentOnUnit = async (req, res) => {
  try {
    const { id } = req.params;
    const listComment = await comment.findAll({
      include: [{model:users}],
      where: {
        id_unit: id,
      },
    });
    res.status(200).send(listComment);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createComment,
  getAllCommentOnUnit,
};
