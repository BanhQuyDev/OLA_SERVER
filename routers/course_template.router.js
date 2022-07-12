const { Router } = require("express");
const { course_template } = require("../models");
const { checkExist } = require("../middlewares/validation/check-exist");
const { findAllShortCourseInfo, findAllCourseInfo, findDetailCourse, searchCourseByName, getTop3Course, getTop3CourseEachCourse, getInfoInternalMemberCourse, createCourse, updateCourse, deleteCourse, getTop10CourseBaseReg, getTop10CourseBaseRating, getCourseBaseQuery } = require("../controllers/course_template.controller");
const courseRouter = Router();
//http://localhost:7000/api/v1/course/top3courseeachtype?type=...
courseRouter.get("/top3courseeachtype",[],getTop3CourseEachCourse);
//http://localhost:7000/api/v1/course/getcoursequery?teacherId=1&courseLevel=1&courseName=abc
courseRouter.get("/getcoursequery",[],getCourseBaseQuery);
//http://localhost:7000/api/v1/course/top10course
courseRouter.get("/top10course",[],getTop10CourseBaseReg);
//http://localhost:7000/api/v1/course/top10course/rating
courseRouter.get("/top10course/rating",[],getTop10CourseBaseRating);
//http://localhost:7000/api/v1/course/getInfoInternal?id_course=...
courseRouter.get("/getInfoInternal",[],getInfoInternalMemberCourse);
//http://localhost:7000/api/v1/course/short-info
courseRouter.get("/short-info", [], findAllShortCourseInfo);
//http://localhost:7000/api/v1/course/top3course
courseRouter.get("/top3course",[],getTop3Course);
//http://localhost:7000/api/v1/course
courseRouter.get("/", [], findAllCourseInfo);
//http://localhost:7000/api/v1/course/search?keyword=....
courseRouter.get("/search",[],searchCourseByName);
//http://localhost:7000/api/v1/course/:id
courseRouter.get("/:id", [checkExist(course_template)],findDetailCourse);
//http://localhost:7000/api/v1/course/:id
courseRouter.delete("/:id", [checkExist(course_template)],deleteCourse);
//http://localhost:7000/api/v1/course/create
courseRouter.post("/create",[],createCourse);
//http://localhost:7000/api/v1/course/update/:id
courseRouter.put("/update/:id",[checkExist(course_template)],updateCourse);
module.exports = {
  courseRouter,
};
