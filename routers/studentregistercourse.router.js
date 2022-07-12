const { Router } = require("express");
const { createInfoRegister, unregisterCourse, getStudentRegisterStatus, getAllCourseRegistedByStudent, bulkRegister } = require("../controllers/studentregistercourse.controller");
const { checkExist } = require("../middlewares/validation/check-exist");
const { students,course_template} = require("../models");

const studentregistercourseRouter = Router();
//http://localhost:7000/api/v1/register
studentregistercourseRouter.post("/", [],createInfoRegister);
//http://localhost:7000/api/v1/register/bulk-register
studentregistercourseRouter.post("/bulk-register", [],bulkRegister);
//http://localhost:7000/api/v1/register/cancel?studentID=..&courseID=...
studentregistercourseRouter.delete("/cancel", [],unregisterCourse);
//http://localhost:7000/api/v1/register/status?studentID=....
studentregistercourseRouter.get("/status",[],getStudentRegisterStatus);
//http://localhost:7000/api/v1/register/getAllCourse?studentID=...
studentregistercourseRouter.get("/getAllCourse", [],getAllCourseRegistedByStudent);
module.exports = {
  studentregistercourseRouter,
};
