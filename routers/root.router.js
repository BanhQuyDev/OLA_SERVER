const { Router } = require("express");
const { adminRouter } = require("./admin.router");
const { bookClassRouter } = require("./bookclass.router");
const { busytimeRouter } = require("./busytime.router");
const { chatRouter } = require("./chat.router");
const { classReport } = require("./class_report.router");
const { commentRouter } = require("./comment.router");
const { courseRouter } = require("./course_template.router");
const { feedbackRouter } = require("./feedback.router");
const { loginRouter } = require("./login.router");
const { notificationRouter } = require("./notification.router");
const { numOfCancelRouter } = require("./numofcancel.router");
const { paymentRouter } = require("./payment.router");
const { checkLogRouter } = require("./savelog.router");
const { studentRouter } = require("./student.router");
const { studentregistercourseRouter } = require("./studentregistercourse.router");
const { suggestcourseRouter } = require("./suggestcourse.router");
const { teacherRouter } = require("./teacher.router");
const { unitRouter } = require("./unit.router");
const { uploadS3Router } = require("./uploadS3.router");
const { userRouter } = require("./user.router");
const { videoChatRouter } = require("./videoChat.router");
const rootRouter = Router();
//http://localhost:7000/api/v1
rootRouter.use("/student", studentRouter);
rootRouter.use("/teacher", teacherRouter);
rootRouter.use("/admin", adminRouter);
rootRouter.use("/course", courseRouter);
rootRouter.use("/register", studentregistercourseRouter);
rootRouter.use("/comment", commentRouter);
rootRouter.use("/feedback", feedbackRouter);
rootRouter.use("/checklog", checkLogRouter);
rootRouter.use("/unit", unitRouter);
rootRouter.use("/upload", uploadS3Router);
rootRouter.use("/bookclass", bookClassRouter);
rootRouter.use("/classRoom", videoChatRouter);
rootRouter.use("/login", loginRouter);
rootRouter.use("/suggest", suggestcourseRouter);
rootRouter.use("/notification", notificationRouter);
rootRouter.use("/num-of-cancel", numOfCancelRouter);
rootRouter.use("/busy-time", busytimeRouter);
rootRouter.use("/class-report", classReport);
rootRouter.use("/payment", paymentRouter);
rootRouter.use("/user", userRouter);
rootRouter.use("/chat", chatRouter);
//this is just for quick testing when needed, this would be removed later
rootRouter.get("/test", (req, res)=>{
  res.send('OK')
})
module.exports = {
  rootRouter,
};