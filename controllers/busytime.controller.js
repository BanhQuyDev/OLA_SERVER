const {
    externalmember,
    busytime
  } = require("../models");
const setBusyTime = async (req, res) => {
  try {
      const {idTeacher,startTime,endTime} = req.body;
      const checkExistTeacher = await externalmember.findOne({where:{id:idTeacher}});
      if(checkExistTeacher){
          const createBusyTime = await busytime.create({
              starting_time:startTime,
              end_time:endTime,
              id_teacher:idTeacher
          });
          res.status(201).send({createBusyTime,message:"Create Successfully!!"});
      }else{
        res.status(404).send({message:"Id don't exist'!!"});
      }
  } catch (error) {
    res.status(500).send(error);
  }
};
const getBusyTime = async (req, res) => {
    try {
        const getAllBusyTime = await busytime.findAll();
        res.status(200).send({getAllBusyTime});
    } catch (error) {
        res.status(500).send(error);
    }
}
module.exports = {
  setBusyTime,
  getBusyTime
};
