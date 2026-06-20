const router = require('express').Router();
const controller = require('../controllers/auth.controller.js');
const {authenticate }= require('../middlewares/authenticates.js');
const authorize = require('../middlewares/authorize.js');

router.post('/register', controller.register);
router.post('/registerSU',authenticate, authorize('superadmin'), controller.registerSU);   
router.post('/login', controller.login);
router.post('/refresh', controller.refresh);
router.get('/profile', authenticate, controller.profile);
router.post('/logout', authenticate, controller.logout);

module.exports = router;