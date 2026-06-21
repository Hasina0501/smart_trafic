const express = require("express")
const router = express.Router()
const incidentController = require("../controllers/incident.controller")
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
	destination: (req, file, cb) => cb(null, path.join(__dirname, '..', '..', 'uploads')),
	filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname.replace(/[^a-zA-Z0-9.\-]/g, '_'))
})
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } })

router.get('/', incidentController.getAll)
router.get('/:id', incidentController.getById)
// accept form-data with optional file field 'image'
router.post('/create_incident', upload.single('image'), incidentController.create)
router.post('/update_incident/:id', incidentController.update)
router.delete('/delete_incident/:id', incidentController.delete)

module.exports = router
