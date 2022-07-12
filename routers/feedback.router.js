const { Router } = require("express");
const { createFeedBackOnCourse, getAllFeedbackOnCourse, getAllFeedbackOnTeacher, getRatingOnTeacher, getRatingAndContentOnTeacher, deleteFeedback, updateFeedback } = require("../controllers/feedback.controller");
const { checkExist } = require("../middlewares/validation/check-exist");
const { course_template,teachers,externalmember,feedback } = require("../models");
const feedbackRouter = Router();
//http://localhost:7000/api/v1/feedback
feedbackRouter.post("/", [], createFeedBackOnCourse);
//http://localhost:7000/api/v1/feedback/course/:id
feedbackRouter.get("/course/:id", [checkExist(course_template)],getAllFeedbackOnCourse);
//http://localhost:7000/api/v1/feedback/teacher/:id
feedbackRouter.get("/teacher/:id", [checkExist(teachers)],getAllFeedbackOnTeacher);
//http://localhost:7000/api/v1/feedback/getratingcontent/teacher/:id
feedbackRouter.get("/getratingcontent/teacher/:id", [checkExist(externalmember)],getRatingAndContentOnTeacher);
//http://localhost:7000/api/v1/feedback/getrating/teacher/:id
feedbackRouter.get("/getrating/teacher/:id", [checkExist(externalmember)],getRatingOnTeacher);
//http://localhost:7000/api/v1/feedback/update/:id
feedbackRouter.put("/update/:id", [checkExist(feedback)],updateFeedback);
//http://localhost:7000/api/v1/feedback/delete/:id
feedbackRouter.delete("/delete/:id", [checkExist(feedback)],deleteFeedback);
module.exports = {
  feedbackRouter,
};