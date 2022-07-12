const { Router } = require("express");
const { getUploadURL } = require("../controllers/awsS3.controller");

const uploadS3Router = Router();
uploadS3Router.post("/units", getUploadURL);

module.exports = {
    uploadS3Router,
}; 