const {
  course_path,
  group_course,
  course_template,
  sequelize,
} = require("../models");
const saveSuggestPath = async (req, res) => {
  try {
    const { idAdmin, name, desc, groupCourse } = req.body;
    const coursePath = await course_path.create({
      name,
      desc,
      id_admin: idAdmin,
    });
    groupCourse.map(async (groupCourse) => {
      await group_course.create({
        id_course: groupCourse.courseID,
        id_course_path: coursePath.id,
        order: groupCourse.order,
      });
    });
    res.status(200).send({
      coursePath,
      groupCourse,
      message: "Save suggest course successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
const getOneSuggest = async (req, res) => {
  try {
    const { id } = req.params;
    const coursePath = await course_path.findOne({ where: { id } });
    const groupCourse = await group_course.findAll({
      where: { id_course_path: id },
      include: [{ model: course_template }],
    });
    res.status(200).send({ coursePath, groupCourse });
  } catch (error) {
    res.status(500).send(error);
  }
};
const getAllSuggest = async (req, res) => {
  try {
    const coursePath = await course_path.findAll();
    const groupCourse = await group_course.findAll({
      include: [{ model: course_template }],
    });
    res.status(200).send({ coursePath, groupCourse });
  } catch (error) {
    res.status(500).send(error);
  }
};
const editPath = async (req, res) => {
  try {
    const { idCoursePath, name, desc, groupCourse } = req.body; // groupCourse : {"courseID","order"}
    await course_path.update({ name, desc }, { where: { id: idCoursePath } });
    const coursePath = await course_path.findByPk(idCoursePath);
    await group_course.destroy({where:{id_course_path: idCoursePath}})
    groupCourse.map(async (groupCourse) => {
      await group_course.create({
        id_course: groupCourse.courseID,
        id_course_path: coursePath.id,
        order: groupCourse.order,
      });
    });
    res
      .status(200)
      .send({
        coursePath,
        groupCourse,
        message: "Update course successfully!!",
      });
  } catch (error) {
    res.status(500).send(error);
  }
};
const deletePath = async (req, res) => {
  try {
    const { id } = req.params;
     await group_course.destroy({
      where: { id_course_path: id },
    });
    await course_path.destroy({where:{id}});
    res.status(200).send({message: "Delete Successfully!!"})
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  saveSuggestPath,
  getOneSuggest,
  getAllSuggest,
  editPath,
  deletePath
};
