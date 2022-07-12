const {Router} = require('express');
const { saveReport, getReport, updateReport, getReportOfClass } = require('../controllers/class_report.controller');
const { checkExist } = require('../middlewares/validation/check-exist');
const {
    class_report
  } = require("../models");
const classReport = Router();
//http://localhost:7000/api/v1/class-report/save
classReport.post("/save",[],saveReport);
//http://localhost:7000/api/v1/class-report/getAll
classReport.get("/getAll",[],getReport);
//http://localhost:7000/api/v1/class-report/get-class-report/:idClass
classReport.get("/get-class-report/:idClass",[],getReportOfClass);
//http://localhost:7000/api/v1/class-report/save
classReport.put("/update/:id",[checkExist(class_report)],updateReport);
module.exports = {
    classReport
}