const router = require("express").Router();
const controller = require("../controllers/user.controller.js");
const {authenticate} = require("../middlewares/authenticates.js");
const authorize = require("../middlewares/authorize.js");


router.get("/reboot",authenticate,authorize('superadmin'),  controller.reboot);
router.get("/getUsers",authenticate, authorize("superadmin"), controller.getUsers);
router.get("/:id",authenticate, authorize("superadmin"),  controller.getUserById);
router.put("/:id", controller.updateUser);
router.delete("/:id",authenticate, authorize("superadmin"),  controller.deleteUser);

module.exports = router;