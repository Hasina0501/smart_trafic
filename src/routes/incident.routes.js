const router = require("express").Router();

const controller =
  require("../controllers/incident.controller");

const { authenticate } =
  require("../middlewares/authenticates");

const authorize =
  require("../middlewares/authorize");

router.post(
  "/",
  controller.createIncident
);

router.get(
  "/",
  authenticate,
  authorize("admin", "superadmin"),
  controller.getIncidents
);

router.put(
  "/:id/verify",
  authenticate,
  authorize("admin", "superadmin"),
  controller.verifyIncident
);

router.put(
  "/:id/reject",
  authenticate,
  authorize("admin", "superadmin"),
  controller.rejectIncident
);

module.exports = router;