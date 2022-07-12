const {
  learninglog,
  units,
  course_template,
  students,
  studentregistercourses,
  users,
  sequelize,
} = require("../models");

const save_tracklog = async (req, res) => {
  try {
    const { unitDone, courseID, studentID, isLasted } = req.body;
    const checkExistUnit = await units.findOne({
      where: {
        id: unitDone,
      },
    });
    const checkExistCourse = await course_template.findOne({
      where: {
        id: courseID,
      },
    });
    const checkExistStudent = await students.findOne({
      where: {
        id: studentID,
      },
    });
    if (checkExistUnit && checkExistCourse && checkExistStudent) {
      if (isLasted === true) {
        const newLog = await learninglog.create({
          unitDone,
          courseID,
          isLasted,
          studentID,
        });
        await studentregistercourses.update(
          {
            status: "finished",
          },
          {
            where: {
              id_student: studentID,
              id_course: courseID,
            },
          }
        );
        const newExpStudent = checkExistStudent.exp + checkExistCourse.exp;
        await students.update({exp:newExpStudent},{where:{id:studentID}});
        if (newExpStudent >= 0 && newExpStudent < 1000){
          await users.update({level:0},{where:{id:studentID}});
        }else if (newExpStudent >= 1000 && newExpStudent < 2000) {
          await users.update({level:1},{where:{id:studentID}});
        }else if (newExpStudent >= 2000 && newExpStudent < 3000) {
          await users.update({level:2},{where:{id:studentID}});
        }else if (newExpStudent >= 3000 && newExpStudent < 4000) {
          await users.update({level:3},{where:{id:studentID}});
        }else if (newExpStudent >= 4000 && newExpStudent < 5000) {
          await users.update({level:4},{where:{id:studentID}});
        }else if (newExpStudent >= 5000 && newExpStudent < 6000) {
          await users.update({level:5},{where:{id:studentID}});
        }else if (newExpStudent >= 6000) {
          await users.update({level:6},{where:{id:studentID}});
        }
          res.status(201).send(newLog);
      } else {
        const newLog = await learninglog.create({
          unitDone,
          courseID,
          isLasted,
          studentID,
        });
        res.status(201).send(newLog);
      }
    } else {
      res.status(404).send({ message: "Id don't exist" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const gettracklog = async (req, res) => {
  try {
    const { courseID, studentID } = req.query;
    const checkExistCourse = await course_template.findOne({
      where: {
        id: courseID,
      },
    });
    const checkExistStudent = await students.findOne({
      where: {
        id: studentID,
      },
    });
    if (checkExistStudent && checkExistCourse) {
      const getUnitFinished = await learninglog.findAll({
        attributes: ["id", "unitDone"],
        where: { courseID: courseID, studentID: studentID },
      });
      res.status(200).send(getUnitFinished);
    } else {
      res.status(404).send({ message: "Id don't exist" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = {
  save_tracklog,
  gettracklog,
};
