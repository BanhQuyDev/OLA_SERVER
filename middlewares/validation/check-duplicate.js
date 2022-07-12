const checkDuplicate = (Model) => async (req, res, next) => {
    try {
      const { id } = req.body;
      const detail = await Model.findByPk(id);
      if (detail) {
        res.status(400).send({ messages: "Id is duplicated" });
      } else {
        next();
      }
    } catch (error) {
      res.status(500).send(error);
    }
  };
  module.exports = {
    checkDuplicate,
  };