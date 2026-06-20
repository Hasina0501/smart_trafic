const { text } = require("express")
const {transporteur} = require("../config/mailer")
const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

const generateEmail = async (email)=>{
    const candidate = await prisma.candidate.findFirst({where: {email}})
    const testLink = "test-Zenith/candidate-" + candidate.id + "/" + candidate.token

    return {candidate,testLink}
}

const sendMail = async (recipient, text) =>{

    return transporteur.sendMail({

        from: process.env.USER_EMAIL,    //mail de l'appli dans .env
        to: recipient,     //destinataire
        subject: "test-zenith",     //suject du mail
        text: text       // le lien à envoyer
    })
}

module.exports = {generateEmail, sendMail}