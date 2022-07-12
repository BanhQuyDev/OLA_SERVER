'use strict'

const Ping = (req, res) => {
  res.send({
      success: true,
    })
    .status(200);
};

module.exports = {
  Ping
};