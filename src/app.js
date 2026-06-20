require('dotenv').config()

const express = require('express')
const cors = require('cors')

// Route pour les candidats
const candidateRoutes = require("./routes/candidate.route")

// Route pour les offres
const offerRoutes = require("./routes/offer.route")

// Route pour le dashboard
const dashboardRoutes = require("./routes/dashboard.route")

// Nouvelles routes pour la gestion des tests
const testRoutes = require("./routes/test.route")
const questionRoutes = require("./routes/question.route")
const answerRoutes = require("./routes/answer.route")
const resultRoutes = require("./routes/result.route")

// Route pour les articles
const articleRoutes = require("./routes/article.route")

const app = express()
app.use(cors())
app.use(express.json())


const userRoutes = require('./routes/user.route')
const authRoutes = require('./routes/auth.route')
const captchaRoutes = require("./routes/captcha.route")

// Route pour authentification
app.use('/api/auth', authRoutes)
// Route pour utilisateur
app.use('/api/user', userRoutes)
// Route pour les candidats
app.use("/api/candidate", candidateRoutes)
// Route pour les offres
app.use("/api/offer", offerRoutes)
// Route pour le dashboard
app.use("/api/dashboard", dashboardRoutes)
// Routes pour la gestion des tests
app.use("/api/test", testRoutes)
app.use("/api/question", questionRoutes)
app.use("/api/answer", answerRoutes)
app.use("/api/result", resultRoutes)

//gestion captcha
app.use("/api/captcha", captchaRoutes)

// Route pour les candidats
app.use("/api/candidate", candidateRoutes)

// Route pour les offres
app.use("/api/offer", offerRoutes)

// Route pour le dashboard
app.use("/api/dashboard", dashboardRoutes)

// Routes pour la gestion des tests
app.use("/api/test", testRoutes)
app.use("/api/question", questionRoutes)
app.use("/api/answer", answerRoutes)
app.use("/api/result", resultRoutes)

// Route pour les articles
app.use("/api/article", articleRoutes)

module.exports = app