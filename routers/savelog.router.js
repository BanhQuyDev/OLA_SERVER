const { Router } = require("express");
const { save_tracklog, gettracklog } = require("../controllers/checklog.controller");
const checkLogRouter = Router();
//http://localhost:7000/api/v1/checklog
checkLogRouter.post("/",[],save_tracklog);
//http://localhost:7000/api/v1/checklog?courseID=...&studentID....
checkLogRouter.get("/",[],gettracklog);
module.exports = {
  checkLogRouter,
};