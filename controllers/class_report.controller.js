const {
  class_report,
  sequelize,
} = require("../models");
const saveReport = async (req, res) => {
  try {
    const { name, desc, report_url, idStudent, idTeacher, idClass } = req.body;
    const saveReport = await class_report.create({
      name,
      desc,
      report_url,
      id_student: idStudent,
      id_teacher: idTeacher,
      id_class: idClass,
    });
    res.status(201).send({ saveReport });
  } catch (error) {
    res.status(500).send(error);
  }
};
const getReport = async (req, res) => {
  try {
    const getReport = await class_report.findAll();
    res.status(20).send(getReport);
  } catch (error) {
    res.status(500).send(error);
  }
};
const getReportOfClass = async (req, res) => {
  try {
    const {idClass} = req.params;
    const getReport = await class_report.findOne({where:{id_class:idClass}});
    if(getReport){
      res.status(200).send(getReport);
    }else{
      res.status(200).send({message: "Don't have class report"});
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
const updateReport = async (req, res) => {
  try {
    const { id } = req.params;
    const { desc, report_url } = req.body;
    await class_report.update(
      {
        desc,
        report_url,
      },
      { where: {id} }
    );
    const newReport = await class_report.findByPk(id)
    res.status(200).send({newReport,message: "Update successfully !!!"});
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = {
  saveReport,
  getReport,
  updateReport,
  getReportOfClass
};
