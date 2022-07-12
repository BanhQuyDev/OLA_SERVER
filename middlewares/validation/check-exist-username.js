const checkExistUserName = (Model) => async (req, res, next) => {
    try {
      const { userName } = req.body;
      const detail = await Model.findOne({
        where: {
            userName,
        },
      });
      if (detail) {
        res.status(404).send({
            messages: "Username existed",
          });
      } else {
        next();
      }
    } catch (error) {
      res.status(500).send(error);
    }
  };
  module.exports ={
    checkExistUserName
  }