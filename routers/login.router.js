const { Router } = require("express");
const { checklogin } = require("../controllers/login.controller");
const loginRouter = Router();
//http://localhost:7000/api/v1/login
loginRouter.post("/",[],checklogin);

module.exports = {
    loginRouter,
  };