const { Router } = require("express");
const { createAdmin, updateAdmin, findDetailAdmin, disableAdmin, getAllAdmin, updateActive } = require("../controllers/admin.controller");
const { users,admin } = require("../models");
const { checkExist } = require("../middlewares/validation/check-exist");
const { checkDuplicate } = require("../middlewares/validation/check-duplicate");
const { checkExistUserName } = require("../middlewares/validation/check-exist-username");
const adminRouter = Router();
//http://localhost:7000/api/v1/admin/getAll
adminRouter.get("/getAll", [],getAllAdmin)
//http://localhost:7000/api/v1/admin
adminRouter.post("/", [checkDuplicate(users),checkExistUserName(users)], createAdmin);
//http://localhost:7000/api/v1/admin/:id
adminRouter.put("/:id", [checkExist(users)], updateAdmin);
//http://localhost:7000/api/v1/admin/active/:id
adminRouter.put("/active/:id", [checkExist(admin)],updateActive)
//http://localhost:7000/api/v1/admin/:id
adminRouter.get("/:id", [checkExist(admin)],findDetailAdmin)
//http://localhost:7000/api/v1/admin/:id
adminRouter.delete("/:id", [checkExist(admin)],disableAdmin)

module.exports = {
  adminRouter,
};
