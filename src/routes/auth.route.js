const express = require('express');
const loginController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware') //protect authentification
const {rateLimiter} = require('../middlewares/rateLimit.middleware') // contre brute force

const router = express.Router();

router.post('/login', rateLimiter, loginController.login);
router.post('/logout',authMiddleware,  loginController.logOut);

module.exports = router