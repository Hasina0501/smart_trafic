const express = require("express")
const router = express.Router()
const villeController = require("../controllers/ville.controller")

router.get('/', villeController.getAll)
router.get('/:id', villeController.getById)
router.post('/create_city', villeController.create)
router.post('/update_city/:id', villeController.update)
router.post('/delete_city/:id', villeController.delete)

module.exports = router