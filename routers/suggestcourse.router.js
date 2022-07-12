const { Router } = require("express");
const {
  saveSuggestPath,
  getOneSuggest,
  getAllSuggest,
  editPath,
  deletePath,
} = require("../controllers/suggestcourse.controller");
const { checkExist } = require("../middlewares/validation/check-exist");
const { course_path } = require("../models");
const suggestcourseRouter = Router();
//http://localhost:7000/api/v1/suggest/create
suggestcourseRouter.post("/create", [], saveSuggestPath);
//http://localhost:7000/api/v1/suggest/getAll
suggestcourseRouter.get("/getAll", [], getAllSuggest);
//http://localhost:7000/api/v1/suggest/:id
suggestcourseRouter.get("/:id", [checkExist(course_path)], getOneSuggest);
//http://localhost:7000/api/v1/suggest/updatePath
suggestcourseRouter.put("/updatePath", [], editPath);
//http://localhost:7000/api/v1/suggest/delete
suggestcourseRouter.delete("/delete/:id", [checkExist(course_path)], deletePath);
module.exports = {
  suggestcourseRouter,
};
