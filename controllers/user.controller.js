const { users, sequelize } = require("../models");

const updateImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { urlImage } = req.body;
    await users.update({ image: urlImage }, { where: { id } });
    res.status(200).send({ message: "Update Successfully!!" });
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = {
  updateImage,
};
