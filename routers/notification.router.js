const { Router } = require("express");
const { createNotification, getNotification, updateStatusNotification } = require("../controllers/notification.controller");
const { checkExist } = require("../middlewares/validation/check-exist");
const { users,notification} = require("../models");
const notificationRouter = Router();
//http://localhost:7000/api/v1/notification
notificationRouter.post("/",[],createNotification);
//http://localhost:7000/api/v1/notification/:id
notificationRouter.get("/:id",[checkExist(users)],getNotification);
//http://localhost:7000/api/v1/notification/:id
notificationRouter.put("/update-status/:id",[checkExist(notification)],updateStatusNotification);
module.exports = {
    notificationRouter,
  };