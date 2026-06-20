const router = require('express').Router();
const controller = require('../controllers/auth.controller.js');
const {authenticate }= require('../middlewares/authenticates.js');
const authorize = require('../middlewares/authorize.js');

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Créer un utilisateur
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: création user
 */

router.post('/register', controller.register);
router.post('/registerSU', authorize('admin'), controller.registerSU);   
router.post('/login', controller.login);
router.post('/refresh', controller.refresh);
router.get('/profile', authenticate, controller.profile);
router.post('/logout', authenticate, controller.logout);



module.exports = router;