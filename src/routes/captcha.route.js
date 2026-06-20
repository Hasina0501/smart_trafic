const express = require(`express`)
const router = express.Router()
const {rateLimiter} = require("../middlewares/rateLimit.middleware") //contre brute force
const {generate, validate} = require("../controllers/captcha.controller")

router.get("/generate", rateLimiter, generate)
router.post("/verify_captcha", rateLimiter, validate)

module.exports = router