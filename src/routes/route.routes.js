const router = require("express").Router();

const controller = require("../controllers/route.controller");
const { authenticate } = require("../middlewares/authenticates");
const authorize = require("../middlewares/authorize");

router.post('/calculate', authenticate, authorize("admin", "superadmin"), controller.calculate)

router.get("/",authenticate,authorize("admin", "superadmin"),controller.getRoads);

router.post("/close/:id",authenticate,authorize("admin", "superadmin"),controller.closeRoad);

router.post("/open/:id",authenticate,authorize("admin", "superadmin"),controller.openRoad);

router.put("/traffic/:id", authenticate, authorize("admin", "superadmin"), controller.updateTraffic);
module.exports = router;
