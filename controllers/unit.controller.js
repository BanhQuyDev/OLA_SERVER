const {
  units,
  course_template,
  studentstudyunit,
  learninglog,
  comment,
  sequelize,
} = require("../models");
const createUnit = async (req, res) => {
  try {
    const { newUnit, id_course } = req.body;
    const { name, video_url, file_url, order, description } = newUnit;
    const checkIdCourse = await course_template.findOne({
      where: { id: id_course },
    });
    if (checkIdCourse != null) {
      const checkNameUnit = await units.findOne({
        where: {
          name,
          id_course,
        },
      });
      if (checkNameUnit) {
        res.status(404).send({
          messages: "Name unit of course  existed",
        });
      } else {
        const newUnit = await units.create({
          name,
          type: "abc",
          video_url,
          file_url,
          order,
          description,
          id_course,
        });
        res.status(201).send(newUnit);
      }
    } else {
      res.status(400).send({ message: "Id don't exist'" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const createUnitWhenUpdateCourse = async (req, res) => {
  try {
    const { newUnit, id_course } = req.body;
    const { name, video_url, file_url, order, description } = newUnit;
    const checkIdCourse = await course_template.findOne({
      where: { id: id_course },
    });
    const checkNameUnit = await units.findOne({
      where: {
        name,
        id_course,
      },
    });
    if (checkNameUnit) {
      res.status(404).send({
        messages: "Name unit of course  existed",
      });
    } else {
      const updateOrderQuery =
        "UPDATE `units` SET `order` = `order` + 1 WHERE `id_course` = :id_course AND `order` >= :order";
      await sequelize.query(updateOrderQuery, {
        replacements: { id_course, order },
      });
      if (checkIdCourse != null) {
        const newUnit = await units.create({
          name,
          type: "abc",
          video_url,
          file_url,
          order,
          description,
          id_course,
        });
        res.status(201).send(newUnit);
      } else {
        res.status(400).send({ message: "Id don't exist'" });
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateUnit = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, video_url, file_url, order, description, id_course } =
      req.body;
    const checkIdCourse = await course_template.findOne({
      where: { id: id_course },
    });
    const currentName = await units.findByPk(id);
    if (currentName.name != name) {
      const checkName = await units.findOne({
        where: {
          name,
          id_course,
        },
      });
      if (checkName) {
        res.status(404).send({
          messages: "Name unit of course  existed",
        });
      } else {
        const currentOrder = await units.findByPk(id);
        if (currentOrder.order > order) {
          const updateOrderQuery =
            "UPDATE `units` SET `order` = `order` + 1 WHERE `id_course` = :id_course AND `order` < :currentOrder AND `order` >= :order";
          await sequelize.query(updateOrderQuery, {
            replacements: {
              id_course,
              order,
              currentOrder: currentOrder.order,
            },
          });
          if (checkIdCourse != null) {
            await units.update(
              {
                name,
                type,
                video_url,
                file_url,
                order,
                description,
                id_course,
              },
              { where: { id } }
            );
            const newUpdateUnit = await units.findByPk(id);
            res.status(200).send({newUpdateUnit,message: "update successfully" });
          } else {
            res.status(404).send({ message: "Id don't exist'" });
          }
        } else if (currentOrder.order < order) {
          const updateOrderQuery =
            "UPDATE `units` SET `order` = `order` - 1 WHERE `id_course` = :id_course AND `order` >= :currentOrder AND `order` <= :order";
          await sequelize.query(updateOrderQuery, {
            replacements: {
              id_course,
              order,
              currentOrder: currentOrder.order,
            },
          });
          if (checkIdCourse != null) {
            await units.update(
              {
                name,
                type,
                video_url,
                file_url,
                order,
                description,
                id_course,
              },
              { where: { id } }
            );
            const newUpdateUnit = await units.findByPk(id);
            res.status(200).send({newUpdateUnit, message: "update successfully" });
          } else {
            res.status(404).send({ message: "Id don't exist'" });
          }
        } else {
          if (checkIdCourse != null) {
            await units.update(
              {
                name,
                type,
                video_url,
                file_url,
                order,
                description,
                id_course,
              },
              { where: { id } }
            );
            const newUpdateUnit = await units.findByPk(id);
            res.status(200).send({newUpdateUnit, message: "update successfully" });
          } else {
            res.status(404).send({ message: "Id don't exist'" });
          }
        }
      }
    } else {
      const currentOrder = await units.findByPk(id);
      if (currentOrder.order > order) {
        const updateOrderQuery =
          "UPDATE `units` SET `order` = `order` + 1 WHERE `id_course` = :id_course AND `order` < :currentOrder AND `order` >= :order";
        await sequelize.query(updateOrderQuery, {
          replacements: {
            id_course,
            order,
            currentOrder: currentOrder.order,
          },
        });
        if (checkIdCourse != null) {
          await units.update(
            { name, type, video_url, file_url, order, description, id_course },
            { where: { id } }
          );
          const newUpdateUnit = await units.findByPk(id);
          res.status(200).send({newUpdateUnit,message: "update successfully" });
        } else {
          res.status(404).send({ message: "Id don't exist'" });
        }
      } else if (currentOrder.order < order) {
        const updateOrderQuery =
          "UPDATE `units` SET `order` = `order` - 1 WHERE `id_course` = :id_course AND `order` >= :currentOrder AND `order` <= :order";
        await sequelize.query(updateOrderQuery, {
          replacements: {
            id_course,
            order,
            currentOrder: currentOrder.order,
          },
        });
        if (checkIdCourse != null) {
          await units.update(
            { name, type, video_url, file_url, order, description, id_course },
            { where: { id } }
          );
          const newUpdateUnit = await units.findByPk(id);
          res.status(200).send({newUpdateUnit,message: "update successfully" });
        } else {
          res.status(404).send({ message: "Id don't exist'" });
        }
      } else {
        if (checkIdCourse != null) {
          await units.update(
            { name, type, video_url, file_url, order, description, id_course },
            { where: { id } }
          );
          const newUpdateUnit = await units.findByPk(id);
          res.status(200).send({newUpdateUnit,message: "update successfully" });
        } else {
          res.status(404).send({ message: "Id don't exist'" });
        }
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteUnit = async (req, res) => {
  try {
    const { id } = req.params;
    const currentOrder = await units.findByPk(id);
    const updateOrderQuery =
      "UPDATE `units` SET `order` = `order` - 1 WHERE `id_course` = :id_course AND `order` > :order";
    await sequelize.query(updateOrderQuery, {
      replacements: {
        id_course: currentOrder.id_course,
        order: currentOrder.order,
      },
    });
    const deleteUnitIdInStudentStudy = await studentstudyunit.findAll({
      where: { id_unit: id },
    });
    const deleteUnitIdInComment = await comment.findAll({
      where: { id_unit: id },
    });
    const deleteLearningLogs = await learninglog.findAll({
      where: { unitDone: id },
    });
    if (deleteUnitIdInStudentStudy != null) {
      await studentstudyunit.destroy({
        where: { id_unit: id },
      });
    }
    if (deleteUnitIdInComment != null) {
      await comment.destroy({
        where: { id_unit: id },
      });
    }
    if (deleteLearningLogs != null) {
      await learninglog.destroy({
        where: { unitDone: id },
      });
    }
    await units.destroy({
      where: { id },
    });
    res.status(200).send({ message: "Delete Successfully!!" });
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = {
  createUnit,
  updateUnit,
  createUnitWhenUpdateCourse,
  deleteUnit,
};
