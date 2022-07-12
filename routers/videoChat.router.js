const { Router } = require("express");
const { Ping } = require("../controllers/videoChat.controller");

const videoChatRouter = Router();
videoChatRouter.post("/ping", Ping);

module.exports = {
    videoChatRouter,
}; 