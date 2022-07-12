const { users, chats, sequelize } = require("../models");
const { QueryTypes } = require("sequelize");
const sendMessage = async (req, res) => {
  try {
    const { idSender, idReceiver, content } = req.body;
    const sender = await users.findOne({ where: { id: idSender } });
    const receiver = await users.findOne({ where: { id: idReceiver } });
    const sendMessage = await chats.create({ content, idSender, idReceiver });
    const senderInfo = [sender.firstName, sender.lastName, sender.image];
    const receiverInfo = [
      receiver.firstName,
      receiver.lastName,
      receiver.image,
    ];
    res.status(201).send({
      message: "Send Successfully!!",
      sendMessage,
      senderInfo,
      receiverInfo,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
const getAllMessage = async (req, res) => {
  try {
    const { idSender, idReceiver } = req.body;
    const sender = await users.findOne({ where: { id: idSender } });
    const receiver = await users.findOne({ where: { id: idReceiver } });
    const senderInfo = [sender.firstName, sender.lastName, sender.image];
    const receiverInfo = [
      receiver.firstName,
      receiver.lastName,
      receiver.image,
    ];
    const sql = `
    SELECT * FROM chats c 
    WHERE  idSender = :idSender AND idReceiver = :idReceiver 
    UNION
    SELECT * FROM chats c
    WHERE idSender = :idReceiver AND idReceiver = :idSender
    ORDER BY createdAt desc
    `;
    const getAllMessage = await sequelize.query(sql,{
      replacements: {idSender,idReceiver},
      type:QueryTypes.SELECT,
    })
    res.status(200).send({ getAllMessage, senderInfo, receiverInfo });
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = {
  sendMessage,
  getAllMessage,
};
