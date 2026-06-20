const express = require('express')
const router = express.Router()
const auth = require("../middlewares/auth.middleware")
const super_admin = require("../middlewares/superAdmin.middleware")
const userController = require('../controllers/user.controller')

router.get('/',auth,super_admin, userController.getUsers)
router.post('/createUser',auth,super_admin, userController.createUsers)
router.put("/updateUser/:id",auth,super_admin, userController.UpdateUsers)
router.delete("/deleteUser/:id",auth,super_admin, userController.deleteUsers)


module.exports = router