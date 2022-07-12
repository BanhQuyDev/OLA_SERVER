const { users, notification } = require("../models");
const createNotification = async (req, res) => {
  try {
    const { content, userID } = req.body;
    const checkExistUser = await users.findByPk(userID);
    if (checkExistUser) {
      const createNotification = await notification.create({
        content,
        status: "unread",
        id_user: userID,
      });
      res
        .status(200)
        .send({ message: "Create successfully !!", createNotification });
    } else {
      res.status(404).send({ message: "Id don't exist!!" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
const getNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const getNotification = await notification.findAll({
      where: { id_user: id },
    });
    res.status(200).send({ getNotification });
  } catch (error) {
    res.status(500).send(error);
  }
};
const updateStatusNotification = async (req, res) => {
  try {
    const { id } = req.params;
    await notification.update(
      { status: "read" },
      {
        where: { id: id },
      }
    );
    res.status(200).send({ message: "Update Successfully!!"});
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = {
  createNotification,
  getNotification,
  updateStatusNotification,
};
