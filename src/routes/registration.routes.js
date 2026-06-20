const router = require("express").Router();

const controller = require("../controllers/registration.controller");
const { authenticate } = require("../middlewares/authenticates");
const authorize = require("../middlewares/authorize");

router.get(
  "/",
  authenticate,
  authorize("superadmin"),
  controller.getPendingRequests
);

router.post(
  "/:id/approve",
  authenticate,
  authorize("superadmin"),
  controller.approveRequest
);

router.post(
  "/:id/reject",
  authenticate,
  authorize("superadmin"),
  controller.rejectRequest
);

module.exports = router;