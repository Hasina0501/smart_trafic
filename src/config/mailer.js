const nodemailer = require("nodemailer")

const transporteur = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS
    }
})

module.exports = {transporteur}