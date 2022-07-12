const { Router } = require("express");
const {
  createTeacher,
  updateTeacher,
  findDetailTeacher,
  findAllTeacherExternal,
  findAllTeacherInternal,
  findAllTeacher,
  disableExternalTeacher,
  updateActive,
  disableInternalTeacher,
} = require("../controllers/teacher.controller");
const { users,externalmember,teachers,internalmember } = require("../models");
const { checkExist } = require("../middlewares/validation/check-exist");
const { checkDuplicate } = require("../middlewares/validation/check-duplicate");
const { checkExistUserName } = require("../middlewares/validation/check-exist-username");
const teacherRouter = Router();
//http://localhost:7000/api/v1/teacher/getallexternalteacher
teacherRouter.get("/getallexternalteacher", [], findAllTeacherExternal);
//http://localhost:7000/api/v1/teacher/getallinternalteacher
teacherRouter.get("/getallinternalteacher", [], findAllTeacherInternal);
//http://localhost:7000/api/v1/teacher/getallteacher
teacherRouter.get("/getallteacher", [], findAllTeacher);
//http://localhost:7000/api/v1/teacher
teacherRouter.post("/", [checkDuplicate(users),checkExistUserName(users)], createTeacher);
//http://localhost:7000/api/v1/teacher/:id
teacherRouter.put("/:id", [checkExist(teachers)], updateTeacher);
//http://localhost:7000/api/v1/teacher/active/:id
teacherRouter.put("/active/:id", [checkExist(teachers)], updateActive);
//http://localhost:7000/api/v1/teacher/:id
teacherRouter.get("/:id", [checkExist(teachers)], findDetailTeacher);
//http://localhost:7000/api/v1/teacher/external/:id
teacherRouter.delete("/external/:id", [checkExist(externalmember)], disableExternalTeacher);
//http://localhost:7000/api/v1/teacher/internal/:id
teacherRouter.delete("/internal/:id", [checkExist(internalmember)], disableInternalTeacher);
module.exports = {
  teacherRouter,
};