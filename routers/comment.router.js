const { Router } = require("express");
const { createComment, getAllCommentOnUnit } = require("../controllers/comment.controller");
const { checkExist } = require("../middlewares/validation/check-exist");
const { units } = require("../models");
const commentRouter = Router();
//http://localhost:7000/api/v1/comment
commentRouter.post("/", [],createComment );
//http://localhost:7000/api/v1/comment/:id
commentRouter.get("/:id", [checkExist(units)],getAllCommentOnUnit );
module.exports = {
    commentRouter,
};
