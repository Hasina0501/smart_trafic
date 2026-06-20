require('dotenv').config()

const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()
app.use(cors())
app.use(express.json())
// servir les images uploadées
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))


const userRoutes = require('./routes/user.routes')
const authRoutes = require('./routes/auth.routes')
const captchaRoutes = require("./routes/captcha.route")
const villeRoutes = require('./routes/ville.route')
const incidentRoutes = require('./routes/incident.route')

// Route pour authentification
app.use('/api/auth', authRoutes)
// Route pour utilisateur
app.use('/api/user', userRoutes)
// Route pour ville
app.use('/api/ville', villeRoutes)
// Route pour incident
app.use('/api/incident', incidentRoutes)

// gestion captcha
app.use("/api/captcha", captchaRoutes)


module.exports = app