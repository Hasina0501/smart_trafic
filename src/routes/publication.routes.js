const router = require("express").Router();

const controller = require("../controllers/publication.controller");
const { authenticate } = require("../middlewares/authenticates");
const authorize = require("../middlewares/authorize");

router.get("/", controller.getPublications);

router.post(
  "/",
  authenticate,
  authorize("admin", "superadmin"),
  controller.createPublication
);

router.put(
  "/:id",
  authenticate,
  authorize("admin", "superadmin"),
  controller.updatePublication
);

router.delete(
  "/:id",
  authenticate,
  authorize("admin", "superadmin"),
  controller.deletePublication
);

module.exports = router;