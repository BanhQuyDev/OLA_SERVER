const {Router} = require("express");
const { bookClass, updateStatus, getExternalTeacherBusyTime, getAllClassOneOneOfTeacher, getAllClassOneOneOfStudent, getAllClassOneOne} = require("../controllers/bookclass.controller");
const { checkExist } = require('../middlewares/validation/check-exist');
const {classes,externalmember,students} = require("../models");
const bookClassRouter = Router();

//http://localhost:7000/api/v1/bookclass
bookClassRouter.post("/",[],bookClass)
//http://localhost:7000/api/v1/bookclass/updatestatus/:id
bookClassRouter.put("/updatestatus/:id",[checkExist(classes)],updateStatus)
//http://localhost:7000/api/v1/bookclass/getBusyTimeOfTeacher/:id
bookClassRouter.get("/getBusyTimeOfTeacher/:id",[checkExist(externalmember)],getExternalTeacherBusyTime)
//http://localhost:7000/api/v1/bookclass/getAllClass/teacher/:id
bookClassRouter.get("/getAllClass/teacher/:id",[checkExist(externalmember)],getAllClassOneOneOfTeacher)
//http://localhost:7000/api/v1/bookclass/getAllClass/student/:id
bookClassRouter.get("/getAllClass/student/:id",[checkExist(students)],getAllClassOneOneOfStudent)
//http://localhost:7000/api/v1/bookclass/GetAllClass
bookClassRouter.get("/GetAllClass",[],getAllClassOneOne)
module.exports = {
    bookClassRouter
}