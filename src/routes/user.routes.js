const router = require("express").Router();
const controller = require("../controllers/user.controller.js");
const {authenticate} = require("../middlewares/authenticates.js");
const authorize = require("../middlewares/authorize.js");


router.get("/reboot",authenticate,authorize('superadmin'),  controller.reboot);
router.get("/getUsers", controller.getUsers);
router.get("/getUser/:id", controller.getUserById);
router.post("/updateUser/:id", controller.updateUser);
router.delete("/deleteUser/:id", controller.deleteUser);

module.exports = router;