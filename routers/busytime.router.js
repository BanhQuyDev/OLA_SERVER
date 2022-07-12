const { Router} = require('express');
const { setBusyTime, getBusyTime } = require('../controllers/busytime.controller');
const busytimeRouter = Router();

//http://localhost:7000/api/v1/busy-time
busytimeRouter.post("/",[],setBusyTime);
//http://localhost:7000/api/v1/busy-time
busytimeRouter.get("/",[],getBusyTime);
module.exports = {
    busytimeRouter
}

