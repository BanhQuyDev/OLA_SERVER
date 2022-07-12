const { Router } = require("express");
const {
  createStudent,
  updateStudent,
  findAllStudent,
  findDetailStudent,
  changePassword,
  findAllUser,
  getNumberOfClass,
  checkClassUsedOfStudent,
  checkMemberShip,
  statisticalMembership,
  countTypeMemberShip,
  updateMemberShip,
} = require("../controllers/student.controller");
const { users,students } = require("../models");
const { checkExist } = require("../middlewares/validation/check-exist");
const { checkDuplicate } = require("../middlewares/validation/check-duplicate");
const { checkExistUserName } = require("../middlewares/validation/check-exist-username");
const studentRouter = Router();
//http://localhost:7000/api/v1/student/membership/numofclass?type=....
studentRouter.get("/membership/numofclass", [], getNumberOfClass);
//http://localhost:7000/api/v1/student/membership/getInfoBetweenTypeAndAll?type=....
studentRouter.get("/membership/getInfoBetweenTypeAndAll",[],statisticalMembership)
//http://localhost:7000/api/v1/student/membership/count-type-membership?type=....
studentRouter.get("/count-type-membership",[],countTypeMemberShip)
//http://localhost:7000/api/v1/student/membership-check/:id
studentRouter.get("/membership-check/:id", [checkExist(students)], checkMemberShip);
//http://localhost:7000/api/v1/student/check-class/:id
studentRouter.get("/check-class/:id", [checkExist(students)], checkClassUsedOfStudent);
//http://localhost:7000/api/v1/student/update-membership
studentRouter.put("/update-membership", [], updateMemberShip);
//http://localhost:7000/api/v1/student/changepassword
studentRouter.put("/changepassword/:id", [checkExist(users)], changePassword);
//http://localhost:7000/api/v1/student
studentRouter.post("/", [checkDuplicate(users),checkExistUserName(users)], createStudent);
//http://localhost:7000/api/v1/student/:id
studentRouter.put("/:id", [checkExist(users)], updateStudent);
//http://localhost:7000/api/v1/student
studentRouter.get("/", [], findAllStudent);
//http://localhost:7000/api/v1/student/getalluser
studentRouter.get("/getalluser", [], findAllUser);
//http://localhost:7000/api/v1/student/:id
studentRouter.get("/:id", [checkExist(users)], findDetailStudent);
module.exports = {
  studentRouter,
};
