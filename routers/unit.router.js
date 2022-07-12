const {Router} = require('express');
const { createUnit, updateUnit, createUnitWhenUpdateCourse, deleteUnit } = require('../controllers/unit.controller');
const { checkExist } = require('../middlewares/validation/check-exist');
const {units} = require("../models");
const unitRouter = Router();

//http://localhost:7000/api/v1/unit/create
unitRouter.post("/create", [],createUnit);
//http://localhost:7000/api/v1/unit/createwhenupdate
unitRouter.post("/createwhenupdate", [],createUnitWhenUpdateCourse);
//http://localhost:7000/api/v1/unit/update/:id
unitRouter.put("/update/:id", [checkExist(units)],updateUnit);
//http://localhost:7000/api/v1/unit
unitRouter.delete("/:id", [[checkExist(units)]],deleteUnit);

module.exports ={
    unitRouter
}