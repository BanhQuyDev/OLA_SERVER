const {Router} = require("express");
const { getNumOfCancel } = require("../controllers/numofcancel.controller");
const numOfCancelRouter = Router();
//http://localhost:7000/api/v1/num-of-cancel
numOfCancelRouter.get("/",[],getNumOfCancel);
module.exports = {
    numOfCancelRouter
};