const { Router } = require("express");
const { updateImage } = require("../controllers/user.controller");
const userRouter = Router();
//http://localhost:7000/api/v1/user/update-image
userRouter.put("/update-image/:id",[],updateImage);
module.exports = {
    userRouter,
};