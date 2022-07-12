const { Router } = require("express");
const { sendMessage, getAllMessage } = require("../controllers/chat.controller");
const chatRouter = Router();
//http://localhost:7000/api/v1/chat/send-message
chatRouter.post("/send-message",[],sendMessage);
//http://localhost:7000/api/v1/chat/get-all-messages
chatRouter.get("/get-all-messages",[],getAllMessage);
module.exports = {
    chatRouter
}